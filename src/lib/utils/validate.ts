import type { FieldRules, FieldType } from '$lib/types/general.types';

export const validateFields = (
	fields: FieldType,
	fieldsErrors: FieldType,
	rules: FieldRules = {}
) => {
	Object.keys(fields).forEach((fieldKey) => {
		if (!rules[fieldKey]) {
			fieldsErrors[fieldKey] = !fields[fieldKey] ? `Missing field` : '';
		} else {
			const reg = new RegExp(rules[fieldKey].regex);
			fieldsErrors[fieldKey] = !reg.test(fields[fieldKey]) ? rules[fieldKey].errorMessage : '';
		}
	});

	return fieldsErrors;
};
