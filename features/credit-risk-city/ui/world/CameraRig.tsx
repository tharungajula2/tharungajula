'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import type { CameraGoal } from './layout';

interface ControlsLike {
  target: Vector3;
  update(): void;
  addEventListener(type: string, fn: () => void): void;
  removeEventListener(type: string, fn: () => void): void;
}

interface Flight {
  start: number;
  duration: number;
  p0: Vector3;
  t0: Vector3;
  p1: Vector3;
  t1: Vector3;
}

const MAX_TARGET = 80;

/** Eases the camera to a goal (~800 ms, instant with reduced motion). Any drag cancels the flight. */
export default function CameraRig({ goal, reducedMotion }: { goal: CameraGoal; reducedMotion: boolean }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as unknown as ControlsLike | null;
  const invalidate = useThree((s) => s.invalidate);
  const flight = useRef<Flight | null>(null);

  useEffect(() => {
    if (!controls) return;
    const cancel = () => {
      flight.current = null;
    };
    const clamp = () => {
      const t = controls.target;
      const len = Math.hypot(t.x, t.z);
      if (len > MAX_TARGET) t.set((t.x * MAX_TARGET) / len, t.y, (t.z * MAX_TARGET) / len);
      if (t.y < 0) t.y = 0;
      if (t.y > 12) t.y = 12;
    };
    controls.addEventListener('start', cancel);
    controls.addEventListener('change', clamp);
    return () => {
      controls.removeEventListener('start', cancel);
      controls.removeEventListener('change', clamp);
    };
  }, [controls]);

  useEffect(() => {
    if (!controls) return;
    flight.current = {
      start: performance.now(),
      duration: reducedMotion ? 0 : 800,
      p0: camera.position.clone(),
      t0: controls.target.clone(),
      p1: new Vector3(...goal.position),
      t1: new Vector3(...goal.target),
    };
    invalidate();
  }, [goal, controls, camera, invalidate, reducedMotion]);

  useFrame(() => {
    const f = flight.current;
    if (!f || !controls) return;
    const t = f.duration === 0 ? 1 : Math.min(1, (performance.now() - f.start) / f.duration);
    const e = 1 - Math.pow(1 - t, 3);
    camera.position.lerpVectors(f.p0, f.p1, e);
    controls.target.lerpVectors(f.t0, f.t1, e);
    controls.update();
    if (t < 1) invalidate();
    else flight.current = null;
  });

  return null;
}
