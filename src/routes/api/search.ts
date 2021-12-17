import type { EndpointOutput, IncomingRequest } from '@sveltejs/kit';

export async function get(request: IncomingRequest): Promise<EndpointOutput> {
	if (!request.query.has('q')) {
		return {
			status: 400,
			body: { error: 'No search query specified.' },
		};
	}

	try {
		const res = await fetch(
			`https://package-search.services.jetbrains.com/api/package?onlyMpp=false&query=${encodeURIComponent(
				request.query.get('q')
			)}`
		).then((res) => res.json());

		if (res.error) {
			return {
				status: 500,
				body: { error: res.error.message },
			};
		}

		return {
			body: {
				amount: res.packages.length,
				results: res.packages.map((pack) => ({
					name: pack.name,
					description: pack.github?.description,
					group: pack.group_id,
					artifact: pack.artifact_id,
					version: pack.latest_version?.version ?? '0',
					lastUpdated: pack.latest_version?.last_changed ?? 0,
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
