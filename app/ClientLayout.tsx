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
      const isLight = document.documentElement.classList.contains('light');
      const handle = requestAnimationFrame(() => {
        setTheme(isLight ? 'light' : 'dark');
      });
      return () => cancelAnimationFrame(handle);
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

  const isConnect = pathname === '/connect';
  const isAgent = !isConnect;

  return (
    <main className="w-full relative bg-surface select-none min-h-screen h-full overflow-hidden">
      {/* HEADER NAVIGATION */}
      <header className="fixed top-0 left-0 w-full h-16 bg-surface-raised backdrop-blur-2xl border-b border-hairline z-50 flex items-center justify-between px-4 sm:px-10">
        {/* BRAND WORDMARK */}
        <Link
          href="/agent"
          scroll={false}
          className="min-h-[44px] flex items-center text-xs sm:text-base font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase select-none text-transparent bg-clip-text bg-gradient-to-r from-ink to-accent cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-lg"
        >
          THARUN GAJULA
        </Link>

        {/* NAVIGATION DESTINATIONS & THEME TOGGLE */}
        <div className="flex items-center gap-2 sm:gap-6 shrink-0">
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/agent"
              scroll={false}
              className={cn(
                "text-xs sm:text-sm font-medium transition-colors px-2.5 sm:px-3 py-1.5 rounded-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
                isAgent
                  ? "text-accent bg-accent-glow/20 font-semibold"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              Agent
            </Link>
            <Link
              href="/connect"
              scroll={false}
              className={cn(
                "text-xs sm:text-sm font-medium transition-colors px-2.5 sm:px-3 py-1.5 rounded-lg focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
                isConnect
                  ? "text-accent bg-accent-glow/20 font-semibold"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              Connect
            </Link>
          </nav>

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
      <div className="z-0 absolute inset-0 overflow-y-auto no-scrollbar scroll-smooth pt-20 sm:pt-24 pb-8 px-3 sm:px-6">
        {children}
      </div>
    </main>
  );
}
