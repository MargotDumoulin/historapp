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

	export let data: LayoutData;
	$: ({ supabase } = data);

	let element: any;
	let editor: any;

	onMount(() => {
		const randomColor = Math.floor(Math.random() * 16777215).toString(16);

		const yDoc = new Y.Doc();
		const provider = new SupabaseProvider(yDoc, supabase, {
			channel: 1 as unknown as string,
			id: 1,
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
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
		class="btn btn-sm variant-soft-secondary"
	>
		H1
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
		class="btn btn-sm variant-soft-secondary"
	>
		H2
	</button>
	<button
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
		class="btn btn-sm variant-soft-secondary"
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
