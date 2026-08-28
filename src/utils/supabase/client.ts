import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  (typeof process !== "undefined" && (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)) ||
  (typeof import.meta !== "undefined" && ((import.meta as any).env?.VITE_SUPABASE_URL || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL)) ||
  "https://jtcrrnngbgrmqczerfve.supabase.co";

const supabaseKey =
  (typeof process !== "undefined" && (process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)) ||
  (typeof import.meta !== "undefined" && ((import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)) ||
  "sb_publishable_tL4BeZffytf20JOYhC6SGA_n06AB01-";

export const createBrowserClient = () => {
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
};

export const createSupabaseClient = createBrowserClient;
export default createBrowserClient;
