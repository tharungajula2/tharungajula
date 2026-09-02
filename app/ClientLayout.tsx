"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
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
  let activeTab: 'home' | 'profile' | 'agent' | 'connect' = 'home';
  if (pathname === '/profile') activeTab = 'profile';
  else if (pathname === '/agent') activeTab = 'agent';
  else if (pathname === '/connect') activeTab = 'connect';

  return (
    <main className="w-full relative bg-surface select-none min-h-screen h-full overflow-hidden">
      {/* STICKY HEADER */}
      <header className="fixed top-0 left-0 w-full h-16 bg-surface-raised backdrop-blur-2xl border-b border-hairline z-50 flex items-center justify-between px-4 sm:px-10">
        {/* LEFT GROUP: BRAND WORDMARK */}
        <Link
          href="/"
          scroll={false}
          className="min-h-[44px] flex items-center text-xs sm:text-base font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase select-none text-transparent bg-clip-text bg-gradient-to-r from-ink to-accent cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-lg"
        >
          THARUN GAJULA
        </Link>

        {/* RIGHT GROUP: THEME TOGGLE */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
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

      {/* VIEW CONTAINER LAYER */}
      <div className={cn(
        "z-0",
        activeTab !== 'home'
          ? "absolute inset-0 overflow-y-auto no-scrollbar scroll-smooth pt-20 sm:pt-24 pb-[var(--dock-clearance)] px-3 sm:px-6"
          : "fixed inset-0 overflow-hidden touch-none"
      )}>
        {children}
      </div>

      {/* SPLINE LOGO MASKING ENGINE */}
      <div className="fixed bottom-5 right-5 hidden md:flex z-[80] bg-surface-raised backdrop-blur-2xl border border-hairline px-8 py-3 rounded-full items-center gap-3 select-none pointer-events-none shadow-2xl min-w-[200px] justify-center">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-[10px] text-ink-muted font-mono tracking-[0.4em] uppercase font-medium">SYSTEM: ONLINE</span>
      </div>

      {/* BOTTOM NAV DOCK */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] h-14 bg-surface-raised backdrop-blur-2xl border border-hairline rounded-full flex items-center justify-center px-3 sm:px-4 z-[70] shadow-[0_15px_35px_rgba(15,23,42,0.12)] dark:shadow-2xl pointer-events-auto">
        <div className="flex items-center justify-around w-full max-w-[380px]">
          <Link
            href="/profile"
            scroll={false}
            className={cn(
              "text-xs sm:text-xs font-mono tracking-widest transition-all uppercase flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full whitespace-nowrap",
              activeTab === 'profile' 
                ? "text-accent font-bold bg-accent-glow/50 border border-accent-dim/40 dark:bg-accent-glow/20" 
                : "text-ink-muted hover:text-accent font-medium"
            )}
          >
            <span className="text-accent/70 font-semibold">//</span> PROFILE
          </Link>
          <Link
            href="/agent"
            scroll={false}
            className={cn(
              "text-xs sm:text-xs font-mono tracking-widest transition-all uppercase flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full whitespace-nowrap",
              activeTab === 'agent' 
                ? "text-accent font-bold bg-accent-glow/50 border border-accent-dim/40 dark:bg-accent-glow/20" 
                : "text-ink-muted hover:text-accent font-medium"
            )}
          >
            <span className="text-accent/70 font-semibold">//</span> AGENT
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

      {/* SUBTLE SCANLINE EFFECT (Dark Mode Only) */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-0 dark:opacity-20 transition-opacity duration-300" />
    </main>
  );
}
