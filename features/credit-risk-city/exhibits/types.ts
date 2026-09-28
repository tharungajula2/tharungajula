import type { DistrictId } from '../content/types';

export type Vals = Record<string, number | number[]>;
export type Tone = 'accent' | 'good' | 'warn' | 'bad' | 'muted' | 'ink' | 'gold' | 'stage1' | 'stage2' | 'stage3';
export type Fmt = 'pct' | 'pct2' | 'cr' | 'x' | 'yrs' | 'int' | 'dpd';

export type Control =
  | { kind: 'slider'; id: string; label: string; min: number; max: number; step: number; fmt: Fmt }
  | { kind: 'toggle'; id: string; label: string }
  | { kind: 'action'; id: string; label: string };

export interface Seg {
  value: number;
  tone: Tone;
}
export interface Bar {
  label: string;
  segs: Seg[];
  /** Waterfall bars float from here. */
  base?: number;
  highlight?: boolean;
}
export interface Line {
  value: number;
  label: string;
  tone: Tone;
}

export type SceneSpec =
  | { kind: 'crowd'; total: number; fallen: number[] }
  | { kind: 'bars'; bars: Bar[]; lines?: Line[]; max?: number; caption?: string }
  | { kind: 'doors'; token: 1 | 2 | 3; tokenLabel: string; provision: number; provisionMax: number }
  | { kind: 'gauge'; value: number; max: number; zones: { to: number; tone: Tone }[]; label: string }
  | { kind: 'tank'; limit: number; drawn: number; ead: number; maxLimit: number }
  | { kind: 'chain'; nodes: { label: string; tone: Tone; raised?: boolean }[]; broken?: number };

// Small builders so exhibit definitions stay readable.
export const slider = (id: string, label: string, min: number, max: number, step: number, f: Fmt): Control => ({ kind: 'slider', id, label, min, max, step, fmt: f });
export const toggle = (id: string, label: string): Control => ({ kind: 'toggle', id, label });
export const action = (id: string, label: string): Control => ({ kind: 'action', id, label });
export const ro = (label: string, value: string, tone?: Tone) => ({ label, value, tone });
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const on = (v: Vals, k: string) => num(v, k) === 1;
export function gauge(value: number, max: number, zones: { to: number; tone: Tone }[], label: string): SceneSpec {
  return { kind: 'gauge', value: Math.max(0, Math.min(Number.isFinite(value) ? value : max, max)), max, zones, label };
}
export function bars(list: { label: string; segs: { value: number; tone: Tone }[]; base?: number; highlight?: boolean }[], lines?: Line[], max?: number, caption?: string): SceneSpec {
  return { kind: 'bars', bars: list.map((b) => ({ ...b, segs: b.segs.map((g) => ({ ...g, value: Math.max(0, Number.isFinite(g.value) ? g.value : 0) })) })), lines, max, caption };
}
export const bar = (label: string, value: number, tone: Tone, highlight = false) => ({ label, segs: [{ value, tone }], highlight });
export function chain(nodes: { label: string; tone: Tone; raised?: boolean }[], broken?: number): SceneSpec {
  return { kind: 'chain', nodes, broken };
}

export interface ExhibitOutput {
  readouts: { label: string; value: string; tone?: Tone }[];
  insight: string;
  scene: SceneSpec[];
}

export interface Exhibit {
  id: string;
  conceptId: string;
  district: DistrictId;
  title: string;
  /** What to try, in one line. */
  prompt: string;
  controls: Control[];
  initial: Vals;
  act?(v: Vals, actionId: string): Vals;
  model(v: Vals): ExhibitOutput;
}

export const num = (v: Vals, k: string): number => {
  const x = v[k];
  return typeof x === 'number' ? x : 0;
};
export const list = (v: Vals, k: string): number[] => {
  const x = v[k];
  return Array.isArray(x) ? x : [];
};

export const fmt = (x: number, f: Fmt): string => {
  if (!Number.isFinite(x)) return '—';
  switch (f) {
    case 'pct':
      return `${(x * 100).toFixed(1)}%`;
    case 'pct2':
      return `${(x * 100).toFixed(2)}%`;
    case 'cr':
      return `₹${x.toFixed(x < 10 ? 2 : 1)} cr`;
    case 'x':
      return `${x.toFixed(2)}×`;
    case 'yrs':
      return `${x} yr${x === 1 ? '' : 's'}`;
    case 'dpd':
      return `${Math.round(x)} days`;
    case 'int':
      return `${Math.round(x)}`;
  }
};
