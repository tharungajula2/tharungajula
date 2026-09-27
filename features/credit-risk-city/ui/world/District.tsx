'use client';

import { Billboard, Text } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import type { Concept, District as DistrictDef } from '../../content/types';
import type { MasteryState } from '../../engine/learning/mastery';
import Landmark from './Landmarks';
import { anchorOffsets, PLOT_SIZE, placement } from './layout';
import { palette } from './palette';

export interface WorldColours {
  accent: string;
  ink: string;
}

interface Props {
  district: DistrictDef;
  state: MasteryState;
  concepts: { concept: Concept; state: MasteryState }[];
  due: number;
  highlighted: boolean;
  showLabel: boolean;
  colours: WorldColours;
  onClick(id: DistrictDef['id']): void;
  onAnchorClick(conceptId: string): void;
}

const GOLD = '#e8c872';

function anchorColour(state: MasteryState, main: string, accent: string): string {
  if (state === 'locked') return '#b8bcc2';
  if (state === 'new') return '#ffffff';
  if (state === 'learning') return main;
  if (state === 'mastered') return GOLD;
  return accent;
}

const setCursor = (c: string) => {
  if (typeof document !== 'undefined') document.body.style.cursor = c;
};

export default function District({ district, state, concepts, due, highlighted, showLabel, colours, onClick, onAnchorClick }: Props) {
  const p = placement(district.order);
  const locked = state === 'locked';
  const k = { ...palette(district.colour, locked), locked };
  const mastered = state === 'mastered';
  const isStudio = district.id === 'studio';
  const anchors = anchorOffsets(concepts.length);

  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onClick(district.id);
  };

  return (
    <group position={[p.x, 0, p.z]} rotation={[0, p.rotY, 0]}>
      <group
        onClick={click}
        onPointerOver={(e) => { e.stopPropagation(); setCursor('pointer'); }}
        onPointerOut={() => setCursor('auto')}
      >
        {!isStudio && (
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[PLOT_SIZE, 0.4, PLOT_SIZE]} />
            <meshStandardMaterial color={k.light} roughness={0.95} flatShading />
          </mesh>
        )}
        <group scale={[1, locked ? 0.3 : 1, 1]} position={[0, isStudio ? 0 : 0.4, 0]}>
          <Landmark id={district.id} k={k} />
        </group>
      </group>

      {highlighted && (
        <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[isStudio ? 9.6 : 11.2, isStudio ? 10.6 : 12.2, 48]} />
          <meshBasicMaterial color={colours.accent} transparent opacity={0.9} />
        </mesh>
      )}

      {mastered && (
        <group>
          <mesh position={[0, 12, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 24, 12]} />
            <meshBasicMaterial color={GOLD} transparent opacity={0.35} />
          </mesh>
          <mesh position={[0, 24.5, 0]}>
            <sphereGeometry args={[1, 16, 12]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0, 0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[8.2, 9, 48]} />
            <meshBasicMaterial color={GOLD} transparent opacity={0.55} />
          </mesh>
        </group>
      )}

      {concepts.map(({ concept, state: cs }, i) => (
        <group
          key={concept.id}
          position={[anchors[i].x, isStudio ? 0.5 : 0.4, isStudio ? 6.6 : anchors[i].z]}
          onClick={(e) => { e.stopPropagation(); onAnchorClick(concept.id); }}
          onPointerOver={(e) => { e.stopPropagation(); setCursor('pointer'); }}
          onPointerOut={() => setCursor('auto')}
        >
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.55, 0.75, 1, 8]} />
            <meshStandardMaterial color={k.trim} flatShading />
          </mesh>
          <mesh position={[0, 1.6, 0]}>
            <icosahedronGeometry args={[0.65, 0]} />
            <meshStandardMaterial
              color={anchorColour(cs, k.main, colours.accent)}
              emissive={cs === 'mastered' ? GOLD : '#000000'}
              emissiveIntensity={cs === 'mastered' ? 0.6 : 0}
              flatShading
            />
          </mesh>
        </group>
      ))}

      {due > 0 && !locked && (
        <mesh position={[0, isStudio ? 9 : 18, 0]} onClick={click}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial color={colours.accent} emissive={colours.accent} emissiveIntensity={0.5} />
        </mesh>
      )}

      {showLabel && (
        <Billboard position={[0, isStudio ? 8 : locked ? 7 : 16, 0]}>
          <Text
            fontSize={1.2}
            color={highlighted ? '#ffffff' : colours.ink}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.08}
            outlineColor={highlighted ? colours.ink : '#ffffff'}
          >
            {`${district.order}. ${district.name}${due > 0 && !locked ? ` · ${due} due` : ''}`}
          </Text>
        </Billboard>
      )}
    </group>
  );
}
