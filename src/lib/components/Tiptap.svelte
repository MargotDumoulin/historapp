<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Collaboration from '@tiptap/extension-collaboration';
	import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
	import { userLoggedIn } from '../../store';
	import * as Y from 'yjs';
	import SupabaseProvider from '$lib/utils/SupabaseProvider';
	import type { LayoutData } from '../../routes/$types';

	export let supabase: LayoutData['supabase'];
	export let document: any;

	// TODO: tyyyyyyyyyyyyype !!!!!!!!!
	let element: any;
	let editor: any;
	let yDoc: any;
	let provider: any;

	export const save = (value: string) => {
		provider.save(value);
	};

	onMount(() => {
		const randomColor = Math.floor(Math.random() * 16777215).toString(16);

		yDoc = new Y.Doc();

		provider = new SupabaseProvider(yDoc, supabase, {
			channel: 1 as unknown as string,
			id: document.id,
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
				// CollaborationCursor.configure({
				// 	provider: provider,
				// 	user: {
				// 		name: `${$userLoggedIn?.first_name} ${$userLoggedIn?.last_name}`,
				// 		color: `#${randomColor}`
				// 	}
				// })
			],
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			editable: document.edit
		});
	});

	onDestroy(() => {
		if (editor) {
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
