<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		children?: Snippet;
	} & SvelteHTMLElements['div'];
	let { children, class: className, ...props }: Props = $props();
</script>

<div {...props} class={twMerge('skeleton', className)}>{@render children?.()}</div>
