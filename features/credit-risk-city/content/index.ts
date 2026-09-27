import type { ContentPack } from './types';
import { districts } from './districts';
import { concepts } from './concepts';
import { items } from './items';
import { smeAutoParts } from './cases/sme-auto-parts';
import { missions } from './missions';
import { rules } from './rules';

/** The single content entry point. The architect's pack replaces the files behind these imports. */
export const contentPack: ContentPack = {
  version: '0.1.0-placeholder',
  districts,
  concepts,
  items,
  cases: [smeAutoParts],
  missions,
  rules,
};
