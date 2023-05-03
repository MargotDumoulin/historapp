<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Collaboration from '@tiptap/extension-collaboration';
	import { HocuspocusProvider } from '@hocuspocus/provider';

	let element: any;
	let editor: any;

	onMount(() => {
		// Set up the Hocuspocus WebSocket provider
		const provider = new HocuspocusProvider({
			url: 'ws://0.0.0.0:1234',
			name: 'example-document'
		});

		editor = new Editor({
			element,
			extensions: [
				StarterKit.configure({
					// The Collaboration extension comes with its own history handling
					history: false
				}),
				// Register the document with Tiptap
				Collaboration.configure({
					document: provider.document
				})
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
