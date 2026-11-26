import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { initialBlogs, BlogPost } from "@/data/blogs";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");

    const supabase = getSupabaseServerClient();
    if (supabase) {
      let query = supabase.from("blogs").select("*").eq("status", "published");

      if (slug) {
        query = query.eq("slug", slug);
      }
      if (category && category !== "all") {
        query = query.eq("category", category);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ data });
      }
    }

    // Fallback to initial static blogs
    let filtered = initialBlogs.filter((b) => b.status === "published");
    if (slug) {
      filtered = filtered.filter((b) => b.slug === slug);
    }
    if (category && category !== "all") {
      filtered = filtered.filter((b) => b.category.toLowerCase() === category.toLowerCase());
    }

    return NextResponse.json({ data: filtered });
  } catch (err: any) {
    console.error("[Public Blogs API Error]:", err);
    return NextResponse.json({ data: initialBlogs.filter((b) => b.status === "published") });
  }
}
