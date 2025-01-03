<script lang="ts">
	import type { DaisyColor, DaisySize } from '$lib/types';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		active?: boolean;
		animation?: boolean;
		block?: boolean;
		children: Snippet;
		color?: DaisyColor;
		disabled?: boolean;
		full?: boolean;
		glass?: boolean;
		onclick?: () => void;
		shape?: 'circle' | 'square';
		size?: DaisySize;
		type?: HTMLButtonAttributes['type'];
		variant?: 'link' | 'outline';
		wide?: boolean;
	}

	let {
		active = false,
		animation = true,
		block = false,
		children,
		color,
		disabled = false,
		full = false,
		glass = false,
		onclick: onClick,
		shape,
		size,
		type = 'button',
		wide = false,
		variant,
		...props
	}: Props = $props();
</script>

<button
	onclick={onClick}
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
	{disabled}
	{type}
	{...props}
>
	{@render children()}
</button>

<style></style>
