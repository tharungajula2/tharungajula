'use client';

import { contentPack } from '../content';
import type { DistrictId } from '../content/types';
import { exhibitsFor } from '../exhibits';
import { fmt, num, type Tone, type Vals } from '../exhibits/types';
import { useWorld } from '../state/world';
import { cn } from '@/lib/utils';
import { Button, Dot } from './primitives';
import { toneColour } from './interior/tones';
import { linkFor } from '../state/deepLink';

/** Text-safe versions of the scene tones (pastel stage colours are too faint to read as text). */
function textTone(t: Tone): string {
  switch (t) {
    case 'stage1': return '#3f8f5a';
    case 'stage2': return '#a8781a';
    case 'stage3': return '#c0504d';
    case 'muted': return 'var(--color-ink-faint)';
    case 'gold': return '#a8781a';
    case 'warn': return '#b7791f';
    default: return toneColour(t, { accent: 'var(--color-accent)', ink: 'inherit' });
  }
}

export default function ExhibitPanel({ district, onBack, onRead }: { district: DistrictId; onBack(): void; onRead(): void }) {
  const interior = useWorld((s) => s.interior);
  const vals = useWorld((s) => s.exhibitVals);
  const { setExhibit, setVal, exhibitAct } = useWorld.getState();
  const list = exhibitsFor(district);
  const idx = Math.min(interior?.active ?? 0, list.length - 1);
  const ex = list[idx];
  const v: Vals = vals[ex.id] ?? ex.initial;
  const out = ex.model(v);
  const d = contentPack.districts.find((x) => x.id === district)!;
  const concept = contentPack.concepts.find((c) => c.id === ex.conceptId)!;
  const go = (i: number) => setExhibit(i);

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

      {(
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
                <div className="text-sm font-semibold tabular-nums" style={r.tone && r.tone !== 'ink' ? { color: textTone(r.tone) } : undefined}>
                  {r.value}
                </div>
              </div>
            ))}
          </div>
          <p className="rounded-lg border border-accent bg-accent-glow p-3 text-sm">{out.insight}</p>
        </>
      )}

      <div className="flex flex-wrap gap-2 border-t border-hairline pt-3">
        <Button onClick={onRead}>Read the lesson</Button>
        <Button
          variant="quiet"
          onClick={() => {
            const url = `${window.location.origin}${window.location.pathname}${linkFor(district, idx)}`;
            window.history.replaceState(null, '', url);
            navigator.clipboard?.writeText(url).catch(() => {});
          }}
        >
          Copy link to this machine
        </Button>
      </div>
      <div className="flex justify-between">
        <Button variant="quiet" disabled={idx === 0} onClick={() => go(idx - 1)}>← Previous</Button>
        <Button variant="quiet" disabled={idx === list.length - 1} onClick={() => go(idx + 1)}>Next exhibit →</Button>
      </div>
    </div>
  );
}
