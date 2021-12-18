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
	import { sanitize } from 'isomorphic-dompurify';
	import { marked } from 'marked';

	export let pack: Package;

	$: readmeHtml = pack.readme && sanitize(marked(pack.readme));
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

{#if readmeHtml}
	<article class="max-w-3xl mx-auto mb-8">{@html readmeHtml}</article>
{:else}
	TODO: Put something better here
{/if}

<style global lang="postcss">
	article {
		p,
		li {
			a {
				&::before {
					content: '';
					@apply absolute bottom-0 left-0 w-full h-0.5 -z-10 bg-purple-200 transition-colors;
				}

				&:hover::before {
					@apply bg-purple-400;
				}

				@apply relative font-semibold;
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
			@apply py-2;
		}

		h1 {
			@apply font-semibold text-3xl pb-2 border-b-2 border-gray-100 mt-4;
		}

		h2 {
			@apply font-semibold text-2xl pb-2 border-b-2 border-gray-100 mt-4;
		}

		h3 {
			@apply font-semibold text-xl mb-1 mt-4;
		}

		h4 {
			@apply font-semibold mt-4 mb-1;
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

		pre {
			@apply bg-gray-100 px-4 py-2 mb-1 overflow-y-auto;
		}

		hr {
			@apply border-b-4 border-gray-100 my-4;
		}
	}
</style>
