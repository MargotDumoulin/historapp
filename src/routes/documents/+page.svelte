<script lang="ts">
	import Tiptap from '$lib/components/Tiptap.svelte';
	import {
		Modal,
		ProgressRadial,
		Table,
		tableMapperValues,
		type TableSource
	} from '@skeletonlabs/skeleton';
	import type { LayoutData } from '../$types';
	import { onMount } from 'svelte';
	import { modalStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { Modals, closeModal } from 'svelte-modals';
	import { openModal } from 'svelte-modals';
	import ShareDocumentForm from '$lib/components/ShareDocumentForm.svelte';
	import type { Database } from '$lib/types/database.types';

	export let data: LayoutData;
	$: ({ supabase, session } = data);

	let sourceData: Database['public']['Views']['authorized_documents']['Row'][];

	const fetchDocuments = async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser(); // TODO: remove when user is correctly put in store :)

		const { data, error } = await supabase
			.from('authorized_documents')
			.select()
			.match({ id_user: user?.id });
		if (!error) {
			console.log({ data });
			sourceData = data;
		}
	};

	const goToEdit = (id: number) => {
		goto(`/edition/${id}`);
	};

	const createDocument = async () => {
		if (!session) return;

		const { data: createdDocumentData, error } = await supabase
			.from('documents')
			.insert({ id_owner: session.user.id })
			.select()
			.maybeSingle();

		if (createdDocumentData) {
			// TODO: Do not harcode the role's id.
			await supabase
				.from('documents_security')
				.insert({ id_user: session.user.id, id_document: createdDocumentData.id, id_role: 2 })
				.select()
				.maybeSingle();

			goto(`/edition/${createdDocumentData.id}`);
		}
	};

	const openShareDocumentModal = (documentId: number) => {
		openModal(ShareDocumentForm, { supabase, documentId });
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
						{#each sourceData as doc, i (doc.id)}
							<tr>
								<td>
									<div class="row-container">
										<div>{doc.name}</div>
										<div>
											<button
												class="btn-sm variant-soft bg-tertiary-50 text-tertiary-500 font-bold py-2 px-4 rounded-full inline-flex items-center"
												on:click={() => openShareDocumentModal(Number(doc.id))}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 16 16"
													fill="currentColor"
													class="w-3 h-3"
													><path
														d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
													/></svg
												>
											</button>
											<button
												class="m-2 btn-sm variant-soft bg-primary-50 text-primary-500 font-bold py-2 px-4 rounded-full inline-flex items-center"
												on:click={() => goToEdit(Number(doc.id))}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="currentColor"
													class="w-3 h-3"
													><path
														d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"
													/></svg
												>
											</button>
										</div>
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
</style>
