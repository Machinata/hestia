<script lang="ts">
	import { goto } from '$app/navigation';
	import Loader from '$lib/components/Loader.svelte';

	let { data } = $props();

	$effect(() => {
		const id = setTimeout(() => (data.authenticated ? goto('/app') : goto('/login')), 1500);
		return () => {
			clearTimeout(id);
		};
	});
</script>

<div class="site-loader">
	<h1>Hestia</h1>
	<Loader />
</div>

<style>
	.site-loader {
		@apply flex h-screen w-screen flex-col items-center justify-center gap-6;
	}
</style>