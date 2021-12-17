<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	export async function load({ page }: LoadInput): Promise<LoadOutput> {
		if (page.query.has('q')) {
			return {
				props: { query: page.query.get('q') },
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
	export let query: string;
</script>

<svelte:head>
	<title>{query} - pkg</title>
</svelte:head>

<div class="bg-gray-100 py-4 mb-4">
	<div class="flex justify-between max-w-3xl mx-auto">
		<p class="font-semibold">Search results for <span class="italic">{query}</span></p>
		<p>28 results</p>
	</div>
</div>

<div class="max-w-[50rem] mx-auto">
	<a href="/pkg/net.kyori:adventure-api" class="block hover:bg-gray-100 px-4 py-4">
		<p class="text-lg flex gap-4 mb-1">
			<span class="font-semibold text-purple-700">adventure-api</span>
			<span>Platform integrations for the adventure UI library</span>
		</p>
		<p class="text-sm text-gray-500 flex gap-4">
			<span class="text-gray-800">net.kyori:adventure-api</span>
			<span class="text-green-700 font-semibold">v4.0.0</span>
			5 months ago
		</p>
	</a>
</div>
