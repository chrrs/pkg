<script lang="ts">
	import { goto } from '$app/navigation';

	let query = '';

	function search() {
		goto(`/search?q=${encodeURIComponent(query)}`);
		query = '';
	}
</script>

<div class="py-4 bg-white">
	<div class="flex items-center gap-8 container">
		<a href="/">
			<img src="/logo.svg" alt="pkg" class="h-8" />
		</a>
		<form on:submit|preventDefault={search} class="flex flex-grow">
			<input
				class="flex-grow bg-gray-100 px-4 py-2 border-2 border-r-0 border-transparent focus:border-black focus:outline-none"
				placeholder="Search maven artifacts..."
				bind:value={query}
			/>
			<button type="submit" class="bg-black text-white px-6 font-bold">Search</button>
		</form>
	</div>
</div>
