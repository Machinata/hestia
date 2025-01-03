<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Divider from './Divider.svelte';
	import type { ComponentProps } from 'svelte';

	const { Story } = defineMeta({
		title: 'Layout/Divider',
		component: Divider,
		argTypes: {
			color: {
				control: 'select',
				options: [
					'neutral',
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error',
				],
			},
			direction: { control: 'select', options: ['horizontal', 'vertical'] },
			variant: { control: 'select', options: ['start', 'end'] },
		},
	});
</script>

{#snippet template(props: ComponentProps<typeof Divider>)}
	<div
		class="flex"
		class:flex-row={props.direction === 'horizontal'}
		class:flex-col={props.direction === 'vertical'}
	>
		<span>Side A</span>
		<Divider {...props} />
		<span>Side B</span>
	</div>
{/snippet}

<Story name="Default" args={{}} children={template} />
