import Link from 'next/link';
import { getAllDetailedNotes } from '@/lib/notes';

export const metadata = {
  title: 'Notes Series | Tharun Gajula',
  description: 'Full-length preparation notes on credit risk modelling and production systems.',
};

export default function NotesIndexPage() {
  const notes = getAllDetailedNotes();

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-10 px-4 sm:px-6 text-ink font-sans text-left pb-28 sm:pb-32">
      {/* HEADER */}
      <header className="mb-8">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-mono text-ink-muted">
          <Link href="/notebook" className="text-accent hover:underline">
            Notebook
          </Link>
          <span>/</span>
          <span className="text-ink font-bold uppercase">Notes Series</span>
        </nav>
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // NOTES SERIES
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink mb-3">
          TECHNICAL NOTES
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl font-serif">
          Curated notes from industry project reference and regulations. Built to take subjects from zero to working fluency.
        </p>
      </header>

      {/* STREAM OF DETAILED NOTES */}
      <div className="space-y-6">
        {notes.map((note, idx) => (
          <div
            key={note.frontmatter.slug}
            className="p-6 sm:p-8 rounded-2xl border border-hairline bg-surface-raised hover:border-accent/60 transition-all group"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-ink-faint mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-ink-muted">
                  NOTE #{String(idx + 1).padStart(3, '0')}
                </span>
                <span>·</span>
                <span>{note.sections.length} SECTIONS</span>
                <span>·</span>
                <span>~{note.totalReadingTimeMinutes} MIN READ</span>
                {note.frontmatter.date && (
                  <>
                    <span>·</span>
                    <span className="text-ink-faint">
                      {new Date(note.frontmatter.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase()}
                    </span>
                  </>
                )}
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
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-faint mb-2 flex items-center justify-between">
                  <span>SLIDE INDEX ({note.sections.length})</span>
                  <span>AUTHORED BY THARUN GAJULA</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {note.sections.slice(0, 6).map((sec, secIdx) => (
                    <Link
                      key={sec.slug || secIdx}
                      href={`/notebook/notes/${note.frontmatter.slug}#${sec.slideIndex || secIdx + 1}`}
                      className="text-xs font-mono py-1 px-2.5 rounded border border-hairline-faint bg-surface-sunken text-ink-muted hover:border-accent hover:text-accent transition-colors truncate max-w-[260px]"
                    >
                      #{String(sec.slideIndex || secIdx + 1).padStart(2, '0')} {sec.title}
                    </Link>
                  ))}
                  {note.sections.length > 6 && (
                    <Link
                      href={`/notebook/notes/${note.frontmatter.slug}`}
                      className="text-xs font-mono py-1 px-2.5 text-ink-faint hover:text-accent transition-colors"
                    >
                      +{note.sections.length - 6} more slides →
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
                className="py-2 px-4 rounded-xl bg-accent text-surface font-mono font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity text-center"
              >
                Launch Slide Deck →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
