import { createClient } from "@supabase/supabase-js";

function sanitizeSupabaseUrl(candidate?: string | null): string {
  const fallback = "https://jtcrrnngbgrmqczerfve.supabase.co";
  if (!candidate || typeof candidate !== "string") return fallback;
  const trimmed = candidate.trim().replace(/^["']|["']$/g, "");
  if (!trimmed || trimmed === "undefined" || trimmed === "null" || trimmed === "MY_APP_URL") return fallback;
  try {
    const formatted = trimmed.startsWith("http://") || trimmed.startsWith("https://") ? trimmed : `https://${trimmed}`;
    const parsed = new URL(formatted);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.origin;
    }
  } catch (_) {
    // fallback
  }
  return fallback;
}

function sanitizeSupabaseKey(candidate?: string | null): string {
  const fallback = "sb_publishable_tL4BeZffytf20JOYhC6SGA_n06AB01-";
  if (!candidate || typeof candidate !== "string") return fallback;
  const trimmed = candidate.trim().replace(/^["']|["']$/g, "");
  if (!trimmed || trimmed === "undefined" || trimmed === "null") return fallback;
  return trimmed;
}

const rawEnvUrl =
  (typeof process !== "undefined" && (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)) ||
  (typeof import.meta !== "undefined" && ((import.meta as any).env?.VITE_SUPABASE_URL || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL));

const rawEnvKey =
  (typeof process !== "undefined" && (process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)) ||
  (typeof import.meta !== "undefined" && ((import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY || (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY));

export const SUPABASE_URL = sanitizeSupabaseUrl(rawEnvUrl);
export const SUPABASE_PUBLISHABLE_KEY = sanitizeSupabaseKey(rawEnvKey);

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export default supabase;
