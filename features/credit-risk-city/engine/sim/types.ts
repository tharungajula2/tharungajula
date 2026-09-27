import type { Segment } from '../../content/types';

export type Stage = 1 | 2 | 3;

export interface BorrowerState {
  id: string;
  name: string;
  segment: Segment;
  grade: string;
  originGrade: string;
  scripted: boolean;
  /** 12-month PD at origination (floored). */
  pd0: number;
  /** Current 12-month PD. */
  pd: number;
  pdCapped: boolean;
  defaulted: boolean;
  watchlist: boolean;
  utp: boolean;
  /** Consecutive months with no arrears and no UTP while defaulted (Stage 3 probation). */
  cureStreak: number;
  /** Consecutive months fully current (rating restoration for generated borrowers). */
  currentStreak: number;
  maxKSeen: number;
}

export interface FacilityState {
  id: string;
  borrowerId: string;
  kind: 'term' | 'revolving';
  limit: number;
  /** Gross carrying amount (GCA). */
  drawn: number;
  undrawn: number;
  rate: number;
  ftp: number;
  remainingMonths: number;
  /** Number of unpaid instalments. */
  k: number;
  /** Amount of unpaid instalments. */
  arrears: number;
  stage: Stage;
  allowance: number;
  /** Consecutive months with all SICR triggers false while in Stage 2. */
  sicrClearStreak: number;
  recoveryDueMonth: number | null;
  closed: boolean;
  writtenOff: number;
}

export interface CollateralState {
  id: string;
  borrowerId: string;
  kind: string;
  value: number;
  haircut: number;
  allocation?: Record<string, number>;
}

export interface FacilityFlow {
  opening: number;
  closing: number;
  charge: number;
  interestAdj: number;
  writeOff: number;
}

export interface MonthFlows {
  month: number;
  interestIncome: number;
  fundingCost: number;
  opex: number;
  charge: number;
  interestAdj: number;
  writeOffs: number;
  recoveryCash: number;
  postWriteOffRecoveries: number;
  net: number;
  byFacility: Record<string, FacilityFlow>;
}

export interface Kpis {
  totalGca: number;
  totalEcl: number;
  stage3Gca: number;
  stage3Allowance: number;
  stage3Ratio: number | null;
  stage3Coverage: number | null;
  costOfRisk: number | null;
  rwa: number;
  cet1: number;
  cet1Ratio: number | null;
  stageGca: Record<Stage, number>;
}

export interface LogEntry {
  month: number;
  kind: string;
  text: string;
  facilityId?: string;
  borrowerId?: string;
}

export interface SimState {
  month: number;
  seed: number;
  rng: number;
  scenarioId: string;
  cviOverride: number | null;
  cet1: number;
  borrowers: BorrowerState[];
  facilities: FacilityState[];
  collateral: CollateralState[];
  flows: MonthFlows[];
  /** Total GCA at the end of each month, index = month. */
  gcaHistory: number[];
  cumCharge: number;
  kpis: Kpis;
  log: LogEntry[];
}
