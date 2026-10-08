'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { DocumentMeta } from '@/lib/notes/markdown';
import { SUBJECTS, SubjectId, SUBJECT_MAP, PRIMARY_TOPIC, TOPIC_ORDER } from '@/lib/notes/subjects';

interface HomeClientViewProps {
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

function formatTotalReadTime(docs: DocumentMeta[]): string {
  if (docs.length === 0) return '';
  const totalWords = docs.reduce((sum, d) => sum + (d.wordCount || 0), 0);
  const totalMins = Math.max(1, Math.ceil(totalWords / 225));
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h`;
  return `${mins}m`;
}

function formatSubjectStats(docs: DocumentMeta[]): string {
  if (docs.length === 0) return '0 notes';
  const mcCount = docs.filter((d) => d.format === 'masterclass').length;
  const artCount = docs.filter((d) => d.format === 'article').length;
  const parts: string[] = [];
  if (mcCount > 0) {
    parts.push(`${mcCount} masterclass${mcCount === 1 ? '' : 'es'}`);
  }
  if (artCount > 0) {
    parts.push(`${artCount} article${artCount === 1 ? '' : 's'}`);
  }
  const totalTime = formatTotalReadTime(docs);
  if (totalTime) {
    parts.push(totalTime);
  }
  return parts.join(' · ');
}

function stripMasterclassTitlePrefix(title: string): string {
  return title
    .replace(/^(Building with AI|The AI Stack)\s*—\s*/i, '')
    .replace(/^Volume\s+\d+[:—\s]*/i, '');
}

export function HomeClientView({ documents }: HomeClientViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'all' | SubjectId>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlSubj = params.get('subject');
      if (urlSubj && (TOPIC_ORDER as string[]).includes(urlSubj)) {
        return urlSubj as SubjectId;
      }
    }
    return 'all';
  });
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Manual toggle state overrides
  const [userToggles, setUserToggles] = useState<Partial<Record<SubjectId, boolean>>>({});

  // Compute active open state for each topic based on search/filter or manual toggles
  const openSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const result: Record<SubjectId, boolean> = {
      ai: true,
      finance: false,
      health: false,
      life: false,
    };

    if (q.length > 0) {
      TOPIC_ORDER.forEach((subjId) => {
        const subjDocs = documents.filter((d) => d.subject === subjId);
        const hasMatch = subjDocs.some((doc) => {
          const titleMatch = doc.title.toLowerCase().includes(q);
          const descMatch = doc.description.toLowerCase().includes(q);
          const tagMatch = doc.tags?.some((t) => t.toLowerCase().includes(q));
          const subjectName = SUBJECT_MAP[doc.subject]?.name || '';
          const subjectMatch = subjectName.toLowerCase().includes(q);
          return titleMatch || descMatch || tagMatch || subjectMatch;
        });
        result[subjId] = hasMatch;
      });
      return result;
    }

    if (selectedSubject !== 'all') {
      TOPIC_ORDER.forEach((subjId) => {
        result[subjId] = subjId === selectedSubject;
      });
      return result;
    }

    // Default state merged with user toggles
    TOPIC_ORDER.forEach((subjId) => {
      if (subjId in userToggles) {
        result[subjId] = Boolean(userToggles[subjId]);
      }
    });

    return result;
  }, [searchQuery, selectedSubject, documents, userToggles]);

  const isFilteringOrSearching = searchQuery.trim().length > 0 || selectedSubject !== 'all';

  // Handle filter chip click and sync URL query parameter
  const handleSelectSubject = (id: 'all' | SubjectId) => {
    setSelectedSubject(id);
    setUserToggles({});
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (id === 'all') {
        url.searchParams.delete('subject');
      } else {
        url.searchParams.set('subject', id);
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  const toggleSection = (id: SubjectId) => {
    setUserToggles((prev) => ({
      ...prev,
      [id]: !openSections[id],
    }));
  };

  // Keyboard shortcut: '/' focuses search input on desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Max word count across all notes for reading-length bar
  const maxWordCount = useMemo(() => {
    return Math.max(...documents.map((d) => d.wordCount || 1), 1);
  }, [documents]);

  // Ordered subject sections according to TOPIC_ORDER
  const subjectSections = useMemo(() => {
    return TOPIC_ORDER.map((subjId) => {
      const subjectConfig = SUBJECT_MAP[subjId];
      const subjectDocs = documents.filter((d) => d.subject === subjId);

      const masterclasses = subjectDocs
        .filter((d) => d.format === 'masterclass')
        .sort((a, b) => (a.order || 999) - (b.order || 999));

      const articles = subjectDocs
        .filter((d) => d.format === 'article')
        .sort((a, b) => b.updated.localeCompare(a.updated));

      return {
        config: subjectConfig,
        docs: subjectDocs,
        masterclasses,
        articles,
        statsText: formatSubjectStats(subjectDocs),
      };
    });
  }, [documents]);

  const visibleSections = useMemo(() => {
    if (!isFilteringOrSearching) return subjectSections;
    return subjectSections.filter((section) => openSections[section.config.id]);
  }, [subjectSections, isFilteringOrSearching, openSections]);

  return (
    <div className="space-y-10 min-w-0">
      {/* Search and Filters Block */}
      <section className="space-y-3" aria-label="Search and filter notes">
        <div className="relative w-full">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search notes, topics, tags…"
            aria-label="Search notes, topics, tags"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setUserToggles({});
            }}
            className="w-full px-4 py-3 min-h-[44px] text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted/70 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setUserToggles({});
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[44px] px-3 text-xs font-medium text-muted hover:text-foreground flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2"
              aria-label="Clear search query"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Chips Container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar pb-1 -mx-4 px-4">
            <button
              type="button"
              onClick={() => handleSelectSubject('all')}
              className={`min-h-[44px] px-4 py-2 text-xs rounded-full inline-flex items-center justify-center shrink-0 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2 ${
                selectedSubject === 'all'
                  ? 'bg-foreground text-background font-medium'
                  : 'border border-border text-foreground hover:bg-black/5 font-normal'
              }`}
            >
              All
            </button>
            {SUBJECTS.map((subjectConfig) => {
              const isActive = selectedSubject === subjectConfig.id;
              return (
                <button
                  key={subjectConfig.id}
                  type="button"
                  onClick={() => handleSelectSubject(subjectConfig.id)}
                  className={`min-h-[44px] px-4 py-2 text-xs rounded-full inline-flex items-center justify-center shrink-0 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2 ${
                    isActive
                      ? 'bg-foreground text-background font-medium'
                      : 'border border-border text-foreground hover:bg-black/5 font-normal'
                  }`}
                >
                  {subjectConfig.name}
                </button>
              );
            })}
          </div>
          {/* Subtle right edge gradient scroll cue */}
          <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Structured Notes Sections */}
      <div className="space-y-8">
        {visibleSections.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted border border-dashed border-border rounded-lg">
            No notes found matching your filter.
          </div>
        ) : (
          visibleSections.map((section) => {
            const isPrimary = section.config.id === PRIMARY_TOPIC;
            const hasNotes = section.docs.length > 0;
            const isMultiVolume = section.masterclasses.length > 1;
            const isOpen = openSections[section.config.id];

            // Render Note Cards Content Block
            const renderCards = () => (
              <div className="pt-4 space-y-5">
                {!hasNotes ? (
                  <div className="p-4 md:p-5 border border-dashed border-border rounded-lg bg-background select-none">
                    <div className="text-[11px] font-sans font-semibold tracking-wider text-muted uppercase mb-1.5">
                      COMING SOON
                    </div>
                    <p className="text-sm text-muted leading-relaxed">
                      First notes are on the way.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Masterclasses on Path */}
                    {section.masterclasses.length > 0 && (
                      <div className="relative pl-10 space-y-6">
                        <div
                          className="absolute top-4 bottom-4 left-[14px] w-[1px] bg-foreground z-0"
                          aria-hidden="true"
                        />
                        {section.masterclasses.map((doc, idx) => {
                          const volNum =
                            (doc.order || idx + 1) < 10 ? `0${doc.order || idx + 1}` : `${doc.order || idx + 1}`;
                          const titleClean = stripMasterclassTitlePrefix(doc.title);
                          const barWidth = Math.min(
                            100,
                            Math.max(5, Math.round(((doc.wordCount || 1) / maxWordCount) * 100))
                          );
                          const cardLabel = isMultiVolume ? `VOLUME ${doc.order || idx + 1}` : 'MASTERCLASS';

                          return (
                            <div key={doc.slug} className="relative z-10">
                              <div
                                className="absolute -left-10 top-3 w-[28px] h-[28px] bg-background border border-foreground font-mono text-[11px] font-semibold flex items-center justify-center text-foreground z-10"
                                aria-hidden="true"
                              >
                                {volNum}
                              </div>
                              <Link
                                href={`/notes/${doc.slug}`}
                                className="group block min-h-[44px] p-4 md:p-5 border border-border rounded-lg bg-background hover:border-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2"
                              >
                                <div className="text-[11px] font-sans font-semibold tracking-wider text-muted uppercase mb-1">
                                  {cardLabel}
                                </div>
                                <h3 className="text-[17px] md:text-lg font-medium text-foreground leading-snug mb-1.5 group-hover:underline">
                                  {titleClean}
                                </h3>
                                <p className="text-sm text-muted line-clamp-2 leading-relaxed mb-3">
                                  {doc.description}
                                </p>
                                <div className="text-xs text-muted/80 font-medium mb-3">
                                  {doc.readTime}
                                </div>
                                <div className="w-full h-[2px] bg-border rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-foreground transition-all duration-300"
                                    style={{ width: `${barWidth}%` }}
                                  />
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Articles in Subject */}
                    {section.articles.length > 0 && (
                      <div className="space-y-3 pt-1">
                        {section.articles.map((doc) => (
                          <Link
                            key={doc.slug}
                            href={`/notes/${doc.slug}`}
                            className="group block min-h-[44px] p-4 md:p-5 border border-border rounded-lg bg-background hover:border-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2"
                          >
                            <div className="text-[11px] font-sans font-semibold tracking-wider text-muted uppercase mb-1">
                              ARTICLE
                            </div>
                            <h3 className="text-[17px] md:text-lg font-medium text-foreground leading-snug mb-1.5 group-hover:underline">
                              {doc.title}
                            </h3>
                            <p className="text-sm text-muted line-clamp-2 leading-relaxed mb-3">
                              {doc.description}
                            </p>
                            <div className="text-xs text-muted/80 font-medium flex items-center gap-2">
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
                    )}
                  </>
                )}
              </div>
            );

            if (isPrimary) {
              // Primary Topic (AI): Fully expanded section
              return (
                <section key={section.config.id} className="space-y-4" aria-label={`${section.config.name} section`}>
                  <div className="space-y-1 pb-2 border-b border-border/60">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center">
                        <span className="inline-block w-[6px] h-[6px] bg-foreground mr-2.5" aria-hidden="true" />
                        {section.config.name}
                      </h2>
                      <span className="text-xs text-muted font-medium">
                        {section.statsText}
                      </span>
                    </div>
                    <p className="text-sm text-muted">
                      {section.config.description}
                    </p>
                  </div>
                  {renderCards()}
                </section>
              );
            }

            // Other Topics (Finance, Health, Life): Collapsible native <details>/<summary> row
            return (
              <details
                key={section.config.id}
                open={isOpen}
                onToggle={(e) => {
                  e.preventDefault();
                }}
                className="group border-b border-border/60 pb-2"
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSection(section.config.id);
                  }}
                  className="list-none cursor-pointer flex items-center justify-between py-3 min-h-[44px] rounded-md hover:bg-black/5 px-2 -mx-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2 select-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0 pr-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center shrink-0">
                      <span className="inline-block w-[6px] h-[6px] bg-foreground mr-2.5" aria-hidden="true" />
                      {section.config.name}
                    </span>
                    <span className="text-xs text-muted truncate">
                      {section.config.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted font-medium">
                      {section.statsText}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none" />
                  </div>
                </summary>
                {renderCards()}
              </details>
            );
          })
        )}
      </div>
    </div>
  );
}
