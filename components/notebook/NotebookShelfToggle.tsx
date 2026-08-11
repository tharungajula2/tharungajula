'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NoteRecord } from '@/lib/notes';

interface NotebookShelfToggleProps {
  notes: NoteRecord[];
}

interface CheatSheetItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  targetUrl: string;
  readingTime: string;
}

const CHEAT_SHEETS: CheatSheetItem[] = [
  {
    id: 'cs-001',
    number: 'CHEAT SHEET #001',
    title: 'Retail Credit Risk — Field Cards',
    subtitle: 'PD, LGD, EAD, IFRS 9 staging, prudential floors and Basel capital, from first principles and written for the Indian rulebook. 10 missions, 130 cards.',
    category: 'CREDIT RISK • CHEAT SHEET',
    tags: ['CREDIT RISK', 'PD LGD EAD', 'IFRS 9', 'BASEL III', 'RBI'],
    targetUrl: '/field-cards/retail-credit-risk-pack-01.html',
    readingTime: '130 CARDS · 10 MISSIONS',
  },
  {
    id: 'cs-002',
    number: 'CHEAT SHEET #002',
    title: 'AI Engineering — Field Cards',
    subtitle: 'AI engineering from first principles: tokens, attention, retrieval, agents, serving, evaluation, security and governance — the field practice, compressed.',
    category: 'AI ENGINEERING • CHEAT SHEET',
    tags: ['AI ENGINEERING', 'ATTENTION', 'RAG', 'AGENTS', 'EVALS & GOVERNANCE'],
    targetUrl: '/field-cards/ai-engineering-pack-02.html',
    readingTime: '130 CARDS · 10 MISSIONS',
  },
];

export default function NotebookShelfToggle({ notes }: NotebookShelfToggleProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'slides' | 'cheats'>('notes');

  const technicalNotes = notes.filter((n) => !n.frontmatter.isSlideDeck && !n.isSlideDeck);
  const slideDecks = notes.filter((n) => n.frontmatter.isSlideDeck || n.isSlideDeck);

  const renderNoteCard = (note: NoteRecord, cardIdx: number, categoryType: 'note' | 'deck') => {
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
    }

    const cleanTitle = note.frontmatter.title
      .replace(/^SLIDE DECK \d+:\s*/i, '')
      .replace(/^CASE STUDY \d+:\s*/i, '')
      .replace(/&amp;/gi, '&')
      .replace(/&AMP;/g, '&')
      .replace(/RiskMaster/i, 'Risk Master');

    const formattedDisplayTitle = categoryType === 'deck'
      ? `SLIDE DECK ${indexNum}: ${cleanTitle}`
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

        {/* Opening line / Description */}
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
      {/* ─── SEGMENTED TRACK CONTROL (3 SHELVES: NOTES, SLIDES, CHEAT SHEETS) ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <h2 className="text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-ink">
            NOTEBOOK SHELVES // SELECT TRACK
          </h2>
          <p className="text-[10px] font-mono text-ink-faint mt-0.5">
            Select between Technical Notes ({technicalNotes.length}), Slide Decks ({slideDecks.length}) &amp; Cheat Sheets ({CHEAT_SHEETS.length}).
          </p>
        </div>

        {/* Responsive 3-Tab Segment Pill */}
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center p-1 rounded-xl bg-surface-sunken border border-hairline w-full sm:w-auto gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold uppercase transition-all text-center cursor-pointer ${
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
            className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold uppercase transition-all text-center cursor-pointer ${
              activeTab === 'slides'
                ? 'bg-accent text-surface shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-surface-raised/40'
            }`}
          >
            Slide Decks ({slideDecks.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cheats')}
            className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold uppercase transition-all text-center cursor-pointer ${
              activeTab === 'cheats'
                ? 'bg-cyan-500 text-surface shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-surface-raised/40'
            }`}
          >
            Cheat Sheets ({CHEAT_SHEETS.length})
          </button>
        </div>
      </div>

      {/* ─── 1. TECHNICAL NOTES SHELF ─── */}
      {activeTab === 'notes' && (
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
              {technicalNotes.length} NOTES
            </span>
          </div>

          <div className="space-y-4">
            {technicalNotes.map((note, idx) => renderNoteCard(note, idx, 'note'))}
          </div>
        </section>
      )}

      {/* ─── 2. INTERACTIVE SLIDE DECKS SHELF ─── */}
      {activeTab === 'slides' && (
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
              {slideDecks.length} DECKS
            </span>
          </div>

          <div className="space-y-4">
            {slideDecks.map((note, idx) => renderNoteCard(note, idx, 'deck'))}
          </div>
        </section>
      )}

      {/* ─── 3. CHEAT SHEETS SHELF ─── */}
      {activeTab === 'cheats' && (
        <section aria-labelledby="cheat-sheets-shelf-heading" className="space-y-4 pt-1">
          <div className="flex items-center justify-between gap-4 border-l-2 border-cyan-500 pl-3">
            <div>
              <h3 id="cheat-sheets-shelf-heading" className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                CHEAT SHEETS SHELF
              </h3>
              <p className="text-[11px] font-serif text-ink-muted">
                High-density reference cards, formulas, hardware bandwidth limits &amp; risk parameter matrices.
              </p>
            </div>
            <span className="font-mono text-[11px] text-ink-faint shrink-0">
              {CHEAT_SHEETS.length} CHEAT SHEETS
            </span>
          </div>

          <div className="space-y-4">
            {CHEAT_SHEETS.map((cs) => (
              <div
                key={cs.id}
                className="p-4 sm:p-5 rounded-2xl border border-hairline bg-surface-raised shadow-sm group hover:border-cyan-500/60 transition-all"
              >
                <div className="mb-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="text-[11px] font-mono font-bold text-ink-muted tracking-wider uppercase">
                      {cs.number}
                    </div>
                    <span className="px-2 py-0.5 rounded border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                      {cs.category}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-ink group-hover:text-cyan-400 transition-colors leading-snug">
                    <Link href={cs.targetUrl} target="_blank" rel="noopener noreferrer">
                      {cs.title}
                    </Link>
                  </h3>
                </div>

                <p className="text-ink-muted font-serif italic text-sm sm:text-base mb-2.5">
                  {cs.subtitle}
                </p>

                <div className="flex items-center gap-2 font-mono text-[11px] text-ink-faint mb-2.5">
                  <span>{cs.readingTime}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-hairline-faint pt-3 mt-3">
                  <div className="flex flex-wrap gap-1 font-mono text-[9px]">
                    {cs.tags.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded border border-hairline bg-surface-sunken text-ink-faint uppercase">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={cs.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-4 rounded-xl bg-cyan-500 text-surface font-mono font-bold text-[11px] uppercase tracking-wider hover:opacity-95 transition-opacity text-center w-full sm:w-auto"
                  >
                    Open Cheat Sheet →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
