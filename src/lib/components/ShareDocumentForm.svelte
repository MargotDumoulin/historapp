<script lang="ts">
	import { closeModal } from 'svelte-modals';
	import AutoComplete from 'simple-svelte-autocomplete';
	import type { LayoutData } from '../../routes/$types';
	import { onMount } from 'svelte';
	import type { Database } from '$lib/types/database.types';

	export let isOpen: boolean;
	export let supabase: LayoutData['supabase'];
	export let documentId: number;

	let selectedUser: Database['public']['Tables']['users']['Row'];
	let selectedRole: Database['public']['Tables']['documents_roles']['Row'];

	const getUsers = async (text: string) => {
		const { data } = await supabase.from('auth_users').select().match({ email: text });
		return data || [];
	};

	const getRoles = async (text: string) => {
		const { data } = await supabase.from('documents_roles').select();
		return data || [];
	};

	const sendForm = async () => {
		if (!selectedRole || !selectedUser) return;

		await supabase
			.from('documents_invitations')
			.insert({ id_user: selectedUser.id, id_role: selectedRole.id, id_document: documentId });

		closeModal();
	};

	onMount(() => {
		// Removes the "select" class which Skeleton UI uses to enforce its style :(
		Object.values(document.getElementsByClassName('autocomplete')).forEach((el) =>
			el.classList.remove('select')
		);
	});
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<div class="contents">
			<div class="modal-contents-text">
				<h2>Share document</h2>
				<div class="mt-1">Send an email to share this document with a user</div>
				<div class="mt-10">
					<div class="mt-5">
						<div>User's email</div>
						<AutoComplete
							searchFunction={getUsers}
							delay="200"
							localFiltering={false}
							labelFieldName="email"
							valueFieldName="id"
							cleanUserText={false}
							bind:selectedItem={selectedUser}
						/>
					</div>
					<div class="mt-5">
						<div>Role</div>
						<AutoComplete
							searchFunction={getRoles}
							delay="200"
							localFiltering={false}
							labelFieldName="name"
							valueFieldName="id"
							cleanUserText={false}
							bind:selectedItem={selectedRole}
						/>
					</div>
				</div>
			</div>

			<div class="actions p-2">
				<button class="font-normal" on:click={closeModal}>Cancel</button>
				<button
					class="m-2 btn-sm variant-soft font-bold py-2 px-4 rounded-full inline-flex items-center"
					disabled={!selectedRole || !selectedUser}
					on:click={sendForm}>Confirm</button
				>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		/* allow click-through to backdrop */
		pointer-events: none;
	}

	.modal-contents-text {
		padding: 16px;
	}

	.contents {
		min-width: 250px;
		border-radius: 6px;
		padding: 16px;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: auto;
	}

	h2 {
		text-align: center;
		font-size: 24px;
	}

	p {
		text-align: center;
		margin-top: 16px;
	}

	.actions {
		margin-top: 32px;
		display: flex;
		justify-content: flex-end;
	}

	:global(.autocomplete) {
		width: 100%;
	}
</style>
