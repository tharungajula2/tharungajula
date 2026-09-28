'use client';

import { useState } from 'react';
import { contentPack } from '../content';
import type { DistrictId, Item } from '../content/types';
import { exhibitsFor } from '../exhibits';
import { fmt, num, type Vals } from '../exhibits/types';
import { conceptState } from '../engine/learning/mastery';
import { effectiveDue } from '../engine/learning/scheduler';
import { useCity } from '../state/store';
import { useWorld } from '../state/world';
import { todayIso } from '../state/today';
import { cn } from '@/lib/utils';
import ItemPlayer, { type ItemOutcome } from './ItemPlayer';
import { ConceptCard } from './ListCity';
import { Button, Dot, Tag } from './primitives';
import { toneColour } from './interior/tones';

/** Due or new items for one concept — never an early review. */
function practiceItems(conceptId: string): Item[] {
  const s = useCity.getState();
  const today = todayIso();
  return contentPack.items.filter((i) => {
    if (!i.conceptIds.includes(conceptId) || i.payload.type === 'predict') return false;
    const p = s.items[i.id];
    return !p || effectiveDue(p) <= today;
  });
}

function Practice({ conceptId, onDone }: { conceptId: string; onDone(): void }) {
  const [queue] = useState(() => practiceItems(conceptId).slice(0, 4));
  const [i, setI] = useState(0);
  const answer = useCity((s) => s.answer);
  const markRevealed = useCity((s) => s.markRevealed);
  if (queue.length === 0) {
    return (
      <div className="space-y-2 rounded-lg bg-surface-sunken p-3">
        <p className="text-sm">Nothing due on this idea today — spacing will bring it back. Keep playing with the machine instead.</p>
        <Button variant="ghost" onClick={onDone}>Back to the exhibit</Button>
      </div>
    );
  }
  if (i >= queue.length) {
    return (
      <div className="space-y-2 rounded-lg bg-surface-sunken p-3">
        <p className="text-sm font-semibold">Done for this idea today.</p>
        <Button variant="ghost" onClick={onDone}>Back to the exhibit</Button>
      </div>
    );
  }
  const item = queue[i];
  const onAnswered = (o: ItemOutcome) => {
    answer({ item, correct: o.result.correct, confidence: o.confidence, context: 'round', firstAttempt: o.firstAttempt });
    markRevealed(item.conceptIds);
  };
  return (
    <div className="space-y-2">
      <Tag>{i + 1} / {queue.length}</Tag>
      <ItemPlayer key={item.id} item={item} onAnswered={onAnswered} onContinue={() => setI(i + 1)} />
    </div>
  );
}

export default function ExhibitPanel({ district, onBack }: { district: DistrictId; onBack(): void }) {
  const interior = useWorld((s) => s.interior);
  const vals = useWorld((s) => s.exhibitVals);
  const { setExhibit, setVal, exhibitAct } = useWorld.getState();
  const progress = useCity((s) => s.concepts);
  const [mode, setMode] = useState<'play' | 'practice' | 'card'>('play');
  const list = exhibitsFor(district);
  const idx = Math.min(interior?.active ?? 0, list.length - 1);
  const ex = list[idx];
  const v: Vals = vals[ex.id] ?? ex.initial;
  const out = ex.model(v);
  const d = contentPack.districts.find((x) => x.id === district)!;
  const concept = contentPack.concepts.find((c) => c.id === ex.conceptId)!;
  const locked = conceptState(concept, progress) === 'locked';
  const go = (i: number) => {
    setMode('play');
    setExhibit(i);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Dot colour={d.colour} />
          <span className="text-sm font-medium">{d.name}</span>
        </div>
        <Button variant="quiet" onClick={onBack}>← Back to the city</Button>
      </div>
      <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar" aria-label="Exhibits">
        {list.map((e, i) => (
          <button
            key={e.id}
            onClick={() => go(i)}
            aria-current={i === idx ? 'true' : undefined}
            className={cn('min-h-[36px] shrink-0 rounded-full border px-3 text-xs', i === idx ? 'border-ink bg-ink text-surface' : 'border-hairline bg-surface text-ink-muted')}
          >
            {i + 1}. {e.title}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{ex.title}</h2>
        <p className="text-xs text-ink-faint">Concept: {concept.name}</p>
        <p className="text-sm text-ink-muted">{ex.prompt}</p>
      </div>

      {mode === 'play' && (
        <>
          <div className="space-y-3">
            {ex.controls.filter((c) => c.kind === 'slider').map((c) =>
              c.kind === 'slider' ? (
                <label key={c.id} className="block space-y-1">
                  <span className="flex justify-between text-xs">
                    <span className="text-ink-muted">{c.label}</span>
                    <span className="font-semibold tabular-nums">{fmt(num(v, c.id), c.fmt)}</span>
                  </span>
                  <input
                    type="range"
                    min={c.min}
                    max={c.max}
                    step={c.step}
                    value={num(v, c.id)}
                    onChange={(e) => setVal(ex.id, c.id, Number(e.target.value))}
                    className="h-11 w-full accent-[var(--color-accent)]"
                  />
                </label>
              ) : null,
            )}
            <div className="flex flex-wrap gap-2">
              {ex.controls.map((c) =>
                c.kind === 'toggle' ? (
                  <button
                    key={c.id}
                    onClick={() => setVal(ex.id, c.id, num(v, c.id) === 1 ? 0 : 1)}
                    aria-pressed={num(v, c.id) === 1}
                    className={cn('min-h-[44px] rounded-lg border px-3 text-sm', num(v, c.id) === 1 ? 'border-ink bg-ink text-surface' : 'border-hairline-strong')}
                  >
                    {c.label}
                  </button>
                ) : c.kind === 'action' ? (
                  <Button key={c.id} variant="ghost" onClick={() => exhibitAct(ex.id, c.id)}>{c.label}</Button>
                ) : null,
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {out.readouts.map((r) => (
              <div key={r.label} className="rounded-lg border border-hairline p-2">
                <div className="text-[10px] uppercase tracking-wide text-ink-faint">{r.label}</div>
                <div className="text-sm font-semibold tabular-nums" style={r.tone && r.tone !== 'ink' ? { color: toneColour(r.tone, { accent: 'var(--color-accent)', ink: 'inherit' }) } : undefined}>
                  {r.value}
                </div>
              </div>
            ))}
          </div>
          <p className="rounded-lg border border-accent bg-accent-glow p-3 text-sm">{out.insight}</p>
        </>
      )}

      {mode === 'practice' && <Practice conceptId={ex.conceptId} onDone={() => setMode('play')} />}
      {mode === 'card' && <ConceptCard concept={concept} onClose={() => setMode('play')} />}

      {mode === 'play' && (
        <div className="flex flex-wrap gap-2 border-t border-hairline pt-3">
          {locked ? (
            <p className="text-xs text-ink-faint">Test yourself unlocks once you’ve recalled: {concept.prerequisites.map((p) => contentPack.concepts.find((c) => c.id === p)?.name).join(', ')}.</p>
          ) : (
            <Button onClick={() => setMode('practice')}>Test yourself on this idea</Button>
          )}
          <Button variant="ghost" onClick={() => setMode('card')}>Open the concept card</Button>
        </div>
      )}
      <div className="flex justify-between">
        <Button variant="quiet" disabled={idx === 0} onClick={() => go(idx - 1)}>← Previous</Button>
        <Button variant="quiet" disabled={idx === list.length - 1} onClick={() => go(idx + 1)}>Next exhibit →</Button>
      </div>
    </div>
  );
}
