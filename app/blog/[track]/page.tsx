import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTrack, getVolumesForTrack } from '@/lib/notes';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { track: 'credit-risk' },
    { track: 'fde' },
  ];
}

interface TrackPageProps {
  params: Promise<{ track: string }>;
}

export async function generateMetadata({ params }: TrackPageProps) {
  const { track: trackSlug } = await params;
  const track = getTrack(trackSlug);
  if (!track) return {};
  return {
    title: `${track.label} | Track Index`,
    description: `Complete 10-volume roadmap for ${track.label}.`,
  };
}

export default async function TrackIndexPage({ params }: TrackPageProps) {
  const { track: trackSlug } = await params;
  const track = getTrack(trackSlug);

  if (!track) {
    notFound();
  }

  const volumes = getVolumesForTrack(trackSlug);

  const totalChapters = volumes.reduce((acc, v) => acc + v.chapters.length, 0);
  const totalWords = volumes.reduce(
    (acc, v) => acc + v.chapters.reduce((cAcc, ch) => cAcc + (ch.frontmatter.wordCount || 0), 0),
    0
  );
  const totalReadingHours = (totalWords / 12000).toFixed(1); // approx 200 words/min = 12000 words/hr

  const firstChapter = volumes[0]?.chapters[0]?.frontmatter;
  const firstVolumeFolder = volumes[0]?.folderName;

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4 sm:px-6 text-ink font-sans">
      {/* BREADCRUMB NAVIGATION */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-ink-muted">
        <Link href="/blog" className="text-accent hover:underline">
          ← Library Home
        </Link>
        <span>/</span>
        <span className="text-ink font-bold uppercase">{track.label}</span>
      </nav>

      {/* TRACK HERO HEADER */}
      <header className="mb-10 p-6 sm:p-8 rounded-2xl border border-hairline bg-surface-raised">
        <div className="text-xs font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // TRACK ROADMAP
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-4">
          {track.label}
        </h1>
        <p className="text-ink-muted text-sm sm:text-base font-serif leading-relaxed mb-6 max-w-3xl">
          Structured 10-volume progression. Designed to be read sequentially from foundational architecture to advanced domain interrogations.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline-faint pt-4 font-mono text-xs text-ink-muted">
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <span><strong className="text-ink">10</strong> VOLUMES</span>
            <span>•</span>
            <span><strong className="text-ink">{totalChapters}</strong> CHAPTERS</span>
            <span>•</span>
            <span><strong className="text-accent">{totalWords.toLocaleString('en-US')}</strong> WORDS</span>
            <span>•</span>
            <span><strong className="text-ink">~{totalReadingHours}</strong> HOURS TOTAL</span>
          </div>

          {firstChapter && firstVolumeFolder && (
            <Link
              href={`/blog/${trackSlug}/${firstVolumeFolder}/${firstChapter.slug}`}
              className="px-4 py-2 rounded-xl bg-accent text-surface font-bold uppercase tracking-wider hover:opacity-95 transition-opacity whitespace-nowrap"
            >
              Start Track from Vol 00 →
            </Link>
          )}
        </div>
      </header>

      {/* 10 VOLUME ROADMAP CARDS */}
      <div className="space-y-6">
        {volumes.map((vol, idx) => {
          const volWordCount = vol.chapters.reduce((acc, c) => acc + (c.frontmatter.wordCount || 0), 0);
          const volReadMins = Math.ceil(volWordCount / 200);

          let volRoleTag = '[ TECHNICAL CORE ]';
          if (idx === 0) volRoleTag = '[ ORIENTATION & MAP ]';
          else if (idx === volumes.length - 1) volRoleTag = '[ THE INTERROGATION / QUESTION BANK ]';

          const chapterPreviews = vol.chapters.slice(0, 3);

          return (
            <div
              key={vol.folderName}
              className="border border-hairline rounded-2xl p-6 bg-surface-raised hover:border-accent/60 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-hairline-faint">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-xs text-accent font-bold uppercase">
                      VOL {String(idx).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-ink-faint border border-hairline-faint px-2 py-0.5 rounded bg-surface-sunken">
                      {volRoleTag}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors">
                    <Link href={`/blog/${trackSlug}/${vol.folderName}`}>
                      {vol.metadata.title}
                    </Link>
                  </h2>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs text-ink-muted whitespace-nowrap">
                  <span>{vol.chapters.length} Chapters</span>
                  <span>•</span>
                  <span>{volWordCount.toLocaleString('en-US')} words</span>
                  <span>•</span>
                  <span>{volReadMins} mins</span>
                </div>
              </div>

              {/* PREVIEW OF FIRST 3 CHAPTERS */}
              <div className="mb-5 space-y-2 font-mono text-xs">
                <div className="text-[10px] text-ink-faint uppercase tracking-wider mb-2">
                  // CHAPTER PREVIEW:
                </div>
                {chapterPreviews.map((ch) => (
                  <div key={ch.frontmatter.slug} className="flex items-center gap-3 text-ink-muted">
                    <span className="text-accent text-[11px] font-bold">
                      {ch.frontmatter.sectionNumber ? `§${ch.frontmatter.sectionNumber}` : '•'}
                    </span>
                    <Link
                      href={`/blog/${trackSlug}/${vol.folderName}/${ch.frontmatter.slug}`}
                      className="hover:text-ink transition-colors truncate font-sans text-xs"
                    >
                      {ch.frontmatter.title}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Link
                  href={`/blog/${trackSlug}/${vol.folderName}`}
                  className="inline-flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase hover:underline"
                >
                  Explore All {vol.chapters.length} Chapters →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
