'use client';

import { contentPack } from '../content';
import type { DistrictId } from '../content/types';
import { conceptState } from '../engine/learning/mastery';
import { useCity } from '../state/store';
import { useWorld } from '../state/world';
import { ConceptCard } from './ListCity';
import { Button, Dot, Tag } from './primitives';

const LABEL = { locked: 'Locked', new: 'New', learning: 'Learning', recalled: 'Recalled', applied: 'Applied', mastered: 'Mastered' } as const;

export default function DistrictPanel({ id, due, onPractise }: { id: DistrictId; due: number; onPractise(): void }) {
  const progress = useCity((s) => s.concepts);
  const openConcept = useWorld((s) => s.openConcept);
  const select = useWorld((s) => s.select);
  const d = contentPack.districts.find((x) => x.id === id)!;
  const concepts = contentPack.concepts.filter((c) => c.district === id);
  const prev = contentPack.districts.find((x) => x.order === d.order - 1);
  const next = contentPack.districts.find((x) => x.order === d.order + 1);
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Dot colour={d.colour} />
          <span className="text-xs text-ink-faint">District {d.order} of 18</span>
        </div>
        <h2 className="text-lg font-semibold">{d.name}</h2>
        <p className="text-sm text-ink-muted">{d.purpose}</p>
        <p className="text-xs text-ink-faint">Landmark: {d.landmark}</p>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">What lives here</p>
        {concepts.map((c) =>
          openConcept === c.id ? (
            <ConceptCard key={c.id} concept={c} onClose={() => select(id, null)} />
          ) : (
            <button
              key={c.id}
              onClick={() => select(id, c.id)}
              className="flex min-h-[44px] w-full items-center justify-between gap-2 rounded-lg border border-hairline px-3 text-left text-sm hover:bg-surface-sunken focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              <span>{c.name}</span>
              <span className="flex shrink-0 gap-1"><Tag>{c.layer}</Tag><Tag>{LABEL[conceptState(c, progress)]}</Tag></span>
            </button>
          ),
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onPractise}>{due > 0 ? `Practise here · ${due} due` : 'Practise here'}</Button>
      </div>
      <div className="flex justify-between border-t border-hairline pt-3">
        <Button variant="quiet" disabled={!prev} onClick={() => prev && select(prev.id)}>← {prev?.name ?? ''}</Button>
        <Button variant="quiet" disabled={!next} onClick={() => next && select(next.id)}>{next?.name ?? ''} →</Button>
      </div>
    </div>
  );
}
