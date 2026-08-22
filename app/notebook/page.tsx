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

      {/* ─── INTERACTIVE SYSTEMS ─── */}
      <section aria-label="Interactive Systems" className="mb-12">
        <div className="flex items-center justify-between border-b border-hairline pb-3 mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
            // INTERACTIVE SYSTEMS
          </h2>
          <span className="text-[11px] font-mono text-ink-faint uppercase tracking-wider">
            FULL-SCREEN WORKSTATION
          </span>
        </div>

        <article className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-surface-raised backdrop-blur-2xl border border-accent/40 hover:border-accent shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-signal to-accent" />

          <div>
            <div className="flex items-center justify-between gap-3 mb-3 font-mono text-xs uppercase tracking-[0.18em]">
              <span className="text-accent font-bold">SYS-01 · APP WORKSTATION</span>
              <span className="px-2 py-0.5 rounded bg-signal/10 text-signal border border-signal/30 font-semibold text-[10px]">
                UK REGULATED BANK • LIVE SIMULATION
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mb-2 group-hover:text-accent transition-colors">
              RENFORGE CREDIT RISK OS
            </h3>
            <div className="text-xs font-mono text-accent uppercase tracking-widest font-semibold mb-4">
              Interactive UK regulated-bank simulation
            </div>

            <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-6 font-sans">
              Full-screen banking workstation connecting credit risk, IFRS 9 staging, Basel III IRB capital, Treasury, regulatory reporting, data lineage, and BA change delivery through one canonical synthetic bank (Renforge Bank plc).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-hairline-faint font-mono text-xs gap-4">
            <div className="flex flex-wrap gap-1.5">
              {['IFRS 9', 'BASEL 3.1', 'PRA COREP/FINREP', 'BCBS 239', 'BA TRACEABILITY'].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] uppercase bg-surface-sunken text-ink-muted border border-hairline-faint font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="/notebook/apps/credit-risk-os"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-surface font-bold uppercase tracking-wider text-xs hover:opacity-90 transition-all cursor-pointer shadow-md whitespace-nowrap"
            >
              LAUNCH SYSTEM →
            </a>
          </div>
        </article>
      </section>

      {/* ─── FIELD CARDS SHELF ─── */}
      <section aria-label="Field Cards Shelf" className="mb-12">
        <FieldCardsShelf />
      </section>
    </div>
  );
}

