<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';
	import ResidentTable from './ResidentTable.svelte';

	const { Story } = defineMeta({
		title: 'Residents/Resident Table',
		component: ResidentTable,
		argTypes: {},
	});
</script>

{#snippet template(props: ComponentProps<typeof ResidentTable>)}
	<ResidentTable {...props} />
{/snippet}

<Story
	name="Default"
	children={template}
	args={{ items: [{ name: 'Resident 1', phoneNumber: '111-1111' }] }}
/>
