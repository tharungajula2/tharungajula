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
  | { kind: 'tank'; limit: number; drawn: number; ead: number; maxLimit: number };

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
