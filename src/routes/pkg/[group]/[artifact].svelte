<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
		const res = (await fetch(`/api/pkg/${page.params.group}/${page.params.artifact}`).then(
			(res) => res.json()
		)) as Package & ApiError;

		if (res.error) {
			// TODO: Handle this more gracefully.
			throw res.error;
		}

		return {
			props: { pack: res },
		};
	}
</script>

<script lang="ts">
	import type { ApiError, Package } from '$lib/api_types';

	export let pack: Package;
</script>

<div class="bg-gray-100 mb-4">
	<div class="max-w-3xl mx-auto">
		<div class="py-4">
			<h1 class="text-3xl font-bold mb-2">{pack.name}</h1>
			<p class="text-gray-700">{pack.description}</p>
		</div>
		<div class="flex gap-4">
			<a class="inline-block bg-white px-4 py-1" href="">Information</a>
			<a class="inline-block text-gray-700 hover:underline px-4 py-1" href="">Versions</a>
			{#if pack.repository}
				<a
					class="inline-block text-gray-700 hover:underline px-4 py-1"
					href={pack.repository}>Repository</a
				>
			{/if}
		</div>
	</div>
</div>
