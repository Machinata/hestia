<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/Actions';
	import { Navbar } from '$lib/components/Navigation';
	import { messages } from '$lib/i18n';
	import 'clerk-sveltekit/client';
	import SignOutButton from 'clerk-sveltekit/client/SignOutButton.svelte';
	import { Cog, LogOut, MessageCircleMore, UsersRound } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	type Props = {
		children: Snippet;
		data: PageData;
	};

	let { children, data }: Props = $props();

	let clerk;

	onMount(async () => {
		clerk = window.Clerk;

		if (clerk) {
			if (!clerk.user || clerk.user?.organizationMemberships.length === 0) {
				console.debug('No organizations found');
				await clerk.signOut();
				return;
			}

			/**
			 * Set the active organization to the first one in the list, this is temporary until we let the user choose the organization
			 */
			try {
				// Set the active organization to the first one in the list
				await clerk.setActive({
					organization: clerk.user?.organizationMemberships[0].organization.id,
				});
				console.debug(
					`Active organization set to ${clerk.user?.organizationMemberships[0].organization.id}`
				);
			} catch (error) {
				console.error('Error setting active organization:', error);
			}
		}
	});

	let message = $derived(messages.nav_greeting({ name: data.user.name }));
</script>

{#snippet userMenu()}
	<div class="dropdown dropdown-end">
		<div tabindex="0" role="button" class="btn btn-circle btn-primary btn-sm ring">
			<div class="avatar placeholder online">
				<div class="w-8 rounded-full">
					{#if data.user.hasImage}
						<img src={data.user.imageUrl} alt="Avatar" />
					{:else}
						<span>{data.user.name.at(0)}</span>
					{/if}
				</div>
			</div>
		</div>
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<ul
			tabindex="0"
			class="menu dropdown-content menu-lg z-[1] mt-4 w-52 rounded-box border border-neutral bg-base-200 p-2 text-right shadow"
		>
			<li>
				<button onclick={() => goto('/app/sms')}>
					<MessageCircleMore />
					{messages.nav_menu_sms()}
				</button>
			</li>
			<li>
				<button onclick={() => goto('/app/residents')}>
					<UsersRound />
					{messages.nav_menu_residents()}
				</button>
			</li>
			<li>
				<button onclick={() => goto('/app/settings')}>
					<Cog />
					{messages.nav_menu_settings()}
				</button>
			</li>
			<li>
				<SignOutButton>
					<LogOut />
					{messages.nav_menu_logout()}
				</SignOutButton>
			</li>
		</ul>
	</div>
{/snippet}

<div class="flex h-full flex-col items-stretch gap-4">
	<Navbar>
		{#snippet start()}
			<Button onclick={() => goto('/app')} class="rounded-box" color="ghost">
				<h2 class="prose prose-xl">Hestia</h2>
			</Button>
		{/snippet}
		{#snippet center()}
			<h1 class="prose prose-2xl">Svelte</h1>
		{/snippet}
		{#snippet end()}
			<div class="flex items-center gap-3">
				<p class="prose prose-lg">{message}</p>
				{@render userMenu()}
			</div>
		{/snippet}
	</Navbar>
	<div class="h-full rounded-box bg-base-200 p-8">
		{@render children()}
	</div>
</div>
