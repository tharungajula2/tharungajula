'use client';

import type { ThreeEvent } from '@react-three/fiber';
import type { District } from '../../content/types';
import type { ExhibitOutput } from '../../exhibits/types';
import type { CameraGoal } from '../world/layout';
import { palette } from '../world/palette';
import type { Exhibit } from '../../exhibits';
import { ScenePiece, specWidth } from './Kit';
import { BoardStand } from './Board';
import { boardProps, stationsFor, stationXs } from './stations';
import type { KitColours } from './tones';
import { Tag3D } from '../world/tags';

export { standWidth } from './stations';

const GAP = 1.2;

/** Camera in front of a stand, far enough back that the whole stand fits the canvas width. */
export function exhibitGoal(x: number, width: number, aspect = 1.6): CameraGoal {
  const tanH = Math.tan((21 * Math.PI) / 180) * Math.max(0.5, aspect);
  // At least 22 back so the backdrop and its title clear the HUD; further for wide stands.
  const z = Math.max(22, (width / 2 + 1.5) / tanH);
  return { position: [x, 5 + z * 0.14, z], target: [x, 4.2, 0] };
}

export interface InteriorEntry {
  exhibit: Exhibit;
  output: ExhibitOutput;
}

function Stand({ entry, index, x, active, district, c, onSelect }: { entry: InteriorEntry; index: number; x: number; active: boolean; district: District; c: KitColours; onSelect(i: number): void }) {
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
    <group position={[x, 0, 0]}>
      <mesh position={[0, 0.12, 0]} onClick={click}>
        <boxGeometry args={[total + 4, 0.25, 9]} />
        <meshStandardMaterial color={active ? k.light : '#eef0ec'} roughness={0.95} />
      </mesh>
      {active && (
        <mesh position={[0, 0.27, 4.35]}>
          <boxGeometry args={[total + 4, 0.06, 0.3]} />
          <meshBasicMaterial color={c.accent} />
        </mesh>
      )}
      <mesh position={[0, 4.6, -4.4]} onClick={click}>
        <boxGeometry args={[total + 4, 9.2, 0.3]} />
        <meshBasicMaterial color={active ? '#f6f5f1' : '#ecebe6'} />
      </mesh>
      <mesh position={[0, 9.35, -4.3]}>
        <boxGeometry args={[total + 4, 0.3, 0.5]} />
        <meshStandardMaterial color={k.main} />
      </mesh>
      <Tag3D position={[0, 8.6, -4.1]} text={`${index + 1}. ${entry.exhibit.title}`} className={'rounded-full px-3 py-1 text-xs font-semibold shadow-sm ' + (active ? 'bg-ink text-surface' : 'bg-surface-raised/95 text-ink')} />
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
  const stations = stationsFor(district.id);
  const xs = stationXs(stations);
  const len = xs[xs.length - 1] ?? 0;
  const firstHalf = stations.length ? stations[0].width / 2 : 10;
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
      <mesh position={[-firstHalf - 6, 3, 0]}>
        <boxGeometry args={[0.6, 6, 6]} />
        <meshStandardMaterial color={k.main} />
      </mesh>
      <Tag3D position={[-firstHalf - 6, 6.8, 0]} text={district.name} className="rounded-lg bg-surface-raised/95 px-3 py-1.5 text-sm font-semibold shadow-sm" />
      {stations.map((st, i) => {
        if (st.kind === 'board') {
          const bp = boardProps(district.id, st.index);
          return (
            <group key={bp.key} position={[xs[i], 0, 0]}>
              <BoardStand boardKey={bp.key} board={st.board} colour={bp.colour} label={bp.label} active={i === active} onClick={() => onSelect(i)} />
            </group>
          );
        }
        const entry = entries[st.index];
        return entry ? <Stand key={st.exhibit.id} entry={entry} index={i} x={xs[i]} active={i === active} district={district} c={colours} onSelect={onSelect} /> : null;
      })}
      {xs.slice(0, -1).map((x, i) => <Lamp key={i} x={(x + xs[i + 1]) / 2} />)}
    </group>
  );
}
