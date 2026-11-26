import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";


const MOCK_MESSAGES = [
  {
    id: "mock-1",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    name: "Sarah Chen",
    email: "sarah@techstartup.io",
    company: "TechStartup Inc.",
    role: "CTO",
    track: "ai-consulting",
    budget: "$10k-25k",
    timeline: "immediate",
    message: "We need help building an AI-powered recommendation engine for our e-commerce platform. Looking for end-to-end consulting.",
    status: "pending" as const,
    metadata: null,
  },
  {
    id: "mock-2",
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    name: "James Rivera",
    email: "james@growthco.com",
    company: "GrowthCo",
    role: "Head of Engineering",
    track: "ai-consulting",
    budget: "$25k-50k",
    timeline: "next_quarter",
    message: "Interested in LangGraph agent architecture for our customer support pipeline. Can we schedule a discovery call?",
    status: "reviewed" as const,
    metadata: null,
  },
  {
    id: "mock-3",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    name: "Emily Park",
    email: "emily@designlab.co",
    company: "DesignLab",
    role: "Founder",
    track: "micro-saas",
    budget: "$5k-10k",
    timeline: "flexible",
    message: "Looking for a Micro-SaaS MVP build. We have validated the idea and need technical execution.",
    status: "contacted" as const,
    metadata: null,
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      const filtered = status
        ? MOCK_MESSAGES.filter((m) => m.status === status)
        : MOCK_MESSAGES;
      return NextResponse.json({ data: filtered, mock: true });
    }

    let query = supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[Supabase Error] contact_inquiries fetch:", error);
      return NextResponse.json(
        { error: "Failed to fetch messages." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (err: any) {
    console.error("[API Error] /api/dashboard/messages GET:", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Both id and status are required." },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "reviewed", "contacted", "archived"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({
        success: true,
        mock: true,
        data: { id, status },
        message: "Status updated in mock mode.",
      });
    }

    const { data, error } = await supabase
      .from("contact_inquiries")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[Supabase Error] contact_inquiries update:", error);
      return NextResponse.json(
        { error: "Failed to update message status." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("[API Error] /api/dashboard/messages PATCH:", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
