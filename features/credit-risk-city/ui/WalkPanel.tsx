'use client';

import { contentPack } from '../content';
import { conceptState } from '../engine/learning/mastery';
import { useCity } from '../state/store';
import { useWorld } from '../state/world';
import { cn } from '@/lib/utils';
import { buildWalk } from './world/walk';
import { Button, Tag } from './primitives';

const nameOf = (id: string) => contentPack.districts.find((d) => d.id === id)?.name ?? id;

export default function WalkPanel() {
  const walk = useWorld((s) => s.walk);
  const { walkStart, walkChoose, walkNext, walkEnd } = useWorld.getState();

  const start = () => {
    const progress = useCity.getState().concepts;
    const open = contentPack.concepts.filter((c) => conceptState(c, progress) !== 'locked').map((c) => c.id);
    const ids = open.length >= 6 ? open : contentPack.concepts.map((c) => c.id);
    walkStart(buildWalk(contentPack, ids, Math.random));
  };

  if (!walk) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Palace Walk</h2>
        <p className="text-sm text-ink-muted">The labels disappear. Find each idea by its place: tap the district on the map, or name what lives where the camera takes you.</p>
        <Button onClick={start}>Start the walk</Button>
      </div>
    );
  }

  const q = walk.questions[walk.index];
  if (!q) {
    const right = walk.answers.filter((a) => a.correct).length;
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Walk complete</h2>
        <p className="text-sm">{right} / {walk.answers.length} places remembered.</p>
        <p className="text-xs text-ink-faint">Palace Walk is practice: it trains the map, it doesn’t change your review schedule.</p>
        <div className="flex gap-2">
          <Button onClick={start}>Walk again</Button>
          <Button variant="ghost" onClick={walkEnd}>Done</Button>
        </div>
      </div>
    );
  }

  const answer = walk.answers[walk.index];
  const concept = q.kind === 'where' ? contentPack.concepts.find((c) => c.id === q.conceptId)! : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tag>{walk.index + 1} / {walk.questions.length}</Tag>
        <Button variant="quiet" onClick={walkEnd}>End walk</Button>
      </div>
      {q.kind === 'where' ? (
        <>
          <p className="text-base">Where does <strong>{concept!.name}</strong> live?</p>
          {!answer && <p className="text-sm text-ink-muted">Tap its district on the map.</p>}
        </>
      ) : (
        <>
          <p className="text-base">What lives at <strong>{nameOf(q.district)}</strong>?</p>
          <div className="grid gap-2">
            {q.options.map((o, i) => (
              <button
                key={o}
                disabled={!!answer}
                onClick={() => walkChoose(i)}
                className={cn(
                  'min-h-[44px] rounded-lg border px-4 py-2 text-left text-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none',
                  answer && i === q.answerIndex ? 'border-accent bg-accent-dim' : answer && String(i) === answer.given ? 'border-ink bg-surface-sunken' : 'border-hairline hover:bg-surface-sunken',
                )}
              >
                {o}
              </button>
            ))}
          </div>
        </>
      )}
      {answer && (
        <div className="space-y-3 rounded-lg border border-hairline-strong bg-surface-sunken p-3">
          <p className="text-sm font-semibold">{answer.correct ? 'Right place' : 'Not there'}</p>
          {q.kind === 'where' && (
            <p className="text-sm">
              {concept!.name} lives in <strong>{nameOf(q.answer)}</strong>
              {!answer.correct && <> — you tapped {nameOf(answer.given)}</>}.
            </p>
          )}
          <Button onClick={walkNext}>Next</Button>
        </div>
      )}
    </div>
  );
}
