// The UI layer owns the clock; the engine only ever receives `today` as a parameter.
export function todayIso(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function newSeed(): number {
  return Math.floor(Math.random() * 2 ** 31) + 1;
}
