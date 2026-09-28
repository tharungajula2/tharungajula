'use client';

import { useState } from 'react';
import { contentPack } from '../content';
import type { DistrictId } from '../content/types';
import { useCity, dueCount } from '../state/store';
import { addDays } from '../engine/learning/dates';
import { todayIso } from '../state/today';
import { cn } from '@/lib/utils';
import { Button } from './primitives';

interface Props {
  onRound(): void;
  onCase(): void;
  onMissions(): void;
  onWalk(): void;
  onWalkTo(district: DistrictId, conceptId: string): void;
}

const GUIDE: [string, string][] = [
  ['Today · Streak · Due', 'The date, how many days in a row you have done a Daily Round, and how many questions are due now.'],
  ['CET1 ratio · Total ECL · Stage 3 ratio', 'Live numbers from the city bank (or from the case, while you play it).'],
  ['City built', 'How much of the city you have learned. Districts rise out of their fences as you master their concepts.'],
  ['Vans', 'Loans in the city bank. Every loan in trouble is shown — amber late, orange Stage 2, red defaulted and towed to Recovery Docks — plus a few teal healthy ones.'],
  ['Bank · Calm / Storm', 'Pause or run the city bank. A storm lasts a year: watch the Vault, the Fortress wall and the Watchtower beacon react.'],
  ['Numbers on the map', 'The walking order of the memory palace, 1 to 18.'],
  ['Orbs and diamonds', 'Orbs are concepts (white new, colour learning, blue recalled, gold mastered). A diamond means something is due there.'],
];

function Step({ n, done, title, detail, action }: { n: number; done: boolean; title: string; detail: string; action?: React.ReactNode }) {
  return (
    <li className={cn('flex gap-3 rounded-lg border p-3', done ? 'border-hairline bg-surface-sunken' : 'border-hairline-strong')}>
      <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold', done ? 'bg-accent text-surface' : 'bg-ink text-surface')}>
        {done ? '✓' : n}
      </span>
      <div className="min-w-0 flex-1 space-y-2">
        <div>
          <p className={cn('text-sm font-semibold', done && 'text-ink-muted line-through')}>{title}</p>
          <p className="text-xs text-ink-muted">{detail}</p>
        </div>
        {!done && action}
      </div>
    </li>
  );
}

export default function HomePanel({ onRound, onCase, onMissions, onWalk, onWalkTo }: Props) {
  const state = useCity();
  const today = todayIso();
  const [guide, setGuide] = useState(false);
  const due = dueCount(state, today);
  const roundDone = state.streak.last === today;
  const next = state.nextWalk && state.nextWalk.date === today ? state.nextWalk : null;
  const nextDistrict = next ? contentPack.districts.find((d) => d.id === next.district) : undefined;
  const nextConcept = next ? contentPack.concepts.find((c) => c.id === next.conceptId) : undefined;
  const walkedToday = state.walked.date === today ? state.walked.districts : [];
  const walkDone = next ? walkedToday.includes(next.district) : walkedToday.length > 0;
  const weekAgo = addDays(today, -7);
  const caseDone = state.caseOutcomes.some((o) => o.finishedOn > weekAgo);
  const session = state.caseSession;
  const missionDone = state.missionsWon.length > 0;

  return (
    <div className="space-y-4">
      {!state.introSeen && (
        <div className="space-y-2 rounded-lg border border-accent bg-accent-glow p-3">
          <p className="text-sm font-semibold">How this works</p>
          <p className="text-sm">This city is a memory palace for credit risk: 18 districts in the order a loan lives its life, every idea in a fixed place.</p>
          <p className="text-sm">You learn by answering from memory (the Daily Round), then by operating the idea’s machine inside its district.</p>
          <p className="text-sm">Ten minutes a day is the whole job. Follow the four steps below.</p>
          <Button variant="ghost" onClick={state.dismissIntro}>Got it</Button>
        </div>
      )}

      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Start here</h2>
        <p className="text-xs text-ink-muted">Today’s path. Each step ticks itself off.</p>
      </div>
      <ol className="space-y-2">
        <Step
          n={1}
          done={roundDone}
          title={due > 0 ? `Daily Round · ${due} due` : 'Daily Round'}
          detail="About ten minutes of questions from memory. The camera flies to each question’s district."
          action={<Button onClick={onRound}>Start the round</Button>}
        />
        <Step
          n={2}
          done={roundDone && walkDone}
          title={nextDistrict ? `Walk into ${nextDistrict.name}` : 'Walk into a district'}
          detail={
            nextConcept
              ? `Your weakest answer today was on “${nextConcept.name}”. Play its machine for two minutes.`
              : roundDone
                ? 'Tap any district on the map, then Walk in.'
                : 'After the round, this step points you to the machine for your weakest answer.'
          }
          action={
            nextConcept && nextDistrict ? (
              <Button variant="ghost" onClick={() => onWalkTo(nextDistrict.id, nextConcept.id)}>Walk there</Button>
            ) : roundDone ? (
              <Button variant="ghost" onClick={onWalk}>Pick a district</Button>
            ) : undefined
          }
        />
        <Step
          n={3}
          done={caseDone}
          title="Run the case (once a week)"
          detail="Follow one borrower from application to write-off, predicting each step. Every run is a new company."
          action={<Button variant="ghost" onClick={onCase}>{session && !session.done ? `Continue · step ${session.stepIndex + 1} of ${contentPack.cases[0].steps.length}` : 'Start the case'}</Button>}
        />
        <Step
          n={4}
          done={missionDone}
          title="Break the Bank (when you want a challenge)"
          detail="Push the bank into trouble with a few moves — and find out which moves really matter."
          action={<Button variant="ghost" onClick={onMissions}>See the missions</Button>}
        />
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
