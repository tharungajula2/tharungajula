'use client';

import { useState } from 'react';
import { contentPack } from '../content';
import type { MissionGoal } from '../content/types';
import { goalValue, missionContext, usesLeft } from '../engine/mission';
import { useCity } from '../state/store';
import { cn } from '@/lib/utils';
import ItemPlayer, { type ItemOutcome } from './ItemPlayer';
import { Button, Card, Tag } from './primitives';
import { cr, pct } from './format';

function goalText(g: MissionGoal): string {
  switch (g.kind) {
    case 'facilityStage':
      return `${g.facilityId} in Stage ${g.stage}`;
    case 'cet1RatioBelow':
      return `CET1 ratio below ${pct(g.threshold)}`;
    case 'stage3RatioAbove':
      return `Stage 3 ratio above ${pct(g.threshold)}`;
  }
}

function goalNow(g: MissionGoal, v: number | null): string {
  if (v === null) return '—';
  return g.kind === 'facilityStage' ? `Stage ${v}` : pct(v, 2);
}

export default function MissionView() {
  const mission = useCity((s) => s.mission);
  const won = useCity((s) => s.missionsWon);
  const { missionStart, missionToggle, missionAdvance, missionClose, answer, markRevealed } = useCity.getState();
  const [itemIdx, setItemIdx] = useState(0);

  if (!mission) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Break the Bank</h2>
        <p className="text-sm text-ink-muted">Make moves month by month and try to push the bank into trouble. Each mission is built around one mechanism — finding it is the lesson.</p>
        {contentPack.missions.map((m) => (
          <Card key={m.id} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold">{m.title}</h3>
              {won.includes(m.id) && <Tag className="bg-accent-dim text-ink">Won</Tag>}
            </div>
            <p className="text-sm text-ink-muted">{m.brief}</p>
            <Button onClick={() => { setItemIdx(0); missionStart(m.id); }}>{won.includes(m.id) ? 'Play again' : 'Play'}</Button>
          </Card>
        ))}
      </div>
    );
  }

  const def = contentPack.missions.find((m) => m.id === mission.missionId)!;
  const sim = mission.sim;
  const value = goalValue(sim, def.goal);
  const byB = new Map(sim.borrowers.map((b) => [b.id, b]));
  const lastLog = sim.log.filter((l) => l.month === sim.month && sim.month > 0);
  const item = contentPack.items.find((i) => i.id === def.itemIds[itemIdx]);

  const onAnswered = (o: ItemOutcome) => {
    if (!item) return;
    answer({ item, correct: o.result.correct, confidence: o.confidence, context: missionContext(def.id), firstAttempt: o.firstAttempt });
    markRevealed(item.conceptIds);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tag>month {sim.month} of {def.maxMonths}</Tag>
        <Button variant="quiet" onClick={missionClose}>Leave mission</Button>
      </div>
      <h2 className="text-lg font-semibold">{def.title}</h2>
      <p className="text-sm text-ink-muted">{def.brief}</p>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="rounded-lg border border-hairline p-2">
          <div className="text-[10px] uppercase tracking-wide text-ink-faint">Goal</div>
          <div className="text-sm font-semibold">{goalText(def.goal)}</div>
        </div>
        <div className={cn('rounded-lg border p-2', mission.status === 'won' ? 'border-accent bg-accent-dim' : 'border-hairline')}>
          <div className="text-[10px] uppercase tracking-wide text-ink-faint">Now</div>
          <div className="text-sm font-semibold tabular-nums">{goalNow(def.goal, value)}</div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-ink-muted">
              <th className="py-1 pr-2 font-medium">Loan</th>
              <th className="py-1 pr-2 font-medium">Stage</th>
              <th className="py-1 pr-2 font-medium">Missed</th>
              <th className="py-1 pr-2 font-medium">Grade</th>
              <th className="py-1 font-medium">Provision</th>
            </tr>
          </thead>
          <tbody>
            {sim.facilities.map((f) => (
              <tr key={f.id} className="border-t border-hairline">
                <td className="py-1 pr-2">{byB.get(f.borrowerId)?.name} · {f.id}</td>
                <td className="py-1 pr-2">{f.closed ? 'closed' : f.stage}</td>
                <td className="py-1 pr-2">{f.k}</td>
                <td className="py-1 pr-2">{byB.get(f.borrowerId)?.grade}</td>
                <td className="py-1 tabular-nums">{cr(f.allowance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-1 text-[11px] text-ink-faint">CET1 ratio {pct(sim.kpis.cet1Ratio, 2)} · Stage 3 ratio {pct(sim.kpis.stage3Ratio, 2)} · RWA {cr(sim.kpis.rwa, 1)}</p>
      </div>

      {mission.status === 'playing' && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Moves for month {sim.month + 1}</p>
          {def.moves.map((m) => {
            const left = usesLeft(mission, def, m.id);
            const queued = mission.queued.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => missionToggle(m.id)}
                disabled={!queued && left <= 0}
                aria-pressed={queued}
                className={cn(
                  'flex min-h-[44px] w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-40',
                  queued ? 'border-ink bg-surface-sunken font-medium' : 'border-hairline hover:bg-surface-sunken',
                )}
              >
                <span>{m.label}</span>
                <span className="shrink-0 text-xs text-ink-faint">{queued ? 'queued' : `${left} left`}</span>
              </button>
            );
          })}
          <Button onClick={missionAdvance}>Advance one month{mission.queued.length ? ` with ${mission.queued.length} move${mission.queued.length > 1 ? 's' : ''}` : ''}</Button>
        </div>
      )}

      {lastLog.length > 0 && (
        <ul className="space-y-1 text-xs text-ink-muted">
          {lastLog.map((l, i) => <li key={i}>m{l.month}: {l.text}</li>)}
        </ul>
      )}

      {mission.status === 'lost' && (
        <div className="space-y-3 rounded-lg border border-hairline-strong bg-surface-sunken p-3">
          <p className="text-sm font-semibold">Out of months — the bank held.</p>
          <p className="text-sm text-ink-muted">Look at which moves changed the goal number and which didn’t. That difference is the lesson.</p>
          <Button onClick={() => missionStart(def.id)}>Try again</Button>
        </div>
      )}

      {mission.status === 'won' && (
        <div className="space-y-3">
          <div className="rounded-lg border border-accent bg-accent-glow p-3">
            <p className="text-sm font-semibold">Mission complete in {sim.month} month{sim.month > 1 ? 's' : ''}.</p>
            <p className="mt-1 text-sm">{def.debrief}</p>
          </div>
          {item ? (
            <Card className="space-y-2">
              <p className="text-xs text-ink-faint">Lock it in ({itemIdx + 1} of {def.itemIds.length}) — counts as applying the idea.</p>
              <ItemPlayer key={`${def.id}-${item.id}`} item={item} onAnswered={onAnswered} onContinue={() => setItemIdx(itemIdx + 1)} />
            </Card>
          ) : (
            <div className="flex gap-2">
              <Button onClick={missionClose}>Back to missions</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
