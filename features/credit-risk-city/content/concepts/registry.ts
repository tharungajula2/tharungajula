import type { Concept } from '../types';

// District 4 · The Registry — collateral, guarantees and legal protection.
export const registry: Concept[] = [
  {
    id: 'collateral-haircut', district: 'registry', layer: 'F', verified: false, anchor: 'registry-scissors', prerequisites: [], links: ['ltv'],
    name: 'Collateral and haircuts',
    oneLiner: 'Collateral reduces the loss if default happens — after cutting its value for the risks of selling it.',
    explanation:
      'Recoverable value = market value × (1 − haircut).\n\nThe haircut covers the forced-sale discount, the costs and time of selling, and how much the value can fall before the sale happens.',
    whyItMatters: 'Collateral values, haircuts and allocation across facilities are classic data-mapping traps.',
    misconception: '“Collateral makes the borrower safer.” It lowers the loss given default, not the chance of default.',
  },
  {
    id: 'ltv', district: 'registry', layer: 'F', verified: false, anchor: 'registry-seesaw', prerequisites: ['collateral-haircut'], links: [],
    name: 'Loan-to-value (LTV)',
    oneLiner: 'LTV = loan ÷ collateral value: how much of the security the loan already uses up.',
    explanation:
      'A ₹40 lakh loan on a ₹50 lakh home has an 80% LTV. If prices fall 20%, the same loan is at 100% LTV — no cushion left.\n\nLTV at origination is a policy limit; current (indexed) LTV tracks the cushion over time.',
    whyItMatters: 'LTV drives mortgage policy, LGD models and risk weights, so valuation dates and indexation rules matter.',
    embassy: { IN: 'RBI sets LTV ceilings for housing loans, tiered by loan size.' },
  },
  {
    id: 'guarantees', district: 'registry', layer: 'F', verified: false, anchor: 'registry-seal', prerequisites: [], links: ['collateral-haircut'],
    name: 'Guarantees',
    oneLiner: 'A guarantor promises to pay if the borrower does not — worth only as much as the guarantor.',
    explanation:
      'A guarantee moves risk to the guarantor; its value depends on the guarantor’s own strength and on how likely both are to fail together.\n\nA promoter guaranteeing their own company adds little when the promoter’s wealth is tied up in that company. In standardised capital rules, an eligible guarantor’s risk weight can be substituted for the borrower’s.',
    whyItMatters: 'Guarantor data (who, how much, which facility, eligibility) feeds limits, LGD and capital.',
    misconception: '“A guarantee removes the borrower’s risk.” It adds a second way to be repaid; both can still fail.',
  },
  {
    id: 'perfection-charge', district: 'registry', layer: 'F', verified: false, anchor: 'registry-ribbon', prerequisites: ['collateral-haircut'], links: [],
    name: 'Creating, perfecting and ranking security',
    oneLiner: 'Security only protects the bank if it is legally created, registered and ranked ahead of others.',
    explanation:
      'Create the charge in the security documents; perfect it by registering it; know its rank (first charge is repaid before second; pari passu ranks equally).\n\nAn unregistered or wrongly ranked charge may be worth nothing against other creditors.',
    whyItMatters: 'Security registers, charge dates and ranking are data a BA must capture for collateral and recovery systems.',
    embassy: { IN: 'Charges on company assets are registered with the Registrar of Companies; security interests are also registered with CERSAI.' },
  },
];
