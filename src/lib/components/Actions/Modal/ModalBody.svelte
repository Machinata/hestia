<script lang="ts">
	import clsx from 'clsx';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = SvelteHTMLElements['div'];

	let { children, class: className, ...props }: Props = $props();
</script>

<div {...props} class={twMerge('modal-box', clsx(className))}>
	{@render children?.()}
</div>
