<script lang="ts">
	import { Navbar } from '$lib/components/Navigation';

	let { children } = $props();
</script>

<Navbar title="Svelte" />
{@render children()}
