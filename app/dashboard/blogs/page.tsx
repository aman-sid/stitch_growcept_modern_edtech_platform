"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  PlusCircle,
  Edit3,
  Trash2,
  CheckCircle2,
  Eye,
  Sparkles,
  ArrowRight,
  TrendingUp,
  X,
  Save,
  Globe,
  Star,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Code,
  List,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Quote,
  Image as ImageIcon,
  Tag as TagIcon,
  Search,
  Clock,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost, initialBlogs } from "@/data/blogs";

const CATEGORIES = [
  "Autonomous Agents",
  "Agentic GTM",
  "AI Architecture",
  "Systems Engineering",
  "Venture Advisory",
  "Security & Compliance",
];

const PRESET_COVERS = [
  {
    name: "Cybernetic Obsidian",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Neural Nexus",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Quantum Core",
    url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Algorithmic Flux",
    url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
  },
];

const DEFAULT_BLOG_FORM: Omit<BlogPost, "id" | "created_at"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: `## Executive Overview

Introduce the architectural objective and enterprise context here. Why is this critical for high-velocity teams?

### Technical Implementation

Explain the core engineering mechanics, model orchestration, or pipeline design.

\`\`\`typescript
// Example Architecture
const engine = new AgentOrchestrator({
  tier: "production",
  latencyBudgetMs: 150,
});
\`\`\`

### Production Outcomes & ROI

Summarize the operational gains, throughput jump, or cost savings achieved.`,
  category: "Autonomous Agents",
  tags: ["AI", "Architecture", "Engineering"],
  author_name: "Aman Sharma",
  author_role: "Principal AI Systems Architect",
  author_avatar: "AS",
  cover_image: PRESET_COVERS[0].url,
  read_time: "5 min read",
  featured: false,
  status: "published",
  views: 0,
};

function BlogsManager() {
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "editor">("list");
  const [editorTab, setEditorTab] = useState<"write" | "preview">("write");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState(DEFAULT_BLOG_FORM);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/dashboard/blogs");
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        setBlogs(json.data);
      } else {
        setBlogs(initialBlogs);
      }
    } catch {
      setBlogs(initialBlogs);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    if (searchParams.get("action") === "new") {
      handleOpenNew();
    }
  }, [searchParams]);

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData(DEFAULT_BLOG_FORM);
    setEditorTab("write");
    setViewMode("editor");
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags || [],
      author_name: blog.author_name,
      author_role: blog.author_role,
      author_avatar: blog.author_avatar || "100x",
      cover_image: blog.cover_image || PRESET_COVERS[0].url,
      read_time: blog.read_time,
      featured: blog.featured,
      status: blog.status,
      views: blog.views || 0,
    });
    setEditorTab("write");
    setViewMode("editor");
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const generatedSlug = prev.slug === "" || prev.slug === slugify(prev.title)
        ? slugify(val)
        : prev.slug;
      return { ...prev, title: val, slug: generatedSlug };
    });
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("blog-content-area") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = prefix + (selectedText || "text") + suffix;

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setFormData((prev) => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 50);
  };

  const handleSave = async (forceStatus?: "draft" | "published") => {
    if (!formData.title.trim()) {
      setFeedback({ type: "error", text: "Please enter a blog title." });
      return;
    }
    if (!formData.slug.trim()) {
      setFeedback({ type: "error", text: "Please enter a URL slug." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    const payload = {
      ...formData,
      status: forceStatus || formData.status,
    };

    try {
      if (editingId) {
        const res = await fetch("/api/dashboard/blogs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        if (!res.ok) throw new Error("Failed to update article.");
      } else {
        const res = await fetch("/api/dashboard/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create article.");
      }

      setFeedback({
        type: "success",
        text: `Article successfully ${payload.status === "published" ? "published" : "saved as draft"}!`,
      });

      await fetchBlogs();
      setTimeout(() => {
        setViewMode("list");
        setFeedback(null);
      }, 1200);
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message || "Failed to save article." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/dashboard/blogs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      alert("Failed to delete blog post.");
    }
  };

  const handleToggleStatus = async (blog: BlogPost) => {
    const nextStatus = blog.status === "published" ? "draft" : "published";
    try {
      await fetch("/api/dashboard/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: blog.id, status: nextStatus }),
      });
      setBlogs((prev) =>
        prev.map((b) => (b.id === blog.id ? { ...b, status: nextStatus } : b))
      );
    } catch (err) {
      alert("Failed to toggle status.");
    }
  };

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = filterCategory === "all" || blog.category === filterCategory;
      const matchesStatus = filterStatus === "all" || blog.status === filterStatus;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [blogs, searchQuery, filterCategory, filterStatus]);

  return (
    <div className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-primary font-heading text-xs uppercase tracking-wider font-bold mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Content Intelligence Console</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            {viewMode === "editor"
              ? editingId
                ? "Edit Blog Post"
                : "Write New Blog Post"
              : "Blog Management & Publishing"}
          </h1>
          <p className="font-sans text-xs text-on-surface-variant mt-1">
            Author, edit, and publish engineering deep dives, research papers, and GTM dispatches.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {viewMode === "editor" ? (
            <button
              onClick={() => setViewMode("list")}
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-surface-container-high text-xs font-heading font-bold text-on-surface hover:text-white transition-colors"
            >
              Cancel & Exit
            </button>
          ) : (
            <>
              <button
                onClick={fetchBlogs}
                className="p-2.5 rounded-xl border border-white/10 bg-surface-container-high/60 text-on-surface-variant hover:text-white transition-colors shadow-sm"
                title="Refresh Articles"
              >
                <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              </button>
              <Link
                href="/blog"
                target="_blank"
                className="px-3.5 py-2.5 rounded-xl border border-white/10 bg-surface-container-high/70 text-xs font-heading font-bold text-on-surface hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Public Blog</span>
              </Link>
              <button
                onClick={handleOpenNew}
                className="btn-kinetic px-4 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Write Blog</span>
              </button>
            </>
          )}
        </div>
      </div>

      {feedback && (
        <div
          className={cn(
            "mb-6 p-4 rounded-2xl flex items-center gap-3 text-xs font-sans animate-fadeIn",
            feedback.type === "success"
              ? "bg-primary/10 border border-primary/30 text-primary"
              : "bg-error/10 border border-error/30 text-error"
          )}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW: BLOG WRITER & EDITOR */}
      {/* ========================================================================= */}
      {viewMode === "editor" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editing Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl bg-surface-container-low/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-xl">
              {/* Title & Slug */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1.5">
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Scaling Autonomous Agent Swarms to 10M Tokens/Day"
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-sm font-heading font-bold text-white placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-on-surface-variant mb-1">
                    URL Slug
                  </label>
                  <div className="flex items-center rounded-xl bg-surface-container-lowest border border-white/10 px-3.5 py-2 text-xs font-mono text-on-surface-variant">
                    <span className="opacity-50 select-none">100xminds.ai/blog/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: slugify(e.target.value) })
                      }
                      placeholder="scaling-autonomous-agent-swarms"
                      className="bg-transparent text-white font-mono flex-1 focus:outline-none ml-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1.5">
                    Executive Summary / Excerpt
                  </label>
                  <textarea
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="A punchy 1-2 sentence synopsis shown in previews, social cards, and SEO metadata."
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors shadow-inner"
                  />
                </div>
              </div>

              {/* Editor Tabs: Write vs Live Preview */}
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-container-lowest border border-white/10">
                    <button
                      type="button"
                      onClick={() => setEditorTab("write")}
                      className={cn(
                        "px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all",
                        editorTab === "write"
                          ? "bg-primary text-white shadow-sm"
                          : "text-on-surface-variant hover:text-white"
                      )}
                    >
                      Markdown Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab("preview")}
                      className={cn(
                        "px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold transition-all flex items-center gap-1.5",
                        editorTab === "preview"
                          ? "bg-primary text-white shadow-sm"
                          : "text-on-surface-variant hover:text-white"
                      )}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Render</span>
                    </button>
                  </div>

                  {editorTab === "write" && (
                    <div className="hidden sm:flex items-center gap-1 text-on-surface-variant">
                      <button
                        type="button"
                        onClick={() => insertMarkdown("## ")}
                        className="p-1.5 rounded hover:bg-white/5 hover:text-white"
                        title="Heading 2"
                      >
                        <Heading2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("### ")}
                        className="p-1.5 rounded hover:bg-white/5 hover:text-white"
                        title="Heading 3"
                      >
                        <Heading3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("**", "**")}
                        className="p-1.5 rounded hover:bg-white/5 hover:text-white"
                        title="Bold"
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("*", "*")}
                        className="p-1.5 rounded hover:bg-white/5 hover:text-white"
                        title="Italic"
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("\n```typescript\n", "\n```\n")}
                        className="p-1.5 rounded hover:bg-white/5 hover:text-white"
                        title="Code Block"
                      >
                        <Code className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("\n> ")}
                        className="p-1.5 rounded hover:bg-white/5 hover:text-white"
                        title="Blockquote"
                      >
                        <Quote className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("\n- ")}
                        className="p-1.5 rounded hover:bg-white/5 hover:text-white"
                        title="Bullet List"
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {editorTab === "write" ? (
                  <div>
                    <textarea
                      id="blog-content-area"
                      rows={18}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Write your article in Markdown..."
                      className="w-full font-mono text-xs text-white bg-surface-container-lowest border border-white/10 rounded-xl p-4 focus:outline-none focus:border-primary transition-colors leading-relaxed shadow-inner"
                    />
                    <div className="flex justify-between items-center text-[10px] text-on-surface-variant font-mono mt-2">
                      <span>Markdown supported: ## Headings, **bold**, `code`, ```typescript blocks</span>
                      <span>{formData.content.length} characters</span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl bg-surface-container-lowest border border-white/10 p-6 min-h-[420px] text-on-surface font-sans prose prose-invert max-w-none">
                    <h1 className="text-2xl font-heading font-extrabold text-white mb-4">
                      {formData.title || "Untitled Article"}
                    </h1>
                    <div className="flex items-center gap-2 text-xs text-primary font-mono mb-6 pb-4 border-b border-white/10">
                      <span>{formData.category}</span>
                      <span>•</span>
                      <span>{formData.read_time}</span>
                      <span>•</span>
                      <span>By {formData.author_name}</span>
                    </div>

                    <div className="whitespace-pre-line text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {formData.content}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Settings Column */}
          <div className="flex flex-col gap-6">
            {/* Publish & Status Controls */}
            <div className="rounded-2xl bg-surface-container-low/80 backdrop-blur-2xl border border-white/10 p-6 shadow-xl">
              <h3 className="font-heading font-bold text-sm text-white mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <span>Publishing Controls</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                    Status
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: "draft" })}
                      className={cn(
                        "py-2 px-3 rounded-xl border text-xs font-heading font-bold transition-all",
                        formData.status === "draft"
                          ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                          : "border-white/10 bg-surface-container-lowest text-on-surface-variant hover:text-white"
                      )}
                    >
                      Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, status: "published" })}
                      className={cn(
                        "py-2 px-3 rounded-xl border text-xs font-heading font-bold transition-all",
                        formData.status === "published"
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                          : "border-white/10 bg-surface-container-lowest text-on-surface-variant hover:text-white"
                      )}
                    >
                      Published
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-lowest border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded accent-primary w-4 h-4"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-heading font-bold text-white flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>Featured Article</span>
                    </span>
                    <span className="text-[10px] text-on-surface-variant">
                      Pin to the top hero slot on the public blog page
                    </span>
                  </div>
                </label>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSave("published")}
                    className="btn-kinetic w-full py-3 rounded-xl text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? "Publishing..." : "Publish Post"}</span>
                  </button>

                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSave("draft")}
                    className="w-full py-2.5 rounded-xl border border-white/10 bg-surface-container-high/60 text-xs font-heading font-bold text-on-surface hover:text-white transition-colors"
                  >
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>

            {/* Classification & Metadata */}
            <div className="rounded-2xl bg-surface-container-low/80 backdrop-blur-2xl border border-white/10 p-6 shadow-xl">
              <h3 className="font-heading font-bold text-sm text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Classification</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1.5">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white focus:outline-none focus:border-primary shadow-inner"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1.5">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    placeholder="e.g. 6 min read"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white focus:outline-none focus:border-primary shadow-inner"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1.5">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="Add tag and hit Enter"
                      className="flex-1 px-3 py-2 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white focus:outline-none focus:border-primary shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-2 rounded-xl bg-surface-container-high border border-white/10 text-xs font-heading font-bold text-white hover:bg-primary transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high text-[11px] font-mono text-on-surface-variant"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-error"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Author Profile */}
            <div className="rounded-2xl bg-surface-container-low/80 backdrop-blur-2xl border border-white/10 p-6 shadow-xl">
              <h3 className="font-heading font-bold text-sm text-white mb-4 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-primary" />
                <span>Author Attribution</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-on-surface-variant mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white focus:outline-none focus:border-primary shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-on-surface-variant mb-1">
                    Author Role / Title
                  </label>
                  <input
                    type="text"
                    value={formData.author_role}
                    onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white focus:outline-none focus:border-primary shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Cover Imagery */}
            <div className="rounded-2xl bg-surface-container-low/80 backdrop-blur-2xl border border-white/10 p-6 shadow-xl">
              <h3 className="font-heading font-bold text-sm text-white mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                <span>Cover Image</span>
              </h3>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_COVERS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, cover_image: preset.url })}
                      className={cn(
                        "relative rounded-xl overflow-hidden h-16 border text-left p-1 transition-all group",
                        formData.cover_image === preset.url
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-white/10 opacity-70 hover:opacity-100"
                      )}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <span className="absolute bottom-1.5 left-2 text-[9px] font-heading font-bold text-white bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-[11px] font-mono text-on-surface-variant mb-1">
                    Custom Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.cover_image || ""}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white focus:outline-none focus:border-primary shadow-inner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW: BLOGS LIST & METRICS */
        /* ========================================================================= */
        <div className="flex flex-col gap-6">
          {/* Top Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-white/10 shadow-lg">
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                Total Articles
              </span>
              <span className="font-heading font-black text-2xl text-white">
                {blogs.length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-white/10 shadow-lg">
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                Published Live
              </span>
              <span className="font-heading font-black text-2xl text-emerald-400">
                {blogs.filter((b) => b.status === "published").length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-white/10 shadow-lg">
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                Drafts in Review
              </span>
              <span className="font-heading font-black text-2xl text-amber-400">
                {blogs.filter((b) => b.status === "draft").length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-white/10 shadow-lg">
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                Total Article Views
              </span>
              <span className="font-heading font-black text-2xl text-primary">
                {blogs.reduce((acc, b) => acc + (b.views || 0), 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-lg">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, excerpt, or tags..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary shadow-inner"
              />
              <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white focus:outline-none focus:border-primary"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white focus:outline-none focus:border-primary"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
            </div>
          </div>

          {/* Articles List Table / Cards */}
          {filteredBlogs.length === 0 ? (
            <div className="p-12 rounded-3xl bg-surface-container-low/60 border border-white/10 text-center flex flex-col items-center">
              <BookOpen className="w-12 h-12 text-on-surface-variant/40 mb-3" />
              <h3 className="font-heading font-bold text-lg text-white">No articles found</h3>
              <p className="font-sans text-xs text-on-surface-variant max-w-sm mt-1 mb-6">
                No blog posts match your current search and filter criteria.
              </p>
              <button
                onClick={handleOpenNew}
                className="btn-kinetic px-5 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Write First Post</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-5 sm:p-6 rounded-2xl bg-surface-container-low/80 backdrop-blur-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl group"
                >
                  <div className="flex items-start gap-4 flex-1">
                    {blog.cover_image && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 hidden sm:block">
                        <img
                          src={blog.cover_image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-heading text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                          {blog.category}
                        </span>

                        <button
                          onClick={() => handleToggleStatus(blog)}
                          className={cn(
                            "text-[10px] font-heading font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-colors cursor-pointer",
                            blog.status === "published"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                              : "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                          )}
                          title="Click to toggle status"
                        >
                          {blog.status}
                        </button>

                        {blog.featured && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-heading font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
                            <Star className="w-2.5 h-2.5 fill-amber-400" />
                            <span>Featured</span>
                          </span>
                        )}

                        <span className="text-[11px] text-on-surface-variant font-mono flex items-center gap-1 ml-auto sm:ml-0">
                          <Clock className="w-3 h-3" />
                          <span>{blog.read_time}</span>
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-primary transition-colors line-clamp-1">
                        {blog.title}
                      </h3>

                      <p className="font-sans text-xs text-on-surface-variant line-clamp-2 mt-1 mb-2.5">
                        {blog.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-on-surface-variant font-mono">
                        <span>By {blog.author_name}</span>
                        <span>•</span>
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>/blog/{blog.slug}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="p-2.5 rounded-xl bg-surface-container-high/60 border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10 transition-colors shadow-sm"
                      title="Preview public article"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleEdit(blog)}
                      className="px-3.5 py-2 rounded-xl bg-surface-container-high/80 border border-white/10 text-xs font-heading font-bold text-white hover:bg-primary transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(blog.id, blog.title)}
                      className="p-2.5 rounded-xl bg-surface-container-high/60 border border-white/10 text-on-surface-variant hover:text-error hover:bg-error/10 hover:border-error/30 transition-colors shadow-sm"
                      title="Delete article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DashboardBlogsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-on-surface-variant font-mono text-xs">Loading Blog Engine...</div>}>
      <BlogsManager />
    </Suspense>
  );
}
