<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/Actions';
	import { Textarea, TextInput } from '$lib/components/DataInput';
	import { Alert } from '$lib/components/Feedback';
	import { Link } from '$lib/components/Navigation';
	import { messages } from '$lib/i18n';
	import { CircleX, MessageCircleMore, PhoneOutgoing, TriangleAlert } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import type { ActionData, PageData } from './$types';

	type Props = {
		data: PageData;
		form: ActionData;
	};
	let { data, form }: Props = $props();
	let isConfigMissing = $derived(!data.configs);
</script>

{#snippet PhoneLabel()}
	<PhoneOutgoing size="18" /> {messages.sms_label_phone()}
{/snippet}

{#snippet MessageLabel()}
	<MessageCircleMore size="18" /> {messages.sms_label_message()}
{/snippet}

<div class="page" transition:fade>
	<div class="card bg-base-200 px-4 pt-4 shadow-xl">
		{#if form?.error}
			<Alert status="error">
				{#snippet icon()}
					<CircleX />
				{/snippet}
				<span>{form.error}</span>
			</Alert>
		{:else if isConfigMissing}
			<Alert status="warning">
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
		<div class="card-title justify-center">
			<h2 class="text-2xl font-semibold">{messages.sms_prompt()}</h2>
		</div>
		<form id="sms" method="POST" action="?/push" use:enhance>
			<div class="card-body">
				<TextInput
					disabled={isConfigMissing}
					type="tel"
					name="phone"
					label={PhoneLabel}
					placeholder="XXX-XXX-XXXX"
					bordered
					fade
				/>
				<Textarea
					disabled={isConfigMissing}
					label={MessageLabel}
					size="lg"
					error={form?.error}
					name="message"
					placeholder="..."
					form="sms"
				/>
			</div>
			<div class="card-actions justify-center px-8 pb-4">
				<Button disabled={isConfigMissing} type="submit" variant="outline" full>
					{messages.sms_button_submit()}
				</Button>
			</div>
		</form>
	</div>
</div>

<style>
	.page {
		@apply flex flex-col items-center justify-around gap-24 py-[10%];
	}
</style>
