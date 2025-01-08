<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TextInput from './TextInput.svelte';
	import { User } from 'lucide-svelte';

	const { Story } = defineMeta({
		title: 'Data Input/Text Input',
		component: TextInput,
		argTypes: {
			bordered: {
				control: 'boolean',
			},
			color: {
				control: 'select',
				options: [
					'ghost',
					'primary',
					'secondary',
					'accent',
					'info',
					'success',
					'warning',
					'error',
				],
			},
			disabled: {
				control: 'boolean',
			},
			error: {
				control: 'text',
			},
			fade: { control: 'boolean' },
			start: { control: 'text' },
			end: { control: 'text' },
			label: { control: 'text' },
			placeholder: { control: 'text' },
			size: {
				control: 'select',
				options: ['xs', 'sm', '-', 'lg'],
			},
			type: {
				control: 'select',
				options: ['email', 'password', 'search', 'tel', 'text', 'url'],
			},
		},
	});
</script>

<Story name="Text Label" args={{ color: 'primary', name: 'text', start: 'Text' }} />
<Story name="Icon Start">
	<TextInput name="text" color="secondary">
		{#snippet start()}
			<User />
		{/snippet}
	</TextInput>
</Story>
<Story name="Icon End">
	<TextInput name="text" color="secondary">
		{#snippet end()}
			<User />
		{/snippet}
	</TextInput>
</Story>
