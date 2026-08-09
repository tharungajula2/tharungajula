'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NoteRecord } from '@/lib/notes';

interface NotebookShelfToggleProps {
  notes: NoteRecord[];
}

export default function NotebookShelfToggle({ notes }: NotebookShelfToggleProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'notes' | 'slides'>('all');

  const technicalNotes = notes.filter((n) => !n.frontmatter.isSlideDeck && !n.isSlideDeck);
  const slideDecks = notes.filter((n) => n.frontmatter.isSlideDeck || n.isSlideDeck);

  const renderNoteCard = (note: NoteRecord, cardIdx: number) => {
    const isSlideDeck = note.frontmatter.isSlideDeck || note.isSlideDeck;
    const indexNum = String(note.frontmatter.order || cardIdx + 1).padStart(3, '0');

    return (
      <div
        key={note.frontmatter.slug}
        className="p-5 sm:p-7 rounded-2xl border border-hairline bg-surface-raised shadow-sm group hover:border-accent/60 transition-all"
      >
        {/* Index Number & Shelf Badge */}
        <div className="mb-2">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="text-xs font-mono font-bold text-ink-muted tracking-wider">
              NOTE #{indexNum}
            </div>
            {isSlideDeck ? (
              <span className="px-2.5 py-0.5 rounded border border-accent/40 bg-accent/10 text-accent font-mono text-[10px] font-bold uppercase tracking-wider">
                SLIDE DECK • {note.slideCount || note.frontmatter.slideCount || 99} SLIDES
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded border border-signal/40 bg-signal/10 text-signal font-mono text-[10px] font-bold uppercase tracking-wider">
                TECHNICAL NOTE • REFERENCE
              </span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors">
            <Link href={`/notebook/notes/${note.frontmatter.slug}`}>
              {note.frontmatter.title}
            </Link>
          </h3>
        </div>

        {note.frontmatter.subtitle && (
          <p className="text-ink-muted font-serif italic text-base sm:text-lg mb-3">
            {note.frontmatter.subtitle}
          </p>
        )}

        {/* Reading stats */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-faint mb-3">
          <span>~{note.totalReadingTimeMinutes} MIN READ</span>
          <span>·</span>
          <span>{isSlideDeck ? `${note.slideCount || 99} SLIDES` : `${note.sections.length} SECTIONS`}</span>
          {!isSlideDeck && note.totalWordCount && (
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

        {/* Opening line / Description */}
        {note.description && (
          <p className="text-ink-muted font-serif text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
            {note.description}
          </p>
        )}

        {/* Section / Slide Quick Jump Chips */}
        {note.sections.length > 0 && (
          <div className="mb-5 border-t border-hairline-faint pt-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-faint mb-2 flex items-center justify-between">
              <span>{isSlideDeck ? `SLIDE INDEX JUMP (${note.sections.length})` : `SECTIONS INDEX JUMP (${note.sections.length})`}</span>
              <span>AUTHORED BY THARUN GAJULA</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {note.sections.slice(0, 5).map((sec, secIdx) => (
                <Link
                  key={sec.slug || secIdx}
                  href={
                    isSlideDeck
                      ? `/notebook/notes/${note.frontmatter.slug}#${sec.slideIndex || secIdx + 1}`
                      : `/notebook/notes/${note.frontmatter.slug}/${sec.slug}`
                  }
                  className="text-[11px] font-mono py-1 px-2 rounded border border-hairline bg-surface-sunken text-ink-muted hover:border-accent hover:text-accent transition-all truncate max-w-[240px]"
                >
                  #{String(sec.slideIndex || secIdx + 1).padStart(2, '0')} {sec.title}
                </Link>
              ))}
              {note.sections.length > 5 && (
                <Link
                  href={`/notebook/notes/${note.frontmatter.slug}`}
                  className="text-[11px] font-mono py-1 px-2 text-ink-faint hover:text-accent transition-colors"
                >
                  +{note.sections.length - 5} more →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-hairline-faint pt-4">
          {note.frontmatter.tags && note.frontmatter.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              {note.frontmatter.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded border border-hairline bg-surface-sunken text-ink-faint uppercase">
                  #{tag}
                </span>
              ))}
            </div>
          ) : <div />}

          <div className="flex items-center gap-3">
            <Link
              href={`/notebook/notes/${note.frontmatter.slug}`}
              className="py-2 px-5 rounded-xl bg-accent text-surface font-mono font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity text-center w-full sm:w-auto"
            >
              {isSlideDeck ? 'Launch Slide Deck →' : 'Read Technical Note →'}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* ─── TOGGLE SWITCH / SEGMENTED CONTROL ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
        <div>
          <h2 className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-ink">
            NOTEBOOK SHELVES // SELECT TRACK
          </h2>
          <p className="text-[11px] font-mono text-ink-faint mt-0.5">
            Switch between in-depth Technical Notes &amp; interactive Slide Decks.
          </p>
        </div>

        {/* Responsive Segmented Switch Pill */}
        <div className="inline-flex items-center p-1 rounded-xl bg-surface-sunken border border-hairline self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-accent text-surface shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-surface-raised/40'
            }`}
          >
            All Shelves ({notes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
              activeTab === 'notes'
                ? 'bg-signal text-surface shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-surface-raised/40'
            }`}
          >
            Technical Notes ({technicalNotes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('slides')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
              activeTab === 'slides'
                ? 'bg-accent text-surface shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-surface-raised/40'
            }`}
          >
            Slide Decks ({slideDecks.length})
          </button>
        </div>
      </div>

      {/* ─── TECHNICAL NOTES SHELF ─── */}
      {(activeTab === 'all' || activeTab === 'notes') && technicalNotes.length > 0 && (
        <section aria-labelledby="tech-notes-shelf-heading" className="space-y-6">
          <div className="flex items-center justify-between gap-4 border-l-2 border-signal pl-3">
            <div>
              <h3 id="tech-notes-shelf-heading" className="text-sm font-mono font-bold uppercase tracking-wider text-signal">
                TECHNICAL NOTES SHELF
              </h3>
              <p className="text-xs font-serif text-ink-muted">
                Comprehensive reference notebooks, architecture diagrams, code, and system mechanics.
              </p>
            </div>
            <span className="font-mono text-xs text-ink-faint shrink-0">
              {technicalNotes.length} {technicalNotes.length === 1 ? 'NOTE' : 'NOTES'}
            </span>
          </div>

          <div className="space-y-6">
            {technicalNotes.map((note, idx) => renderNoteCard(note, idx))}
          </div>
        </section>
      )}

      {/* ─── INTERACTIVE SLIDE DECKS SHELF ─── */}
      {(activeTab === 'all' || activeTab === 'slides') && slideDecks.length > 0 && (
        <section aria-labelledby="slide-decks-shelf-heading" className="space-y-6 pt-2">
          <div className="flex items-center justify-between gap-4 border-l-2 border-accent pl-3">
            <div>
              <h3 id="slide-decks-shelf-heading" className="text-sm font-mono font-bold uppercase tracking-wider text-accent">
                INTERACTIVE SLIDE DECKS SHELF
              </h3>
              <p className="text-xs font-serif text-ink-muted">
                Slide-sized presentation decks designed for interview &amp; client prep.
              </p>
            </div>
            <span className="font-mono text-xs text-ink-faint shrink-0">
              {slideDecks.length} {slideDecks.length === 1 ? 'DECK' : 'DECKS'}
            </span>
          </div>

          <div className="space-y-6">
            {slideDecks.map((note, idx) => renderNoteCard(note, idx))}
          </div>
        </section>
      )}
    </div>
  );
}
