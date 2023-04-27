<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	// import * as dotenv from 'dotenv';

	// dotenv.config();
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
