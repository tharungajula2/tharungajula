import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllNoteParams, getNoteOverview } from '@/lib/notes';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNoteParams();
}

interface NotePageProps {
  params: Promise<{ note: string }>;
}

export async function generateMetadata({ params }: NotePageProps) {
  const { note: noteSlug } = await params;
  const overview = await getNoteOverview(noteSlug);
  if (!overview) return {};

  return {
    title: `${overview.frontmatter.title} | Notebook`,
    description: overview.description || overview.frontmatter.subtitle || overview.frontmatter.title,
  };
}

export default async function NoteOverviewPage({ params }: NotePageProps) {
  const { note: noteSlug } = await params;
  const overview = await getNoteOverview(noteSlug);

  if (!overview) {
    notFound();
  }

  const { frontmatter, preambleHtml, sections, totalWordCount, totalReadingTimeMinutes } = overview;
  const firstSection = sections[0];

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 sm:px-6 text-ink font-sans pb-48">
      {/* BREADCRUMB NAVIGATION */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-ink-muted">
        <Link href="/notebook" className="text-accent hover:underline">
          Notebook
        </Link>
        <span>/</span>
        <Link href="/notebook/notes" className="text-accent hover:underline">
          Notes
        </Link>
        <span>/</span>
        <span className="text-ink font-bold uppercase truncate max-w-[200px]">{frontmatter.title}</span>
      </nav>

      {/* NOTE OVERVIEW HEADER */}
      <header className="mb-10 p-6 sm:p-8 rounded-2xl border border-hairline bg-surface-raised">
        <div className="text-xs font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // WORKING NOTE OVERVIEW
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-3">
          {frontmatter.title}
        </h1>
        {frontmatter.subtitle && (
          <p className="text-ink-muted text-base font-serif italic mb-6">
            {frontmatter.subtitle}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline-faint pt-4 font-mono text-xs text-ink-muted">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {frontmatter.date && (
              <>
                <span>DATE: <strong className="text-ink">{new Date(frontmatter.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</strong></span>
                <span>•</span>
              </>
            )}
            <span><strong className="text-ink">{sections.length}</strong> SECTIONS</span>
            <span>•</span>
            <span><strong className="text-accent">{totalWordCount.toLocaleString('en-US')}</strong> WORDS</span>
            <span>•</span>
            <span><strong className="text-ink">~{totalReadingTimeMinutes} MINS</strong> READ</span>
          </div>

          {firstSection && (
            <Link
              href={`/notebook/notes/${noteSlug}/${firstSection.slug}`}
              className="px-4 py-2 rounded-xl bg-accent text-surface font-bold uppercase tracking-wider hover:opacity-95 transition-opacity whitespace-nowrap"
            >
              Start Reading → Section 1
            </Link>
          )}
        </div>
      </header>

      {/* PREAMBLE CONTENT */}
      {preambleHtml && (
        <section className="mb-12 p-6 sm:p-8 rounded-2xl border border-hairline bg-surface-raised/40">
          <div className="text-xs font-mono tracking-[0.25em] uppercase text-ink-faint mb-4">
            // PREAMBLE &amp; OVERVIEW
          </div>
          <div
            className="prose-reading max-w-none space-y-4"
            dangerouslySetInnerHTML={{ __html: preambleHtml }}
          />
        </section>
      )}

      {/* SECTIONS INDEX TABLE */}
      {sections.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold uppercase tracking-tight text-ink">
              Sections Index ({sections.length})
            </h2>
            <span className="font-mono text-xs text-ink-faint uppercase">
              Select section to read
            </span>
          </div>

          <div className="space-y-3">
            {sections.map((sec, idx) => (
              <Link
                key={sec.slug}
                href={`/notebook/notes/${noteSlug}/${sec.slug}`}
                className="flex items-start justify-between gap-4 p-5 rounded-2xl border border-hairline bg-surface-raised hover:border-accent/60 transition-all group shadow-sm"
              >
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="font-mono text-xs font-bold text-accent shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="font-sans font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors text-base truncate">
                    {sec.title}
                  </span>
                </div>
                <div className="font-mono text-xs text-ink-muted shrink-0 whitespace-nowrap pt-0.5">
                  {sec.wordCount.toLocaleString('en-US')} words · {sec.readingTimeMinutes} min
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
