// Pure city geometry: where every district, anchor and camera goal sits. No React, no three.

export const RING_RADIUS = 46;
export const ROAD_RADIUS = 33;
export const PLOT_SIZE = 16;
export const GROUND_RADIUS = 120;
export const RING_COUNT = 17; // districts 1–17 on the ring; 18 (BA Studio) at the centre
export const STUDIO_ORDER = 18;

export interface Placement {
  x: number;
  z: number;
  /** Y rotation so the district's front (local +z) faces the city centre. */
  rotY: number;
  /** Angle on the ring (radians), used for travel along the road. */
  angle: number;
}

export function ringAngle(order: number): number {
  return Math.PI + (2 * Math.PI * (order - 1)) / RING_COUNT;
}

export function placement(order: number): Placement {
  if (order === STUDIO_ORDER) return { x: 0, z: 0, rotY: 0, angle: 0 };
  const angle = ringAngle(order);
  const x = RING_RADIUS * Math.sin(angle);
  const z = -RING_RADIUS * Math.cos(angle);
  return { x, z, rotY: Math.atan2(-x, -z), angle };
}

/** Point on the road ring at a given angle. */
export function roadPoint(angle: number, radius = ROAD_RADIUS): { x: number; z: number } {
  return { x: radius * Math.sin(angle), z: -radius * Math.cos(angle) };
}

/** Local (plot-space) positions for n anchor objects, in a row between the landmark and the road. */
export function anchorOffsets(n: number): { x: number; z: number }[] {
  const spacing = 3.2;
  return Array.from({ length: n }, (_, i) => ({ x: (i - (n - 1) / 2) * spacing, z: 5.6 }));
}

/** Rotate a local plot offset into world space. */
export function toWorld(p: Placement, local: { x: number; z: number }): { x: number; z: number } {
  const c = Math.cos(p.rotY);
  const s = Math.sin(p.rotY);
  return { x: p.x + local.x * c + local.z * s, z: p.z - local.x * s + local.z * c };
}

export type Vec3 = [number, number, number];
export interface CameraGoal {
  position: Vec3;
  target: Vec3;
}

export const OVERVIEW: CameraGoal = { position: [0, 117, 105], target: [0, 0, 0] };
export const FOV = 42;

/** Overview that fits the whole ring (plus harbours) in a canvas of the given aspect ratio. */
export function overviewFor(aspect: number): CameraGoal {
  const halfWidth = 66;
  const tanV = Math.tan(((FOV / 2) * Math.PI) / 180);
  const tanH = tanV * Math.max(0.3, aspect);
  const dist = Math.max(halfWidth / tanH, 150) * 1.05;
  const pitch = (48 * Math.PI) / 180;
  return { position: [0, dist * Math.sin(pitch), dist * Math.cos(pitch)], target: [0, 0, 0] };
}

/** Camera stands outside the district, looking inward over its landmark. */
export function focusGoal(order: number): CameraGoal {
  if (order === STUDIO_ORDER) return { position: [0, 26, 34], target: [0, 3, 0] };
  const p = placement(order);
  const len = Math.hypot(p.x, p.z);
  const ux = p.x / len;
  const uz = p.z / len;
  return { position: [p.x + ux * 26, 24, p.z + uz * 26], target: [p.x - ux * 4, 3, p.z - uz * 4] };
}

/** Deterministic scatter of trees in the green belt outside the ring (seeded LCG). */
export function treePositions(count: number, seed = 11): { x: number; z: number; s: number }[] {
  let h = seed >>> 0;
  const rnd = () => {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
    return h / 4294967296;
  };
  const out: { x: number; z: number; s: number }[] = [];
  let guard = 0;
  while (out.length < count && guard++ < count * 20) {
    const a = rnd() * Math.PI * 2;
    const r = RING_RADIUS + 13 + rnd() * (GROUND_RADIUS - RING_RADIUS - 20);
    const x = r * Math.sin(a);
    const z = -r * Math.cos(a);
    const nearWater = [6, 13].some((o) => {
      const w = waterPlacement(o);
      return Math.hypot(w.x - x, w.z - z) < 16;
    });
    if (!nearWater) out.push({ x, z, s: 0.8 + rnd() * 0.7 });
  }
  return out;
}

/** Harbour basins sit on the outer side of Recovery Docks (6) and The Port (13). */
export function waterPlacement(order: number): Placement {
  const p = placement(order);
  const len = Math.hypot(p.x, p.z);
  const k = (RING_RADIUS + 15) / len;
  return { ...p, x: p.x * k, z: p.z * k };
}
