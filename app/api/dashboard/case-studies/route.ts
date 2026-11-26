import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";


const MOCK_CASE_STUDIES = [
  {
    id: "mock-cs-1",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    tag: "CS-001",
    category: "ai-agents",
    category_label: "AI Agents",
    client: "TechVentures Corp",
    industry: "Financial Services",
    problem: "Manual processing of thousands of support tickets daily led to slow response times and customer churn.",
    solution: "Built autonomous LangGraph agents that triage, categorize, and draft responses for 80% of incoming tickets.",
    technology: ["LangGraph", "GPT-4", "Python", "FastAPI", "Redis"],
    implementation: "Phased rollout over 8 weeks with shadow mode testing before full deployment.",
    results: [
      { metric: "85%", label: "Reduction in response time" },
      { metric: "60%", label: "Cost savings on support ops" },
      { metric: "94%", label: "Customer satisfaction score" },
    ],
    testimonial: {
      quote: "The AI agents transformed our support operations. We went from drowning in tickets to proactively delighting customers.",
      author: "David Kim",
      role: "VP of Customer Success",
      avatarInitials: "DK",
    },
    featured: true,
    status: "published" as const,
  },
  {
    id: "mock-cs-2",
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    tag: "CS-002",
    category: "micro-saas",
    category_label: "Micro-SaaS",
    client: "ContentFlow Studio",
    industry: "Media & Publishing",
    problem: "Content creators lacked a unified tool to manage ideation, drafting, and publishing across platforms.",
    solution: "Designed and shipped a Micro-SaaS MVP with AI-assisted content generation and multi-platform publishing.",
    technology: ["Next.js", "OpenAI", "Supabase", "Stripe", "Tailwind CSS"],
    implementation: "6-week sprint from concept to launch with continuous user feedback loops.",
    results: [
      { metric: "2,400+", label: "Users in first month" },
      { metric: "$18K", label: "MRR within 90 days" },
      { metric: "4.8★", label: "Average user rating" },
    ],
    testimonial: null,
    featured: false,
    status: "published" as const,
  },
  {
    id: "mock-cs-3",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tag: "CS-003",
    category: "growth-engineering",
    category_label: "Growth Engineering",
    client: "ScaleUp Analytics",
    industry: "B2B SaaS",
    problem: "Stagnant user acquisition and poor conversion funnel performance despite high traffic.",
    solution: "Implemented data-driven growth engineering: A/B testing framework, onboarding optimization, and retention loops.",
    technology: ["React", "Mixpanel", "Python", "PostgreSQL", "Vercel"],
    implementation: "Ongoing 12-week growth sprint with weekly experiment cycles.",
    results: [
      { metric: "3.2x", label: "Increase in trial-to-paid conversion" },
      { metric: "45%", label: "Improvement in Day-7 retention" },
      { metric: "28%", label: "Lower customer acquisition cost" },
    ],
    testimonial: {
      quote: "100x MINDS didn't just optimize our funnel — they rewired how we think about growth.",
      author: "Maria Gonzalez",
      role: "CEO",
      avatarInitials: "MG",
    },
    featured: true,
    status: "draft" as const,
  },
];

export async function GET(req: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ data: MOCK_CASE_STUDIES, mock: true });
    }

    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Supabase Error] case_studies fetch:", error);
      return NextResponse.json(
        { error: "Failed to fetch case studies." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (err: any) {
    console.error("[API Error] /api/dashboard/case-studies GET:", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      tag,
      category,
      categoryLabel,
      client,
      industry,
      problem,
      solution,
      technology,
      implementation,
      results,
      testimonial,
      featured,
      status,
    } = body;

    if (!tag || !category || !client || !problem || !solution) {
      return NextResponse.json(
        { error: "Required fields: tag, category, client, problem, solution." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({
        success: true,
        mock: true,
        data: body,
        message: "Case study created in mock mode.",
      });
    }

    const { data, error } = await supabase
      .from("case_studies")
      .insert({
        tag,
        category,
        category_label: categoryLabel || category,
        client,
        industry: industry || "",
        problem,
        solution,
        technology: technology || [],
        implementation: implementation || "",
        results: results || [],
        testimonial: testimonial || null,
        featured: featured ?? false,
        status: status || "draft",
      })
      .select()
      .single();

    if (error) {
      console.error("[Supabase Error] case_studies insert:", error);
      return NextResponse.json(
        { error: "Failed to create case study." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Case study created successfully.",
    });
  } catch (err: any) {
    console.error("[API Error] /api/dashboard/case-studies POST:", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Case study id is required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({
        success: true,
        mock: true,
        data: { id, ...updates },
        message: "Case study updated in mock mode.",
      });
    }

    // Map camelCase to snake_case for the update payload
    const dbUpdates: Record<string, any> = {};
    if (updates.categoryLabel !== undefined) dbUpdates.category_label = updates.categoryLabel;
    if (updates.tag !== undefined) dbUpdates.tag = updates.tag;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.client !== undefined) dbUpdates.client = updates.client;
    if (updates.industry !== undefined) dbUpdates.industry = updates.industry;
    if (updates.problem !== undefined) dbUpdates.problem = updates.problem;
    if (updates.solution !== undefined) dbUpdates.solution = updates.solution;
    if (updates.technology !== undefined) dbUpdates.technology = updates.technology;
    if (updates.implementation !== undefined) dbUpdates.implementation = updates.implementation;
    if (updates.results !== undefined) dbUpdates.results = updates.results;
    if (updates.testimonial !== undefined) dbUpdates.testimonial = updates.testimonial;
    if (updates.featured !== undefined) dbUpdates.featured = updates.featured;
    if (updates.status !== undefined) dbUpdates.status = updates.status;

    const { data, error } = await supabase
      .from("case_studies")
      .update(dbUpdates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[Supabase Error] case_studies update:", error);
      return NextResponse.json(
        { error: "Failed to update case study." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("[API Error] /api/dashboard/case-studies PATCH:", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Case study id is required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({
        success: true,
        mock: true,
        message: "Case study deleted in mock mode.",
      });
    }

    const { error } = await supabase
      .from("case_studies")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[Supabase Error] case_studies delete:", error);
      return NextResponse.json(
        { error: "Failed to delete case study." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Case study deleted successfully.",
    });
  } catch (err: any) {
    console.error("[API Error] /api/dashboard/case-studies DELETE:", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
