<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Modal, ModalActions, ModalBody } from '$lib/components/Actions';
	import { TextInput } from '$lib/components/DataInput';
	import { ResidentTable, type ResidentItem } from '$lib/components/Residents';
	import { messages } from '$lib/i18n';
	import { Phone, UserRound, UserRoundPlus } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import type { ActionData, PageData } from './$types';

	type Props = {
		data: PageData;
		form: ActionData;
	};

	let { data }: Props = $props();

	let residents = $derived(data.residents);

	let dialog: HTMLDialogElement | undefined = $state(undefined);
	let form: HTMLFormElement | undefined = $state(undefined);

	let resident: ResidentItem | undefined = $state(undefined);
</script>

<Modal
	backdrop
	bind:dialog
	onclose={() => {
		resident = undefined;
		form?.reset();
	}}
>
	<ModalBody>
		<div class="flex items-center justify-between">
			<h2 class="text-2xl">
				{resident
					? messages.residents_modal_title_edit()
					: messages.residents_modal_title_new()}
			</h2>
			<form method="dialog">
				<button class="btn btn-square btn-ghost btn-sm">✕</button>
			</form>
		</div>
		<form method="POST" bind:this={form} use:enhance>
			{#if resident}
				<input type="hidden" name="id" value={resident.id} />
			{/if}
			<TextInput bordered name="name" value={resident?.name}>
				{#snippet label()}
					<UserRound size="18" />
					{messages.residents_modal_label_name()}
				{/snippet}
			</TextInput>
			<TextInput bordered name="phoneNumber" type={'tel'} value={resident?.phoneNumber}>
				{#snippet label()}
					<Phone size="18" />
					{messages.residents_modal_label_phone()}
				{/snippet}
			</TextInput>
			<ModalActions>
				<Button type="submit" block onclick={() => dialog?.close()}
					>{messages.residents_modal_submit()}</Button
				>
			</ModalActions>
		</form>
	</ModalBody>
</Modal>

<div class="mx-auto flex max-w-5xl flex-col items-stretch gap-2" transition:fade>
	<div class="flex items-center justify-between">
		<h1 class="text-4xl">{messages.residents_title()}</h1>
		<Button
			onclick={() => {
				dialog?.showModal();
			}}
			color="primary"><UserRoundPlus size="18" />{messages.residents_button_new()}</Button
		>
	</div>
	<div class="divider"></div>
	<ResidentTable
		items={residents}
		onEdit={(r) => {
			resident = r;
			dialog?.showModal();
		}}
	/>
</div>
