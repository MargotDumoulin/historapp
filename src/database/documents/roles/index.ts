import type { LayoutData } from '../../../routes/$types';

export const fetchRoles = async (supabase: LayoutData['supabase']) =>
	await supabase.from('documents_roles').select();
