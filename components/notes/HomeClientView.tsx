'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { DocumentMeta } from '@/lib/notes/markdown';
import { SUBJECTS, SubjectId, SUBJECT_MAP } from '@/lib/notes/subjects';

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
  if (docs.length === 0) return '';
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

function getCardLabel(doc: DocumentMeta, subjectDocs: DocumentMeta[]): string {
  if (doc.format === 'article') {
    return 'ARTICLE';
  }
  const masterclassesInSubject = subjectDocs.filter((d) => d.format === 'masterclass');
  const isMultiVolume = masterclassesInSubject.length > 1;
  if (isMultiVolume && doc.order) {
    return `MASTERCLASS · VOLUME ${doc.order}`;
  }
  return 'MASTERCLASS';
}

function stripMasterclassTitlePrefix(title: string): string {
  return title
    .replace(/^(Building with AI|The AI Stack)\s*—\s*/i, '')
    .replace(/^Volume\s+\d+[:—\s]*/i, '');
}

export function HomeClientView({ documents }: HomeClientViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'all' | SubjectId>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const allSubjectIds = useMemo(() => SUBJECTS.map((s) => s.id), []);

  // Sync selectedSubject with URL ?subject=<id> parameter on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlSubj = params.get('subject');
      if (urlSubj && allSubjectIds.includes(urlSubj as SubjectId)) {
        setSelectedSubject(urlSubj as SubjectId);
      }
    }
  }, [allSubjectIds]);

  // Handle filter chip click and sync URL query parameter
  const handleSelectSubject = (id: 'all' | SubjectId) => {
    setSelectedSubject(id);
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

  // Search and chip filter logic
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (selectedSubject !== 'all' && doc.subject !== selectedSubject) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = doc.title.toLowerCase().includes(q);
        const descMatch = doc.description.toLowerCase().includes(q);
        const tagMatch = doc.tags?.some((t) => t.toLowerCase().includes(q));
        const subjectName = SUBJECT_MAP[doc.subject]?.name || '';
        const subjectMatch = subjectName.toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !tagMatch && !subjectMatch) {
          return false;
        }
      }
      return true;
    });
  }, [documents, searchQuery, selectedSubject]);

  const isFlatView = searchQuery.trim().length > 0;

  // Map ALL 4 subjects to their published masterclasses and articles
  const subjectSections = useMemo(() => {
    const visibleSubjects = selectedSubject === 'all'
      ? SUBJECTS
      : SUBJECTS.filter((s) => s.id === selectedSubject);

    return visibleSubjects.map((subjectConfig) => {
      const subjectDocs = documents.filter((d) => d.subject === subjectConfig.id);
      
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
  }, [documents, selectedSubject]);

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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 min-h-[44px] text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted/70 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
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

      {/* Flat Search Result List */}
      {isFlatView ? (
        <section className="space-y-4" aria-label="Search results">
          <div className="text-xs text-muted font-medium">
            {filteredDocuments.length} {filteredDocuments.length === 1 ? 'result' : 'results'}
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted border border-dashed border-border rounded-lg">
              No notes found matching &quot;{searchQuery}&quot;.
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocuments.map((doc) => {
                const subjectDocs = documents.filter((d) => d.subject === doc.subject);
                const cardLabel = getCardLabel(doc, subjectDocs);
                return (
                  <Link
                    key={doc.slug}
                    href={`/notes/${doc.slug}`}
                    className="group block min-h-[44px] p-4 md:p-5 border border-border rounded-lg bg-background hover:border-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2"
                  >
                    <div className="text-[11px] font-sans font-semibold tracking-wider text-muted uppercase mb-1">
                      {cardLabel}
                    </div>
                    <h3 className="text-[17px] md:text-lg font-medium text-foreground leading-snug mb-1.5 group-hover:underline">
                      {doc.title}
                    </h3>
                    {doc.description && (
                      <p className="text-sm text-muted line-clamp-2 leading-relaxed mb-3">
                        {doc.description}
                      </p>
                    )}
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
                );
              })}
            </div>
          )}
        </section>
      ) : (
        /* Structured Home Page Sections */
        <div className="space-y-12">
          {/* Subject Sections in Config Order */}
          {subjectSections.map((section) => {
            const hasNotes = section.docs.length > 0;
            const isMultiVolume = section.masterclasses.length > 1;

            return (
              <section key={section.config.id} className="space-y-5" aria-label={`${section.config.name} section`}>
                <div className="space-y-1 pb-1 border-b border-border/60">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center">
                      <span className="inline-block w-[6px] h-[6px] bg-foreground mr-2.5" aria-hidden="true" />
                      {section.config.name}
                    </h2>
                    {hasNotes && (
                      <span className="text-xs text-muted font-medium">
                        {section.statsText}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted">
                    {section.config.description}
                  </p>
                </div>

                {!hasNotes ? (
                  /* Coming Soon Card for Empty Subjects */
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
                    {/* Masterclasses on Numbered Learning Path */}
                    {section.masterclasses.length > 0 && (
                      <div className="relative pl-10 space-y-6">
                        {/* Connecting Vertical Line */}
                        <div
                          className="absolute top-4 bottom-4 left-[14px] w-[1px] bg-foreground z-0"
                          aria-hidden="true"
                        />

                        {section.masterclasses.map((doc, idx) => {
                          const volNum = (doc.order || idx + 1) < 10 ? `0${doc.order || idx + 1}` : `${doc.order || idx + 1}`;
                          const titleClean = stripMasterclassTitlePrefix(doc.title);
                          const barWidth = Math.min(
                            100,
                            Math.max(5, Math.round(((doc.wordCount || 1) / maxWordCount) * 100))
                          );
                          const cardLabel = isMultiVolume ? `VOLUME ${doc.order || idx + 1}` : 'MASTERCLASS';

                          return (
                            <div key={doc.slug} className="relative z-10">
                              {/* Rail Node */}
                              <div
                                className="absolute -left-10 top-3 w-[28px] h-[28px] bg-background border border-foreground font-mono text-[11px] font-semibold flex items-center justify-center text-foreground z-10"
                                aria-hidden="true"
                              >
                                {volNum}
                              </div>

                              {/* Volume Card */}
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

                                {/* 2px Reading-Length Bar */}
                                <div
                                  className="w-full h-[2px] bg-border rounded-full overflow-hidden"
                                  title={`Reading time relative to longest note on page: ${barWidth}%`}
                                >
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
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
