<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	let { class: className, ...props }: SvelteHTMLElements['i'] = $props();
</script>

<i {...props} class={twMerge(className, 'fi fi-sr-info')}></i>
