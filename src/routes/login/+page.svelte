<script lang="ts">
	import { TextInput } from '$lib/components/DataInput';
	import { Button } from '$lib/components/Actions';
	import Tabs from '$lib/components/Navigation/Tabs';
	import { messages } from '$lib/i18n/index.js';
	import { fade } from 'svelte/transition';

	let { form } = $props();

	let tab: 0 | 1 = $state(0);
</script>

{#snippet userIcon()}
	<i class="fi fi-br-envelope"></i>
{/snippet}

{#snippet passwordIcon()}
	<i class="fi fi-br-key"></i>
{/snippet}

{#snippet nameIcon()}
	<i class="fi fi-rr-user"></i>
{/snippet}

{#snippet alert(message: string)}
	<div role="alert" class="alert alert-error absolute -top-20" transition:fade>
		<i class="fi fi-bs-octagon-xmark h-6 w-6 shrink-0"></i>
		<span>{message}</span>
	</div>
{/snippet}

{#snippet Form(variant: 'login' | 'register')}
	<form method="POST" action={`?/${variant}`}>
		<div class="card-body gap-4">
			<TextInput
				start={userIcon}
				placeholder={messages.login_label_email()}
				name="email"
				type="email"
			/>
			<TextInput
				start={passwordIcon}
				placeholder={messages.login_label_password()}
				name="password"
				type="password"
			/>
			{#if variant === 'register'}
				<TextInput
					start={nameIcon}
					placeholder={messages.login_label_name()}
					name="name"
					fade
				/>
			{/if}
		</div>
		<div class="card-actions px-4">
			<Button block type="submit" outline>{messages.login_button_submit()}</Button>
		</div>
	</form>
{/snippet}

<div class="page" transition:fade>
	<div class="card bg-base-200 py-4 shadow-xl">
		<div class="card-title">
			{#if form}
				{@render alert(Object.values(form)[0].error)}
			{/if}
			<Tabs
				variant="bordered"
				bind:selected={tab}
				tabs={[messages.login_tab_login(), messages.login_tab_register()]}
			/>
		</div>
		{@render Form(tab === 0 ? 'login' : 'register')}
	</div>
</div>

<style>
	.page {
		@apply flex flex-col items-center justify-around gap-24 py-[10%];
	}
</style>