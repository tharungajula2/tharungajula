'use client';

import { useState } from 'react';
import { contentPack } from '../content';
import type { DistrictId, Item } from '../content/types';
import { buildRound } from '../engine/learning/round';
import { useCity } from '../state/store';
import { useWorld } from '../state/world';
import { todayIso } from '../state/today';
import ItemPlayer, { type ItemOutcome } from './ItemPlayer';
import { Button, Card, Tag } from './primitives';

interface Slot {
  item: Item;
  retry: boolean;
  key: string;
}

const districtOfItem = (item: Item | undefined): DistrictId | null =>
  item ? contentPack.concepts.find((c) => c.id === item.conceptIds[0])?.district ?? null : null;

/** Daily Round, or a district practice session when `district` is set (due + new items there only). */
export default function RoundView({ district, onWalk }: { district?: DistrictId; onWalk?: (district: DistrictId, conceptId: string) => void }) {
  const setRoundDistrict = useWorld((s) => s.setRoundDistrict);
  const answer = useCity((s) => s.answer);
  const markRevealed = useCity((s) => s.markRevealed);
  const completeRound = useCity((s) => s.completeRound);
  const [queue, setQueue] = useState<Slot[] | null>(null);
  const [index, setIndex] = useState(0);
  const [misses, setMisses] = useState<string[]>([]);
  const [lastOutcome, setLastOutcome] = useState<ItemOutcome | null>(null);
  // The weakest answer this round: the first miss, else the least confident correct answer.
  const [weakest, setWeakest] = useState<{ itemId: string; score: number } | null>(null);
  const setNextWalk = useCity((s) => s.setNextWalk);

  const start = () => {
    const s = useCity.getState();
    const pack = district
      ? { ...contentPack, items: contentPack.items.filter((i) => districtOfItem(i) === district) }
      : contentPack;
    const items = buildRound({ pack, items: s.items, concepts: s.concepts, today: todayIso() });
    setQueue(items.map((item, i) => ({ item, retry: false, key: `${item.id}-${i}` })));
    setRoundDistrict(districtOfItem(items[0]));
    setIndex(0);
    setMisses([]);
    setWeakest(null);
    setLastOutcome(null);
  };

  if (!queue) {
    return (
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">{district ? 'Practise here' : 'Play a round'}</h2>
        <p className="text-sm text-ink-muted">
          {district
            ? 'Questions from this district: new ones first, then reviews.'
            : 'About ten questions: reviews first, then new ones, and one Palace Walk question. Answer from memory — reading doesn’t count. Play as many rounds as you like.'}
        </p>
        <Button onClick={start}>{district ? 'Start' : 'Start a round'}</Button>
      </Card>
    );
  }

  if (queue.length === 0) {
    return (
      <Card className="space-y-3">
        <p className="text-sm">{district ? 'Nothing due or new here right now. Spacing will bring it back.' : 'Nothing due right now. Play the case to earn application evidence.'}</p>
        <Button variant="ghost" onClick={() => setQueue(null)}>Back</Button>
      </Card>
    );
  }

  const weakestItem = weakest ? contentPack.items.find((i) => i.id === weakest.itemId) : undefined;
  const weakestConcept = weakestItem ? contentPack.concepts.find((c) => c.id === weakestItem.conceptIds[0]) : undefined;

  if (index >= queue.length) {
    return (
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">Round complete</h2>
        {misses.length ? (
          <div className="space-y-1">
            <p className="text-sm text-ink-muted">Watch these — they come back in your next rounds:</p>
            <ul className="list-disc pl-5 text-sm">{misses.map((m) => <li key={m}>{contentPack.items.find((i) => i.id === m)?.prompt}</li>)}</ul>
          </div>
        ) : (
          <p className="text-sm">Clean round.</p>
        )}
        {weakestConcept && (
          <div className="space-y-2 rounded-lg border border-accent bg-accent-glow p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Next step</p>
            <p className="text-sm">Your weakest answer was on <strong>{weakestConcept.name}</strong>. Walk into {contentPack.districts.find((d) => d.id === weakestConcept.district)?.name} and play its machine for two minutes.</p>
            {onWalk && <Button onClick={() => onWalk(weakestConcept.district, weakestConcept.id)}>Walk there now</Button>}
          </div>
        )}
        <div className="flex flex-wrap gap-2"><Button variant={weakestConcept ? 'ghost' : 'primary'} onClick={start}>Play another round</Button><Button variant="quiet" onClick={() => setQueue(null)}>Done</Button></div>
      </Card>
    );
  }

  const slot = queue[index];
  const onAnswered = (o: ItemOutcome) => {
    setLastOutcome(o);
    if (o.firstAttempt) {
      const score = o.result.correct ? o.confidence : -1;
      if (!weakest || score < weakest.score) setWeakest({ itemId: slot.item.id, score });
    }
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
    if (index + 1 >= queue.length && !district) {
      completeRound();
      const wi = weakest ? contentPack.items.find((i) => i.id === weakest.itemId) : undefined;
      const wc = wi ? contentPack.concepts.find((c) => c.id === wi.conceptIds[0]) : undefined;
      if (wc) setNextWalk(wc.district, wc.id);
    }
    setRoundDistrict(districtOfItem(queue[index + 1]?.item));
    setIndex(index + 1);
  };

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <Tag>{index + 1} / {queue.length}</Tag>
        {lastOutcome === null && <span className="text-xs text-ink-faint">Round</span>}
      </div>
      <ItemPlayer key={slot.key} item={slot.item} retry={slot.retry} onAnswered={onAnswered} onContinue={onContinue} />
    </Card>
  );
}
