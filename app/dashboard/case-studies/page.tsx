"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FileText,
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
  Quote,
  Layers,
  Code,
  Tag,
  RefreshCw,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricResult {
  metric: string;
  label: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarInitials: string;
}

interface CaseStudy {
  id: string;
  created_at?: string;
  tag: string;
  category: "all" | "swarms" | "rag" | "edge" | "fintech" | "devtools" | string;
  category_label?: string;
  categoryLabel?: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  technology: string[];
  implementation: string;
  results: MetricResult[];
  testimonial?: Testimonial | null;
  featured: boolean;
  status: "draft" | "published";
}

const DEFAULT_FORM: Omit<CaseStudy, "id" | "created_at"> = {
  tag: "AI DISTRIBUTION SWARM",
  category: "swarms",
  categoryLabel: "Agent Swarms & Distribution",
  client: "Enterprise Global Logistics Inc.",
  industry: "Supply Chain & Channel Distribution",
  problem:
    "Manual partner coordination and dispatch scheduling across 40+ international distribution hubs caused 72-hour fulfillment delays and high operational friction.",
  solution:
    "Architected an autonomous multi-agent distribution engine orchestrating sub-100ms routing decisions, real-time demand forecasting, and automated carrier dispatch.",
  technology: ["LangGraph", "Claude 3.5 Sonnet", "Supabase pgvector", "Next.js 15", "Redis"],
  implementation:
    "Deployed an event-driven 4-node swarm with sovereign vector memory and automated human-in-the-loop exception gating inside an isolated enterprise VPC.",
  results: [
    { metric: "88%", label: "Reduction in Dispatch Latency" },
    { metric: "14x", label: "Throughput Capacity Jump" },
    { metric: "$1.4M", label: "Annualized Operating Savings" },
  ],
  testimonial: {
    quote:
      "100x MINDS engineered our distribution engine in record time. We scaled from manual spreadsheets to an autonomous AI control plane in under 4 weeks.",
    author: "Elena Rostova",
    role: "Chief Operating Officer",
    avatarInitials: "ER",
  },
  featured: true,
  status: "published",
};

function CaseStudiesManager() {
  const searchParams = useSearchParams();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "editor">("list");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [techInput, setTechInput] = useState("");
  const [hasTestimonial, setHasTestimonial] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/case-studies");
      const json = await res.json();
      if (json.data) {
        setCaseStudies(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch case studies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  // Check URL query parameters (e.g. ?new=true or ?edit=id)
  useEffect(() => {
    const isNew = searchParams.get("new");
    const editId = searchParams.get("edit");
    if (isNew) {
      handleOpenNew();
    } else if (editId) {
      handleEditById(editId);
    }
  }, [searchParams, caseStudies]);

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData(DEFAULT_FORM);
    setTechInput("");
    setHasTestimonial(true);
    setSaveSuccess(false);
    setErrorMessage("");
    setViewMode("editor");
  };

  const handleEdit = (cs: CaseStudy) => {
    setEditingId(cs.id);
    setFormData({
      tag: cs.tag,
      category: cs.category,
      categoryLabel: cs.categoryLabel || cs.category_label || "",
      client: cs.client,
      industry: cs.industry,
      problem: cs.problem,
      solution: cs.solution,
      technology: cs.technology || [],
      implementation: cs.implementation,
      results: cs.results || [],
      testimonial: cs.testimonial || null,
      featured: cs.featured ?? false,
      status: cs.status || "draft",
    });
    setHasTestimonial(!!cs.testimonial);
    setSaveSuccess(false);
    setErrorMessage("");
    setViewMode("editor");
  };

  const handleEditById = (id: string) => {
    const cs = caseStudies.find((c) => c.id === id);
    if (cs) {
      handleEdit(cs);
    }
  };

  const handleDelete = async (id: string, clientName: string) => {
    if (!confirm(`Are you sure you want to delete the case study for "${clientName}"?`)) {
      return;
    }

    try {
      const res = await fetch("/api/dashboard/case-studies", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setCaseStudies((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete case study:", err);
      alert("Failed to delete case study.");
    }
  };

  // Add / Remove Results
  const handleAddResult = () => {
    setFormData((prev) => ({
      ...prev,
      results: [...prev.results, { metric: "+100%", label: "Impact Metric Description" }],
    }));
  };

  const handleRemoveResult = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index),
    }));
  };

  const handleResultChange = (index: number, field: "metric" | "label", val: string) => {
    setFormData((prev) => {
      const copy = [...prev.results];
      copy[index] = { ...copy[index], [field]: val };
      return { ...prev, results: copy };
    });
  };

  // Technology chips
  const handleAddTech = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter" && e.key !== ",") return;
    e.preventDefault();
    const trimmed = techInput.trim().replace(/^,+|,+$/g, "");
    if (trimmed && !formData.technology.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, technology: [...prev.technology, trimmed] }));
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technology: prev.technology.filter((t) => t !== tech),
    }));
  };

  // Submit Handler (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);

    try {
      const payload = {
        ...formData,
        testimonial: hasTestimonial ? formData.testimonial : null,
      };

      if (editingId) {
        // PATCH
        const res = await fetch("/api/dashboard/case-studies", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...payload }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to update case study.");
        setSaveSuccess(true);
        fetchCaseStudies();
      } else {
        // POST
        const res = await fetch("/api/dashboard/case-studies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to create case study.");
        setSaveSuccess(true);
        fetchCaseStudies();
      }
    } catch (err: any) {
      console.error("Save error:", err);
      setErrorMessage(err.message || "An unexpected error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Venture Telemetry & Publications
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Case Studies Manager & Writer
          </h1>
          <p className="font-sans text-sm text-on-surface-variant mt-1">
            Publish high-impact verified case studies, architectural blueprints, and client testimonials.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-3">
          <Link
            href="/casestudy"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-high border border-white/10 text-xs font-semibold text-on-surface hover:text-primary transition-all"
          >
            <span>Live Case Studies</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {viewMode === "list" ? (
            <button
              onClick={handleOpenNew}
              className="btn-kinetic inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Write Case Study</span>
            </button>
          ) : (
            <button
              onClick={() => setViewMode("list")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high border border-white/10 text-xs font-heading font-semibold text-white hover:bg-surface-container-highest transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>View All Case Studies ({caseStudies.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. LIST VIEW */}
      {/* ========================================================================= */}
      {viewMode === "list" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-semibold text-on-surface-variant uppercase tracking-wider">
              Published & Draft Case Studies ({caseStudies.length})
            </span>
            <button
              onClick={fetchCaseStudies}
              disabled={loading}
              className="text-xs text-on-surface-variant hover:text-white flex items-center gap-1.5 font-medium transition-colors"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin text-primary")} />
              <span>Refresh</span>
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center rounded-2xl bg-surface-container-low/50 border border-white/10 text-on-surface-variant">
              <RefreshCw className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
              Loading case studies...
            </div>
          ) : caseStudies.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-surface-container-low/50 border border-white/10">
              <FileText className="w-8 h-8 text-on-surface-variant/40 mx-auto mb-2" />
              <h3 className="font-heading font-bold text-base text-white">No case studies found</h3>
              <p className="text-xs text-on-surface-variant mt-1 mb-4">
                Write your first client case study to showcase high-leverage transformations.
              </p>
              <button
                onClick={handleOpenNew}
                className="btn-kinetic px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider"
              >
                + Write First Case Study
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((cs) => (
                <div
                  key={cs.id}
                  className="rounded-2xl bg-surface-container-low/70 backdrop-blur-2xl border border-white/10 p-6 flex flex-col justify-between group hover:border-primary/40 transition-all shadow-lg"
                >
                  <div className="space-y-4">
                    {/* Top Row: Tag, Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-heading text-[10px] uppercase font-bold tracking-wider border border-primary/20">
                        {cs.tag}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {cs.featured && (
                          <span className="p-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30" title="Featured on homepage">
                            <Star className="w-3 h-3 fill-amber-400" />
                          </span>
                        )}
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-heading font-bold uppercase tracking-wider border",
                            cs.status === "published"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          )}
                        >
                          {cs.status}
                        </span>
                      </div>
                    </div>

                    {/* Client & Industry */}
                    <div>
                      <h3 className="font-heading font-bold text-lg text-white group-hover:text-primary transition-colors leading-snug">
                        {cs.client}
                      </h3>
                      <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                        {cs.industry || cs.category_label || cs.category}
                      </p>
                    </div>

                    {/* Problem teaser */}
                    <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                      {cs.problem}
                    </p>

                    {/* Results chips */}
                    {cs.results && cs.results.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                        {cs.results.slice(0, 3).map((r, i) => (
                          <div key={i} className="p-2 rounded-xl bg-surface-container/60 border border-white/5 flex flex-col text-center">
                            <span className="font-heading font-black text-sm text-primary">
                              {r.metric}
                            </span>
                            <span className="text-[9px] text-on-surface-variant truncate">
                              {r.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech tags */}
                    {cs.technology && cs.technology.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {cs.technology.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-surface-container-high text-[10px] font-mono text-secondary-fixed border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                        {cs.technology.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-[10px] font-mono text-on-surface-variant">
                            +{cs.technology.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-5 mt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <button
                      onClick={() => handleEdit(cs)}
                      className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-primary hover:underline"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit & Update</span>
                    </button>

                    <button
                      onClick={() => handleDelete(cs.id, cs.client)}
                      className="p-1.5 rounded-lg text-on-surface-variant hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete Case Study"
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

      {/* ========================================================================= */}
      {/* 2. CASE STUDY WRITER / EDITOR */}
      {/* ========================================================================= */}
      {viewMode === "editor" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="rounded-3xl bg-surface-container-low/80 backdrop-blur-2xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-primary" />
                  <h2 className="font-heading font-extrabold text-xl text-white">
                    {editingId ? "Edit Case Study" : "Write New Case Study"}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData(DEFAULT_FORM)}
                    className="text-xs font-heading text-on-surface-variant hover:text-white px-2.5 py-1 rounded bg-surface-container-high border border-white/5"
                    title="Load prefilled high-velocity template"
                  >
                    Load Sample Template
                  </button>
                </div>
              </div>

              {/* Status Alert Messages */}
              {saveSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>
                    Case study successfully {editingId ? "updated" : "created"}! It is now live in your dashboard.
                  </span>
                </div>
              )}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-xs text-red-400 font-medium">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Tag & Client */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                    Tag / Badge (e.g. FINTECH AGENT SWARM) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="FINTECH AGENT SWARM"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Global Wealth Infrastructure"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary shadow-sm"
                  />
                </div>
              </div>

              {/* Category & Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white focus:outline-none focus:border-primary shadow-sm"
                  >
                    <option value="swarms">Agent Swarms</option>
                    <option value="fintech">Fintech</option>
                    <option value="rag">Citation RAG</option>
                    <option value="edge">Edge & Vision</option>
                    <option value="devtools">DevTools</option>
                    <option value="all">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                    Category Label
                  </label>
                  <input
                    type="text"
                    value={formData.categoryLabel}
                    onChange={(e) => setFormData({ ...formData, categoryLabel: e.target.value })}
                    placeholder="Fintech & Swarms"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                    Industry Sector
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="Wealth Management & Compliance"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary shadow-sm"
                  />
                </div>
              </div>

              {/* Problem / Bottleneck */}
              <div>
                <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                  The Problem / Legacy Bottleneck *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="Describe the operational inefficiency, slow review cycles, or high latency..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary shadow-sm leading-relaxed"
                />
              </div>

              {/* Engineered Solution */}
              <div>
                <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                  The Engineered Solution *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="Engineered a deterministic multi-agent pipeline with LangGraph orchestration..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary shadow-sm leading-relaxed"
                />
              </div>

              {/* Implementation Architecture */}
              <div>
                <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                  Implementation Architecture & Deployment Spec
                </label>
                <textarea
                  rows={2}
                  value={formData.implementation}
                  onChange={(e) => setFormData({ ...formData, implementation: e.target.value })}
                  placeholder="Deployed 4-node agent swarm with sovereign on-premise embeddings..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary shadow-sm leading-relaxed"
                />
              </div>

              {/* Technology Stack Chips */}
              <div>
                <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                  Technology Stack (Press Enter or Comma to add)
                </label>
                <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-surface-container-lowest border border-white/10 min-h-[44px] items-center">
                  {formData.technology.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high border border-white/5 text-xs font-mono text-primary font-semibold"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="hover:text-red-400 ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleAddTech}
                    placeholder={formData.technology.length === 0 ? "e.g. LangGraph, Claude 3.5, Supabase..." : "Add more..."}
                    className="flex-1 min-w-[120px] bg-transparent text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none px-2 py-1"
                  />
                </div>
              </div>

              {/* Results & Metrics Builder */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading font-bold text-on-surface">
                    Measurable Results & Metrics ({formData.results.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddResult}
                    className="text-xs font-heading font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Metric</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.results.map((res, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-xl bg-surface-container-lowest/80 border border-white/5">
                      <div className="w-28 sm:w-36 shrink-0">
                        <input
                          type="text"
                          value={res.metric}
                          onChange={(e) => handleResultChange(index, "metric", e.target.value)}
                          placeholder="e.g. 92%"
                          className="w-full px-3 py-1.5 rounded-lg bg-surface-container border border-white/10 text-xs font-heading font-bold text-primary text-center focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={res.label}
                          onChange={(e) => handleResultChange(index, "label", e.target.value)}
                          placeholder="e.g. Latency Reduction in Processing"
                          className="w-full px-3 py-1.5 rounded-lg bg-surface-container border border-white/10 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveResult(index)}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-red-400 hover:bg-red-500/10"
                        title="Remove metric"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Section (Toggle) */}
              <div className="pt-2 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Quote className="w-4 h-4 text-primary" />
                    <span className="text-xs font-heading font-bold text-white">
                      Client Executive Testimonial
                    </span>
                  </div>
                  <label className="flex items-center gap-2 text-xs font-heading text-on-surface-variant cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasTestimonial}
                      onChange={(e) => setHasTestimonial(e.target.checked)}
                      className="rounded accent-primary"
                    />
                    <span>Include Testimonial</span>
                  </label>
                </div>

                {hasTestimonial && (
                  <div className="p-4 rounded-xl bg-surface-container-lowest/60 border border-white/5 space-y-3">
                    <div>
                      <label className="block text-[11px] font-heading font-semibold text-on-surface-variant mb-1">
                        Quote Text
                      </label>
                      <textarea
                        rows={2}
                        value={formData.testimonial?.quote || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            testimonial: {
                              author: formData.testimonial?.author || "",
                              role: formData.testimonial?.role || "",
                              avatarInitials: formData.testimonial?.avatarInitials || "CX",
                              quote: e.target.value,
                            },
                          })
                        }
                        placeholder="The 100x MINDS team delivered in 3 weeks what our legacy vendor estimated..."
                        className="w-full px-3 py-2 rounded-lg bg-surface-container border border-white/10 text-xs text-white focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-heading text-on-surface-variant mb-0.5">
                          Author Name
                        </label>
                        <input
                          type="text"
                          value={formData.testimonial?.author || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              testimonial: {
                                quote: formData.testimonial?.quote || "",
                                role: formData.testimonial?.role || "",
                                avatarInitials: formData.testimonial?.avatarInitials || "CX",
                                author: e.target.value,
                              },
                            })
                          }
                          placeholder="Elena Rostova"
                          className="w-full px-3 py-1.5 rounded-lg bg-surface-container border border-white/10 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-heading text-on-surface-variant mb-0.5">
                          Role / Title
                        </label>
                        <input
                          type="text"
                          value={formData.testimonial?.role || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              testimonial: {
                                quote: formData.testimonial?.quote || "",
                                author: formData.testimonial?.author || "",
                                avatarInitials: formData.testimonial?.avatarInitials || "CX",
                                role: e.target.value,
                              },
                            })
                          }
                          placeholder="Chief Operating Officer"
                          className="w-full px-3 py-1.5 rounded-lg bg-surface-container border border-white/10 text-xs text-white focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-heading text-on-surface-variant mb-0.5">
                          Initials (2 letters)
                        </label>
                        <input
                          type="text"
                          maxLength={3}
                          value={formData.testimonial?.avatarInitials || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              testimonial: {
                                quote: formData.testimonial?.quote || "",
                                author: formData.testimonial?.author || "",
                                role: formData.testimonial?.role || "",
                                avatarInitials: e.target.value.toUpperCase(),
                              },
                            })
                          }
                          placeholder="ER"
                          className="w-full px-3 py-1.5 rounded-lg bg-surface-container border border-white/10 text-xs text-primary font-bold text-center focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Status & Featured Controls */}
              <div className="pt-2 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs font-heading font-semibold text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded accent-primary"
                    />
                    <span>Feature this Case Study</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-heading text-on-surface-variant">Publication:</span>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-white/10 text-xs font-heading font-bold text-white focus:outline-none focus:border-primary"
                    >
                      <option value="published">Published (Live)</option>
                      <option value="draft">Draft (Private)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className="px-4 py-2.5 rounded-xl bg-surface-container-high border border-white/10 text-xs font-heading font-semibold text-on-surface hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-kinetic inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? "Saving..." : editingId ? "Update Case Study" : "Publish Case Study"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Live Preview Column (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary" />
                <span className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  Live Card Preview
                </span>
              </div>
              <span className="text-[10px] font-mono text-on-surface-variant">
                Renders exactly as public
              </span>
            </div>

            {/* Rendered Live Card */}
            <div className="rounded-3xl bg-surface-container-low/90 backdrop-blur-2xl border border-primary/30 p-6 sm:p-7 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-heading text-xs uppercase font-bold tracking-wider border border-primary/20">
                    {formData.tag || "CASE STUDY TAG"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {formData.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-heading font-bold uppercase tracking-wider border border-amber-500/30 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" /> Featured
                      </span>
                    )}
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-heading font-bold uppercase tracking-wider border",
                        formData.status === "published"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      )}
                    >
                      {formData.status}
                    </span>
                  </div>
                </div>

                {/* Client & Industry */}
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-white leading-tight">
                    {formData.client || "Client Name"}
                  </h3>
                  <p className="text-xs text-primary font-heading font-semibold mt-0.5">
                    {formData.industry || formData.categoryLabel || "Industry Sector"}
                  </p>
                </div>

                {/* Problem Statement */}
                <div className="space-y-1">
                  <span className="text-[10px] font-heading uppercase tracking-wider text-on-surface-variant font-bold">
                    Problem
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {formData.problem || "Describe the client challenge..."}
                  </p>
                </div>

                {/* Solution Statement */}
                <div className="space-y-1">
                  <span className="text-[10px] font-heading uppercase tracking-wider text-primary font-bold">
                    Architected Solution
                  </span>
                  <p className="text-xs text-on-surface leading-relaxed">
                    {formData.solution || "Describe the engineered architecture..."}
                  </p>
                </div>

                {/* Results Metrics */}
                {formData.results.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                    {formData.results.map((r, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-surface-container/70 border border-white/5 flex flex-col text-center shadow-sm">
                        <span className="font-heading font-black text-base text-primary">
                          {r.metric || "—"}
                        </span>
                        <span className="text-[9px] text-on-surface-variant leading-tight mt-0.5">
                          {r.label || "Metric Label"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technology chips */}
                {formData.technology.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {formData.technology.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-surface-container-high text-[10px] font-mono text-secondary-fixed border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Testimonial Quote */}
                {hasTestimonial && formData.testimonial?.quote && (
                  <div className="p-3.5 rounded-xl bg-surface-container-lowest/80 border border-white/5 space-y-2 mt-2">
                    <p className="text-xs text-on-surface italic leading-relaxed">
                      &ldquo;{formData.testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary font-heading font-bold text-[10px] flex items-center justify-center">
                        {formData.testimonial.avatarInitials || "CX"}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-heading font-bold text-[11px] text-white">
                          {formData.testimonial.author}
                        </span>
                        <span className="text-[10px] text-on-surface-variant">
                          {formData.testimonial.role}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardCaseStudiesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-on-surface-variant font-mono text-xs">Loading Case Studies Manager...</div>}>
      <CaseStudiesManager />
    </Suspense>
  );
}

