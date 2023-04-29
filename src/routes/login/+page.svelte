<script lang="ts">
	import { goto } from '$app/navigation';
	import type { LayoutData } from '../$types';

	export let data: LayoutData;

	let email: string = '';
	let password: string = '';

	$: ({ supabase } = data);

	const login = async () => {
		if (!email || !password) return;

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		console.log({ data });
		if (!error) {
			goto('/');
		}
	};
</script>

<div class="login-container h-full w-full flex items-center justify-center mx-auto">
	<div class="login-card-container card">
		<form>
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Username </label>
				<input
					class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
					id="email"
					type="text"
					bind:value={email}
				/>
			</div>
			<div class="mb-6">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
				<input
					class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
					id="password"
					type="password"
					bind:value={password}
				/>
			</div>
			<div class="flex items-center justify-between">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					type="button"
					on:click={login}
				>
					Log in
				</button>
				<a class="btn" href="/signup"> Sign up </a>
			</div>
		</form>
	</div>
</div>

<style lang="postcss">
	.login-card-container {
		background: white;
		padding: 40px;
	}
</style>
