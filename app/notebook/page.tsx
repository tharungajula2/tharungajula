import FieldCardsShelf from '@/components/notebook/FieldCardsShelf';
import { FIELD_CARDS } from '@/lib/field-cards';

const totalPacks = FIELD_CARDS.length;
const totalMissions = FIELD_CARDS.reduce((acc, pack) => acc + pack.missions, 0);
const totalCards = FIELD_CARDS.reduce((acc, pack) => acc + pack.cards, 0);

export const metadata = {
  title: 'Notebook — Field Cards | Tharun Gajula',
  description: `Production field cards across retail credit risk and AI engineering — ${totalPacks} packs, ${totalMissions} missions, and ${totalCards} cards compressed from first principles.`,
};

export default function NotebookHomePage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-10 px-4 sm:px-6 text-ink font-sans text-left pb-28 sm:pb-32 overflow-x-hidden">
      {/* ─── HERO HEADER & INTRO ─── */}
      <header className="mb-10 border-b border-hairline pb-8">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // FIELD CARDS REFERENCE SYSTEM
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink mb-4">
          FIELD CARDS
        </h1>

        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl font-serif">
          Production reference systems across retail credit risk and AI engineering. Compressed from first principles into {totalMissions} missions and {totalCards} cards across {totalPacks} standalone field packs.
        </p>
      </header>

      {/* ─── FIELD CARDS SHELF ─── */}
      <section aria-label="Field Cards Shelf" className="mb-12">
        <FieldCardsShelf />
      </section>
    </div>
  );
}
