<script lang="ts">
	import type { LayoutData } from '../$types';

	export let data: LayoutData;

	let email: string = '';
	let password: string = '';

	$: ({ supabase } = data);

	const signup = async () => {
		console.log({ email, password });
		if (!email || !password) return;

		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});

		console.log({ data, error });
	};
</script>

<div class="login-container h-full w-full flex items-center justify-center mx-auto">
	<div class="login-card-container card">
		<form class="w-full max-w-lg">
			<div class="flex flex-wrap -mx-3 mb-3">
				<div class="w-1/2 px-3 mb-3">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-first-name"
					>
						First Name
					</label>
					<input
						class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
						id="grid-first-name"
						type="text"
						placeholder="Jane"
					/>
				</div>
				<div class="w-1/2 md:w-1/2 px-3">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-last-name"
					>
						Last Name
					</label>
					<input
						class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="grid-last-name"
						type="text"
						placeholder="Doe"
					/>
				</div>
			</div>
			<div class="flex flex-wrap -mx-3 mb-3">
				<div class="w-full px-3">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="email"
					>
						Email
					</label>
					<input
						class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="email"
						type="email"
						placeholder="jane.doe@gmail.com"
						bind:value={email}
					/>
				</div>
			</div>
			<div class="flex flex-wrap -mx-3 mb-3">
				<div class="w-1/2 px-3">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-password"
					>
						Password
					</label>
					<input
						class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="grid-password"
						type="password"
						placeholder="******************"
						bind:value={password}
					/>
				</div>
				<div class="w-1/2 px-3">
					<label
						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="confirm-grid-password"
					>
						Confirm password
					</label>
					<input
						class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
						id="confirm-grid-password"
						type="password"
						placeholder="******************"
					/>
				</div>
			</div>
			<div class="flex items-center">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					type="button"
					on:click={signup}
				>
					Create
				</button>
				<a class="btn" href="/login"> Cancel </a>
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
