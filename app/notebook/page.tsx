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
    </div>
  );
}
