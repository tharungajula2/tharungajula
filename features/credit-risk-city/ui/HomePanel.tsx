'use client';

import { useState } from 'react';
import { contentPack } from '../content';
import { lessonFor } from '../content/lessons';
import type { DistrictId } from '../content/types';
import { useCity } from '../state/store';
import { cn } from '@/lib/utils';
import { Button } from './primitives';

const ordered = [...contentPack.districts].sort((a, b) => a.order - b.order);

const GUIDE: [string, string][] = [
  ['The city', 'Eighteen districts in the order a loan lives its life. Each district is one part of credit risk; its buildings rise once you have read its lesson.'],
  ['Read', 'Opens the next lesson. Each has a short surface read and a "Go deeper" layer.'],
];

/** The reading path: every district in walking order, with read status. */
export default function HomePanel({ onRead }: { onRead(d: DistrictId): void }) {
  const read = useCity((s) => s.read);
  const [guide, setGuide] = useState(false);
  const next = ordered.find((d) => !read.includes(d.id)) ?? ordered[0];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Learn the whole landscape</h2>
        <p className="text-sm text-ink-muted">Read the districts in order — the order a loan lives its life — or jump to any one. {read.length} of {ordered.length} read.</p>
      </div>
      <Button onClick={() => onRead(next.id)}>{read.length === 0 ? `Start with ${next.order}. ${next.name}` : read.length === ordered.length ? 'Read again from the start' : `Continue: ${next.order}. ${next.name}`}</Button>

      <ol className="space-y-1">
        {ordered.map((d) => {
          const done = read.includes(d.id);
          const has = !!lessonFor(d.id);
          return (
            <li key={d.id}>
              <button
                onClick={() => onRead(d.id)}
                className={cn('flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-surface-sunken', !has && 'opacity-60')}
              >
                <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold', done ? 'bg-accent text-surface' : 'border border-hairline-strong text-ink-muted')}>
                  {done ? '✓' : d.order}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{d.name}</span>
                  <span className="block truncate text-xs text-ink-muted">{has ? d.purpose : 'Lesson coming next'}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <button onClick={() => setGuide(!guide)} aria-expanded={guide} className="text-sm font-medium text-ink underline underline-offset-4">
        {guide ? 'Hide the guide' : 'What am I looking at?'}
      </button>
      {guide && (
        <dl className="space-y-2">
          {GUIDE.map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs font-semibold">{k}</dt>
              <dd className="text-xs text-ink-muted">{v}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
