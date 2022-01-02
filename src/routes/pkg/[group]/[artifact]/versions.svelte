<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	export async function load({ stuff }: LoadInput): Promise<LoadOutput> {
		return {
			props: stuff,
		};
	}
</script>

<script lang="ts">
	import VersionModal from '$components/VersionModal.svelte';
	import type { Package } from '$lib/api_types';
	import { formatDistance } from 'date-fns';
	import { openModal } from 'svelte-modals';

	export let pack: Package;
</script>

<div class="container-no-pad">
	{#each pack.versions as version}
		<button
			class="w-full px-4 py-4 flex items-center gap-4 group hover:bg-gray-100"
			on:click={() => openModal(VersionModal, { pack, version })}
		>
			<p
				class="text-lg font-semibold"
				class:text-green-700={version.stable}
				class:text-red-700={!version.stable}
			>
				{version.name}
			</p>
			<div class="flex-grow border-b-2 border-gray-100 group-hover:border-gray-200" />
			<p class="text-gray-500">
				{formatDistance(version.updated, new Date(), { addSuffix: true })}
			</p>
		</button>
	{/each}
</div>
