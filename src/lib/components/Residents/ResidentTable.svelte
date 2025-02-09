<script lang="ts">
	import type { Resident } from '@prisma/client';
	import clsx from 'clsx';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		items: Pick<Resident, 'id' | 'name' | 'phoneNumber'>[];
	} & Omit<SvelteHTMLElements['table'], 'children'>;

	let { items, class: className, ...props }: Props = $props();
</script>

<table {...props} class={twMerge('table', clsx(className))}>
	<!-- head -->
	<thead>
		<tr class="bg-base-100">
			<th></th>
			<th>Name</th>
			<th>Phone Number</th>
		</tr>
	</thead>
	<tbody>
		<!-- items -->
		{#each items as resident, index (resident.id)}
			<tr class="hover">
				<th>{index + 1}</th>
				<td>{resident.name}</td>
				<td>{resident.phoneNumber}</td>
			</tr>
		{/each}
	</tbody>
</table>
