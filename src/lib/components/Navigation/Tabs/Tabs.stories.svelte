<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';
	import Tabs from './Tabs.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Tabs',
		component: Tabs,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: 'select',
				options: ['xs', 'sm', 'rg', 'lg'],
			},
			variant: {
				control: 'select',
				options: ['none', 'bordered', 'lifted', 'boxed'],
			},
		},
	});
</script>

{#snippet template(args: Partial<ComponentProps<typeof Tabs>>)}
	<Tabs tabs={['Tab 1', 'Tab 2']} {...args} />
{/snippet}

<Story name="Default" args={{}} children={template} />
