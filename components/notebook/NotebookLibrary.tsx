'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { KnowledgeItem, MajorCategory } from '@/lib/knowledge';

type FormatFilter = 'ALL' | 'field_card' | 'manual';
type DomainFilter = 'ALL' | MajorCategory;

interface NotebookLibraryProps {
  items: KnowledgeItem[];
}

export default function NotebookLibrary({ items }: NotebookLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState<FormatFilter>('ALL');
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('ALL');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Format filter
      if (formatFilter !== 'ALL' && item.type !== formatFilter) {
        return false;
      }
      // 2. Domain filter
      if (domainFilter !== 'ALL' && item.category !== domainFilter) {
        return false;
      }
      // 3. Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(q);
        const matchesFormat = item.formatLabel.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesPath = item.relativePath.toLowerCase().includes(q);
        return matchesTitle || matchesCategory || matchesFormat || matchesDesc || matchesPath;
      }
      return true;
    });
  }, [items, searchQuery, formatFilter, domainFilter]);

  const domainOptions: { label: string; value: DomainFilter }[] = [
    { label: 'All Domains', value: 'ALL' },
    { label: 'Finance & Risk', value: 'finance-risk' },
    { label: 'AI / Data / Tech', value: 'ai-data-tech' },
    { label: 'Business / Product', value: 'business-product' },
    { label: 'General Reference', value: 'general-reference' },
  ];

  return (
    <div className="space-y-8">
      {/* SEARCH AND FILTERS */}
      <div className="space-y-4 bg-surface-raised p-4 sm:p-6 rounded-2xl border border-hairline shadow-sm">
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by title, domain, format or keyword..."
            className="w-full px-4 py-3 bg-surface-sunken border border-hairline rounded-xl text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent font-sans transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-ink-muted hover:text-ink px-2 py-1"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Filters Grid */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-hairline-faint text-xs font-mono">
          {/* Format Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-ink-faint uppercase text-[10px] tracking-wider mr-1">Format:</span>
            {[
              { label: 'ALL', value: 'ALL' as FormatFilter },
              { label: 'FIELD CARDS', value: 'field_card' as FormatFilter },
              { label: 'MANUALS', value: 'manual' as FormatFilter },
            ].map((tab) => {
              const isActive = formatFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setFormatFilter(tab.value)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-accent text-surface font-bold shadow-sm'
                      : 'bg-surface text-ink-muted border border-hairline hover:text-ink hover:border-accent/40'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Domain Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-ink-faint uppercase text-[10px] tracking-wider mr-1">Domain:</span>
            {domainOptions.map((opt) => {
              const isActive = domainFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setDomainFilter(opt.value)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-accent text-surface font-bold shadow-sm'
                      : 'bg-surface text-ink-muted border border-hairline hover:text-ink hover:border-accent/40'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RESULTS LIST / EMPTY STATE */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 px-6 bg-surface-raised/50 border border-hairline border-dashed rounded-2xl">
          <div className="text-accent font-mono text-xs uppercase tracking-widest mb-2 font-bold">
            {'// LIBRARY EMPTY'}
          </div>
          <h3 className="text-xl font-bold uppercase text-ink mb-2">No notes yet.</h3>
          <p className="text-sm text-ink-muted max-w-md mx-auto font-sans leading-relaxed">
            New Field Cards and Mastery Manuals will appear here automatically when added to canonical domain folders.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-surface-raised border border-hairline hover:border-accent/50 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* META BAR */}
                <div className="flex items-center justify-between gap-2 mb-3 font-mono text-[10px] uppercase tracking-wider">
                  <span className="px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold border border-accent/20">
                    {item.formatLabel}
                  </span>
                  <span className="text-ink-muted font-medium">{item.categoryLabel}</span>
                </div>

                {/* TITLE */}
                <h3 className="text-lg sm:text-xl font-bold text-ink mb-2 tracking-tight group-hover:text-accent transition-colors">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-ink-muted text-xs leading-relaxed mb-4 font-sans line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* FOOTER & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-hairline-faint font-mono text-xs gap-2">
                <span className="text-ink-faint text-[10px] uppercase tracking-wider truncate">
                  {item.relativePath}
                </span>

                {item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface text-ink border border-hairline font-bold uppercase tracking-wider text-[11px] hover:border-accent hover:text-accent transition-all whitespace-nowrap"
                  >
                    Open on GitHub ↗
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-accent text-surface font-bold uppercase tracking-wider text-[11px] hover:opacity-90 transition-all shadow-sm whitespace-nowrap"
                  >
                    Open Field Card →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
