<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	let {
		label,
		name,
		type = 'text'
	}: { label?: string; name: string; type?: HTMLInputTypeAttribute } = $props();
</script>

<div class="hestia-input">
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