import type { Segment, SimRules } from '../../content/types';

export interface PricingInput {
  ftp: number;
  pd12: number;
  lgd: number;
  segment: Segment;
  opex: number;
  margin: number;
}

export interface PricingBreakdown {
  ftp: number;
  expectedLoss: number;
  capitalCharge: number;
  opex: number;
  margin: number;
  rate: number;
}

/** Rate = FTP + PD×LGD + RW × CET1 target × hurdle + opex + margin (all annual, per unit of EAD). */
export function priceLoan(x: PricingInput, rules: SimRules): PricingBreakdown {
  const expectedLoss = x.pd12 * x.lgd;
  const capitalCharge = rules.riskWeights[x.segment].value * rules.cet1Target.value * rules.hurdleRate.value;
  const rate = x.ftp + expectedLoss + capitalCharge + x.opex + x.margin;
  return { ftp: x.ftp, expectedLoss, capitalCharge, opex: x.opex, margin: x.margin, rate };
}
