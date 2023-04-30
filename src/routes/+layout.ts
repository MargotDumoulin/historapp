import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';
import type { Database } from '../lib/types/database.types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ fetch, data, depends, url }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (!session && url.pathname !== '/login' && url.pathname !== '/signup') {
		throw redirect(303, '/login');
	}

	return { supabase, session };
};
