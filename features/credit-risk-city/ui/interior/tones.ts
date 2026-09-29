export type Tone = 'accent' | 'ink' | 'good' | 'warn' | 'bad' | 'muted' | 'gold' | 'stage1' | 'stage2' | 'stage3';

export interface KitColours {
  accent: string;
  ink: string;
}

export function toneColour(t: Tone, c: KitColours): string {
  switch (t) {
    case 'accent': return c.accent;
    case 'ink': return '#5b6270'; // softened for 3D: pure ink dominated every stand
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
