<script>
	import Nav from '$components/Nav.svelte';
	import { Modals, closeModal } from 'svelte-modals';

	import '../app.css';
</script>

<Modals>
	<div
		slot="backdrop"
		class="fixed top-0 bottom-0 left-0 right-0 bg-black/50"
		on:click={closeModal}
	/>
</Modals>

<Nav />

<slot />
