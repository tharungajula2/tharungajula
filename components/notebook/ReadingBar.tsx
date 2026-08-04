'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, List, Sun, Moon } from 'lucide-react';

interface NoteSectionItem {
  title: string;
  slug: string;
}

interface ReadingBarProps {
  noteTitle: string;
  noteSlug: string;
  currentSectionSlug: string;
  sections: NoteSectionItem[];
  currentIndex: number;
  totalSections: number;
}

export default function ReadingBar({
  noteTitle,
  noteSlug,
  currentSectionSlug,
  sections,
  currentIndex,
  totalSections,
}: ReadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const p = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setProgress(p);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
    <>
      {/* COMPACT SECTION READING HEADER BAR */}
      <div className="mb-6 py-2 px-3 sm:px-4 rounded-xl border border-hairline bg-surface-raised backdrop-blur-md flex items-center justify-between gap-2 sm:gap-3 font-mono text-xs shadow-sm select-none">
        {/* 1. BACK TO NOTE */}
        <Link
          href={`/notebook/notes/${noteSlug}`}
          className="text-accent hover:underline uppercase tracking-wider font-semibold truncate max-w-[90px] sm:max-w-[240px] shrink"
          title={noteTitle}
        >
          ← {noteTitle}
        </Link>

        {/* 2. PROGRESS DISPLAY (NEVER WRAPS) */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-ink-muted shrink-0 whitespace-nowrap font-bold text-ink text-[11px] sm:text-xs">
          <span>§{currentIndex + 1} of {totalSections}</span>
          <span className="hidden sm:inline text-ink-muted">·</span>
          <span className="hidden sm:inline text-accent">{progress}% READ</span>
        </div>

        {/* 3. MOBILE SHEET JUMP TRIGGER & THEME TOGGLE */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {sections.length > 0 && (
            <button
              onClick={() => setIsSheetOpen(true)}
              className="py-1 px-2.5 rounded border border-hairline bg-surface-sunken text-ink hover:text-accent hover:border-accent transition-colors flex items-center gap-1.5 uppercase font-semibold text-[11px] whitespace-nowrap cursor-pointer"
            >
              <List className="w-3.5 h-3.5" />
              <span>SECTIONS</span>
            </button>
          )}

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 text-ink-muted hover:text-accent transition-colors rounded-lg focus:outline-none cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* MOBILE SECTION JUMP SHEET MODAL */}
      {isSheetOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-h-[80vh] bg-surface border-t border-hairline rounded-t-2xl p-5 overflow-y-auto font-sans flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-hairline mb-4">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-accent uppercase font-bold block mb-1">
                  // JUMP TO SECTION
                </span>
                <h3 className="text-sm font-bold uppercase tracking-tight text-ink">
                  {noteTitle} ({totalSections} Sections)
                </h3>
              </div>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="p-1 rounded-lg border border-hairline text-ink-muted hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5 overflow-y-auto">
              {sections.map((sec, idx) => {
                const isCurrent = sec.slug === currentSectionSlug;
                return (
                  <Link
                    key={sec.slug}
                    href={`/notebook/notes/${noteSlug}/${sec.slug}`}
                    onClick={() => setIsSheetOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono transition-all ${
                      isCurrent
                        ? 'border-accent bg-accent-glow/20 text-accent font-bold'
                        : 'border-hairline bg-surface-raised text-ink-muted hover:text-ink hover:border-hairline-faint'
                    }`}
                  >
                    <span className="truncate pr-2">
                      §{idx + 1} {sec.title}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] uppercase tracking-wider text-signal font-bold shrink-0">
                        READING
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
