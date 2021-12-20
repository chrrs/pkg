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
			props: { pack: json },
		};
	}
</script>

<script lang="ts">
	import type { ApiError, Package } from '$lib/api_types';
	import xss from 'xss';
	import { marked } from 'marked';
	import Alert from '$components/Alert.svelte';

	export let pack: Package;

	$: readmeHtml = pack.readme && xss(marked(pack.readme));
</script>

<div class="bg-gray-100 mb-4">
	<div class="container">
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

<div class="container mb-8">
	{#if readmeHtml}
		<article>{@html readmeHtml}</article>
	{:else}
		<Alert type="warning">No README available.</Alert>
	{/if}
</div>

<style global lang="postcss">
	article {
		p,
		li {
			a {
				&:hover {
					background: linear-gradient(
						180deg,
						transparent 90%,
						theme('colors.purple.400') 0
					);
				}

				@apply font-semibold;
				background: linear-gradient(180deg, transparent 90%, theme('colors.purple.200') 0);
			}

			strong,
			b {
				@apply font-semibold;
			}

			code {
				@apply bg-gray-100 text-red-600 px-2 py-0.5;
			}

			img {
				@apply inline-block;
			}
		}

		table {
			th {
				@apply px-2 py-1 bg-gray-100;
			}

			td {
				@apply px-2 py-1 border-2 border-gray-100;
			}

			@apply border-collapse;
		}

		p {
			@apply pb-4;
		}

		h1 {
			@apply font-semibold text-3xl pb-2 mb-2 border-b-2 border-gray-100 mt-4;
		}

		h2 {
			@apply font-semibold text-2xl pb-2 my-2 border-b-2 border-gray-100;
		}

		h3 {
			@apply font-semibold text-xl my-2;
		}

		h4 {
			@apply font-semibold my-2;
		}

		ul {
			li {
				&::before {
					content: '';
					@apply absolute top-3 left-0 w-3 h-0.5 bg-gray-300;
				}

				@apply relative my-1 pl-6;
			}
		}

		& > ul {
			@apply mb-4;
		}

		pre {
			@apply bg-gray-100 px-4 py-2 mb-4 overflow-y-auto;
		}

		hr {
			@apply border-b-4 border-gray-100 my-4;
		}
	}
</style>
