<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/Actions';
	import { TextInput } from '$lib/components/DataInput';
	import Divider from '$lib/components/Layout/Divider.svelte';
	import { messages } from '$lib/i18n';
	import { Fingerprint, KeyRound, PhoneOutgoing } from 'lucide-svelte';
	import type { ActionData, PageData } from './$types';

	type Props = {
		data: PageData;
		form: ActionData;
	};
	let { data, form }: Props = $props();

	let configs = $derived(form?.configs ?? data.configs);
</script>

<div class="flex flex-col items-stretch justify-around">
	<h2 class="text-center text-2xl font-semibold">{messages.settings_title()}</h2>
	{#if form?.error}
		<div role="alert" class="alert alert-error">
			<i class="fi fi-bs-octagon-xmark h-6 w-6 shrink-0"></i>
			<span>{form.error}</span>
		</div>
	{/if}
	<Divider />
	<form id="sms" method="POST" use:enhance>
		<div class="mx-auto flex w-1/3 flex-col gap-4">
			<div class="flex flex-col gap-2">
				<!-- Twilio -->
				<h2 class="text-2xl font-semibold">{messages.settings_category_twilio()}</h2>
				<TextInput
					defaultvalue={configs?.twilioConfig?.accountSID}
					name="twilioAccountSID"
					placeholder="..."
					bordered
					fade
				>
					{#snippet label()}
						<div class="flex gap-2">
							<Fingerprint size="18" />
							{messages.settings_twilio_account_sid()}
						</div>
					{/snippet}
				</TextInput>
				<TextInput
					defaultvalue={configs?.twilioConfig?.authToken}
					name="twilioAuthToken"
					placeholder="..."
					type="password"
					bordered
					fade
				>
					{#snippet label()}
						<div class="flex gap-2">
							<KeyRound size="18" />
							{messages.settings_twilio_auth_token()}
						</div>
					{/snippet}
				</TextInput>
				<TextInput
					defaultvalue={configs?.twilioConfig?.phoneNumber}
					name="twilioPhoneNumber"
					placeholder="+1XXX-XXX-XXXX"
					bordered
					fade
				>
					{#snippet label()}
						<div class="flex gap-2">
							<PhoneOutgoing size="18" />
							{messages.settings_twilio_phone_number()}
						</div>
					{/snippet}
				</TextInput>
			</div>
			<Button type="submit" variant="outline" full>{messages.settings_save()}</Button>
		</div>
	</form>
</div>
