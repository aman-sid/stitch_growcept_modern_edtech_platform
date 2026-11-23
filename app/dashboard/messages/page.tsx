"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Archive,
  Mail,
  User,
  Building,
  Briefcase,
  DollarSign,
  Calendar,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
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

export default function DashboardMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/messages");
      const json = await res.json();
      if (json.data) {
        setMessages(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: MessageItem["status"]) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/dashboard/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success || res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Counts
  const counts = useMemo(() => {
    return {
      all: messages.length,
      pending: messages.filter((m) => m.status === "pending").length,
      reviewed: messages.filter((m) => m.status === "reviewed").length,
      contacted: messages.filter((m) => m.status === "contacted").length,
      archived: messages.filter((m) => m.status === "archived").length,
    };
  }, [messages]);

  // Filtered & Searched Messages
  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesStatus =
        selectedStatus === "all" || m.status === selectedStatus;
      const matchesSearch =
        searchQuery === "" ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.company && m.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (m.message && m.message.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    });
  }, [messages, selectedStatus, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Inbound Communications
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Received Messages & Inquiries
          </h1>
          <p className="font-sans text-sm text-on-surface-variant mt-1">
            Review consultations, audit briefs, and inbound partnership requests submitted through the site.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          disabled={loading}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high border border-white/10 text-xs font-semibold text-on-surface hover:text-white hover:bg-surface-container-highest transition-all shadow-sm"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin text-primary")} />
          <span>Refresh Inquiries</span>
        </button>
      </div>

      {/* Control Bar: Tabs + Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-surface-container-low/70 backdrop-blur-2xl p-3 rounded-2xl border border-white/10 shadow-lg">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
          {[
            { id: "all", label: "All Messages", count: counts.all },
            { id: "pending", label: "Pending", count: counts.pending, color: "text-amber-400" },
            { id: "reviewed", label: "Reviewed", count: counts.reviewed, color: "text-blue-400" },
            { id: "contacted", label: "Contacted", count: counts.contacted, color: "text-emerald-400" },
            { id: "archived", label: "Archived", count: counts.archived, color: "text-slate-400" },
          ].map((tab) => {
            const isActive = selectedStatus === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-heading font-bold transition-all whitespace-nowrap flex items-center gap-2",
                  isActive
                    ? "bg-primary text-white shadow-[0_0_12px_rgba(255,107,0,0.3)]"
                    : "bg-surface-container/60 text-on-surface-variant hover:text-white hover:bg-surface-container border border-white/5"
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.2 rounded-full text-[10px] font-mono",
                    isActive ? "bg-white/20 text-white" : "bg-white/5 text-on-surface-variant"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, company..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary shadow-sm"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-12 text-center rounded-2xl bg-surface-container-low/50 border border-white/10 text-on-surface-variant text-sm">
            <RefreshCw className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
            Loading messages...
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-surface-container-low/50 border border-white/10 text-on-surface-variant">
            <MessageSquare className="w-8 h-8 text-on-surface-variant/40 mx-auto mb-2" />
            <h3 className="font-heading font-bold text-base text-white">No messages found</h3>
            <p className="text-xs text-on-surface-variant mt-1">
              {searchQuery ? "Try a different search query." : "No inquiries match this status filter."}
            </p>
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const isExpanded = expandedId === msg.id;
            const dateStr = new Date(msg.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={msg.id}
                className={cn(
                  "rounded-2xl transition-all duration-200 border",
                  isExpanded
                    ? "bg-surface-container-low/90 border-primary/40 shadow-xl"
                    : "bg-surface-container-low/60 hover:bg-surface-container-low/80 border-white/10 shadow-sm"
                )}
              >
                {/* Header row (clickable to expand) */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : msg.id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-heading font-bold text-sm shrink-0">
                      {msg.name ? msg.name.slice(0, 2).toUpperCase() : "??"}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-heading font-bold text-base text-white">
                          {msg.name}
                        </span>
                        {msg.company && (
                          <span className="px-2 py-0.5 rounded bg-surface-container-high border border-white/5 text-[11px] font-sans text-on-surface-variant">
                            {msg.company}
                          </span>
                        )}
                        {msg.role && (
                          <span className="text-[11px] text-on-surface-variant/70 hidden sm:inline">
                            ({msg.role})
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-on-surface-variant mt-0.5">
                        <span className="text-primary font-medium">{msg.email}</span>
                        <span>•</span>
                        <span className="font-mono text-[11px]">{dateStr}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                    {/* Status Pill */}
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider border",
                        msg.status === "pending" && "bg-amber-500/10 text-amber-400 border-amber-500/30",
                        msg.status === "reviewed" && "bg-blue-500/10 text-blue-400 border-blue-500/30",
                        msg.status === "contacted" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                        msg.status === "archived" && "bg-slate-500/10 text-slate-400 border-slate-500/30"
                      )}
                    >
                      {msg.status}
                    </span>

                    {/* Expand icon */}
                    <div className="p-1 rounded-lg bg-surface-container-high text-on-surface-variant">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-white/[0.08] space-y-4">
                    {/* Meta tags grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-surface-container-lowest/80 border border-white/5">
                        <span className="text-[10px] font-heading uppercase tracking-wider text-on-surface-variant/70 block mb-0.5">
                          Track / Focus
                        </span>
                        <span className="text-xs font-heading font-semibold text-white">
                          {msg.track || "General Inquiry"}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-surface-container-lowest/80 border border-white/5">
                        <span className="text-[10px] font-heading uppercase tracking-wider text-on-surface-variant/70 block mb-0.5">
                          Budget Range
                        </span>
                        <span className="text-xs font-heading font-semibold text-primary">
                          {msg.budget || "Not specified"}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-surface-container-lowest/80 border border-white/5">
                        <span className="text-[10px] font-heading uppercase tracking-wider text-on-surface-variant/70 block mb-0.5">
                          Timeline Urgency
                        </span>
                        <span className="text-xs font-heading font-semibold text-white">
                          {msg.timeline || "Flexible"}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-surface-container-lowest/80 border border-white/5">
                        <span className="text-[10px] font-heading uppercase tracking-wider text-on-surface-variant/70 block mb-0.5">
                          Inquiry ID
                        </span>
                        <span className="text-[11px] font-mono text-on-surface-variant truncate block">
                          {msg.id}
                        </span>
                      </div>
                    </div>

                    {/* Full Message Body */}
                    <div className="p-4 rounded-xl bg-surface-container-lowest border border-white/5 space-y-1">
                      <span className="text-[11px] font-heading font-bold text-on-surface-variant uppercase tracking-wider">
                        Client Message / Challenge Scope:
                      </span>
                      <p className="text-sm text-on-surface font-sans leading-relaxed whitespace-pre-wrap">
                        {msg.message || "No message body provided."}
                      </p>
                    </div>

                    {/* Actions bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      {/* Email Reply Button */}
                      <a
                        href={`mailto:${msg.email}?subject=${encodeURIComponent("Re: 100x MINDS Inquiry — " + (msg.track || "Consultation"))}`}
                        className="btn-kinetic inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reply via Email</span>
                      </a>

                      {/* Status toggle actions */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-on-surface-variant font-heading mr-1">
                          Set Status:
                        </span>
                        {(["pending", "reviewed", "contacted", "archived"] as const).map(
                          (status) => (
                            <button
                              key={status}
                              disabled={updatingId === msg.id || msg.status === status}
                              onClick={() => handleStatusUpdate(msg.id, status)}
                              className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-heading font-semibold capitalize transition-all",
                                msg.status === status
                                  ? "bg-primary text-white shadow-sm"
                                  : "bg-surface-container-high text-on-surface-variant hover:text-white hover:bg-surface-container-highest border border-white/5"
                              )}
                            >
                              {status}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

