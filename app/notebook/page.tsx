import Link from 'next/link';
import FieldCardsShelf from '@/components/notebook/FieldCardsShelf';

export const metadata = {
  title: 'Notebook — Apps & Field Cards | Tharun Gajula',
  description: 'Interactive apps and standalone field notes for exploring projects, systems and ideas in depth.',
};

export default function NotebookHomePage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-10 px-4 sm:px-6 text-ink font-sans text-left pb-28 sm:pb-32 overflow-x-hidden">
      {/* ─── HERO HEADER ─── */}
      <header className="mb-10 border-b border-hairline pb-8">
        <div className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // NOTEBOOK
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-3">
          Notebook
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl font-sans mb-6">
          Interactive apps and standalone field notes.
        </p>

        {/* 2 CONTENT TYPES INTRO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div className="bg-surface-raised p-3.5 rounded-xl border border-hairline">
            <span className="text-accent font-bold block mb-1 uppercase tracking-wider">// APPS</span>
            <span className="text-ink-muted text-[11px] font-sans">
              Interactive environments for deeper project and system exploration.
            </span>
          </div>
          <div className="bg-surface-raised p-3.5 rounded-xl border border-hairline">
            <span className="text-accent font-bold block mb-1 uppercase tracking-wider">// FIELD CARDS</span>
            <span className="text-ink-muted text-[11px] font-sans">
              Standalone HTML notes for focused concepts, references and working knowledge.
            </span>
          </div>
        </div>
      </header>

      {/* ─── 01 · APPS ─── */}
      <section aria-label="Apps" className="mb-14">
        <div className="border-b border-hairline pb-3 mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
            // 01 · APPS
          </h2>
          <p className="text-xs text-ink-muted mt-1 font-sans">
            Interactive environments for deeper project and system exploration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {/* APP 1: CREDIT RISK OS */}
          <article className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-surface-raised backdrop-blur-2xl border border-hairline hover:border-accent/50 shadow-lg transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent group-hover:via-accent transition-all" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em]">
                <span className="text-accent font-bold">APP-01 · FULL WORKSTATION</span>
                <span className="px-2 py-0.5 rounded bg-signal/10 text-signal border border-signal/30 font-semibold text-[10px]">
                  MOCK BANK WORKSTATION
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-bold uppercase tracking-tight text-ink mb-2 group-hover:text-accent transition-colors">
                Credit Risk OS
              </h3>

              <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                Full-screen learning workstation connecting credit risk, IFRS 9 staging, Basel III IRB capital, Treasury, regulatory reporting, data lineage and BA change delivery through one synthetic bank.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['IFRS 9', 'BASEL 3.1', 'PRA COREP', 'BCBS 239'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-surface-sunken text-ink-muted border border-hairline-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-hairline-faint font-mono text-xs">
                <span className="text-ink-faint text-[10px] uppercase tracking-widest">
                  FULL WORKSTATION
                </span>
                <Link
                  href="/notebook/apps/credit-risk-os"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-surface font-bold uppercase tracking-wider text-xs hover:opacity-90 transition-all cursor-pointer shadow-md whitespace-nowrap"
                >
                  OPEN APP →
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ─── 02 · FIELD CARDS ─── */}
      <section aria-label="Field Cards" className="mb-12">
        <div className="border-b border-hairline pb-3 mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
            // 02 · FIELD CARDS
          </h2>
          <p className="text-xs text-ink-muted mt-1 font-sans">
            Standalone HTML notes for focused concepts, references and working knowledge.
          </p>
        </div>

        <FieldCardsShelf />
      </section>
    </div>
  );
}
