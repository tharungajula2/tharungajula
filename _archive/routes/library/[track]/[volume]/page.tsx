import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllVolumeParams, getTrack, getVolumesForTrack, getChapter } from '@/lib/notes';

export const dynamicParams = false;

export function generateStaticParams() {
  const volParams = getAllVolumeParams();
  return volParams.map(p => ({
    track: p.track,
    volume: p.volume,
  }));
}

interface VolumePageProps {
  params: Promise<{ track: string; volume: string }>;
}

export async function generateMetadata({ params }: VolumePageProps) {
  const { track: trackSlug, volume: volumeFolder } = await params;
  const volumes = getVolumesForTrack(trackSlug);
  const vol = volumes.find(v => v.folderName === volumeFolder);
  if (!vol) return {};
  return {
    title: `${vol.metadata.title} | Volume Index | Notebook`,
    description: `Volume ${vol.metadata.volume} in ${vol.metadata.track}. Contains ${vol.chapters.length} chapters.`,
  };
}

export default async function VolumeIndexPage({ params }: VolumePageProps) {
  const { track: trackSlug, volume: volumeFolder } = await params;
  const track = getTrack(trackSlug);
  if (!track) notFound();

  const volumes = getVolumesForTrack(trackSlug);
  const vol = volumes.find(v => v.folderName === volumeFolder);
  if (!vol) notFound();

  const chaptersWithExtracts = await Promise.all(
    vol.chapters.map(async (ch) => {
      const fullChapter = await getChapter(trackSlug, volumeFolder, ch.frontmatter.slug);
      return {
        record: ch,
        extract: fullChapter?.description || '',
      };
    })
  );

  const volWordCount = vol.chapters.reduce((acc, c) => acc + (c.frontmatter.wordCount || 0), 0);
  const volReadMins = Math.ceil(volWordCount / 200);

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 sm:px-6 text-ink font-sans">
      {/* BREADCRUMB NAVIGATION */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-mono text-ink-muted">
        <Link href="/notebook/library" className="text-accent hover:underline">
          Library
        </Link>
        <span>/</span>
        <Link href={`/notebook/library/${trackSlug}`} className="text-accent hover:underline">
          {track.label}
        </Link>
        <span>/</span>
        <span className="text-ink font-bold uppercase">Volume {vol.metadata.volume}</span>
      </nav>

      {/* VOLUME HEADER */}
      <header className="mb-10 p-6 sm:p-8 rounded-2xl border border-hairline bg-surface-raised">
        <div className="text-xs font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          {track.label} · VOLUME {vol.metadata.volume}
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-4">
          {vol.metadata.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-ink-muted border-t border-hairline-faint pt-4">
          <span><strong className="text-ink">{vol.chapters.length}</strong> CHAPTERS</span>
          <span>•</span>
          <span><strong className="text-accent">{volWordCount.toLocaleString('en-US')}</strong> WORDS</span>
          <span>•</span>
          <span><strong className="text-ink">~{volReadMins} MINS</strong> TOTAL READ</span>
        </div>
      </header>

      {/* MOBILE-FIRST CHAPTER FEED */}
      <div className="space-y-4">
        {chaptersWithExtracts.map(({ record: ch, extract }, idx) => {
          const isScene = ch.frontmatter.kind === 'scene';
          const readTime = Math.ceil((ch.frontmatter.wordCount || 500) / 200);

          if (isScene) {
            return (
              <div
                key={ch.frontmatter.slug}
                className="border-l-2 border-hairline pl-5 py-4 my-6 bg-surface-sunken/40 rounded-r-xl transition-all hover:border-accent group"
              >
                <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase text-ink-faint mb-1">
                  <span>// SCENE INTERLUDE</span>
                  <span>{ch.frontmatter.wordCount} words • {readTime} min</span>
                </div>
                <h2 className="text-lg font-bold text-ink-muted italic group-hover:text-accent transition-colors mb-2">
                  <Link href={`/notebook/library/${trackSlug}/${volumeFolder}/${ch.frontmatter.slug}`}>
                    {ch.frontmatter.title}
                  </Link>
                </h2>
                {extract && (
                  <p className="text-xs font-serif text-ink-faint italic line-clamp-2 leading-relaxed">
                    "{extract}"
                  </p>
                )}
              </div>
            );
          }

          return (
            <article
              key={ch.frontmatter.slug}
              className="p-5 sm:p-6 rounded-2xl border border-hairline bg-surface-raised hover:border-accent/60 transition-all group shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs font-bold text-accent shrink-0">
                    {ch.frontmatter.sectionNumber ? `§${ch.frontmatter.sectionNumber}` : `${idx + 1}.`}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors">
                    <Link href={`/notebook/library/${trackSlug}/${volumeFolder}/${ch.frontmatter.slug}`}>
                      {ch.frontmatter.title}
                    </Link>
                  </h2>
                </div>

                <div className="font-mono text-[11px] text-ink-faint shrink-0 whitespace-nowrap self-start">
                  {ch.frontmatter.wordCount} words • {readTime} min read
                </div>
              </div>

              {extract && (
                <p className="text-sm font-serif text-ink-muted leading-relaxed line-clamp-2 pl-6 sm:pl-7">
                  {extract}
                </p>
              )}

              <div className="mt-4 pt-3 border-t border-hairline-faint flex justify-end">
                <Link
                  href={`/notebook/library/${trackSlug}/${volumeFolder}/${ch.frontmatter.slug}`}
                  className="font-mono text-xs font-bold uppercase text-accent hover:underline inline-flex items-center gap-1"
                >
                  Read Chapter →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
