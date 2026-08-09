import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllNoteSectionParams, getNoteSection } from '@/lib/notes';
import SectionRail from '@/components/notebook/SectionRail';
import ReadingBar from '@/components/notebook/ReadingBar';
import CodeBlockEnhancer from '@/components/notebook/CodeBlockEnhancer';

export const dynamicParams = false;

export function generateStaticParams() {
  const params = getAllNoteSectionParams();
  return params.map((p) => ({
    note: p.note,
    section: p.section,
  }));
}

interface NoteSectionPageProps {
  params: Promise<{ note: string; section: string }>;
}

export async function generateMetadata({ params }: NoteSectionPageProps) {
  const { note: noteSlug, section: sectionSlug } = await params;
  const sectionData = await getNoteSection(noteSlug, sectionSlug);
  if (!sectionData) return {};

  return {
    title: `${sectionData.section.title} | ${sectionData.noteTitle} | Notebook`,
    description: `${sectionData.section.title} — Section in ${sectionData.noteTitle}`,
  };
}

export default async function NoteSectionPage({ params }: NoteSectionPageProps) {
  const { note: noteSlug, section: sectionSlug } = await params;
  const sectionData = await getNoteSection(noteSlug, sectionSlug);

  if (!sectionData) {
    notFound();
  }

  const { noteTitle, section, headings, allSections, currentIndex, totalSections, prevSection, nextSection } = sectionData;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-48 font-sans">
      <CodeBlockEnhancer />
      {/* READING BAR (BACK, PROGRESS, MOBILE JUMP SHEET, THEME) */}

      <ReadingBar
        noteTitle={noteTitle}
        noteSlug={noteSlug}
        currentSectionSlug={sectionSlug}
        sections={allSections}
        currentIndex={currentIndex}
        totalSections={totalSections}
      />

      {/* TWO COLUMN READING LAYOUT */}
      <div className="flex flex-col xl:flex-row xl:gap-16 justify-center items-start">
        {/* MAIN READING COLUMN */}
        <article className="w-full max-w-2xl shrink-0">
          <header className="mb-10">
            <div className="text-xs font-mono tracking-[0.25em] text-accent uppercase font-semibold mb-2">
              // NOTE SECTION · {noteTitle}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-4 leading-tight">
              {section.title}
            </h1>
            <div className="flex items-center gap-4 text-xs font-mono text-ink-faint">
              <span>{section.wordCount.toLocaleString('en-US')} words</span>
              <span>•</span>
              <span>{section.readingTimeMinutes} min read</span>
            </div>
          </header>

          {/* COMPILED HTML BODY */}
          <div
            className="prose-reading max-w-none space-y-4"
            dangerouslySetInnerHTML={{ __html: section.html }}
          />

          {/* PREV / NEXT SECTION NAVIGATION FOOTER (STRICTLY WITHIN THIS NOTE) */}
          <nav aria-label="Section pagination" className="mt-16 pt-8 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {prevSection ? (
              <Link
                href={`/notebook/notes/${noteSlug}/${prevSection.slug}`}
                className="p-4 rounded-xl border border-hairline hover:border-accent bg-surface-raised transition-all group block text-left"
              >
                <span className="text-ink-faint uppercase text-[10px] block mb-1">← Previous Section</span>
                <span className="text-ink group-hover:text-accent font-sans font-bold uppercase block truncate">
                  {prevSection.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextSection ? (
              <Link
                href={`/notebook/notes/${noteSlug}/${nextSection.slug}`}
                className="p-4 rounded-xl border border-hairline hover:border-accent bg-surface-raised transition-all group block text-right"
              >
                <span className="text-ink-faint uppercase text-[10px] block mb-1">Next Section →</span>
                <span className="text-ink group-hover:text-accent font-sans font-bold uppercase block truncate">
                  {nextSection.title}
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
