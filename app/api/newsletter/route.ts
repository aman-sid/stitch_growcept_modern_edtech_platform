import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "edge";

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
