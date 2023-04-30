<script lang="ts">
	import { goto } from '$app/navigation';
	import type { LayoutData } from '../$types';
	import type { FieldType } from '../../utils/FormValidator';

	export let data: LayoutData;
	let wrongCredentialsError = '';

	const fields: FieldType = {
		email: '',
		password: ''
	};

	const fieldsErrors: FieldType = {
		email: '',
		password: ''
	};

	$: ({ supabase } = data);

	const validateFields = () => {
		Object.keys(fields).forEach((fieldKey) => {
			fieldsErrors[fieldKey] = !fields[fieldKey] ? `Missing ${fieldKey} field` : '';
		});
	};

	const login = async () => {
		validateFields();
		if (Object.values(fieldsErrors).filter(Boolean).length > 0) return;

		const { email, password } = fields;
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (!error) goto('/');
		else wrongCredentialsError = 'Wrong credentials';
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
					bind:value={fields.email}
				/>
				{#if fieldsErrors.email}<div class="text-red-500">{fieldsErrors.email}</div>{/if}
			</div>
			<div class="mb-3">
				<label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
				<input
					class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
					id="password"
					type="password"
					bind:value={fields.password}
				/>
				{#if fieldsErrors.password}<div class="text-red-500">{fieldsErrors.password}</div>{/if}
			</div>
			{#if wrongCredentialsError}
				<div class="text-red-500">{wrongCredentialsError}</div>
			{/if}
			<div class="flex items-center justify-between mt-3">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
					type="submit"
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
