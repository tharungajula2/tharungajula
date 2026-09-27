import type { ContentPack } from './types';
import { districts } from './districts';
import { concepts } from './concepts';
import { items } from './items';
import { buildSmeCase, SME_DEFAULT_SEED } from './cases/sme';
import { missions } from './missions';
import { rules } from './rules';

// The case's canonical instance (default seed) provides the static items used by Daily Rounds;
// each case run regenerates its own borrower and items from the run's seed.
const sme = buildSmeCase(SME_DEFAULT_SEED, rules);

/** The single content entry point. */
export const contentPack: ContentPack = {
  version: '1.0.0',
  districts,
  concepts,
  items: [...items, ...sme.items],
  cases: [sme.def],
  missions,
  rules,
};
