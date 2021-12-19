<script lang="ts">
	export let type: 'info' | 'warning' | 'error' = 'info';
</script>

<div
	class="flex gap-3 items-center px-4 py-2"
	class:bg-red-100={type === 'error'}
	class:bg-yellow-100={type === 'warning'}
	class:bg-blue-100={type === 'info'}
>
	<svg
		viewBox="64 64 896 896"
		focusable="false"
		data-icon="exclamation-circle"
		width="1em"
		height="1em"
		fill="currentColor"
		aria-hidden="true"
		class="mt-0.5 transform"
		class:text-red-500={type === 'error'}
		class:text-yellow-500={type === 'warning'}
		class:text-blue-500={type === 'info'}
		class:rotate-180={type === 'info'}
		><path
			d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
		/></svg
	>
	<div
		class:text-red-900={type === 'error'}
		class:text-yellow-900={type === 'warning'}
		class:text-blue-900={type === 'info'}
	>
		<slot />
	</div>
</div>
