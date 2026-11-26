import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getD1Database } from "@/lib/d1";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, role, track, budget, timeline, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
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
        const metadataStr = JSON.stringify({
          userAgent: req.headers.get("user-agent") || undefined,
          referer: req.headers.get("referer") || undefined,
        });

        const inserted = await d1.prepare(`
          INSERT INTO contact_inquiries (name, email, company, role, track, budget, timeline, message, status, metadata)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
          RETURNING id, name, email, created_at, status;
        `).bind(
          name.trim(),
          email.trim().toLowerCase(),
          company?.trim() || null,
          role?.trim() || null,
          track || "ai-consulting",
          budget || null,
          timeline || "immediate",
          message?.trim() || null,
          metadataStr
        ).first();

        return NextResponse.json({
          success: true,
          data: inserted,
          message: "Architectural consultation inquiry recorded successfully in Cloudflare D1.",
        });
      } catch (d1Err: any) {
        console.error("[D1 Error] contact_inquiries insert:", d1Err);
      }
    }

    // 2. Fallback to Supabase if configured
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      // In development or if credentials aren't set yet, return simulated success
      return NextResponse.json({
        success: true,
        mock: true,
        message: "Inquiry recorded in mock mode (Database keys not configured).",
      });
    }

    const { data, error } = await supabase.from("contact_inquiries").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      role: role?.trim() || null,
      track: track || "ai-consulting",
      budget: budget || null,
      timeline: timeline || "immediate",
      message: message?.trim() || null,
      status: "pending",
      metadata: {
        userAgent: req.headers.get("user-agent") || undefined,
        referer: req.headers.get("referer") || undefined,
      },
    }).select().single();

    if (error) {
      console.error("[Supabase Error] contact_inquiries insert:", error);
      return NextResponse.json(
        { error: "Failed to record inquiry. Please try again or email us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Architectural consultation inquiry received successfully.",
    });
  } catch (err: any) {
    console.error("[API Error] /api/contact:", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
