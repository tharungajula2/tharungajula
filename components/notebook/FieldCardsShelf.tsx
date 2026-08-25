'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FIELD_CARDS } from '@/lib/field-cards';

type CategoryFilter = 'ALL' | 'finance-risk' | 'ai-engineering' | 'cheatsheets';

const CATEGORY_TABS: { label: string; value: CategoryFilter }[] = [
  { label: 'ALL CARDS', value: 'ALL' },
  { label: 'FINANCE & RISK', value: 'finance-risk' },
  { label: 'AI & ENGINEERING', value: 'ai-engineering' },
  { label: 'CHEATSHEETS', value: 'cheatsheets' },
];

export default function FieldCardsShelf() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>('ALL');

  const filteredCards = FIELD_CARDS.filter((card) => {
    if (activeTab === 'ALL') return true;
    return card.categorySlug === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-hairline pb-3">
        {CATEGORY_TABS.map((tab) => {
          const count =
            tab.value === 'ALL'
              ? FIELD_CARDS.length
              : FIELD_CARDS.filter((c) => c.categorySlug === tab.value).length;
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-accent text-surface font-bold shadow-md'
                  : 'bg-surface-raised text-ink-muted border border-hairline hover:border-accent/40 hover:text-ink'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                  isActive ? 'bg-surface/20 text-surface' : 'bg-surface-sunken text-ink-faint'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map((pack) => (
          <article
            key={pack.id}
            className="group relative flex flex-col justify-between p-5 rounded-xl bg-surface-raised backdrop-blur-xl border border-hairline hover:border-accent/50 shadow-sm transition-all duration-200 overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent group-hover:via-accent transition-all" />

            <div>
              {/* HEADER META */}
              <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent font-semibold">
                <span>{pack.category}</span>
                <span className="text-ink-faint text-[9px] font-mono uppercase">{pack.packNumber}</span>
              </div>

              {/* TITLE */}
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-ink mb-2 group-hover:text-accent transition-colors">
                {pack.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-ink-muted text-xs leading-relaxed mb-4 font-sans line-clamp-3">
                {pack.description}
              </p>
            </div>

            <div>
              {/* TAGS */}
              <div className="flex flex-wrap gap-1 mb-4">
                {pack.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[9px] font-mono tracking-wide uppercase bg-surface-sunken text-ink-muted border border-hairline-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* FOOTER & CTA */}
              <div className="flex items-center justify-between pt-3 border-t border-hairline-faint font-mono text-xs gap-2">
                <span className="text-ink-faint text-[10px] uppercase tracking-wider">
                  STANDALONE NOTE
                </span>
                <Link
                  href={pack.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-accent/10 text-accent border border-accent/30 font-bold uppercase tracking-wider text-[11px] hover:bg-accent hover:text-surface transition-all whitespace-nowrap"
                >
                  Open Field Card →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
