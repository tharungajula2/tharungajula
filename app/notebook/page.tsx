import FieldCardsShelf from '@/components/notebook/FieldCardsShelf';
import { FIELD_CARDS } from '@/lib/field-cards';

const totalPacks = FIELD_CARDS.length;
const totalMissions = FIELD_CARDS.reduce((acc, pack) => acc + pack.missions, 0);
const totalCards = FIELD_CARDS.reduce((acc, pack) => acc + pack.cards, 0);

export const metadata = {
  title: 'Notebook — Field Cards | Tharun Gajula',
  description: `Field-agent briefings on AI Stack, Credit Risk and system architecture — ${totalPacks} packs, ${totalMissions} missions, and ${totalCards} cards compressed from first principles.`,
};

export default function NotebookHomePage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-10 px-4 sm:px-6 text-ink font-sans text-left pb-28 sm:pb-32 overflow-x-hidden">
      {/* ─── HERO HEADER & INTRO ─── */}
      <header className="mb-10 border-b border-hairline pb-8">
        <div className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // FIELD CARDS — REFERENCE SYSTEM
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-4">
          FIELD CARDS
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl font-sans mb-6">
          Field-agent briefings on credit risk, AI architecture, and decision systems. Each pack runs in missions of self-contained cards — dense, first-principles, built to be read on a phone. Written to be finished, not admired.
        </p>

        {/* ─── DYNAMIC STAT LINE ─── */}
        <div className="text-xs font-mono text-ink-muted tracking-wider uppercase flex flex-wrap gap-2 items-center">
          <span>
            <strong className="text-accent font-bold">{totalPacks}</strong> REFERENCE PACKS
          </span>
          <span className="text-ink-faint select-none">·</span>
          <span>
            <strong className="text-accent font-bold">{totalCards}</strong> CARDS
          </span>
          <span className="text-ink-faint select-none">·</span>
          <span>
            <strong className="text-accent font-bold">{totalMissions}</strong> MISSIONS
          </span>
        </div>
      </header>

      {/* ─── FIELD CARDS SHELF ─── */}
      <section aria-label="Field Cards Shelf" className="mb-12">
        <FieldCardsShelf />
      </section>
    </div>
  );
}

