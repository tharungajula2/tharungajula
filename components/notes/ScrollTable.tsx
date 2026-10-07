'use client';

import React, { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';

interface ScrollTableProps {
  children: React.ReactNode;
}

export function ScrollTable({ children }: ScrollTableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });

    const timer = setTimeout(checkScroll, 150);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative my-6 w-full max-w-full">
      <div
        ref={containerRef}
        className={clsx(
          "table-container w-full max-w-full overflow-x-auto touch-pan-x transition-all",
          canScrollRight && "has-scroll-right"
        )}
      >
        {children}
      </div>

      {/* Visual Cue Overlay for Off-Screen Content */}
      {canScrollRight && (
        <div
          className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/90 to-transparent pointer-events-none transition-opacity duration-300 lg:hidden flex items-center justify-end pr-1 text-muted/60"
          aria-hidden="true"
        >
          <span className="text-[10px] font-sans font-bold">❯</span>
        </div>
      )}
    </div>
  );
}
