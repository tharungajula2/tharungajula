"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLayout } from "./LayoutContext";
import AIChatPanel from "@/components/ui/AIChatPanel";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isChatOpen, setIsChatOpen } = useLayout();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

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

  // Map route pathname to activeTab name
  let activeTab: 'thesis' | 'neural' | 'evolution' | 'connect' | 'blog' = 'thesis';
  if (pathname === '/work') activeTab = 'neural';
  else if (pathname === '/story') activeTab = 'evolution';
  else if (pathname === '/connect') activeTab = 'connect';
  else if (pathname === '/blog') activeTab = 'blog';

  // Map workTab from query parameters
  const tabParam = searchParams.get('tab');
  let workTab: 'overview' | 'product_lab' | 'analytics_quant' = 'product_lab'; // Default matches original state
  if (tabParam === 'overview') workTab = 'overview';
  else if (tabParam === 'product-lab') workTab = 'product_lab';
  else if (tabParam === 'analytics-quant') workTab = 'analytics_quant';

  return (
    <main className="min-h-screen h-full w-full overflow-hidden relative bg-surface select-none">
      {/* STICKY HEADER */}
      <header className="fixed top-0 left-0 w-full h-16 bg-surface-raised backdrop-blur-2xl border-b border-hairline z-50 flex items-center justify-between px-4 sm:px-10">
        <Link
          href="/"
          scroll={false}
          className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase select-none text-transparent bg-clip-text bg-gradient-to-r from-ink to-accent cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
        >
          THARUN GAJULA
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/blog"
            scroll={false}
            className={cn(
              "text-xs sm:text-xs font-mono tracking-[0.2em] transition-colors uppercase cursor-pointer whitespace-nowrap shrink-0",
              activeTab === 'blog' ? "text-accent font-bold" : "text-ink-muted hover:text-accent font-medium"
            )}
          >
            BLOG
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 text-ink-muted hover:text-accent transition-colors rounded-full cursor-pointer focus:outline-none shrink-0"
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

      {/* 3D BACKGROUND / VIEW LAYER */}
      <div className={cn(
        "absolute inset-0 z-0",
        activeTab === 'thesis' ? "fixed inset-0 overflow-hidden touch-none" : "overflow-y-auto no-scrollbar scroll-smooth pt-24 pb-36 sm:pb-32"
      )}>
        {children}
      </div>

      {/* WORK VIEW TOGGLE — sleek 3-Tab glassmorphic selector visible only on WORK tab */}
      {activeTab === 'neural' && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[55] flex items-center bg-surface-raised backdrop-blur-2xl border border-hairline rounded-full p-1 w-[92%] sm:w-auto max-w-[440px] justify-between shadow-lg"
        >
          <Link
            href="/work?tab=overview"
            scroll={false}
            className={cn(
              "text-[11px] sm:text-[10px] font-mono tracking-wider sm:tracking-widest px-2.5 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer uppercase whitespace-nowrap text-center flex-1 sm:flex-none",
              workTab === 'overview' ? "bg-surface-sunken text-accent font-bold border border-hairline-faint" : "text-ink-muted hover:text-ink font-medium"
            )}
          >
            Overview
          </Link>
          <Link
            href="/work?tab=product-lab"
            scroll={false}
            className={cn(
              "text-[11px] sm:text-[10px] font-mono tracking-wider sm:tracking-widest px-2.5 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer uppercase whitespace-nowrap text-center flex-1 sm:flex-none",
              workTab === 'product_lab' ? "bg-surface-sunken text-accent font-bold border border-hairline-faint" : "text-ink-muted hover:text-ink font-medium"
            )}
          >
            Product Lab
          </Link>
          <Link
            href="/work?tab=analytics-quant"
            scroll={false}
            className={cn(
              "text-[11px] sm:text-[10px] font-mono tracking-wider sm:tracking-widest px-2.5 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer uppercase whitespace-nowrap text-center flex-1 sm:flex-none",
              workTab === 'analytics_quant' ? "bg-surface-sunken text-accent font-bold border border-hairline-faint" : "text-ink-muted hover:text-ink font-medium"
            )}
          >
            Analytics<span className="hidden sm:inline"> & Quant</span>
          </Link>
        </div>
      )}

      {/* SPLINE LOGO MASKING ENGINE (Floating Pill Style — High Z-Index to sit above Spline watermark) */}
      <div className="fixed bottom-5 right-5 hidden md:flex z-[80] bg-surface-raised backdrop-blur-2xl border border-hairline px-8 py-3 rounded-full items-center gap-3 select-none pointer-events-none shadow-2xl min-w-[200px] justify-center">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-[10px] text-ink-muted font-mono tracking-[0.4em] uppercase font-medium">SYSTEM: ONLINE</span>
      </div>

      {/* BOTTOM NAV DOCK */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] h-14 bg-surface-raised backdrop-blur-2xl border border-hairline rounded-full flex items-center justify-center px-3 sm:px-4 z-[70] shadow-[0_15px_35px_rgba(15,23,42,0.12)] dark:shadow-2xl pointer-events-auto">
        {/* Link Container */}
        <div className="flex items-center justify-around w-full max-w-[380px]">
          <Link
            href={activeTab === 'neural' ? "/" : "/work"}
            scroll={false}
            className={cn(
              "text-xs sm:text-xs font-mono tracking-widest transition-all uppercase flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full whitespace-nowrap",
              activeTab === 'neural' 
                ? "text-accent font-bold bg-accent-glow/50 border border-accent-dim/40 dark:bg-accent-glow/20" 
                : "text-ink-muted hover:text-accent font-medium"
            )}
          >
            <span className="text-accent/70 font-semibold">//</span> WORK
          </Link>
          <Link
            href="/story"
            scroll={false}
            className={cn(
              "text-xs sm:text-xs font-mono tracking-widest transition-all uppercase flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full whitespace-nowrap",
              activeTab === 'evolution' 
                ? "text-accent font-bold bg-accent-glow/50 border border-accent-dim/40 dark:bg-accent-glow/20" 
                : "text-ink-muted hover:text-accent font-medium"
            )}
          >
            <span className="text-accent/70 font-semibold">//</span> STORY
          </Link>
          <Link
            href="/connect"
            scroll={false}
            className={cn(
              "text-xs sm:text-xs font-mono tracking-widest transition-all uppercase flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full whitespace-nowrap",
              activeTab === 'connect' 
                ? "text-accent font-bold bg-accent-glow/50 border border-accent-dim/40 dark:bg-accent-glow/20" 
                : "text-ink-muted hover:text-accent font-medium"
            )}
          >
            <span className="text-accent/70 font-semibold">//</span> CONNECT
          </Link>
        </div>
      </div>

      {/* AI CHAT PANEL */}
      <AIChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* SUBTLE SCANLINE EFFECT (Dark Mode Only) */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-0 dark:opacity-20 transition-opacity duration-300" />
    </main>
  );
}
