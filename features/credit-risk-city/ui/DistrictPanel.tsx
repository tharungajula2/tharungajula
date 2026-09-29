'use client';

import { contentPack } from '../content';
import { lessonFor } from '../content/lessons';
import type { DistrictId } from '../content/types';
import { useCity } from '../state/store';
import { Button } from './primitives';

const ordered = [...contentPack.districts].sort((a, b) => a.order - b.order);

export default function DistrictPanel({ id, onRead, onSelect, live }: {
  id: DistrictId;
  onRead(): void;
  onSelect(id: DistrictId): void;
  live?: string;
}) {
  const d = ordered.find((x) => x.id === id)!;
  const lesson = lessonFor(id);
  const read = useCity((s) => s.read.includes(id));
  const concepts = contentPack.concepts.filter((c) => c.district === id);
  const i = ordered.indexOf(d);
  const prev = ordered[i - 1];
  const next = ordered[i + 1];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs text-ink-faint">District {d.order} of {ordered.length}{read ? ' · read ✓' : ''}</p>
        <h2 className="text-xl font-semibold">{d.name}</h2>
        <p className="text-sm text-ink-muted">{d.purpose}</p>
      </div>
      {lesson && <p className="rounded-lg border-l-4 border-ink bg-surface-sunken px-3 py-2 text-sm font-medium">{lesson.idea}</p>}
      <div className="flex flex-wrap gap-2">
        <Button onClick={onRead}>{lesson ? `Read the lesson · ${lesson.minutes} min` : 'Lesson coming next'}</Button>
      </div>
      {live && (
        <div className="rounded-lg border border-accent bg-accent-glow p-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-ink-faint">Live in the city bank</p>
          <p className="text-sm">{live}</p>
        </div>
      )}
      <div className="space-y-1.5">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">What this district covers</p>
        <ul className="flex flex-wrap gap-1.5">
          {concepts.map((c) => (
            <li key={c.id} className="rounded-full border border-hairline px-2.5 py-1 text-xs">{c.name}</li>
          ))}
        </ul>
      </div>
      <nav className="flex justify-between border-t border-hairline pt-3 text-sm">
        {prev ? <button onClick={() => onSelect(prev.id)} className="underline-offset-4 hover:underline">← {prev.name}</button> : <span />}
        {next ? <button onClick={() => onSelect(next.id)} className="underline-offset-4 hover:underline">{next.name} →</button> : <span />}
      </nav>
    </div>
  );
}
