<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';
	import Modal from './Modal.svelte';
	import ModalBody from './ModalBody.svelte';
	import ModalActions from './ModalActions.svelte';
	import Button from '../Button.svelte';

	const { Story } = defineMeta({
		title: 'Actions/Modal',
		component: Modal,
		argTypes: {
			open: {
				control: 'boolean',
				defaultValue: false,
			},
		},
	});

	let dialog: HTMLDialogElement | undefined = $state(undefined);
</script>

{#snippet template({ children: _, ...props }: Partial<ComponentProps<typeof Modal>>)}
	<Button onclick={() => dialog?.showModal()}>Open</Button>
	<Modal {...props} backdrop bind:dialog>
		<ModalBody>
			<h3 class="text-lg font-bold">Hello!</h3>
			<p class="py-4">Press ESC key or click the button below to close</p>
			<ModalActions>
				<Button onclick={() => dialog?.close()}>Close</Button>
			</ModalActions>
		</ModalBody>
	</Modal>
{/snippet}

<Story name="Default" children={template} />
