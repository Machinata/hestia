<script lang="ts">
	import type { DaisyColor } from '$lib/types';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = { color?: DaisyColor; hover?: boolean } & SvelteHTMLElements['a'];

	let { children, class: className, color, hover, ...props }: Props = $props();
</script>

<a
	class={twMerge(className, 'link')}
	class:link-primary={color === 'primary'}
	class:link-secondary={color === 'secondary'}
	class:link-accent={color === 'accent'}
	class:link-neutral={color === 'neutral'}
	class:link-info={color === 'info'}
	class:link-success={color === 'success'}
	class:link-warning={color === 'warning'}
	class:link-error={color === 'error'}
	class:link-hover={hover}
	{...props}>{@render children?.()}</a
>
