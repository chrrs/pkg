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

		if (json.package.scm?.url?.startsWith('https://github.com/')) {
			const readmeContentUrl = json.package.github?.community_profile?.files?.readme?.url;
			readme =
				(json.package.scm && (await getReadme(json.package.scm?.url))) ??
				(readmeContentUrl && (await getContent(readmeContentUrl)));
		}

		return {
			body: {
				name: json.package.name,
				description: json.package.github?.description ?? json.package.description,
				group: json.package.group_id,
				artifact: json.package.artifact_id,
				repository: json.package.scm?.url,
				readme,
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
