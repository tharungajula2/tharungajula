import Link from 'next/link';
import { getAllNotes } from '@/lib/notes';

export const metadata = {
  title: 'Notes & Reference Vault | Tharun Gajula',
  description: 'Regulatory master directions, quantitative code snippets, mathematical derivations, and field notes.',
};

export default function NotesIndexPage() {
  const notes = getAllNotes();

  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-4 sm:px-6 text-ink font-sans">
      {/* Header */}
      <header className="mb-10">
        <div className="text-xs font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // SECTION I · FIELD NOTES
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-4">
          Notes &amp; Reference Vault
        </h1>
        <p className="text-ink-muted text-base leading-relaxed font-serif max-w-2xl">
          Regulatory master directions, quantitative code snippets, mathematical derivations,
          and unedited field notes. Filed as they are written — not edited for completeness.
        </p>
      </header>

      {/* Empty state or note list */}
      {notes.length === 0 ? (
        <div className="border border-dashed border-hairline rounded-2xl p-8 sm:p-12 text-center">
          <div className="font-mono text-xs text-ink-faint uppercase tracking-widest mb-3">
            // VAULT IS EMPTY
          </div>
          <p className="text-ink-muted font-serif text-base leading-relaxed max-w-md mx-auto">
            No notes have been filed yet. This vault fills as source material is processed
            — master directions, derivations, and reference tables appear here before they
            are absorbed into the main library.
          </p>
        </div>
      ) : (
        <ol className="space-y-4" reversed={false}>
          {notes.map((note) => (
            <li key={note.slug}>
              <Link
                href={`/blog/notes/${note.slug}`}
                className="block p-5 rounded-xl border border-hairline bg-surface-raised hover:border-accent/60 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="font-sans font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors text-base mb-1 truncate">
                      {note.title}
                    </h2>
                    {note.summary && (
                      <p className="text-ink-muted text-sm font-serif leading-snug line-clamp-2">
                        {note.summary}
                      </p>
                    )}
                    {note.tags && note.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {note.tags.map(tag => (
                          <span key={tag} className="font-mono text-[10px] text-ink-faint uppercase border border-hairline-faint rounded px-1.5 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {note.date && (
                    <span className="font-mono text-[10px] text-ink-faint uppercase whitespace-nowrap pt-0.5 shrink-0">
                      {new Date(note.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-10 pt-6 border-t border-hairline-faint">
        <Link href="/blog" className="font-mono text-xs text-ink-faint hover:text-accent transition-colors uppercase tracking-widest">
          ← Back to Library
        </Link>
      </div>
    </div>
  );
}
