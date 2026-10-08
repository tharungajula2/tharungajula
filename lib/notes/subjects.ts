export type SubjectId = 'ai' | 'finance' | 'health' | 'life';
export type ContentFormat = 'masterclass' | 'article';

export interface SubjectConfig {
  id: SubjectId;
  name: string;
  description: string;
}

export const TOPIC_ORDER: SubjectId[] = ['ai', 'finance', 'health', 'life'];
export const PRIMARY_TOPIC: SubjectId = 'ai';

export const SUBJECTS: SubjectConfig[] = [
  {
    id: 'ai',
    name: 'AI',
    description: 'Building with AI, and the machine learning underneath it.',
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Banking, credit risk and how money actually moves.',
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Everyday health, explained simply: body, food, sleep and caring for family.',
  },
  {
    id: 'life',
    name: 'Life',
    description: 'Notes on everything else worth learning.',
  },
];

export const SUBJECT_MAP: Record<SubjectId, SubjectConfig> = {
  ai: SUBJECTS[0],
  finance: SUBJECTS[1],
  health: SUBJECTS[2],
  life: SUBJECTS[3],
};
