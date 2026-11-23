import React from "react";
import { processStages } from "@/data/services";
import { GlassCard } from "@/components/ui/GlassCard";
import { Flag, Compass, Rocket, ShieldCheck, ArrowRight } from "lucide-react";

export function Timeline() {
  const iconMap: Record<string, React.ReactNode> = {
    flag: <Flag className="w-5 h-5 text-primary" />,
    polyline: <Compass className="w-5 h-5 text-primary" />,
    rocket: <Rocket className="w-5 h-5 text-primary" />,
    verified: <ShieldCheck className="w-5 h-5 text-primary" />,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
      {processStages.map((stage, index) => (
        <GlassCard
          key={stage.step}
          className="p-6 lg:p-7 flex flex-col justify-between group relative"
          variant={index === 2 ? "active" : "base"}
        >
          <div>
            {/* Step & Timeframe */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-heading font-black text-3xl text-primary/30 group-hover:text-primary transition-colors">
                {stage.step}
              </span>
              <span className="font-mono text-[11px] text-primary uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                {stage.timeframe}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-heading font-bold text-lg text-white mb-2">
              {stage.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6">
              {stage.description}
            </p>
          </div>

          {/* Deliverable Badge */}
          <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-heading font-semibold text-primary">
            {iconMap[stage.icon] || <Flag className="w-4 h-4 text-primary" />}
            <span className="truncate">{stage.deliverable}</span>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
