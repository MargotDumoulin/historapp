import type { FieldType } from '$lib/types/general.types';

export const validateFields = (fields: FieldType, fieldsErrors: FieldType) => {
	Object.keys(fields).forEach((fieldKey) => {
		fieldsErrors[fieldKey] = !fields[fieldKey] ? `Missing field` : '';
	});

	return fieldsErrors;
};
