import FieldCardsShelf from '@/components/notebook/FieldCardsShelf';
import { FIELD_CARDS } from '@/lib/field-cards';

const activeCount = FIELD_CARDS.filter((pack) => pack.status === 'active').length;
const vaultCount = FIELD_CARDS.filter((pack) => pack.status !== 'active').length;
const totalMissions = FIELD_CARDS.reduce((acc, pack) => acc + pack.missions, 0);
const totalCards = FIELD_CARDS.reduce((acc, pack) => acc + pack.cards, 0);

export const metadata = {
  title: 'Notebook — Field Cards | Tharun Gajula',
  description: `Field-agent briefings on AI Stack, Credit Risk and system architecture — ${FIELD_CARDS.length} packs, ${totalMissions} missions, and ${totalCards} cards compressed from first principles.`,
};

export default function NotebookHomePage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-10 px-4 sm:px-6 text-ink font-sans text-left pb-28 sm:pb-32 overflow-x-hidden">
      {/* ─── HERO HEADER & INTRO ─── */}
      <header className="mb-10 border-b border-hairline pb-8">
        <div className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // FIELD CARDS — REFERENCE SYSTEM
        </div>
        <h1
          className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink mb-4"
          style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
        >
          FIELD CARDS
        </h1>

        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl font-serif mb-6">
          Field-agent briefings, one subject at a time. Each pack runs in missions of self-contained cards — dense, first-principles, built to be read on a phone in the gaps. A subject enters active rotation when it's being worked end-to-end; everything else waits in the vault until its turn. Written to be finished, not admired.
        </p>

        {/* ─── DYNAMIC STAT LINE ─── */}
        <div className="text-xs font-mono text-ink-muted tracking-wider uppercase flex flex-wrap gap-2 items-center">
          <span>
            <strong className="text-accent font-bold">{activeCount}</strong> ACTIVE
          </span>
          <span className="text-ink-faint select-none">·</span>
          <span>
            <strong className="text-accent font-bold">{vaultCount}</strong> IN THE VAULT
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
