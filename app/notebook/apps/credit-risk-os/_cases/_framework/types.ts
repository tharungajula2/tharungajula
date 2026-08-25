/**
 * CREDIT RISK OS 2.0 — REUSABLE ENTERPRISE CASE PLATFORM FRAMEWORK
 * Shared domain types, interfaces, and governance configurations.
 */

export type CasePhase =
  | 'Assigned'
  | 'Discovery'
  | 'Requirements'
  | 'Build Validation'
  | 'UAT'
  | 'Sign-off'
  | 'Completed';

export type ExperienceMode = 'Guided' | 'Assisted' | 'Independent';

export type InvestigationState = 'NOT_STARTED' | 'IN_PROGRESS' | 'FINDING_RECORDED' | 'COMPLETE';

export type DefectSeverity = 'BLOCKER' | 'CRITICAL' | 'MAJOR' | 'MINOR';

export interface CaseMetadata {
  id: string;
  code: string;
  title: string;
  type: string;
  primaryDomains: string[];
  institution: string;
  simulatedDate: string;
  businessOwner: string;
  targetDeadline: string;
  problemStatement: string;
}

export interface CaseStakeholder {
  id: string;
  name: string;
  title: string;
  department: string;
  roleDescription: string;
  keyConcern: string;
  decisionsOwned: string[];
  evidenceProvided: string[];
}

export interface CaseEvidence {
  id: string;
  code: string;
  title: string;
  type: 'Memo' | 'Data Extract' | 'Policy Doc' | 'Defect Note' | 'Minutes';
  summary: string;
  fullText: string;
  providedBy: string;
  keyInsights: string[];
}

export interface ProcessNode {
  step: string;
  title: string;
  owner: string;
  desc: string;
  breakPoint?: string;
  controlPoint?: string;
}

export interface BusinessRequirement {
  id: string;
  title: string;
  requirementText: string;
  owner: string;
  regulatoryDriver: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: 'Draft' | 'Approved' | 'In Development' | 'Verified';
  acceptanceCriteria: string;
  linkedRuleId: string;
  linkedMappingId: string;
  linkedTestId: string;
}

export interface BusinessRule {
  id: string;
  ruleCode: string;
  category: 'Asset Quality' | 'Provisioning' | 'Override' | 'Data Quality' | 'Reconciliation' | 'Treasury' | 'Capital';
  condition: string;
  outputClassification: string;
  provisionRatePercent: number;
  reasonCode: string;
  priority: number;
}

export interface SourceToTargetMapping {
  id: string;
  sourceSystem: string;
  sourceTable: string;
  sourceColumn: string;
  dataType: string;
  grain: string;
  transformationLogic: string;
  targetTable: string;
  targetField: string;
  nullRule: string;
  effectiveDateRule: string;
  dqRule: string;
  status: 'Current Discrepancy' | 'Target Approved';
}

export interface InvestigationTask {
  id: string;
  code: string;
  title: string;
  description: string;
  sampleQuery: string;
  sampleResultRows: Record<string, any>[];
  expectedFinding: string;
  discoveredDefectId: string;
}

export interface CaseDefect {
  id: string;
  code: string;
  title: string;
  severity: DefectSeverity;
  category: string;
  facilityNumber: string;
  obligorName: string;
  linkedEvidenceId: string;
  linkedReqId: string;
  linkedMappingId: string;
  linkedTestId: string;
  expectedBehaviour: string;
  actualBehaviour: string;
  rootCause: string;
  remediationFix: string;
  regressionTest: string;
  financialImpactInrCr: number;
  status: 'Open' | 'Resolved';
}

export interface UATTestCase {
  id: string;
  code: string;
  title: string;
  linkedReqId: string;
  precondition: string;
  testInput: string;
  expectedResult: string;
  actualResult: string;
  status: 'PASSED' | 'FAILED' | 'BLOCKED';
  linkedDefectId?: string;
}

export interface TraceabilityChain {
  id: string;
  regulatoryDriver: string;
  reqId: string;
  ruleId: string;
  mappingId: string;
  component: string;
  testId: string;
  defectId?: string;
  signoffOwner: string;
}

export interface StageBreakDetail {
  stageName: string;
  sourceCount: number;
  targetCount: number;
  sourceAmountInrCr: number;
  targetAmountInrCr: number;
  varianceAmountInrCr: number;
  reason: string;
  linkedDefectId?: string;
  runVersionId?: string;
}

export interface ReconciliationSide {
  facilityCount: number;
  grossOutstandingInrCr: number;
  npaOutstandingInrCr: number;
  requiredProvisionInrCr: number;
  unexplainedVarianceInrCr: number;
  reconciliationStatus: string;
  grossAbsoluteVarianceInrCr?: number;
  pricedPopulationCount?: number;
  rejectedPopulationCount?: number;
  consumedRunVersionId?: string;
  approvedRunVersionId?: string;
  isVersionLocked?: boolean;
  stageBreaks?: StageBreakDetail[];
}

export interface ReconciliationSummary {
  asOfDate: string;
  beforeFix: ReconciliationSide;
  afterFix: ReconciliationSide;
}

export interface SignOffRequirement {
  id: string;
  stakeholderTitle: string;
  approverName: string;
  role: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  signoffDate?: string;
  comments: string;
}

export interface GovernanceConfig {
  blockingSeverities: DefectSeverity[];
  requiredUatPassPercent: number;
  maxAllowedVarianceInrCr: number;
  requireRtmCoveragePercent: number;
}

export interface CapabilityScores {
  domainUnderstanding: number;
  requirements: number;
  dataAnalysis: number;
  traceability: number;
  testing: number;
  controls: number;
  overall: number;
}

export interface CaseDefinition {
  metadata: CaseMetadata;
  stakeholders: CaseStakeholder[];
  evidence: CaseEvidence[];
  currentStateNodes: ProcessNode[];
  targetStateNodes: ProcessNode[];
  requirements: BusinessRequirement[];
  rules: BusinessRule[];
  mappings: SourceToTargetMapping[];
  investigationTasks: InvestigationTask[];
  defects: CaseDefect[];
  uatTestPack: UATTestCase[];
  traceabilityMatrix: TraceabilityChain[];
  reconciliationSummary: ReconciliationSummary;
  signoffs: SignOffRequirement[];
  governanceConfig: GovernanceConfig;
}
