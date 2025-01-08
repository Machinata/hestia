<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Info } from 'lucide-svelte';
	import type { ComponentProps } from 'svelte';
	import Alert from './Alert.svelte';

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
			<Info />
		{/snippet}
		<span>Hello world!</span>
	</Alert>
{/snippet}

<Story name="Default" args={{}} children={template} />
