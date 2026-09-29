import { boardsFor, type Board } from '../../content/lessons/boards';
import type { DistrictId } from '../../content/types';
import { exhibitsFor, type Exhibit } from '../../exhibits';
import { contentPack } from '../../content';
import type { Exhibit as Ex } from '../../exhibits';
import type { CameraGoal } from '../world/layout';
import { palette } from '../world/palette';
import { BOARD_W } from './Board';
import { specWidth } from './Kit';

// The walk-in street: the district's boards first (the gallery), then its machines.

export type Station = { kind: 'board'; board: Board; index: number; width: number } | { kind: 'machine'; exhibit: Exhibit; index: number; width: number };

const GAP = 8;

/** Width of a machine stand from its layout (initial settings, so the street does not shift while you play). */
export function standWidth(e: Ex): number {
  const sc = e.model(e.initial).scene;
  return sc.reduce((a, x) => a + specWidth(x), 0) + 1.2 * (sc.length - 1) + 4;
}

/** Shared by the board and the camera so both use the same cached drawing. */
export function boardProps(d: DistrictId, index: number) {
  const district = contentPack.districts.find((x) => x.id === d)!;
  return { key: `${d}:${index}`, colour: palette(district.colour, false).light, label: `${district.name} · ${index === 0 ? 'the big idea' : `board ${index}`}` };
}

/** Camera in front of a board: close enough to read, far enough to see all of it. */
export function boardGoal(x: number, height: number, aspect = 1.6): CameraGoal {
  const tan = Math.tan((21 * Math.PI) / 180);
  const ty = 1.2 + height / 2 + 0.5;
  const z = Math.max(10, (height / 2 + 1.1) / tan, (BOARD_W / 2 + 1) / (tan * Math.max(0.5, aspect))) * 1.05;
  return { position: [x, ty + 0.6, z], target: [x, ty, 0] };
}

export function stationsFor(d: DistrictId): Station[] {
  const boards: Station[] = boardsFor(d).map((board, i) => ({ kind: 'board', board, index: i, width: BOARD_W + 2 }));
  const machines: Station[] = exhibitsFor(d).map((exhibit, i) => ({ kind: 'machine', exhibit, index: i, width: standWidth(exhibit) }));
  return [...boards, ...machines];
}

/** Centre x of each station, spaced by their own widths. */
export function stationXs(list: Station[]): number[] {
  const xs: number[] = [];
  let cursor = 0;
  list.forEach((s, i) => {
    if (i === 0) {
      xs.push(0);
      cursor = s.width / 2;
    } else {
      xs.push(cursor + GAP + s.width / 2);
      cursor += GAP + s.width;
    }
  });
  return xs;
}

