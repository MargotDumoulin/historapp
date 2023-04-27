import { writable } from 'svelte/store';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config/index';

const { SUPABASE_KEY, SUPABASE_URL } = config;

const sup = createClient(SUPABASE_URL, SUPABASE_KEY);

export const supabase = writable(sup);
