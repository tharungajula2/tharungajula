'use client';

import { useEffect } from 'react';

interface ReadingTrackerProps {
  trackSlug: string;
  volumeFolder: string;
  chapterSlug: string;
  title: string;
  trackLabel: string;
}

export default function ReadingTracker({
  trackSlug,
  volumeFolder,
  chapterSlug,
  title,
  trackLabel,
}: ReadingTrackerProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const data = {
        trackSlug,
        volumeFolder,
        chapterSlug,
        title,
        trackLabel,
        url: `/notebook/library/${trackSlug}/${volumeFolder}/${chapterSlug}`,
        timestamp: Date.now(),
      };
      localStorage.setItem('lastReadChapter', JSON.stringify(data));
    } catch {}
  }, [trackSlug, volumeFolder, chapterSlug, title, trackLabel]);

  return null;
}
