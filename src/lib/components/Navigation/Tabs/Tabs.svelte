<script lang="ts">
	import type { DaisySize } from '$lib/types';
	import Tab from './Tab.svelte';

	type Props = {
		size?: DaisySize;
		tabs: string[];
		selected?: number;
		variant?: 'none' | 'bordered' | 'lifted' | 'boxed';
	};

	let { size, tabs, selected: value = $bindable(0), variant = 'none' }: Props = $props();
</script>

<div
	role="tablist"
	class="tabs w-full"
	class:tabs-xs={size === 'xs'}
	class:tabs-sm={size === 'sm'}
	class:tabs-lg={size === 'lg'}
	class:tabs-bordered={variant === 'bordered'}
	class:tabs-lifted={variant === 'lifted'}
	class:tabs-boxed={variant === 'boxed'}
>
	{#each tabs as tab, index}
		{#key [tab, value]}
			<Tab
				active={index === value}
				label={tab}
				onclick={() => {
					value = index;
				}}
			/>
		{/key}
	{/each}
</div>