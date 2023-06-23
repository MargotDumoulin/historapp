import type { LayoutData } from '../../routes/$types';

export const fetchDocumentAndRole = async (
	supabase: LayoutData['supabase'],
	documentId: number,
	userId: string
) =>
	await supabase
		.from('document_and_role')
		.select()
		.match({ id: documentId, id_user: userId })
		.maybeSingle();

export const fetchAuthorizedDocuments = async (supabase: LayoutData['supabase'], userId: string) =>
	await supabase.from('authorized_documents').select().match({ id_user: userId });

export const insertDocument = async (supabase: LayoutData['supabase'], userId: string) =>
	await supabase.from('documents').insert({ id_owner: userId }).select().maybeSingle();
