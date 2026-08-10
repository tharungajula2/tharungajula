'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, List, Sun, Moon, CheckCircle2 } from 'lucide-react';

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
      {/* LUXURY GLASS READING HEADER BAR */}
      <div className="mb-6 py-2.5 px-3.5 sm:px-5 rounded-2xl border border-hairline bg-surface-raised/90 backdrop-blur-xl flex items-center justify-between gap-2 sm:gap-4 font-mono text-xs shadow-sm select-none">
        {/* 1. BACK TO NOTE */}
        <Link
          href={`/notebook/notes/${noteSlug}`}
          className="text-accent hover:underline uppercase tracking-wider font-bold truncate max-w-[100px] sm:max-w-[260px] shrink"
          title={noteTitle}
        >
          ← {noteTitle}
        </Link>

        {/* 2. PROGRESS DISPLAY */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap font-bold text-ink text-[11px] sm:text-xs">
          <span>§{currentIndex + 1} of {totalSections}</span>
          <span className="hidden sm:inline text-ink-muted">·</span>
          <span className="hidden sm:inline text-accent">{progress}% READ</span>
        </div>

        {/* 3. SECTIONS DRAWER TRIGGER & THEME TOGGLE */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {sections.length > 0 && (
            <button
              onClick={() => setIsSheetOpen(true)}
              className="py-1 px-3 rounded-xl bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-surface transition-all flex items-center gap-1.5 uppercase font-bold text-[11px] whitespace-nowrap cursor-pointer shadow-sm"
            >
              <List className="w-3.5 h-3.5" />
              <span>SECTIONS</span>
            </button>
          )}

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 text-ink-muted hover:text-accent transition-colors rounded-xl focus:outline-none cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* LUXURY GLASS SECTIONS DRAWER MODAL */}
      {isSheetOpen && (
        <div 
          className="fixed inset-0 z-[120] flex flex-col justify-end sm:justify-center items-center bg-black/75 backdrop-blur-md p-0 sm:p-4"
          onClick={() => setIsSheetOpen(false)}
        >
          <div 
            className="w-full max-w-xl max-h-[82vh] bg-surface border-t border-hairline sm:border sm:rounded-2xl rounded-t-3xl p-5 sm:p-6 overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom-5 duration-200 font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* DRAWER HEADER */}
            <div className="flex items-center justify-between pb-3.5 border-b border-hairline mb-4 shrink-0">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-accent uppercase font-bold block mb-1">
                  // SECTIONS INDEX
                </span>
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-ink">
                  {noteTitle} ({totalSections} Sections)
                </h3>
              </div>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="p-1.5 rounded-xl border border-hairline bg-surface-raised text-ink-muted hover:text-ink hover:border-accent transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SECTIONS LIST */}
            <div className="space-y-2 overflow-y-auto pr-1">
              {sections.map((sec, idx) => {
                const isCurrent = sec.slug === currentSectionSlug;
                const cleanSecTitle = sec.title
                  .replace(/\*\*([^*]+)\*\*/g, '$1')
                  .replace(/\[(CORE|WORKING|DEEPER|RETURN HERE)\]/gi, '');

                return (
                  <Link
                    key={sec.slug}
                    href={`/notebook/notes/${noteSlug}/${sec.slug}`}
                    onClick={() => setIsSheetOpen(false)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-accent bg-accent/10 text-accent font-bold shadow-sm'
                        : 'border-hairline bg-surface-raised text-ink-muted hover:text-ink hover:border-accent/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <span className="text-ink-faint font-semibold shrink-0">
                        §{String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="truncate">{cleanSecTitle}</span>
                    </div>

                    {isCurrent && (
                      <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-accent font-bold shrink-0 bg-accent/20 px-2 py-0.5 rounded-full border border-accent/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
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
