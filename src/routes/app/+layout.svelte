<script lang="ts">
	import { Navbar } from '$lib/components/Navigation';
	import type { User } from '@prisma/client';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		data: Omit<User, 'password'>;
	};

	let { children, data }: Props = $props();
</script>

<Navbar title="Svelte" username={data.name} />
{@render children()}
