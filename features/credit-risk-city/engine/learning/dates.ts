// ISO calendar dates (YYYY-MM-DD), UTC arithmetic. `today` is always injected by the caller.

export type IsoDate = string;

const toUtc = (d: IsoDate): number => {
  const [y, m, day] = d.split('-').map(Number);
  return Date.UTC(y, m - 1, day);
};

export function addDays(d: IsoDate, n: number): IsoDate {
  const t = new Date(toUtc(d) + n * 86400000);
  return t.toISOString().slice(0, 10);
}

export function daysBetween(from: IsoDate, to: IsoDate): number {
  return Math.round((toUtc(to) - toUtc(from)) / 86400000);
}

export const minDate = (a: IsoDate, b: IsoDate): IsoDate => (a <= b ? a : b);
