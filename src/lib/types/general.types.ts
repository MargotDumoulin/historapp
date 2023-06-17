export type FieldType = { [key: string]: string };
export type FieldRules = { [key: string]: { regex: string; errorMessage: string } };
export enum Roles {
	OWNER = 'OWNER',
	EDITOR = 'EDITOR',
	VIEWER = 'VIEWER'
}
