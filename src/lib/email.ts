export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export const SUPABASE_EDGE_FUNCTION_RESEND_URL =
  process.env.SUPABASE_EDGE_FUNCTION_RESEND_URL ||
  "https://jtcrrnngbgrmqczerfve.supabase.co/functions/v1/resend-email";

/**
 * Sends an email via Supabase Edge Function running Resend
 */
export async function sendEmailViaSupabase(payload: EmailPayload): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const supabaseKey =
      process.env.SUPABASE_PUBLISHABLE_KEY ||
      process.env.SUPABASE_KEY ||
      "sb_publishable_tL4BeZffytf20JOYhC6SGA_n06AB01-";

    const response = await fetch(SUPABASE_EDGE_FUNCTION_RESEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseKey}`,
        "apikey": supabaseKey,
      },
      body: JSON.stringify({
        from: payload.from || "Zelvora Studio <partnership@zelvora.studio>",
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        error: data?.error || `Edge Function returned status ${response.status}`,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to trigger Supabase Resend Edge Function",
    };
  }
}
