<script lang="ts">
	import type { Package, PackageVersion } from '$lib/api_types';
	import Alert from '$components/Alert.svelte';
	import { managers } from '$lib/managers';

	export let isOpen: boolean;

	export let pack: Package;
	export let version: PackageVersion;

	let managerIndex = 0;
	$: manager = managers[managerIndex];
	$: managerCode = manager.transform(pack, version);
</script>

{#if isOpen}
	<div
		role="dialog"
		class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center pointer-events-none"
	>
		<div class="bg-white pointer-events-auto max-w-xl flex-grow">
			<div class="bg-gray-100 px-4 py-2">
				<p><span class="font-semibold">{pack.artifact}</span> v{version.name}</p>
			</div>
			<div class="p-4">
				{#if !version.stable}
					<Alert type="warning">This version is marked as unstable.</Alert>
				{/if}
				<div class:mt-4={!version.stable}>
					{#each managers as manager, i}
						<button
							class="border-t-2 px-4 py-0.5 {managerIndex === i
								? 'bg-gray-50 border-purple-500'
								: 'text-gray-700 hover:underline border-transparent'}"
							on:click={() => (managerIndex = i)}
						>
							{manager.name}
						</button>
					{/each}
				</div>
				<pre class="bg-gray-50 px-4 py-2">
                    {managerCode}
                </pre>
			</div>
		</div>
	</div>
{/if}
