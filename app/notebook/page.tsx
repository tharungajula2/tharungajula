import Link from 'next/link';
import { getAllTracks, getAllChapterParams, getAllDetailedNotes } from '@/lib/notes';
import ContinueReading from '@/components/notebook/ContinueReading';
import RandomChapterButton from '@/components/notebook/RandomChapterButton';

export const metadata = {
  title: 'Notebook | Tharun Gajula',
  description: 'Working notes, research derivations, and a 193,000-word reference corpus across Indian retail credit risk systems and forward-deployed AI engineering.',
};

function fmt(n: number): string {
  return n.toLocaleString('en-US');
}

export default function NotebookHomePage() {
  const tracks = getAllTracks();
  const allChapterParams = getAllChapterParams();
  const detailedNotes = getAllDetailedNotes();

  const chapterUrls = allChapterParams.map(
    (ch) => ({ url: `/notebook/library/${ch.track}/${ch.volume}/${ch.slug}` })
  );

  const totalChapters = tracks.reduce((acc, t) => acc + t.chapterCount, 0);
  const totalWords = tracks.reduce((acc, t) => acc + t.totalWordCount, 0);
  const totalVolumes = tracks.reduce((acc, t) => acc + t.volumeCount, 0);

  const leadNote = detailedNotes[0];
  const streamNotes = detailedNotes.slice(1);

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 sm:px-6 text-ink font-sans text-left">
      {/* ─── HEADER & INTRO ─── */}
      <header className="mb-8">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // WORKING NOTEBOOK &amp; LIBRARY
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink mb-3">
          Notebook
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl font-serif">
          Daily working notes on credit risk models, financial systems, and production engineering — backed by a {fmt(totalWords)}-word textbook reference corpus.
        </p>
      </header>

      {/* RESUME READING (SITS BELOW INTRO, RENDERS NULL IF NO HISTORY) */}
      <ContinueReading />

      {/* ─── SECTION I: DAILY NOTES (THE LIVE THING) ─── */}
      <section aria-labelledby="section-notes-heading" className="mb-14">
        <div className="flex items-center justify-between gap-4 mb-6 border-b border-hairline pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
            <h2 id="section-notes-heading" className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-ink">
              LIVE NOTES // {detailedNotes.length} ENTRIES
            </h2>
          </div>
          <Link
            href="/notebook/notes"
            className="font-mono text-xs text-ink-faint hover:text-accent transition-colors uppercase tracking-widest"
          >
            All Notes →
          </Link>
        </div>

        {/* LEAD NOTE (NEWEST WORK - REAL WEIGHT & EXCERPT) */}
        {leadNote && (
          <div className="mb-8 p-6 sm:p-8 rounded-2xl border border-accent/40 bg-surface-raised shadow-xl relative overflow-hidden group hover:border-accent transition-all">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent" />

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink-faint mb-4">
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
              <p className="text-ink-muted font-serif italic text-base sm:text-lg mb-4">
                {leadNote.frontmatter.subtitle}
              </p>
            )}

            {leadNote.description && (
              <p className="text-ink-muted font-serif text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                {leadNote.description}
              </p>
            )}

            {/* TAGS */}
            {leadNote.frontmatter.tags && leadNote.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6 font-mono text-[10px]">
                {leadNote.frontmatter.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded border border-hairline bg-surface-sunken text-ink-muted uppercase">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* ACTION BUTTON */}
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
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-faint mb-2">
              PREVIOUS NOTES
            </div>
            {streamNotes.map((note) => (
              <Link
                key={note.frontmatter.slug}
                href={`/notebook/notes/${note.frontmatter.slug}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-hairline bg-surface-raised hover:border-accent/60 transition-all group"
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

      {/* ─── SECTION II: THE REFERENCE LIBRARY (QUIET, CONFIDENT SINGLE BLOCK) ─── */}
      <section aria-labelledby="section-library-heading" className="mb-12">
        <div className="border-b border-hairline pb-3 mb-6">
          <h2 id="section-library-heading" className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-ink-faint">
            ARCHIVE // TEXTBOOK REFERENCE CORPUS
          </h2>
        </div>

        <div className="border border-hairline rounded-2xl p-6 sm:p-8 bg-surface-raised flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-hairline transition-all">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-accent uppercase font-semibold mb-2">
              <span>{totalChapters} CHAPTERS</span>
              <span>·</span>
              <span>{fmt(totalWords)} WORDS</span>
              <span>·</span>
              <span>{totalVolumes} VOLUMES</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink mb-2">
              Reference Library
            </h3>
            <p className="text-ink-muted font-serif text-sm leading-relaxed">
              Comprehensive reference material across Indian Retail Credit Risk systems (PD/ECL scorecards, regulatory capital) and Forward-Deployed AI Engineering.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/notebook/library"
              className="py-3 px-6 rounded-xl bg-surface-sunken border border-hairline text-ink font-mono font-bold text-xs uppercase tracking-wider text-center hover:border-accent hover:text-accent transition-all"
            >
              Explore Library →
            </Link>
            <RandomChapterButton chapters={chapterUrls} />
          </div>
        </div>
      </section>
    </div>
  );
}
