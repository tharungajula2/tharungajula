import { contentPack } from '../content';
import type { DistrictId } from '../content/types';

export type LinkMode = 'home' | 'district' | 'round' | 'case' | 'missions' | 'walk' | 'progress';

export interface DeepLink {
  mode: LinkMode;
  district: DistrictId | null;
  exhibit: number;
}

const MODES: LinkMode[] = ['round', 'case', 'missions', 'walk', 'progress'];

/** Parse ?district=vault or ?mode=case. Unknown values are ignored. */
export function parseDeepLink(search: string): DeepLink {
  const q = new URLSearchParams(search);
  const d = q.get('district');
  const district = contentPack.districts.some((x) => x.id === d) ? (d as DistrictId) : null;
  const m = q.get('mode') as LinkMode | null;
  if (district) {
    const ex = Math.max(0, Number(q.get('exhibit') ?? 1) - 1 || 0);
    return { mode: 'district', district, exhibit: ex };
  }
  return { mode: m && MODES.includes(m) ? m : 'home', district: null, exhibit: 0 };
}

export function linkFor(district: DistrictId, exhibit?: number): string {
  return `?district=${district}${exhibit !== undefined ? `&exhibit=${exhibit + 1}` : ''}`;
}
