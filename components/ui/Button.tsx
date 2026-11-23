import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "kinetic" | "glass" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  variant = "kinetic",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  isLoading,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-5 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-7 py-3.5 text-base rounded-xl gap-2.5",
    xl: "px-8 py-4 text-lg rounded-2xl gap-3 font-extrabold",
  };

  const variantStyles = {
    kinetic:
      "bg-gradient-to-r from-primary-container via-tertiary-container to-primary-container bg-[length:200%_auto] text-white font-bold shadow-kinetic hover:shadow-kinetic-lg hover:-translate-y-0.5 active:translate-y-0 active:brightness-95",
    glass:
      "bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface backdrop-blur-xl border border-white/10 hover:border-primary/50 hover:text-white shadow-md hover:-translate-y-0.5",
    ghost:
      "bg-transparent hover:bg-surface-container-high/50 text-on-surface-variant hover:text-white transition-colors",
    outline:
      "bg-transparent border border-primary/50 text-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-kinetic",
    danger:
      "bg-error text-white hover:bg-error-container hover:text-on-error-container shadow-md",
  };

  const content = (
    <>
      {isLoading && (
        <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}
      {icon && iconPosition === "left" && !isLoading && icon}
      <span>{children}</span>
      {icon && iconPosition === "right" && !isLoading && icon}
    </>
  );

  const baseClasses = cn(
    "inline-flex items-center justify-center font-heading font-semibold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} disabled={isLoading || props.disabled} {...props}>
      {content}
    </button>
  );
}
