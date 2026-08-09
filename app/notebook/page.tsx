import Link from 'next/link';
import { getAllDetailedNotes, getAllLogEntries } from '@/lib/notes';
import ContinueReading from '@/components/notebook/ContinueReading';
import NotebookShelfToggle from '@/components/notebook/NotebookShelfToggle';

export const metadata = {
  title: 'Notebook | Tharun Gajula',
  description: 'Notes on credit risk modelling and the systems that carry models into production.',
};

export default function NotebookHomePage() {
  const detailedNotes = getAllDetailedNotes();
  const logEntries = getAllLogEntries();
  const recentLogEntries = logEntries.slice(0, 5);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-10 px-4 sm:px-6 text-ink font-sans text-left pb-28 sm:pb-32">
      {/* ─── HEADER & INTRO ─── */}
      <header className="mb-6">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // WORKING NOTEBOOK
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink mb-3">
          NOTEBOOK
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl font-serif">
          Notes on credit risk modelling and the systems that carry models into production. Each one takes a single subject from zero to working fluency, and is written to be re-read.
        </p>
      </header>

      {/* RESUME READING */}
      <ContinueReading />

      {/* ─── SECTION I: NOTES BLOCK WITH SHELF TOGGLE ─── */}
      <section aria-labelledby="section-notes-heading" className="mb-12">
        <NotebookShelfToggle notes={detailedNotes} />
      </section>

      {/* ─── SECTION II: THE LOG BLOCK ─── */}
      {recentLogEntries.length > 0 && (

        <section aria-labelledby="section-log-heading" className="mb-8">
          <div className="border-b border-hairline pb-2.5 mb-4">
            <div className="flex items-center justify-between gap-4">
              <h2 id="section-log-heading" className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-ink">
                THE LOG
              </h2>
              <Link
                href="/notebook/log"
                className="font-mono text-xs text-ink-faint hover:text-accent transition-colors uppercase tracking-widest"
              >
                ALL ENTRIES →
              </Link>
            </div>
            <p className="text-[11px] font-mono text-ink-faint mt-1">
              Short dated entries, posted when there is something worth posting.
            </p>
          </div>

          {/* STREAM OF MOST RECENT LOG ENTRIES */}
          <div className="divide-y divide-hairline">
            {recentLogEntries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/notebook/log/${entry.month}#${entry.slug}`}
                className="py-3.5 block group hover:bg-surface-raised/40 px-2 rounded-lg transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-1">
                  <h3 className="font-bold text-ink uppercase text-sm group-hover:text-accent transition-colors truncate">
                    {entry.title}
                  </h3>
                  <span className="font-mono text-[11px] text-accent font-semibold shrink-0">
                    {entry.date}
                  </span>
                </div>
                <p className="text-ink-muted font-serif text-xs leading-relaxed truncate">
                  {entry.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
