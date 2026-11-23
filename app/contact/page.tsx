"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Mail,
  Send,
  CheckCircle2,
  ShieldCheck,
  Clock,
  MapPin,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Cpu,
  Lock,
  PhoneCall,
  HelpCircle,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/CTASection";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    track: "ai-consulting",
    budget: "$25k-$75k",
    timeline: "immediate",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  const tracks = [
    { id: "ai-consulting", label: "AI Consulting" },
    { id: "ai-audit", label: "AI Audit" },
    { id: "ai-automation", label: "AI Automation" },
    { id: "ai-os", label: "AI OS" },
    { id: "ai-policy-consulting", label: "AI Policy Consulting" },
    { id: "ai-adoption-in-industry", label: "AI Adoption in Industry" },
    { id: "ai-training", label: "AI Training" },
    { id: "ai-corporate-training", label: "AI Corporate Training" },
  ];

  const budgetTiers = [
    "< $15k Pilot",
    "$15k-$35k Sprint",
    "$35k-$75k Architecture",
    "$75k+ Full Deployment",
  ];

  const faqs = [
    {
      question: "Who will lead our architecture audit session?",
      answer:
        "Every audit is conducted directly by a Principal AI Engineer or System Architect with battle-tested experience deploying frontier LLMs and high-throughput agent swarms in production—never account executives or junior reps.",
    },
    {
      question: "How quickly can you deploy an engineering team to our codebase?",
      answer:
        "Our high-velocity engagement model enables team integration into your GitHub repositories or VPC within 48 to 72 hours following the initial architectural scoping.",
    },
    {
      question: "Do you sign Mutual Non-Disclosure Agreements (NDAs)?",
      answer:
        "Yes. We execute strict bilateral NDAs before any code, telemetry, or proprietary IP is shared. All assessments can be conducted within your isolated VPC or sovereign enclave.",
    },
    {
      question: "What are the core deliverables of an Architecture Audit?",
      answer:
        "You receive a comprehensive System Blueprint, Latency & Token Cost Optimization Matrix, Zero-Hallucination Guardrail Protocol, and an actionable 30-day implementation roadmap.",
    },
  ];

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-background text-on-surface">
      {/* Ambient Radial Backlights */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-primary-container/20 via-tertiary-container/10 to-transparent blur-[140px] rounded-full -z-10" />
      <div className="pointer-events-none absolute top-[800px] -left-40 w-96 h-96 bg-primary-container/10 blur-[130px] rounded-full -z-10" />
      <div className="pointer-events-none absolute top-[1800px] -right-40 w-96 h-96 bg-tertiary-container/10 blur-[150px] rounded-full -z-10" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-12 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-xl border border-primary/30 shadow-kinetic mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="font-heading text-xs text-primary uppercase tracking-widest font-bold">
            DIRECT ACCESS // ARCHITECTURAL ENGAGEMENTS
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl max-w-4xl tracking-tight text-on-surface leading-tight mb-6">
          Initiate Your Enterprise AI &{" "}
          <span className="bg-gradient-to-r from-primary-container via-primary-fixed-dim to-tertiary-container bg-clip-text text-transparent">
            Systems Architecture
          </span>{" "}
          Consulting
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-3xl mb-8 leading-relaxed">
          Connect directly with our principal AI engineers, venture partners, and cohort directors. We design deterministic pipelines, deploy sovereign agent swarms, and accelerate roadmap velocity by 10x.
        </p>

        {/* Quick SLA Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-heading text-on-surface-variant">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/60 border border-white/5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>&lt; 4-Hour Response SLA</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/60 border border-white/5">
            <Lock className="w-3.5 h-3.5 text-primary" />
            <span>NDA-First Confidentiality</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/60 border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>1-on-1 with Staff Architects</span>
          </span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN INTERACTIVE FORM & DIRECT CHANNELS GRID */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <GlassCard className="p-6 sm:p-8 lg:p-10 relative overflow-hidden" variant="elevated">
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-5 h-5 text-primary" />
                  <h2 className="font-heading font-bold text-xl text-white">
                    Book Architecture Consultation
                  </h2>
                </div>
                <span className="font-mono text-xs text-primary font-bold">
                  TRANSMISSION ENCRYPTED
                </span>
              </div>

              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-2xl bg-primary-container/20 border border-primary/40 flex items-center justify-center text-primary shadow-kinetic mb-2">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    Consultation Request Transmitted
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant max-w-md leading-relaxed">
                    Your architecture scope has been dispatched to our engineering desk. A Principal AI Architect will review your requirements and reach out within 4 business hours.
                  </p>
                  <div className="p-4 rounded-xl bg-surface-container-lowest/60 border border-white/10 font-mono text-xs text-on-surface-variant text-left w-full max-w-md mt-4 space-y-1">
                    <div className="flex justify-between">
                      <span>Dispatch ID:</span>
                      <span className="text-primary font-bold">100X-ARCH-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assigned Track:</span>
                      <span className="text-white">{tracks.find(t => t.id === formData.track)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response SLA:</span>
                      <span className="text-emerald-400 font-bold">&lt; 4 Hours</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-xs text-primary font-heading font-bold hover:underline"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                        Your Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Satya Nadella"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                        Work Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="satya@microsoft.com"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Company & Role Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                        Organization / Startup
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company or Venture Name"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                        Your Role / Title
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="CTO, Founder, VP Engineering"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Engagement Track Selection */}
                  <div>
                    <label className="block font-heading text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                      Primary Consultation Focus
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {tracks.map((track) => (
                        <button
                          key={track.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, track: track.id })}
                          className={cn(
                            "px-4 py-2.5 rounded-xl text-left font-heading text-xs font-semibold transition-all border",
                            formData.track === track.id
                              ? "bg-primary-container text-white border-primary shadow-kinetic"
                              : "bg-surface-container-lowest/60 text-on-surface-variant border-white/5 hover:border-white/20 hover:text-white"
                          )}
                        >
                          {track.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Tier */}
                  <div>
                    <label className="block font-heading text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                      Anticipated Scope / Budget Tier
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetTiers.map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: tier })}
                          className={cn(
                            "px-3 py-2 rounded-xl text-center font-mono text-[11px] font-semibold transition-all border",
                            formData.budget === tier
                              ? "bg-primary-container/20 text-primary border-primary/50 shadow-sm"
                              : "bg-surface-container-lowest/60 text-on-surface-variant border-white/5 hover:border-white/20 hover:text-white"
                          )}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Technical Message / Architecture Scope */}
                  <div>
                    <label className="block font-heading text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                      Architecture Scope & Bottlenecks
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your current tech stack, LLM workflows, latency bottlenecks, or what you want to engineer..."
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans leading-relaxed resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="kinetic"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="w-full py-4 text-sm"
                  >
                    Transmit Inquiry & Book Architecture Audit
                  </Button>

                  <p className="text-[11px] text-center text-on-surface-variant font-sans">
                    Guaranteed NDA execution before review. Zero data retention on unverified endpoints.
                  </p>
                </form>
              )}
            </GlassCard>
          </div>

          {/* Right Column: Direct Engineering Channels & Trust Dock */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Direct Contact Nodes */}
            <GlassCard className="p-6 lg:p-8 flex flex-col gap-6">
              <div>
                <span className="font-heading text-xs text-primary uppercase font-bold tracking-wider">
                  Direct Ingestion Channels
                </span>
                <h3 className="font-heading font-bold text-xl text-white mt-1">
                  Connect with Our Desks
                </h3>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:consulting@100xminds.ai"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-surface-container-lowest/60 hover:bg-surface-container-high/60 border border-white/5 hover:border-primary/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary-container group-hover:text-white transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-semibold text-xs text-on-surface group-hover:text-primary transition-colors">
                      Enterprise & Audits
                    </span>
                    <span className="font-mono text-xs text-on-surface-variant">
                      consulting@100xminds.ai
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:admissions@100xminds.ai"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-surface-container-lowest/60 hover:bg-surface-container-high/60 border border-white/5 hover:border-primary/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary-container group-hover:text-white transition-all">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-semibold text-xs text-on-surface group-hover:text-primary transition-colors">
                      Fellowships & Admissions
                    </span>
                    <span className="font-mono text-xs text-on-surface-variant">
                      admissions@100xminds.ai
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:partnerships@100xminds.ai"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-surface-container-lowest/60 hover:bg-surface-container-high/60 border border-white/5 hover:border-primary/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary-container group-hover:text-white transition-all">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-semibold text-xs text-on-surface group-hover:text-primary transition-colors">
                      Venture & Ecosystem
                    </span>
                    <span className="font-mono text-xs text-on-surface-variant">
                      partnerships@100xminds.ai
                    </span>
                  </div>
                </a>
              </div>
            </GlassCard>

            {/* Global Operating Nodes */}
            <GlassCard className="p-6 lg:p-8 flex flex-col gap-4">
              <span className="font-heading text-xs text-primary uppercase font-bold tracking-wider">
                Operating Hubs & Nodes
              </span>
              <div className="space-y-3 pt-1 font-sans text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-lowest/60 border border-white/5">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading font-bold text-white block">
                      Denver(HQ)
                    </span>
                    <span className="text-on-surface-variant text-[11px]">
                      Market Street Tech Hub,
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-lowest/60 border border-white/5">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading font-bold text-white block">
                      Kathmandu
                    </span>
                    <span className="text-on-surface-variant text-[11px]">
                      Tripureshwor Kathmandu
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-lowest/60 border border-white/5">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-heading font-bold text-white block">
                      Birgunj
                    </span>
                    <span className="text-on-surface-variant text-[11px]">
                      Aadarshnagar Birgunj
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 font-heading text-xs text-primary uppercase tracking-widest font-bold mb-2">
            <HelpCircle className="w-4 h-4" />
            Clear Transparency
          </div>
          <h2 className="font-heading font-extrabold text-3xl text-on-surface tracking-tight">
            Consulting & Engagement FAQs
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <GlassCard
                key={index}
                className="p-6 cursor-pointer transition-all"
                onClick={() => setActiveFaq(isOpen ? null : index)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-heading font-bold text-base text-on-surface">
                    {faq.question}
                  </h3>
                  <span className="text-primary font-mono text-lg font-bold shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </div>
                {isOpen && (
                  <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-4 leading-relaxed border-t border-white/10 pt-4 animate-fadeIn">
                    {faq.answer}
                  </p>
                )}
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FINAL CALL TO ACTION */}
      {/* ========================================================================= */}
      <CTASection
        title="Ready to Build Your Exponential Advantage?"
        subtitle="Join forward-thinking enterprise leaders and top tier builders engineering the frontier of intelligent software."
        badgeText="Immediate Consultation Dispatch"
      />
    </div>
  );
}
