export const pct = (x: number | null | undefined, dp = 1): string =>
  x === null || x === undefined ? '—' : `${(x * 100).toFixed(dp)}%`;
export const cr = (x: number | null | undefined, dp = 2): string =>
  x === null || x === undefined ? '—' : `₹${x.toFixed(dp)} cr`;
export const num = (x: number | null | undefined, dp = 2): string =>
  x === null || x === undefined ? '—' : x.toFixed(dp);

/** Deterministic shuffle keyed by a string (no Math.random in render). */
export function seededShuffle<T>(arr: T[], key: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  if (out.length > 1 && out.every((x, i) => x === arr[i])) out.push(out.shift()!);
  return out;
}
