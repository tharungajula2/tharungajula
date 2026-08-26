import Link from 'next/link';
import { getAllLogMonths } from '@/lib/notes';

export const metadata = {
  title: 'Engineering & Risk Log | Tharun Gajula',
  description: 'Chronological archive of engineering decisions, risk insights, and operational notes.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LogIndexPage() {
  const months = getAllLogMonths();

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-10 px-4 sm:px-6 text-ink font-sans text-left pb-28 sm:pb-32">
      <header className="mb-8">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-mono text-ink-muted">
          <span className="text-ink font-bold uppercase">Engineering Log</span>
        </nav>
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // ENGINEERING & RISK LOG
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink mb-3">
          LOG ARCHIVE
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl font-serif">
          Chronological entries on credit risk modelling, pipeline diagnostics, and production system architecture.
        </p>
      </header>

      <div className="space-y-4">
        {months.map((m) => (
          <Link
            key={m.month}
            href={`/notebook/log/${m.month}`}
            className="p-5 rounded-2xl border border-hairline bg-surface-raised hover:border-accent/60 transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-mono text-xs font-bold text-accent uppercase tracking-wider mb-1">
                {m.month}
              </div>
              <h2 className="text-xl font-bold uppercase text-ink group-hover:text-accent transition-colors">
                {m.title || m.month}
              </h2>
            </div>
            <span className="font-mono text-xs text-ink-faint">
              {m.entries.length} {m.entries.length === 1 ? 'entry' : 'entries'} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
