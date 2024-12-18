<script lang="ts">
	let { title }: { title: string } = $props();
</script>

<header class="navbar justify-between bg-base-200 px-4">
	<h2 class="prose prose-xl">Hestia</h2>
	<h1 class="prose prose-2xl">{title}</h1>
	<p class="prose prose-lg">Welcome!</p>
</header>

<style>
</style>