import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Database } from './types.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const DOMAIN = Deno.env.get('DOMAIN');

type DocumentInvitation = Database['public']['Tables']['documents_invitations']['Row'];
interface WebhookPayload {
	type: 'INSERT' | 'UPDATE' | 'DELETE';
	table: string;
	record: DocumentInvitation;
	schema: 'public';
	old_record: null | DocumentInvitation;
}

const supabase = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_ANON_KEY'));

const handler = async (request: Request): Promise<Response> => {
	const payload: WebhookPayload = await request.json();

	if (!payload.record?.id || !payload.record?.id_user) {
		return new Response(undefined, {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	const { id, id_user } = payload.record;

	const { data: dataUser, error } = await supabase
		.from('auth_users')
		.select()
		.match({ id: id_user })
		.maybeSingle();

	console.log(dataUser);

	if (error) {
		return new Response(undefined, {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	console.log(JSON.stringify(payload, null, 2));

	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${RESEND_API_KEY}`
		},
		body: JSON.stringify({
			from: 'onboarding@resend.dev',
			to: dataUser.email,
			subject: 'Someone shared a document with you',
			html: `Click on this link to get access to the document shared with you : ${DOMAIN}/invitation/${id}`
		})
	});

	const data = await res.json();

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

serve(handler);
