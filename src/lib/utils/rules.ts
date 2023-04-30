import type { FieldRules } from '$lib/types/general.types';

// Global rules that can be re-used each time it's needed :)
export const rules: FieldRules = {
	password: {
		regex: '.{6,}',
		errorMessage: 'Password must be at least 6 char'
	},
	email: {
		regex: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
		errorMessage: 'Email must be formatted correctly'
	}
};
