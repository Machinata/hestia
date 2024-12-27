<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Dropdown, DropdownItem } from '$lib/components/Actions';
	import { TextInput } from '$lib/components/DataInput';
	import { messages } from '$lib/i18n';
	import type { Resident } from '@prisma/client';

	interface Props {
		data: {
			residents: Resident[];
		};
	}

	let { data }: Props = $props();
</script>

{#snippet Form()}
	<form method="POST" action="?/create" use:enhance>
		<TextInput name="name" placeholder={messages.residents_form_name()} />
		<TextInput name="phone" placeholder={messages.residents_form_phone()} type="tel" />
		<TextInput name="email" placeholder={messages.residents_form_email()} type="email" />
		<Button outline label={messages.residents_form_submit()} type="submit" />
	</form>
{/snippet}

{#snippet EditIcon()}
	<i class="fi fi-rr-file-edit"></i>
{/snippet}

{#snippet Table(data: Resident[])}
	<table class="table">
		<thead>
			<tr>
				<td>{messages.residents_table_name()}</td>
				<td>{messages.residents_table_phone()}</td>
				<td>{messages.residents_table_email()}</td>
				<td></td>
			</tr>
		</thead>
		<tbody>
			{#each data as resident}
				<tr>
					<td>{resident.name}</td>
					<td>{resident.phone}</td>
					<td>{resident.email}</td>
					<td>
						<Dropdown label={EditIcon}>
							<DropdownItem>Edit</DropdownItem>
							<form><DropdownItem>Delete</DropdownItem></form>
						</Dropdown></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
{/snippet}

<div>
	{@render Form()}
	{@render Table(data.residents)}
</div>