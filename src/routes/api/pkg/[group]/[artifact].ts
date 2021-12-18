import type { EndpointOutput, IncomingRequest } from '@sveltejs/kit';
import type { Rec } from '@sveltejs/kit/types/helper';

async function getReadme(contentUrl: string): Promise<string | undefined> {
	const res = await fetch(contentUrl).then((res) => res.json());

	if (res.content) {
		return Buffer.from(res.content, res.encoding).toString('ascii');
	}
}

export async function get({
	params,
}: IncomingRequest & { params: Rec<string> }): Promise<EndpointOutput> {
	try {
		const res = await fetch(
			`https://package-search.services.jetbrains.com/api/package/${params.group}:${params.artifact}`
		).then((res) => res.json());

		if (res.error) {
			return {
				status: 500,
				body: { error: res.error.message },
			};
		}

		// TODO: This URL is annoyingly rate-limited
		const readmeContentUrl = res.package.github?.community_profile?.files?.readme?.url;

		return {
			body: {
				name: res.package.name,
				description: res.package.github?.description ?? res.package.description,
				group: res.package.group_id,
				artifact: res.package.artifact_id,
				repository: res.package.scm?.url,
				readme: readmeContentUrl && (await getReadme(readmeContentUrl)),
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
