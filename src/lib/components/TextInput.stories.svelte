<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TextInput from './TextInput.svelte';

	const { Story } = defineMeta({
		title: 'TextInput',
		component: TextInput,
		tags: ['autodocs'],
		argTypes: {
			color: {
				control: 'select',
				options: [
					'primary',
					'secondary',
					'accent',
					'ghost',
					'link',
					'info',
					'success',
					'warning',
					'error'
				]
			},
			bordered: {
				control: 'boolean'
			},
			size: {
				control: 'select',
				options: ['Default', 'xs', 'sm', 'lg'],
				defaultValue: 'Default'
			},
			type: {
				control: 'select',
				options: ['email', 'password', 'search', 'tel', 'text', 'url']
			}
		}
	});
</script>

{#snippet icon()}
	<i class="fi fi-rr-user"></i>
{/snippet}

<Story name="Text Label" args={{ color: 'primary', name: 'text', start: 'Text' }} />
<Story name="Icon Start" args={{ color: 'secondary', name: 'text', start: icon }} />
<Story name="Icon End" args={{ color: 'secondary', name: 'text', end: icon }} />