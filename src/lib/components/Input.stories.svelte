<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Input from './Input.svelte';

	const { Story } = defineMeta({
		title: 'Input',
		component: Input,
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: 'select',
				options: [
					'number',
					'button',
					'checkbox',
					'color',
					'date',
					'datetime-local',
					'email',
					'file',
					'hidden',
					'image',
					'month',
					'password',
					'radio',
					'range',
					'reset',
					'search',
					'submit',
					'tel',
					'text',
					'time',
					'url',
					'week'
				]
			}
		}
	});
</script>

<Story name="Text" args={{ label: 'Text', name: 'text', type: 'text' }} />
<Story name="Password" args={{ label: 'Password', name: 'pass', type: 'password' }} />
<Story name="Email" args={{ label: 'Email', name: 'email', type: 'email' }} />
