<script lang="ts">
	import type { DaisyColor, DaisySize } from '$lib/types';
	import type { Snippet } from 'svelte';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import { fade as fadeTransition } from 'svelte/transition';

	type Props = {
		bordered?: boolean;
		color?: Exclude<DaisyColor, 'neutral'>;
		disabled?: boolean;
		error?: string | Snippet;
		fade?: boolean;
		start?: string | Snippet;
		end?: string | Snippet;
		label?: string | Snippet;
		name: string;
		placeholder?: string;
		size?: DaisySize;
		type?: Extract<
			HTMLInputTypeAttribute,
			'email' | 'password' | 'search' | 'tel' | 'text' | 'url'
		>;
	};

	let {
		bordered = false,
		color,
		disabled,
		error,
		fade,
		start,
		end,
		label,
		name,
		placeholder,
		size,
		type = 'text',
	}: Props = $props();
</script>

<label class="form-control w-full">
	<div class="label">
		<span
			class="label-text"
			class:text-primary={color === 'primary'}
			class:text-secondary={color === 'secondary'}
			class:text-accent={color === 'accent'}
			class:text-info={color === 'info'}
			class:text-success={color === 'success'}
			class:text-warning={color === 'warning'}
			class:text-error={color === 'error' || error}
		>
			{#if typeof label === 'string'}
				{label}
			{:else if label}
				{@render label()}
			{/if}
		</span>
		<span class="label-text-alt font-semibold text-error">
			{#if typeof error === 'string'}
				{error}
			{:else if error}
				{@render error()}
			{/if}
		</span>
	</div>
	<div
		transition:fadeTransition={{ duration: fade ? 200 : 0 }}
		class="input flex w-full items-center gap-2"
		class:input-bordered={bordered}
		class:input-xs={size === 'xs'}
		class:input-sm={size === 'sm'}
		class:input-lg={size === 'lg'}
		class:input-primary={color === 'primary'}
		class:input-secondary={color === 'secondary'}
		class:input-accent={color === 'accent'}
		class:input-ghost={color === 'ghost'}
		class:input-link={color === 'link'}
		class:input-info={color === 'info'}
		class:input-success={color === 'success'}
		class:input-warning={color === 'warning'}
		class:input-error={color === 'error' || error}
	>
		{#if typeof start === 'string'}
			{start}
		{:else}
			{@render start?.()}
		{/if}
		<input {disabled} {name} {placeholder} {type} class="grow" />
		{#if typeof end === 'string'}
			{end}
		{:else}
			{@render end?.()}
		{/if}
	</div>
</label>

<style>
</style>
