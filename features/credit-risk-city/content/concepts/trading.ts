import type { Concept } from '../types';

// District 9 · Trading Floor — counterparty credit risk.
export const trading: Concept[] = [
  {
    id: 'counterparty-exposure', district: 'trading', layer: 'F', verified: false, anchor: 'trading-seesaw', prerequisites: ['obligor-facility'], links: ['netting-collateral'],
    name: 'Counterparty exposure',
    oneLiner: 'A derivative’s credit exposure is what it would cost to replace it — not its notional.',
    explanation:
      'A swap with ₹100 crore notional may be worth +₹2 crore to the bank today; that positive value is what is lost if the counterparty defaults.\n\nThe value moves with markets, so exposure is uncertain and can flip between the two sides — risk runs both ways.',
    whyItMatters: 'Trade, market-value and counterparty data must be joined correctly to see the real exposure.',
    misconception: '“Exposure = notional.” Notional sets the size of payments; exposure is the positive replacement value.',
  },
  {
    id: 'netting-collateral', district: 'trading', layer: 'F', verified: false, anchor: 'trading-scales', prerequisites: ['counterparty-exposure'], links: ['collateral-haircut'],
    name: 'Netting and margin',
    oneLiner: 'A legally enforceable netting agreement lets positive and negative trades cancel; margin covers what is left.',
    explanation:
      'Without netting, every positive trade is exposure. Under a master netting agreement, exposure is the net positive value of all trades with that counterparty.\n\nVariation margin covers today’s net value; initial margin covers how far it could move before the position is closed out.',
    whyItMatters: 'Netting-set and collateral-agreement data decide whether exposure is ₹13 crore or ₹2 crore.',
  },
  {
    id: 'pfe-saccr', district: 'trading', layer: 'F', verified: false, anchor: 'trading-fan', prerequisites: ['counterparty-exposure'], links: ['ead-ccf'],
    name: 'Potential future exposure and SA-CCR',
    oneLiner: 'Today’s value is not enough: exposure can grow before the counterparty defaults.',
    explanation:
      'Potential future exposure (PFE) is a high-percentile estimate of how large exposure could become over the trade’s life.\n\nThe Basel standardised approach (SA-CCR) sets EAD = 1.4 × (replacement cost + PFE), with PFE from supervisory add-ons by asset class.',
    whyItMatters: 'Counterparty EAD engines need trade attributes (asset class, maturity, direction) mapped exactly.',
  },
  {
    id: 'wrong-way-risk', district: 'trading', layer: 'F', verified: false, anchor: 'trading-crossed-arrows', prerequisites: ['pfe-saccr'], links: ['concentration'],
    name: 'Wrong-way risk',
    oneLiner: 'When exposure to a counterparty rises exactly as that counterparty gets weaker.',
    explanation:
      'Example: buying protection on a bank from that same bank’s close affiliate, or a commodity hedge with a producer whose fortunes track the commodity.\n\nExposure and default probability are then correlated, so standard models understate the risk.',
    whyItMatters: 'Wrong-way trades need flags, specific treatment and limits.',
  },
  {
    id: 'cva', district: 'trading', layer: 'F', verified: false, anchor: 'trading-price-tag', prerequisites: ['counterparty-exposure', 'expected-loss'], links: [],
    name: 'Credit valuation adjustment (CVA)',
    oneLiner: 'The market price of the counterparty’s default risk, deducted from the value of the trades.',
    explanation:
      'CVA ≈ expected exposure × PD × LGD over the trade’s life, priced with market inputs such as credit spreads.\n\nCVA moves with the counterparty’s spread, so it can generate losses without any default — which is why Basel has a separate CVA capital charge.',
    whyItMatters: 'CVA desks, capital and accounting all need the same exposure and spread data.',
  },
];
