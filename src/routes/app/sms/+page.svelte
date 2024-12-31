<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/Actions';
	import { Textarea, TextInput } from '$lib/components/DataInput';
	import { fade } from 'svelte/transition';
	import type { ActionData } from './$types';

	type Props = {
		form: ActionData;
	};
	let { form }: Props = $props();
</script>

{#snippet PhoneIcon()}
	<i class="fi fi-sr-phone-flip"></i>
{/snippet}

{#snippet MessageLabel()}
	<i class="fi fi-sr-comment-alt"></i> Message
{/snippet}

{#snippet alert(message: string)}
	<div role="alert" class="alert alert-error absolute -top-20" transition:fade>
		<i class="fi fi-bs-octagon-xmark h-6 w-6 shrink-0"></i>
		<span>{message}</span>
	</div>
{/snippet}

<div class="page" transition:fade>
	<div class="card bg-base-200 p-4 shadow-xl">
		<div class="card-title justify-center">
			<h2 class="text-2xl font-semibold">Send a Message</h2>
			{#if form?.error}
				{@render alert(form.error)}
			{/if}
		</div>
		<form id="sms" method="POST" action="?/push" use:enhance>
			<div class="card-body">
				<TextInput
					type="tel"
					name="phone"
					start={PhoneIcon}
					placeholder="Phone"
					bordered
					fade
				/>
				<Textarea
					color="primary"
					label={MessageLabel}
					size="lg"
					error={form?.error}
					name="message"
					form="sms"
				/>
			</div>
			<div class="card-actions justify-center px-8">
				<Button color="primary" type="submit" full>Send Message</Button>
			</div>
		</form>
	</div>
</div>

<style>
	.page {
		@apply flex flex-col items-center justify-around gap-24 py-[10%];
	}
</style>
