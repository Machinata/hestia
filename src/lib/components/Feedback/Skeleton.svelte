<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		children?: Snippet;
	} & SvelteHTMLElements['div'];
	let { children, class: className, ...props }: Props = $props();
</script>

<div {...props} class={twMerge('skeleton', clsx(className))}>{@render children?.()}</div>
