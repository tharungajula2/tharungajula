import type { Item } from '../types';
import { mintItems } from './mint';
import { marketItems } from './market';
import { branchItems } from './branch';
import { registryItems } from './registry';
import { watchtowerItems } from './watchtower';
import { recoveryItems } from './recovery';
import { observatoryItems } from './observatory';
import { modellabItems } from './modellab';
import { tradingItems } from './trading';
import { vaultItems } from './vault';
import { fortressItems } from './fortress';
import { stormItems } from './storm';
import { portItems } from './port';
import { reportingItems } from './reporting';
import { engineroomItems } from './engineroom';
import { townhallItems } from './townhall';
import { embassyItems } from './embassy';
import { studioItems } from './studio';
import { placeholderItems } from './placeholder';

export const items: Item[] = [
  ...mintItems, ...marketItems, ...branchItems, ...registryItems, ...watchtowerItems, ...recoveryItems,
  ...observatoryItems, ...modellabItems, ...tradingItems, ...vaultItems, ...fortressItems, ...stormItems,
  ...portItems, ...reportingItems, ...engineroomItems, ...townhallItems, ...embassyItems, ...studioItems,
  ...placeholderItems,
];
