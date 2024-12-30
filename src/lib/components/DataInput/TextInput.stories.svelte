<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TextInput from './TextInput.svelte';

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

{#snippet icon()}
	<i class="fi fi-rr-user"></i>
{/snippet}

<Story name="Text Label" args={{ color: 'primary', name: 'text', start: 'Text' }} />
<Story name="Icon Start" args={{ color: 'secondary', name: 'text', start: icon }} />
<Story name="Icon End" args={{ color: 'secondary', name: 'text', end: icon }} />