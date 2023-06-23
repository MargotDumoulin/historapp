<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { LayoutData } from '../$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { openModal } from 'svelte-modals';
	import ShareDocumentForm from '$lib/components/ShareDocumentForm.svelte';
	import type { Database } from '$lib/types/database.types';
	import type { User } from '@supabase/supabase-js';
	import { fetchUserFromSession } from '../../database/users/auth';
	import { fetchAuthorizedDocuments, insertDocument } from '../../database/documents';
	import { insertDocumentSecurityRow } from '../../database/documents/security';

	export let data: LayoutData;
	$: ({ supabase } = data);

	let sourceData: Database['public']['Views']['authorized_documents']['Row'][];
	let user: User | null;

	const fetchUser = async () => {
		user = (await fetchUserFromSession(supabase)).data.user;
	};

	const fetchDocuments = async () => {
		if (!user?.id) return;
		const { data, error } = await fetchAuthorizedDocuments(supabase, user.id);
		if (!error) sourceData = data;
	};

	const goToEdit = (id: number) => {
		goto(`/edition/${id}`);
	};

	const createDocument = async () => {
		if (!user?.id) return;

		const { data: createdDocumentData } = await insertDocument(supabase, user.id);

		if (createdDocumentData) {
			await insertDocumentSecurityRow(supabase, user.id, createdDocumentData.id);
			goto(`/edition/${createdDocumentData.id}`);
		}
	};

	const openShareDocumentModal = (documentId: number) => {
		openModal(ShareDocumentForm, { supabase, documentId });
	};

	const getColor = (document: Database['public']['Views']['authorized_documents']['Row']) =>
		document.edit ? 'primary' : 'secondary';

	let loading = true;

	onMount(async () => {
		await fetchUser();
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
										<div class="flex">
											<div class="m-2">
												<span
													class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
													>{doc.role_name}</span
												>
											</div>
											<button
												class="my-2 btn-sm variant-soft bg-tertiary-50 text-tertiary-500 font-bold py-2 px-4 rounded-full inline-flex items-center"
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
												class={`m-2 btn-sm variant-soft bg-${getColor(doc)}-50 text-${getColor(
													doc
												)}-500 font-bold py-2 px-4 rounded-full inline-flex items-center`}
												on:click={() => goToEdit(Number(doc.id))}
											>
												{#if doc.edit}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="currentColor"
														class="w-3 h-3"
														><path
															d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"
														/></svg
													>
												{:else}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 16 16"
														fill="currentColor"
														class="w-3 h-3"
													>
														<path
															d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
														/>
														<path
															d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
														/>
													</svg>
												{/if}
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
