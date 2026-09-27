import type { Item } from '../types';
import { mintItems } from './mint';
import { marketItems } from './market';
import { branchItems } from './branch';
import { registryItems } from './registry';
import { watchtowerItems } from './watchtower';
import { recoveryItems } from './recovery';
import { observatoryItems } from './observatory';
import { modellabItems } from './modellab';
import { vaultItems } from './vault';
import { fortressItems } from './fortress';
import { caseItems } from './case';
import { placeholderItems } from './placeholder';

export const items: Item[] = [
  ...mintItems, ...marketItems, ...branchItems, ...registryItems, ...watchtowerItems, ...recoveryItems,
  ...observatoryItems, ...modellabItems, ...vaultItems, ...fortressItems,
  ...caseItems, ...placeholderItems,
];
