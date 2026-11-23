"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  imageClassName?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  width?: number;
  height?: number;
  showText?: boolean;
  showTagline?: boolean;
  variant?: "dark" | "transparent" | "badge" | "original";
  href?: string;
  priority?: boolean;
}

export function Logo({
  className,
  imageClassName,
  size = "lg",
  width,
  height,
  showText = false,
  showTagline = false,
  variant = "dark",
  href = "/",
  priority = true,
}: LogoProps) {
  const sizeMap = {
    sm: { box: "h-9 sm:h-10 w-auto", width: 95, height: 50, text: "text-base", tag: "text-[9px]" },
    md: { box: "h-11 sm:h-12 w-auto", width: 114, height: 60, text: "text-lg", tag: "text-[10px]" },
    lg: { box: "h-14 sm:h-16 w-auto", width: 152, height: 80, text: "text-xl", tag: "text-[11px]" },
    xl: { box: "h-18 sm:h-22 w-auto", width: 200, height: 105, text: "text-2xl", tag: "text-xs" },
    "2xl": { box: "h-24 sm:h-28 w-auto", width: 265, height: 140, text: "text-3xl", tag: "text-sm" },
  };

  const currentSize = sizeMap[size] || sizeMap.lg;
  const imgWidth = width || currentSize.width;
  const imgHeight = height || currentSize.height;

  const logoSrc =
    variant === "transparent"
      ? "/logo-transparent.png"
      : variant === "original"
      ? "/logo-dark.png"
      : "/logo-dark.png";

  const isBadge = variant === "badge";

  const content = (
    <div className={cn("inline-flex items-center gap-3 group shrink-0 select-none", className)}>
      {/* Logo Graphic Container */}
      <div
        className={cn(
          "relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105",
          currentSize.box,
          isBadge && "rounded-2xl bg-surface-container-high px-3 py-1.5 border border-white/10 group-hover:border-primary/50 group-hover:shadow-kinetic",
          imageClassName
        )}
      >
        <Image
          src={logoSrc}
          alt="100x MINDS Logo"
          width={imgWidth}
          height={imgHeight}
          priority={priority}
          className="w-auto h-full max-h-full object-contain filter drop-shadow-sm group-hover:drop-shadow-[0_0_12px_rgba(255,107,0,0.45)] transition-all duration-300"
        />
      </div>

      {/* Brand Typography (when showText is explicitly true) */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "font-heading font-extrabold text-on-surface tracking-tight group-hover:text-primary transition-colors",
                currentSize.text
              )}
            >
              100x MINDS
            </span>
            {showTagline && (
              <span className="hidden xl:inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-heading text-[10px] tracking-widest uppercase font-bold border border-primary/20 shadow-sm">
                LEARN • GROW • TRANSFORM
              </span>
            )}
          </div>
          {showTagline && (
            <span
              className={cn(
                "font-heading text-on-surface-variant tracking-wider uppercase xl:hidden",
                currentSize.tag
              )}
            >
              LEARN • GROW • TRANSFORM
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none select-none flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
