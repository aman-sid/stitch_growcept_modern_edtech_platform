"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ArrowRight, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/MobileMenu";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (pathname?.startsWith("/dashboard") || pathname === "/login") {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { name: string; href: string; badge?: string }[] = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Case Study", href: "/casestudy" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/services?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-surface-container-lowest/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
            : "bg-transparent border-b border-white/5"
        )}
      >
        <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo size="lg" variant="original" href="/" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-surface-container-low/60 backdrop-blur-lg border border-white/5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 relative flex items-center gap-1.5",
                    isActive
                      ? "bg-primary text-white shadow-[0_0_16px_rgba(255,107,0,0.4)]"
                      : "text-on-surface-variant hover:text-white hover:bg-surface-container-high/40"
                  )}
                >
                  {link.name}
                  {link.badge && (
                    <span
                      className={cn(
                        "px-1.5 py-0.5 rounded-full text-[9px] font-heading font-bold uppercase tracking-wider",
                        isActive
                          ? "bg-white text-primary"
                          : "bg-primary text-white shadow-sm"
                      )}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Search on larger screens */}
            <form onSubmit={handleSearchSubmit} className="relative hidden 2xl:block w-60">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container-lowest/60 border border-white/10 text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
              />
            </form>

            {/* Get Consulting / Contact CTA */}
            <Button
              href="/contact"
              variant="kinetic"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              className="hidden md:inline-flex"
            >
              Get Consulting
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-surface-container-high text-on-surface hover:text-primary hover:bg-surface-container-highest transition-all"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        currentPath={pathname}
      />
    </>
  );
}
