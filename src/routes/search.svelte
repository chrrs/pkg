<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	export async function load({ url, fetch }: LoadInput): Promise<LoadOutput> {
		if (url.searchParams.has('q')) {
			const query = url.searchParams.get('q');
			const res = (await fetch(`/api/search?q=${encodeURIComponent(query)}`).then((res) =>
				res.json()
			)) as SearchResults & ApiError;

			if (res.error) {
				// TODO: Handle this more gracefully.
				throw res.error;
			}

			return {
				props: { query, results: res },
			};
		} else {
			return {
				redirect: '/',
				status: 303,
			};
		}
	}
</script>

<script lang="ts">
	import type { ApiError, SearchResults } from '$lib/api_types';
	import { formatDistance } from 'date-fns';
	import Meta from '$components/Meta.svelte';

	export let query: string;
	export let results: SearchResults;
</script>

<Meta title="{query} - pkg" />

<div class="bg-gray-100 py-4 mb-4">
	<div class="flex justify-between container">
		<p class="font-semibold">Search results for <span class="italic">{query}</span></p>
		<p>{results.amount} results</p>
	</div>
</div>

<div class="container-no-pad">
	{#each results.results as result}
		<a href="/pkg/{result.group}/{result.artifact}" class="block hover:bg-gray-100 px-4 py-4">
			<p class="text-lg mb-1">
				<span class="font-semibold text-purple-700 mr-3">
					{result.name ?? result.artifact}
				</span>
				{#if result.description}
					<span>{result.description}</span>
				{/if}
			</p>
			<p class="text-sm text-gray-500 flex gap-4">
				<span class="text-gray-800">{result.group}:{result.artifact}</span>
				<span
					class="font-semibold"
					class:text-green-700={result.latestVersion.stable}
					class:text-red-700={!result.latestVersion.stable}
				>
					{result.latestVersion.name}
				</span>
				{formatDistance(result.latestVersion.updated, new Date(), { addSuffix: true })}
				{#if result.latestVersion.repository && result.latestVersion.repository.id !== 'maven_central'}
					<span class="underline text-red-700">
						{result.latestVersion.repository.name}
					</span>
				{/if}
			</p>
		</a>
	{/each}
</div>
