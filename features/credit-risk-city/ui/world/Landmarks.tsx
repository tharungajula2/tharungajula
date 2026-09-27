'use client';

import type { ReactNode } from 'react';
import type { DistrictId } from '../../content/types';
import type { Palette } from './palette';

type V3 = [number, number, number];
interface P { p?: V3; r?: V3; c: string; e?: string; o?: number }

const Mat = ({ c, e, o }: { c: string; e?: string; o?: number }) => (
  <meshStandardMaterial color={c} emissive={e ?? '#000000'} emissiveIntensity={e ? 0.35 : 0} roughness={0.85} metalness={0.02} flatShading transparent={o !== undefined} opacity={o ?? 1} />
);
const Box = ({ s, p, r, c, e, o }: P & { s: V3 }) => (
  <mesh position={p} rotation={r}><boxGeometry args={s} /><Mat c={c} e={e} o={o} /></mesh>
);
const Cyl = ({ rt, rb, h, seg = 16, p, r, c, e, o }: P & { rt: number; rb?: number; h: number; seg?: number }) => (
  <mesh position={p} rotation={r}><cylinderGeometry args={[rt, rb ?? rt, h, seg]} /><Mat c={c} e={e} o={o} /></mesh>
);
const Cone = ({ rad, h, seg = 4, p, r, c, e }: P & { rad: number; h: number; seg?: number }) => (
  <mesh position={p} rotation={r}><coneGeometry args={[rad, h, seg]} /><Mat c={c} e={e} /></mesh>
);
const Sphere = ({ rad, p, c, e, o, half = false }: P & { rad: number; half?: boolean }) => (
  <mesh position={p}><sphereGeometry args={[rad, 20, 12, 0, Math.PI * 2, 0, half ? Math.PI / 2 : Math.PI]} /><Mat c={c} e={e} o={o} /></mesh>
);
/** Triangular roof prism along x. */
const Roof = ({ w, d, h, p, c }: { w: number; d: number; h: number; p: V3; c: string }) => (
  <mesh position={p} rotation={[0, 0, Math.PI / 2]} scale={[h, w, d]}>
    <cylinderGeometry args={[0.58, 0.58, 1, 3]} />
    <Mat c={c} />
  </mesh>
);
const House = ({ p, k, main, roof }: { p: V3; k: number; main: string; roof: string }) => (
  <group position={p} scale={k}>
    <Box s={[2.4, 2, 2.4]} p={[0, 1, 0]} c={main} />
    <Cone rad={2} h={1.4} p={[0, 2.7, 0]} r={[0, Math.PI / 4, 0]} c={roof} />
  </group>
);

type K = Palette & { locked: boolean };

const L: Record<DistrictId, (k: K) => ReactNode> = {
  mint: (k) => (
    <group>
      <Box s={[7, 1.2, 6]} p={[0, 0.6, -1]} c={k.dark} />
      <Box s={[1, 6, 1]} p={[-2.6, 4.2, -1]} c={k.main} />
      <Box s={[1, 6, 1]} p={[2.6, 4.2, -1]} c={k.main} />
      <Box s={[7, 1.2, 1.6]} p={[0, 7.6, -1]} c={k.main} />
      <Cyl rt={0.5} h={3} p={[0, 5.4, -1]} c={k.metal} />
      <Cyl rt={1.8} h={0.9} p={[0, 3.4, -1]} c={k.metal} />
      {[0, 1, 2, 3, 4].map((i) => <Cyl key={i} rt={0.9} h={0.3} seg={20} p={[4.8, 0.3 + i * 0.32, 2.4]} c="#e8c872" />)}
      {[0, 1, 2].map((i) => <Cyl key={i} rt={0.9} h={0.3} seg={20} p={[-4.6, 0.3 + i * 0.32, 2.6]} c="#e8c872" />)}
    </group>
  ),
  market: (k) => (
    <group>
      <House p={[-4.5, 0, 2]} k={1} main={k.light} roof={k.dark} />
      <House p={[-1.6, 0, 3.4]} k={0.85} main={k.trim} roof={k.dark} />
      <House p={[-4.2, 0, -1.6]} k={0.9} main={k.main} roof={k.dark} />
      {[0, 1, 2].map((i) => (
        <group key={i} position={[1 + i * 2.2, 0, 3]}>
          <Box s={[1.8, 1.4, 1.4]} p={[0, 0.7, 0]} c={k.trim} />
          <Box s={[2, 0.2, 1.8]} p={[0, 1.8, 0.2]} r={[0.25, 0, 0]} c={i % 2 ? k.dark : k.main} />
        </group>
      ))}
      <Box s={[2.6, 9, 2.6]} p={[3, 4.5, -3]} c={k.main} />
      <Box s={[2.2, 6, 2.2]} p={[6, 3, -2.4]} c={k.dark} />
      <Box s={[2.7, 0.3, 2.7]} p={[3, 9.1, -3]} c={k.glass} />
    </group>
  ),
  branch: (k) => (
    <group>
      <Box s={[10, 0.6, 7.5]} p={[0, 0.3, -1]} c={k.trim} />
      <Box s={[9, 5, 5.5]} p={[0, 3.1, -2]} c={k.main} />
      {[-3.2, -1.1, 1.1, 3.2].map((x) => <Cyl key={x} rt={0.35} h={4.4} p={[x, 2.8, 1.4]} c={k.trim} />)}
      <Box s={[9.4, 0.5, 2.4]} p={[0, 5.25, 0.6]} c={k.trim} />
      <Roof w={9.6} d={7.5} h={2.2} p={[0, 6.4, -1]} c={k.dark} />
      <Box s={[1.6, 2.4, 0.2]} p={[0, 1.8, 0.8]} c={k.dark} />
    </group>
  ),
  registry: (k) => (
    <group>
      <Box s={[11, 4.2, 6]} p={[0, 2.1, -1.5]} c={k.main} />
      <Roof w={11.4} d={6.4} h={2.6} p={[0, 5.4, -1.5]} c={k.dark} />
      {[-4, -2, 0, 2, 4].map((x) => <Box key={x} s={[1.2, 2.4, 0.2]} p={[x, 2, 1.55]} c={k.trim} />)}
      {[-3, 0, 3].map((x) => <Box key={x} s={[1.6, 1.4, 1]} p={[x, 0.7, 3.4]} c={k.dark} />)}
    </group>
  ),
  watchtower: (k) => (
    <group>
      <Cyl rt={1.4} rb={2.2} h={11} seg={8} p={[0, 5.5, -1]} c={k.main} />
      <Cyl rt={2.8} h={0.6} seg={8} p={[0, 11.3, -1]} c={k.dark} />
      <Cyl rt={2.4} h={2} seg={8} p={[0, 12.6, -1]} c={k.trim} o={0.55} />
      <Cone rad={3} h={2.4} seg={8} p={[0, 14.8, -1]} c={k.dark} />
      <Cyl rt={0.28} rb={0.4} h={3.2} p={[1.8, 12.8, 0.6]} r={[1.1, 0, -0.4]} c={k.metal} />
      <Box s={[3, 2, 0.3]} p={[-4, 1.6, 2.5]} c={k.dark} />
      <Box s={[0.3, 1.2, 0.3]} p={[-4, 0.3, 2.5]} c={k.metal} />
    </group>
  ),
  recovery: (k) => (
    <group>
      <Box s={[5, 3.2, 4]} p={[-3.4, 1.6, -3]} c={k.main} />
      <Roof w={5.2} d={4.2} h={1.2} p={[-3.4, 3.8, -3]} c={k.dark} />
      <Box s={[4, 2.6, 3.4]} p={[3.8, 1.3, 1.5]} c={k.light} />
      <Box s={[0.8, 10, 0.8]} p={[3, 5, -4.5]} c={k.dark} />
      <Box s={[9, 0.6, 0.6]} p={[0.5, 10, -4.5]} c={k.dark} />
      <Box s={[0.1, 3, 0.1]} p={[-3.4, 8.5, -4.5]} c={k.metal} />
      <Box s={[1.6, 1.2, 1.6]} p={[-3.4, 6.5, -4.5]} c="#d98c6a" />
      <Box s={[14, 0.5, 1.2]} p={[0, 0.25, -7.2]} c={k.trim} />
    </group>
  ),
  observatory: (k) => (
    <group>
      <Cyl rt={4} h={4} seg={20} p={[0, 2, -1]} c={k.main} />
      <Sphere rad={4} half p={[0, 4, -1]} c={k.trim} />
      <Box s={[1.1, 4.2, 5]} p={[0, 6, -0.4]} r={[0.35, 0, 0]} c={k.dark} />
      <Cyl rt={0.5} rb={0.7} h={4.4} p={[0, 7.4, 1.4]} r={[-0.8, 0, 0]} c={k.metal} />
      <Box s={[3, 1, 2]} p={[0, 0.5, 3.6]} c={k.dark} />
    </group>
  ),
  modellab: (k) => (
    <group>
      <Box s={[9, 0.6, 7]} p={[0, 0.3, -1]} c={k.dark} />
      <Box s={[8, 6, 6]} p={[0, 3.6, -1]} c={k.glass} o={0.38} />
      <Box s={[8.2, 0.4, 6.2]} p={[0, 6.8, -1]} c={k.main} />
      <Sphere rad={1.3} p={[-1.8, 2.4, -1]} c={k.main} />
      <mesh position={[1.9, 2.8, -1]} rotation={[0.6, 0.4, 0]}><torusGeometry args={[1.2, 0.35, 10, 24]} /><Mat c={k.dark} /></mesh>
      <Box s={[6, 3, 0.3]} p={[0, 3.2, -3.8]} c={k.trim} />
      <mesh position={[0, 3.2, -3.6]} rotation={[0, 0, 0.6]}><boxGeometry args={[4.6, 0.18, 0.1]} /><Mat c={k.dark} /></mesh>
    </group>
  ),
  trading: (k) => (
    <group>
      {[0, 1, 2, 3].map((i) => <Cyl key={i} rt={6 - i * 1.3} h={0.6} seg={24} p={[0, 0.3 + i * 0.6, -0.5]} c={i % 2 ? k.main : k.light} />)}
      <Cyl rt={1.6} h={0.4} seg={24} p={[0, 2.6, -0.5]} c={k.dark} />
      <Box s={[9, 2.4, 0.5]} p={[0, 5.2, -5.4]} c={k.dark} />
      <Box s={[8.4, 0.5, 0.2]} p={[0, 5.6, -5.1]} c="#8fd19e" />
      <Box s={[8.4, 0.5, 0.2]} p={[0, 4.8, -5.1]} c="#e98f8f" />
      <Box s={[0.4, 3, 0.4]} p={[-4, 2.5, -5.4]} c={k.metal} />
      <Box s={[0.4, 3, 0.4]} p={[4, 2.5, -5.4]} c={k.metal} />
    </group>
  ),
  vault: (k) => (
    <group>
      <Box s={[11, 6.4, 6]} p={[0, 3.2, -2]} c={k.main} />
      <Box s={[11.6, 0.8, 6.6]} p={[0, 6.8, -2]} c={k.dark} />
      {([['#a9d8b8', -3.6], ['#f2d48f', 0], ['#e9a3a3', 3.6]] as const).map(([col, x]) => (
        <group key={x} position={[x, 2.8, 1.05]}>
          <Cyl rt={1.45} h={0.3} seg={24} r={[Math.PI / 2, 0, 0]} c={k.locked ? k.metal : col} />
          <Cyl rt={0.35} h={0.5} r={[Math.PI / 2, 0, 0]} p={[0, 0, 0.2]} c={k.metal} />
        </group>
      ))}
      <Box s={[6, 0.4, 2.6]} p={[0, 0.2, 2.8]} c={k.trim} />
    </group>
  ),
  fortress: (k) => (
    <group>
      <Box s={[11, 3, 0.9]} p={[0, 1.5, 3.5]} c={k.main} />
      <Box s={[11, 3, 0.9]} p={[0, 1.5, -5.5]} c={k.main} />
      <Box s={[0.9, 3, 9]} p={[-5.5, 1.5, -1]} c={k.main} />
      <Box s={[0.9, 3, 9]} p={[5.5, 1.5, -1]} c={k.main} />
      {[[-5.5, 3.5], [5.5, 3.5], [-5.5, -5.5], [5.5, -5.5]].map(([x, z]) => (
        <group key={`${x}${z}`}>
          <Cyl rt={1.3} h={4.6} seg={10} p={[x, 2.3, z]} c={k.light} />
          <Cone rad={1.6} h={2} seg={10} p={[x, 5.6, z]} c={k.dark} />
        </group>
      ))}
      <Box s={[4, 6, 4]} p={[0, 3, -1]} c={k.dark} />
      <Box s={[0.1, 2.4, 0.1]} p={[0, 7.2, -1]} c={k.metal} />
      <Box s={[1.4, 0.8, 0.05]} p={[0.7, 7.9, -1]} c={k.trim} />
    </group>
  ),
  storm: (k) => (
    <group>
      <Box s={[6, 3.4, 4.5]} p={[-2, 1.7, -1.5]} c={k.main} />
      <Sphere rad={1.9} half p={[-2, 3.4, -1.5]} c={k.trim} />
      <Box s={[0.4, 10, 0.4]} p={[3.5, 5, -2]} c={k.metal} />
      {[0, 1, 2].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]} position={[3.5, 10, -2]}>
          <Box s={[1.6, 0.12, 0.12]} p={[0.8, 0, 0]} c={k.metal} />
          <Sphere rad={0.35} p={[1.6, 0, 0]} c={k.dark} />
        </group>
      ))}
      <Box s={[0.9, 0.3, 0.3]} p={[3.5, 8.4, -1.6]} c={k.dark} />
      <Cyl rt={1.4} h={0.3} seg={20} r={[Math.PI / 2, 0, 0]} p={[2.5, 1.6, 2.4]} c={k.trim} />
    </group>
  ),
  port: (k) => (
    <group>
      <Box s={[14, 0.6, 3]} p={[0, 0.3, -5.8]} c={k.trim} />
      {[[-4, '#e98f8f'], [-2, '#8fb8e9'], [0, k.main], [2, '#f2d48f'], [4, k.dark]].map(([x, col], i) => (
        <group key={i}>
          <Box s={[1.8, 1.3, 3.4]} p={[x as number, 0.65, -1]} c={k.locked ? k.main : (col as string)} />
          {i % 2 === 0 && <Box s={[1.8, 1.3, 3.4]} p={[x as number, 1.95, -1]} c={k.locked ? k.dark : (col as string)} />}
        </group>
      ))}
      <Cyl rt={0.9} rb={1.2} h={6} seg={10} p={[5.6, 3, 3.2]} c={k.trim} />
      <Cyl rt={0.8} h={1} seg={10} p={[5.6, 6.5, 3.2]} c="#f2d48f" e={k.locked ? undefined : '#f2d48f'} />
    </group>
  ),
  reporting: (k) => (
    <group>
      <Box s={[4.4, 13, 4.4]} p={[0, 6.5, -1]} c={k.main} />
      <Box s={[5, 0.6, 5]} p={[0, 13.3, -1]} c={k.dark} />
      <Cone rad={3.3} h={4} p={[0, 15.6, -1]} r={[0, Math.PI / 4, 0]} c={k.dark} />
      <Cyl rt={1.5} h={0.2} seg={24} r={[Math.PI / 2, 0, 0]} p={[0, 10.6, 1.25]} c={k.trim} />
      <Box s={[0.12, 1.1, 0.1]} p={[0, 10.9, 1.4]} c={k.dark} />
      <Box s={[0.8, 0.12, 0.1]} p={[0.35, 10.6, 1.4]} c={k.dark} />
      {[3, 5.5, 8].map((y) => <Box key={y} s={[4.5, 0.25, 4.5]} p={[0, y, -1]} c={k.light} />)}
    </group>
  ),
  engineroom: (k) => (
    <group>
      <Cyl rt={4.4} h={0.8} seg={8} p={[0, 0.4, -1]} c={k.dark} />
      <Cyl rt={3.2} h={0.2} seg={8} p={[0, 0.9, -1]} c={k.metal} />
      {[-2, -1, 0, 1, 2].map((x) => <Box key={x} s={[0.2, 0.1, 5.4]} p={[x, 1.02, -1]} c={k.dark} />)}
      <Cyl rt={0.7} h={6} p={[-4.6, 3, -4]} c={k.main} />
      <Cyl rt={0.55} h={4.5} p={[4.6, 2.25, -4]} c={k.main} />
      <mesh position={[0, 1.5, 3.5]} rotation={[0, 0, 0]}><torusGeometry args={[2.2, 0.35, 8, 20, Math.PI]} /><Mat c={k.metal} /></mesh>
    </group>
  ),
  townhall: (k) => (
    <group>
      {[0, 1, 2].map((i) => <Box key={i} s={[11 - i, 0.4, 3 - i * 0.6]} p={[0, 0.2 + i * 0.4, 2.2 - i * 0.3]} c={k.trim} />)}
      <Box s={[10, 5, 6]} p={[0, 3.3, -2]} c={k.main} />
      {[-3.6, -1.2, 1.2, 3.6].map((x) => <Cyl key={x} rt={0.4} h={4.6} p={[x, 3.4, 1.4]} c={k.trim} />)}
      <Roof w={10.4} d={6.4} h={2} p={[0, 6.8, -1.6]} c={k.dark} />
      <Cyl rt={1.8} h={1.4} seg={16} p={[0, 8.2, -2]} c={k.light} />
      <Sphere rad={1.8} half p={[0, 8.9, -2]} c={k.dark} />
    </group>
  ),
  embassy: (k) => (
    <group>
      {([['#f3b27a', '#ffffff', '#8fc48f'], ['#8fa8d9', '#ffffff', '#d98f8f'], ['#8fa8d9', '#f2d48f', '#8fa8d9'], ['#d98f8f', '#ffffff', '#8fa8d9']] as const).map((flag, i) => (
        <group key={i} position={[-5.1 + i * 3.4, 0, -1]}>
          <Box s={[2.8, 3.4 + (i % 2) * 0.8, 3.6]} p={[0, 1.7 + (i % 2) * 0.4, 0]} c={i % 2 ? k.main : k.light} />
          <Box s={[3, 0.3, 3.8]} p={[0, 3.5 + (i % 2) * 0.8, 0]} c={k.dark} />
          <Box s={[0.12, 3, 0.12]} p={[0, 5.3 + (i % 2) * 0.8, 1.6]} c={k.metal} />
          {flag.map((col, j) => <Box key={j} s={[1.4, 0.28, 0.06]} p={[0.72, 6.5 + (i % 2) * 0.8 - j * 0.28, 1.6]} c={k.locked ? k.trim : col} />)}
        </group>
      ))}
    </group>
  ),
  studio: (k) => (
    <group>
      <Cyl rt={9} h={0.5} seg={32} p={[0, 0.25, 0]} c={k.trim} />
      <Box s={[8, 3, 6]} p={[0, 2, -2.2]} c={k.main} />
      <Box s={[8.2, 1.2, 6.2]} p={[0, 4.1, -2.2]} c={k.glass} o={0.6} />
      <Box s={[8.4, 0.5, 6.4]} p={[0, 4.95, -2.2]} c={k.dark} />
      <Box s={[5, 3, 0.3]} p={[-1.6, 2.4, 3.6]} c={k.trim} />
      {[0, 1, 2].map((i) => <Box key={i} s={[1.1, 0.8, 0.1]} p={[-3.1 + i * 1.5, 2.8, 3.8]} c={['#f2d48f', '#a9d8b8', '#8fb8e9'][i]} />)}
      <mesh position={[-1.6, 2.2, 3.8]} rotation={[0, 0, 0.2]}><boxGeometry args={[4, 0.06, 0.05]} /><Mat c="#d98f8f" /></mesh>
      <Box s={[2.6, 1, 1.4]} p={[3.4, 1, 3]} c={k.dark} />
    </group>
  ),
};

export default function Landmark({ id, k }: { id: DistrictId; k: K }) {
  return <>{L[id](k)}</>;
}
