import type { MissionDef } from '../types';

// PLACEHOLDER mission (schema proof). Break the Bank missions arrive with the content pack.
export const missions: MissionDef[] = [
  {
    id: 'break-stage2',
    kind: 'break',
    title: 'Push the term loan into Stage 2',
    placeholder: true,
    setup: {
      bank: { cet1: 40 },
      scenarioId: 'base',
      borrowers: [{ id: 'b1', name: 'Auto-parts maker (SME)', segment: 'sme', grade: 'G4', scripted: true }],
      facilities: [{ id: 'tl1', borrowerId: 'b1', kind: 'term', limit: 20, drawn: 20, rate: 0.105, ftp: 0.07, remainingMonths: 60 }],
      collateral: [],
    },
    goal: { kind: 'facilityStage', facilityId: 'tl1', stage: 2 },
    itemIds: ['vault-classify'],
  },
];
