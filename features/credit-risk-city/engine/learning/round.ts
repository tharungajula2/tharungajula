import type { ContentPack, Item } from '../../content/types';
import { conceptState, type ConceptProgress } from './mastery';
import { effectiveDue, type ItemProgress } from './scheduler';
import type { IsoDate } from './dates';

export const ROUND_SIZE = 10;
export const NEW_SHARE = 0.2;
/** Most new items introduced in one round (spacing research: a few new ideas at a time). */
export const NEW_MAX = 9;

export interface RoundInput {
  pack: ContentPack;
  items: Record<string, ItemProgress>;
  concepts: Record<string, ConceptProgress>;
  today: IsoDate;
}

const districtOf = (pack: ContentPack, item: Item): string => {
  const c = pack.concepts.find((x) => x.id === item.conceptIds[0]);
  return c?.district ?? '';
};

/**
 * Interleave: never two items from the same district in a row when avoidable.
 * Each step takes the next item from the district with the most items left (other than the previous one),
 * keeping each district's own order (so the most overdue items still come first).
 */
export function interleave(pack: ContentPack, items: Item[]): Item[] {
  const queues = new Map<string, Item[]>();
  for (const it of items) {
    const d = districtOf(pack, it);
    queues.set(d, [...(queues.get(d) ?? []), it]);
  }
  const firstIndex = (d: string) => items.indexOf(queues.get(d)![0]);
  const out: Item[] = [];
  let prev: string | null = null;
  while (out.length < items.length) {
    const open = [...queues.keys()].filter((d) => queues.get(d)!.length > 0);
    const candidates = open.filter((d) => d !== prev);
    const pool = candidates.length ? candidates : open;
    pool.sort((a, b) => queues.get(b)!.length - queues.get(a)!.length || firstIndex(a) - firstIndex(b));
    const d = pool[0];
    out.push(queues.get(d)!.shift()!);
    prev = d;
  }
  return out;
}

/** Daily Round (City Bible v1.1 §5.3). Case-bound predict items are excluded. */
export function buildRound({ pack, items, concepts, today }: RoundInput): Item[] {
  const eligible = pack.items.filter((it) => it.payload.type !== 'predict');
  const unlocked = (it: Item) =>
    it.conceptIds.every((cid) => {
      const c = pack.concepts.find((x) => x.id === cid);
      return c ? conceptState(c, concepts) !== 'locked' : false;
    });

  const due = eligible
    .filter((it) => items[it.id] && effectiveDue(items[it.id]) <= today)
    .sort((a, b) => effectiveDue(items[a.id]).localeCompare(effectiveDue(items[b.id])));

  // New items: one per concept first (first question of each concept in walking order), then second questions, etc.
  const conceptOrder = new Map(pack.concepts.map((c, i) => [c.id, i]));
  const districtOrder = new Map(pack.districts.map((d) => [d.id, d.order]));
  const rankInConcept = new Map<string, number>();
  const seenPerConcept = new Map<string, number>();
  for (const it of eligible) {
    if (it.payload.type === 'anchor') continue;
    const cid = it.conceptIds[0];
    const n = seenPerConcept.get(cid) ?? 0;
    rankInConcept.set(it.id, n);
    seenPerConcept.set(cid, n + 1);
  }
  const fresh = eligible
    .filter((it) => !items[it.id] && unlocked(it))
    .sort((a, b) => {
      const ca = pack.concepts.find((c) => c.id === a.conceptIds[0])!;
      const cb = pack.concepts.find((c) => c.id === b.conceptIds[0])!;
      return (
        (rankInConcept.get(a.id) ?? 0) - (rankInConcept.get(b.id) ?? 0) ||
        (districtOrder.get(ca.district) ?? 0) - (districtOrder.get(cb.district) ?? 0) ||
        (conceptOrder.get(ca.id) ?? 0) - (conceptOrder.get(cb.id) ?? 0)
      );
    });

  const main = ROUND_SIZE - 1;
  const chosen: Item[] = due.filter((it) => it.payload.type !== 'anchor').slice(0, main);
  // New items take at least 20% of the round, and fill empty slots up to NEW_MAX when little is due.
  const maxNew = Math.min(NEW_MAX, Math.max(Math.round(NEW_SHARE * ROUND_SIZE), main - chosen.length));
  let added = 0;
  for (const it of fresh) {
    if (chosen.length >= main || added >= maxNew) break;
    if (it.payload.type === 'anchor') continue;
    chosen.push(it);
    added += 1;
  }

  // One-sitting play: never an empty round — fill any remaining slots with early reviews, soonest first.
  if (chosen.length < main) {
    const early = eligible
      .filter((it) => items[it.id] && effectiveDue(items[it.id]) > today && it.payload.type !== 'anchor' && !chosen.includes(it))
      .sort((a, b) => effectiveDue(items[a.id]).localeCompare(effectiveDue(items[b.id])));
    chosen.push(...early.slice(0, main - chosen.length));
  }

  const anchorDue = due.find((it) => it.payload.type === 'anchor');
  const anchorNew = fresh.find((it) => it.payload.type === 'anchor');
  const anchor = anchorDue ?? anchorNew;
  const ordered = interleave(pack, chosen);
  if (anchor) ordered.push(anchor);
  return ordered;
}
