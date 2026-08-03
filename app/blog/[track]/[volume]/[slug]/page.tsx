import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllChapterParams, getChapter, getPrevNextChapters } from '@/lib/notes';
import SectionRail from '@/components/blog/SectionRail';
import ReadingTracker from '@/components/blog/ReadingTracker';
import { cn } from '@/lib/utils';

export const dynamicParams = false;

export function generateStaticParams() {
  const chapterParams = getAllChapterParams();
  return chapterParams.map(p => ({
    track: p.track,
    volume: p.volume,
    slug: p.slug,
  }));
}

interface ChapterPageProps {
  params: Promise<{ track: string; volume: string; slug: string }>;
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { track: trackSlug, volume: volumeFolder, slug: chapterSlug } = await params;
  const chapter = await getChapter(trackSlug, volumeFolder, chapterSlug);
  if (!chapter) return {};

  return {
    title: `${chapter.frontmatter.title} | ${chapter.frontmatter.trackLabel}`,
    description: chapter.description || `${chapter.frontmatter.title} - ${chapter.frontmatter.volumeTitle}`,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { track: trackSlug, volume: volumeFolder, slug: chapterSlug } = await params;
  const chapter = await getChapter(trackSlug, volumeFolder, chapterSlug);

  if (!chapter) {
    notFound();
  }

  const { frontmatter, html, headings } = chapter;
  const { prev, next } = getPrevNextChapters(trackSlug, volumeFolder, chapterSlug);

  const isScene = frontmatter.kind === 'scene';
  const readingTime = Math.ceil((frontmatter.wordCount || 500) / 200);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-48">
      <ReadingTracker
        trackSlug={trackSlug}
        volumeFolder={volumeFolder}
        chapterSlug={chapterSlug}
        title={frontmatter.title}
        trackLabel={frontmatter.trackLabel}
      />

      {/* MINIMAL BREADCRUMB NAVIGATION */}
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-xs font-mono text-ink-muted border-b border-hairline-faint pb-4">
        <Link href="/blog" className="text-accent hover:underline">
          Library
        </Link>
        <span>/</span>
        <Link href={`/blog/${trackSlug}`} className="text-accent hover:underline">
          {frontmatter.trackLabel}
        </Link>
        <span>/</span>
        <Link href={`/blog/${trackSlug}/${volumeFolder}`} className="text-accent hover:underline">
          {frontmatter.volumeTitle}
        </Link>
      </nav>

      {/* TWO COLUMN READING LAYOUT: Centered Reading Column + Desktop Section Rail */}
      <div className="flex flex-col xl:flex-row xl:gap-16 justify-center items-start">
        {/* MAIN READING COLUMN */}
        <article className="w-full max-w-2xl shrink-0">
          {/* HEADER */}
          <header className={cn("mb-10", isScene && "border-l-2 border-hairline pl-5 py-2")}>
            {isScene ? (
              <div className="text-xs font-mono tracking-[0.25em] text-ink-faint uppercase mb-2">
                // SCENE INTERLUDE · {frontmatter.volumeTitle}
              </div>
            ) : (
              <div className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-semibold mb-2">
                {frontmatter.trackLabel} · {frontmatter.volumeTitle}
              </div>
            )}

            <h1 className={cn(
              "font-bold uppercase tracking-tight text-ink mb-4 leading-tight",
              isScene ? "text-2xl sm:text-3xl italic text-ink-muted" : "text-3xl sm:text-4xl"
            )}>
              {frontmatter.sectionNumber ? `§${frontmatter.sectionNumber} · ` : ''}{frontmatter.title}
            </h1>

            <div className="flex items-center gap-4 text-xs font-mono text-ink-faint">
              <span>{(frontmatter.wordCount || 0).toLocaleString('en-US')} words</span>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>
          </header>

          {/* COMPILED HTML BODY WITH CALM TYPOGRAPHY */}
          <div 
            className="prose-reading max-w-none space-y-4"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* PREV / NEXT CHAPTER NAVIGATION FOOTER */}
          <nav aria-label="Chapter pagination" className="mt-16 pt-8 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {prev ? (
              <Link
                href={`/blog/${trackSlug}/${prev.volumeFolder}/${prev.slug}`}
                className="p-4 rounded-xl border border-hairline hover:border-accent bg-surface-raised transition-all group block text-left"
              >
                <span className="text-ink-faint uppercase text-[10px] block mb-1">← Previous Chapter</span>
                <span className="text-ink group-hover:text-accent font-sans font-bold uppercase block truncate">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/blog/${trackSlug}/${next.volumeFolder}/${next.slug}`}
                className="p-4 rounded-xl border border-hairline hover:border-accent bg-surface-raised transition-all group block text-right"
              >
                <span className="text-ink-faint uppercase text-[10px] block mb-1">Next Chapter →</span>
                <span className="text-ink group-hover:text-accent font-sans font-bold uppercase block truncate">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>

        {/* DESKTOP SECTION RAIL TOC */}
        <SectionRail headings={headings} />
      </div>
    </div>
  );
}
