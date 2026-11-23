import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "100x MINDS — Learn. Grow. Transform.",
  description:
    "100x MINDS is a next-generation learning and builder ecosystem for AI, technology, entrepreneurship and professional growth.",
  keywords: [
    "100x MINDS",
    "AI Engineering",
    "Autonomous Agents",
    "NextGen EdTech",
    "Startup Accelerator",
    "LangGraph",
    "Micro-SaaS",
    "Growth Engineering",
  ],
  authors: [{ name: "100x MINDS" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/apple-icon.png" },
    ],
  },
  openGraph: {
    title: "100x MINDS — Unlock Your 100x Potential with Next-Gen Intelligence",
    description:
      "A next-generation learning and builder ecosystem helping ambitious students, developers, founders, marketers and professionals develop high-leverage skills in AI.",
    url: "https://100xminds.ai",
    siteName: "100x MINDS",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "100x MINDS Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "100x MINDS — Learn. Grow. Transform.",
    description:
      "A next-generation learning and builder ecosystem helping ambitious students, developers, founders and professionals develop high-leverage AI skills.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans bg-background text-on-surface antialiased min-h-screen flex flex-col justify-between selection:bg-primary selection:text-white`}
        suppressHydrationWarning
      >
        {/* Persistent Sticky Navbar */}
        <Navbar />

        {/* Main Content Viewport */}
        <main className="flex-1 w-full pt-20 flex flex-col">
          {children}
        </main>

        {/* Global Unified Footer */}
        <Footer />
      </body>
    </html>
  );
}
