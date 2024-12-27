<script lang="ts">
	import type { DaisyColor, DaisySize } from '$lib/types';
	import type { Snippet } from 'svelte';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import { fade as fadeTransition } from 'svelte/transition';

	type Props = {
		bordered?: boolean;
		color?: Exclude<DaisyColor, 'neutral'>;
		disabled?: boolean;
		fade?: boolean;
		start?: Snippet | string;
		end?: Snippet | string;
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
		fade,
		start,
		end,
		name,
		placeholder,
		size,
		type = 'text',
	}: Props = $props();
</script>

<label
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
	class:input-error={color === 'error'}
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
</label>

<style>
</style>
