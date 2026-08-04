import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLogMonth, getAllLogMonthParams } from '@/lib/notes';
import LogEntryItem from '@/components/notebook/LogEntryItem';

export async function generateStaticParams() {
  return getAllLogMonthParams();
}

interface MonthPageProps {
  params: Promise<{ month: string }>;
}

export async function generateMetadata({ params }: MonthPageProps) {
  const { month } = await params;
  const logRecord = getLogMonth(month);
  if (!logRecord) return { title: 'Log | Tharun Gajula' };
  return {
    title: `Log: ${logRecord.title} | Tharun Gajula`,
    description: `Daily engineering and credit risk log entries for ${logRecord.title}.`,
  };
}

export default async function MonthLogPage({ params }: MonthPageProps) {
  const { month } = await params;
  const logRecord = getLogMonth(month);

  if (!logRecord) {
    notFound();
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-10 px-4 sm:px-6 text-ink font-sans text-left">
      <div className="mb-6">
        <Link
          href="/notebook/log"
          className="font-mono text-xs text-ink-faint hover:text-accent transition-colors uppercase tracking-widest inline-flex items-center gap-1"
        >
          ← All Log Entries
        </Link>
      </div>

      <header className="mb-8 border-b border-hairline pb-6">
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // MONTHLY LOG ARCHIVE
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink mb-2">
          {logRecord.title}
        </h1>
        <p className="text-ink-muted text-sm font-mono uppercase">
          {logRecord.entries.length} {logRecord.entries.length === 1 ? 'ENTRY' : 'ENTRIES'}
        </p>
      </header>

      <div className="divide-y divide-hairline">
        {logRecord.entries.map((entry) => (
          <LogEntryItem key={entry.slug} entry={entry} />
        ))}
      </div>
    </div>
  );
}
