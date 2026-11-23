import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ServicePractice } from "@/data/services";
import { GlassCard } from "@/components/ui/GlassCard";

interface ServiceCardProps {
  practice: ServicePractice;
}

export function ServiceCard({ practice }: ServiceCardProps) {
  return (
    <GlassCard className="flex flex-col justify-between group p-6 lg:p-8 h-full">
      <div>
        {/* Top bar with Icon and Practice Number */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-surface-container-high/60 flex items-center justify-center text-primary ring-1 ring-primary/20 shadow-sm group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-2xl">{practice.icon}</span>
          </div>
          <span className="font-heading text-[11px] font-bold uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            {practice.practiceNumber}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-primary transition-colors">
          {practice.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-xs text-on-surface-variant mb-6 leading-relaxed">
          {practice.description}
        </p>

        {/* Capability Checklist */}
        <div className="space-y-2 mb-6">
          {practice.capabilities.map((cap, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 text-xs py-2 px-3 rounded-xl bg-surface-container-lowest/60 border border-white/5 text-on-surface"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>{cap}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="font-heading text-xs font-semibold text-primary">
          {practice.tagline}
        </span>
        <Link
          href="/contact"
          className="p-2 rounded-lg bg-surface-container-high/70 hover:bg-primary hover:text-white transition-all text-on-surface-variant shadow-sm"
        >
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </GlassCard>
  );
}
