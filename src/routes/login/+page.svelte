<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Container from '$lib/components/common/Container.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { fade } from 'svelte/transition';

	let mode: 'register' | 'login' = $state('login');
	let action = $derived(mode === 'login' ? '?/login' : '?/register');
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

<div class="page" transition:fade>
	<Container>
		<form class="flex w-full flex-col items-center gap-6" method="POST" {action}>
			<h1 class="text-3xl">Hestia</h1>
			<br />
			<div role="tablist" class="tabs tabs-bordered tabs-lg w-full">
				<button
					type="button"
					role="tab"
					class="tab"
					class:tab-active={mode === 'login'}
					onclick={() => {
						mode = 'login';
					}}>Login</button
				>
				<button
					type="button"
					role="tab"
					class="tab"
					class:tab-active={mode === 'register'}
					onclick={() => {
						mode = 'register';
					}}>Register</button
				>
			</div>
			<TextInput start={userIcon} placeholder="Email" name="email" type="email" />
			<TextInput start={passwordIcon} placeholder="Password" name="password" type="password" />
			{#if mode === 'register'}
				<TextInput start={nameIcon} placeholder="Name" name="name" fade />
			{/if}
			<Button block type="submit" label="Submit" outline />
		</form>
	</Container>
</div>

<style>
	.page {
		@apply flex flex-col items-center justify-around gap-24 py-[10%];
	}
</style>