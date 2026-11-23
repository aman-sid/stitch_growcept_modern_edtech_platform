"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Star,
  Quote,
  ExternalLink,
  ArrowUpRight,
  Server,
  Activity,
  Lock,
} from "lucide-react";
import { caseStudiesData, CaseStudy } from "@/data/caseStudies";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/CTASection";
import { cn } from "@/lib/utils";

export default function CaseStudyPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredStudies =
    activeCategory === "all"
      ? caseStudiesData
      : caseStudiesData.filter((cs) => cs.category === activeCategory);

  const categories = [
    { id: "all", label: "All Case Studies" },
    { id: "fintech", label: "Fintech & Swarms" },
    { id: "edge", label: "Edge & Vision" },
    { id: "rag", label: "Citation RAG" },
    { id: "devtools", label: "DevTools & Infra" },
    { id: "swarms", label: "GTM & Automation" },
  ];

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-background text-on-surface">
      {/* Ambient Top Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-primary-container/20 via-tertiary-container/10 to-transparent blur-[140px] rounded-full -z-10" />
      <div className="pointer-events-none absolute top-[900px] -right-40 w-96 h-96 bg-primary-container/10 blur-[140px] rounded-full -z-10" />
      <div className="pointer-events-none absolute top-[2400px] -left-40 w-96 h-96 bg-tertiary-container/10 blur-[150px] rounded-full -z-10" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-16 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-xl border border-primary/30 shadow-kinetic mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="font-heading text-xs text-primary uppercase tracking-widest font-bold">
            PROVEN IMPACT & ARCHITECTURAL BREAKTHROUGHS
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl max-w-5xl tracking-tight text-on-surface leading-tight mb-6">
          Deterministic AI Systems Engineered for{" "}
          <span className="bg-gradient-to-r from-primary-container via-primary-fixed-dim to-tertiary-container bg-clip-text text-transparent">
            Measurable Scale
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-3xl mb-10 leading-relaxed">
          Explore how enterprise leaders and venture-backed startups leverage our autonomous agent swarms, sub-50ms inference pipelines, and zero-hallucination RAG architectures to compress years into weeks.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Button
            href="/contact"
            variant="kinetic"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Request Architecture Audit
          </Button>
          <Button
            href="/programs"
            variant="glass"
            size="lg"
            icon={<Terminal className="w-4 h-4 text-primary" />}
          >
            Explore Builder Programs
          </Button>
        </div>

        {/* Aggregate Impact Telemetry Bar */}
        <div className="w-full max-w-5xl rounded-3xl bg-surface-container-low/70 backdrop-blur-2xl p-6 lg:p-8 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="flex flex-col p-4 rounded-2xl bg-surface-container/70 border border-white/5 shadow-sm">
              <span className="font-heading font-black text-3xl sm:text-4xl text-primary">
                92%
              </span>
              <span className="font-heading font-bold text-xs text-on-surface mt-1">
                Latency Reduction
              </span>
              <span className="font-sans text-[11px] text-on-surface-variant mt-0.5">
                Multi-agent compliance queues
              </span>
            </div>

            <div className="flex flex-col p-4 rounded-2xl bg-surface-container/70 border border-white/5 shadow-sm">
              <span className="font-heading font-black text-3xl sm:text-4xl text-primary">
                18x
              </span>
              <span className="font-heading font-bold text-xs text-on-surface mt-1">
                Throughput Speedup
              </span>
              <span className="font-sans text-[11px] text-on-surface-variant mt-0.5">
                Vision & logistics ingestion
              </span>
            </div>

            <div className="flex flex-col p-4 rounded-2xl bg-surface-container/70 border border-white/5 shadow-sm">
              <span className="font-heading font-black text-3xl sm:text-4xl text-primary">
                99.8%
              </span>
              <span className="font-heading font-bold text-xs text-on-surface mt-1">
                Citation Precision
              </span>
              <span className="font-sans text-[11px] text-on-surface-variant mt-0.5">
                Zero-hallucination protocols
              </span>
            </div>

            <div className="flex flex-col p-4 rounded-2xl bg-surface-container/70 border border-white/5 shadow-sm">
              <span className="font-heading font-black text-3xl sm:text-4xl text-primary">
                100%
              </span>
              <span className="font-heading font-bold text-xs text-on-surface mt-1">
                Audit Traceability
              </span>
              <span className="font-sans text-[11px] text-on-surface-variant mt-0.5">
                Cryptographically anchored logs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CASE STUDY MATRIX & FILTERS */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full">
        {/* Filter Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
              Enterprise Case Studies
            </h2>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-1">
              Production architectures deployed across fintech, biotech, edge networks, and scale-ups.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-surface-container-low border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl font-heading text-xs font-bold transition-all",
                  activeCategory === cat.id
                    ? "bg-primary-container text-white shadow-kinetic"
                    : "text-on-surface-variant hover:text-white hover:bg-surface-container-high"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => (
            <GlassCard
              key={study.id}
              className="p-6 lg:p-8 flex flex-col justify-between group h-full relative"
            >
              <div>
                {/* Header Tag & Industry */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading text-[10px] font-bold px-3 py-1 rounded-full bg-primary-container text-white uppercase tracking-wider shadow-kinetic">
                    {study.tag}
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">
                    {study.industry}
                  </span>
                </div>

                {/* Client Title */}
                <h3 className="font-heading font-bold text-xl text-on-surface mb-3 leading-snug group-hover:text-primary transition-colors">
                  {study.client}
                </h3>

                {/* Problem Box */}
                <div className="mb-4 p-3.5 rounded-xl bg-red-950/20 border border-red-500/20">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-red-400 block mb-1">
                    The Challenge
                  </span>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    {study.problem}
                  </p>
                </div>

                {/* Solution Box */}
                <div className="mb-5 p-3.5 rounded-xl bg-surface-container-lowest/60 border border-white/5">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary block mb-1">
                    Engineered Solution
                  </span>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    {study.solution}
                  </p>
                </div>

                {/* Measurable Results Grid */}
                <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-surface-container-lowest/60 border border-white/5 mb-5">
                  {study.results.map((res, i) => (
                    <div key={i} className="flex flex-col text-center">
                      <span className="font-heading font-black text-lg text-primary">
                        {res.metric}
                      </span>
                      <span className="font-sans text-[10px] text-on-surface-variant leading-tight mt-0.5">
                        {res.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Implementation Notes */}
                <div className="mb-5">
                  <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-on-surface block mb-1.5">
                    Architecture Highlights
                  </span>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    {study.implementation}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {study.technology.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-surface-container-high/60 text-[10px] font-mono text-on-surface-variant border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Testimonial Quote */}
              {study.testimonial && (
                <div className="pt-4 border-t border-white/5 flex items-start gap-3 mt-auto">
                  <div className="w-9 h-9 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-heading font-bold text-xs shrink-0 ring-1 ring-primary/30">
                    {study.testimonial.avatarInitials}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-sans text-xs text-on-surface italic leading-relaxed">
                      &ldquo;{study.testimonial.quote}&rdquo;
                    </p>
                    <span className="font-heading text-[11px] text-primary font-bold mt-1">
                      {study.testimonial.author} • {study.testimonial.role}
                    </span>
                  </div>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 100x ENGINEERING BLUEPRINT */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl bg-surface-container-low/70 backdrop-blur-2xl p-8 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 font-heading text-xs text-primary uppercase tracking-widest font-bold mb-2">
              <Cpu className="w-4 h-4" />
              Standard Protocol
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight">
              The 100x Architecture Pipeline
            </h2>
            <p className="font-sans text-sm text-on-surface-variant mt-2 leading-relaxed">
              Every system we construct adheres to our deterministic 4-stage engineering blueprint to guarantee enterprise-grade security, high availability, and measurable ROI.
            </p>
          </div>

          {/* 4-Stage Architecture Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface-container/70 border border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-primary font-bold">STAGE 01</span>
                <h4 className="font-heading font-bold text-lg text-on-surface mt-2 mb-2">
                  Streaming Ingestion
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Real-time event streaming and multi-modal token normalization with localized edge fallback and deduplication caches.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-primary font-semibold">
                sub-20ms P99 Latency
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container/70 border border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-primary font-bold">STAGE 02</span>
                <h4 className="font-heading font-bold text-lg text-on-surface mt-2 mb-2">
                  Semantic Query Routing
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Hybrid dense-sparse vector RAG with dynamic reranking, contextual compression, and hierarchical intent routing.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-primary font-semibold">
                99.8% Precision Target
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container/70 border border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-primary font-bold">STAGE 03</span>
                <h4 className="font-heading font-bold text-lg text-on-surface mt-2 mb-2">
                  Deterministic Swarms
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  LangGraph-governed state machines with isolated tool sandboxes, rate-limited RPC dispatchers, and state checkpointing.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-primary font-semibold">
                Zero Deadlock Architecture
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container/70 border border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-primary font-bold">STAGE 04</span>
                <h4 className="font-heading font-bold text-lg text-on-surface mt-2 mb-2">
                  Audit Gateways & VPC
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Cryptographically verified audit trails, automated human-in-the-loop oversight gates, and SOC2/HIPAA compliant isolation.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-primary font-semibold">
                100% Audit Compliance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CONVERSION CALL TO ACTION */}
      {/* ========================================================================= */}
      <CTASection
        title="Ready to Build Your Enterprise AI Breakthrough?"
        subtitle="Schedule an architecture audit with our principal AI engineers to review your infrastructure, bottlenecks, and custom agent deployment roadmap."
        badgeText="Engineering Consultations Available"
      />
    </div>
  );
}
