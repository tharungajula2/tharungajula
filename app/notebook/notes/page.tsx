import Link from 'next/link';
import { getAllDetailedNotes } from '@/lib/notes';

export const metadata = {
  title: 'Daily Notes Index | Notebook | Tharun Gajula',
  description: 'Personal notebook of working notes, technical derivations, and field manuals.',
};

export default function NotesIndexPage() {
  const notes = getAllDetailedNotes();

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 sm:px-6 text-ink font-sans text-left">
      <div className="mb-6">
        <Link href="/notebook" className="font-mono text-xs text-ink-faint hover:text-accent transition-colors uppercase tracking-widest">
          ← Back to Notebook
        </Link>
      </div>

      <header className="mb-10 p-6 sm:p-8 rounded-2xl border border-hairline bg-surface-raised">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // WORKING NOTES INDEX
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-3">
          Daily Notes
        </h1>
        <p className="text-ink-muted text-sm sm:text-base font-serif leading-relaxed max-w-2xl">
          Raw working notes, interview preparation packs, and quantitative reference material. Chronologically indexed, newest first.
        </p>
      </header>

      {/* STREAM OF DETAILED NOTES */}
      <div className="space-y-6">
        {notes.map((note) => (
          <div
            key={note.frontmatter.slug}
            className="p-6 sm:p-8 rounded-2xl border border-hairline bg-surface-raised hover:border-accent/60 transition-all group"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-ink-faint mb-3">
              <div className="flex items-center gap-2">
                {note.frontmatter.date && (
                  <span className="text-accent font-bold">
                    {new Date(note.frontmatter.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                  </span>
                )}
                <span>·</span>
                <span>{note.sections.length} SECTIONS</span>
                <span>·</span>
                <span>~{note.totalReadingTimeMinutes} MIN READ</span>
              </div>
              <span className="text-[10px] uppercase text-signal font-semibold border border-signal/30 px-2 py-0.5 rounded">
                IN FORCE
              </span>
            </div>

            <h2 className="text-2xl font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors mb-2">
              <Link href={`/notebook/notes/${note.frontmatter.slug}`}>
                {note.frontmatter.title}
              </Link>
            </h2>

            {note.frontmatter.subtitle && (
              <p className="text-ink-muted font-serif italic text-base mb-4">
                {note.frontmatter.subtitle}
              </p>
            )}

            {/* SECTIONS PREVIEW LIST */}
            {note.sections.length > 0 && (
              <div className="mb-6 border-t border-hairline-faint pt-4">
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-faint mb-2">
                  SECTIONS ({note.sections.length})
                </div>
                <div className="flex flex-wrap gap-2">
                  {note.sections.slice(0, 6).map((sec, idx) => (
                    <Link
                      key={sec.slug}
                      href={`/notebook/notes/${note.frontmatter.slug}/${sec.slug}`}
                      className="text-xs font-mono py-1 px-2.5 rounded border border-hairline-faint bg-surface-sunken text-ink-muted hover:border-accent hover:text-accent transition-colors"
                    >
                      §{idx + 1} {sec.title}
                    </Link>
                  ))}
                  {note.sections.length > 6 && (
                    <Link
                      href={`/notebook/notes/${note.frontmatter.slug}`}
                      className="text-xs font-mono py-1 px-2.5 text-ink-faint hover:text-accent transition-colors"
                    >
                      +{note.sections.length - 6} more sections →
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* FOOTER METADATA & TAGS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-hairline-faint pt-4">
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                {note.frontmatter.tags?.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded border border-hairline bg-surface-sunken text-ink-faint uppercase">
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/notebook/notes/${note.frontmatter.slug}`}
                className="font-mono text-xs text-accent font-bold uppercase tracking-wider hover:underline"
              >
                Open Note Overview →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
