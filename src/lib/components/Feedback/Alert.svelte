<script lang="ts">
	import type { DaisyColor } from '$lib/types';
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		icon?: Snippet;
		status?: Extract<DaisyColor, 'info' | 'success' | 'warning' | 'error'>;
	};

	let { children, icon, status: color }: Props = $props();
</script>

<div
	role="alert"
	class="alert"
	class:alert-info={color === 'info'}
	class:alert-success={color === 'success'}
	class:alert-warning={color === 'warning'}
	class:alert-error={color === 'error'}
>
	{@render icon?.()}
	{@render children?.()}
</div>
