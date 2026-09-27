import type { Concept } from '../types';

// District 7 · The Observatory — measuring risk: PD, LGD, EAD, expected and unexpected loss.
export const observatory: Concept[] = [
  {
    id: 'pd', district: 'observatory', layer: 'F', verified: false, anchor: 'obs-telescope', prerequisites: [], links: ['default-definition', 'pit-ttc'],
    name: 'Probability of default (PD)',
    oneLiner: 'The chance a borrower defaults within a stated horizon.',
    explanation:
      'Always state the horizon (12 months or lifetime), the default definition, and the population it applies to.\n\nA 2% PD does not mean exactly 2 of every 100 borrowers default; it means that, on average, about 2% of borrowers like this one default within 12 months.',
    whyItMatters: 'Every PD field needs its horizon, definition and as-of date in the data model, or it cannot be used safely.',
  },
  {
    id: 'lgd', district: 'observatory', layer: 'F', verified: false, anchor: 'obs-scale-pan', prerequisites: ['lgd-realised'], links: ['collateral-haircut'],
    name: 'Loss given default (LGD)',
    oneLiner: 'The share of the exposure the bank loses if the borrower defaults.',
    explanation:
      'LGD = 1 − present value of net recoveries ÷ exposure at default.\n\nCollateral, seniority and recovery time drive it. Downturn LGD is higher because collateral values fall and recoveries take longer exactly when defaults rise.',
    whyItMatters: 'LGD models need collateral, cost and recovery-cash-flow data traced from default to closure.',
    misconception: '“Secured means LGD is zero.” Haircuts, costs and time still leave a loss.',
  },
  {
    id: 'ead-ccf', district: 'observatory', layer: 'F', verified: false, anchor: 'obs-meter', prerequisites: ['funded-unfunded'], links: ['amortising-revolving'],
    name: 'Exposure at default (EAD) and CCF',
    oneLiner: 'How much will be owed at the moment of default — not just what is drawn today.',
    explanation:
      'Term loan: the scheduled balance at the time of default (plus unpaid interest).\nRevolving line: drawn + CCF × undrawn, because borrowers draw down as they weaken.\n\nFor accounting ECL the CCF is a behavioural estimate; for standardised capital it is a prescribed percentage.',
    whyItMatters: 'EAD needs limit, drawn, undrawn and product data at the right grain and date.',
  },
  {
    id: 'expected-loss', district: 'observatory', layer: 'F', verified: false, anchor: 'obs-scale', prerequisites: ['pd', 'lgd'], links: ['ifrs9-stages', 'risk-based-pricing'],
    name: 'Expected loss (EL)',
    oneLiner: 'EL = PD × LGD × EAD, with the same horizon and definitions for all three.',
    explanation:
      'PD is the chance, LGD the share lost if it happens, EAD the amount at that moment. Their product is the average loss across many similar loans — not a forecast for any single loan.',
    whyItMatters: 'The same three parameters feed pricing, provisions and capital, so they must be defined consistently.',
  },
  {
    id: 'unexpected-loss', district: 'observatory', layer: 'F', verified: false, anchor: 'obs-storm-cloud', prerequisites: ['expected-loss'], links: ['provisions-vs-capital'],
    name: 'Unexpected loss (UL)',
    oneLiner: 'The loss above the average that a bad year can bring.',
    explanation:
      'Losses vary from year to year around EL. UL is the part above EL at a high confidence level.\n\nEL is priced in and provided for. UL is what capital is for: IRB capital is calibrated to cover losses up to a 99.9% confidence level over one year (a calibration intuition — buffers and Pillar 2 sit on top).',
    whyItMatters: 'It explains why a bank with full provisions still needs capital.',
  },
  {
    id: 'pit-ttc', district: 'observatory', layer: 'F', verified: false, anchor: 'obs-seasons', prerequisites: ['pd'], links: ['forward-looking-scenarios'],
    name: 'Point-in-time vs through-the-cycle PD',
    oneLiner: 'PIT PDs move with the economy; TTC PDs stay stable across the cycle.',
    explanation:
      'Point-in-time (PIT): reflects current and expected conditions, so it rises in a recession.\nThrough-the-cycle (TTC): a long-run average, so it barely moves.\n\nIFRS 9 needs forward-looking PIT estimates; regulatory capital models lean on long-run averages to avoid capital swinging with the cycle.',
    whyItMatters: 'Using one bank’s PD for both purposes without adjustment is a classic modelling error.',
  },
  {
    id: 'lifetime-pd', district: 'observatory', layer: 'F', verified: false, anchor: 'obs-hourglass', prerequisites: ['pd'], links: ['ecl-measurement'],
    name: '12-month vs lifetime PD',
    oneLiner: 'Lifetime PD is the chance of default at any point until the loan matures.',
    explanation:
      'With a constant annual PD h, the chance of surviving t years is (1 − h)^t.\nCumulative PD to year t = 1 − (1 − h)^t.\nMarginal PD in year t = survival to t − 1 minus survival to t.\n\nA 5% annual PD becomes about 14.3% over three years.',
    whyItMatters: 'Stage 2 ECL is built from marginal PDs year by year, so term structures are core ECL data.',
  },
];
