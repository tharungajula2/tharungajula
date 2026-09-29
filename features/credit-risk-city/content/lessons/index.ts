import type { DistrictId } from '../types';
import { branchLesson } from './branch';
import { embassyLesson } from './embassy';
import { engineroomLesson } from './engineroom';
import { fortressLesson } from './fortress';
import { marketLesson } from './market';
import { mintLesson } from './mint';
import { modellabLesson } from './modellab';
import { observatoryLesson } from './observatory';
import { portLesson } from './port';
import { recoveryLesson } from './recovery';
import { registryLesson } from './registry';
import { reportingLesson } from './reporting';
import { stormLesson } from './storm';
import { studioLesson } from './studio';
import { townhallLesson } from './townhall';
import { tradingLesson } from './trading';
import type { Lesson } from './types';
import { vaultLesson } from './vault';
import { watchtowerLesson } from './watchtower';

export type { Lesson } from './types';

/** One lesson per district, in the Loud Recall cheatsheet format. */
export const lessons: Partial<Record<DistrictId, Lesson>> = {
  mint: mintLesson,
  market: marketLesson,
  branch: branchLesson,
  registry: registryLesson,
  watchtower: watchtowerLesson,
  recovery: recoveryLesson,
  observatory: observatoryLesson,
  modellab: modellabLesson,
  trading: tradingLesson,
  vault: vaultLesson,
  fortress: fortressLesson,
  storm: stormLesson,
  port: portLesson,
  reporting: reportingLesson,
  engineroom: engineroomLesson,
  townhall: townhallLesson,
  embassy: embassyLesson,
  studio: studioLesson,
};

export const lessonFor = (d: DistrictId): Lesson | undefined => lessons[d];
