import type { DistrictId } from '../content/types';
import { fortressExhibits } from './fortress';
import { observatoryExhibits } from './observatory';
import type { Exhibit } from './types';
import { vaultExhibits } from './vault';

export const exhibits: Exhibit[] = [...observatoryExhibits, ...vaultExhibits, ...fortressExhibits];

export const exhibitsFor = (d: DistrictId): Exhibit[] => exhibits.filter((e) => e.district === d);
export const hasInterior = (d: DistrictId): boolean => exhibits.some((e) => e.district === d);
export type { Exhibit } from './types';
