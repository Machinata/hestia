<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from './Tooltip.svelte';
	import { Button } from '../Actions';
	import type { ComponentProps } from 'svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Tooltip',
		component: Tooltip,
		argTypes: {
			color: {
				control: 'select',
				options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
			},
			open: { control: 'boolean' },
			position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
		},
	});
</script>

{#snippet template(props: ComponentProps<typeof Tooltip>)}
	<Tooltip {...props}>
		<Button color="primary">Button</Button>
	</Tooltip>
{/snippet}

<Story name="Default" args={{ tip: "It's a button" }} children={template} />
