"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Bolt,
  CheckCircle2,
  TrendingUp,
  Award,
  ShieldCheck,
  Terminal,
  Layers,
  School,
  Rocket,
  RefreshCw,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/CTASection";
import { testimonialsData } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-background text-on-surface">
      {/* Ambient Radiant Backlights */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[840px] h-[480px] bg-primary-container/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[1600px] -right-40 w-[600px] h-[600px] bg-tertiary-container/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-[3200px] -left-40 w-[640px] h-[640px] bg-primary-container/8 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-xl border border-primary/30 shadow-[0_0_24px_rgba(255,107,0,0.15)] mb-8 cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_10px_#ff6b00]" />
          </span>
          <span className="font-heading text-xs tracking-widest text-primary font-bold uppercase">
            The Exponential Learning Ecosystem | Learn • Grow • Transform
          </span>
        </div>

        {/* Massive Dynamic Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-7xl max-w-5xl tracking-tight leading-[1.08] mb-6">
          Unlock Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container via-tertiary to-secondary-fixed">
            100x Potential
          </span>{" "}
          with Next-Gen Intelligence & Growth
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed mb-10">
          Learn high-leverage skills, build real products, leverage AI, and accelerate your career with a next-generation ecosystem engineered for exponential growth.
        </p>

        {/* Dual CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
          <Button
            href="/services"
            variant="kinetic"
            size="xl"
            icon={<ArrowRight className="w-5 h-5" />}
            className="w-full sm:w-auto"
          >
            Explore Services
          </Button>
          <Button
            href="/casestudy"
            variant="glass"
            size="xl"
            icon={<Sparkles className="w-5 h-5 text-primary" />}
            className="w-full sm:w-auto"
          >
            View Case Studies
          </Button>
        </div>

        {/* Interactive Glassmorphic Stats Dock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl p-2 rounded-2xl bg-surface-container-low/60 backdrop-blur-2xl border border-white/10 shadow-2xl mb-16">
          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container/70 border border-white/5 hover:border-primary/30 transition-all shadow-sm">
            <div className="flex flex-col text-left">
              <span className="font-heading font-black text-3xl text-white tracking-tight">
                50K+
              </span>
              <span className="font-sans text-xs text-on-surface-variant">
                Active Global Minds
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-heading text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +34%
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container/70 border border-white/5 hover:border-primary/30 transition-all shadow-sm">
            <div className="flex flex-col text-left">
              <span className="font-heading font-black text-3xl text-white tracking-tight">
                120+
              </span>
              <span className="font-sans text-xs text-on-surface-variant">
                Exponential Cohorts
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-heading text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Live
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container/70 border border-white/5 hover:border-primary/30 transition-all shadow-sm">
            <div className="flex flex-col text-left">
              <span className="font-heading font-black text-3xl text-white tracking-tight">
                98.4%
              </span>
              <span className="font-sans text-xs text-on-surface-variant">
                Career Leap Rate
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-heading text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3" /> Top Tier
            </span>
          </div>
        </div>

        {/* Live Telemetry & Command Center Preview UI */}
        <div className="w-full max-w-6xl rounded-3xl bg-surface-container-low/80 backdrop-blur-2xl p-6 lg:p-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group text-left">
          {/* Top terminal bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                100x OS // Neural Accelerator Core v4.2
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="font-bold">REAL-TIME COGNITIVE SYNC</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sub-card: Prompt & Model Runner */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-surface-container/80 border border-white/10 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading text-xs text-primary uppercase font-bold tracking-wider">
                    Skill Sprint Engine
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant">
                    Active Matrix
                  </span>
                </div>
                <h4 className="font-heading font-bold text-lg text-white mb-1">
                  Autonomous Agent Workflows
                </h4>
                <p className="font-sans text-xs text-on-surface-variant mb-4 leading-relaxed">
                  Real-time simulation of multi-model orchestration, vector embeddings, and autonomous task dispatchers.
                </p>
                {/* Code Snippet */}
                <div className="rounded-xl bg-surface-container-lowest p-4 font-mono text-xs text-slate-300 space-y-1 border border-white/10 shadow-inner">
                  <p><span className="text-primary">&gt;</span> const agent = new AutonomousSwarm(&#123;</p>
                  <p className="pl-4">engine: <span className="text-orange-300">&quot;100x-neural-v4&quot;</span>,</p>
                  <p className="pl-4">mode: <span className="text-amber-300">&quot;hyper_velocity&quot;</span>,</p>
                  <p className="pl-4">tools: [<span className="text-primary">&quot;mcp_retriever&quot;</span>, <span className="text-primary">&quot;code_sandbox&quot;</span>]</p>
                  <p>&#125;);</p>
                  <p className="text-primary font-bold pt-1">&gt; 100x Velocity Index: 99.8% (Maximum Efficacy)</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-xs">
                <span className="text-on-surface-variant">Benchmark Speed</span>
                <span className="text-white font-bold">1,840 tps / 12ms Latency</span>
              </div>
            </div>

            {/* Center Sub-card: Live Skill Radar / Analytics */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-surface-container/80 border border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading text-xs text-primary uppercase font-bold tracking-wider">
                    Velocity Growth Vector
                  </span>
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white mb-1">
                  Cohort 42 Trajectory
                </h4>
                <p className="font-sans text-xs text-on-surface-variant mb-4 leading-relaxed">
                  Mean student career output after 4 weeks of intensive builds.
                </p>
                {/* SVG Vector Skill Chart */}
                <div className="w-full h-36 flex items-end justify-between gap-3 px-3 pb-3 bg-surface-container-lowest/50 rounded-xl border border-white/5">
                  <div className="w-full flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full bg-primary/25 rounded-t h-[35%]" />
                    <span className="font-mono text-[10px] text-on-surface-variant">W1</span>
                  </div>
                  <div className="w-full flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full bg-primary/45 rounded-t h-[52%]" />
                    <span className="font-mono text-[10px] text-on-surface-variant">W2</span>
                  </div>
                  <div className="w-full flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full bg-primary/70 rounded-t h-[78%]" />
                    <span className="font-mono text-[10px] text-on-surface-variant">W3</span>
                  </div>
                  <div className="w-full flex flex-col items-center gap-1.5 h-full justify-end">
                    <div className="w-full bg-primary rounded-t h-[96%] shadow-sm" />
                    <span className="font-mono text-[10px] text-primary font-bold">W4</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-xs">
                <span className="text-on-surface-variant">Compounded Growth</span>
                <span className="text-primary font-bold">+284% Capability Shift</span>
              </div>
            </div>

            {/* Right Sub-card: Verified Mind Passport */}
            <div className="lg:col-span-3 p-5 rounded-2xl bg-surface-container/80 border border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading text-xs text-primary uppercase font-bold tracking-wider">
                    Credential Token
                  </span>
                  <ShieldCheck className="w-4 h-4 text-primary" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-base text-white">
                  100x AI Architect
                </h4>
                <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Cryptographically signed verification issued to high-impact cohort graduates.
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-gradient-to-r from-primary to-orange-500 w-[88%] rounded-full" />
                </div>
                <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant">
                  <span>Sprint Completion</span>
                  <span className="text-white font-bold">88 / 100 XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE TRI-PILLAR ARCHITECTURE */}
      {/* ========================================================================= */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-heading text-xs text-primary uppercase tracking-widest font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              The Tri-Pillar Architecture
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-on-surface">
              Engineered for Exponential Transformation
            </h2>
          </div>
          <p className="font-sans text-sm text-on-surface-variant max-w-md leading-relaxed">
            Traditional academies teach static theories. We build hyper-focused feedback loops directly connected to real-world capital and technology frontiers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pillar 01: LEARN */}
          <GlassCard className="p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-heading font-black text-4xl text-primary/30 group-hover:text-primary transition-colors">
                  01
                </span>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high/80 flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white transition-all">
                  <School className="w-6 h-6" />
                </div>
              </div>
              <span className="font-heading text-xs uppercase tracking-wider text-primary font-bold mb-1 block">
                Acquisition Engine
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                LEARN
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6">
                Hyper-accelerated curriculums in cutting-edge AI engineering, generative workflows, autonomous agent orchestration, product strategy, and modern venture creation.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-heading font-semibold">
              <span className="text-on-surface-variant">Core Protocol</span>
              <Link href="/services" className="text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Adaptive Syllabi <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </GlassCard>

          {/* Pillar 02: GROW */}
          <GlassCard className="p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-heading font-black text-4xl text-primary/30 group-hover:text-primary transition-colors">
                  02
                </span>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high/80 flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white transition-all shadow-sm">
                  <Rocket className="w-6 h-6" />
                </div>
              </div>
              <span className="font-heading text-xs uppercase tracking-wider text-primary font-bold mb-1 block">
                Validation Matrix
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                GROW
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6">
                High-cadence 1-on-1 mentorship, live sandbox code environments, elite peer mastermind circles, and exponential sprint cycles that pressure-test your real skills.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-heading font-semibold">
              <span className="text-on-surface-variant">Execution Ring</span>
              <Link href="/services" className="text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Live Cohort Sprints <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </GlassCard>

          {/* Pillar 03: TRANSFORM */}
          <GlassCard className="p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-heading font-black text-4xl text-primary/30 group-hover:text-primary transition-colors">
                  03
                </span>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high/80 flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white transition-all shadow-sm">
                  <RefreshCw className="w-6 h-6" />
                </div>
              </div>
              <span className="font-heading text-xs uppercase tracking-wider text-primary font-bold mb-1 block">
                Venture Outcome
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                TRANSFORM
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6">
                Direct high-tier talent placement in venture-backed AI startups, enterprise consulting engagements, and acceleration for building your proprietary software tools.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-heading font-semibold">
              <span className="text-on-surface-variant">Verified Impact</span>
              <Link href="/casestudy" className="text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Client Case Studies <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. DYNAMIC TESTIMONIALS & COHORT TRANSFORMATIONS */}
      {/* ========================================================================= */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-heading text-xs text-primary uppercase tracking-widest font-bold mb-2">
              <Star className="w-4 h-4 text-primary" />
              Verified Outcomes
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight">
              Real Builders. 100x Transformations.
            </h2>
          </div>
          <p className="font-sans text-sm text-on-surface-variant max-w-md leading-relaxed">
            Explore how engineers, designers, and operators shattered standard career timelines and launched industry-defining ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.slice(0, 3).map((item) => (
            <GlassCard key={item.id} className="p-8 flex flex-col justify-between group">
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-primary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-sans text-sm text-on-surface leading-relaxed mb-6 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-heading font-bold text-primary">
                  {item.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-sm text-on-surface">
                    {item.author}
                  </span>
                  <span className="font-sans text-xs text-primary font-semibold">
                    {item.role} @ {item.company}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HIGH-CONVERSION FINAL CTA */}
      {/* ========================================================================= */}
      <CTASection />
    </div>
  );
}