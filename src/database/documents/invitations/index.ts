import type { LayoutData } from '../../../routes/$types';

export const updateInvitationAcceptedInDb = async (
	supabase: LayoutData['supabase'],
	accepted: boolean,
	invitationId: string
) =>
	await supabase
		.from('documents_invitations')
		.update({ accepted })
		.eq('id', invitationId)
		.select()
		.maybeSingle();

export const insertInvitationInDb = async (
	supabase: LayoutData['supabase'],
	userId: string,
	roleId: number,
	documentId: number
) =>
	await supabase
		.from('documents_invitations')
		.insert({ id_user: userId, id_role: roleId, id_document: documentId });
