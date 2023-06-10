<script lang="ts">
	import Tiptap from '$lib/components/Tiptap.svelte';
	import {
		ProgressRadial,
		Table,
		tableMapperValues,
		type TableSource
	} from '@skeletonlabs/skeleton';
	import type { LayoutData } from '../$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: LayoutData;
	$: ({ supabase, session } = data);

	// TODO: type !!
	let sourceData: any;

	const fetchDocuments = async () => {
		const { data, error } = await supabase.from('documents').select();
		if (!error) {
			sourceData = data;
		}
	};

	const goToEdit = (id: number) => {
		goto(`/edition/${id}`);
	};

	const createDocument = async () => {
		const {
			data: { id },
			error
		} = await supabase.from('documents').insert({ id_owner: session?.user.id }).select();
		goto(`/edition/${id}`);
	};

	let loading = true;

	onMount(async () => {
		await fetchDocuments();
		loading = false;
	});
</script>

<div class="p-20 flex items-center justify-content mx-auto flex-col">
	<div class="w-full h-full">
		<div class="w-full flex items-end justify-between">
			<h4 class="ml-2 mb-1">Documents</h4>
			<button
				class="m-2 btn-sm variant-soft font-bold py-2 px-4 rounded-full inline-flex items-center"
				on:click={createDocument}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-3 h-3 mr-1"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg
				>
				<span>Add</span>
			</button>
		</div>
		<div class="sheet-container p-5 card shadow-md">
			{#if sourceData?.length > 0}
				<table>
					<tbody>
						{#each sourceData as document, i (document.id)}
							<tr>
								<td>
									<div class="row-container">
										<div>{document.name}</div>
										<button
											class="m-2 btn-sm variant-soft bg-tertiary-50 text-tertiary-500 font-bold py-2 px-4 rounded-full inline-flex items-center"
											on:click={() => goToEdit(document.id)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												class="w-3 h-3 mr-2"
												><path
													d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"
												/></svg
											>
											<span>Edit</span>
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else if loading}
				<div class="flex justify-center m-10">
					<ProgressRadial
						...
						stroke={80}
						meter="stroke-primary-500"
						track="stroke-primary-500/30"
					/>
				</div>
			{:else}
				<div>No documents found.</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.sheet-container {
		background-color: white;
	}

	table {
		width: 100%;
	}

	tr {
		height: 50px;
	}

	thead {
		border-bottom: 1px solid;
	}

	.row-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 5px;
		padding-bottom: 5px;
	}

	tr:not(:last-child) {
		border-bottom: 1px solid #e3e3e3;
	}

	.row-container > button {
		margin-right: 20px;
	}
</style>
