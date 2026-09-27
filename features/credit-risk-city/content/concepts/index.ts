import type { Concept } from '../types';
import { mint } from './mint';
import { market } from './market';
import { branch } from './branch';
import { registry } from './registry';
import { watchtower } from './watchtower';
import { recovery } from './recovery';
import { observatory } from './observatory';
import { modellab } from './modellab';
import { vault } from './vault';
import { fortress } from './fortress';
import { placeholderConcepts } from './placeholder';

/** All concepts in walking order. Real content: batch 1 (districts 1–6) and batch 2 (7, 8, 10, 11). */
export const concepts: Concept[] = [
  ...mint, ...market, ...branch, ...registry, ...watchtower, ...recovery,
  ...observatory, ...modellab, ...vault, ...fortress,
  ...placeholderConcepts,
];
