<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	type Props = {
		href?: string;
		children: Snippet;
		onclick?: MouseEventHandler<HTMLAnchorElement>;
	};

	let { href, children, onclick }: Props = $props();
</script>

<li><a {href} {onclick}>{@render children()}</a></li>