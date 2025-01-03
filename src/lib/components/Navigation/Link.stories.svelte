<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import type { ComponentProps } from 'svelte';
	import Link from './Link.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Link',
		component: Link,
		argTypes: {
			color: {
				control: 'select',
				options: [
					'primary',
					'secondary',
					'accent',
					'neutral',
					'info',
					'success',
					'warning',
					'error',
				],
			},
		},
	});
</script>

{#snippet template(props: ComponentProps<typeof Link>)}
	<Link {...props}>Hello world!</Link>
{/snippet}

<Story name="Default" children={template} />
