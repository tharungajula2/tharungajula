'use client';

import { AdaptiveDpr, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { contentPack } from '../../content';
import type { DistrictId } from '../../content/types';
import type { ConceptProgress } from '../../engine/learning/mastery';
import { conceptState, lowestState } from '../../engine/learning/mastery';
import CameraRig from './CameraRig';
import District, { type WorldColours } from './District';
import { focusGoal, OVERVIEW } from './layout';
import { BorrowerVan, EngineLayer, Ground, Trees } from './Scenery';

export interface WorldProps {
  concepts: Record<string, ConceptProgress>;
  dueByDistrict: Record<string, number>;
  focus: DistrictId | null;
  labels: boolean;
  engineView: boolean;
  caseDistrict: DistrictId | null;
  colours: WorldColours & { background: string };
  reducedMotion: boolean;
  onDistrictClick(id: DistrictId): void;
  onAnchorClick(conceptId: string): void;
  onBackgroundClick(): void;
}

const orderOf = (id: DistrictId) => contentPack.districts.find((d) => d.id === id)!.order;

export function Scene(props: Omit<WorldProps, 'onBackgroundClick'>) {
  const { concepts, dueByDistrict, focus, labels, engineView, caseDistrict, colours, reducedMotion } = props;
  const goal = useMemo(() => (focus ? focusGoal(orderOf(focus)) : OVERVIEW), [focus]);
  return (
    <>
      <color attach="background" args={[colours.background]} />
      <fog attach="fog" args={[colours.background, 190, 380]} />
      <hemisphereLight args={['#ffffff', '#c9d4bb', 1.25]} />
      <directionalLight position={[70, 110, 50]} intensity={1.35} />
      <directionalLight position={[-60, 40, -70]} intensity={0.35} />
      <Ground engineView={engineView} />
      <Trees />
      {engineView && <EngineLayer accent={colours.accent} />}
      {contentPack.districts.map((d) => {
        const cs = contentPack.concepts.filter((c) => c.district === d.id).map((c) => ({ concept: c, state: conceptState(c, concepts) }));
        const f = cs.filter((x) => x.concept.layer === 'F');
        const state = lowestState((f.length ? f : cs).map((x) => x.state));
        return (
          <District
            key={d.id}
            district={d}
            state={state}
            concepts={cs}
            due={dueByDistrict[d.id] ?? 0}
            highlighted={focus === d.id}
            showLabel={labels}
            colours={colours}
            onClick={props.onDistrictClick}
            onAnchorClick={props.onAnchorClick}
          />
        );
      })}
      {caseDistrict && <BorrowerVan targetOrder={orderOf(caseDistrict)} accent={colours.accent} />}
      <OrbitControls
        makeDefault
        enableDamping={false}
        minDistance={20}
        maxDistance={175}
        minPolarAngle={0.2}
        maxPolarAngle={1.18}
        screenSpacePanning={false}
      />
      <CameraRig goal={goal} reducedMotion={reducedMotion} />
    </>
  );
}

export default function World(props: WorldProps) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      camera={{ position: OVERVIEW.position, fov: 42, near: 1, far: 700 }}
      onPointerMissed={props.onBackgroundClick}
      aria-label="Credit Risk City: 3D map of 18 districts"
    >
      <AdaptiveDpr pixelated />
      <Scene {...props} />
    </Canvas>
  );
}
