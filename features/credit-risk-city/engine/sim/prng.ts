// Seeded PRNG (mulberry32). Pure: the state is carried in the simulation state.

export function nextRandom(state: number): [value: number, nextState: number] {
  const a = (state + 0x6d2b79f5) >>> 0;
  let t = a;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  const value = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  return [value, a];
}

export function seedToState(seed: number): number {
  return (Math.floor(seed) >>> 0) || 1;
}
