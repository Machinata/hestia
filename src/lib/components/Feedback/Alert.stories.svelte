<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from './Alert.svelte';
	import type { ComponentProps } from 'svelte';
	import { InfoIcon } from '../Icons';

	const { Story } = defineMeta({
		title: 'Feedback/Alert',
		component: Alert,
		argTypes: {
			status: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
		},
	});
</script>

{#snippet template(props: ComponentProps<typeof Alert>)}
	<Alert {...props}>
		{#snippet icon()}
			<InfoIcon class="h-6 w-6 shrink-0 stroke-info" />
		{/snippet}
		<span>Hello world!</span>
	</Alert>
{/snippet}

<Story name="Default" args={{}} children={template} />
