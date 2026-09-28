import { contentPack } from '../content';
import type { DistrictId } from '../content/types';
import { exhibitsFor } from '../exhibits';

export type LinkMode = 'home' | 'district' | 'interior' | 'round' | 'case' | 'missions' | 'walk' | 'progress';

export interface DeepLink {
  mode: LinkMode;
  district: DistrictId | null;
  exhibit: number;
}

const MODES: LinkMode[] = ['round', 'case', 'missions', 'walk', 'progress'];

/** Parse ?district=vault&walk=1&exhibit=3 or ?mode=case. Unknown values are ignored. */
export function parseDeepLink(search: string): DeepLink {
  const q = new URLSearchParams(search);
  const d = q.get('district');
  const district = contentPack.districts.some((x) => x.id === d) ? (d as DistrictId) : null;
  const m = q.get('mode') as LinkMode | null;
  if (district) {
    const n = exhibitsFor(district).length;
    const ex = Math.max(0, Math.min(n - 1, Number(q.get('exhibit') ?? 1) - 1 || 0));
    return { mode: q.get('walk') === '1' && n > 0 ? 'interior' : 'district', district, exhibit: ex };
  }
  return { mode: m && MODES.includes(m) ? m : 'home', district: null, exhibit: 0 };
}

export function linkFor(district: DistrictId, exhibit?: number): string {
  return `?district=${district}&walk=1${exhibit !== undefined ? `&exhibit=${exhibit + 1}` : ''}`;
}
