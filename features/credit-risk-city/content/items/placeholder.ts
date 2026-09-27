import type { Item } from '../types';

const i = (x: Omit<Item, 'placeholder'>): Item => ({ ...x, placeholder: true });

// PLACEHOLDER items for districts not yet written. Each district's content batch replaces its entries.
export const placeholderItems: Item[] = [
  i({ id: 'trading-choice', conceptIds: ['counterparty-exposure'], difficulty: 2, prompt: 'A swap has ₹100 crore notional and is worth +₹2 crore to the bank today. Current exposure to the counterparty is…',
    payload: { type: 'choice', options: ['₹100 crore', '₹2 crore', '₹102 crore', 'Zero'], answerIndex: 1 },
    explanation: 'Exposure is replacement cost (positive value), not notional.' }),
  i({ id: 'storm-choice', conceptIds: ['concentration'], difficulty: 1, prompt: 'Which portfolio is most exposed to one shock?',
    payload: { type: 'choice', options: ['100 loans across 10 sectors', '100 loans to suppliers of one car maker', '100 loans across 5 regions', '100 small retail loans'], answerIndex: 1 },
    explanation: 'Many names sharing one driver behave like one big exposure.' }),
  i({ id: 'port-anchor', conceptIds: ['securitisation'], difficulty: 1, prompt: 'Palace Walk: where does securitisation live?',
    payload: { type: 'anchor', mode: 'whereDoesItLive', anchor: 'port-containers', options: ['The Port containers', 'The Mint scales', 'Town Hall table', 'The Watchtower clock'], answerIndex: 0 },
    explanation: 'Loans are packed into tranches and shipped out from the Port.' }),
  i({ id: 'engine-anchor', conceptIds: ['data-lineage'], difficulty: 1, prompt: 'Palace Walk: beneath the city, the pipes. What lives here?',
    payload: { type: 'anchor', mode: 'whatLivesHere', anchor: 'engine-pipes', options: ['Data lineage', 'Securitisation', 'Credit spreads', 'Collateral haircuts'], answerIndex: 0 },
    explanation: 'Pipes carry every number from source to report.' }),
  i({ id: 'hall-choice', conceptIds: ['three-lines'], difficulty: 1, prompt: 'Who owns the credit risk of a new loan?',
    payload: { type: 'choice', options: ['Internal audit', 'The business that originates it', 'The regulator', 'The data team'], answerIndex: 1 },
    explanation: 'First line owns; second line challenges; third line assures.' }),
  i({ id: 'embassy-choice', conceptIds: ['jurisdiction-rulebooks'], difficulty: 2, prompt: 'Before encoding a capital rule, what must you confirm first?',
    payload: { type: 'choice', options: ['The Basel paragraph only', 'The applicable local rulebook, version and effective date', 'What another bank does', 'The latest consultation paper'], answerIndex: 1 },
    explanation: 'Basel is a standard; local law, version and date decide what applies.' }),
];
