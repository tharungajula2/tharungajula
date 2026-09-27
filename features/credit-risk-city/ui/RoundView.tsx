'use client';

import { useState } from 'react';
import { contentPack } from '../content';
import type { Item } from '../content/types';
import { buildRound } from '../engine/learning/round';
import { useCity } from '../state/store';
import { todayIso } from '../state/today';
import ItemPlayer, { type ItemOutcome } from './ItemPlayer';
import { Button, Card, Tag } from './primitives';

interface Slot {
  item: Item;
  retry: boolean;
  key: string;
}

export default function RoundView() {
  const answer = useCity((s) => s.answer);
  const markRevealed = useCity((s) => s.markRevealed);
  const completeRound = useCity((s) => s.completeRound);
  const [queue, setQueue] = useState<Slot[] | null>(null);
  const [index, setIndex] = useState(0);
  const [misses, setMisses] = useState<string[]>([]);
  const [lastOutcome, setLastOutcome] = useState<ItemOutcome | null>(null);

  const start = () => {
    const s = useCity.getState();
    const items = buildRound({ pack: contentPack, items: s.items, concepts: s.concepts, today: todayIso() });
    setQueue(items.map((item, i) => ({ item, retry: false, key: `${item.id}-${i}` })));
    setIndex(0);
    setMisses([]);
    setLastOutcome(null);
  };

  if (!queue) {
    return (
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">Daily Round</h2>
        <p className="text-sm text-ink-muted">About 10 minutes. Due items first, a few new ones, and one Palace Walk question. Answer from memory — reading doesn’t count.</p>
        <Button onClick={start}>Start today’s round</Button>
      </Card>
    );
  }

  if (queue.length === 0) {
    return (
      <Card className="space-y-3">
        <p className="text-sm">Nothing due right now. Play the case to earn application evidence.</p>
        <Button variant="ghost" onClick={() => setQueue(null)}>Back</Button>
      </Card>
    );
  }

  if (index >= queue.length) {
    return (
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">Round complete</h2>
        {misses.length ? (
          <div className="space-y-1">
            <p className="text-sm text-ink-muted">Watch these — they come back tomorrow:</p>
            <ul className="list-disc pl-5 text-sm">{misses.map((m) => <li key={m}>{contentPack.items.find((i) => i.id === m)?.prompt}</li>)}</ul>
          </div>
        ) : (
          <p className="text-sm">Clean round. Spacing will stretch the next reviews.</p>
        )}
        <Button onClick={() => setQueue(null)}>Done</Button>
      </Card>
    );
  }

  const slot = queue[index];
  const onAnswered = (o: ItemOutcome) => {
    setLastOutcome(o);
    answer({ item: slot.item, correct: o.result.correct, confidence: o.confidence, context: 'round', firstAttempt: o.firstAttempt });
    markRevealed(slot.item.conceptIds);
    if (!o.result.correct && !slot.retry) {
      setMisses((m) => [...m, slot.item.id]);
      const at = Math.min(queue.length, index + 3);
      const next = [...queue];
      next.splice(at, 0, { item: slot.item, retry: true, key: `${slot.item.id}-retry-${index}` });
      setQueue(next);
    }
  };
  const onContinue = () => {
    setLastOutcome(null);
    if (index + 1 >= queue.length) completeRound();
    setIndex(index + 1);
  };

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <Tag>{index + 1} / {queue.length}</Tag>
        {lastOutcome === null && <span className="text-xs text-ink-faint">Daily Round</span>}
      </div>
      <ItemPlayer key={slot.key} item={slot.item} retry={slot.retry} onAnswered={onAnswered} onContinue={onContinue} />
    </Card>
  );
}
