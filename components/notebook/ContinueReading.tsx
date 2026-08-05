'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LastReadData {
  title: string;
  trackLabel: string;
  url: string;
}

export default function ContinueReading() {
  const [lastRead, setLastRead] = useState<LastReadData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('lastReadChapter');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (
          parsed &&
          parsed.title &&
          parsed.url &&
          !parsed.url.includes('business-and-finance') &&
          !parsed.url.includes('retail-credit-risk-and-modelling')
        ) {
          setLastRead(parsed);
        } else {
          localStorage.removeItem('lastReadChapter');
        }
      }
    } catch {}
  }, []);

  if (!lastRead) return null;

  return (
    <div className="mb-8 p-4 rounded-xl border border-hairline bg-surface-raised backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-ink-muted uppercase">
          RESUME READING: <strong className="text-ink">{lastRead.trackLabel}</strong> · <span className="text-accent">{lastRead.title}</span>
        </span>
      </div>
      <Link
        href={lastRead.url}
        className="px-3 py-1.5 rounded-lg bg-surface-sunken border border-hairline text-accent font-bold uppercase hover:bg-accent hover:text-surface transition-all whitespace-nowrap"
      >
        Continue →
      </Link>
    </div>
  );
}
