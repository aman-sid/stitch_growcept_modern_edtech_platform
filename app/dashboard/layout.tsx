"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Mail,
  ArrowLeft,
  Menu,
  X,
  LogOut,
  Shield,
  User,
  BookOpen,
} from "lucide-react";

const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    label: "Case Studies",
    href: "/dashboard/case-studies",
    icon: FileText,
  },
  {
    label: "Blogs",
    href: "/dashboard/blogs",
    icon: BookOpen,
  },
  {
    label: "Newsletter",
    href: "/dashboard/newsletter",
    icon: Mail,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string>("admin@100xminds.ai");
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Validate session on mount
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        } else if (data.user?.email) {
          setAdminEmail(data.user.email);
        }
      })
      .catch(() => {
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      });
  }, [pathname, router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/login";
    } catch {
      window.location.href = "/login";
    }
  };

  return (
    <div className="-mt-20 min-h-screen bg-background text-on-surface flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] flex flex-col",
          "bg-surface-container-low/70 backdrop-blur-2xl border-r border-white/[0.08]",
          "shadow-[4px_0_24px_0_rgba(0,0,0,0.5)]",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar top accent line */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-primary font-heading font-black text-sm">
                100x
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm text-white tracking-tight leading-none">
                100x MINDS
              </span>
              <span className="text-[10px] font-mono text-primary font-semibold mt-0.5">
                Admin Console
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_12px_rgba(255,107,0,0.1)]"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-white/[0.06] border border-transparent"
                )}
              >
                <link.icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive ? "text-primary" : "text-on-surface-variant"
                  )}
                />
                <span className="font-heading font-semibold text-xs uppercase tracking-wider">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Admin profile & actions footer */}
        <div className="px-3 py-4 border-t border-white/[0.06] space-y-2">
          {/* Admin Identity pill */}
          <div className="p-3 rounded-xl bg-surface-container/60 border border-white/5 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-heading font-bold text-xs shrink-0">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-heading uppercase text-on-surface-variant font-bold">
                Logged in as
              </span>
              <span className="text-xs font-mono text-white truncate">
                {adminEmail}
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold text-on-surface-variant hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            <span>Back to Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span>{loggingOut ? "Signing Out..." : "Sign Out"}</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-surface-container-low/50 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-white/[0.06] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="font-heading font-bold text-base text-white tracking-tight">
                Admin Command Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 text-xs font-heading font-semibold text-on-surface-variant hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high border border-white/10 text-xs font-heading font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
