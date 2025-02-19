<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Avatar from './Avatar.svelte';

	const { Story } = defineMeta({
		title: 'Data display/Avatar',
		component: Avatar,
		argTypes: {
			img: {
				control: 'text',
			},
			placeholder: {
				control: 'text',
				defaultValue: 'DP',
			},
			presence: {
				control: 'select',
				options: [undefined, 'online', 'offline'],
			},
			ring: {
				control: 'select',
				options: [
					undefined,
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
			shape: {
				control: 'select',
				options: ['square', 'circle'],
			},
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg'],
			},
		},
	});
</script>

<Story
	name="Default"
	args={{
		img: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
	}}
/>
