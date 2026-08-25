import { getKnowledgeItems } from '@/lib/knowledge';
import NotebookLibrary from '@/components/notebook/NotebookLibrary';

export const metadata = {
  title: 'Notebook — Knowledge Library | Tharun Gajula',
  description: 'Standalone HTML Field Cards and Markdown Mastery Manuals for deep study and quick reference.',
};

export default function NotebookHomePage() {
  const items = getKnowledgeItems();

  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-10 px-4 sm:px-6 text-ink font-sans text-left pb-28 sm:pb-32 overflow-x-hidden">
      {/* ─── HERO HEADER ─── */}
      <header className="mb-10 border-b border-hairline pb-8">
        <div className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          {'// KNOWLEDGE LIBRARY'}
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-3">
          Notebook
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl font-sans">
          Standalone HTML Field Cards and Markdown Mastery Manuals.
        </p>
      </header>

      {/* ─── BOOKSHELF LIBRARY ─── */}
      <section aria-label="Knowledge Library">
        <NotebookLibrary items={items} />
      </section>
    </div>
  );
}
