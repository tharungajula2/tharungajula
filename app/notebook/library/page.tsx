import Link from 'next/link';
import { getAllTracks, getAllChapterParams } from '@/lib/notes';
import RandomChapterButton from '@/components/notebook/RandomChapterButton';

export const metadata = {
  title: 'Library | Notebook | Tharun Gajula',
  description: 'Textbook tracks on Indian retail credit risk modelling and forward-deployed AI engineering.',
};

function fmt(n: number): string {
  return n.toLocaleString('en-US');
}

export default function LibraryIndexPage() {
  const tracks = getAllTracks();
  const allChapterParams = getAllChapterParams();

  const chapterUrls = allChapterParams.map(
    (ch) => ({ url: `/notebook/library/${ch.track}/${ch.volume}/${ch.slug}` })
  );

  const totalChapters = tracks.reduce((acc, t) => acc + t.chapterCount, 0);
  const totalWords = tracks.reduce((acc, t) => acc + t.totalWordCount, 0);
  const totalVolumes = tracks.reduce((acc, t) => acc + t.volumeCount, 0);

  const creditRiskTrack = tracks.find((t) => t.slug === 'credit-risk');
  const fdeTrack = tracks.find((t) => t.slug === 'fde');

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4 sm:px-6 text-ink font-sans">
      <div className="mb-6">
        <Link href="/notebook" className="font-mono text-xs text-ink-faint hover:text-accent transition-colors uppercase tracking-widest">
          ← Back to Notebook
        </Link>
      </div>

      <header className="mb-12 text-center sm:text-left">
        <div className="text-xs font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // TECHNICAL LIBRARY
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink mb-4">
          The Textbooks
        </h1>
        <p className="text-ink-muted text-base sm:text-lg max-w-3xl leading-relaxed mb-6 font-serif">
          A {fmt(totalWords)}-word reference corpus across Indian retail credit risk modeling,
          regulatory architecture, and forward-deployed software engineering.
        </p>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* TRACK 1: CREDIT RISK */}
        {creditRiskTrack && (
          <div className="border border-hairline rounded-2xl p-6 sm:p-8 bg-surface-raised flex flex-col justify-between hover:border-accent/60 transition-all group shadow-sm">
            <div>
              <div className="text-[10px] font-mono tracking-[0.25em] text-accent uppercase font-bold mb-2">
                TRACK 01 // CORE SUBJECT
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors mb-3">
                {creditRiskTrack.label}
              </h2>
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
                href="/notebook/library/credit-risk/00-the-map-and-the-sources/why-this-document-exists-first"
                className="block w-full py-2.5 px-4 rounded-xl bg-accent text-surface text-center font-bold uppercase tracking-wider hover:opacity-95 transition-opacity"
              >
                Start Reading → Vol 00, Ch 1
              </Link>
              <Link
                href="/notebook/library/credit-risk"
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
              <h2 className="text-2xl font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors mb-3">
                {fdeTrack.label}
              </h2>
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
                href="/notebook/library/fde/00-the-floor/00-1-what-this-track-is"
                className="block w-full py-2.5 px-4 rounded-xl bg-accent text-surface text-center font-bold uppercase tracking-wider hover:opacity-95 transition-opacity"
              >
                Start Reading → Vol 00, Ch 1
              </Link>
              <Link
                href="/notebook/library/fde"
                className="block w-full py-2 px-4 rounded-xl border border-hairline bg-surface-sunken text-ink text-center uppercase tracking-wider hover:border-accent hover:text-accent transition-all"
              >
                View All {fdeTrack.volumeCount} Volumes
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <RandomChapterButton chapters={chapterUrls} />
      </div>
    </div>
  );
}
