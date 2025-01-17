<script lang="ts">
	import type { DaisyColor, DaisySize } from '$lib/types';
	import clsx from 'clsx';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		active?: boolean;
		animation?: boolean;
		block?: boolean;
		color?: DaisyColor;
		full?: boolean;
		glass?: boolean;
		shape?: 'circle' | 'square';
		size?: DaisySize;
		variant?: 'link' | 'outline';
		wide?: boolean;
	} & SvelteHTMLElements['button'];

	let {
		active = false,
		animation = true,
		block = false,
		children,
		class: className,
		color,
		disabled,
		full = false,
		glass = false,
		shape,
		size,
		wide = false,
		variant,
		...props
	}: Props = $props();
</script>

<button
	{...props}
	{disabled}
	class={twMerge('btn', clsx(className))}
	class:btn-active={active}
	class:no-animation={!animation}
	class:btn-block={block}
	class:btn-neutral={color === 'neutral'}
	class:btn-primary={color === 'primary'}
	class:btn-secondary={color === 'secondary'}
	class:btn-accent={color === 'accent'}
	class:btn-ghost={color === 'ghost'}
	class:btn-info={color === 'info'}
	class:btn-success={color === 'success'}
	class:btn-warning={color === 'warning'}
	class:btn-error={color === 'error'}
	class:btn-disabled={disabled}
	class:w-full={full}
	class:glass
	class:btn-circle={shape === 'circle'}
	class:btn-square={shape === 'square'}
	class:btn-xs={size === 'xs'}
	class:btn-sm={size === 'sm'}
	class:btn-lg={size === 'lg'}
	class:btn-link={variant === 'link'}
	class:btn-outline={variant === 'outline'}
	class:btn-wide={wide}
>
	{@render children?.()}
</button>

<style></style>
