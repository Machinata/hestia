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
		type: HTMLButtonAttributes['type'];
		onClick: () => void;
		label: string;
		size: 'small' | 'normal' | 'large';
		backgroundColor: string;
		primary: boolean;
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
		@apply inline-block cursor-pointer rounded-full border-0 font-medium leading-none transition-colors;
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
		@apply bg-rose-500 text-slate-700 hover:opacity-80;
	}
	.button--secondary {
		@apply bg-teal-600 text-white hover:opacity-80;
	}
</style>