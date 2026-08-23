import Link from "next/link";
import { NOTEBOOK_MASTERCLASSES } from "@/lib/notebook-masterclasses";

export const metadata = {
  title: "Portfolio Masterclasses — Revision Notes | Tharun Gajula",
  description: "Collection of long-form technical revision notes for portfolio projects.",
};

export default function PortfolioMasterclassesAppRootPage() {
  return (
    <div className="w-full relative bg-surface text-ink font-sans text-left min-h-screen">
      {/* HEADER BAR */}
      <div className="sticky top-0 z-50 bg-surface-raised/95 backdrop-blur-xl border-b border-hairline px-4 sm:px-8 py-2.5">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3 font-mono text-xs">
          <Link
            href="/notebook"
            className="text-ink-muted hover:text-accent transition-colors uppercase tracking-wider text-[11px]"
          >
            ← Notebook
          </Link>
          <span className="text-accent font-semibold uppercase text-[11px]">
            Portfolio Masterclasses Index
          </span>
        </div>
      </div>

      {/* INDEX CONTENT */}
      <main className="max-w-3xl mx-auto py-10 sm:py-14 px-4 sm:px-6">
        <header className="mb-10 border-b border-hairline pb-6">
          <div className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-accent font-semibold mb-2">
            // REVISION NOTES COLLECTION
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-3">
            Portfolio Masterclasses
          </h1>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
            Long-form technical revision notes for interview preparation. Select a masterclass to read the complete note from start to finish.
          </p>
        </header>

        {/* INDEX LIST */}
        <div className="space-y-3 font-mono text-xs">
          {NOTEBOOK_MASTERCLASSES.map((item, idx) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-surface-raised border border-hairline hover:border-accent/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-accent font-bold text-sm">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="text-sm font-bold uppercase tracking-tight text-ink group-hover:text-accent transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[11px] font-sans text-ink-muted line-clamp-1">
                    {item.question}
                  </div>
                </div>
              </div>
              <span className="text-accent font-bold text-[11px] uppercase tracking-wider self-end sm:self-center shrink-0">
                Read Note →
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
