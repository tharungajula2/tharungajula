import { contentPack } from './index';

/** Districts that carry real (non-placeholder) content, in walking order. */
export const realDistricts = contentPack.districts.filter((d) =>
  contentPack.concepts.some((c) => c.district === d.id && !c.placeholder),
);

export function coverageLine(): string {
  const n = realDistricts.length;
  return n === contentPack.districts.length
    ? 'All 18 districts have real content.'
    : `${n} of 18 districts have real content (${realDistricts.map((d) => d.order).join(', ')}). The rest are placeholders until their batches land.`;
}
