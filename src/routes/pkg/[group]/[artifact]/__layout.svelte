<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
		const res = await fetch(`/api/pkg/${page.params.group}/${page.params.artifact}`);
		const json = (await res.json()) as Package & ApiError;

		if (res.status == 404) {
			return {
				status: 404,
				error: `No artifact named ${page.params.group}:${page.params.artifact} found.`,
			};
		} else if (json.error) {
			throw json.error;
		}

		return {
			stuff: { pack: json },
			props: { pack: json },
		};
	}
</script>

<script lang="ts">
	import type { ApiError, Package } from '$lib/api_types';
	import { page } from '$app/stores';

	export let pack: Package;

	$: url = `/pkg/${pack.group}/${pack.artifact}`;
	const pages = [
		{
			name: 'Information',
			url: ``,
		},
		{
			name: 'Versions',
			url: `/versions`,
		},
	];
</script>

<svelte:head>
	<title>{pack.name} - pkg</title>
</svelte:head>

<div class="bg-gray-100 mb-4">
	<div class="container">
		<div class="py-4">
			<h1 class="text-3xl font-bold mb-2">{pack.name}</h1>
			<p class="text-gray-700">{pack.description}</p>
		</div>
		<div class="flex gap-4">
			{#each pages as link}
				<a
					class="inline-block px-4 py-1 {$page.path === `${url}${link.url}`
						? 'bg-white'
						: 'text-gray-700 hover:underline'}"
					href="{url}{link.url}">{link.name}</a
				>
			{/each}
			{#if pack.repository}
				<a
					class="inline-block text-gray-700 hover:underline px-4 py-1"
					href={pack.repository}>Repository</a
				>
			{/if}
		</div>
	</div>
</div>

<slot />
