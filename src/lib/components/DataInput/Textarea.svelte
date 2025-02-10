<script lang="ts">
	import type { DaisyColor, DaisySize } from '$lib/types';
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		bordered?: boolean;
		color?: Omit<DaisyColor, 'neutral'>;
		error?: string | Snippet;
		label?: string | Snippet;
		resizable?: boolean | 'yes' | 'no' | 'x' | 'y';
		size?: DaisySize | 'md';
	} & SvelteHTMLElements['textarea'];
	let {
		bordered,
		class: className,
		color,
		error,
		label,
		resizable,
		size,
		...props
	}: Props = $props();
</script>

<label class="form-control w-full">
	<div class="label">
		<span
			class="label-text flex items-center gap-2"
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
	<textarea
		{...props}
		class={twMerge('textarea', clsx(className))}
		class:textarea-bordered={bordered}
		class:textarea-xs={size === 'xs'}
		class:textarea-sm={size === 'sm'}
		class:textarea-lg={size === 'lg'}
		class:textarea-ghost={color === 'ghost'}
		class:textarea-primary={color === 'primary'}
		class:textarea-secondary={color === 'secondary'}
		class:textarea-accent={color === 'accent'}
		class:textarea-info={color === 'info'}
		class:textarea-success={color === 'success'}
		class:textarea-warning={color === 'warning'}
		class:textarea-error={color === 'error' || error}
		class:resize={resizable === true || resizable === 'yes'}
		class:resize-x={resizable === 'x'}
		class:resize-y={resizable === 'y'}
		class:resize-none={resizable === false || resizable === 'no'}
	></textarea>
</label>
