<script lang="ts">
	import type { DaisyColor } from '$lib/types';
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		children?: Snippet;
		icon?: Snippet;
		status?: Extract<DaisyColor, 'info' | 'success' | 'warning' | 'error'>;
	} & SvelteHTMLElements['div'];

	let { children, class: className, icon, status: color, ...props }: Props = $props();
</script>

<div
	{...props}
	role="alert"
	class={twMerge('alert', clsx(className))}
	class:alert-info={color === 'info'}
	class:alert-success={color === 'success'}
	class:alert-warning={color === 'warning'}
	class:alert-error={color === 'error'}
>
	{@render icon?.()}
	{@render children?.()}
</div>
