import type { SimRules } from '../../content/types';
import type { BorrowerState, FacilityState } from './types';

export function regulatoryEad(f: FacilityState, rules: SimRules): number {
  if (f.closed) return 0;
  const onBalance = f.stage === 3 ? Math.max(0, f.drawn - f.allowance) : f.drawn;
  return onBalance + rules.ccfRegulatory.value * f.undrawn;
}

export function riskWeight(f: FacilityState, b: BorrowerState, rules: SimRules): number {
  if (f.stage === 3) {
    const provisionShare = f.drawn > 0 ? f.allowance / f.drawn : 1;
    return provisionShare < rules.defaultedProvisionThreshold.value
      ? rules.defaultedRwLowProvision.value
      : rules.defaultedRwHighProvision.value;
  }
  return rules.riskWeights[b.segment].value;
}

export function totalRwa(facilities: FacilityState[], borrowers: BorrowerState[], rules: SimRules): number {
  const byId = new Map(borrowers.map((b) => [b.id, b]));
  return facilities.reduce((sum, f) => {
    const b = byId.get(f.borrowerId);
    if (!b || f.closed) return sum;
    return sum + regulatoryEad(f, rules) * riskWeight(f, b, rules);
  }, 0);
}
