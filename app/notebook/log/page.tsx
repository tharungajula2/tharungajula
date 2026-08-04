import Link from 'next/link';
import { getAllLogMonths } from '@/lib/notes';
import LogEntryItem from '@/components/notebook/LogEntryItem';

export const metadata = {
  title: 'Daily Log | Tharun Gajula',
  description: 'Daily engineering, credit risk modeling, and technical execution log.',
};

export default function LogIndexPage() {
  const allMonths = getAllLogMonths();

  if (allMonths.length === 0) {
    return null;
  }

  const recentMonths = allMonths.slice(0, 3);
  const olderMonths = allMonths.slice(3);

  return (
    <div className="w-full max-w-2xl mx-auto py-10 px-4 sm:px-6 text-ink font-sans text-left">
      <header className="mb-10 border-b border-hairline pb-6">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // DAILY LOG
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink mb-3">
          The Log
        </h1>
        <p className="text-ink-muted text-base sm:text-lg leading-relaxed font-serif">
          Short dated entries. One thing learned, built, read or decided.
        </p>
      </header>

      {/* RECENT 3 MONTHS IN FULL */}
      <div className="space-y-12">
        {recentMonths.map((mRecord) => (
          <section key={mRecord.month} className="space-y-4">
            <div className="flex items-center justify-between border-b border-hairline pb-2">
              <h2 className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-accent">
                {mRecord.title} ({mRecord.entries.length})
              </h2>
              <Link
                href={`/notebook/log/${mRecord.month}`}
                className="font-mono text-[10px] text-ink-faint hover:text-accent transition-colors uppercase tracking-widest"
              >
                Month View →
              </Link>
            </div>
            <div className="divide-y divide-hairline">
              {mRecord.entries.map((entry) => (
                <LogEntryItem key={entry.slug} entry={entry} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* OLDER MONTHS ARCHIVE LIST */}
      {olderMonths.length > 0 && (
        <section className="mt-16 pt-8 border-t border-hairline">
          <h3 className="text-xs font-mono font-semibold tracking-[0.25em] uppercase text-ink-faint mb-4">
            OLDER MONTHS ARCHIVE
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
            {olderMonths.map((m) => (
              <Link
                key={m.month}
                href={`/notebook/log/${m.month}`}
                className="p-3 rounded-xl border border-hairline bg-surface-raised hover:border-accent hover:text-accent transition-all flex items-center justify-between"
              >
                <span>{m.month}</span>
                <span className="text-[10px] text-ink-faint">({m.entries.length})</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
