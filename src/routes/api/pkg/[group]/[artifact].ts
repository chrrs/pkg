import type { EndpointOutput, IncomingRequest } from '@sveltejs/kit';
import type { Rec } from '@sveltejs/kit/types/helper';

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

		return {
			body: {
				name: res.package.name,
				description: res.package.github?.description ?? res.package.description,
				group: res.package.group_id,
				artifact: res.package.artifact_id,
				repository: res.package.scm?.url,
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
