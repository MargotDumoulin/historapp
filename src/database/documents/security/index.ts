import type { LayoutData } from '../../../routes/$types';

export const insertDocumentSecurityRow = async (
	supabase: LayoutData['supabase'],
	userId: string,
	documentId: number
) =>
	await supabase
		.from('documents_security')
		.insert({ id_user: userId, id_document: documentId, id_role: 2 }) // TODO: Do not harcode the role's id.
		.select()
		.maybeSingle();
