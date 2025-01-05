<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/Actions';
	import { Textarea, TextInput } from '$lib/components/DataInput';
	import { fade } from 'svelte/transition';
	import type { ActionData } from './$types';
	import { messages } from '$lib/i18n';

	type Props = {
		form: ActionData;
	};
	let { form }: Props = $props();
</script>

{#snippet PhoneLabel()}
	<i class="fi fi-sr-phone-flip"></i> {messages.sms_label_phone()}
{/snippet}

{#snippet MessageLabel()}
	<i class="fi fi-sr-comment-alt"></i> {messages.sms_label_message()}
{/snippet}

{#snippet alert(message: string)}
	<div role="alert" class="alert alert-error absolute -top-20" transition:fade>
		<i class="fi fi-bs-octagon-xmark h-6 w-6 shrink-0"></i>
		<span>{message}</span>
	</div>
{/snippet}

<div class="page" transition:fade>
	<div class="card bg-base-200 px-4 pt-4 shadow-xl">
		<div class="card-title justify-center">
			<h2 class="text-2xl font-semibold">{messages.sms_prompt()}</h2>
			{#if form?.error}
				{@render alert(form.error)}
			{/if}
		</div>
		<form id="sms" method="POST" action="?/push" use:enhance>
			<div class="card-body">
				<TextInput
					type="tel"
					name="phone"
					label={PhoneLabel}
					placeholder="XXX-XXX-XXXX"
					bordered
					fade
				/>
				<Textarea
					label={MessageLabel}
					size="lg"
					error={form?.error}
					name="message"
					placeholder="..."
					form="sms"
				/>
			</div>
			<div class="card-actions justify-center px-8 pb-4">
				<Button type="submit" variant="outline" full>{messages.sms_button_submit()}</Button>
			</div>
		</form>
	</div>
</div>

<style>
	.page {
		@apply flex flex-col items-center justify-around gap-24 py-[10%];
	}
</style>
