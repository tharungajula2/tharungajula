import Link from 'next/link';
import { getAllDetailedNotes, getAllLogEntries } from '@/lib/notes';
import ContinueReading from '@/components/notebook/ContinueReading';

export const metadata = {
  title: 'Notebook | Tharun Gajula',
  description: 'Notes on credit risk modelling and the systems that carry models into production.',
};

// Full card display limit before collapsing into compact rows
const FULL_CARDS_CUTOFF = 8;

export default function NotebookHomePage() {
  const detailedNotes = getAllDetailedNotes();
  const logEntries = getAllLogEntries();

  const fullCardNotes = detailedNotes.slice(0, FULL_CARDS_CUTOFF);
  const compactNotes = detailedNotes.slice(FULL_CARDS_CUTOFF);
  const recentLogEntries = logEntries.slice(0, 5);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-10 px-4 sm:px-6 text-ink font-sans text-left pb-28 sm:pb-32">
      {/* ─── HEADER & INTRO ─── */}
      <header className="mb-6">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // WORKING NOTEBOOK
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink mb-3">
          NOTEBOOK
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl font-serif">
          Notes on credit risk modelling and the systems that carry models into production. Each one takes a single subject from zero to working fluency, and is written to be re-read.
        </p>
      </header>

      {/* RESUME READING */}
      <ContinueReading />

      {/* ─── SECTION I: NOTES BLOCK ─── */}
      <section aria-labelledby="section-notes-heading" className="mb-12">
        <div className="flex items-center justify-between gap-4 mb-6 border-b border-hairline pb-2.5">
          <h2 id="section-notes-heading" className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-ink">
            NOTES // IN READING ORDER
          </h2>
          <Link
            href="/notebook/notes"
            className="font-mono text-xs text-ink-faint hover:text-accent transition-colors uppercase tracking-widest"
          >
            ALL NOTES →
          </Link>
        </div>

        <div className="space-y-6">
          {fullCardNotes.map((note, idx) => {
            const indexNum = String(idx + 1).padStart(3, '0');
            const isSlideDeck = note.frontmatter.isSlideDeck || note.isSlideDeck;

            return (
              <div
                key={note.frontmatter.slug}
                className="p-5 sm:p-7 rounded-2xl border border-hairline bg-surface-raised shadow-sm group hover:border-accent/60 transition-all"
              >
                {/* Index Number & Title */}
                <div className="mb-2">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="text-xs font-mono font-bold text-ink-muted tracking-wider">
                      NOTE #{indexNum}
                    </div>
                    {isSlideDeck && (
                      <span className="px-2 py-0.5 rounded border border-accent/40 bg-accent/10 text-accent font-mono text-[10px] font-bold uppercase tracking-wider">
                        SLIDE DECK • {note.slideCount || 99} SLIDES
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

                {/* Reading time, Section Count & Date */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-faint mb-3">
                  <span>~{note.totalReadingTimeMinutes} MIN READ</span>
                  <span>·</span>
                  <span>{isSlideDeck ? `${note.slideCount || 99} SLIDES` : `${note.sections.length} SECTIONS`}</span>
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
                  <p className="text-ink-muted font-serif text-sm sm:text-base leading-relaxed mb-4 line-clamp-2">
                    {note.description}
                  </p>
                )}

                {/* Section Quick Jump Chips */}
                {note.sections.length > 0 && (
                  <div className="mb-5 border-t border-hairline-faint pt-3">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-faint mb-2 flex items-center justify-between">
                      <span>SLIDE INDEX JUMP ({note.sections.length})</span>
                      <span>AUTHORED BY THARUN GAJULA</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {note.sections.slice(0, 5).map((sec, secIdx) => (
                        <Link
                          key={sec.slug || secIdx}
                          href={`/notebook/notes/${note.frontmatter.slug}#${sec.slideIndex || secIdx + 1}`}
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

                {/* Action Buttons */}
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
                      className="py-2 px-4 rounded-xl bg-accent text-surface font-mono font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity text-center"
                    >
                      {isSlideDeck ? 'Launch Slide Deck →' : 'Read Note →'}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Compact rows for notes beyond cutoff */}
          {compactNotes.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-hairline-faint">
              {compactNotes.map((note, idx) => {
                const indexNum = String(FULL_CARDS_CUTOFF + idx + 1).padStart(3, '0');
                return (
                  <Link
                    key={note.frontmatter.slug}
                    href={`/notebook/notes/${note.frontmatter.slug}`}
                    className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-hairline bg-surface-raised hover:border-accent/60 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-ink-faint">
                        #{indexNum}
                      </span>
                      <h4 className="font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors text-sm sm:text-base">
                        {note.frontmatter.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-ink-faint shrink-0">
                      ~{note.totalReadingTimeMinutes} MIN
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─── SECTION II: THE LOG BLOCK ─── */}
      {recentLogEntries.length > 0 && (
        <section aria-labelledby="section-log-heading" className="mb-8">
          <div className="border-b border-hairline pb-2.5 mb-4">
            <div className="flex items-center justify-between gap-4">
              <h2 id="section-log-heading" className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-ink">
                THE LOG
              </h2>
              <Link
                href="/notebook/log"
                className="font-mono text-xs text-ink-faint hover:text-accent transition-colors uppercase tracking-widest"
              >
                ALL ENTRIES →
              </Link>
            </div>
            <p className="text-[11px] font-mono text-ink-faint mt-1">
              Short dated entries, posted when there is something worth posting.
            </p>
          </div>

          {/* STREAM OF MOST RECENT LOG ENTRIES */}
          <div className="divide-y divide-hairline">
            {recentLogEntries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/notebook/log/${entry.month}#${entry.slug}`}
                className="py-3.5 block group hover:bg-surface-raised/40 px-2 rounded-lg transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-1">
                  <h3 className="font-bold text-ink uppercase text-sm group-hover:text-accent transition-colors truncate">
                    {entry.title}
                  </h3>
                  <span className="font-mono text-[11px] text-accent font-semibold shrink-0">
                    {entry.date}
                  </span>
                </div>
                <p className="text-ink-muted font-serif text-xs leading-relaxed truncate">
                  {entry.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
