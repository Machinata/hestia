<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade as fadeTransition } from 'svelte/transition';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		children?: Snippet;
		fade?: boolean;
	} & SvelteHTMLElements['div'];

	let { children, fade = false, ...props }: Props = $props();
</script>

<div
	transition:fadeTransition={{ duration: fade ? 200 : 0 }}
	{...props}
	class={twMerge('container-body', props.class)}
>
	{@render children?.()}
</div>

<style>
	.container-body {
		@apply container h-fit w-fit max-w-lg animate-fade rounded-lg bg-base-200 p-8 transition-transform;
	}
</style>