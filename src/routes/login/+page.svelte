<script lang="ts">
	import Button from '$lib/components/common/Button';
	import TextInput from '$lib/components/common/TextInput';
	import Tabs from '$lib/components/Navigation/Tabs';
	import { fade } from 'svelte/transition';

	let tab: 0 | 1 = $state(0);
</script>

{#snippet userIcon()}
	<i class="fi fi-br-envelope"></i>
{/snippet}

{#snippet passwordIcon()}
	<i class="fi fi-br-key"></i>
{/snippet}

{#snippet nameIcon()}
	<i class="fi fi-rr-user"></i>
{/snippet}

{#snippet form(variant: 'login' | 'register')}
	<form method="POST" action={`?/${variant}`}>
		<div class="card-body gap-4">
			<TextInput start={userIcon} placeholder="Email" name="email" type="email" />
			<TextInput start={passwordIcon} placeholder="Password" name="password" type="password" />
			{#if variant === 'register'}
				<TextInput start={nameIcon} placeholder="Name" name="name" fade />
			{/if}
		</div>
		<div class="card-actions px-4">
			<Button block type="submit" label="Submit" outline />
		</div>
	</form>
{/snippet}

<div class="page" transition:fade>
	<div class="card bg-base-200 py-4 shadow-xl">
		<div class="card-title">
			<Tabs variant="bordered" bind:selected={tab} tabs={['Login', 'Register']} />
		</div>
		{@render form(tab === 0 ? 'login' : 'register')}
	</div>
</div>

<style>
	.page {
		@apply flex flex-col items-center justify-around gap-24 py-[10%];
	}
</style>