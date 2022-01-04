<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	export async function load({ params, fetch }: LoadInput): Promise<LoadOutput> {
		const res = await fetch(`/api/pkg/${params.group}/${params.artifact}`);
		const json = (await res.json()) as Package & ApiError;

		if (res.status == 404) {
			return {
				status: 404,
				error: `No artifact named ${params.group}:${params.artifact} found.`,
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
	import { formatDistance } from 'date-fns';
	import Meta from '$components/Meta.svelte';

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

<Meta
	title="{pack.name ?? pack.artifact} - pkg"
	description={pack.description ?? 'No description.'}
/>

<div class="bg-gray-100 mb-4">
	<div class="container">
		<div class="py-4">
			<h1 class="text-3xl font-bold mb-1">{pack.name ?? pack.artifact}</h1>
			<p class="text-sm text-gray-500 flex flex-col sm:flex-row sm:gap-4">
				<span>
					<span class="sm:hidden">artifact: </span>
					<span class="text-gray-700">{pack.group}:{pack.artifact}</span>
				</span>
				<span>
					latest version: <span
						class="font-semibold"
						class:text-green-700={pack.latestVersion.stable}
						class:text-red-700={!pack.latestVersion.stable}
					>
						{pack.latestVersion.name}
					</span>
				</span>
				<span>
					last updated: <span class="text-gray-700">
						{formatDistance(pack.latestVersion.updated, new Date(), {
							addSuffix: true,
						})}
					</span>
				</span>
			</p>
			{#if pack.description}
				<div class="border-b border-gray-200 my-2" />
				<p class="text-gray-700">{pack.description}</p>
			{/if}
		</div>
		<div class="flex gap-4 overflow-x-auto">
			{#each pages as link}
				<a
					class="inline-block px-4 py-1 {$page.url.pathname === `${url}${link.url}`
						? 'bg-white'
						: 'text-gray-700 hover:underline'}"
					href="{url}{link.url}">{link.name}</a
				>
			{/each}
			{#each [['Source code', pack.scm], ['Website', pack.website]] as link}
				{#if link[1]}
					<a class="inline-block text-gray-700 hover:underline px-4 py-1" href={link[1]}>
						{link[0]}
						<img
							class="inline-block w-4 h-4 ml-1 align-sub opacity-25"
							src="/link.svg"
							alt="Link"
						/>
					</a>
				{/if}
			{/each}
		</div>
	</div>
</div>

<slot />
