import Link from 'next/link';
import { getAllDetailedNotes, getAllLogEntries } from '@/lib/notes';
import ContinueReading from '@/components/notebook/ContinueReading';

export const metadata = {
  title: 'Notebook | Tharun Gajula',
  description: 'Notes on credit risk modelling and the systems that carry models into production.',
};

export default function NotebookHomePage() {
  const detailedNotes = getAllDetailedNotes();
  const logEntries = getAllLogEntries();

  const leadNote = detailedNotes[0];
  const streamNotes = detailedNotes.slice(1);
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

      {/* RESUME READING (SITS BELOW INTRO, RENDERS NULL IF NO HISTORY) */}
      <ContinueReading />

      {/* ─── SECTION I: NOTES BLOCK ─── */}
      <section aria-labelledby="section-notes-heading" className="mb-10">
        <div className="flex items-center justify-between gap-4 mb-4 border-b border-hairline pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
            <h2 id="section-notes-heading" className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-ink">
              NOTES // {detailedNotes.length} ENTRIES
            </h2>
          </div>
          <Link
            href="/notebook/notes"
            className="font-mono text-xs text-ink-faint hover:text-accent transition-colors uppercase tracking-widest"
          >
            ALL NOTES →
          </Link>
        </div>

        {/* LEAD NOTE (NEWEST WORK - FULL CARD) */}
        {leadNote && (
          <div className="mb-6 p-5 sm:p-7 rounded-2xl border border-accent/40 bg-surface-raised shadow-lg relative overflow-hidden group hover:border-accent transition-all">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent" />

            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-ink-faint mb-3">
              {leadNote.frontmatter.date && (
                <span className="text-accent font-bold">
                  {new Date(leadNote.frontmatter.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                </span>
              )}
              <span>·</span>
              <span>~{leadNote.totalReadingTimeMinutes} MIN READ</span>
              <span>·</span>
              <span>{leadNote.sections.length} SECTIONS</span>
              <span>·</span>
              <span className="text-signal font-semibold">LATEST ENTRY</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors mb-2">
              <Link href={`/notebook/notes/${leadNote.frontmatter.slug}`}>
                {leadNote.frontmatter.title}
              </Link>
            </h3>

            {leadNote.frontmatter.subtitle && (
              <p className="text-ink-muted font-serif italic text-base sm:text-lg mb-3">
                {leadNote.frontmatter.subtitle}
              </p>
            )}

            {leadNote.description && (
              <p className="text-ink-muted font-serif text-sm sm:text-base leading-relaxed mb-5 line-clamp-3">
                {leadNote.description}
              </p>
            )}

            {/* TAGS */}
            {leadNote.frontmatter.tags && leadNote.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5 font-mono text-[10px]">
                {leadNote.frontmatter.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded border border-hairline bg-surface-sunken text-ink-muted uppercase">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-hairline-faint pt-4">
              <Link
                href={`/notebook/notes/${leadNote.frontmatter.slug}${leadNote.sections.length > 0 ? `/${leadNote.sections[0].slug}` : ''}`}
                className="py-2.5 px-5 rounded-xl bg-accent text-surface text-center font-mono font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
              >
                Read Note → {leadNote.sections.length > 0 ? `§1 ${leadNote.sections[0].title}` : 'Overview'}
              </Link>
              <Link
                href={`/notebook/notes/${leadNote.frontmatter.slug}`}
                className="py-2.5 px-4 rounded-xl border border-hairline text-ink-muted text-center font-mono text-xs uppercase tracking-wider hover:border-accent hover:text-accent transition-all"
              >
                View Note Index ({leadNote.sections.length} Sections)
              </Link>
            </div>
          </div>
        )}

        {/* CHRONOLOGY STREAM FOR REMAINING NOTES */}
        {streamNotes.length > 0 && (
          <div className="space-y-2.5">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-faint mb-1.5">
              PREVIOUS NOTES
            </div>
            {streamNotes.map((note) => (
              <Link
                key={note.frontmatter.slug}
                href={`/notebook/notes/${note.frontmatter.slug}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-4 rounded-xl border border-hairline bg-surface-raised hover:border-accent/60 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-ink-faint uppercase mb-1">
                    {note.frontmatter.date && (
                      <span>{new Date(note.frontmatter.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    )}
                    <span>·</span>
                    <span>{note.sections.length} SECTIONS</span>
                    <span>·</span>
                    <span>~{note.totalReadingTimeMinutes} MIN</span>
                  </div>
                  <h4 className="font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors text-sm sm:text-base">
                    {note.frontmatter.title}
                  </h4>
                  {note.frontmatter.subtitle && (
                    <p className="text-ink-muted text-xs font-serif italic mt-0.5 line-clamp-1">
                      {note.frontmatter.subtitle}
                    </p>
                  )}
                </div>
                <span className="font-mono text-xs text-accent font-semibold shrink-0 uppercase">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ─── SECTION II: THE LOG BLOCK ─── */}
      {recentLogEntries.length > 0 && (
        <section aria-labelledby="section-log-heading" className="mb-8">
          <div className="border-b border-hairline pb-2.5 mb-4">
            <div className="flex items-center justify-between gap-4">
              <h2 id="section-log-heading" className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-ink">
                THE LOG // DAILY
              </h2>
              <Link
                href="/notebook/log"
                className="font-mono text-xs text-ink-faint hover:text-accent transition-colors uppercase tracking-widest"
              >
                ALL ENTRIES →
              </Link>
            </div>
            <p className="text-[11px] font-mono text-ink-faint mt-1">
              Short dated entries. One thing learned, built or read.
            </p>
          </div>

          {/* STREAM OF 5 MOST RECENT LOG ENTRIES (HAIRLINE RULES, NO CARDS) */}
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
                  {entry.body.split(/\r?\n/)[0]}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
