'use client';

import { Html } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import type { District } from '../../content/types';
import type { Exhibit } from '../../exhibits';
import type { ExhibitOutput } from '../../exhibits/types';
import type { CameraGoal } from '../world/layout';
import { palette } from '../world/palette';
import { ScenePiece, specWidth } from './Kit';
import type { KitColours } from './tones';

export const EXHIBIT_SPACING = 30;
const GAP = 1.2;

export function exhibitGoal(i: number): CameraGoal {
  const x = i * EXHIBIT_SPACING;
  return { position: [x, 6.8, 19], target: [x, 3.2, 0] };
}

export interface InteriorEntry {
  exhibit: Exhibit;
  output: ExhibitOutput;
}

function Stand({ entry, index, active, district, c, onSelect }: { entry: InteriorEntry; index: number; active: boolean; district: District; c: KitColours; onSelect(i: number): void }) {
  const k = palette(district.colour, false);
  const pieces = entry.output.scene;
  const widths = pieces.map(specWidth);
  const total = widths.reduce((s, w) => s + w, 0) + GAP * (pieces.length - 1);
  const xs = widths.map((w, i) => -total / 2 + widths.slice(0, i).reduce((s, x) => s + x, 0) + GAP * i + w / 2);
  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(index);
  };
  return (
    <group position={[index * EXHIBIT_SPACING, 0, 0]}>
      <mesh position={[0, 0.12, 0]} onClick={click}>
        <boxGeometry args={[total + 4, 0.25, 9]} />
        <meshStandardMaterial color={active ? k.light : '#eef0ec'} roughness={0.95} />
      </mesh>
      {active && (
        <mesh position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[total / 2 + 1.6, total / 2 + 2, 4, 1, Math.PI / 4]} />
          <meshBasicMaterial color={c.accent} />
        </mesh>
      )}
      <mesh position={[0, 4.6, -4.4]} onClick={click}>
        <boxGeometry args={[total + 4, 9.2, 0.3]} />
        <meshStandardMaterial color={active ? '#fbfaf7' : '#f0f1ee'} roughness={1} />
      </mesh>
      <mesh position={[0, 9.35, -4.3]}>
        <boxGeometry args={[total + 4, 0.3, 0.5]} />
        <meshStandardMaterial color={k.main} />
      </mesh>
      <Html position={[0, 8.6, -4.1]} center zIndexRange={[16, 0]} style={{ pointerEvents: 'none' }}>
        <div className={'whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold shadow-sm ' + (active ? 'bg-ink text-surface' : 'bg-surface-raised/95 text-ink')}>
          {index + 1}. {entry.exhibit.title}
        </div>
      </Html>
      <group position={[0, 0.25, 0]}>
        {pieces.map((p, i) => (
          <group key={i} position={[xs[i], 0, 0]}>
            <ScenePiece spec={p} c={c} labels={active} />
          </group>
        ))}
      </group>
    </group>
  );
}

function Lamp({ x }: { x: number }) {
  return (
    <group position={[x, 0, 5.5]}>
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 4.4, 8]} />
        <meshStandardMaterial color="#6f7580" />
      </mesh>
      <mesh position={[0, 4.5, 0]}>
        <sphereGeometry args={[0.3, 12, 10]} />
        <meshStandardMaterial color="#fff4d6" emissive="#fff0c2" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

export default function Interior({ district, entries, active, colours, onSelect }: { district: District; entries: InteriorEntry[]; active: number; colours: KitColours; onSelect(i: number): void }) {
  const len = (entries.length - 1) * EXHIBIT_SPACING;
  const k = palette(district.colour, false);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[len / 2, -0.01, 0]}>
        <planeGeometry args={[len + 120, 90]} />
        <meshStandardMaterial color="#e6ebdf" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[len / 2, 0.02, 8]}>
        <planeGeometry args={[len + 60, 5]} />
        <meshStandardMaterial color="#d8d3ca" roughness={1} />
      </mesh>
      <mesh position={[-EXHIBIT_SPACING / 2 - 4, 3, 0]}>
        <boxGeometry args={[0.6, 6, 6]} />
        <meshStandardMaterial color={k.main} />
      </mesh>
      <Html position={[-EXHIBIT_SPACING / 2 - 4, 6.8, 0]} center zIndexRange={[16, 0]} style={{ pointerEvents: 'none' }}>
        <div className="whitespace-nowrap rounded-lg bg-surface-raised/95 px-3 py-1.5 text-sm font-semibold shadow-sm">{district.name}</div>
      </Html>
      {entries.map((e, i) => (
        <Stand key={e.exhibit.id} entry={e} index={i} active={i === active} district={district} c={colours} onSelect={onSelect} />
      ))}
      {entries.slice(0, -1).map((_, i) => <Lamp key={i} x={i * EXHIBIT_SPACING + EXHIBIT_SPACING / 2} />)}
    </group>
  );
}
