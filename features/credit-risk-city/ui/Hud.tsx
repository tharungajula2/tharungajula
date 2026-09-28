'use client';

import { useCity, dueCount } from '../state/store';
import { todayIso } from '../state/today';
import { addDays } from '../engine/learning/dates';
import { cr, pct } from './format';

export default function Hud({ compact = false, live, builtPct }: { compact?: boolean; live?: { cet1Ratio: number; totalEcl: number; stage3Ratio: number } | null; builtPct?: number }) {
  const state = useCity();
  const today = todayIso();
  const due = dueCount(state, today);
  const k = live ?? state.caseSession?.sim.kpis;
  const streakAlive = state.streak.last === today || state.streak.last === addDays(today, -1) ? state.streak.count : 0;
  const cells = [
        { label: 'Today', value: today.slice(5) },
        { label: 'Streak', value: `${streakAlive}d` },
        { label: 'Due', value: String(due) },
        { label: 'CET1 ratio', value: pct(k?.cet1Ratio) },
        { label: 'Total ECL', value: cr(k?.totalEcl) },
        { label: 'Stage 3 ratio', value: pct(k?.stage3Ratio) },
        ...(builtPct !== undefined ? [{ label: 'City built', value: `${Math.round(builtPct * 100)}%` }] : []),
  ];
  if (compact) {
    return (
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {cells.map((x) => (
          <div key={x.label} className="shrink-0 rounded-lg border border-hairline bg-surface-raised/95 px-2 py-1 text-center">
            <div className="text-[9px] uppercase tracking-wide text-ink-faint">{x.label}</div>
            <div className="text-xs font-semibold tabular-nums">{x.value}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-2 text-center sm:grid-cols-6">
      {cells.map((x) => (
        <div key={x.label} className="rounded-lg border border-hairline bg-surface-raised px-2 py-2">
          <div className="text-[10px] uppercase tracking-wide text-ink-faint">{x.label}</div>
          <div className="text-sm font-semibold tabular-nums">{x.value}</div>
        </div>
      ))}
    </div>
  );
}
