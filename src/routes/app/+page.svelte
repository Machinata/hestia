<script lang="ts">
	import { Avatar } from '$lib/components/Datadisplay';
	import { messages } from '$lib/i18n';
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	let message = $derived(messages.nav_greeting({ name: data.user.name }));
	let initials = $derived(data.user.name.split(' ').reduce((col, name) => col + name.at(0), ''));
</script>

<div class="flex flex-col items-center gap-2">
	<Avatar img={data.user.imageUrl} placeholder={initials} size="sm" ring="primary" />
	<h1 class="prose prose-2xl">{message}</h1>
</div>
