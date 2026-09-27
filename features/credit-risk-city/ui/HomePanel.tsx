'use client';

import { contentPack } from '../content';
import { useCity, dueCount } from '../state/store';
import { todayIso } from '../state/today';
import { Button } from './primitives';

export default function HomePanel({ onRound, onCase, onWalk }: { onRound(): void; onCase(): void; onWalk(): void }) {
  const state = useCity();
  const due = dueCount(state, todayIso());
  const session = state.caseSession;
  const caseLabel = !session || session.done ? 'Start the case' : `Continue the case · step ${session.stepIndex + 1} of ${contentPack.cases[0].steps.length}`;
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Welcome to the city</h2>
        <p className="text-sm text-ink-muted">
          Eighteen districts on one ring road, in the order a loan lives its life: from the Mint to Recovery, up through the risk numbers, out to reporting and governance. Your BA Studio sits in the middle.
        </p>
      </div>
      <div className="grid gap-2">
        <Button onClick={onRound}>{due > 0 ? `Daily Round · ${due} due` : 'Daily Round'}</Button>
        <Button variant="ghost" onClick={onCase}>{caseLabel}</Button>
        <Button variant="ghost" onClick={onWalk}>Palace Walk</Button>
      </div>
      <p className="rounded-lg bg-surface-sunken px-3 py-2 text-xs text-ink-muted">
        Districts 1–6 (Mint to Recovery Docks) have real content. Districts 7–18 are placeholders until their batches land.
      </p>
      <ul className="space-y-1 text-xs text-ink-muted">
        <li>Tap a district to see what lives there. Drag to orbit, scroll or pinch to zoom.</li>
        <li>Small orbs are concepts: white new, colour learning, blue recalled, gold mastered.</li>
        <li>A floating diamond means something is due there today.</li>
      </ul>
    </div>
  );
}
