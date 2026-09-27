import { Color } from 'three';

export const LOCKED = '#c9ccd1';

export interface Palette {
  main: string;
  dark: string;
  light: string;
  trim: string;
  glass: string;
  metal: string;
}

const shade = (hex: string, l: number): string => {
  const c = new Color(hex);
  const hsl = { h: 0, s: 0, l: 0 };
  c.getHSL(hsl);
  c.setHSL(hsl.h, Math.min(1, hsl.s * 1.15), Math.max(0, Math.min(1, hsl.l + l)));
  return `#${c.getHexString()}`;
};

export function palette(colour: string, locked: boolean): Palette {
  const base = locked ? LOCKED : colour;
  return {
    main: base,
    dark: shade(base, -0.28),
    light: shade(base, 0.08),
    trim: locked ? '#b4b8be' : '#f7f5f0',
    glass: locked ? '#d5d8dc' : '#bfe3ee',
    metal: locked ? '#a9adb3' : '#8a8f98',
  };
}
