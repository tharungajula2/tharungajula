export type Severity = "optimal" | "monitor" | "action" | "critical";
export type Trend = "improving" | "stable" | "declining";

export interface MemberProfile {
  id: string;
  name: string;
  role: string;
  age: number;
  location: string;
  avatarUrl?: string;
  summary: string;
  lastConsult: string;
  nextClinicalAction: string;
  adherencePercentage: number;
  retestDays: number;
  recentChange?: string;
  pendingReview?: string;
  openQuestion?: string;
  nextDecision?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: "clinical" | "lifestyle" | "diagnostic" | "event";
  source?: string;
  status: "verified" | "extracted" | "pending";
}

export interface BiomarkerResult {
  id: string;
  label: string;
  value: string;
  unit: string;
  range: string;
  severity: Severity;
  trend: Trend;
  interpretation: string;
  category: "metabolic" | "cardiovascular" | "hormonal" | "longevity";
}

export interface ProblemCluster {
  id: string;
  title: string;
  biomarkers: string[]; // IDs of biomarkers
  severity: Severity;
  description: string;
}

export interface InterventionTask {
  id: string;
  title: string;
  category: "nutrition" | "movement" | "supplementation" | "lifestyle" | "clinical";
  frequency: string;
  rationale: string;
  metric?: string; // e.g. "24h HbA1c variance"
  reviewDate?: string; // e.g. "2026-04-18"
  status: "active" | "completed" | "paused";
  priority: "high" | "medium" | "low";
}

export interface AdherenceLog {
  date: string;
  completedTasks: string[]; // IDs of tasks
  totalTasks: number;
  notes?: string;
}

export interface AIInsightCard {
  id: string;
  type: "synthesis" | "brief" | "risk" | "rationale" | "caution";
  title: string;
  content: string;
  inputs?: string[]; // e.g. ["Wearables", "Lipid Panel"]
  confidence: number; // 0-1
  impact: "high" | "medium" | "low";
}

export interface SimulationState {
  member: MemberProfile;
  timeline: TimelineEvent[];
  biomarkers: BiomarkerResult[];
  clusters: ProblemCluster[];
  plan: InterventionTask[];
  adherence: AdherenceLog[];
  insights: AIInsightCard[];
  lastUpdated: string;
}
