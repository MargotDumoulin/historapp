<script lang="ts">
	import type { LayoutData } from '../../$types';
	import { page } from '$app/stores';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { Database } from '$lib/types/database.types';

	export let data: LayoutData;

	let invitation: Database['public']['Tables']['documents_invitations']['Row'] | null;
	let loading: boolean = true;

	const acceptInvitationInDb = async (id: string) => {
		const { data: invData, error } = await data?.supabase
			.from('documents_invitations')
			.update({ accepted: true })
			.eq('id', id)
			.select()
			.maybeSingle();

		if (!error) {
			invitation = invData;
		}

		loading = false;
	};

	page.subscribe(({ params }) => {
		acceptInvitationInDb(params.id);
	});
</script>

<div class="flex justify-center items-center flex-col w-full h-full m-0 p-0">
	<div class="flex">
		<!-- {#if loading}
			<div class="flex justify-center m-10">
				<ProgressRadial ... stroke={80} meter="stroke-primary-500" track="stroke-primary-500/30" />
			</div>
		{:else if invitation} -->
		<h1 class="mr-1">Invitation</h1>
		<h1>
			<span
				class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
				>accepted</span
			>
		</h1>
		<!-- <div>
				<a href={`/edition/${invitation.id_document}`} class="btn btn-sm variant-soft-primary mt-5"
					>View document</a
				>
			</div> -->
		<!-- {:else}
			<h2>We encountered an issue.</h2>
		{/if} -->
	</div>
</div>

<style lang="postcss">
</style>
