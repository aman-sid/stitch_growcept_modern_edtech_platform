"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

export function CTASection({
  title = "Ready to Transform Your Mind into a 100x Engine?",
  subtitle = "Join thousands of high-velocity builders mastering autonomous tech, proprietary software workflows, and exponential career transformation.",
  badgeText = "Next Cohort Seats Filling",
}: CTASectionProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden">
      <div className="relative rounded-3xl bg-surface-container-low/80 backdrop-blur-2xl p-8 sm:p-12 lg:p-20 overflow-hidden text-center flex flex-col items-center border border-white/10 shadow-[0_15px_40px_-10px_rgba(255,107,0,0.15)]">
        {/* Backlight Aura */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl flex flex-col items-center">
          {/* Eyebrow Badge */}
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-heading text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2 border border-primary/20 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            <span>{badgeText}</span>
          </span>

          {/* Headline */}
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-6 leading-tight">
            {title.includes("100x") ? (
              <>
                Ready to Transform Your Mind into a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-amber-500">
                  100x Engine?
                </span>
              </>
            ) : (
              title
            )}
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-sm sm:text-base text-on-surface-variant mb-10 max-w-xl leading-relaxed">
            {subtitle}
          </p>

          {/* Instant Signup Interface */}
          {submitted ? (
            <div className="p-6 rounded-2xl bg-surface-container-high/90 border border-primary/30 flex flex-col items-center gap-2 max-w-md w-full shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <h3 className="font-heading font-bold text-lg text-white">
                Welcome to 100x MINDS!
              </h3>
              <p className="font-sans text-xs text-on-surface-variant text-center">
                Your onboarding sequence and curriculum overview have been dispatched to your inbox.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-surface-container-lowest/80 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
              <div className="relative w-full flex items-center">
                <Mail className="w-4 h-4 absolute left-4 text-on-surface-variant/60 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your best work email..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-transparent font-sans text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none"
                />
              </div>
              <Button
                type="submit"
                variant="kinetic"
                size="md"
                className="w-full sm:w-auto shrink-0 whitespace-nowrap"
              >
                Join Next Cohort
              </Button>
            </form>
          )}

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-on-surface-variant font-heading text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>14-Day Velocity Guarantee</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Instant App Suite Access</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Discord Mastermind Seat</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
