import type { Database } from './../lib/types/database.types';
import { writable } from 'svelte/store';

export const userLoggedIn = writable<Database['public']['Tables']['users']['Row']>();
