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
  Send,
} from "lucide-react";
import { servicesData, enterpriseAlliances } from "@/data/services";
import { caseStudiesData } from "@/data/caseStudies";
import { ServiceCard } from "@/components/ServiceCard";
import { Timeline } from "@/components/Timeline";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/CTASection";

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    practice: "ai-consulting",
    scope: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-background text-on-surface">
      {/* Ambient Top Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-primary-container/20 via-tertiary-container/10 to-transparent blur-[140px] rounded-full -z-10" />
      <div className="pointer-events-none absolute top-96 -left-32 w-96 h-96 bg-primary-container/10 blur-[130px] rounded-full -z-10" />
      <div className="pointer-events-none absolute top-[1400px] -right-32 w-96 h-96 bg-primary-container/10 blur-[140px] rounded-full -z-10" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-14 pb-16 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-xl border border-primary/30 shadow-kinetic mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="font-heading text-xs text-primary uppercase tracking-widest font-bold">
            ENTERPRISE & VENTURE SOLUTIONS | RAPID EXECUTION
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl max-w-5xl tracking-tight text-on-surface leading-tight mb-6">
          High-Velocity AI &{" "}
          <span className="bg-gradient-to-r from-primary-container via-primary-fixed-dim to-tertiary-container bg-clip-text text-transparent">
            Systems Engineering Services
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-3xl mb-10 leading-relaxed">
          From custom autonomous agent architecture to full-stack AI transformation and venture advisory. We deploy battle-tested tier-1 builders and proprietary tooling to accelerate your roadmap by 10x.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16" id="audit">
          <Button
            href="#audit-form"
            variant="kinetic"
            size="lg"
            icon={<Terminal className="w-4 h-4" />}
          >
            Book Architecture Audit
          </Button>
          <Button
            href="/casestudy"
            variant="glass"
            size="lg"
            icon={<ArrowRight className="w-4 h-4 text-primary" />}
          >
            Explore Case Studies
          </Button>
        </div>

        {/* Key Stats Bar */}
        <div className="w-full max-w-5xl rounded-2xl bg-surface-container-low/70 backdrop-blur-2xl p-4 border border-white/10 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container/70 border border-white/5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20 shadow-sm">
                <span className="material-symbols-outlined text-xl">speed</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl text-white">
                  48h
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                  Deployment Time
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container/70 border border-white/5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20 shadow-sm">
                <span className="material-symbols-outlined text-xl">verified_user</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl text-white">
                  100%
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                  Sovereign Codebase
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container/70 border border-white/5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20 shadow-sm">
                <span className="material-symbols-outlined text-xl">trending_up</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl text-white">
                  $48M+
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                  Venture Value Created
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container/70 border border-white/5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20 shadow-sm">
                <span className="material-symbols-outlined text-xl">sync_saved_locally</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl text-white">
                  99.98%
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                  Telemetry Uptime
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CORE SPECIALIZED PRACTICES */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full" id="services">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-heading text-xs uppercase tracking-wider font-bold mb-2">
              <span className="material-symbols-outlined text-sm">hub</span>
              <span>High-Leverage Engagements</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-on-surface">
              Core Specialized Engineering Practices
            </h2>
          </div>
          <p className="font-sans text-sm text-on-surface-variant max-w-md leading-relaxed">
            Precision, mission-critical systems engineering. We embed senior staff-level AI engineers directly into your sprint cycle to build, scale, and harden production software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((practice) => (
            <ServiceCard key={practice.id} practice={practice} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FOUR PHASE SPRINT PROCESS TIMELINE */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl bg-surface-container-low/70 backdrop-blur-2xl p-8 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-heading text-xs uppercase tracking-wider mb-3 border border-primary/20 font-bold">
              <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
              <span>Battle-Tested Execution Method</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-on-surface">
              How We Work: Four Phase Sprint Cycle
            </h2>
            <p className="font-sans text-sm text-on-surface-variant mt-2 leading-relaxed">
              We reject multi-month discovery slowness. We operate with extreme founder urgency, deploying functional prototypes in days and hardened production systems in weeks.
            </p>
          </div>

          <Timeline />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ENTERPRISE TECH STACK ALLIANCE */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-heading text-xs text-primary uppercase tracking-widest font-bold">
            Hardened Engineering Stacks
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-on-surface mt-1">
            Tier-1 Alliance & Infrastructure
          </h2>
          <p className="font-sans text-sm text-on-surface-variant mt-2">
            We build with zero vendor lock-in, integrating enterprise-grade models, orchestration platforms, and modern cloud primitives.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {enterpriseAlliances.map((partner) => (
            <GlassCard
              key={partner.name}
              className="h-20 flex flex-col items-center justify-center p-2 text-center"
            >
              <span className="font-heading font-bold text-sm text-white">
                {partner.name}
              </span>
              <span className="font-mono text-[9px] text-on-surface-variant mt-0.5">
                {partner.category}
              </span>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CASE STUDIES */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full" id="case-studies">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-heading text-xs uppercase tracking-wider font-bold mb-2">
              <span className="material-symbols-outlined text-sm">query_stats</span>
              <span>Verified Client Impact</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-on-surface">
              Case Studies with Measurable Leverage
            </h2>
          </div>
          <p className="font-sans text-sm text-on-surface-variant max-w-md">
            Real telemetry, production load metrics, and valuation jumps recorded by enterprises and startups accelerated by 100x MINDS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudiesData.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. AUDIT BOOKING FORM */}
      {/* ========================================================================= */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-4xl mx-auto w-full" id="audit-form">
        <div className="rounded-3xl bg-surface-container-low/70 backdrop-blur-2xl p-8 sm:p-12 border border-white/10 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="font-heading text-xs text-primary uppercase tracking-widest font-bold">
              Engineering Diagnostic
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-on-surface mt-1">
              Book a 48-Hour Architecture Audit
            </h2>
            <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-2">
              Receive a comprehensive telemetry scan of your LLM pipelines, latency bottlenecks, and fixed-scope delivery blueprint.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-surface-container/80 border border-primary/30 text-center flex flex-col items-center gap-3 shadow-md">
              <CheckCircle2 className="w-10 h-10 text-primary" />
              <h3 className="font-heading font-bold text-xl text-white">
                Audit Request Received
              </h3>
              <p className="font-sans text-xs text-on-surface-variant max-w-md">
                Our principal AI architects will review your project scope and schedule a 30-minute technical diagnostic session within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Chen"
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="HyperScale Labs (Series A)"
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                    Primary Area of Focus
                  </label>
                  <select
                    value={formData.practice}
                    onChange={(e) => setFormData({ ...formData, practice: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white focus:outline-none focus:border-primary shadow-sm"
                  >
                    <option value="ai-consulting">AI Consulting</option>
                    <option value="ai-audit">AI Audit</option>
                    <option value="ai-automation">AI Automation</option>
                    <option value="ai-os">AI OS</option>
                    <option value="ai-policy-consulting">AI Policy Consulting</option>
                    <option value="ai-adoption-in-industry">AI Adoption in Industry</option>
                    <option value="ai-training">AI Training</option>
                    <option value="agentic-gtm">Agentic GTM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-on-surface mb-1">
                  Brief Technical Objective or Current Blocker
                </label>
                <textarea
                  rows={3}
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  placeholder="Describe your current LLM stack, latency requirements, or architecture challenge..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary shadow-sm"
                />
              </div>

              <Button
                type="submit"
                variant="kinetic"
                size="lg"
                icon={<Send className="w-4 h-4" />}
                className="w-full mt-2"
              >
                Submit Audit Request
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Scale Your AI Architecture with 100x Precision"
        subtitle="We partner with high-conviction founders and enterprise engineering leaders."
      />
    </div>
  );
}
