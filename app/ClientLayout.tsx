"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLayout } from "./LayoutContext";
import AIChatPanel from "@/components/ui/AIChatPanel";

export interface NavRoute {
  label: string;
  href: string;
  shortLabel?: string;
}

export const TOP_NAV_ROUTES: NavRoute[] = [
  { label: "Home", href: "/" },
  { label: "Retail Credit Risk", href: "/retail-credit-risk", shortLabel: "Credit Risk" },
  { label: "Churn / Neural Net", href: "/churn", shortLabel: "Churn" },
  { label: "Time Series", href: "/time-series", shortLabel: "Time Series" },
  { label: "NIFTY Portfolio", href: "/nifty", shortLabel: "NIFTY" },
  { label: "Client Equity", href: "/client-equity", shortLabel: "Client Equity" },
  { label: "LOC-IQ", href: "/loc-iq", shortLabel: "LOC-IQ" },
  { label: "How I Build", href: "/how-i-build", shortLabel: "Build" },
  { label: "Rapid Recall", href: "/rapid-recall", shortLabel: "Recall" },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isChatOpen, setIsChatOpen } = useLayout();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (document.documentElement.classList.contains('light')) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {}
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  const isNotebookAppRoute = pathname.startsWith('/notebook/apps/');

  return (
    <main className={cn(
      "w-full min-h-screen relative bg-surface select-none font-sans text-ink-muted",
      isNotebookAppRoute && "h-full overflow-hidden"
    )}>
      {/* STICKY TOP HEADER (Hidden on full-bleed standalone apps like credit-risk-os) */}
      {!isNotebookAppRoute && (
        <header className="fixed top-0 left-0 w-full h-16 bg-surface-raised/95 backdrop-blur-2xl border-b border-hairline z-50 flex items-center justify-between px-4 sm:px-8 select-none">
          {/* BRAND WORDMARK */}
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-ink hover:text-accent transition-colors shrink-0 cursor-pointer"
          >
            <span className="text-accent font-serif text-lg font-normal">Portfolio</span>
            <span className="text-ink font-bold font-mono text-xs tracking-widest">LEARNING OS</span>
          </Link>

          {/* DESKTOP TOP HORIZONTAL SCROLL NAV */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar py-1 px-4">
            {TOP_NAV_ROUTES.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer",
                    isActive
                      ? "bg-accent text-surface shadow-sm"
                      : "text-ink-muted hover:text-ink hover:bg-surface-sunken"
                  )}
                >
                  {route.shortLabel || route.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS: MOBILE MENU TOGGLE & THEME TOGGLE */}
          <div className="flex items-center gap-2 shrink-0">
            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-surface-sunken border border-hairline text-ink-muted hover:text-ink text-xs font-mono font-bold uppercase cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? "CLOSE" : "MENU"}
            </button>

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg bg-surface-sunken border border-hairline text-ink-muted hover:text-accent transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.966-8.966h-2.25m-13.5 0H3m15.364-6.364l-1.591 1.591M6.758 17.242l-1.591 1.591m12.728 0l-1.591-1.591M6.758 6.758L5.167 5.167M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
          </div>
        </header>
      )}

      {/* MOBILE NAV DRAWER */}
      {!isNotebookAppRoute && isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bg-surface-raised/98 backdrop-blur-2xl border-b border-hairline z-40 p-4 font-mono text-xs space-y-2 lg:hidden select-none animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-[10px] text-accent font-bold uppercase tracking-wider px-2 mb-1">// NAVIGATION ROUTES</div>
          <div className="grid grid-cols-2 gap-2">
            {TOP_NAV_ROUTES.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "p-2.5 rounded-xl border font-bold uppercase text-[11px] text-center transition-all cursor-pointer truncate",
                    isActive
                      ? "bg-accent text-surface border-accent"
                      : "bg-surface-sunken border-hairline text-ink-muted hover:text-ink"
                  )}
                >
                  {route.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW CONTAINER LAYER */}
      <div className={cn("z-0", !isNotebookAppRoute && "pt-20 sm:pt-22")}>
        {children}
      </div>

      {/* AI CHAT PANEL */}
      <AIChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </main>
  );
}
