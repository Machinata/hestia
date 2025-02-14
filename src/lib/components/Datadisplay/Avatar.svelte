<script lang="ts">
	import type { DaisyColor, DaisySize } from '$lib/types';
	import clsx from 'clsx';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		img?: string;
		placeholder: string;
		presence?: 'online' | 'offline';
		ring?: Exclude<DaisyColor, 'ghost'>;
		shape?: 'square' | 'circle';
		size?: DaisySize | 'md';
	} & Omit<SvelteHTMLElements['div'], 'children'>;

	let {
		class: className,
		img,
		placeholder,
		presence,
		ring,
		shape = 'circle',
		size = 'md',
		...props
	}: Props = $props();
</script>

<div {...props} class={twMerge('avatar', presence, clsx(className))} class:placeholder>
	<div
		class={twMerge(
			'rounded-xl',
			clsx({
				'rounded-xl': shape === 'square',
				'rounded-full': shape === 'circle',
				'w-12': size === 'xs',
				'w-16': size === 'sm',
				'w-20': size === 'md',
				'w-32': size === 'lg',
				'avatar-ring ring ring-offset-2 ring-offset-base-100': !!ring,
			})
		)}
		class:bg-neutral={placeholder}
		class:ring-neutral={ring === 'neutral'}
		class:ring-primary={ring === 'primary'}
		class:ring-secondary={ring === 'secondary'}
		class:ring-accent={ring === 'accent'}
		class:ring-info={ring === 'info'}
		class:ring-success={ring === 'success'}
		class:ring-warning={ring === 'warning'}
		class:ring-error={ring === 'error'}
	>
		{#if img}
			<img src={img} alt={placeholder} />
		{:else}
			<span
				class:text-3xl={size === 'lg'}
				class:text-xl={size === 'md'}
				class:text-xs={size === 'xs'}>{placeholder}</span
			>
		{/if}
	</div>
</div>
