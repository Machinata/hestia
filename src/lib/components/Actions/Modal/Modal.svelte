<script lang="ts">
	import clsx from 'clsx';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = SvelteHTMLElements['dialog'] & {
		backdrop?: boolean;
		dialog?: HTMLDialogElement;
	};

	let { backdrop, dialog = $bindable(), children, class: className, ...props }: Props = $props();
</script>

<dialog {...props} class={twMerge('modal', clsx(className))} bind:this={dialog}>
	{@render children?.()}
	{#if backdrop}
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	{/if}
</dialog>
