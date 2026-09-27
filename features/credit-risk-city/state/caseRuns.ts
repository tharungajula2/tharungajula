import { contentPack } from '../content';
import { buildSmeCase } from '../content/cases/sme';
import type { CaseDef, Item } from '../content/types';

// Each run's borrower is generated from its seed; memoised so the sim and the questions stay identical.
const cache = new Map<number, { def: CaseDef; items: Map<string, Item> }>();

export function caseFor(seed: number): { def: CaseDef; items: Map<string, Item> } {
  let hit = cache.get(seed);
  if (!hit) {
    const { def, items } = buildSmeCase(seed, contentPack.rules);
    hit = { def, items: new Map(items.map((i) => [i.id, i])) };
    cache.set(seed, hit);
  }
  return hit;
}
