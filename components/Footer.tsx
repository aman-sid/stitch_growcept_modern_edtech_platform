"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Send, CheckCircle2, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (pathname?.startsWith("/dashboard") || pathname === "/login") {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-white/10 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start gap-5">
            <Logo size="xl" variant="original" href="/" />

            <p className="font-sans text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Accelerating human potential through transformative learning, exponential AI tools, and disruptive builder ecosystems. High leverage for ambitious minds.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-surface-container-high/60 border border-white/5 flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container-high hover:border-primary/40 transition-all shadow-sm"
                aria-label="Terminal"
              >
                <Terminal className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-surface-container-high/60 border border-white/5 flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container-high hover:border-primary/40 transition-all shadow-sm"
                aria-label="X / Twitter"
              >
                <span className="font-heading font-bold text-sm">𝕏</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-surface-container-high/60 border border-white/5 flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container-high hover:border-primary/40 transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <span className="font-heading font-bold text-xs">in</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-surface-container-high/60 border border-white/5 flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container-high hover:border-primary/40 transition-all shadow-sm"
                aria-label="GitHub"
              >
                <span className="font-mono text-xs font-bold">&lt;/&gt;</span>
              </a>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Platform */}
            <div className="flex flex-col gap-3">
              <span className="font-heading font-bold text-xs text-white uppercase tracking-wider">
                Platform
              </span>
              <Link href="/services" className="text-xs text-on-surface-variant hover:text-white transition-colors">
                Enterprise AI Services
              </Link>
              <Link href="/casestudy" className="text-xs text-on-surface-variant hover:text-white transition-colors">
                Client Case Studies
              </Link>
              <Link href="/blog" className="text-xs text-on-surface-variant hover:text-white transition-colors">
                Research & Blog
              </Link>
              <Link href="/about" className="text-xs text-on-surface-variant hover:text-white transition-colors">
                About Our Mission
              </Link>
              <Link href="/contact" className="text-xs text-on-surface-variant hover:text-white transition-colors">
                Contact & Advisory
              </Link>
            </div>

            {/* Column 2: Company */}
            <div className="flex flex-col gap-3">
              <span className="font-heading font-bold text-xs text-white uppercase tracking-wider">
                Company
              </span>
              <Link href="/about" className="text-xs text-on-surface-variant hover:text-white transition-colors">
                Our Manifesto
              </Link>
              <Link href="/about" className="text-xs text-on-surface-variant hover:text-white transition-colors">
                Our Mission & Thesis
              </Link>
              <Link href="/casestudy" className="text-xs text-on-surface-variant hover:text-white transition-colors">
                Verified Case Studies
              </Link>
              <Link href="/contact" className="text-xs text-on-surface-variant hover:text-white transition-colors">
                Consulting & Audits
              </Link>
              <Link href="/services" className="text-xs text-on-surface-variant hover:text-white transition-colors">
                Enterprise AI Solutions
              </Link>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="font-heading font-bold text-xs text-white uppercase tracking-wider">
              Stay Exponential
            </span>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              Receive high-velocity frameworks, early access tooling, and transformational insights directly in your inbox.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 flex items-center gap-2 text-xs text-primary font-heading font-semibold">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Subscribed to Signal. Welcome aboard!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    className="w-full pl-3 pr-24 py-2.5 rounded-xl bg-surface-container-low border border-white/10 text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 px-3 py-1.5 rounded-lg bg-primary text-white text-[10px] font-heading font-bold uppercase tracking-wider shadow-sm hover:brightness-110 transition-all"
                  >
                    Subscribe
                  </button>
                </div>
                <span className="text-[10px] text-on-surface-variant/60">
                  Zero spam. Only signal. Unsubscribe anytime.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          {/* Telemetry Status */}
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#ff6b00] animate-pulse" />
            <span>All Systems Operational • 99.98% Telemetry Sync</span>
          </div>

          <div className="text-center font-sans text-on-surface-variant">
            © {new Date().getFullYear()} 100x MINDS Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-on-surface-variant">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Security
            </Link>
            <Link href="/dashboard" className="hover:text-primary transition-colors text-on-surface-variant/80">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
