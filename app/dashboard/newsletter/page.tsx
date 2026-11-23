"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Mail,
  Search,
  RefreshCw,
  CheckCircle2,
  Users,
  Calendar,
  Send,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscriberItem {
  id: string;
  created_at: string;
  email: string;
  source: string | null;
  status: "active" | "unsubscribed";
}

export default function DashboardNewsletterPage() {
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/newsletter");
      const json = await res.json();
      if (json.data) {
        setSubscribers(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((s) =>
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [subscribers, searchQuery]);

  const activeCount = subscribers.filter((s) => s.status === "active").length;

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Email,Source,Status,Created At"]
        .concat(
          subscribers.map(
            (s) =>
              `"${s.email}","${s.source || "website"}","${s.status}","${s.created_at}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `100x_minds_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Audience Telemetry
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Newsletter Subscribers
          </h1>
          <p className="font-sans text-sm text-on-surface-variant mt-1">
            Manage your audience subscribing to 100x MINDS intelligence signals and frameworks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSubscribers}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container-high border border-white/10 text-xs font-semibold text-on-surface hover:text-white"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin text-primary")} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="btn-kinetic inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container-low/70 border border-white/10">
          <span className="text-xs font-heading uppercase text-on-surface-variant block mb-1">
            Total Subscribers
          </span>
          <span className="font-heading font-black text-3xl text-white">
            {subscribers.length}
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-low/70 border border-white/10">
          <span className="text-xs font-heading uppercase text-on-surface-variant block mb-1">
            Active Readership
          </span>
          <span className="font-heading font-black text-3xl text-emerald-400">
            {activeCount}
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-low/70 border border-white/10">
          <span className="text-xs font-heading uppercase text-on-surface-variant block mb-1">
            Primary Channel
          </span>
          <span className="font-heading font-bold text-lg text-primary">
            Website Footer & Signals
          </span>
        </div>
      </div>

      {/* Search & List */}
      <div className="rounded-2xl bg-surface-container-low/70 backdrop-blur-2xl border border-white/10 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subscribers by email..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container-lowest border border-white/10 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary"
            />
          </div>
          <span className="text-xs font-mono text-on-surface-variant">
            Showing {filteredSubscribers.length} of {subscribers.length} records
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-on-surface-variant font-heading uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Subscriber Email</th>
                <th className="py-3 px-4">Origin Source</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-on-surface-variant">
                    Loading subscriber records...
                  </td>
                </tr>
              ) : filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-on-surface-variant">
                    No subscribers found.
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-white">
                      {sub.email}
                    </td>
                    <td className="py-3.5 px-4 text-on-surface-variant">
                      {sub.source || "direct"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider",
                          sub.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                        )}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-on-surface-variant font-mono">
                      {new Date(sub.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

