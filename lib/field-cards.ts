export interface FieldCard {
  id: string;
  category: string;
  packNumber: string;
  title: string;
  subject: string;
  description: string;
  missions: number;
  cards: number;
  tags: string[];
  href: string;
}

export const FIELD_CARDS: FieldCard[] = [
  {
    id: 'ai-stack-v01',
    category: 'AI Stack',
    packNumber: 'FIELD CARDS V01',
    title: 'The AI Stack',
    subject: 'AI STACK • FIELD CARDS',
    description:
      'A complete map of how an AI system is actually built, for a reader starting from zero. 10 missions, 97 cards.',
    missions: 10,
    cards: 97,
    tags: ['AI STACK', 'ARCHITECTURE', 'COMPUTE & INFRA', 'RETRIEVAL & AGENTS', 'GOVERNANCE'],
    href: '/field-cards/ai_stack_v01.html',
  },
];

export function getFieldCards(): FieldCard[] {
  return FIELD_CARDS;
}

