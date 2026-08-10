import Link from 'next/link';
import { getAllDetailedNotes } from '@/lib/notes';
import ContinueReading from '@/components/notebook/ContinueReading';
import NotebookShelfToggle from '@/components/notebook/NotebookShelfToggle';
import HeroSearchButton from '@/components/notebook/HeroSearchButton';

export const metadata = {
  title: 'Notebook | Tharun Gajula',
  description: 'Notes, frameworks, and reference systems across AI engineering, finance, analytics, and high-stakes production systems.',
};

export default function NotebookHomePage() {
  const detailedNotes = getAllDetailedNotes();

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-10 px-4 sm:px-6 text-ink font-sans text-left pb-28 sm:pb-32 overflow-x-hidden">
      {/* ─── HERO HEADER & INTRO WITH INTEGRATED SEARCH ─── */}
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <div>
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-1.5">
              // WORKING NOTEBOOK
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink">
              NOTEBOOK
            </h1>
          </div>

          {/* Integrated Hero Search Button */}
          <HeroSearchButton />
        </div>

        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl font-serif">
          Notes, frameworks, and reference systems across AI engineering, finance, analytics, and high-stakes production systems. Written from zero to working fluency.
        </p>
      </header>

      {/* RESUME READING */}
      <ContinueReading />

      {/* ─── SECTION I: 3-SHELF TRACK TOGGLE & NOTE CARDS ─── */}
      <section aria-labelledby="section-notes-heading" className="mb-12">
        <NotebookShelfToggle notes={detailedNotes} />
      </section>
    </div>
  );
}
