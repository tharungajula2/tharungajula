import type { ContentPack, Item } from '../../content/types';
import { conceptState, type ConceptProgress } from './mastery';
import { effectiveDue, type ItemProgress } from './scheduler';
import type { IsoDate } from './dates';

export const ROUND_SIZE = 10;
export const NEW_SHARE = 0.2;

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

/** Best-effort interleave: avoid consecutive items from the same district when possible. */
export function interleave(pack: ContentPack, items: Item[]): Item[] {
  const pool = [...items];
  const out: Item[] = [];
  while (pool.length) {
    const prev = out.length ? districtOf(pack, out[out.length - 1]) : null;
    const idx = pool.findIndex((it) => districtOf(pack, it) !== prev);
    out.push(pool.splice(idx >= 0 ? idx : 0, 1)[0]);
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

  const conceptOrder = new Map(pack.concepts.map((c, i) => [c.id, i]));
  const districtOrder = new Map(pack.districts.map((d) => [d.id, d.order]));
  const fresh = eligible
    .filter((it) => !items[it.id] && unlocked(it))
    .sort((a, b) => {
      const ca = pack.concepts.find((c) => c.id === a.conceptIds[0])!;
      const cb = pack.concepts.find((c) => c.id === b.conceptIds[0])!;
      return (
        (districtOrder.get(ca.district) ?? 0) - (districtOrder.get(cb.district) ?? 0) ||
        (conceptOrder.get(ca.id) ?? 0) - (conceptOrder.get(cb.id) ?? 0)
      );
    });

  const main = ROUND_SIZE - 1;
  const chosen: Item[] = due.filter((it) => it.payload.type !== 'anchor').slice(0, main);
  const maxNew = Math.max(1, Math.round(NEW_SHARE * ROUND_SIZE));
  let added = 0;
  for (const it of fresh) {
    if (chosen.length >= main || added >= maxNew) break;
    if (it.payload.type === 'anchor') continue;
    chosen.push(it);
    added += 1;
  }

  const anchorDue = due.find((it) => it.payload.type === 'anchor');
  const anchorNew = fresh.find((it) => it.payload.type === 'anchor');
  const anchor = anchorDue ?? anchorNew;
  const ordered = interleave(pack, chosen);
  if (anchor) ordered.push(anchor);
  return ordered;
}
