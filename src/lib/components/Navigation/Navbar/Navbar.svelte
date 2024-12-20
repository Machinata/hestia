<script lang="ts">
	import { greeting } from '$lib/i18n';

	let { title, username }: { title: string; username: string } = $props();

	let message = $derived(`${greeting()} ${username}!`);
</script>

<header class="navbar justify-between bg-base-200 px-4">
	<h2 class="prose prose-xl">Hestia</h2>
	<h1 class="prose prose-2xl">{title}</h1>
	<p class="prose prose-lg">{message}</p>
</header>

<style>
</style>