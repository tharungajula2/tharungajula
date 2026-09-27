import type { Item } from '../types';
import { mintItems } from './mint';
import { marketItems } from './market';
import { branchItems } from './branch';
import { registryItems } from './registry';
import { watchtowerItems } from './watchtower';
import { recoveryItems } from './recovery';
import { caseItems } from './case';
import { placeholderItems } from './placeholder';

export const items: Item[] = [
  ...mintItems, ...marketItems, ...branchItems, ...registryItems, ...watchtowerItems, ...recoveryItems,
  ...caseItems, ...placeholderItems,
];
