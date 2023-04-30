<script lang="ts">
	export let field: string;
	export let fieldError: string;
	export let fieldName: string;
	export let id: string;
	export let type: string;
</script>

<div>
	<label class="block text-gray-700 text-sm font-bold mb-2" for="username">{fieldName}</label>
	<input
		class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
		{id}
		{...{ type }}
		bind:value={field}
	/>
	{#if fieldError}<div class="text-red-500">{fieldError}</div>{/if}
</div>
