<script lang="ts">
	import Tiptap from '$lib/components/Tiptap.svelte';
	import type { LayoutData } from '../$types';

	export let data: LayoutData;
</script>

<div class="p-20 flex items-center justify-content mx-auto flex-col">
	<div class="w-full h-full">
		<div class="w-full flex justify-end">
			<button
				class="m-2 btn-sm variant-soft hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-full inline-flex items-center"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 mr-1"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
					/>
				</svg>

				<span>Save</span>
			</button>
		</div>
		<div class="sheet-container p-5 card"><Tiptap {data} /></div>
	</div>
</div>

<style>
	.sheet-container {
		background-color: white;
	}
</style>
