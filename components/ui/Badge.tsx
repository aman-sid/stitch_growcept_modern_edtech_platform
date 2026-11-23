import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "pulse" | "success";
  size?: "sm" | "md" | "lg";
}

export function Badge({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] tracking-wider",
    md: "px-3 py-1 text-xs tracking-wider",
    lg: "px-4 py-1.5 text-sm tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-primary-container/15 text-primary border border-primary/30 shadow-[0_0_12px_rgba(255,107,0,0.15)]",
    secondary:
      "bg-surface-container-high text-secondary-fixed border border-white/5",
    outline:
      "bg-transparent text-on-surface-variant border border-white/10",
    pulse:
      "bg-surface-container-high/80 text-primary border border-primary/30 shadow-[0_0_16px_rgba(255,107,0,0.25)]",
    success:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-heading font-bold uppercase",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {variant === "pulse" && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      )}
      {children}
    </span>
  );
}
