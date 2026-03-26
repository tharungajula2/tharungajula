"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";

export function Spacecraft() {
    const groupRef = useRef<THREE.Group>(null);
    const engineRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        // Gentle tilt and floating
        groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
        groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={groupRef} scale={0.8} rotation={[0, -Math.PI / 2, Math.PI / 2]}>
                {/* MAIN HULL */}
                <mesh castShadow receiveShadow>
                    <cylinderGeometry args={[0.4, 0.6, 4, 8]} />
                    <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
                </mesh>

                {/* COCKPIT */}
                <mesh position={[0, 1.8, 0]} castShadow>
                    <sphereGeometry args={[0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial 
                        color="#22d3ee" 
                        transparent 
                        opacity={0.6} 
                        roughness={0}
                        metalness={1}
                        emissive="#22d3ee"
                        emissiveIntensity={0.5}
                    />
                </mesh>

                {/* LEFT WING */}
                <mesh position={[-1, -0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
                    <boxGeometry args={[1.5, 0.1, 1]} />
                    <meshStandardMaterial color="#334155" metalness={0.9} />
                </mesh>

                {/* RIGHT WING */}
                <mesh position={[1, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <boxGeometry args={[1.5, 0.1, 1]} />
                    <meshStandardMaterial color="#334155" metalness={0.9} />
                </mesh>

                {/* TOP FIN */}
                <mesh position={[0, -0.5, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                    <boxGeometry args={[0.1, 1, 0.8]} />
                    <meshStandardMaterial color="#334155" metalness={0.9} />
                </mesh>

                {/* ENGINE CONE - REAR */}
                <mesh position={[0, -2.2, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.3, 0.6, 8]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>

                {/* THRUSTER GLOW */}
                <mesh position={[0, -2.5, 0]} ref={engineRef}>
                    <sphereGeometry args={[0.25, 8, 8]} />
                    <meshBasicMaterial color="#0ea5e9" />
                    <pointLight color="#0ea5e9" intensity={2} distance={5} />
                </mesh>
                
                {/* SECONDARY ENGINE GLOW (INNER) */}
                <mesh position={[0, -2.4, 0]}>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>
            </group>
        </Float>
    );
}
