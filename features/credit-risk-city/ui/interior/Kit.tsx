'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group, Mesh } from 'three';

export const KIT_HEIGHT = 7;

/** Eases a mesh's height (and base) towards a target; requests frames only while moving. */
function useEased(ref: React.RefObject<Mesh | Group | null>, target: { h: number; y0: number }, axis: 'scaleY' | 'posX' = 'scaleY') {
  const invalidate = useThree((s) => s.invalidate);
  const cur = useRef<{ h: number; y0: number } | null>(null);
  useFrame((_, dt) => {
    const m = ref.current;
    if (!m) return;
    if (!cur.current) cur.current = { ...target };
    const k = Math.min(1, dt * 7);
    const c = cur.current;
    c.h += (target.h - c.h) * k;
    c.y0 += (target.y0 - c.y0) * k;
    if (axis === 'scaleY') {
      m.scale.y = Math.max(0.0001, c.h);
      m.position.y = c.y0 + c.h / 2;
    } else {
      m.position.x = c.h;
    }
    if (Math.abs(target.h - c.h) > 0.001 || Math.abs(target.y0 - c.y0) > 0.001) invalidate();
  });
}

/** A box whose height eases to its target (bottom stays on y0). */
export function EasedBox({ x, z, h, y0 = 0, w, d, colour, emissive }: { x: number; z: number; h: number; y0?: number; w: number; d: number; colour: string; emissive?: boolean }) {
  const ref = useRef<Mesh>(null);
  useEased(ref, { h, y0 });
  return (
    <mesh ref={ref} position={[x, y0 + h / 2, z]}>
      <boxGeometry args={[w, 1, d]} />
      <meshStandardMaterial color={colour} emissive={emissive ? colour : '#000000'} emissiveIntensity={emissive ? 0.35 : 0} roughness={0.7} />
    </mesh>
  );
}
