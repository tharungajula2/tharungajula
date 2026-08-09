"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLayout } from "./LayoutContext";
import AIChatPanel from "@/components/ui/AIChatPanel";
import SearchModal from "@/components/notebook/SearchModal";

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

  // Check if current route is a notebook route (or child of /notebook)
  const isNotebookRoute = pathname === '/notebook' || pathname.startsWith('/notebook/');

  // Map route pathname to activeTab name
  let activeTab: 'thesis' | 'neural' | 'evolution' | 'connect' | 'notebook' = 'thesis';
  if (pathname === '/work') activeTab = 'neural';
  else if (pathname === '/story') activeTab = 'evolution';
  else if (pathname === '/connect') activeTab = 'connect';
  else if (isNotebookRoute) activeTab = 'notebook';

  // Map workTab from query parameters
  const tabParam = searchParams.get('tab');
  let workTab: 'overview' | 'product_lab' | 'analytics_quant' = 'product_lab';
  if (tabParam === 'overview') workTab = 'overview';
  else if (tabParam === 'product-lab') workTab = 'product_lab';
  else if (tabParam === 'analytics-quant') workTab = 'analytics_quant';

  const [hideChrome, setHideChrome] = useState(false);

  useEffect(() => {
    if (!isNotebookRoute || typeof window === 'undefined') {
      setHideChrome(false);
      return;
    }

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 20) {
        setHideChrome(false);
      } else if (currentScrollY > lastScrollY + 8) {
        setHideChrome(true);
      } else if (currentScrollY < lastScrollY - 8) {
        setHideChrome(false);
      }
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isNotebookRoute]);

  return (
    <main className={cn(
      "w-full relative bg-surface select-none",
      isNotebookRoute ? "min-h-screen" : "min-h-screen h-full overflow-hidden"
    )}>
      {/* STICKY HEADER (Hides on scroll down on /notebook routes) */}
      <header className={cn(
        "fixed top-0 left-0 w-full h-16 bg-surface-raised backdrop-blur-2xl border-b border-hairline z-50 flex items-center justify-between px-4 sm:px-10 transition-transform duration-300 motion-reduce:transition-none",
        isNotebookRoute && hideChrome && "-translate-y-full"
      )}>
        {/* LEFT GROUP: BRAND WORDMARK */}
        <Link
          href="/"
          scroll={false}
          className="min-h-[44px] min-w-[44px] flex items-center text-sm sm:text-base font-bold tracking-[0.2em] uppercase select-none text-transparent bg-clip-text bg-gradient-to-r from-ink to-accent cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-lg"
        >
          THARUN GAJULA
        </Link>

        {/* RIGHT GROUP: SECTION LABEL, SEARCH BUTTON, THEME TOGGLE */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* 1. SECTION LABEL (HIDDEN BELOW 400px) */}
          <Link
            href="/notebook"
            scroll={false}
            className={cn(
              "inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-2 text-xs font-mono tracking-[0.15em] sm:tracking-[0.2em] transition-colors uppercase cursor-pointer whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-lg",
              activeTab === 'notebook' ? "text-accent font-bold" : "text-ink-muted hover:text-accent font-medium"
            )}
          >
            NOTEBOOK
          </Link>

          {/* 2. SEARCH BUTTON (PERMANENT DOM NODE TO PREVENT AUTO-FOCUS ON NAVIGATION) */}
          <div className={cn(isNotebookRoute ? "block" : "hidden")}>
            <SearchModal />
          </div>

          {/* 3. THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-muted hover:text-accent transition-colors rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none shrink-0"
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
        "z-0",
        isNotebookRoute 
          ? "relative w-full min-w-0 pt-20 sm:pt-24 pb-[var(--dock-clearance)] px-4 sm:px-10" 
          : activeTab === 'thesis' 
            ? "fixed inset-0 overflow-hidden touch-none" 
            : "absolute inset-0 overflow-y-auto no-scrollbar scroll-smooth pt-24 pb-36 sm:pb-32"
      )}>
        {children}
      </div>

      {/* WORK VIEW TOGGLE */}
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

      {/* SPLINE LOGO MASKING ENGINE */}
      <div className="fixed bottom-5 right-5 hidden md:flex z-[80] bg-surface-raised backdrop-blur-2xl border border-hairline px-8 py-3 rounded-full items-center gap-3 select-none pointer-events-none shadow-2xl min-w-[200px] justify-center">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-[10px] text-ink-muted font-mono tracking-[0.4em] uppercase font-medium">SYSTEM: ONLINE</span>
      </div>

      {/* BOTTOM NAV DOCK (Hides on scroll down on /notebook routes) */}
      <div className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] h-14 bg-surface-raised backdrop-blur-2xl border border-hairline rounded-full flex items-center justify-center px-3 sm:px-4 z-[70] shadow-[0_15px_35px_rgba(15,23,42,0.12)] dark:shadow-2xl pointer-events-auto transition-transform duration-300 motion-reduce:transition-none",
        isNotebookRoute && hideChrome && "translate-y-[200%]"
      )}>
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
