// Credit Risk City: content contract (City Bible v1.1 §7). Data only.

export type Layer = 'F' | 'W' | 'D';
export type DistrictId =
  | 'mint' | 'market' | 'branch' | 'registry' | 'watchtower' | 'recovery'
  | 'observatory' | 'modellab' | 'trading' | 'vault' | 'fortress' | 'storm' | 'port'
  | 'reporting' | 'engineroom' | 'townhall' | 'embassy' | 'studio';
export type Jurisdiction = 'IN' | 'UK' | 'EU' | 'US';

export interface RuleValue<T = number> {
  value: T;
  label: string;
  illustrative: boolean;
  verified: boolean;
  source?: string;
  asOf?: string;
}

export interface District {
  id: DistrictId;
  order: number;
  name: string;
  landmark: string;
  purpose: string;
  colour: string;
}

export interface Concept {
  id: string;
  district: DistrictId;
  layer: Layer;
  name: string;
  oneLiner: string;
  explanation: string;
  whyItMatters: string;
  misconception?: string;
  anchor: string;
  prerequisites: string[];
  links: string[];
  embassy?: Partial<Record<Jurisdiction, string>>;
  sources?: { label: string; asOf: string }[];
  verified: boolean;
  /** Placeholder concepts stand in until their district's content batch lands. */
  placeholder?: boolean;
}

export type Tol = { kind: 'abs' | 'rel'; value: number };
export type KeyPoint = { text: string; essential: boolean };

export type ItemPayload =
  | { type: 'recall' | 'explain'; keyPoints: KeyPoint[]; modelAnswer: string }
  | { type: 'choice' | 'spot'; options: string[]; answerIndex: number }
  | {
      type: 'predict';
      options?: string[];
      answerIndex?: number;
      numeric?: { tolerance: Tol; unit: string };
      /** Sim output key, e.g. 'facility:tl1:stage' or 'kpi:cet1Ratio'. */
      bindTo: string;
    }
  | { type: 'calculate'; answer: number; tolerance: Tol; unit: string; worked?: string[]; blanks?: number[] }
  | { type: 'classify'; buckets: string[]; entries: { text: string; bucket: number }[] }
  | { type: 'sequence'; steps: string[] }
  | {
      type: 'anchor';
      mode: 'whatLivesHere' | 'whereDoesItLive';
      anchor: string;
      options: string[];
      answerIndex: number;
    };

export type ItemType = ItemPayload['type'];

export interface Item {
  id: string;
  conceptIds: string[];
  prompt: string;
  payload: ItemPayload;
  explanation: string;
  difficulty: 1 | 2 | 3;
  placeholder?: boolean;
}

export type Segment = 'retail' | 'sme' | 'corporate';

export interface BorrowerDef {
  id: string;
  name: string;
  segment: Segment;
  grade: string;
  /** Scripted borrowers change only through case events: no random behaviour or migration. */
  scripted?: boolean;
}

export interface FacilityDef {
  id: string;
  borrowerId: string;
  kind: 'term' | 'revolving';
  limit: number;
  drawn: number;
  /** Contractual rate = EIR in slice 1 (annual, effective). */
  rate: number;
  /** Funds transfer price (annual, effective). */
  ftp: number;
  remainingMonths: number;
}

export interface CollateralDef {
  id: string;
  borrowerId: string;
  kind: string;
  value: number;
  haircut: number;
  /** facilityId -> share (sum <= 1). Omitted = pro-rata to facility EAD within the obligor. */
  allocation?: Record<string, number>;
}

export type SimEvent =
  | { month: number; kind: 'payment'; facilityId: string; outcome: 'payAll' | 'payCurrent' | 'miss' }
  | { month: number; kind: 'draw' | 'repay'; facilityId: string; amount: number }
  | { month: number; kind: 'grade'; borrowerId: string; grade: string }
  | { month: number; kind: 'watchlist'; borrowerId: string; on: boolean }
  | { month: number; kind: 'utp'; borrowerId: string; on: boolean }
  | { month: number; kind: 'collateralIndex'; value: number }
  | { month: number; kind: 'recoveryDue'; facilityId: string; atMonth: number }
  | { month: number; kind: 'postWriteOffRecovery'; facilityId: string; amount: number };

export type SimEventKind = SimEvent['kind'];

export interface SimSetup {
  bank: { cet1: number };
  borrowers: BorrowerDef[];
  facilities: FacilityDef[];
  collateral: CollateralDef[];
  scenarioId: string;
}

export type CaseStepKind = 'predict' | 'act' | 'reveal' | 'explain' | 'baJob';

export interface CaseStep {
  id: string;
  title: string;
  district: DistrictId;
  kind: CaseStepKind;
  brief: string;
  itemIds: string[];
  /** Months the simulation advances when this step's items are answered (predict) or when revealed. */
  advanceMonths?: number;
}

export interface CaseDef {
  id: string;
  title: string;
  defaultSeed: number;
  setup: SimSetup;
  events: SimEvent[];
  steps: CaseStep[];
  generator?: string;
  placeholder?: boolean;
}

export type MissionGoal =
  | { kind: 'facilityStage'; facilityId: string; stage: 1 | 2 | 3 }
  | { kind: 'cet1RatioBelow'; threshold: number }
  | { kind: 'stage3RatioAbove'; threshold: number };

export interface MissionDef {
  id: string;
  kind: 'build' | 'break' | 'baJob';
  title: string;
  setup: SimSetup;
  goal: MissionGoal;
  itemIds: string[];
  placeholder?: boolean;
}

export interface Scenario {
  id: string;
  label: string;
  /** Monthly PD multiplier; months beyond the array use the last value. */
  macro: number[];
  /** Monthly collateral value index; months beyond the array use the last value. */
  cvi: number[];
}

export interface SimRules {
  gradePd: Record<string, RuleValue>;
  gradeOrder: string[];
  pdFloor: RuleValue;
  pdCap: RuleValue;
  sicrPdRatio: RuleValue;
  stage2ProbationMonths: RuleValue;
  stage3ProbationMonths: RuleValue;
  rollMissWeights: RuleValue<number[]>;
  rollCureShares: RuleValue<number[]>;
  rollMissCap: RuleValue;
  ccfAccounting: RuleValue;
  ccfRegulatory: RuleValue;
  unsecuredRecoveryRate: RuleValue;
  recoveryCostRate: RuleValue;
  recoveryMonths: RuleValue;
  riskWeights: Record<Segment, RuleValue>;
  defaultedRwLowProvision: RuleValue;
  defaultedRwHighProvision: RuleValue;
  defaultedProvisionThreshold: RuleValue;
  opexRate: RuleValue;
  cet1Target: RuleValue;
  hurdleRate: RuleValue;
  scenarios: Record<string, Scenario>;
}

export interface ContentPack {
  version: string;
  districts: District[];
  concepts: Concept[];
  items: Item[];
  cases: CaseDef[];
  missions: MissionDef[];
  rules: SimRules;
}
