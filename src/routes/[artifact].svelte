<script lang="ts" context="module">
	import type { ApiError, SearchResults } from '$lib/api_types';

	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
		const pack = page.params['artifact'];
		if (pack.includes(':')) {
			const [group, artifact] = pack.split(':');

			return {
				status: 303,
				redirect: `/pkg/${group}/${artifact}`,
			};
		}

		const results = (await fetch(`/api/search?q=${pack}`).then((res) =>
			res.json()
		)) as SearchResults & ApiError;

		if (results.error) {
			// TODO: Handle this more gracefully.
			throw results.error;
		}

		const match = results.results.find((result) => result.artifact === pack);
		if (match) {
			return {
				status: 303,
				redirect: `/pkg/${match.group}/${match.artifact}`,
			};
		} else {
			return {
				status: 303,
				redirect: `/search?q=${pack}`,
			};
		}
	}
</script>
