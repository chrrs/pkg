<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
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

	export let status: number;
	export let message: string;
</script>

<div class="max-w-3xl mx-auto mb-8">
	<Alert type="error"
		><b>Error {status}:</b>
		{message}
	</Alert>
</div>
