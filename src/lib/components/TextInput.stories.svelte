<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TextInput from './TextInput.svelte';

	const { Story } = defineMeta({
		title: 'TextInput',
		component: TextInput,
		tags: ['autodocs'],
		argTypes: {}
	});
</script>

<Story name="Text" args={{ label: 'Text', name: 'text' }} />