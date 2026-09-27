import type { CollateralState, FacilityState } from './types';

/** Recoverable value (after haircut and value index) allocated to each facility. */
export function allocatedValues(
  collateral: CollateralState[],
  facilities: FacilityState[],
  cvi: number,
  ccfAccounting: number,
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const f of facilities) out[f.id] = 0;
  for (const c of collateral) {
    const net = c.value * cvi * (1 - c.haircut);
    const own = facilities.filter((f) => f.borrowerId === c.borrowerId && !f.closed);
    if (c.allocation) {
      for (const [fid, share] of Object.entries(c.allocation)) {
        if (fid in out) out[fid] += net * share;
      }
      continue;
    }
    const ead = (f: FacilityState) => f.drawn + ccfAccounting * f.undrawn;
    const total = own.reduce((s, f) => s + ead(f), 0);
    if (total <= 0) continue;
    for (const f of own) out[f.id] += (net * ead(f)) / total;
  }
  return out;
}
