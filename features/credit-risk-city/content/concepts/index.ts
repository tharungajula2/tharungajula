import type { Concept } from '../types';
import { mint } from './mint';
import { market } from './market';
import { branch } from './branch';
import { registry } from './registry';
import { watchtower } from './watchtower';
import { recovery } from './recovery';
import { observatory } from './observatory';
import { modellab } from './modellab';
import { trading } from './trading';
import { vault } from './vault';
import { fortress } from './fortress';
import { storm } from './storm';
import { port } from './port';
import { reporting } from './reporting';
import { engineroom } from './engineroom';
import { townhall } from './townhall';
import { embassy } from './embassy';
import { studio } from './studio';
import { placeholderConcepts } from './placeholder';

/** All concepts in walking order (districts 1–18). */
export const concepts: Concept[] = [
  ...mint, ...market, ...branch, ...registry, ...watchtower, ...recovery,
  ...observatory, ...modellab, ...trading, ...vault, ...fortress, ...storm,
  ...port, ...reporting, ...engineroom, ...townhall, ...embassy, ...studio,
  ...placeholderConcepts,
];
