<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	export async function load({ stuff }: LoadInput): Promise<LoadOutput> {
		return {
			props: stuff,
		};
	}
</script>

<script lang="ts">
	import type { Package } from '$lib/api_types';
	import xss from 'xss';
	import { marked } from 'marked';
	import Alert from '$components/Alert.svelte';

	export let pack: Package;

	$: readmeHtml = pack.readme && xss(marked(pack.readme));
</script>

<div class="container">
	{#if readmeHtml}
		<article>{@html readmeHtml}</article>
	{:else}
		<Alert type="warning">No README available.</Alert>
	{/if}
</div>

<style global lang="postcss">
	article {
		p,
		li,
		table,
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			a {
				@apply text-purple-600 hover:underline;

				& > code {
					@apply text-purple-600;
				}
			}

			strong,
			b {
				@apply font-semibold;
			}

			code {
				@apply bg-gray-50 text-red-600 px-2 py-0.5;
			}

			img {
				@apply inline-block;
			}
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			a,
			strong,
			b {
				@apply font-bold;
			}
		}

		table {
			th {
				@apply px-2 py-1 bg-gray-100 font-semibold;
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

		h5 {
			@apply font-semibold text-sm;
		}

		& > ul,
		& > ol {
			li {
				counter-increment: list;
				@apply relative my-1 pl-6;
			}

			counter-reset: list;
			@apply mb-4;
		}

		ul li::before {
			content: '';
			@apply absolute top-3 left-0 w-3 h-0.5 bg-gray-300;
		}

		ol li::before {
			content: counter(list) '.';
			@apply absolute left-0 text-gray-500;
		}

		pre {
			@apply bg-gray-50 px-4 py-2 mb-4 overflow-y-auto;
		}

		hr {
			@apply border-b-4 border-gray-100 my-4;
		}
	}
</style>
