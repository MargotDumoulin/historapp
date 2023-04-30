<script lang="ts">
	import FormInput from '$lib/components/FormInput.svelte';
	import { validateFields } from '$lib/utils/validate';
	import type { LayoutData } from '../$types';
	import type { FieldRules, FieldType } from '$lib/types/general.types';

	export let data: LayoutData;

	const fields: FieldType = {
		email: '',
		password: '',
		firstname: '',
		lastname: '',
		confirmPassword: ''
	};

	const rules: FieldRules = {
		password: {
			regex: '.{6,}',
			errorMessage: 'Password must be at least 6 char'
		},
		email: {
			regex: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
			errorMessage: 'Email must be formatted correctly'
		}
	};

	let fieldsErrors: FieldType = {};

	$: ({ supabase } = data);

	const signup = async () => {
		fieldsErrors = validateFields(fields, fieldsErrors, rules);
		const { email, password, confirmPassword, firstname, lastname } = fields;

		if (password !== confirmPassword) fieldsErrors.confirmPassword = 'Passwords must match';

		if (Object.values(fieldsErrors).filter(Boolean).length > 0) return;

		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});
	};
</script>

<div class="login-container h-full w-full flex items-center justify-center mx-auto">
	<div class="login-card-container card">
		<form on:submit|preventDefault={signup} class="w-full max-w-lg">
			<div class="flex flex-wrap -mx-3 mb-3">
				<div class="w-1/2 px-3 mb-3">
					<FormInput
						bind:field={fields.firstname}
						fieldName="First name"
						fieldError={fieldsErrors.firstname}
						type="text"
						id="firstname"
					/>
				</div>
				<div class="w-1/2 md:w-1/2 px-3">
					<FormInput
						bind:field={fields.lastname}
						fieldName="Last name"
						fieldError={fieldsErrors.lastname}
						type="text"
						id="lastname"
					/>
				</div>
			</div>
			<div class="flex flex-wrap -mx-3 mb-3">
				<div class="w-full px-3">
					<FormInput
						bind:field={fields.email}
						fieldName="Email"
						fieldError={fieldsErrors.email}
						type="text"
						id="email"
					/>
				</div>
			</div>
			<div class="flex flex-wrap -mx-3 mb-3">
				<div class="w-1/2 px-3">
					<FormInput
						bind:field={fields.password}
						fieldName="Password"
						fieldError={fieldsErrors.password}
						type="password"
						id="password"
					/>
				</div>
				<div class="w-1/2 px-3">
					<FormInput
						bind:field={fields.confirmPassword}
						fieldName="Confirm password"
						fieldError={fieldsErrors.confirmPassword}
						type="password"
						id="confirm-password"
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
