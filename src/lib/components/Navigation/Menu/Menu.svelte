<script lang="ts">
	import type { DaisySize } from '$lib/types';
	import type { Snippet } from 'svelte';
	import MenuItem from './MenuItem.svelte';

	interface Props {
		children: Snippet<[MenuItem]>;
		direction?: 'horizontal' | 'vertical';
		size?: DaisySize;
		title?: string;
	}

	let { children, direction = 'vertical', size, title }: Props = $props();
</script>

<ul
	class="menu w-fit rounded-box bg-base-200"
	class:menu-horizontal={direction === 'horizontal'}
	class:menu-xs={size === 'xs'}
	class:menu-sm={size === 'sm'}
	class:menu-md={size === 'md'}
	class:menu-lg={size === 'lg'}
>
	{#if title}
		<h2 class="menu-title">{title}</h2>
	{/if}
	{@render children({})}
</ul>