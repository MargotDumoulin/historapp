<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Collaboration from '@tiptap/extension-collaboration';
	import * as Y from 'yjs';
	import SupabaseProvider from '$lib/utils/SupabaseProvider';
	import type { LayoutData } from '../../routes/$types';
	import type { Database } from '$lib/types/database.types';

	export let supabase: LayoutData['supabase'];
	export let document: Database['public']['Views']['document_and_role']['Row'];

	let element: Element;
	let editor: Editor;
	let yDoc: Y.Doc;
	let provider: SupabaseProvider;

	export const save = (value: string) => {
		provider.save(value);
	};

	onMount(() => {
		yDoc = new Y.Doc();

		provider = new SupabaseProvider(yDoc, supabase, {
			channel: String(document.id),
			id: document.id as number,
			tableName: 'documents',
			columnName: 'document'
		});

		editor = new Editor({
			element,
			extensions: [
				StarterKit.configure({
					history: false
				}),
				Collaboration.configure({
					document: provider.doc
				})
			],
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			editable: !!document.edit
		});
	});

	onDestroy(() => {
		if (editor) {
			provider.destroy();
			editor.destroy();
		}
	});
</script>

{#if editor}
	<!-- TODO: Make it generic :p -->
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
		class="btn btn-sm variant-soft-secondary"
		disabled={!document.edit}
	>
		H1
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
		class="btn btn-sm variant-soft-secondary"
		disabled={!document.edit}
	>
		H2
	</button>
	<button
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
		class="btn btn-sm variant-soft-secondary"
		disabled={!document.edit}
	>
		P
	</button>
{/if}

<div class="mt-5" bind:this={element} />

<style lang="postcss">
	button.active {
		@apply variant-ghost-surface;
	}
</style>
