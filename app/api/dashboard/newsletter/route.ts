import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "edge";

const MOCK_SUBSCRIBERS = [
  {
    id: "mock-sub-1",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    email: "alex@developer.io",
    source: "website_footer",
    status: "active" as const,
    metadata: null,
  },
  {
    id: "mock-sub-2",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    email: "priya@startupfounder.com",
    source: "case_study_page",
    status: "active" as const,
    metadata: null,
  },
  {
    id: "mock-sub-3",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    email: "michael@enterprise.co",
    source: "homepage_hero",
    status: "active" as const,
    metadata: null,
  },
  {
    id: "mock-sub-4",
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    email: "lisa@creative.agency",
    source: "website_footer",
    status: "unsubscribed" as const,
    metadata: null,
  },
];

export async function GET(req: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ data: MOCK_SUBSCRIBERS, mock: true });
    }

    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Supabase Error] newsletter_subscribers fetch:", error);
      return NextResponse.json(
        { error: "Failed to fetch subscribers." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (err: any) {
    console.error("[API Error] /api/dashboard/newsletter GET:", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
