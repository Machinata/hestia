<script lang="ts">
	import { Navbar } from '$lib/components/Navigation';
	import type { User } from '@prisma/client';
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import 'clerk-sveltekit/client';

	type Props = {
		children: Snippet;
		data: {
			user: Omit<User, 'password'>;
		};
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
</script>

<Navbar title="Svelte" username={data.user.name} />
{@render children()}
