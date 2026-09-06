import { createClient } from "@supabase/supabase-js";

// Falls back to placeholder values so the client can be constructed during
// build (e.g. Vercel prerendering) even if the env vars aren't set yet.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
