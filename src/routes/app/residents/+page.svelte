<script lang="ts">
	import type { Resident } from '@prisma/client';

	interface Props {
		data: {
			residents: Resident[];
		};
	}

	let { data }: Props = $props();

	let residents = $derived(
		data.residents.map((resident) => {
			const { id: _, createdAt: __, updatedAt: ___, ...picked } = resident;
			return picked;
		})
	);
</script>

{#snippet Table(data: Pick<Resident, 'name' | 'phone' | 'email'>[])}
	<table class="table">
		<thead>
			<tr>
				<td>Name</td>
				<td>Phone #</td>
				<td>Email</td>
			</tr>
		</thead>
		<tbody>
			{#each data as resident}
				<tr>
					{#each Object.values(resident) as col}
						<td>{col}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/snippet}

<div>
	{@render Table(residents)}
</div>