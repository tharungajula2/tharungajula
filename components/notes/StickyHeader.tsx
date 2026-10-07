'use client';

import React, { useEffect, useState } from 'react';
import { Mark } from '@/components/notes/Mark';

interface StickyHeaderProps {
  headerRef: React.RefObject<HTMLDivElement | null>;
}

export function StickyHeader({ headerRef }: StickyHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [headerRef]);

  const handleSearchFocus = () => {
    const inputEl = document.querySelector<HTMLInputElement>('input[type="text"]');
    if (inputEl) {
      inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      inputEl.focus();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border px-4 py-2.5 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-2 min-w-0">
        <Mark className="h-5 w-auto text-foreground shrink-0" />
        <span className="text-sm font-sans font-medium text-foreground tracking-wide truncate">
          Tharun Gajula
        </span>
      </div>

      <button
        type="button"
        onClick={handleSearchFocus}
        aria-label="Focus search input"
        className="p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-foreground hover:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}
