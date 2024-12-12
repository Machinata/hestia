<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		type = 'button',
		onClick,
		label,
		size = 'normal',
		backgroundColor,
		primary = false
	}: {
		type?: HTMLButtonAttributes['type'];
		onClick?: () => void;
		label: string;
		size?: 'small' | 'normal' | 'large';
		backgroundColor?: string;
		primary?: boolean;
	} = $props();
</script>

<button
	{type}
	onclick={onClick}
	class={`button button--${size}`}
	style:background-color={backgroundColor}
	class:button--primary={primary}
	class:button--secondary={!primary}
>
	{label}
</button>

<style>
	.button {
		@apply inline-block cursor-pointer rounded-lg border-0 font-semibold leading-none transition-colors hover:opacity-80 hover:shadow-lg;
	}
	.button--small {
		@apply px-2 py-0.5 text-sm;
	}
	.button--normal {
		@apply px-2 py-1 text-base;
	}
	.button--large {
		@apply px-2.5 py-1 text-xl;
	}
	.button--primary {
		@apply bg-red-600 text-white;
	}
	.button--secondary {
		@apply bg-blue-600 text-white;
	}
</style>