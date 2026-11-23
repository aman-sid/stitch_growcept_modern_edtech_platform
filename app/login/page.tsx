"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Invalid email or password.");
      }

      // Hard redirect or push to dashboard to trigger middleware/layout session refresh
      window.location.href = redirectPath;
    } catch (err: any) {
      setError(err?.message || "Failed to sign in. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 relative overflow-hidden py-12">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-primary-container/20 to-transparent blur-[140px] rounded-full -z-10" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-80 h-80 bg-tertiary-container/10 blur-[130px] rounded-full -z-10" />

      <div className="w-full max-w-md">
        {/* Brand / Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo />
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/80 border border-primary/30 text-[11px] font-heading font-semibold text-primary uppercase tracking-widest">
            <Lock className="w-3 h-3 text-primary" />
            <span>Admin Terminal Access</span>
          </div>
          <h1 className="mt-3 text-2xl font-heading font-extrabold text-white tracking-tight">
            Sign in to Console
          </h1>
          <p className="mt-1 text-xs text-on-surface-variant font-sans">
            Secure administrative control center for 100x MINDS.
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card-interactive p-8 rounded-2xl relative shadow-2xl">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-error/10 border border-error/30 text-error text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-heading font-bold text-on-surface mb-1.5">
                Operator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@100xminds.ai"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors shadow-inner"
                />
                <Mail className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-heading font-bold text-on-surface">
                  Security Passkey
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors shadow-inner"
                />
                <Lock className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded accent-primary"
                />
                <span>Remember this terminal</span>
              </label>

              <span className="text-[11px] text-primary/80 font-mono">
                Encrypted Session
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-kinetic w-full py-3 rounded-xl text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
            >
              <span>{loading ? "Authenticating..." : "Authenticate & Enter"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Bottom Link back to site */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs font-heading text-on-surface-variant hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>← Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <LoginForm />
    </Suspense>
  );
}
