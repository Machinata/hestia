<script lang="ts">
	import type { Snippet } from 'svelte';
	import DropdownItem from './DropdownItem.svelte';

	type Props = {
		children: Snippet<[DropdownItem]>;
		label: string | Snippet;
		position?: 'top' | 'bottom' | 'left' | 'right' | 'end';
	};

	let { children, label, position }: Props = $props();
</script>

<div
	class="dropdown"
	class:dropdown-top={position === 'top'}
	class:dropdown-bottom={position === 'bottom'}
	class:dropdown-left={position === 'left'}
	class:dropdown-right={position === 'right'}
	class:dropdown-end={position === 'end'}
>
	<div tabindex="0" role="button" class="btn m-1">
		{#if typeof label === 'string'}
			{label}
		{:else}
			{@render label()}
		{/if}
	</div>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<ul tabindex="0" class="menu dropdown-content z-[1] rounded-box bg-base-200 shadow">
		{@render children({})}
	</ul>
</div>