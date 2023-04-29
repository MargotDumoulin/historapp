<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			console.log('on est laaaaaaaa');
			console.log({ sessionFromIci: session });
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

{#if $page.url.pathname === '/login' || $page.url.pathname === '/signup'}
	<slot />
{:else}
	<AppShell>
		<svelte:fragment slot="header">
			<AppBar>
				<svelte:fragment slot="lead">
					<a href="/"><strong class="text-xl">Historapp</strong></a>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<a class="btn btn-sm variant-soft-primary" href="/login"> Se déconnecter </a>
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>

		<slot />
	</AppShell>
{/if}
