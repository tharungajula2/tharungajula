import type { Concept } from '../types';
import { mint } from './mint';
import { market } from './market';
import { branch } from './branch';
import { registry } from './registry';
import { watchtower } from './watchtower';
import { recovery } from './recovery';
import { placeholderConcepts } from './placeholder';

/** All concepts in walking order. Batch 1 (districts 1–6) is real content; the rest are placeholders. */
export const concepts: Concept[] = [...mint, ...market, ...branch, ...registry, ...watchtower, ...recovery, ...placeholderConcepts];
