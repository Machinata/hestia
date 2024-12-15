<script lang="ts">
	import type { HTMLAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type InputProps = {
		label?: string;
		name: string;
		type?: HTMLInputTypeAttribute;
	} & HTMLAttributes<HTMLDivElement>;

	let { label, name, type = 'text', ...props }: InputProps = $props();
</script>

<div {...props} class={twMerge('hestia-input', props.class)}>
	{#if label}
		<label for={name}>{label}</label>
		<div class="line"></div>
	{/if}
	<input {name} id={name} {type} />
</div>

<style>
	.line {
		@apply h-8 border border-l-slate-200;
	}
	.hestia-input {
		@apply flex w-fit items-center gap-2 rounded-lg bg-slate-100 p-2 text-slate-700 outline-blue-400 focus-within:outline;
	}
	.hestia-input > label {
		@apply font-display text-lg;
	}
	.hestia-input > input {
		all: unset;
		@apply text-lg;
	}
</style>
