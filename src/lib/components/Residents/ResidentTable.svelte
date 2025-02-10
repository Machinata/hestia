<script lang="ts" module>
	export type ResidentItem = Pick<Resident, 'id' | 'name' | 'phoneNumber'>;
</script>

<script lang="ts">
	import type { Resident } from '@prisma/client';
	import clsx from 'clsx';
	import { UserRoundPen } from 'lucide-svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';
	import Button from '../Actions/Button.svelte';
	import { messages } from '$lib/i18n';

	type Props = {
		items?: ResidentItem[];
		onEdit?: (resident: ResidentItem) => void;
	} & Omit<SvelteHTMLElements['table'], 'children'>;

	let { items, onEdit, class: className, ...props }: Props = $props();
</script>

<table {...props} class={twMerge('table', clsx(className))}>
	<!-- head -->
	<thead>
		<tr class="bg-base-100">
			<th>#</th>
			<th>Name</th>
			<th>Phone Number</th>
			{#if onEdit}
				<th class="flex justify-end"><UserRoundPen class="mx-3" /></th>
			{/if}
		</tr>
	</thead>
	<tbody>
		<!-- items -->
		{#if items}
			{#each items as resident, index (resident.id)}
				<tr class="hover">
					<th>{index + 1}</th>
					<td>{resident.name}</td>
					<td>{resident.phoneNumber}</td>
					{#if onEdit}
						<td class="text-end">
							<Button size="sm" color="accent" onclick={() => onEdit(resident)}>
								{messages.residents_table_edit()}
							</Button>
						</td>
					{/if}
				</tr>
			{/each}
		{/if}
	</tbody>
</table>
