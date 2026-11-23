"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Search,
  Sparkles,
  Clock,
  User,
  Tag,
  Star,
  ChevronRight,
  ArrowUpRight,
  Share2,
} from "lucide-react";
import { initialBlogs, BlogPost } from "@/data/blogs";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/CTASection";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Autonomous Agents",
  "Agentic GTM",
  "AI Architecture",
  "Systems Engineering",
];

export default function BlogIndexPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = useMemo(() => {
    return blogs.find((b) => b.featured && b.status === "published") || blogs[0];
  }, [blogs]);

  const regularPosts = useMemo(() => {
    return blogs.filter((blog) => {
      if (blog.status !== "published") return false;
      const matchesCategory =
        selectedCategory === "All" || blog.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-background text-on-surface">
      {/* Ambient Top Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-primary-container/20 via-tertiary-container/10 to-transparent blur-[140px] rounded-full -z-10" />
      <div className="pointer-events-none absolute top-96 -left-32 w-96 h-96 bg-primary-container/10 blur-[130px] rounded-full -z-10" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-12 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-xl border border-primary/30 shadow-kinetic mb-8">
          <BookOpen className="w-3.5 h-3.5 text-primary" />
          <span className="font-heading text-xs text-primary uppercase tracking-widest font-bold">
            100x MINDS INTELLIGENCE & RESEARCH
          </span>
        </div>

        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl max-w-4xl tracking-tight text-on-surface leading-tight mb-6">
          Architectural Insights &{" "}
          <span className="bg-gradient-to-r from-primary-container via-primary-fixed-dim to-tertiary-container bg-clip-text text-transparent">
            Agentic Systems Dispatches
          </span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
          Deep dives into multi-agent orchestration swarms, autonomous GTM pipelines, zero-trust LLM telemetry, and tier-1 production engineering.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search architectural deep dives, models, or topics..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface-container-low/80 backdrop-blur-xl border border-white/10 text-xs sm:text-sm text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-all shadow-xl"
          />
          <Search className="w-4 h-4 text-primary absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FEATURED HERO POST */}
      {/* ========================================================================= */}
      {featuredPost && selectedCategory === "All" && !searchQuery && (
        <section className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <div className="relative rounded-3xl bg-surface-container-low/70 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl group-hover:border-primary/40 transition-all p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-[11px] font-heading font-bold uppercase tracking-wider">
                      <Star className="w-3 h-3 fill-primary" />
                      <span>Featured Research</span>
                    </span>
                    <span className="text-xs font-mono text-on-surface-variant">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs font-mono text-on-surface-variant">•</span>
                    <span className="text-xs font-mono text-on-surface-variant">
                      {featuredPost.read_time}
                    </span>
                  </div>

                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white group-hover:text-primary transition-colors leading-tight mb-4">
                    {featuredPost.title}
                  </h2>

                  <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading font-bold text-xs ring-1 ring-primary/20">
                        {featuredPost.author_avatar || "100x"}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-heading font-bold text-white">
                          {featuredPost.author_name}
                        </span>
                        <span className="text-[10px] text-on-surface-variant font-mono">
                          {featuredPost.author_role}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 text-xs font-heading font-bold text-primary group-hover:translate-x-1 transition-transform">
                      <span>Read Full Deep Dive</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {featuredPost.cover_image && (
                  <div className="lg:col-span-5 h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden border border-white/10 relative">
                    <img
                      src={featuredPost.cover_image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>
                )}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. CATEGORY FILTER PILLS */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                selectedCategory === cat
                  ? "bg-primary text-white shadow-kinetic"
                  : "bg-surface-container-low/70 border border-white/10 text-on-surface-variant hover:text-white hover:border-white/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. POSTS GRID */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
        {regularPosts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <BookOpen className="w-12 h-12 text-on-surface-variant/30 mb-3" />
            <h3 className="font-heading font-bold text-xl text-white">No articles found</h3>
            <p className="font-sans text-xs text-on-surface-variant mt-1">
              Try adjusting your category filter or search keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full"
              >
                <GlassCard className="flex flex-col justify-between h-full p-6 group-hover:border-primary/40 transition-all">
                  <div>
                    {post.cover_image && (
                      <div className="w-full h-48 rounded-xl overflow-hidden mb-5 border border-white/10 relative">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="font-heading text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md border border-white/10 text-primary">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant mb-2.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.read_time}</span>
                      <span>•</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-white group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-3">
                      {post.title}
                    </h3>

                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading font-bold text-[10px] ring-1 ring-primary/20">
                        {post.author_avatar || "100x"}
                      </div>
                      <span className="text-xs font-heading font-semibold text-white">
                        {post.author_name}
                      </span>
                    </div>

                    <span className="text-xs font-heading font-bold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>Read</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Build Autonomous Systems with 100x Precision?"
        subtitle="Schedule a 48-hour architecture diagnostic with our principal AI engineers."
      />
    </div>
  );
}
