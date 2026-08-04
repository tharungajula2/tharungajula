import { LogEntry } from '@/lib/notes';

interface LogEntryItemProps {
  entry: LogEntry;
}

export default function LogEntryItem({ entry }: LogEntryItemProps) {
  return (
    <article id={entry.slug} className="py-6 border-b border-hairline scroll-mt-24">
      <div className="flex items-center gap-2 font-mono text-xs text-accent font-semibold uppercase mb-1">
        <span>{entry.date}</span>
      </div>
      <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-ink mb-2">
        {entry.title}
      </h3>
      <div className="text-ink-muted font-serif text-base sm:text-lg leading-relaxed space-y-3 whitespace-pre-line">
        {entry.body}
      </div>
    </article>
  );
}
