import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllNoteParams, getNote } from '@/lib/notes';

export const dynamicParams = false;

export function generateStaticParams() {
  const params = getAllNoteParams();
  if (params.length === 0) return [];
  return params;
}

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) return {};
  return {
    title: `${note.frontmatter.title} | Field Notes`,
    description: note.description || note.frontmatter.summary || note.frontmatter.title,
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNote(slug);

  if (!note) notFound();

  const { frontmatter, html } = note;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-48 text-ink font-sans">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-xs font-mono text-ink-muted border-b border-hairline-faint pb-4">
        <Link href="/blog" className="text-accent hover:underline">Library</Link>
        <span>/</span>
        <Link href="/blog/notes" className="text-accent hover:underline">Notes</Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-ink-faint font-semibold mb-2">
          // FIELD NOTE
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-4">
          {frontmatter.title}
        </h1>
        <div className="flex items-center gap-4 text-xs font-mono text-ink-faint">
          {frontmatter.date && (
            <span>
              {new Date(frontmatter.date).toLocaleDateString('en-GB', {
                day: '2-digit', month: 'long', year: 'numeric'
              })}
            </span>
          )}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {frontmatter.tags.map(tag => (
                <span key={tag} className="uppercase border border-hairline-faint rounded px-1.5 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div
        className="prose-reading max-w-none space-y-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-16 pt-6 border-t border-hairline-faint">
        <Link href="/blog/notes" className="font-mono text-xs text-ink-faint hover:text-accent transition-colors uppercase tracking-widest">
          ← Back to Notes
        </Link>
      </div>
    </div>
  );
}
