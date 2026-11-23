import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { initialBlogs, BlogPost } from "@/data/blogs";

export const runtime = "edge";

// In-memory store for fallback/dev when Supabase table isn't created yet
let inMemoryBlogs: BlogPost[] = [...initialBlogs];

export async function GET(req: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ data: inMemoryBlogs, source: "mock" });
    }

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[Supabase] blogs fetch warning, falling back to local memory:", error.message);
      return NextResponse.json({ data: inMemoryBlogs, source: "fallback" });
    }

    // Merge or return Supabase data if exists
    if (!data || data.length === 0) {
      return NextResponse.json({ data: inMemoryBlogs, source: "initial" });
    }

    return NextResponse.json({ data, source: "supabase" });
  } catch (err: any) {
    console.error("[Blogs GET Error]:", err);
    return NextResponse.json({ data: inMemoryBlogs, source: "error-fallback" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      title,
      slug,
      excerpt,
      content,
      category,
      tags = [],
      author_name = "100x MINDS Editorial",
      author_role = "Principal AI Architect",
      author_avatar = "100x",
      cover_image = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      read_time = "5 min read",
      featured = false,
      status = "published",
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required fields." },
        { status: 400 }
      );
    }

    const newBlog: BlogPost = {
      id: "blog-" + Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      title,
      slug,
      excerpt: excerpt || title,
      content,
      category: category || "AI Engineering",
      tags: Array.isArray(tags) ? tags : [tags],
      author_name,
      author_role,
      author_avatar,
      cover_image,
      read_time,
      featured: Boolean(featured),
      status: status === "draft" ? "draft" : "published",
      views: 0,
    };

    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("blogs")
        .insert({
          id: newBlog.id,
          created_at: newBlog.created_at,
          updated_at: newBlog.updated_at,
          title: newBlog.title,
          slug: newBlog.slug,
          excerpt: newBlog.excerpt,
          content: newBlog.content,
          category: newBlog.category,
          tags: newBlog.tags,
          author_name: newBlog.author_name,
          author_role: newBlog.author_role,
          author_avatar: newBlog.author_avatar,
          cover_image: newBlog.cover_image,
          read_time: newBlog.read_time,
          featured: newBlog.featured,
          status: newBlog.status,
          views: 0,
        })
        .select()
        .single();

      if (!error && data) {
        inMemoryBlogs.unshift(data as BlogPost);
        return NextResponse.json({ data, source: "supabase" }, { status: 201 });
      } else {
        console.warn("[Supabase Insert Warning] saving locally:", error?.message);
      }
    }

    // Fallback save in memory
    inMemoryBlogs.unshift(newBlog);
    return NextResponse.json({ data: newBlog, source: "in-memory" }, { status: 201 });
  } catch (err: any) {
    console.error("[Blogs POST Error]:", err);
    return NextResponse.json({ error: err?.message || "Failed to create blog post." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required for update." }, { status: 400 });
    }

    const updatedTime = new Date().toISOString();
    const updatedPayload = { ...updates, updated_at: updatedTime };

    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("blogs")
        .update(updatedPayload)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        inMemoryBlogs = inMemoryBlogs.map((b) => (b.id === id ? { ...b, ...data } : b));
        return NextResponse.json({ data, source: "supabase" });
      }
    }

    // In-memory update
    let foundBlog: BlogPost | null = null;
    inMemoryBlogs = inMemoryBlogs.map((b) => {
      if (b.id === id) {
        const merged: BlogPost = { ...b, ...updatedPayload };
        foundBlog = merged;
        return merged;
      }
      return b;
    });

    if (!foundBlog) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json({ data: foundBlog, source: "in-memory" });
  } catch (err: any) {
    console.error("[Blogs PUT Error]:", err);
    return NextResponse.json({ error: err?.message || "Failed to update blog post." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    if (supabase) {
      await supabase.from("blogs").delete().eq("id", id);
    }

    inMemoryBlogs = inMemoryBlogs.filter((b) => b.id !== id);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    console.error("[Blogs DELETE Error]:", err);
    return NextResponse.json({ error: err?.message || "Failed to delete blog." }, { status: 500 });
  }
}
