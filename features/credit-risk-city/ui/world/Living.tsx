'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group, Mesh } from 'three';
import { contentPack } from '../../content';
import type { DistrictId } from '../../content/types';
import type { Readings, VanStatus } from '../../living/bank';
import { EasedBox } from '../interior/Kit';
import { placement, ringAngle, ROAD_RADIUS, STUDIO_ORDER } from './layout';

const orderOf = (id: DistrictId) => contentPack.districts.find((d) => d.id === id)!.order;
const STATUS_COLOUR: Record<VanStatus, string> = { current: '#2a9db5', late: '#f0b85a', stage2: '#e8964a', defaulted: '#e05a5a' };
const SPEED: Record<VanStatus, number> = { current: 0.1, late: 0.055, stage2: 0.045, defaulted: 0 };

interface VanMotion {
  angle: number;
  radius: number;
}

/** The city bank's loans as vans on the ring road. Performing loans circulate; defaulted loans are towed to Recovery Docks. */
export function LivingVans({ vans, running }: { vans: Readings['vans']; running: boolean }) {
  const refs = useRef(new Map<string, Group>());
  const motion = useRef(new Map<string, VanMotion>());
  const invalidate = useThree((s) => s.invalidate);
  const docks = ringAngle(orderOf('recovery'));
  const branch = ringAngle(orderOf('branch'));
  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    let parked = 0;
    vans.forEach((v, i) => {
      const g = refs.current.get(v.id);
      if (!g) return;
      let m = motion.current.get(v.id);
      if (!m) {
        m = { angle: v.fresh ? branch : ringAngle(1) + (i / Math.max(1, vans.length)) * Math.PI * 2, radius: ROAD_RADIUS + (i % 2 ? 1.2 : -1.2) };
        motion.current.set(v.id, m);
      }
      if (v.status === 'defaulted') {
        // Tow to the docks: park in a row on the outer lane in front of Recovery Docks.
        const slot = docks - 0.05 + (parked % 6) * 0.03;
        parked += 1;
        let diff = slot - m.angle;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        m.angle += Math.sign(diff) * Math.min(Math.abs(diff), dt * 0.6);
        m.radius += (ROAD_RADIUS + 3.4 - m.radius) * Math.min(1, dt * 2);
      } else if (running) {
        m.angle += SPEED[v.status] * dt;
        const lane = ROAD_RADIUS + (i % 2 ? 1.2 : -1.2);
        m.radius += (lane - m.radius) * Math.min(1, dt * 2);
      }
      g.position.set(m.radius * Math.sin(m.angle), 0.55, -m.radius * Math.cos(m.angle));
      g.rotation.set(0, -m.angle + Math.PI, 0);
    });
    if (running || vans.some((v) => v.status === 'defaulted')) invalidate();
  });
  return (
    <group>
      {vans.map((v) => (
        <group
          key={v.id}
          ref={(g) => {
            if (g) refs.current.set(v.id, g);
            else refs.current.delete(v.id);
          }}
        >
          <mesh position={[0, 0.9, 0]}>
            <boxGeometry args={[3.1, 1.7, 1.7]} />
            <meshStandardMaterial color={STATUS_COLOUR[v.status]} flatShading />
          </mesh>
          <mesh position={[1.75, 0.7, 0]}>
            <boxGeometry args={[1, 1.3, 1.55]} />
            <meshStandardMaterial color="#6b7079" flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** A group placed on a district's plot, in its local frame (front faces the city centre). */
function OnPlot({ id, children }: { id: DistrictId; children: React.ReactNode }) {
  const p = placement(orderOf(id));
  return <group position={[p.x, 0.4, p.z]} rotation={[0, p.rotY, 0]}>{children}</group>;
}

function Beacon({ colour }: { colour: string }) {
  return (
    <mesh position={[0, 16.9, -1]}>
      <sphereGeometry args={[0.9, 18, 14]} />
      <meshStandardMaterial color={colour} emissive={colour} emissiveIntensity={0.9} />
    </mesh>
  );
}

function DockCrane({ working }: { working: boolean }) {
  const arm = useRef<Group>(null);
  const invalidate = useThree((s) => s.invalidate);
  useFrame((_, dt) => {
    if (!arm.current || !working) return;
    arm.current.rotation.y += Math.min(dt, 0.05) * 0.8;
    invalidate();
  });
  return (
    <group position={[6.9, 0, 0]}>
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[0.5, 8, 0.5]} />
        <meshStandardMaterial color={working ? '#e8964a' : '#9aa0a8'} />
      </mesh>
      <group ref={arm} position={[0, 8, 0]}>
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[4.6, 0.35, 0.35]} />
          <meshStandardMaterial color={working ? '#e8964a' : '#9aa0a8'} />
        </mesh>
        <mesh position={[4, -1.4, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#6b7079" />
        </mesh>
      </group>
    </group>
  );
}

function Clouds() {
  const ref = useRef<Mesh>(null);
  const spots = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    // Beyond the ground's edge (radius 120) and low: with the camera's polar-angle limit, the line of sight
    // to the city passes well above them at every zoom and orbit angle.
    const r = 145 + (i % 3) * 12;
    return [r * Math.sin(a), 8 + (i % 4) * 2, -r * Math.cos(a), 9 + (i % 3) * 3] as const;
  });
  return (
    <group>
      {spots.map(([x, y, z, s], i) => (
        <mesh key={i} ref={i === 0 ? ref : undefined} position={[x, y, z]} scale={[s * 1.6, s * 0.7, s * 1.2]}>
          <sphereGeometry args={[1, 14, 10]} />
          <meshStandardMaterial color="#7d848f" transparent opacity={0.72} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/** Each landmark's live instrument, driven by the city bank. */
export function Instruments({ r, accent }: { r: Readings; accent: string }) {
  const beacon = r.delinquentShare > 0.08 ? '#e05a5a' : r.delinquentShare > 0.03 ? '#f0b85a' : '#7fbf8f';
  // The wall shows CET1 on a 5%–20% scale so a two-point drop is visible; the red line is the 7% minimum plus buffer.
  const wallH = Math.max(0.1, Math.min(1, (r.cet1Ratio - 0.05) / 0.15)) * 7;
  const lineH = ((0.07 - 0.05) / 0.15) * 7;
  return (
    <group>
      <OnPlot id="mint">
        <EasedBox x={-6.9} z={0} w={1.8} d={1.8} h={Math.max(0.3, Math.min(8, r.gca / 60))} colour="#e8c872" />
      </OnPlot>
      <OnPlot id="watchtower">
        <Beacon colour={beacon} />
      </OnPlot>
      <OnPlot id="recovery">
        <DockCrane working={r.inWorkout > 0} />
      </OnPlot>
      <OnPlot id="vault">
        {(['#a9d8b8', '#f2d48f', '#e9a3a3'] as const).map((c, i) => (
          <EasedBox key={i} x={6.9} z={-2.2 + i * 2.2} w={1.2} d={1.6} h={Math.max(0.08, r.stageShare[i] * 8)} colour={c} />
        ))}
      </OnPlot>
      <OnPlot id="fortress">
        <EasedBox x={7.1} z={0} w={0.8} d={9} h={wallH} colour={accent} />
        <mesh position={[7.1, lineH, 0]}>
          <boxGeometry args={[1.1, 0.14, 9.4]} />
          <meshBasicMaterial color="#e05a5a" />
        </mesh>
      </OnPlot>
      {r.storm && <Clouds />}
    </group>
  );
}

/** A low construction fence around a plot still being "built" by learning (replaces tall scaffolding poles). */
export function Scaffolding({ height = 1.1 }: { height?: number }) {
  const edge = 7.6;
  const posts: [number, number][] = [];
  for (let i = -4; i <= 4; i++) {
    const t = (i / 4) * edge;
    posts.push([t, -edge], [t, edge], [-edge, t], [edge, t]);
  }
  return (
    <group>
      {posts.map(([x, z], i) => (
        <mesh key={i} position={[x, height / 2, z]}>
          <boxGeometry args={[0.14, height, 0.14]} />
          <meshStandardMaterial color="#d9b77e" />
        </mesh>
      ))}
      {([[0, -edge, 0], [0, edge, 0], [-edge, 0, Math.PI / 2], [edge, 0, Math.PI / 2]] as const).map(([x, z, r], i) => (
        <mesh key={`r${i}`} position={[x, height * 0.75, z]} rotation={[0, r, 0]}>
          <boxGeometry args={[edge * 2, 0.1, 0.06]} />
          <meshStandardMaterial color="#e8964a" />
        </mesh>
      ))}
    </group>
  );
}

export const STUDIO = STUDIO_ORDER;
