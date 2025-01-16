<script lang="ts">
	import type { Snippet } from 'svelte';

	let { start, center, end }: { start?: Snippet; center?: Snippet; end?: Snippet } = $props();
</script>

<header class="navbar justify-between bg-base-200 px-4">
	<div class="navbar-start">{@render start?.()}</div>
	<div class="navbar-center">{@render center?.()}</div>
	<div class="navbar-end">{@render end?.()}</div>
</header>
