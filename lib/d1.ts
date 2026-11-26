import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface ContactInquiry {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  company?: string | null;
  role?: string | null;
  track: string;
  budget?: string | null;
  timeline: string;
  message?: string | null;
  status: "pending" | "reviewed" | "contacted" | "archived";
  metadata?: string | null;
}

export interface NewsletterSubscriber {
  id: string;
  created_at: string;
  email: string;
  source: string;
  status: "active" | "unsubscribed";
  metadata?: string | null;
}

/**
 * Helper to obtain the Cloudflare D1 Database binding
 */
export async function getD1Database() {
  try {
    const { env } = await getCloudflareContext();
    if (env && (env as any).DB) {
      return (env as any).DB;
    }
  } catch (err) {
    // In local non-Cloudflare environments, log and return null
    console.warn("[D1] Cloudflare context not found. Make sure you run through Wrangler or OpenNext.", err);
  }
  return null;
}
