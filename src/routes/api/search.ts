import type { EndpointOutput, IncomingRequest } from '@sveltejs/kit';

export async function get(request: IncomingRequest): Promise<EndpointOutput> {
	if (!request.url['searchParams']?.has('q')) {
		return {
			status: 400,
			body: { error: 'No search query specified.' },
		};
	}

	try {
		const res = await fetch(
			`https://package-search.services.jetbrains.com/api/package?onlyMpp=false&query=${encodeURIComponent(
				request.url['searchParams']?.get('q')
			)}`
		).then((res) => res.json());

		if (res.error) {
			return {
				status: 500,
				body: { error: res.error.message },
			};
		}

		// TODO: This can probably be done in a better way.
		// We need to make sure that the Maven Central repository is always found first.
		const repositories = { maven_central: undefined };

		res.repositories.forEach((repository) => {
			repositories[repository.id] = {
				name: repository.friendly_name,
				id: repository.id,
				url: repository.url,
			};
		});

		return {
			body: {
				amount: res.packages.length,
				results: res.packages.map((pack) => ({
					name: pack.name,
					description: pack.github?.description,
					group: pack.group_id,
					artifact: pack.artifact_id,
					latestVersion: {
						name: pack.latest_version.version,
						updated: pack.latest_version.last_changed,
						stable: pack.latest_version.stable,
						repository:
							pack.latest_version.repository_ids[0] &&
							repositories[pack.latest_version.repository_ids[0]],
					},
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
