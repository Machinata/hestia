<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/Actions';
	import { Textarea } from '$lib/components/DataInput';
	import { Alert } from '$lib/components/Feedback';
	import { Link } from '$lib/components/Navigation';
	import { RecipientList, type Recipient } from '$lib/components/SMS';
	import { messages } from '$lib/i18n';
	import { CircleX, MessageCircleMore, TriangleAlert } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';

	type Props = {
		data: PageData;
		form: ActionData;
	};
	let { data, form }: Props = $props();

	let recipients = $derived(
		data.residents.map((r) => ({ id: r.id, name: r.name, phone: r.phoneNumber }))
	);
	let selectedRecipients: Recipient[] = $state([]);
</script>

<div class="flex flex-col items-center gap-4">
	{#if form?.error}
		<Alert class="flex w-fit justify-center" status="error">
			{#snippet icon()}
				<CircleX />
			{/snippet}
			<span>{form.error}</span>
		</Alert>
	{:else if !data.isTwilioConfigured}
		<Alert class="flex w-fit justify-center" status="warning">
			{#snippet icon()}
				<TriangleAlert />
			{/snippet}
			<span>
				Twilio must be configured on the <Link onclick={() => goto('/app/settings')}
					>Settings</Link
				> page
			</span>
		</Alert>
	{/if}
	<h2 class="text-4xl font-semibold">{messages.sms_prompt()}</h2>
	<div class="flex justify-center gap-4">
		<div class="flex flex-col items-center gap-2">
			<h2 class="text-3xl font-medium">Recipients</h2>
			<div class="h-full overflow-y-scroll rounded-lg bg-base-100 p-4">
				<RecipientList {recipients} bind:selected={selectedRecipients} />
			</div>
		</div>
		<form id="sms" method="POST" use:enhance>
			<div class="flex flex-col gap-4">
				<input name="recipients" type="hidden" value={JSON.stringify(selectedRecipients)} />
				<Textarea
					disabled={!data.isTwilioConfigured}
					size="lg"
					error={form?.error}
					name="message"
					placeholder="..."
					form="sms"
					resizable={false}
					cols={40}
					rows={12}
				>
					{#snippet label()}
						<span class="flex items-center gap-2 text-xl">
							<MessageCircleMore size="22" />
							{messages.sms_label_message()}
						</span>
					{/snippet}
				</Textarea>
				<Button full color="primary" disabled={!data.isTwilioConfigured} type="submit">
					{messages.sms_button_submit()}
				</Button>
			</div>
		</form>
	</div>
</div>
