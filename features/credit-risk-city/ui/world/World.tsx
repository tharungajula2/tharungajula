'use client';

import { AdaptiveDpr, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { Vector3 } from 'three';
import { contentPack } from '../../content';
import type { DistrictId } from '../../content/types';
import type { ConceptProgress } from '../../engine/learning/mastery';
import { conceptState, districtState } from '../../engine/learning/mastery';
import CameraRig from './CameraRig';
import District, { type WorldColours } from './District';
import { FOV, focusGoal, OVERVIEW, overviewFor, placement } from './layout';
import { BorrowerVan, EngineLayer, Ground, Trees } from './Scenery';
import Interior, { exhibitGoal, type InteriorEntry } from '../interior/Interior';

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
  interior?: { district: DistrictId; entries: InteriorEntry[]; active: number; onSelect(i: number): void } | null;
}

const orderOf = (id: DistrictId) => contentPack.districts.find((d) => d.id === id)!.order;
const _vec = new Vector3();
const labelElementsMap = new Map<string, HTMLDivElement>();

function LabelProjector({
  concepts,
  show,
}: {
  concepts: Record<string, ConceptProgress>;
  show: boolean;
}) {
  const { camera, size } = useThree();

  useFrame(() => {
    const halfW = size.width / 2;
    const halfH = size.height / 2;

    for (const d of contentPack.districts) {
      const el = labelElementsMap.get(d.id);
      if (!el) continue;
      if (!show) {
        el.style.display = 'none';
        continue;
      }
      const p = placement(d.order);
      const cs = contentPack.concepts.filter((c) => c.district === d.id).map((c) => ({ concept: c, state: conceptState(c, concepts) }));
      const f = cs.filter((x) => x.concept.layer === 'F');
      const state = districtState((f.length ? f : cs).map((x) => x.state));
      const locked = state === 'locked';
      const isStudio = d.id === 'studio';
      const h = isStudio ? 8 : locked ? 7 : 16;

      _vec.set(p.x, h, p.z);
      _vec.project(camera);

      if (_vec.z >= 1) {
        el.style.display = 'none';
      } else {
        const x = _vec.x * halfW + halfW;
        const y = -_vec.y * halfH + halfH;
        el.style.display = 'block';
        el.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      }
    }
  });

  return null;
}

export function Scene(props: Omit<WorldProps, 'onBackgroundClick'>) {
  // (city view below; the walk-in street replaces it when props.interior is set)
  const { concepts, dueByDistrict, focus, labels, engineView, caseDistrict, colours, reducedMotion } = props;
  const size = useThree((s) => s.size);
  const aspect = Math.round((size.width / Math.max(1, size.height)) * 10) / 10;
  const interior = props.interior ?? null;
  const active = interior?.active ?? -1;
  const goal = useMemo(
    () => (active >= 0 ? exhibitGoal(active) : focus ? focusGoal(orderOf(focus)) : overviewFor(aspect)),
    [active, focus, aspect],
  );
  if (interior) {
    const district = contentPack.districts.find((d) => d.id === interior.district)!;
    return (
      <>
        <color attach="background" args={[colours.background]} />
        <fog attach="fog" args={[colours.background, 70, 150]} />
        <hemisphereLight args={['#ffffff', '#c9d4bb', 1.3]} />
        <directionalLight position={[40, 60, 40]} intensity={1.3} />
        <directionalLight position={[-30, 25, -40]} intensity={0.35} />
        <Interior district={district} entries={interior.entries} active={interior.active} colours={colours} onSelect={interior.onSelect} />
        <OrbitControls makeDefault enableDamping={false} minDistance={6} maxDistance={70} minPolarAngle={0.3} maxPolarAngle={1.45} screenSpacePanning={false} />
        <CameraRig goal={goal} reducedMotion={reducedMotion} maxTarget={1000} />
      </>
    );
  }
  return (
    <>
      <color attach="background" args={[colours.background]} />
      <fog attach="fog" args={[colours.background, 260, 620]} />
      <hemisphereLight args={['#ffffff', '#c9d4bb', 1.25]} />
      <directionalLight position={[70, 110, 50]} intensity={1.35} />
      <directionalLight position={[-60, 40, -70]} intensity={0.35} />
      <Ground engineView={engineView} />
      <Trees />
      {engineView && <EngineLayer accent={colours.accent} />}
      {contentPack.districts.map((d) => {
        const cs = contentPack.concepts.filter((c) => c.district === d.id).map((c) => ({ concept: c, state: conceptState(c, concepts) }));
        const f = cs.filter((x) => x.concept.layer === 'F');
        const state = districtState((f.length ? f : cs).map((x) => x.state));
        return (
          <District
            key={d.id}
            district={d}
            state={state}
            concepts={cs}
            due={dueByDistrict[d.id] ?? 0}
            highlighted={focus === d.id}
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
        maxDistance={380}
        minPolarAngle={0.2}
        maxPolarAngle={1.18}
        screenSpacePanning={false}
      />
      <CameraRig goal={goal} reducedMotion={reducedMotion} />
      <LabelProjector concepts={concepts} show={labels} />
    </>
  );
}

export default function World(props: WorldProps) {
  const showLabels = props.labels && !props.interior;
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

      {/* 2D HTML Pill Labels Overlay - Exact original badge styling */}
      {showLabels && (
        <div className="pointer-events-none absolute inset-0 z-10 select-none overflow-hidden">
          {contentPack.districts.map((d) => {
            const highlighted = props.focus === d.id;
            const cs = contentPack.concepts.filter((c) => c.district === d.id).map((c) => ({ concept: c, state: conceptState(c, props.concepts) }));
            const f = cs.filter((x) => x.concept.layer === 'F');
            const state = districtState((f.length ? f : cs).map((x) => x.state));
            const locked = state === 'locked';
            const due = props.dueByDistrict[d.id] ?? 0;

            return (
              <div
                key={d.id}
                ref={(el) => {
                  if (el) {
                    labelElementsMap.set(d.id, el);
                  } else {
                    labelElementsMap.delete(d.id);
                  }
                }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  display: 'none',
                  willChange: 'transform',
                }}
                className="pointer-events-auto cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  props.onDistrictClick(d.id);
                }}
              >
                <div
                  className={
                    'whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium shadow-sm transition-colors ' +
                    (highlighted ? 'border-ink bg-ink text-surface' : 'border-hairline bg-surface-raised/95 text-ink hover:border-ink')
                  }
                >
                  {d.order}. {d.name}
                  {due > 0 && !locked ? ` · ${due} due` : ''}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
