"use client";

import { TopStatusRail } from "@/components/layout/TopStatusRail";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

// Outreach Components
import { HeroThesis } from "@/components/outreach/HeroThesis";
import { ProfileTracks } from "@/components/outreach/ProfileTracks";
import { AlignmentMatrix } from "@/components/outreach/AlignmentMatrix";
import { ProjectBridge } from "@/components/outreach/ProjectBridge";
import { ProofStack } from "@/components/outreach/ProofStack";
import { OperatingPrinciples } from "@/components/outreach/OperatingPrinciples";
import { ContributionZones } from "@/components/outreach/ContributionZones";
import { SoftCTA } from "@/components/outreach/SoftCTA";

// Content
import { foxoContent } from "@/data/outreach/foxo";

export const dynamic = 'force-dynamic';

export default function Home() {
  const content = foxoContent;

  return (
    <main className="min-h-screen w-full bg-transparent relative overflow-x-hidden pt-16 md:pt-18">
      <TopStatusRail />

      {/* FIXED 3D BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={<div className="flex h-full w-full items-center justify-center font-mono text-xs text-white/20">INIT_SPACE_PROTOCOL...</div>}>
          <Canvas shadows dpr={[1, 2]} camera={{ position: [10, 5, 15], fov: 35 }}>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
            
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={2.5} castShadow />
            <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
            <pointLight position={[0, -5, 5]} intensity={1} color="#22d3ee" />
            
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Canvas>
        </Suspense>
      </div>

      {/* SCROLLABLE OUTREACH CONTENT */}
      <div className="relative z-10 w-full">
        <div id="top">
          <HeroThesis data={content.hero} />
        </div>
        <ProfileTracks data={content.tracks} id="tracks" />
        <div id="mission" className="scroll-mt-20">
          <AlignmentMatrix data={content.alignment} />
        </div>
        <SoftCTA data={content.softCTA} />

      </div>
    </main>

  );
}
