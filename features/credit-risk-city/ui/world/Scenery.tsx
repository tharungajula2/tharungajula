'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import { Object3D, type InstancedMesh, type Group } from 'three';
import { contentPack } from '../../content';
import { GROUND_RADIUS, placement, ringAngle, roadPoint, ROAD_RADIUS, RING_RADIUS, STUDIO_ORDER, treePositions, waterPlacement } from './layout';

const TREES = treePositions(140);

export function Ground({ engineView }: { engineView: boolean }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[GROUND_RADIUS, 96]} />
        <meshStandardMaterial color="#e4ebd9" roughness={1} transparent opacity={engineView ? 0.28 : 1} depthWrite={!engineView} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[ROAD_RADIUS - 2.4, ROAD_RADIUS + 2.4, 128]} />
        <meshStandardMaterial color="#d8d3ca" roughness={1} transparent opacity={engineView ? 0.4 : 1} />
      </mesh>
      {contentPack.districts
        .filter((d) => d.order !== STUDIO_ORDER)
        .map((d) => {
          const p = placement(d.order);
          const mid = roadPoint(p.angle, (ROAD_RADIUS + RING_RADIUS - 8) / 2 + 1);
          return (
            <mesh key={d.id} position={[mid.x, 0.02, mid.z]} rotation={[-Math.PI / 2, 0, -p.angle]}>
              <planeGeometry args={[3, RING_RADIUS - 8 - ROAD_RADIUS + 1]} />
              <meshStandardMaterial color="#d8d3ca" roughness={1} />
            </mesh>
          );
        })}
      <mesh position={[0, 0.02, (9 + ROAD_RADIUS - 2) / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, ROAD_RADIUS - 2 - 9]} />
        <meshStandardMaterial color="#d8d3ca" roughness={1} />
      </mesh>
      {[6, 13].map((o) => {
        const w = waterPlacement(o);
        return (
          <mesh key={o} position={[w.x, 0.05, w.z]} rotation={[-Math.PI / 2, 0, -w.rotY]}>
            <planeGeometry args={[24, 13]} />
            <meshStandardMaterial color="#a8d3e6" roughness={0.3} metalness={0.1} />
          </mesh>
        );
      })}
    </group>
  );
}

export function Trees() {
  const trunks = useRef<InstancedMesh>(null);
  const crowns = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    const o = new Object3D();
    TREES.forEach((t, i) => {
      o.position.set(t.x, 0.9 * t.s, t.z);
      o.scale.set(t.s, t.s, t.s);
      o.updateMatrix();
      trunks.current?.setMatrixAt(i, o.matrix);
      o.position.set(t.x, 3 * t.s, t.z);
      o.updateMatrix();
      crowns.current?.setMatrixAt(i, o.matrix);
    });
    if (trunks.current) trunks.current.instanceMatrix.needsUpdate = true;
    if (crowns.current) crowns.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <group>
      <instancedMesh ref={trunks} args={[undefined, undefined, TREES.length]}>
        <cylinderGeometry args={[0.25, 0.35, 1.8, 6]} />
        <meshStandardMaterial color="#b49a7a" flatShading />
      </instancedMesh>
      <instancedMesh ref={crowns} args={[undefined, undefined, TREES.length]}>
        <coneGeometry args={[1.5, 3.6, 7]} />
        <meshStandardMaterial color="#a9c99a" flatShading />
      </instancedMesh>
    </group>
  );
}

/** The Engine Room: data pipes beneath the whole city, all flowing to the Reporting Tower. */
export function EngineLayer({ accent }: { accent: string }) {
  const depth = -7;
  const reporting = contentPack.districts.find((d) => d.id === 'reporting')!;
  return (
    <group>
      <mesh position={[0, depth, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[24, 0.6, 8, 96]} />
        <meshStandardMaterial color="#8a8f98" />
      </mesh>
      {contentPack.districts.filter((d) => d.order !== STUDIO_ORDER).map((d) => {
        const p = placement(d.order);
        const inner = roadPoint(p.angle, 24);
        const len = RING_RADIUS - 24;
        const mid = roadPoint(p.angle, 24 + len / 2);
        const toReport = d.id === reporting.id;
        return (
          <group key={d.id}>
            <mesh position={[p.x, depth / 2, p.z]}>
              <cylinderGeometry args={[0.35, 0.35, -depth, 8]} />
              <meshStandardMaterial color={toReport ? accent : '#8a8f98'} emissive={toReport ? accent : '#000000'} emissiveIntensity={0.4} />
            </mesh>
            <mesh position={[mid.x, depth, mid.z]} rotation={[Math.PI / 2, 0, -p.angle]}>
              <cylinderGeometry args={[0.35, 0.35, len, 8]} />
              <meshStandardMaterial color={toReport ? accent : '#8a8f98'} />
            </mesh>
            <mesh position={[inner.x, depth, inner.z]}>
              <sphereGeometry args={[0.8, 10, 8]} />
              <meshStandardMaterial color="#6f7580" />
            </mesh>
          </group>
        );
      })}
      <mesh position={[0, depth - 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[GROUND_RADIUS * 0.7, 64]} />
        <meshStandardMaterial color="#3b3f46" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/** The case borrower's van drives around the ring road to the district of the current case step. */
export function BorrowerVan({ targetOrder, accent }: { targetOrder: number; accent: string }) {
  const ref = useRef<Group>(null);
  const angle = useRef<number | null>(null);
  const invalidate = useThree((s) => s.invalidate);
  const goal = targetOrder === STUDIO_ORDER ? ringAngle(1) : ringAngle(targetOrder);
  useFrame((_, dtRaw) => {
    const g = ref.current;
    if (!g) return;
    const dt = Math.min(dtRaw, 0.05);
    if (angle.current === null) angle.current = ringAngle(1);
    const diff = goal - angle.current;
    const done = Math.abs(diff) < 0.002;
    angle.current = done ? goal : angle.current + Math.sign(diff) * Math.min(Math.abs(diff), dt * 1.6);
    const pt = roadPoint(angle.current, ROAD_RADIUS + 1.2);
    g.position.set(pt.x, 0.6, pt.z);
    g.rotation.set(0, -angle.current + (diff >= 0 ? Math.PI : 0), 0);
    if (!done) invalidate();
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[3.4, 1.8, 1.8]} />
        <meshStandardMaterial color={accent} flatShading />
      </mesh>
      <mesh position={[1.9, 0.7, 0]}>
        <boxGeometry args={[1.2, 1.4, 1.7]} />
        <meshStandardMaterial color="#f7f5f0" flatShading />
      </mesh>
      {[[-1, 0.9], [-1, -0.9], [1.4, 0.9], [1.4, -0.9]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.05, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.3, 10]} />
          <meshStandardMaterial color="#3b3f46" />
        </mesh>
      ))}
    </group>
  );
}
