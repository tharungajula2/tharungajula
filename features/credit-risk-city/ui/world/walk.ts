import type { ContentPack, DistrictId } from '../../content/types';

export type WalkQuestion =
  | { kind: 'where'; conceptId: string; answer: DistrictId }
  | { kind: 'what'; district: DistrictId; options: string[]; answerIndex: number };

/** Build a Palace Walk: alternate "where does X live?" (tap the map) and "what lives here?" (choose). */
export function buildWalk(pack: ContentPack, conceptIds: string[], rand: () => number, count = 6): WalkQuestion[] {
  const pool = [...conceptIds];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const byId = new Map(pack.concepts.map((c) => [c.id, c]));
  return pool.slice(0, count).map((id, i) => {
    const c = byId.get(id)!;
    if (i % 2 === 0) return { kind: 'where', conceptId: id, answer: c.district };
    const distractors = pack.concepts
      .filter((x) => x.district !== c.district)
      .map((x) => x.name)
      .sort(() => rand() - 0.5)
      .slice(0, 3);
    const options = [...distractors];
    const answerIndex = Math.floor(rand() * 4);
    options.splice(answerIndex, 0, c.name);
    return { kind: 'what', district: c.district, options, answerIndex };
  });
}
