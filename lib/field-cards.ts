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
  isWip?: boolean;
  focus?: { note: string; missionsDone: number };
}

export const FIELD_CARDS: FieldCard[] = [
  {
    id: 'credit-risk-machine-uk-wip-final',
    category: 'FINANCE',
    packNumber: 'FINAL SIMULATOR',
    title: 'The Credit Risk Machine',
    subject: 'CREDIT RISK SIMULATOR • UK BANK',
    description:
      'Interactive reference system for a UK Bank Credit Risk BA — mapping origination, rating, loss parameters, Basel III/3.1 capital, IFRS 9 staging, BCBS 239 lineage, and vendor platforms.',
    missions: 10,
    cards: 24,
    tags: ['CREDIT RISK', 'UK BANK BA', 'BASEL 3.1', 'IFRS 9', 'BCBS 239', 'FINAL SIMULATOR'],
    href: '/field-cards/credit_risk_machine_uk_WIP_FINAL.html',
    isWip: false,
    focus: {
      note: 'Interactive UK Bank Credit Risk BA Learning Simulator.',
      missionsDone: 0,
    },
  },
  {
    id: 'credit-risk-uk-v01',
    category: 'FINANCE',
    packNumber: 'FIELD CARDS V01',
    title: 'Credit Risk & the Regulated Balance Sheet',
    subject: 'CREDIT RISK • UK EDITION',
    description:
      'How an internationally-active UK bank turns a rulebook into a number, files it to the regulator, and proves every figure — and the business-analysis work that builds the systems underneath.',
    missions: 16,
    cards: 102,
    tags: ['CREDIT RISK', 'UK / BASEL', 'BALANCE SHEET', 'PRA RULEBOOK', 'IFRS 9', 'RWA'],
    href: '/field-cards/credit_risk_uk_v01.html',
    isWip: false,
    focus: {
      note: 'UK/Basel position — balance sheet, capital, provisions & regulatory filing.',
      missionsDone: 0,
    },
  },
  {
    id: 'ai-stack-v02',
    category: 'AI & ENGINEERING',
    packNumber: 'FIELD CARDS V02',
    title: 'The AI Stack',
    subject: 'AI STACK • FIELD CARDS',
    description:
      'A complete map of how an AI system is actually built, for a reader starting from zero.',
    missions: 10,
    cards: 110,
    tags: ['AI STACK', 'ARCHITECTURE', 'COMPUTE & INFRA', 'RETRIEVAL & AGENTS', 'GOVERNANCE'],
    href: '/field-cards/ai_stack_v02.html',
    isWip: false,
  },
];

export function getFieldCards(): FieldCard[] {
  return FIELD_CARDS;
}

