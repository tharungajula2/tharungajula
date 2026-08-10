'use client';

import { Search as SearchIcon } from 'lucide-react';

export default function HeroSearchButton() {
  const handleOpenSearch = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-notebook-search'));
    }
  };

  return (
    <button
      onClick={handleOpenSearch}
      className="flex items-center gap-2.5 py-2.5 px-4 rounded-xl border border-hairline bg-surface-raised hover:border-accent/60 text-ink-muted hover:text-accent transition-all font-mono text-xs cursor-pointer shadow-sm w-full sm:w-auto"
      aria-label="Search notebook"
    >
      <SearchIcon className="w-4 h-4 text-accent shrink-0" />
      <span className="truncate">Search notes, decks &amp; case studies...</span>
      <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-ink-faint bg-surface-sunken border border-hairline rounded ml-2">
        ⌘K
      </kbd>
    </button>
  );
}
