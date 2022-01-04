<script lang="ts" context="module">
	import Meta from '$components/Meta.svelte';

	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	export async function load({ url }: LoadInput): Promise<LoadOutput> {
		let query = '';
		url.searchParams.forEach((_, q) => (query += q));

		if (query !== '') {
			return {
				status: 303,
				redirect: `/search?q=${query}`,
			};
		}

		return {};
	}
</script>

<Meta title="pkg" />
