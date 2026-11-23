"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Check,
  Tag,
  Sparkles,
  ArrowRight,
  BookOpen,
  User,
  Terminal,
} from "lucide-react";
import { initialBlogs, BlogPost } from "@/data/blogs";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/CTASection";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Try finding in initialBlogs or fetching from API
    const found = initialBlogs.find((b) => b.slug === slug);
    if (found) {
      setPost(found);
      setLoading(false);
    } else {
      fetch(`/api/blogs?slug=${encodeURIComponent(slug)}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.data && json.data.length > 0) {
            setPost(json.data[0]);
          } else {
            setPost(null);
          }
        })
        .catch(() => setPost(null))
        .finally(() => setLoading(false));
    }
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedPosts = initialBlogs
    .filter((b) => b.slug !== slug && b.status === "published")
    .slice(0, 2);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-on-surface-variant font-mono text-xs">
        Ingesting Article Telemetry...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
        <BookOpen className="w-12 h-12 text-primary mb-4" />
        <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
          Article Not Found
        </h1>
        <p className="text-xs text-on-surface-variant max-w-sm mb-6">
          The requested engineering dispatch or research publication could not be located.
        </p>
        <Button href="/blog" variant="kinetic">
          Return to All Articles
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-background text-on-surface">
      {/* Ambient Top Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-primary-container/20 via-tertiary-container/10 to-transparent blur-[140px] rounded-full -z-10" />

      {/* Article Header Container */}
      <div className="px-4 sm:px-6 lg:px-8 pt-12 pb-8 max-w-4xl mx-auto w-full">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-on-surface-variant hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Articles</span>
        </Link>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="font-heading text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
            {post.category}
          </span>
          <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.read_time}</span>
          </span>
          <span className="text-xs font-mono text-on-surface-variant">•</span>
          <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        {/* Excerpt Lead */}
        <p className="font-sans text-base sm:text-lg text-on-surface-variant leading-relaxed mb-8 pb-8 border-b border-white/10">
          {post.excerpt}
        </p>

        {/* Author & Share Bar */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading font-bold text-sm ring-1 ring-primary/20">
              {post.author_avatar || "100x"}
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm text-white">
                {post.author_name}
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                {post.author_role} • 100x MINDS
              </span>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="px-3.5 py-2 rounded-xl bg-surface-container-high/60 border border-white/10 text-xs font-heading font-bold text-on-surface hover:text-white transition-colors flex items-center gap-2 shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-primary" />
                <span>Share Article</span>
              </>
            )}
          </button>
        </div>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 mb-12 shadow-2xl relative aspect-[16/9]">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* ARTICLE BODY */}
        {/* ========================================================================= */}
        <article className="prose prose-invert max-w-none text-on-surface font-sans leading-relaxed text-sm sm:text-base">
          <div className="space-y-6">
            {post.content.split("\n\n").map((block, idx) => {
              const trimmed = block.trim();
              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="font-heading font-bold text-xl sm:text-2xl text-white mt-8 mb-3"
                  >
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h2
                    key={idx}
                    className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-10 mb-4 pb-2 border-b border-white/10"
                  >
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }
              if (trimmed.startsWith("```")) {
                const codeLines = trimmed.replace(/```[a-z]*\n?/i, "").replace(/```$/, "");
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-surface-container-lowest border border-white/10 p-5 font-mono text-xs text-primary-fixed-dim overflow-x-auto shadow-inner my-6"
                  >
                    <pre className="p-0 m-0 bg-transparent">
                      <code>{codeLines}</code>
                    </pre>
                  </div>
                );
              }
              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote
                    key={idx}
                    className="border-l-4 border-primary pl-4 italic text-on-surface text-sm sm:text-base my-6 bg-surface-container-high/30 py-3 rounded-r-xl"
                  >
                    {trimmed.replace("> ", "")}
                  </blockquote>
                );
              }
              if (trimmed.startsWith("- ")) {
                const items = trimmed.split("\n- ").map((item) => item.replace(/^- /, ""));
                return (
                  <ul key={idx} className="list-disc list-inside space-y-2 text-on-surface-variant my-4">
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-on-surface-variant leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-10 mt-10 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-on-surface-variant mr-1">
                Topics:
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-surface-container-high/70 border border-white/5 text-xs font-mono text-primary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-surface-container-low/80 backdrop-blur-2xl border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-heading font-black text-xl ring-1 ring-primary/20 shrink-0">
            {post.author_avatar || "100x"}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-heading font-bold text-lg text-white">
              Written by {post.author_name}
            </h4>
            <p className="font-mono text-xs text-primary mb-2">
              {post.author_role} at 100x MINDS
            </p>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-4">
              Leading high-velocity engineering sprints and architecture advisory for frontier AI startups and enterprise enterprises.
            </p>
            <Link
              href="/services#audit-form"
              className="text-xs font-heading font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Consult with Our Engineering Team →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RELATED ARTICLES */}
      {/* ========================================================================= */}
      {relatedPosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full border-t border-white/5 mt-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading font-bold text-2xl text-white">
              Related Research & Dispatches
            </h3>
            <Link
              href="/blog"
              className="text-xs font-heading font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Link key={related.id} href={`/blog/${related.slug}`}>
                <GlassCard className="p-6 h-full group hover:border-primary/40 transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 inline-block mb-3">
                      {related.category}
                    </span>
                    <h4 className="font-heading font-bold text-lg text-white group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {related.title}
                    </h4>
                    <p className="font-sans text-xs text-on-surface-variant line-clamp-2 mb-4">
                      {related.excerpt}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{related.read_time}</span>
                  </span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Global CTA */}
      <CTASection
        title="Ready to Build Autonomous Systems with 100x Precision?"
        subtitle="Schedule a 48-hour architecture diagnostic with our principal AI engineers."
      />
    </div>
  );
}
