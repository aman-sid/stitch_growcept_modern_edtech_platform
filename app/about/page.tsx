import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Bolt,
  Rocket,
  Brain,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Cpu,
  Globe,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/CTASection";

export const metadata = {
  title: "About 100x MINDS — Our Manifesto & Founding Vision",
  description:
    "We Believe Human Potential Multiplies with the Right Leverage. Discover how 100x MINDS empowers builders with sovereign AI tools and exponential feedback loops.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-background text-on-surface">
      {/* Ambient Luminous Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-4 w-96 h-96 bg-tertiary-container/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* SECTION 1: HERO MANIFESTO */}
      {/* ========================================================================= */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-xl border border-primary/30 shadow-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-heading text-xs text-primary tracking-widest uppercase font-bold">
            OUR MANIFESTO & MISSION
          </span>
        </div>

        {/* Main Scale-Driven Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight max-w-4xl mx-auto leading-tight">
          We Believe Human Potential Multiplies with the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container via-tertiary to-secondary-fixed">
            Right Leverage
          </span>
        </h1>

        {/* Philosophical Subtitle */}
        <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-3xl mx-auto mt-6 leading-relaxed">
          Founded on the principle that the next generation of engineers, founders, and leaders will not come from traditional universities, but from high-velocity, software-augmented learning networks.
        </p>

        {/* Ethos Badge */}
        <div className="mt-8 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-surface-container-low/80 backdrop-blur-lg border border-white/10 shadow-sm">
          <Bolt className="w-4 h-4 text-primary" />
          <span className="font-heading font-bold text-xs text-on-surface uppercase tracking-widest">
            LEARN • GROW • TRANSFORM
          </span>
        </div>

        {/* Interactive Micro Metric Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-16 pt-6">
          <GlassCard className="p-6 flex flex-col items-center text-center">
            <span className="font-heading text-xs text-on-surface-variant uppercase tracking-wider">
              Time-to-Production
            </span>
            <span className="font-heading font-black text-2xl lg:text-3xl text-primary mt-1">
              14 Days
            </span>
            <span className="font-sans text-xs text-secondary-fixed mt-1">
              Zero mock labs
            </span>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col items-center text-center">
            <span className="font-heading text-xs text-on-surface-variant uppercase tracking-wider">
              AI Tool Density
            </span>
            <span className="font-heading font-black text-2xl lg:text-3xl text-on-surface mt-1">
              12x Human Speed
            </span>
            <span className="font-sans text-xs text-secondary-fixed mt-1">
              Multi-agent copilots
            </span>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col items-center text-center">
            <span className="font-heading text-xs text-on-surface-variant uppercase tracking-wider">
              Global Reach
            </span>
            <span className="font-heading font-black text-2xl lg:text-3xl text-primary mt-1">
              68 Nations
            </span>
            <span className="font-sans text-xs text-secondary-fixed mt-1">
              Active builder nodes
            </span>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col items-center text-center">
            <span className="font-heading text-xs text-on-surface-variant uppercase tracking-wider">
              Alumni Capital Raised
            </span>
            <span className="font-heading font-black text-2xl lg:text-3xl text-on-surface mt-1">
              $48M+
            </span>
            <span className="font-sans text-xs text-secondary-fixed mt-1">
              Tier-1 VC backed
            </span>
          </GlassCard>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: THE 100x STORY & FOUNDING PRINCIPLES */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-heading text-xs text-primary uppercase tracking-widest font-bold">
              THE THESIS
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight mt-1">
              Why We Engineered 100x MINDS
            </h2>
          </div>
          <p className="font-sans text-sm text-on-surface-variant max-w-lg leading-relaxed">
            The 4-year institutional curriculum is dead upon graduation. Machine intelligence iterates every 72 hours. We rebuilt technological education from the metal up: high-density neural apprenticeships.
          </p>
        </div>

        {/* 4 Core Convictions Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 01 */}
          <GlassCard className="p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading text-xs text-primary font-bold tracking-wider">
                  01 // PRINCIPLE
                </span>
                <span className="material-symbols-outlined text-primary text-2xl">speed</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                Velocity is the Ultimate Moat
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Iterating at 10x cycle velocity creates compounding, unassailable 100x outcomes. In dynamic technological shifts, the competitor who ships, measures, and refactors within hours inevitably dominates the market.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <span className="text-secondary-fixed">FEEDBACK LOOP: &lt; 4 HOURS</span>
              <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="w-full h-full bg-primary-container shadow-[0_0_8px_#ff6b00]" />
              </div>
            </div>
          </GlassCard>

          {/* Card 02 */}
          <GlassCard className="p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading text-xs text-primary font-bold tracking-wider">
                  02 // PRINCIPLE
                </span>
                <span className="material-symbols-outlined text-primary text-2xl">rocket_launch</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                Learn by Shipping in Public
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Zero theoretical homework, zero synthetically graded tests. From day three, learners deploy production code to live servers, face paying customers, and publish code repos exposed to the global developer community.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <span className="text-secondary-fixed">METRIC: LIVE USERS / DAY</span>
              <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-primary-container shadow-[0_0_8px_#ff6b00]" />
              </div>
            </div>
          </GlassCard>

          {/* Card 03 */}
          <GlassCard className="p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading text-xs text-primary font-bold tracking-wider">
                  03 // PRINCIPLE
                </span>
                <span className="material-symbols-outlined text-primary text-2xl">neurology</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                Tool-Augmented Intellect
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                We teach engineering through symbioses: autonomous LLM agent swarms, deterministic compilers, and neural scaffolds. A single developer orchestrating intelligent agents effortlessly replaces legacy teams of fifty.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <span className="text-secondary-fixed">SYNAPTIC MULTIPLIER: 50X</span>
              <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="w-full h-full bg-primary-container shadow-[0_0_8px_#ff6b00]" />
              </div>
            </div>
          </GlassCard>

          {/* Card 04 */}
          <GlassCard className="p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading text-xs text-primary font-bold tracking-wider">
                  04 // PRINCIPLE
                </span>
                <span className="material-symbols-outlined text-primary text-2xl">hub</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                Sovereign Capital & Community
              </h3>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                High peer density generates distributed trust. Our cohorts coalesce into perpetual angel syndicates, venture pools, and co-founding alliances that endure far beyond graduation, producing resilient lifetime networks.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <span className="text-secondary-fixed">SYNDICATE LIQUIDITY: ACTIVE</span>
              <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-primary-container shadow-[0_0_8px_#ff6b00]" />
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: THE EXPONENTIAL ACCELERATOR FRAMEWORK */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-surface-container-low/70 backdrop-blur-2xl p-8 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mb-10">
            <span className="font-heading text-xs text-primary uppercase tracking-widest font-bold">
              THE 100x PROMISE
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight mt-1">
              Our Core Commitments to Every Builder
            </h2>
            <p className="font-sans text-sm text-on-surface-variant mt-2 leading-relaxed">
              We operate with uncompromising standards to deliver exponential leverage, career transformation, and sovereign technology mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-container/70 border border-white/10 flex flex-col justify-between shadow-sm">
              <div>
                <Cpu className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-heading font-bold text-lg text-on-surface mb-2">
                  100% Production-Grade Tooling
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Every tool, agent framework, and repository provided in our ecosystem is battle-tested in live enterprise environments with real users.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/5 font-mono text-[11px] text-primary font-semibold">
                Zero Toy Labs
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container/70 border border-white/10 flex flex-col justify-between shadow-sm">
              <div>
                <Globe className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-heading font-bold text-lg text-on-surface mb-2">
                  Global High-Density Network
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Direct introductions to top-tier venture scouts, angel syndicates, and principal AI engineering leads across 68 nations.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/5 font-mono text-[11px] text-primary font-semibold">
                Lifelong Builder Network
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container/70 border border-white/10 flex flex-col justify-between shadow-sm">
              <div>
                <Zap className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-heading font-bold text-lg text-on-surface mb-2">
                  14-Day Velocity Guarantee
                </h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  If our programs and tooling don&apos;t fundamentally accelerate your build speed and capability within 14 days, you receive a full refund.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/5 font-mono text-[11px] text-primary font-semibold">
                100% Risk Reversal
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Ready to Build with 100x Leverage?"
        subtitle="Explore our live programs, master autonomous AI systems, or book an enterprise architecture audit."
      />
    </div>
  );
}
