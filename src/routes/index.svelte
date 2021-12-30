<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	export async function load({ page }: LoadInput): Promise<LoadOutput> {
		let query = '';
		page.query.forEach((_, q) => (query += q));

		if (query !== '') {
			return {
				status: 303,
				redirect: `/search?q=${query}`,
			};
		}

		return {};
	}
</script>

<svelte:head>
	<title>pkg</title>
</svelte:head>
