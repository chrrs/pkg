<script>
	import '../app.css';
</script>

<div class="py-4 bg-white">
	<div class="flex items-center gap-8 max-w-3xl mx-auto">
		<img src="/logo.svg" alt="pkg" class="h-8" />
		<div class="flex flex-grow">
			<input
				class="flex-grow bg-gray-100 px-4 py-2 border-2 border-r-0 border-transparent focus:border-black focus:outline-none"
				placeholder="Search maven artifacts..."
			/>
			<button class="bg-black text-white px-6 font-bold">Search</button>
		</div>
	</div>
</div>

<div class="w-screen h-screen">
	<slot />
</div>
