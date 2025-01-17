<script lang="ts">
	import type { DaisyColor } from '$lib/types';
	import clsx from 'clsx';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		color?: Exclude<DaisyColor, 'neutral' | 'ghost'>;
		open?: boolean;
		position?: 'top' | 'bottom' | 'left' | 'right';
		tip?: string;
	} & SvelteHTMLElements['div'];
	let { children, class: className, color, open, position, tip, ...props }: Props = $props();
</script>

<div
	class={twMerge('tooltip', clsx(className))}
	class:tooltip-primary={color === 'primary'}
	class:tooltip-secondary={color === 'secondary'}
	class:tooltip-accent={color === 'accent'}
	class:tooltip-info={color === 'info'}
	class:tooltip-success={color === 'success'}
	class:tooltip-warning={color === 'warning'}
	class:tooltip-error={color === 'error'}
	class:tooltip-open={open}
	class:tooltip-top={position === 'top'}
	class:tooltip-bottom={position === 'bottom'}
	class:tooltip-left={position === 'left'}
	class:tooltip-right={position === 'right'}
	data-tip={tip}
	{...props}
>
	{@render children?.()}
</div>
