"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  FileText,
  Mail,
  ArrowRight,
  Clock,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageItem {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  role: string | null;
  track: string | null;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  status: "pending" | "reviewed" | "contacted" | "archived";
}

interface CaseStudyItem {
  id: string;
  created_at: string;
  tag: string;
  category: string;
  category_label?: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  featured: boolean;
  status: "draft" | "published";
}

interface SubscriberItem {
  id: string;
  email: string;
  status: string;
}

export default function DashboardOverviewPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [msgRes, csRes, nlRes] = await Promise.all([
        fetch("/api/dashboard/messages").then((r) => r.json()),
        fetch("/api/dashboard/case-studies").then((r) => r.json()),
        fetch("/api/dashboard/newsletter").then((r) => r.json()),
      ]);

      if (msgRes.data) setMessages(msgRes.data);
      if (csRes.data) setCaseStudies(csRes.data);
      if (nlRes.data) setSubscribers(nlRes.data);
    } catch (err) {
      console.error("Error fetching dashboard overview data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pendingMessages = messages.filter((m) => m.status === "pending");
  const publishedCaseStudies = caseStudies.filter((c) => c.status === "published");
  const draftCaseStudies = caseStudies.filter((c) => c.status === "draft");

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Live Command Center
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="font-sans text-sm text-on-surface-variant mt-1">
            Manage inbound client inquiries, publish verified case studies, and track growth telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-high border border-white/10 text-xs font-semibold text-on-surface hover:text-white hover:bg-surface-container-highest transition-all"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin text-primary")} />
            <span>Refresh</span>
          </button>

          <Link
            href="/dashboard/case-studies?new=true"
            className="btn-kinetic inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write Case Study</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Messages */}
        <div className="rounded-2xl bg-surface-container-low/70 backdrop-blur-2xl border border-white/10 p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-heading font-semibold text-on-surface-variant uppercase tracking-wider">
              Total Messages
            </span>
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-heading font-black text-3xl text-white">
              {loading ? "..." : messages.length}
            </span>
            <Link
              href="/dashboard/messages"
              className="text-xs font-heading text-primary font-semibold hover:underline flex items-center gap-1"
            >
              Inbox <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="mt-2 text-[11px] text-on-surface-variant font-mono">
            {pendingMessages.length} pending review
          </div>
        </div>

        {/* Card 2: Pending Action */}
        <div className="rounded-2xl bg-surface-container-low/70 backdrop-blur-2xl border border-white/10 p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-heading font-semibold text-on-surface-variant uppercase tracking-wider">
              Pending Inquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-heading font-black text-3xl text-amber-400">
              {loading ? "..." : pendingMessages.length}
            </span>
            <Link
              href="/dashboard/messages?status=pending"
              className="text-xs font-heading text-amber-400 font-semibold hover:underline flex items-center gap-1"
            >
              Take Action <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="mt-2 text-[11px] text-on-surface-variant font-mono">
            Requires founder/advisor triage
          </div>
        </div>

        {/* Card 3: Case Studies */}
        <div className="rounded-2xl bg-surface-container-low/70 backdrop-blur-2xl border border-white/10 p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-heading font-semibold text-on-surface-variant uppercase tracking-wider">
              Case Studies
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-heading font-black text-3xl text-white">
              {loading ? "..." : caseStudies.length}
            </span>
            <Link
              href="/dashboard/case-studies"
              className="text-xs font-heading text-emerald-400 font-semibold hover:underline flex items-center gap-1"
            >
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="mt-2 text-[11px] text-on-surface-variant font-mono">
            {publishedCaseStudies.length} published • {draftCaseStudies.length} draft
          </div>
        </div>

        {/* Card 4: Newsletter Subscribers */}
        <div className="rounded-2xl bg-surface-container-low/70 backdrop-blur-2xl border border-white/10 p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-heading font-semibold text-on-surface-variant uppercase tracking-wider">
              Subscribers
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-heading font-black text-3xl text-white">
              {loading ? "..." : subscribers.length}
            </span>
            <Link
              href="/dashboard/newsletter"
              className="text-xs font-heading text-purple-400 font-semibold hover:underline flex items-center gap-1"
            >
              View List <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="mt-2 text-[11px] text-on-surface-variant font-mono">
            Active Signal dispatch readership
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Messages & Case Studies Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Received Messages (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <h2 className="font-heading font-bold text-lg text-white">
                Recent Inbound Messages
              </h2>
            </div>
            <Link
              href="/dashboard/messages"
              className="text-xs font-heading text-primary font-semibold hover:underline flex items-center gap-1"
            >
              View All ({messages.length}) →
            </Link>
          </div>

          <div className="rounded-2xl bg-surface-container-low/70 backdrop-blur-2xl border border-white/10 p-4 space-y-3 shadow-lg">
            {loading ? (
              <div className="p-8 text-center text-xs text-on-surface-variant">
                Loading messages...
              </div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-xs text-on-surface-variant">
                No inbound messages recorded yet.
              </div>
            ) : (
              messages.slice(0, 5).map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-xl bg-surface-container/60 hover:bg-surface-container border border-white/5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-sm text-white truncate">
                        {msg.name}
                      </span>
                      {msg.company && (
                        <span className="text-xs text-on-surface-variant font-sans truncate">
                          • {msg.company}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-on-surface-variant truncate">
                      {msg.email}
                    </div>
                    {msg.message && (
                      <p className="text-xs text-on-surface/80 line-clamp-1 mt-1 font-sans">
                        &quot;{msg.message}&quot;
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider border",
                        msg.status === "pending" && "bg-amber-500/10 text-amber-400 border-amber-500/30",
                        msg.status === "reviewed" && "bg-blue-500/10 text-blue-400 border-blue-500/30",
                        msg.status === "contacted" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                        msg.status === "archived" && "bg-slate-500/10 text-slate-400 border-slate-500/30"
                      )}
                    >
                      {msg.status}
                    </span>
                    <Link
                      href={`/dashboard/messages?id=${msg.id}`}
                      className="p-2 rounded-lg bg-surface-container-high hover:bg-primary hover:text-white text-on-surface-variant transition-colors"
                      title="Inspect message"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Case Studies Quick Action & Overview (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <h2 className="font-heading font-bold text-lg text-white">
                Case Studies
              </h2>
            </div>
            <Link
              href="/dashboard/case-studies"
              className="text-xs font-heading text-primary font-semibold hover:underline flex items-center gap-1"
            >
              Manage ({caseStudies.length}) →
            </Link>
          </div>

          <div className="rounded-2xl bg-surface-container-low/70 backdrop-blur-2xl border border-white/10 p-5 space-y-4 shadow-lg">
            {/* Quick action banner */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/20 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="font-heading font-bold text-sm text-white">
                  Write a New Case Study
                </span>
                <span className="text-xs text-on-surface-variant mt-0.5">
                  Publish client telemetry, results, and architecture proofs.
                </span>
              </div>
              <Link
                href="/dashboard/case-studies?new=true"
                className="btn-kinetic px-3 py-1.5 rounded-lg text-xs font-heading font-bold shrink-0 uppercase tracking-wider"
              >
                + New
              </Link>
            </div>

            {/* List */}
            <div className="space-y-2.5">
              {loading ? (
                <div className="p-4 text-center text-xs text-on-surface-variant">
                  Loading case studies...
                </div>
              ) : caseStudies.length === 0 ? (
                <div className="p-4 text-center text-xs text-on-surface-variant">
                  No case studies written yet. Click &quot;+ New&quot; to write one!
                </div>
              ) : (
                caseStudies.slice(0, 4).map((cs) => (
                  <div
                    key={cs.id}
                    className="p-3 rounded-xl bg-surface-container/60 hover:bg-surface-container border border-white/5 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">
                          {cs.tag}
                        </span>
                        <span className="font-heading font-semibold text-xs text-white truncate">
                          {cs.client}
                        </span>
                      </div>
                      <span className="text-[11px] text-on-surface-variant truncate mt-0.5">
                        {cs.industry || cs.category_label || cs.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-heading font-bold uppercase tracking-wider",
                          cs.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        )}
                      >
                        {cs.status}
                      </span>
                      <Link
                        href={`/dashboard/case-studies?edit=${cs.id}`}
                        className="text-xs text-on-surface-variant hover:text-primary transition-colors font-medium p-1"
                        title="Edit case study"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Link to public case studies page */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-heading">
              <span className="text-on-surface-variant">Public View:</span>
              <Link
                href="/casestudy"
                target="_blank"
                className="text-primary hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Live Case Studies Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

