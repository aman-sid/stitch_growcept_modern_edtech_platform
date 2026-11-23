"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Search, ArrowRight, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string; badge?: string }[];
  currentPath: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  currentPath,
}: MobileMenuProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      window.location.href = `/services?q=${encodeURIComponent(query.trim())}`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      />

      {/* Drawer Menu */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-surface-container-lowest/95 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl transition-transform duration-300 animate-slideInRight">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/5">
            <div onClick={onClose} className="cursor-pointer">
              <Logo size="lg" variant="original" href="/" />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-surface-container-high text-on-surface-variant hover:text-white transition-all"
              aria-label="Close Mobile Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mt-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, tracks..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-white/10 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary font-sans"
            />
          </form>

          {/* Navigation Links List */}
          <nav className="mt-6 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl font-heading font-semibold text-base transition-all",
                    isActive
                      ? "bg-primary text-white shadow-kinetic"
                      : "text-on-surface-variant hover:text-white hover:bg-surface-container-high/40"
                  )}
                >
                  <span className="flex items-center gap-3">
                    {link.name}
                  </span>
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-heading font-bold uppercase tracking-wider">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Additional Quick Navigation */}
          <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-2">
            <Link
              href="/casestudy"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-heading text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              <span>View Enterprise Case Studies</span>
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-heading text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span>Book Architecture Audit</span>
            </Link>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/5 flex flex-col gap-3">
          <Button
            href="/services"
            variant="kinetic"
            size="md"
            onClick={onClose}
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full"
          >
            Explore Services
          </Button>
          <Button
            href="/contact"
            variant="glass"
            size="md"
            onClick={onClose}
            className="w-full"
          >
            Contact & Advisory
          </Button>
          <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-on-surface-variant font-mono">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span>Telemetry Live • 99.98% Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
}
