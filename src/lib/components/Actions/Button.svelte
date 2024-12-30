<script lang="ts">
	import type { DaisyColor, DaisySize } from '$lib/types';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props {
		block?: boolean;
		children: Snippet;
		color?: DaisyColor;
		glass?: boolean;
		outline?: boolean;
		onClick?: () => void;
		responsive?: boolean;
		size?: DaisySize;
		type?: HTMLButtonAttributes['type'];
		wide?: boolean;
	}

	let {
		block = false,
		children,
		color,
		glass = false,
		outline = false,
		onClick,
		responsive = false,
		size,
		type = 'button',
		wide = false,
	}: Props = $props();
</script>

<button
	{type}
	onclick={onClick}
	class:btn-outline={outline}
	class:btn-block={block}
	class:btn-wide={wide}
	class:glass
	class:btn-xs={size === 'xs'}
	class:btn-sm={size === 'sm'}
	class:btn-lg={size === 'lg'}
	class:btn-neutral={color === 'neutral'}
	class:btn-primary={color === 'primary'}
	class:btn-secondary={color === 'secondary'}
	class:btn-accent={color === 'accent'}
	class:btn-ghost={color === 'ghost'}
	class:btn-link={color === 'link'}
	class:btn-info={color === 'info'}
	class:btn-success={color === 'success'}
	class:btn-warning={color === 'warning'}
	class:btn-error={color === 'error'}
	class={`btn ${responsive && 'btn-xs sm:btn-sm md:btn-md lg:btn-lg'}`}
>
	{@render children()}
</button>

<style></style>