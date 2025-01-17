<script lang="ts">
	import clsx from 'clsx';
	import type { DaisyColor } from '$lib/types';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		color?: Exclude<DaisyColor, 'neutral' | 'ghost'>;
	} & SvelteHTMLElements['progress'];
	let { children, class: className, color, ...props }: Props = $props();
</script>

<progress
	class={twMerge('progress', clsx(className))}
	class:progress-primary={color === 'primary'}
	class:progress-secondary={color === 'secondary'}
	class:progress-accent={color === 'accent'}
	class:progress-info={color === 'info'}
	class:progress-success={color === 'success'}
	class:progress-warning={color === 'warning'}
	class:progress-error={color === 'error'}
	{...props}
>
	{@render children?.()}
</progress>
