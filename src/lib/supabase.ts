import { createClient } from "@supabase/supabase-js";

// Supabase Configuration from Environment or provided Project credentials
export const SUPABASE_URL =
  (typeof process !== "undefined" && (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)) ||
  (typeof import.meta !== "undefined" && ((import.meta as any).env?.VITE_SUPABASE_URL || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL)) ||
  "https://jtcrrnngbgrmqczerfve.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  (typeof process !== "undefined" && (process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)) ||
  (typeof import.meta !== "undefined" && ((import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)) ||
  "sb_publishable_tL4BeZffytf20JOYhC6SGA_n06AB01-";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export default supabase;
