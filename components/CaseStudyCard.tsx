import React from "react";
import { ArrowUpRight, CheckCircle2, Quote } from "lucide-react";
import { CaseStudy } from "@/data/caseStudies";
import { GlassCard } from "@/components/ui/GlassCard";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <GlassCard className="p-6 lg:p-8 flex flex-col justify-between group h-full">
      <div>
        {/* Top Tag & Industry */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-heading text-[10px] font-bold px-3 py-1 rounded-full bg-primary text-white uppercase tracking-wider shadow-sm">
            {caseStudy.tag}
          </span>
          <span className="font-mono text-xs text-on-surface-variant font-medium">
            {caseStudy.industry}
          </span>
        </div>

        {/* Client Name */}
        <h3 className="font-heading font-bold text-xl text-white mb-3">
          {caseStudy.client}
        </h3>

        {/* Problem */}
        <div className="mb-4">
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-primary block mb-1">
            Challenge
          </span>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            {caseStudy.problem}
          </p>
        </div>

        {/* Solution */}
        <div className="mb-6">
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-primary block mb-1">
            Engineered Solution
          </span>
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            {caseStudy.solution}
          </p>
        </div>

        {/* Results Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-surface-container-lowest/70 border border-white/5 mb-6">
          {caseStudy.results.map((res, i) => (
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

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {caseStudy.technology.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-surface-container-high/60 text-[10px] font-mono text-on-surface-variant font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Testimonial Quote */}
      {caseStudy.testimonial && (
        <div className="pt-4 border-t border-white/5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-heading font-bold text-xs shrink-0 ring-1 ring-primary/20">
            {caseStudy.testimonial.avatarInitials}
          </div>
          <div className="flex flex-col">
            <p className="font-sans text-xs text-on-surface italic leading-relaxed">
              &ldquo;{caseStudy.testimonial.quote}&rdquo;
            </p>
            <span className="font-heading text-[11px] text-primary font-bold mt-1">
              {caseStudy.testimonial.author} • {caseStudy.testimonial.role}
            </span>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
