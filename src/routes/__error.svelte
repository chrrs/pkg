<script context="module" lang="ts">
	export function load({ error, status }: ErrorLoadInput): LoadOutput {
		return {
			props: {
				status: status,
				message: error.message,
			},
		};
	}
</script>

<script lang="ts">
	import Alert from '$components/Alert.svelte';
	import type { ErrorLoadInput, LoadOutput } from '@sveltejs/kit';

	export let status: number;
	export let message: string;
</script>

<svelte:head>
	<title>{status} - pkg</title>
</svelte:head>

<div class="max-w-3xl mx-auto mb-8">
	<Alert type="error"
		><b>Error {status}:</b>
		{message}
	</Alert>
</div>
