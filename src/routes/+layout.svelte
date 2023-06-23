<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { Modals, closeModal } from 'svelte-modals';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	const logout = () => {
		supabase.auth.signOut();
	};
</script>

{#if $page.url.pathname === '/login' || $page.url.pathname === '/signup'}
	<slot />
{:else}
	<Modals>
		<div slot="backdrop" class="backdrop" on:click={closeModal} />
	</Modals>
	<AppShell>
		<svelte:fragment slot="header">
			<AppBar>
				<svelte:fragment slot="lead">
					<a href="/"><strong class="text-xl">Historapp</strong></a>
					<a href="/documents"><div class="ml-5 font-normal mt-1 text-base">Documents</div></a>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<button class="btn btn-sm variant-soft-primary" on:click={logout}> Logout </button>
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>

		<slot />
	</AppShell>
{/if}

<style>
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
