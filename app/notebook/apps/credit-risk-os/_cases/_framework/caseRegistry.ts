/**
 * CREDIT RISK OS 2.0 — SHARED CASE REGISTRY
 * Central registry mapping Case IDs to case definitions and execution state.
 */

import { CaseDefinition } from './types';
import { CASE_01_DEFINITION } from '../case01/case01Data';
import { CASE_02_DEFINITION } from '../case02/case02Data';
import { CASE_03_DEFINITION } from '../case03/case03Data';

export interface RegisteredCase {
  id: string;
  code: string;
  title: string;
  category: string;
  status: 'ACTIVE_REFERENCE' | 'ACTIVE_ASSIGNED' | 'PREVIEW_PLANNED';
  description: string;
  definition?: CaseDefinition;
}

export const CASE_REGISTRY: RegisteredCase[] = [
  {
    id: 'CASE-001',
    code: 'CASE-2026-01',
    title: 'Asset Quality & IRACP Provisioning Transformation',
    category: 'ASSET QUALITY & RBI IRACP',
    status: 'ACTIVE_REFERENCE',
    description:
      'Audit DPD asset quality classification triggers (SMA-0, SMA-1, SMA-2, Substandard NPA) and calculate RBI IRACP required provisions against realisable security value haircut models.',
    definition: CASE_01_DEFINITION,
  },
  {
    id: 'CASE-002',
    code: 'CASE-2026-02',
    title: 'Treasury FTP Data Transformation',
    category: 'TREASURY & ALM',
    status: 'ACTIVE_ASSIGNED',
    description:
      'Audit Funds Transfer Pricing (FTP) data pipelines, resolve repricing tenor mismatches, composite key duplicates, and reconcile source lending balances against ALCO FTP engine outputs.',
    definition: CASE_02_DEFINITION,
  },
  {
    id: 'CASE-003',
    code: 'CASE-2026-03',
    title: 'Capital & Regulatory Change',
    category: 'REGULATORY CAPITAL',
    status: 'ACTIVE_ASSIGNED',
    description:
      'Audit Credit Risk RWA under RBI Basel III Standardised Approach, resolve exposure classification errors, stale rating lookups, off-balance sheet CCF conversions, and verify whole-bank CET1 / CRAR adequacy.',
    definition: CASE_03_DEFINITION,
  },
];
