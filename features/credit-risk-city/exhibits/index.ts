import type { DistrictId } from '../content/types';
import { fortressExhibits } from './fortress';
import { observatoryExhibits } from './observatory';
import type { Exhibit } from './types';
import { vaultExhibits } from './vault';
import { route1Exhibits } from './route1';
import { route2Exhibits } from './route2';
import { route3Exhibits } from './route3';

export const exhibits: Exhibit[] = [...route1Exhibits, ...observatoryExhibits, ...route2Exhibits, ...vaultExhibits, ...fortressExhibits, ...route3Exhibits];

export const exhibitsFor = (d: DistrictId): Exhibit[] => exhibits.filter((e) => e.district === d);
export const hasInterior = (d: DistrictId): boolean => exhibits.some((e) => e.district === d);
export type { Exhibit } from './types';
