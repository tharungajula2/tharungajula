'use client';

import { AdaptiveDpr, ContactShadows, OrbitControls, Sky } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { contentPack } from '../../content';
import { useWorld } from '../../state/world';
import type { DistrictId } from '../../content/types';
import type { ConceptProgress } from '../../engine/learning/mastery';
import { conceptState, districtState } from '../../engine/learning/mastery';
import CameraRig from './CameraRig';
import District, { type WorldColours } from './District';
import { FOV, focusGoal, OVERVIEW, overviewFor } from './layout';
import { BorrowerVan, EngineLayer, Ground, Trees } from './Scenery';
import { TagOverlay, TagProjector } from './tags';
import { Instruments, LivingVans } from './Living';
import type { Readings } from '../../living/bank';

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
  /** The living city bank: vans, instruments, storm. */
  living?: { readings: Readings; running: boolean } | null;
  /** 0..1 per district: landmarks rise out of their fences as this grows (off when absent). */
  built?: Partial<Record<DistrictId, number>>;
}

const orderOf = (id: DistrictId) => contentPack.districts.find((d) => d.id === id)!.order;

export function Scene(props: Omit<WorldProps, 'onBackgroundClick'>) {
  const { concepts, dueByDistrict, focus, labels, engineView, caseDistrict, colours, reducedMotion } = props;
  const size = useThree((s) => s.size);
  const hovered = useWorld((s) => s.hovered);
  const setHovered = useWorld((s) => s.setHovered);
  const aspect = Math.round((size.width / Math.max(1, size.height)) * 10) / 10;
  const goal = useMemo(() => {
    return focus ? focusGoal(orderOf(focus)) : overviewFor(aspect);
  }, [focus, aspect]);
  const storm = !!props.living?.readings.storm;
  const sky = storm ? '#c3c8cf' : colours.background;
  return (
    <>
      <color attach="background" args={[sky]} />
      <fog attach="fog" args={[sky, 260, 620]} />
      <hemisphereLight args={[storm ? '#dfe4ea' : '#ffffff', '#c9d4bb', storm ? 0.8 : 1.25]} />
      <directionalLight position={[70, 110, 50]} intensity={storm ? 0.75 : 1.35} />
      <directionalLight position={[-60, 40, -70]} intensity={0.35} />
      {!storm && <Sky distance={450} sunPosition={[80, 40, 60]} turbidity={6} rayleigh={0.6} mieCoefficient={0.004} />}
      <Ground engineView={engineView} />
      {!engineView && <ContactShadows position={[0, 0.05, 0]} scale={240} resolution={1024} blur={2.4} opacity={0.4} far={24} frames={1} />}
      <Trees />
      {engineView && <EngineLayer accent={colours.accent} />}
      {contentPack.districts.map((d) => {
        const cs = contentPack.concepts.filter((c) => c.district === d.id).map((c) => ({ concept: c, state: conceptState(c, concepts) }));
        const f = cs.filter((x) => x.concept.layer === 'F');
        const state = districtState((f.length ? f : cs).map((x) => x.state));
        const built = props.built ? props.built[d.id] ?? 0 : undefined;
        return (
          <District
            key={d.id}
            district={d}
            state={state}
            concepts={cs}
            due={dueByDistrict[d.id] ?? 0}
            highlighted={focus === d.id}
            showLabel={labels}
            compact={size.width < 640 && hovered !== d.id}
            built={built}
            colours={colours}
            onClick={props.onDistrictClick}
            onAnchorClick={props.onAnchorClick}
            onHover={setHovered}
          />
        );
      })}
      {caseDistrict && <BorrowerVan targetOrder={orderOf(caseDistrict)} accent={colours.accent} />}
      {props.living && (
        <LivingVans
          vans={[...props.living.readings.vans.filter((v) => v.status !== 'current'), ...props.living.readings.vans.filter((v) => v.status === 'current').slice(0, 6)]}
          running={props.living.running}
        />
      )}
      {props.living && <Instruments r={props.living.readings} accent={colours.accent} />}
      <OrbitControls
        makeDefault
        enableDamping={false}
        minDistance={20}
        maxDistance={380}
        minPolarAngle={0.2}
        maxPolarAngle={1.18}
        screenSpacePanning={false}
      />
      <CameraRig goal={goal} reducedMotion={reducedMotion} />
      <TagProjector />
    </>
  );
}

export default function World(props: WorldProps) {
  return (
    <div className="relative h-full w-full">
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      camera={{ position: OVERVIEW.position, fov: FOV, near: 1, far: 900 }}
      onPointerMissed={props.onBackgroundClick}
      aria-label="Credit Risk City: 3D map of 18 districts"
    >
      <AdaptiveDpr pixelated />
      <Scene {...props} />
    </Canvas>
    <TagOverlay />
    </div>
  );
}
