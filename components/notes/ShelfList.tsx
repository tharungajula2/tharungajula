'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { DocumentMeta, ContentFormat } from '@/lib/notes/markdown';

interface ShelfListProps {
  documents: DocumentMeta[];
}

function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const dayNum = parseInt(parts[2], 10);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (isNaN(monthIdx) || isNaN(dayNum) || monthIdx < 0 || monthIdx > 11) return dateStr;
  return `${dayNum} ${months[monthIdx]} ${year}`;
}

const SECTION_ORDER: { key: ContentFormat; title: string }[] = [
  { key: 'masterclass', title: 'Masterclass' },
  { key: 'article', title: 'Article' },
];

export function ShelfList({ documents }: ShelfListProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter documents by search query
  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) return documents;
    const q = searchQuery.toLowerCase().trim();
    return documents.filter((doc) => {
      const matchesTitle = doc.title.toLowerCase().includes(q);
      const matchesDesc = doc.description.toLowerCase().includes(q);
      const matchesTags = doc.tags?.some((t) => t.toLowerCase().includes(q));
      return matchesTitle || matchesDesc || matchesTags;
    });
  }, [documents, searchQuery]);

  // Group live documents by format: Masterclass, Article
  const sections = useMemo(() => {
    return SECTION_ORDER.map(({ key, title }) => {
      const sectionDocs = filteredDocuments
        .filter((doc) => doc.format === key)
        .sort((a, b) => b.updated.localeCompare(a.updated));
      return {
        key,
        title,
        docs: sectionDocs,
      };
    }).filter((section) => section.docs.length > 0);
  }, [filteredDocuments]);

  return (
    <div className="space-y-8 min-w-0">
      {/* Optional Search Control */}
      <div className="relative w-full max-w-xs flex items-center">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 min-h-[44px] text-xs bg-background border border-border rounded-md text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-2 text-xs font-medium text-muted hover:text-foreground px-2 py-1.5 min-h-[44px] flex items-center"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>

      {/* Grouped Document Sections */}
      {sections.length === 0 ? (
        <div className="py-12 text-center text-xs text-muted">
          No notes found matching &quot;{searchQuery}&quot;.
        </div>
      ) : (
        sections.map((section) => (
          <section key={section.key} className="space-y-3 min-w-0">
            {/* Section Heading */}
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted/70 pb-2 border-b border-border/40">
              {section.title}
            </h2>

            {/* Document Links within Section */}
            <div className="divide-y divide-border/30">
              {section.docs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/${doc.slug}`}
                  className="group block min-h-[44px] py-3.5 px-2 -mx-2 rounded-lg transition-colors hover:bg-black/5 active:bg-black/10 flex flex-col justify-center"
                >
                  <h3 className="text-base font-medium tracking-tight text-foreground leading-snug mb-1">
                    {doc.title}
                  </h3>

                  {doc.description && (
                    <p className="text-xs text-muted line-clamp-2 leading-relaxed mb-2">
                      {doc.description}
                    </p>
                  )}

                  <div className="text-xs text-muted/70 flex flex-wrap items-center gap-x-2 gap-y-1 font-medium">
                    <span>{doc.readTime}</span>
                    {doc.updated && (
                      <>
                        <span>&middot;</span>
                        <span>{formatDateDisplay(doc.updated)}</span>
                      </>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
