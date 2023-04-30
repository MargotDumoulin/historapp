<script lang="ts">
	import { goto } from '$app/navigation';
	import FormInput from '$lib/components/FormInput.svelte';
	import type { FieldType } from '$lib/types/general.types';
	import type { LayoutData } from '../$types';

	export let data: LayoutData;
	$: ({ supabase } = data);

	let wrongCredentialsError = '';

	const fields: FieldType = {
		email: '',
		password: ''
	};

	const fieldsErrors: FieldType = {};

	const validateFields = () => {
		Object.keys(fields).forEach((fieldKey) => {
			fieldsErrors[fieldKey] = !fields[fieldKey] ? `Missing ${fieldKey} field` : '';
		});
	};

	const login = async () => {
		validateFields();
		if (Object.values(fieldsErrors).filter(Boolean).length > 0) return;

		const { email, password } = fields;
		const { error } = await supabase.auth.signInWithPassword({
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
				<FormInput
					bind:field={fields.email}
					fieldName="Email"
					fieldError={fieldsErrors.email}
					type="text"
					id="email"
				/>
			</div>
			<div class="mb-3">
				<FormInput
					bind:field={fields.password}
					fieldName="Password"
					fieldError={fieldsErrors.password}
					type="password"
					id="password"
				/>
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
