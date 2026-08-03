import Link from 'next/link';
import { getAllTracks, getAllChapterParams, getAllNotes } from '@/lib/notes';
import ContinueReading from '@/components/blog/ContinueReading';
import RandomChapterButton from '@/components/blog/RandomChapterButton';

export const metadata = {
  title: 'Technical Library | Tharun Gajula',
  description: 'A 193,000-word reference corpus across Indian retail credit risk systems and forward-deployed AI engineering.',
};

// Format number with international grouping (176,324 not 1,76,324)
function fmt(n: number): string {
  return n.toLocaleString('en-US');
}

export default function BlogHomePage() {
  const tracks = getAllTracks();
  const allChapterParams = getAllChapterParams();
  const notes = getAllNotes();

  const chapterUrls = allChapterParams.map(
    (ch) => ({ url: `/blog/${ch.track}/${ch.volume}/${ch.slug}` })
  );

  const totalChapters = tracks.reduce((acc, t) => acc + t.chapterCount, 0);
  const totalWords = tracks.reduce((acc, t) => acc + t.totalWordCount, 0);
  const totalVolumes = tracks.reduce((acc, t) => acc + t.volumeCount, 0);

  const creditRiskTrack = tracks.find((t) => t.slug === 'credit-risk');
  const fdeTrack = tracks.find((t) => t.slug === 'fde');

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4 sm:px-6 text-ink font-sans">
      {/* RESUME READING BANNER — client component, only renders if localStorage has state */}
      <ContinueReading />

      {/* HERO HEADER */}
      <header className="mb-12 text-center sm:text-left">
        <div className="text-xs font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // TECHNICAL LIBRARY
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink mb-4">
          Technical Library
        </h1>
        <p className="text-ink-muted text-base sm:text-lg max-w-3xl leading-relaxed mb-6 font-serif">
          A {fmt(totalWords)}-word reference corpus across Indian retail credit risk modeling,
          regulatory architecture, and forward-deployed software engineering.
        </p>

        {/* SCALE STAT STRIP */}
        <div className="inline-flex flex-wrap items-center gap-3 sm:gap-6 py-2.5 px-4 rounded-xl border border-hairline bg-surface-raised font-mono text-xs text-ink-muted">
          <span><strong className="text-ink">2</strong> TRACKS</span>
          <span>·</span>
          <span><strong className="text-ink">{totalVolumes}</strong> VOLUMES</span>
          <span>·</span>
          <span><strong className="text-ink">{totalChapters}</strong> CHAPTERS</span>
          <span>·</span>
          <span><strong className="text-accent">{fmt(totalWords)}</strong> WORDS</span>
        </div>
      </header>

      {/* ── SECTION I: NOTES & REFERENCE VAULT ────────────────────────── */}
      <section aria-labelledby="section-notes" className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-ink-faint font-semibold mb-1">
              SECTION I
            </div>
            <h2 id="section-notes" className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
              Notes &amp; Reference Vault
            </h2>
          </div>
          <Link
            href="/blog/notes"
            className="font-mono text-xs text-ink-faint hover:text-accent transition-colors uppercase tracking-widest whitespace-nowrap"
          >
            View All Notes →
          </Link>
        </div>

        {notes.length === 0 ? (
          // Empty state: honest, shows it's live infrastructure not a placeholder
          <div className="border border-dashed border-hairline rounded-2xl p-6 sm:p-8 bg-surface-raised/40">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-ink-muted text-sm font-serif leading-relaxed max-w-2xl">
                  Regulatory master directions, quantitative code snippets, mathematical derivations,
                  and unedited field notes. Filed as they are written — not edited for completeness.
                  This section fills as source material is processed.
                </p>
              </div>
              <Link
                href="/blog/notes"
                className="shrink-0 px-3 py-1.5 rounded-lg border border-hairline bg-surface-sunken font-mono text-[11px] text-ink-muted hover:border-accent hover:text-accent transition-all uppercase tracking-wider whitespace-nowrap"
              >
                Open Vault →
              </Link>
            </div>
          </div>
        ) : (
          // Live notes list — shows up to 4, links to /blog/notes for the rest
          <div className="space-y-3">
            {notes.slice(0, 4).map((note) => (
              <Link
                key={note.slug}
                href={`/blog/notes/${note.slug}`}
                className="flex items-start justify-between gap-4 p-4 rounded-xl border border-hairline bg-surface-raised hover:border-accent/60 transition-all group"
              >
                <div className="min-w-0">
                  <span className="font-sans font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors text-sm block truncate">
                    {note.title}
                  </span>
                  {note.summary && (
                    <span className="text-ink-muted text-xs font-serif leading-snug line-clamp-1 block mt-0.5">
                      {note.summary}
                    </span>
                  )}
                </div>
                {note.date && (
                  <span className="font-mono text-[10px] text-ink-faint uppercase whitespace-nowrap pt-0.5 shrink-0">
                    {new Date(note.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </span>
                )}
              </Link>
            ))}
            {notes.length > 4 && (
              <Link href="/blog/notes" className="block text-center py-3 font-mono text-xs text-ink-faint hover:text-accent transition-colors uppercase tracking-wider">
                {notes.length - 4} more in the vault →
              </Link>
            )}
          </div>
        )}
      </section>

      {/* ── SECTION II: LIBRARY TRACKS ─────────────────────────────────── */}
      <section aria-labelledby="section-library" className="mb-12">
        <div className="mb-6">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-ink-faint font-semibold mb-1">
            SECTION II
          </div>
          <h2 id="section-library" className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
            The Library
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TRACK 1: CREDIT RISK */}
          {creditRiskTrack && (
            <div className="border border-hairline rounded-2xl p-6 sm:p-8 bg-surface-raised flex flex-col justify-between hover:border-accent/60 transition-all group shadow-sm">
              <div>
                <div className="text-[10px] font-mono tracking-[0.25em] text-accent uppercase font-bold mb-2">
                  TRACK 01 // CORE SUBJECT
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors mb-3">
                  {creditRiskTrack.label}
                </h3>
                <p className="text-ink-muted text-sm font-serif leading-relaxed mb-6">
                  PD scorecards, ECL staging under IFRS 9 / Ind AS 109, retail portfolio
                  loss forecasting, vintage analysis, and RBI regulatory architecture.
                </p>

                <div className="mb-6 flex flex-wrap gap-2 font-mono text-[11px] text-ink-faint">
                  <span className="px-2 py-1 rounded border border-hairline-faint bg-surface-sunken">
                    86 Definitions
                  </span>
                  <span className="px-2 py-1 rounded border border-hairline-faint bg-surface-sunken">
                    42 Traps
                  </span>
                  <span className="px-2 py-1 rounded border border-hairline-faint bg-surface-sunken">
                    18 Worked Calculations
                  </span>
                </div>
              </div>

              <div className="space-y-3 border-t border-hairline-faint pt-5 font-mono text-xs">
                <div className="text-ink-muted text-[11px] mb-2">
                  {creditRiskTrack.volumeCount} Volumes · {creditRiskTrack.chapterCount} Chapters · {fmt(creditRiskTrack.totalWordCount)} Words
                </div>
                <Link
                  href="/blog/credit-risk/00-the-map-and-the-sources/why-this-document-exists-first"
                  className="block w-full py-2.5 px-4 rounded-xl bg-accent text-surface text-center font-bold uppercase tracking-wider hover:opacity-95 transition-opacity"
                >
                  Start Reading → Vol 00, Ch 1
                </Link>
                <Link
                  href="/blog/credit-risk"
                  className="block w-full py-2 px-4 rounded-xl border border-hairline bg-surface-sunken text-ink text-center uppercase tracking-wider hover:border-accent hover:text-accent transition-all"
                >
                  View All {creditRiskTrack.volumeCount} Volumes
                </Link>
              </div>
            </div>
          )}

          {/* TRACK 2: FORWARD DEPLOYED ENGINEERING */}
          {fdeTrack && (
            <div className="border border-hairline rounded-2xl p-6 sm:p-8 bg-surface-raised flex flex-col justify-between hover:border-accent/60 transition-all group shadow-sm">
              <div>
                <div className="text-[10px] font-mono tracking-[0.25em] text-accent uppercase font-bold mb-2">
                  TRACK 02 // SYSTEMS &amp; PROOF
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors mb-3">
                  {fdeTrack.label}
                </h3>
                <p className="text-ink-muted text-sm font-serif leading-relaxed mb-6">
                  Production AI engineering, LLM evaluation pipelines, CI/CD gates,
                  real-world system failures, and production code under pressure.
                </p>

                <div className="mb-6 flex flex-wrap gap-2 font-mono text-[11px] text-ink-faint">
                  <span className="px-2 py-1 rounded border border-hairline-faint bg-surface-sunken">
                    188 Code Blocks
                  </span>
                  <span className="px-2 py-1 rounded border border-hairline-faint bg-surface-sunken">
                    24 Traps
                  </span>
                  <span className="px-2 py-1 rounded border border-hairline-faint bg-surface-sunken">
                    21 Checks
                  </span>
                </div>
              </div>

              <div className="space-y-3 border-t border-hairline-faint pt-5 font-mono text-xs">
                <div className="text-ink-muted text-[11px] mb-2">
                  {fdeTrack.volumeCount} Volumes · {fdeTrack.chapterCount} Chapters · {fmt(fdeTrack.totalWordCount)} Words
                </div>
                <Link
                  href="/blog/fde/00-the-floor/00-1-what-this-track-is"
                  className="block w-full py-2.5 px-4 rounded-xl bg-accent text-surface text-center font-bold uppercase tracking-wider hover:opacity-95 transition-opacity"
                >
                  Start Reading → Vol 00, Ch 1
                </Link>
                <Link
                  href="/blog/fde"
                  className="block w-full py-2 px-4 rounded-xl border border-hairline bg-surface-sunken text-ink text-center uppercase tracking-wider hover:border-accent hover:text-accent transition-all"
                >
                  View All {fdeTrack.volumeCount} Volumes
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RANDOM CHAPTER JUMP */}
      <div className="flex justify-center">
        <RandomChapterButton chapters={chapterUrls} />
      </div>
    </div>
  );
}
