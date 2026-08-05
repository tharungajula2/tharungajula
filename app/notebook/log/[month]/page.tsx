import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllLogMonths, getLogMonthData } from '@/lib/notes';

export async function generateStaticParams() {
  const months = getAllLogMonths();
  return months.map((m) => ({ month: m.month }));
}

export async function generateMetadata({ params }: { params: Promise<{ month: string }> }) {
  const { month } = await params;
  return {
    title: `Log ${month} | Tharun Gajula`,
    description: `Engineering and risk log entries for ${month}.`,
  };
}

export default async function LogMonthPage({ params }: { params: Promise<{ month: string }> }) {
  const { month } = await params;
  const logData = await getLogMonthData(month);

  if (!logData) {
    notFound();
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-10 px-4 sm:px-6 text-ink font-sans text-left pb-28 sm:pb-32">
      <header className="mb-8 border-b border-hairline pb-6">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-mono text-ink-muted">
          <Link href="/notebook" className="text-accent hover:underline">
            Notebook
          </Link>
          <span>/</span>
          <Link href="/notebook/log" className="text-accent hover:underline">
            Log
          </Link>
          <span>/</span>
          <span className="text-ink font-bold uppercase">{month}</span>
        </nav>
        <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-accent font-semibold mb-2">
          // ENGINEERING & RISK LOG
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-ink mb-2">
          {logData.title || month}
        </h1>
        <p className="text-ink-muted font-mono text-xs">
          {logData.entries.length} {logData.entries.length === 1 ? 'ENTRY' : 'ENTRIES'} IN THIS MONTH
        </p>
      </header>

      <div className="space-y-12">
        {logData.entries.map((entry: any) => (
          <article
            key={entry.slug}
            id={entry.slug}
            className="p-6 sm:p-8 rounded-2xl border border-hairline bg-surface-raised shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between gap-4 border-b border-hairline-faint pb-3">
              <h2 className="text-xl sm:text-2xl font-bold uppercase text-ink">
                {entry.title}
              </h2>
              <span className="font-mono text-xs text-accent font-semibold shrink-0">
                {entry.date}
              </span>
            </div>

            <div
              className="prose dark:prose-invert max-w-none text-ink-muted font-serif text-base sm:text-lg leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: entry.htmlContent }}
            />
          </article>
        ))}
      </div>
    </div>
  );
}
