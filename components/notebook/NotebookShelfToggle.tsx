'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NoteRecord } from '@/lib/notes';

interface NotebookShelfToggleProps {
  notes: NoteRecord[];
}

export default function NotebookShelfToggle({ notes }: NotebookShelfToggleProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'notes' | 'slides' | 'cases'>('all');

  const technicalNotes = notes.filter((n) => !n.frontmatter.isSlideDeck && !n.isSlideDeck);

  const allDecks = notes.filter((n) => n.frontmatter.isSlideDeck || n.isSlideDeck);

  const slideDecks = allDecks.filter((n) => {
    const slug = (n.frontmatter.slug || '').toLowerCase();
    const title = (n.frontmatter.title || '').toLowerCase();
    return !slug.includes('case_study') && !title.includes('case study');
  });

  const caseStudies = allDecks.filter((n) => {
    const slug = (n.frontmatter.slug || '').toLowerCase();
    const title = (n.frontmatter.title || '').toLowerCase();
    return slug.includes('case_study') || title.includes('case study');
  });

  const renderNoteCard = (note: NoteRecord, cardIdx: number, categoryType: 'note' | 'deck' | 'case') => {
    const indexNum = String(note.frontmatter.order || cardIdx + 1).padStart(3, '0');

    let indexLabel = `TECHNICAL NOTE #${indexNum}`;
    let categoryBadgeText = 'TECHNICAL NOTE • REFERENCE';
    let categoryBadgeStyle = 'border-signal/40 bg-signal/10 text-signal';
    let ctaLabel = 'Read Technical Note →';

    if (categoryType === 'deck') {
      indexLabel = `SLIDE DECK #${indexNum}`;
      categoryBadgeText = `SLIDE DECK • ${note.slideCount || note.frontmatter.slideCount || 99} SLIDES`;
      categoryBadgeStyle = 'border-accent/40 bg-accent/10 text-accent';
      ctaLabel = 'Launch Slide Deck →';
    } else if (categoryType === 'case') {
      indexLabel = `CASE STUDY #${indexNum}`;
      categoryBadgeText = `CASE STUDY • ${note.slideCount || note.frontmatter.slideCount || 99} SLIDES`;
      categoryBadgeStyle = 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400';
      ctaLabel = 'Explore Case Study →';
    }

    // Clean title string: decode &AMP; and fix squished words if present
    const cleanTitle = note.frontmatter.title
      .replace(/^SLIDE DECK \d+:\s*/i, '')
      .replace(/^CASE STUDY \d+:\s*/i, '')
      .replace(/&amp;/gi, '&')
      .replace(/&AMP;/g, '&')
      .replace(/RiskMaster/i, 'Risk Master');

    const formattedDisplayTitle = categoryType === 'deck'
      ? `SLIDE DECK ${indexNum}: ${cleanTitle}`
      : categoryType === 'case'
      ? `CASE STUDY ${indexNum}: ${cleanTitle}`
      : cleanTitle;

    const cleanSubtitle = note.frontmatter.subtitle?.replace(/&amp;/gi, '&');

    const hasUniqueDescription =
      note.description &&
      cleanSubtitle &&
      note.description.trim().toLowerCase() !== cleanSubtitle.trim().toLowerCase() &&
      !note.description.includes('>') &&
      !note.description.includes('**');

    return (
      <div
        key={note.frontmatter.slug}
        className="p-4 sm:p-5 rounded-2xl border border-hairline bg-surface-raised shadow-sm group hover:border-accent/60 transition-all"
      >
        {/* Index Number & Shelf Badge */}
        <div className="mb-2">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="text-[11px] font-mono font-bold text-ink-muted tracking-wider uppercase">
              {indexLabel}
            </div>
            <span className={`px-2 py-0.5 rounded border font-mono text-[9px] font-bold uppercase tracking-wider ${categoryBadgeStyle}`}>
              {categoryBadgeText}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors leading-snug">
            <Link href={`/notebook/notes/${note.frontmatter.slug}`}>
              {formattedDisplayTitle}
            </Link>
          </h3>
        </div>

        {cleanSubtitle && (
          <p className="text-ink-muted font-serif italic text-sm sm:text-base mb-2.5">
            {cleanSubtitle}
          </p>
        )}

        {/* Reading stats */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-faint mb-2.5">
          <span>~{note.totalReadingTimeMinutes} MIN READ</span>
          <span>·</span>
          <span>{categoryType !== 'note' ? `${note.slideCount || 99} SLIDES` : `${note.sections.length} SECTIONS`}</span>
          {categoryType === 'note' && note.totalWordCount && (
            <>
              <span>·</span>
              <span>{note.totalWordCount.toLocaleString('en-US')} WORDS</span>
            </>
          )}
          {note.frontmatter.date && (
            <>
              <span>·</span>
              <span className="text-ink-faint">
                {new Date(note.frontmatter.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase()}
              </span>
            </>
          )}
        </div>

        {/* Opening line / Description (only if unique) */}
        {hasUniqueDescription && (
          <p className="text-ink-muted font-serif text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
            {note.description}
          </p>
        )}

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-hairline-faint pt-3 mt-3">
          {note.frontmatter.tags && note.frontmatter.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1 font-mono text-[9px]">
              {note.frontmatter.tags.map((tag) => (
                <span key={tag} className="px-1.5 py-0.5 rounded border border-hairline bg-surface-sunken text-ink-faint uppercase">
                  #{tag}
                </span>
              ))}
            </div>
          ) : <div />}

          <div className="flex items-center gap-2">
            <Link
              href={`/notebook/notes/${note.frontmatter.slug}`}
              className="py-1.5 px-4 rounded-xl bg-accent text-surface font-mono font-bold text-[11px] uppercase tracking-wider hover:opacity-95 transition-opacity text-center w-full sm:w-auto"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* ─── SEGMENTED TRACK CONTROL ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <h2 className="text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-ink">
            NOTEBOOK SHELVES // SELECT TRACK
          </h2>
          <p className="text-[10px] font-mono text-ink-faint mt-0.5">
            Filter between Technical Notes, Interactive Slide Decks &amp; Case Studies.
          </p>
        </div>

        {/* Responsive 4-Pill Grid (Fits 2x2 on mobile, row on desktop) */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center p-1 rounded-xl bg-surface-sunken border border-hairline w-full sm:w-auto gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold uppercase transition-all text-center ${
              activeTab === 'all'
                ? 'bg-accent text-surface shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-surface-raised/40'
            }`}
          >
            All ({notes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold uppercase transition-all text-center ${
              activeTab === 'notes'
                ? 'bg-signal text-surface shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-surface-raised/40'
            }`}
          >
            Notes ({technicalNotes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('slides')}
            className={`px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold uppercase transition-all text-center ${
              activeTab === 'slides'
                ? 'bg-accent text-surface shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-surface-raised/40'
            }`}
          >
            Slide Decks ({slideDecks.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cases')}
            className={`px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold uppercase transition-all text-center ${
              activeTab === 'cases'
                ? 'bg-cyan-500 text-surface shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-surface-raised/40'
            }`}
          >
            Case Studies ({caseStudies.length})
          </button>
        </div>
      </div>

      {/* ─── TECHNICAL NOTES SHELF ─── */}
      {(activeTab === 'all' || activeTab === 'notes') && technicalNotes.length > 0 && (
        <section aria-labelledby="tech-notes-shelf-heading" className="space-y-4">
          <div className="flex items-center justify-between gap-4 border-l-2 border-signal pl-3">
            <div>
              <h3 id="tech-notes-shelf-heading" className="text-xs font-mono font-bold uppercase tracking-wider text-signal">
                TECHNICAL NOTES SHELF
              </h3>
              <p className="text-[11px] font-serif text-ink-muted">
                Comprehensive reference notebooks, architecture diagrams, code, and system mechanics.
              </p>
            </div>
            <span className="font-mono text-[11px] text-ink-faint shrink-0">
              {technicalNotes.length} {technicalNotes.length === 1 ? 'NOTE' : 'NOTES'}
            </span>
          </div>

          <div className="space-y-4">
            {technicalNotes.map((note, idx) => renderNoteCard(note, idx, 'note'))}
          </div>
        </section>
      )}

      {/* ─── INTERACTIVE SLIDE DECKS SHELF ─── */}
      {(activeTab === 'all' || activeTab === 'slides') && slideDecks.length > 0 && (
        <section aria-labelledby="slide-decks-shelf-heading" className="space-y-4 pt-1">
          <div className="flex items-center justify-between gap-4 border-l-2 border-accent pl-3">
            <div>
              <h3 id="slide-decks-shelf-heading" className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                INTERACTIVE SLIDE DECKS SHELF
              </h3>
              <p className="text-[11px] font-serif text-ink-muted">
                Slide-sized presentation decks designed for interview &amp; client prep.
              </p>
            </div>
            <span className="font-mono text-[11px] text-ink-faint shrink-0">
              {slideDecks.length} {slideDecks.length === 1 ? 'DECK' : 'DECKS'}
            </span>
          </div>

          <div className="space-y-4">
            {slideDecks.map((note, idx) => renderNoteCard(note, idx, 'deck'))}
          </div>
        </section>
      )}

      {/* ─── CASE STUDIES SHELF ─── */}
      {(activeTab === 'all' || activeTab === 'cases') && caseStudies.length > 0 && (
        <section aria-labelledby="case-studies-shelf-heading" className="space-y-4 pt-1">
          <div className="flex items-center justify-between gap-4 border-l-2 border-cyan-500 pl-3">
            <div>
              <h3 id="case-studies-shelf-heading" className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                CASE STUDIES SHELF
              </h3>
              <p className="text-[11px] font-serif text-ink-muted">
                Deep-dive institutional case studies and microfinance credit risk analyses.
              </p>
            </div>
            <span className="font-mono text-[11px] text-ink-faint shrink-0">
              {caseStudies.length} {caseStudies.length === 1 ? 'CASE STUDY' : 'CASE STUDIES'}
            </span>
          </div>

          <div className="space-y-4">
            {caseStudies.map((note, idx) => renderNoteCard(note, idx, 'case'))}
          </div>
        </section>
      )}
    </div>
  );
}
