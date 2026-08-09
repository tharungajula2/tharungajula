import Link from 'next/link';
import { getAllDetailedNotes } from '@/lib/notes';
import NotebookShelfToggle from '@/components/notebook/NotebookShelfToggle';

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
          TECHNICAL NOTES &amp; SLIDE DECKS
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl font-serif">
          Curated technical references and interactive slide decks on credit risk, AI engineering, and production systems.
        </p>
      </header>

      {/* SHELVES TOGGLE STREAM */}
      <NotebookShelfToggle notes={notes} />
    </div>
  );
}

