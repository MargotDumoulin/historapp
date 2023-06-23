import type { LayoutData } from '../../../routes/$types';

export const fetchUserFromSession = async (supabase: LayoutData['supabase']) =>
	await supabase.auth.getUser();

export const insertUserInAuth = async (
	supabase: LayoutData['supabase'],
	email: string,
	password: string
) =>
	await supabase.auth.signUp({
		email,
		password
	});

export const fetchUsersByExactEmail = async (supabase: LayoutData['supabase'], email: string) =>
	await supabase.from('auth_users').select().match({ email });
