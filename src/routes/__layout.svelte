<script>
	import { navigating } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import Nav from '$components/Nav.svelte';
	import { Modals, closeModal } from 'svelte-modals';

	import '../app.css';
</script>

{#if $navigating}
	<div
		out:fade={{ duration: 100 }}
		in:fly={{ x: -(window?.innerWidth ?? 1000), duration: 2000 }}
		class="fixed bg-purple-500 w-full h-1"
	/>
{/if}

<Modals>
	<div
		slot="backdrop"
		class="fixed top-0 bottom-0 left-0 right-0 bg-black/50"
		on:click={closeModal}
	/>
</Modals>

<Nav />

<slot />
