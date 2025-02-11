<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';
	import ResidentTable from './ResidentTable.svelte';

	const { Story } = defineMeta({
		title: 'Residents/Resident Table',
		component: ResidentTable,
	});
</script>

{#snippet template(props: ComponentProps<typeof ResidentTable>)}
	<ResidentTable {...props} />
{/snippet}

<Story
	name="Default"
	children={template}
	args={{
		items: [
			{
				id: '99fc03e9-3ed1-4047-b9ad-0bf2a9025eaa',
				name: 'Resident 1',
				phoneNumber: '111-1111',
			},
		],
	}}
/>
