import { createClient } from '@supabase/supabase-js';

// Read from Vite env vars first; fall back to the existing values if not provided.
// Add these to a `.env` file at the project root as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
const URL = 'https://ketdadqsecjcflflosur.supabase.co';
const API_KEY = 'sb_publishable_YBlOV8l2A-lJlXpp38vqIw_XmKlmQIR';

export const supabase = createClient(URL, API_KEY);

// Provide a default export for convenience
export default supabase;