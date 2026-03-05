"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PresentationControls, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

// The rotating geometric core
function CoreGeometry() {
    const meshRef = useRef<THREE.Mesh>(null);

    // Continuous abstract rotation
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float
            speed={2} // Animation speed
            rotationIntensity={0.5} // XYZ rotation intensity
            floatIntensity={1} // Up/down float intensity
        >
            <mesh ref={meshRef}>
                <Icosahedron args={[2, 1]}>
                    <meshStandardMaterial
                        color="#22d3ee" // cyan-400
                        emissive="#22d3ee"
                        emissiveIntensity={0.5}
                        wireframe={true}
                        transparent={true}
                        opacity={0.8}
                    />
                </Icosahedron>
            </mesh>
        </Float>
    );
}

export function AiCore() {
    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />

                {/* Interactive wrapper allowing user to drag/spin the core slightly */}
                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                >
                    <CoreGeometry />
                </PresentationControls>
            </Canvas>
        </div>
    );
}
