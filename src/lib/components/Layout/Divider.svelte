<script lang="ts">
	import type { DaisyColor } from '$lib/types';
	import clsx from 'clsx';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		color?: Exclude<DaisyColor, 'ghost'>;
		direction?: 'horizontal' | 'vertical';
		variant?: 'start' | 'end';
	} & SvelteHTMLElements['div'];
	let { children, class: className, color, direction, variant, ...props }: Props = $props();
</script>

<div
	{...props}
	class={twMerge('divider', clsx(className))}
	class:divider-neutral={color === 'neutral'}
	class:divider-primary={color === 'primary'}
	class:divider-secondary={color === 'secondary'}
	class:divider-accent={color === 'accent'}
	class:divider-info={color === 'info'}
	class:divider-success={color === 'success'}
	class:divider-warning={color === 'warning'}
	class:divider-error={color === 'error'}
	class:divider-horizontal={direction === 'horizontal'}
	class:divider-vertical={direction === 'vertical'}
	class:divider-start={variant === 'start'}
	class:divider-end={variant === 'end'}
>
	{@render children?.()}
</div>
