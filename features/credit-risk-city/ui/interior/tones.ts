import type { Tone } from '../../exhibits/types';

export interface KitColours {
  accent: string;
  ink: string;
}

export function toneColour(t: Tone, c: KitColours): string {
  switch (t) {
    case 'accent': return c.accent;
    case 'ink': return c.ink;
    case 'good': return '#7fbf8f';
    case 'warn': return '#f0b85a';
    case 'bad': return '#e07a7a';
    case 'muted': return '#c9ccd1';
    case 'gold': return '#e8c872';
    case 'stage1': return '#a9d8b8';
    case 'stage2': return '#f2d48f';
    case 'stage3': return '#e9a3a3';
  }
}
