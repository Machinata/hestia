<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';
	import Menu from './Menu.svelte';
	import MenuItem from './MenuItem.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Menu',
		component: Menu,
		argTypes: {
			direction: {
				control: 'select',
				options: ['horizontal', 'vertical'],
			},
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg'],
			},
			title: {
				control: 'text',
			},
		},
	});
</script>

{#snippet template(args: Partial<ComponentProps<typeof Menu>>)}
	<Menu {...args}>
		<MenuItem>Item 1</MenuItem>
		<MenuItem>Item 2</MenuItem>
		<MenuItem>Item 3</MenuItem>
	</Menu>
{/snippet}

<Story name="Default" args={{}} children={template} />
<Story name="With Title" args={{ title: 'Title' }} children={template} />