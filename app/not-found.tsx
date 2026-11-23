import React from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  Home,
  Terminal,
  Cpu,
  Layers,
  BookOpen,
  Mail,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

export default function NotFound() {
  const quickLinks = [
    {
      title: "Core Practices & Services",
      desc: "Agentic GTM, autonomous swarms & systems engineering",
      href: "/services",
      icon: Cpu,
    },
    {
      title: "Verified Case Studies",
      desc: "Telemetry, production metrics & venture value created",
      href: "/casestudy",
      icon: Layers,
    },
    {
      title: "Intelligence & Blog",
      desc: "Architectural dispatches, LangGraph & model research",
      href: "/blog",
      icon: BookOpen,
    },
    {
      title: "Book Architecture Audit",
      desc: "Connect directly with our staff AI architects",
      href: "/contact",
      icon: Mail,
    },
  ];

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-background text-on-surface">
      {/* Ambient Radiant Glow Effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-primary-container/20 via-tertiary-container/10 to-transparent blur-[150px] rounded-full -z-10" />
      <div className="pointer-events-none absolute bottom-10 -right-20 w-[450px] h-[450px] bg-primary-container/10 blur-[140px] rounded-full -z-10" />
      <div className="pointer-events-none absolute top-1/2 -left-32 w-96 h-96 bg-tertiary-container/10 blur-[130px] rounded-full -z-10" />

      <div className="max-w-3xl w-full text-center flex flex-col items-center">
        {/* Status Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-xl border border-primary/30 shadow-[0_0_24px_rgba(255,107,0,0.15)] mb-8 animate-fadeIn">
          <ShieldAlert className="w-3.5 h-3.5 text-primary" />
          <span className="font-heading text-xs tracking-widest text-primary font-bold uppercase">
            STATUS 404 // COORDINATE UNRESOLVED
          </span>
        </div>

        {/* Massive 404 Glitch/Kinetic Heading */}
        <div className="relative mb-4 select-none">
          <span className="font-heading font-black text-8xl sm:text-9xl lg:text-[11rem] tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white/70 to-white/10 opacity-90 drop-shadow-2xl">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-mono text-[11px] sm:text-xs text-primary/80 uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-primary/30 backdrop-blur-md">
              NULL_TRAJECTORY_EXCEPTION
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight mb-4 max-w-xl">
          Coordinate Not Found in Current State Space
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-xs sm:text-sm text-on-surface-variant max-w-lg mb-8 leading-relaxed">
          The requested route, resource, or neural pathway does not exist or has been relocated to an alternate address in the 100x MINDS ecosystem.
        </p>

        {/* Terminal Diagnostic Card */}
        <div className="w-full max-w-lg mb-10 text-left rounded-2xl bg-surface-container-lowest/80 border border-white/10 p-4 font-mono text-[11px] text-on-surface-variant shadow-inner">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[10px] text-primary">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>TERMINAL TELEMETRY</span>
            </div>
            <span>SYS_DIAGNOSTIC</span>
          </div>
          <div className="space-y-1">
            <p className="text-white/80">
              <span className="text-primary font-bold">&gt;</span> STATUS: <span className="text-error">404_NOT_FOUND</span>
            </p>
            <p>
              <span className="text-primary font-bold">&gt;</span> ERROR: Route resolution returned empty node
            </p>
            <p>
              <span className="text-primary font-bold">&gt;</span> ACTION: Recommended fallback to registered system routes
            </p>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Button
            href="/"
            variant="kinetic"
            size="lg"
            icon={<Home className="w-4 h-4" />}
            iconPosition="left"
          >
            Return to Command Center
          </Button>

          <Button
            href="/services"
            variant="glass"
            size="lg"
            icon={<ArrowRight className="w-4 h-4 text-primary" />}
          >
            Explore Services
          </Button>
        </div>

        {/* Quick Route Directory */}
        <div className="w-full pt-8 border-t border-white/10">
          <p className="font-heading text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-6 text-center">
            Or Jump Directly to Core Trajectories
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.href} className="group">
                  <GlassCard className="p-4 flex items-start gap-3.5 h-full group-hover:border-primary/50 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-heading font-bold text-xs text-white group-hover:text-primary transition-colors flex items-center gap-1">
                        <span>{item.title}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-primary" />
                      </span>
                      <span className="font-sans text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                        {item.desc}
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
