'use client';

import { useState } from 'react';
import { contentPack } from '../content';
import { caseContext } from '../engine/case';
import { simValue } from '../engine/sim/step';
import type { SimState } from '../engine/sim/types';
import { useCity } from '../state/store';
import { caseFor } from '../state/caseRuns';
import { newSeed } from '../state/today';
import { cn } from '@/lib/utils';
import ItemPlayer, { type ItemOutcome } from './ItemPlayer';
import { Button, Card, Dot, Tag } from './primitives';
import { cr, pct } from './format';

const baseDef = contentPack.cases[0];
const districtOf = (id: string) => contentPack.districts.find((d) => d.id === id)!;

function Numbers({ before, after, def }: { before: SimState | null; after: SimState; def: typeof baseDef }) {
  const caseFacilities = def.setup.facilities.filter((f) => f.borrowerId === def.setup.borrowers[0].id);
  const rows: { label: string; b?: string; a: string }[] = [
    ...caseFacilities.flatMap((f) => {
      const fb = before?.facilities.find((x) => x.id === f.id);
      const fa = after.facilities.find((x) => x.id === f.id)!;
      return [
        { label: `${f.id} stage`, b: fb ? String(fb.stage) : undefined, a: fa.closed ? 'closed' : String(fa.stage) },
        { label: `${f.id} provision`, b: fb ? cr(fb.allowance, 3) : undefined, a: cr(fa.allowance, 3) },
        { label: `${f.id} balance`, b: fb ? cr(fb.drawn) : undefined, a: cr(fa.drawn) },
      ];
    }),
    { label: 'CET1 ratio', b: before ? pct(before.kpis.cet1Ratio) : undefined, a: pct(after.kpis.cet1Ratio) },
    { label: 'Stage 3 ratio', b: before ? pct(before.kpis.stage3Ratio) : undefined, a: pct(after.kpis.stage3Ratio) },
    { label: 'Total ECL', b: before ? cr(before.kpis.totalEcl) : undefined, a: cr(after.kpis.totalEcl) },
  ];
  const events = before
    ? after.log.filter((l) => (before.month === after.month ? l.month === after.month : l.month > before.month))
    : [];
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink-muted">
              <th className="py-1 pr-3 font-medium">Month {before?.month ?? '—'} → {after.month}</th>
              <th className="py-1 pr-3 font-medium">Before</th>
              <th className="py-1 font-medium">After</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className={cn('border-t border-hairline', r.b !== undefined && r.b !== r.a && 'font-semibold')}>
                <td className="py-1.5 pr-3">{r.label}</td>
                <td className="py-1.5 pr-3 text-ink-muted">{r.b ?? '—'}</td>
                <td className="py-1.5">{r.a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {events.length > 0 && (
        <ul className="space-y-1 text-xs text-ink-muted">
          {events.map((l, i) => <li key={i}>m{l.month}: {l.text}</li>)}
        </ul>
      )}
      <p className="text-[11px] text-ink-faint">Illustrative parameters — teaching values, not regulation.</p>
    </div>
  );
}

export default function CaseView() {
  const session = useCity((s) => s.caseSession);
  const startCase = useCity((s) => s.startCase);
  const caseAdvance = useCity((s) => s.caseAdvance);
  const caseRecord = useCity((s) => s.caseRecord);
  const caseNext = useCity((s) => s.caseNext);
  const answer = useCity((s) => s.answer);
  const markRevealed = useCity((s) => s.markRevealed);
  const [itemIdx, setItemIdx] = useState(0);

  if (!session || session.done) {
    const results = session ? Object.values(session.results) : [];
    return (
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">{baseDef.title}</h2>
        <p className="text-sm text-ink-muted">Follow one borrower from application to write-off. Predict before every consequence; the city route walks the lifecycle. Every run is a new company with new numbers, so you have to reason, not remember.</p>
        {session?.done && <p className="text-xs text-ink-faint">Last borrower: {caseFor(session.seed).def.subtitle}</p>}
        {session?.done && <p className="text-sm">Last run: {results.filter(Boolean).length} / {results.length} correct.</p>}
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => { setItemIdx(0); startCase(newSeed()); }}>{session?.done ? 'New borrower' : 'Start the case'}</Button>
          {session?.done && <Button variant="ghost" onClick={() => { setItemIdx(0); startCase(session.seed); }}>Replay the same borrower</Button>}
        </div>
      </Card>
    );
  }

  const run = caseFor(session.seed);
  const def = run.def;
  const step = def.steps[session.stepIndex];
  const district = districtOf(step.district);
  const itemsDone = itemIdx >= step.itemIds.length;
  const item = run.items.get(step.itemIds[itemIdx]) ?? contentPack.items.find((i) => i.id === step.itemIds[itemIdx]);
  const context = caseContext(session);

  const resolveSim = () => {
    let s = useCity.getState().caseSession!;
    if (s.before === null) {
      caseAdvance();
      s = useCity.getState().caseSession!;
    }
    const p = item!.payload;
    return p.type === 'predict' ? simValue(s.sim, p.bindTo) : null;
  };

  const onAnswered = (o: ItemOutcome) => {
    if (!item) return;
    answer({ item, correct: o.result.correct, confidence: o.confidence, context, firstAttempt: o.firstAttempt });
    markRevealed(item.conceptIds);
    caseRecord(item.id, o.result.correct);
  };

  const next = () => {
    setItemIdx(0);
    caseNext();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-1 overflow-x-auto pb-1" aria-label="Case steps">
        {def.steps.map((s, i) => (
          <span
            key={s.id}
            className={cn(
              'shrink-0 rounded-full px-2.5 py-1 text-[11px]',
              i === session.stepIndex ? 'bg-ink text-surface' : i < session.stepIndex ? 'bg-accent-dim text-ink' : 'bg-surface-sunken text-ink-faint',
            )}
          >
            {i + 1}. {s.title}
          </span>
        ))}
      </div>
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Dot colour={district.colour} />
          <span className="text-sm font-medium">{district.name}</span>
          <Tag>month {session.sim.month}</Tag>
          <Tag>{step.kind}</Tag>
        </div>
        <h2 className="text-lg font-semibold">{step.title}</h2>
        {session.stepIndex === 0 && <p className="text-xs text-ink-faint">{def.subtitle}</p>}
        <p className="text-sm text-ink-muted">{step.brief}</p>
        {!itemsDone && item && (
          <ItemPlayer
            key={`${session.seed}-${step.id}-${item.id}`}
            item={item}
            resolveSim={item.payload.type === 'predict' ? resolveSim : undefined}
            onAnswered={onAnswered}
            onContinue={() => setItemIdx(itemIdx + 1)}
          />
        )}
        {itemsDone && (
          <div className="space-y-4">
            {(step.kind === 'predict' || step.kind === 'reveal' || step.kind === 'explain') && (
              <Numbers before={session.before} after={session.sim} def={def} />
            )}
            <Button onClick={next}>{session.stepIndex + 1 >= def.steps.length ? 'Finish the case' : 'Next step'}</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
