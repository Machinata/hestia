<script lang="ts" module>
	export type Recipient = {
		id: string;
		name: string;
		phone: string;
	};
</script>

<script lang="ts">
	import clsx from 'clsx';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		recipients: Recipient[];
		selected: Recipient[];
	} & Omit<SvelteHTMLElements['table'], 'children'>;

	let { recipients, selected = $bindable([]), class: className, ...props }: Props = $props();

	let checked = $state(recipients.map(() => false));

	$effect(() => {
		selected = checked
			.entries()
			.filter(([, val]) => val)
			.map(([index]) => recipients[index])
			.toArray();
	});
</script>

<table {...props} class={twMerge('table', clsx(className))}>
	<thead>
		<tr>
			<th>
				<input
					class="checkbox"
					type="checkbox"
					onchange={({ currentTarget }) => {
						checked = checked.map(() => currentTarget.checked);
					}}
				/>
			</th>
			<th> Name </th>
		</tr>
	</thead>
	<tbody>
		{#each recipients as resident, index}
			<tr>
				<th
					><input
						class="checkbox"
						type="checkbox"
						checked={checked[index]}
						onchange={({ currentTarget }) => {
							checked[index] = currentTarget.checked;
						}}
					/></th
				>
				<td>{resident.name}</td>
			</tr>
		{/each}
	</tbody>
</table>
