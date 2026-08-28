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

const rawEnvUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;

const rawEnvKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createServerClient = () => {
  const url = sanitizeSupabaseUrl(rawEnvUrl);
  const key = sanitizeSupabaseKey(rawEnvKey);
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

export const createSupabaseServerClient = createServerClient;
export default createServerClient;
