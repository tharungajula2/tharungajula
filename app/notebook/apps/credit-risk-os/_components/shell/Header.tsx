"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCreditRiskOS } from '../../_state/creditRiskOSContext';
import { Play, Search, BookOpen, Sun, Moon } from 'lucide-react';

export default function Header() {
  const { activeSection, isSidebarCollapsed, setIsSidebarCollapsed } = useCreditRiskOS();
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

  return (
    <header className="h-14 bg-surface-raised border-b border-hairline px-4 flex items-center justify-between z-40 select-none">
      {/* LEFT: COLLAPSE TOGGLE + BRAND & APP IDENTITY */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-1.5 rounded-lg border border-hairline-faint text-ink-muted hover:text-accent hover:border-accent/40 transition-colors text-xs font-mono cursor-pointer"
          title="Toggle Navigation Sidebar"
        >
          {isSidebarCollapsed ? '☰' : '✕'}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-sm bg-accent animate-pulse" />
          <span className="font-mono text-sm font-bold tracking-wider text-ink uppercase">
            RENFORGE BANK <span className="text-accent">plc</span>
          </span>
          <span className="text-hairline-faint mx-1 font-mono text-xs hidden sm:inline">|</span>
          <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 font-semibold uppercase hidden sm:inline-block">
            SIMULATION DATE: 31 JULY 2026
          </span>
        </div>
      </div>

      {/* CENTER: GLOBAL ACTION TOOLS (DEMO, SEARCH, LEARN, THEME) */}
      <div className="flex items-center gap-1.5 font-mono text-xs">
        {/* GUIDED DEMO */}
        <button
          onClick={() => alert('Guided Masterclass Demo will open in Prompt 10.')}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-accent/15 text-accent border border-accent/30 font-bold uppercase tracking-wider hover:bg-accent hover:text-surface transition-all cursor-pointer shadow-sm text-[11px]"
        >
          <Play className="w-3 h-3 fill-current" />
          <span className="hidden md:inline">GUIDED DEMO</span>
        </button>

        {/* SEARCH */}
        <button
          onClick={() => alert('Global Search Palette will launch in Prompt 11.')}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-sunken hover:bg-surface-raised text-ink-muted hover:text-accent border border-hairline-faint font-semibold uppercase text-[11px] transition-colors cursor-pointer"
        >
          <Search className="w-3 h-3" />
          <span className="hidden md:inline">SEARCH</span>
        </button>

        {/* LEARN */}
        <button
          onClick={() => alert('Contextual Learn Drawer will open in Prompt 11.')}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-sunken hover:bg-surface-raised text-ink-muted hover:text-accent border border-hairline-faint font-semibold uppercase text-[11px] transition-colors cursor-pointer"
        >
          <BookOpen className="w-3 h-3" />
          <span className="hidden md:inline">LEARN</span>
        </button>

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-1.5 rounded-lg bg-surface-sunken hover:bg-surface-raised text-ink-muted hover:text-accent border border-hairline-faint transition-colors cursor-pointer"
          title="Toggle Dark / Light Theme"
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-accent" /> : <Moon className="w-3.5 h-3.5 text-accent" />}
        </button>
      </div>

      {/* RIGHT: BACK TO NOTEBOOK CONTROL */}
      <div className="flex items-center gap-3">
        <Link
          href="/notebook"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-sunken hover:bg-surface-raised text-ink-muted hover:text-ink border border-hairline-faint font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
        >
          <span>←</span>
          <span className="hidden sm:inline">Back to Notebook</span>
        </Link>
      </div>
    </header>
  );
}
