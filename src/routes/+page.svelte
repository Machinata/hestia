<script lang="ts">
	import { goto } from '$app/navigation';
	import { Loader } from '$lib/components/Feedback';
	import { fade } from 'svelte/transition';

	$effect(() => {
		const id = setTimeout(() => goto('/app'), 1500);
		return () => {
			clearTimeout(id);
		};
	});
</script>

<div class="site-loader" transition:fade>
	<Loader />
</div>

<style>
	.site-loader {
		@apply flex h-screen w-screen flex-col items-center justify-center gap-6;
	}
</style>
