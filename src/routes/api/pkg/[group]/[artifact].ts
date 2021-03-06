import type { EndpointOutput, IncomingRequest } from '@sveltejs/kit';
import type { Rec } from '@sveltejs/kit/types/helper';
import { getContent, getReadme } from '$lib/github';

export async function get({
	params,
}: IncomingRequest & { params: Rec<string> }): Promise<EndpointOutput> {
	try {
		const res = await fetch(
			`https://package-search.services.jetbrains.com/api/package/${params.group}:${params.artifact}`
		);
		const json = await res.json();

		if (res.status === 404) {
			return {
				status: 404,
				body: { error: json.error.message },
			};
		} else if (json.error) {
			return {
				status: 500,
				body: { error: json.error.message },
			};
		}

		let readme;

		let scm = json.package.scm?.url;
		if (scm?.startsWith('https://github.com/')) {
			scm = scm?.split('/').slice(0, 5).join('/');
			const readmeContentUrl = json.package.github?.community_profile?.files?.readme?.url;
			readme =
				(json.package.scm && (await getReadme(json.package.scm?.url))) ??
				(readmeContentUrl && (await getContent(readmeContentUrl)));
		}

		// TODO: This can probably be done in a better way.
		// We need to make sure that the Maven Central repository is always found first.
		const repositories = { maven_central: undefined };

		json.repositories.forEach((repository) => {
			repositories[repository.id] = {
				name: repository.friendly_name,
				id: repository.id,
				url: repository.url,
			};
		});

		const latestRepository =
			json.package.latest_version.repository_ids[0] &&
			repositories[json.package.latest_version.repository_ids[0]];

		const javadoc =
			latestRepository?.id === 'maven_central'
				? `https://www.javadoc.io/doc/${json.package.group_id}/${json.package.artifact_id}`
				: undefined;

		return {
			body: {
				name: json.package.name,
				description: json.package.github?.description ?? json.package.description,
				website: json.package.url,
				group: json.package.group_id,
				artifact: json.package.artifact_id,
				scm,
				readme,
				javadoc,
				latestVersion: {
					name: json.package.latest_version.version,
					updated: json.package.latest_version.last_changed,
					stable: json.package.latest_version.stable,
					repository: latestRepository,
				},
				versions: json.package.versions.map((ver) => ({
					name: ver.version,
					updated: ver.last_changed,
					stable: ver.stable,
				})),
			},
		};
	} catch (e) {
		let message: string;
		if (e.errno === 'ENOTFOUND') {
			message = 'API request failed.';
		} else {
			message = e.toString();
		}

		return {
			status: 500,
			body: { error: message },
		};
	}
}
