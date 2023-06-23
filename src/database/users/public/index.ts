import type { UserData } from '../..';
import type { LayoutData } from '../../../routes/$types';

export const insertUserInPublic = async (
	supabase: LayoutData['supabase'],
	{ firstname, lastname, userIdInAuth }: UserData
) =>
	await supabase
		.from('users')
		.insert({ uuid_auth_user: userIdInAuth, last_name: lastname, first_name: firstname });

export const fetchUserByAuthUuid = async (supabase: LayoutData['supabase'], uuid: string) =>
	await supabase.from('users').select().eq('uuid_auth_user', uuid).maybeSingle();
