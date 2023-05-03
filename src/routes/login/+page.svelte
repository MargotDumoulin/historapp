<script lang="ts">
	import { goto } from '$app/navigation';
	import FormInput from '$lib/components/FormInput.svelte';
	import type { FieldRules, FieldType } from '$lib/types/general.types';
	import { rules } from '$lib/utils/rules';
	import { validateFields } from '$lib/utils/validate';
	import type { LayoutData } from '../$types';
	import { userLoggedIn } from '../../store';

	export let data: LayoutData;
	$: ({ supabase } = data);

	let wrongCredentialsError = '';

	const fields: FieldType = {
		email: '',
		password: ''
	};

	let fieldsErrors: FieldType = {};

	const login = async () => {
		fieldsErrors = validateFields(fields, fieldsErrors, rules);
		if (Object.values(fieldsErrors).filter(Boolean).length > 0) return;

		const { email, password } = fields;
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (!error) {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			console.log({ user });

			const { data: userComplete, error: userError } = await supabase
				.from('users')
				.select()
				.eq('uuid_auth_user', user?.id);

			console.log({ userComplete });

			if (userComplete?.[0] && !userError) {
				// TODO: QUAND LE USER ARRIVE SUR L'APP ET EST DEJA AUTHENTIFIE, METTRE LE USER DANS LE STORE !!!
				// CETTE FACON DE FAIRE EST PAS VIABLE
				userLoggedIn.set({
					uuid_auth_user: userComplete[0].uuid_auth_user,
					last_name: userComplete[0].last_name,
					first_name: userComplete[0].first_name,
					id: userComplete[0].id
				});
			}

			goto('/');
		} else wrongCredentialsError = 'Wrong credentials';
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
