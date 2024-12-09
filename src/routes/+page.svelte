<script lang="ts">
	import Loader from '$lib/components/Loader.svelte';

	$effect(() => {
		const id = setTimeout(() => {
			window.location.href = '/app';
		}, 1500);
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
		@apply flex h-screen w-screen flex-col items-center justify-center gap-6 bg-slate-100;
	}
	.site-loader h1 {
		@apply text-4xl;
	}
</style>