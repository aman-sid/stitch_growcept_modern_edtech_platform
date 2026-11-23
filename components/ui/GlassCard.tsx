import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
  variant?: "base" | "elevated" | "subtle" | "active";
}

export function GlassCard({
  children,
  className,
  glow = false,
  hoverEffect = true,
  variant = "base",
  ...props
}: GlassCardProps) {
  const variantStyles = {
    base: "bg-surface-container-low/70 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]",
    elevated: "bg-surface-container/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]",
    subtle: "bg-surface-container-lowest/60 backdrop-blur-md border border-white/[0.05] shadow-none",
    active: "bg-surface-container-high/80 backdrop-blur-2xl border border-primary/60 shadow-kinetic ring-1 ring-primary/30",
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl transition-all duration-300 overflow-hidden",
        "before:absolute before:inset-x-0 before:top-0 before:h-[1.5px] before:bg-gradient-to-r before:from-transparent before:via-primary/40 before:to-transparent before:pointer-events-none",
        variantStyles[variant],
        hoverEffect && "hover:border-primary/50 hover:bg-surface-container-high/60 hover:-translate-y-1 hover:shadow-kinetic",
        glow && "shadow-kinetic",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
