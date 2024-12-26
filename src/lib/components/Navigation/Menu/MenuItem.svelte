<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	type Props = {
		children: Snippet<[]>;
		href?: string;
		onclick?: MouseEventHandler<HTMLAnchorElement>;
	};
	let { children, href, onclick }: Props = $props();
</script>

<li>
	<a {href} {onclick}>
		{@render children()}
	</a>
</li>