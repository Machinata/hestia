<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';
	import Dropdown from './Dropdown.svelte';
	import DropdownItem from './DropdownItem.svelte';

	const { Story } = defineMeta({
		title: 'Actions/Dropdown',
		component: Dropdown,
		argTypes: {
			position: {
				control: 'select',
				options: ['top', 'bottom', 'left', 'right', 'end'],
			},
		},
	});
</script>

{#snippet template(args: Partial<ComponentProps<typeof Dropdown>>)}
	<Dropdown label="Click me!" {...args}>
		<DropdownItem>Item 1</DropdownItem>
		<DropdownItem>Item 2</DropdownItem>
		<DropdownItem>Item 3</DropdownItem>
		<DropdownItem>Item 4</DropdownItem>
	</Dropdown>
{/snippet}

<Story name="Default" args={{}} children={template} />