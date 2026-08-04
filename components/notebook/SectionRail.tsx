'use client';

import { useEffect, useState } from 'react';
import { HeadingItem } from '@/lib/notes';
import { cn } from '@/lib/utils';

interface SectionRailProps {
  headings: HeadingItem[];
}

export default function SectionRail({ headings }: SectionRailProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length || typeof window === 'undefined') return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside aria-label="Chapter contents" className="hidden xl:block w-64 shrink-0 pointer-events-auto select-none">
      <div className="sticky top-28 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
        <div className="text-[10px] font-mono tracking-[0.3em] text-ink-faint uppercase font-semibold border-b border-hairline-faint pb-2">
          // SECTION RAIL
        </div>

        <nav aria-label="On this page" className="space-y-2">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={cn(
                "block text-xs font-mono transition-colors leading-relaxed truncate",
                activeId === h.id
                  ? "text-accent font-bold pl-2 border-l-2 border-accent"
                  : "text-ink-muted hover:text-ink pl-2 border-l-2 border-transparent"
              )}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
