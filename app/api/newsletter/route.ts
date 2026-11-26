import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getD1Database } from "@/lib/d1";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 1. Try Cloudflare D1 first
    const d1 = await getD1Database();
    if (d1) {
      try {
        const subscriber = await d1.prepare(`
          INSERT INTO newsletter_subscribers (email, source, status)
          VALUES (?, ?, 'active')
          ON CONFLICT(email) DO UPDATE SET status = 'active'
          RETURNING id, email, created_at, status;
        `).bind(
          email.trim().toLowerCase(),
          source || "website_footer"
        ).first();

        return NextResponse.json({
          success: true,
          data: subscriber,
          message: "Subscribed to 100x MINDS intelligence dispatches via Cloudflare D1.",
        });
      } catch (d1Err: any) {
        console.error("[D1 Error] newsletter_subscribers insert:", d1Err);
      }
    }

    // 2. Fallback to Supabase if configured
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({
        success: true,
        mock: true,
        message: "Subscribed in mock mode.",
      });
    }

    // Upsert or insert subscriber
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .upsert(
        {
          email: email.trim().toLowerCase(),
          source: source || "website_footer",
          status: "active",
        },
        { onConflict: "email" }
      )
      .select()
      .single();

    if (error) {
      console.error("[Supabase Error] newsletter_subscribers insert:", error);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Subscribed to 100x MINDS intelligence dispatches.",
    });
  } catch (err: any) {
    console.error("[API Error] /api/newsletter:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
