"use client";

import React, { useState } from "react";
import { ecosystemPillars } from "@/data/ecosystem";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function EcosystemDiagram() {
  const [activeVector, setActiveVector] = useState<string>("academy");

  const iconMap: Record<string, string> = {
    academy: "school",
    "software-suite": "developer_board",
    "venture-network": "paid",
    "talent-foundry": "workspace_premium",
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {/* 4 Quadrants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {ecosystemPillars.map((pillar) => {
          const isActive = activeVector === pillar.id;

          return (
            <div
              key={pillar.id}
              onClick={() => setActiveVector(pillar.id)}
              className="cursor-pointer"
            >
              <GlassCard
                className={cn(
                  "p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 h-full",
                  isActive
                    ? "border-primary/60 bg-surface-container/90 shadow-kinetic ring-1 ring-primary/40"
                    : "opacity-90 hover:opacity-100"
                )}
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high/60 flex items-center justify-center text-primary ring-1 ring-primary/20 shadow-sm">
                      <span className="material-symbols-outlined text-2xl">
                        {iconMap[pillar.id] || "hub"}
                      </span>
                    </div>
                    <span className="font-heading text-xs uppercase tracking-widest text-primary px-3 py-1 rounded-md bg-primary/10 font-bold border border-primary/20">
                      {pillar.vector}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-bold text-2xl text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Features / Highlights */}
                  <div className="space-y-2.5 mb-6">
                    {pillar.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest/60 border border-white/5"
                      >
                        <span className="font-sans text-xs text-on-surface flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{feat.title}</span>
                        </span>
                        <span className="font-heading text-[11px] font-bold text-primary">
                          {feat.stat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connection Loop Indicator */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-on-surface-variant">
                  <span className="font-mono text-[11px] text-primary font-semibold">
                    {pillar.connection}
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
