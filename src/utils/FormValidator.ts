export type FieldType = { [key: string]: string };

export class FormValidator {
	fields: FieldType;

	constructor(fields: FieldType) {
		this.fields = fields;
	}

	getErrors() {
		Object.keys(this.fields).forEach(() => {});
	}
}
