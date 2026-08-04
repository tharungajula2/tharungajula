'use client';

import { useRouter } from 'next/navigation';
import { Dices } from 'lucide-react';

interface RandomChapterButtonProps {
  chapters: { url: string }[];
}

export default function RandomChapterButton({ chapters }: RandomChapterButtonProps) {
  const router = useRouter();

  const handleRandom = () => {
    if (!chapters || chapters.length === 0) return;
    const randomIndex = Math.floor(Math.random() * chapters.length);
    const targetUrl = chapters[randomIndex].url;
    router.push(targetUrl);
  };

  return (
    <button
      onClick={handleRandom}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-hairline bg-surface-sunken hover:border-accent text-ink-muted hover:text-accent font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
    >
      <Dices className="w-4 h-4 text-accent" />
      <span>Jump to Random Chapter</span>
    </button>
  );
}
