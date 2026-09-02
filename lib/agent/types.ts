export type IntentType =
  | 'PROFILE'
  | 'PROJECT'
  | 'EXPERIENCE'
  | 'EDUCATION'
  | 'SKILLS'
  | 'ROLE_FIT'
  | 'LIMITATIONS'
  | 'UNKNOWN';

export interface EvidenceRecord {
  id: string;
  category: 'positioning' | 'experience' | 'education' | 'project' | 'analytics' | 'skills' | 'limitations';
  title: string;
  text: string;
  tags: string[];
  publicUrl?: string;
  limitations?: string[];
}

export interface IntentResult {
  intent: IntentType;
  keywords: string[];
  targetId?: string;
}

export interface VerificationResult {
  passed: boolean;
  reason?: string;
  forbiddenClaimsFound?: string[];
}

export interface AgentResponse {
  answer: string;
  sources: { title: string; url?: string; id: string }[];
  evidenceIds: string[];
  intent: IntentType;
  verified: boolean;
  refused: boolean;
}
