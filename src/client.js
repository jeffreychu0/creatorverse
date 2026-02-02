import { createClient } from '@supabase/supabase-js';

const URL = 'https://ketdadqsecjcflflosur.supabase.co';
const API_KEY = 'sb_publishable_YBlOV8l2A-lJlXpp38vqIw_XmKlmQIR';

export const supabase = createClient(URL, API_KEY);
export const SUPABASE_URL = URL;
export const SUPABASE_API_KEY = API_KEY;