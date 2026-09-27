import type { Concept } from '../types';

// District 13 · The Port — risk transfer and securitisation.
export const port: Concept[] = [
  {
    id: 'securitisation', district: 'port', layer: 'F', verified: false, anchor: 'port-containers', prerequisites: ['expected-loss'], links: ['tranching'],
    name: 'Securitisation',
    oneLiner: 'Pool loans, sell them to a special-purpose vehicle, and fund it by issuing notes in tranches.',
    explanation:
      'The originator transfers a pool (mortgages, auto loans) to a special-purpose vehicle. The vehicle issues notes; investors are repaid from the pool’s cash flows.\n\nThe originator may free up funding and capital — but only if enough risk genuinely leaves.',
    whyItMatters: 'Securitised loans need flags, pool membership and investor reporting in the data model.',
  },
  {
    id: 'tranching', district: 'port', layer: 'F', verified: false, anchor: 'port-locks', prerequisites: ['securitisation'], links: [],
    name: 'Tranches and the waterfall',
    oneLiner: 'Losses hit the junior tranche first; cash pays the senior tranche first.',
    explanation:
      'Each tranche has an attachment point (where it starts losing) and a detachment point (where it is wiped out). With equity 0–5%, mezzanine 5–15% and senior 15–100%, a 12% pool loss wipes out equity and takes 7 of the mezzanine’s 10 points.\n\nThe waterfall sets the order in which interest and principal are paid.',
    whyItMatters: 'Tranche risk weights and investor reports depend on attachment points and pool performance data.',
  },
  {
    id: 'risk-transfer', district: 'port', layer: 'F', verified: false, anchor: 'port-gangway', prerequisites: ['securitisation', 'rwa-capital-ratio'], links: [],
    name: 'Derecognition vs significant risk transfer',
    oneLiner: 'Removing loans from the accounts and cutting capital are two separate tests.',
    explanation:
      'Accounting derecognition asks whether the risks and rewards (or control) of the loans have passed to someone else.\nRegulatory significant risk transfer (SRT) asks whether enough credit risk has left to justify lower capital.\n\nA deal can pass one test and fail the other.',
    whyItMatters: 'Different flags feed the balance sheet and the capital engine for the same loans.',
  },
  {
    id: 'credit-protection', district: 'port', layer: 'F', verified: false, anchor: 'port-lifebuoy', prerequisites: ['guarantees'], links: ['wrong-way-risk'],
    name: 'Credit protection: CDS and insurance',
    oneLiner: 'Buy protection so someone else pays if the borrower defaults.',
    explanation:
      'In a credit default swap the protection buyer pays a premium; the seller pays out if a credit event hits the reference borrower. Credit insurance and guarantees work similarly.\n\nThe bank swaps borrower risk for protection-seller risk, and must watch for mismatches in maturity, currency and reference obligation.',
    whyItMatters: 'Eligible protection can reduce capital, so eligibility rules and protection data are BA work.',
  },
];
