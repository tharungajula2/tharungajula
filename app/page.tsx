"use client";

import { Navbar } from "@/components/layout/navbar";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Spacecraft } from "@/components/3d/Spacecraft";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden bg-transparent relative">
      <Navbar />

      {/* Removed 3D AI REACTOR CORE per Creator OS revamp */}

      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="flex h-full w-full items-center justify-center font-mono text-xs text-white/20">INIT_SPACE_PROTOCOL...</div>}>
          <Canvas shadows dpr={[1, 2]} camera={{ position: [10, 5, 15], fov: 35 }}>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
            
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={2.5} castShadow />
            <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
            <pointLight position={[0, -5, 5]} intensity={1} color="#22d3ee" />
            
            <Spacecraft />
            
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Canvas>
        </Suspense>
      </div>

      <div className="flex flex-col items-center justify-center h-full w-full px-4 relative z-10 pointer-events-none text-center">
        <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20 mb-4 pb-2 drop-shadow-2xl">
          Launching in 1, 2, 3
        </h1>
        <p className="font-mono text-[10px] md:text-xs text-cyan-400/50 tracking-[0.5em] uppercase">
          Autonomous Systems // Experimental Lab
        </p>
      </div>

    </main>
  );
}
