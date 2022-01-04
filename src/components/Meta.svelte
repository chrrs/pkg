<script lang="ts">
	export let title: string = 'pkg';
	export let description: string = 'Easy-to-use common maven repository index.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta property="og:title" content={title} />
	<meta property="twitter:title" content={title} />

	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta property="twitter:description" content={description} />

	<meta property="og:type" content="website" />
	<meta
		property="og:image"
		content="https://raw.githubusercontent.com/chrrs/pkg/master/.github/banner.png"
	/>

	<meta property="twitter:card" content="summary_large_image" />
	<meta
		property="twitter:image"
		content="https://raw.githubusercontent.com/chrrs/pkg/master/.github/banner.png"
	/>
</svelte:head>
