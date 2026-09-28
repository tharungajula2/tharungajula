'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { Color, Object3D, type Group, type InstancedMesh, type Mesh } from 'three';
import type { SceneSpec } from '../../exhibits/types';
import { toneColour, type KitColours } from './tones';
import { Tag3D } from '../world/tags';

export const KIT_HEIGHT = 7;

/** Width each scene piece occupies, so an exhibit can lay its pieces out side by side. */
export function specWidth(s: SceneSpec): number {
  switch (s.kind) {
    case 'crowd': return 10;
    case 'bars': return Math.max(4, s.bars.length * 1.9 + 1.5);
    case 'doors': return 12;
    case 'gauge': return 5.2;
    case 'tank': return 5;
    case 'chain': return Math.max(5, s.nodes.length * 3.1);
  }
}

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

function Segment({ x, h, y0, colour, width }: { x: number; h: number; y0: number; colour: string; width: number }) {
  const ref = useRef<Mesh>(null);
  useEased(ref, { h, y0 });
  return (
    <mesh ref={ref} position={[x, y0 + h / 2, 0]}>
      <boxGeometry args={[width, 1, width]} />
      <meshStandardMaterial color={colour} roughness={0.7} />
    </mesh>
  );
}

function Label({ position, text, strong = false, show }: { position: [number, number, number]; text: string; strong?: boolean; show: boolean }) {
  if (!show || !text) return null;
  return <Tag3D position={position} text={text} className={'rounded-md px-1.5 py-0.5 text-[10px] ' + (strong ? 'bg-ink font-semibold text-surface' : 'bg-surface-raised/90 text-ink')} />;
}

function Bars({ spec, c, labels }: { spec: Extract<SceneSpec, { kind: 'bars' }>; c: KitColours; labels: boolean }) {
  const tops = spec.bars.map((b) => (b.base ?? 0) + b.segs.reduce((s, g) => s + g.value, 0));
  const max = spec.max ?? Math.max(1e-9, ...tops, ...(spec.lines ?? []).map((l) => l.value)) * 1.1;
  const scale = KIT_HEIGHT / max;
  const w = 1.2;
  const step = 1.9;
  const x0 = -((spec.bars.length - 1) * step) / 2;
  const span = (spec.bars.length - 1) * step + w + 1;
  return (
    <group>
      {spec.bars.map((b, i) => {
        let y = (b.base ?? 0) * scale;
        const x = x0 + i * step;
        return (
          <group key={i}>
            {b.highlight && (
              <mesh position={[x, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.95, 1.15, 32]} />
                <meshBasicMaterial color={c.ink} />
              </mesh>
            )}
            {b.segs.map((g, j) => {
              const h = Math.max(0, g.value) * scale;
              const el = <Segment key={j} x={x} h={h} y0={y} colour={toneColour(g.tone, c)} width={w} />;
              y += h;
              return el;
            })}
            <Label position={[x, -0.45, 0.8]} text={b.label} show={labels} strong={b.highlight} />
          </group>
        );
      })}
      {(spec.lines ?? []).map((l, i) => (
        <group key={`l${i}`} position={[0, l.value * scale, 0]}>
          <mesh>
            <boxGeometry args={[span, 0.06, 0.06]} />
            <meshBasicMaterial color={toneColour(l.tone, c)} />
          </mesh>
          <Label position={[span / 2 + 0.2, 0, 0]} text={l.label} show={labels} />
        </group>
      ))}
      {spec.caption && <Label position={[0, -1.15, 0.8]} text={spec.caption} show={labels} />}
    </group>
  );
}

const FIG = new Object3D();
function Crowd({ spec, c }: { spec: Extract<SceneSpec, { kind: 'crowd' }>; c: KitColours }) {
  const bodies = useRef<InstancedMesh>(null);
  const heads = useRef<InstancedMesh>(null);
  const progress = useRef<number[]>(Array(spec.total).fill(0));
  const invalidate = useThree((s) => s.invalidate);
  const fallen = useMemo(() => new Set(spec.fallen), [spec.fallen]);
  const ok = useMemo(() => new Color('#9aa7b4'), []);
  const bad = useMemo(() => new Color(toneColour('bad', c)), [c]);
  const tmp = useMemo(() => new Color(), []);
  // Tiered like a stadium: each row further back stands one step higher, so every figure is visible from the street.
  const ROW_UP = 0.62;
  // Rows run from z = 3.2 (front) back to z ≈ −3.3, in front of the backdrop wall at z = −4.25.
  const pos = (i: number) => [((i % 10) - 4.5) * 0.95, 3.2 - Math.floor(i / 10) * 0.72, Math.floor(i / 10) * ROW_UP] as const;
  useLayoutEffect(() => invalidate(), [spec.fallen, invalidate]);
  useFrame((_, dt) => {
    const b = bodies.current;
    const h = heads.current;
    if (!b || !h) return;
    let moving = false;
    for (let i = 0; i < spec.total; i++) {
      const target = fallen.has(i) ? 1 : 0;
      const p = progress.current[i] + (target - progress.current[i]) * Math.min(1, dt * 6);
      progress.current[i] = p;
      if (Math.abs(target - p) > 0.002) moving = true;
      const [x, z, y0] = pos(i);
      // Defaulters stay in their seat, slump (shorter, tilted back) and turn red — visible in any row.
      const a = -p * 0.35;
      const sy = 1 - 0.12 * p;
      FIG.scale.set(1, sy, 1);
      FIG.position.set(x, y0 + 0.45 * sy * Math.cos(a), z + 0.45 * sy * Math.sin(a));
      FIG.rotation.set(a, 0, 0);
      FIG.updateMatrix();
      b.setMatrixAt(i, FIG.matrix);
      FIG.scale.set(1, 1, 1);
      FIG.position.set(x, y0 + 0.05 + 1.0 * sy * Math.cos(a), z + 1.0 * sy * Math.sin(a));
      FIG.updateMatrix();
      h.setMatrixAt(i, FIG.matrix);
      tmp.copy(ok).lerp(bad, p);
      b.setColorAt(i, tmp);
      h.setColorAt(i, tmp);
    }
    b.instanceMatrix.needsUpdate = true;
    h.instanceMatrix.needsUpdate = true;
    if (b.instanceColor) b.instanceColor.needsUpdate = true;
    if (h.instanceColor) h.instanceColor.needsUpdate = true;
    if (moving) invalidate();
  });
  return (
    <group>
      {Array.from({ length: 10 }, (_, r) => (
        <mesh key={r} position={[0, Math.max(0.05, r * 0.62) / 2, 3.2 - r * 0.72]}>
          <boxGeometry args={[9.8, Math.max(0.05, r * 0.62), 0.72]} />
          <meshStandardMaterial color="#dcdfe3" />
        </mesh>
      ))}
      <instancedMesh ref={bodies} args={[undefined, undefined, spec.total]}>
        <cylinderGeometry args={[0.18, 0.24, 0.9, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </instancedMesh>
      <instancedMesh ref={heads} args={[undefined, undefined, spec.total]}>
        <sphereGeometry args={[0.17, 10, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </instancedMesh>
    </group>
  );
}

const DOOR_X = [-3.6, 0, 3.6];
function Doors({ spec, c, labels }: { spec: Extract<SceneSpec, { kind: 'doors' }>; c: KitColours; labels: boolean }) {
  const token = useRef<Group>(null);
  useEased(token, { h: DOOR_X[spec.token - 1], y0: 0 }, 'posX');
  // Log scale: provisions run from pennies to crores, and the jump between stages must be visible.
  const colH = Math.max(0.15, Math.min(1, Math.log10(1 + spec.provision * 20) / Math.log10(1 + spec.provisionMax * 20))) * 5;
  const stageTones = ['stage1', 'stage2', 'stage3'] as const;
  return (
    <group position={[-0.8, 0, 0]}>
      {DOOR_X.map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh position={[0, 2, -0.3]}>
            <boxGeometry args={[2.6, 4, 0.4]} />
            <meshStandardMaterial color={toneColour(stageTones[i], c)} />
          </mesh>
          <mesh position={[0, 1.6, -0.08]}>
            <boxGeometry args={[1.7, 3.2, 0.1]} />
            <meshStandardMaterial color={spec.token === i + 1 ? '#3b3f46' : '#6b7079'} />
          </mesh>
          <Label position={[0, 4.4, 0]} text={`Stage ${i + 1}`} show={labels} strong={spec.token === i + 1} />
        </group>
      ))}
      <group ref={token} position={[DOOR_X[spec.token - 1], 0, 1.6]}>
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.55, 20, 14]} />
          <meshStandardMaterial color={c.accent} emissive={c.accent} emissiveIntensity={0.25} />
        </mesh>
        <Label position={[0, 1.5, 0]} text={spec.tokenLabel} show={labels} strong />
      </group>
      <group position={[6.4, 0, 0]}>
        <Segment x={0} h={colH} y0={0} colour={toneColour('bad', c)} width={0.9} />
        <Label position={[0, -0.45, 0.6]} text="provision (log scale)" show={labels} />
      </group>
    </group>
  );
}

function Gauge({ spec, c, labels }: { spec: Extract<SceneSpec, { kind: 'gauge' }>; c: KitColours; labels: boolean }) {
  const needle = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  const cur = useRef<number | null>(null);
  const angle = Math.PI - (Math.max(0, Math.min(spec.value, spec.max)) / spec.max) * Math.PI;
  useFrame((_, dt) => {
    if (!needle.current) return;
    if (cur.current === null) cur.current = angle;
    cur.current += (angle - cur.current) * Math.min(1, dt * 7);
    needle.current.rotation.z = cur.current;
    if (Math.abs(angle - cur.current) > 0.001) invalidate();
  });
  return (
    <group position={[0, 2.2, 0]}>
      {spec.zones.map((z, i) => {
        const a = i === 0 ? 0 : spec.zones[i - 1].to;
        return (
          <mesh key={i}>
            <ringGeometry args={[1.55, 2.1, 48, 1, Math.PI - (z.to / spec.max) * Math.PI, ((z.to - a) / spec.max) * Math.PI]} />
            <meshBasicMaterial color={toneColour(z.tone, c)} side={2} />
          </mesh>
        );
      })}
      <group ref={needle} rotation={[0, 0, angle]}>
        <mesh position={[0.9, 0, 0.05]}>
          <boxGeometry args={[1.8, 0.12, 0.08]} />
          <meshStandardMaterial color={c.ink} />
        </mesh>
      </group>
      <mesh position={[0, 0, 0.08]}>
        <circleGeometry args={[0.22, 20]} />
        <meshBasicMaterial color={c.ink} />
      </mesh>
      <mesh position={[0, -1.2, -0.1]}>
        <boxGeometry args={[0.3, 2.2, 0.3]} />
        <meshStandardMaterial color="#b4b8be" />
      </mesh>
      <Label position={[0, -0.55, 0.2]} text={spec.label} show={labels} strong />
    </group>
  );
}

function Tank({ spec, c, labels }: { spec: Extract<SceneSpec, { kind: 'tank' }>; c: KitColours; labels: boolean }) {
  const s = KIT_HEIGHT / spec.maxLimit;
  const shell = useRef<Mesh>(null);
  useEased(shell, { h: spec.limit * s, y0: 0 });
  return (
    <group>
      <mesh ref={shell}>
        <cylinderGeometry args={[1.6, 1.6, 1, 32, 1, true]} />
        <meshStandardMaterial color="#bfe3ee" transparent opacity={0.35} side={2} />
      </mesh>
      <group scale={[1.5, 1, 1.5]}>
        <Segment x={0} h={spec.drawn * s} y0={0} colour={c.accent} width={2} />
      </group>
      <EadRing y={spec.ead * s} c={c} />
      <Label position={[0, spec.limit * s + 0.4, 0]} text="limit" show={labels} />
      <Label position={[2.4, spec.ead * s, 0]} text="EAD" show={labels} strong />
    </group>
  );
}

function EadRing({ y, c }: { y: number; c: KitColours }) {
  const ref = useRef<Mesh>(null);
  const invalidate = useThree((s) => s.invalidate);
  const cur = useRef<number | null>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    if (cur.current === null) cur.current = y;
    cur.current += (y - cur.current) * Math.min(1, dt * 7);
    ref.current.position.y = cur.current;
    if (Math.abs(y - cur.current) > 0.001) invalidate();
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.75, 0.09, 8, 40]} />
      <meshStandardMaterial color={toneColour('warn', c)} emissive={toneColour('warn', c)} emissiveIntensity={0.4} />
    </mesh>
  );
}

function ChainNode({ x, colour, raised }: { x: number; colour: string; raised: boolean }) {
  const ref = useRef<Mesh>(null);
  useEased(ref, { h: raised ? 2.6 : 1.4, y0: 0 });
  return (
    <mesh ref={ref} position={[x, 0.7, 0]}>
      <boxGeometry args={[2.2, 1, 1.6]} />
      <meshStandardMaterial color={colour} roughness={0.7} />
    </mesh>
  );
}

function Chain({ spec, c, labels }: { spec: Extract<SceneSpec, { kind: 'chain' }>; c: KitColours; labels: boolean }) {
  const step = 3.1;
  const x0 = -((spec.nodes.length - 1) * step) / 2;
  return (
    <group>
      {spec.nodes.map((n, i) => (
        <group key={i}>
          <ChainNode x={x0 + i * step} colour={toneColour(n.tone, c)} raised={!!n.raised} />
          {i < spec.nodes.length - 1 && (
            <mesh position={[x0 + i * step + step / 2, 0.7, 0]}>
              <boxGeometry args={[step - 2.2, 0.18, 0.18]} />
              <meshStandardMaterial color={spec.broken === i ? toneColour('bad', c) : '#8a8f98'} transparent opacity={spec.broken === i ? 0.35 : 1} />
            </mesh>
          )}
          <Label position={[x0 + i * step, -0.5, 1]} text={n.label} show={labels} strong={!!n.raised} />
        </group>
      ))}
    </group>
  );
}

export function ScenePiece({ spec, c, labels }: { spec: SceneSpec; c: KitColours; labels: boolean }) {
  switch (spec.kind) {
    case 'crowd': return <Crowd spec={spec} c={c} />;
    case 'bars': return <Bars spec={spec} c={c} labels={labels} />;
    case 'doors': return <Doors spec={spec} c={c} labels={labels} />;
    case 'gauge': return <Gauge spec={spec} c={c} labels={labels} />;
    case 'tank': return <Tank spec={spec} c={c} labels={labels} />;
    case 'chain': return <Chain spec={spec} c={c} labels={labels} />;
  }
}
