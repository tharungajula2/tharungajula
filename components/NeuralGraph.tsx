'use client';

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { neuralData } from '@/data/neuralData';

// Dynamically import the 3D graph to prevent SSR issues
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center w-full h-full bg-black/20">
            <div className="animate-pulse font-mono text-[10px] text-slate-500 tracking-[0.4em] uppercase">
                INIT_NEURAL_MAP...
            </div>
        </div>
    )
});

interface NeuralGraphProps {
    onNodeClick?: (node: any) => void;
}

export function NeuralGraph({ onNodeClick }: NeuralGraphProps) {
    const fgRef = useRef<any>(null);

    useEffect(() => {
        if (fgRef.current) {
            // Physics Tuning: Spread out like a brain
            fgRef.current.d3Force('charge').strength(-150);
            fgRef.current.d3Force('link').distance(40);
        }
    }, []);



    return (
        <div className="w-full h-full fixed inset-0 z-0">
            <ForceGraph3D
                ref={fgRef}
                graphData={neuralData}
                backgroundColor="#000000"
                showNavInfo={false}
                onNodeClick={onNodeClick}
                
                // 1. Ghost-like Connections
                linkColor={() => 'rgba(255, 255, 255, 0.08)'}
                linkWidth={0.3}
                linkResolution={6}
                
                // 2. Glowing Data Pulses
                linkDirectionalParticles={3}
                linkDirectionalParticleWidth={1.5}
                linkDirectionalParticleColor={() => '#00FFFF'} // Pure cyan energy
                linkDirectionalParticleResolution={8}
                linkDirectionalParticleSpeed={0.004}

                // 3. The Glowing Halo Node Override
                nodeThreeObject={(node: any) => {
                    // Define premium neon colors based on group
                    let coreColor = '#ffffff'; 
                    let haloColor = '#ffffff';
                    
                    if (node.group === 0) { // Core
                        coreColor = '#ffffff'; haloColor = '#00FFFF'; 
                    } else if (node.group === 1) { // Analytics (Left Brain)
                        coreColor = '#00FFFF'; haloColor = '#0088ff';
                    } else if (node.group === 2) { // Product OS (Right Brain)
                        coreColor = '#A855F7'; haloColor = '#7c3aed'; // Purple glow
                    } else if (node.group === 3) { // Spine / Foundation
                        coreColor = '#9CA3AF'; haloColor = '#4B5563';
                    }

                    // Create a group to hold both the solid core and the glowing halo
                    const group = new THREE.Group();

                    // A. The Solid Core
                    const coreGeometry = new THREE.SphereGeometry(node.val * 0.3, 16, 16);
                    const coreMaterial = new THREE.MeshBasicMaterial({ color: coreColor });
                    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
                    
                    // B. The Glowing Halo (Additive Blending makes light stack intensely)
                    const haloGeometry = new THREE.SphereGeometry(node.val * 0.7, 16, 16);
                    const haloMaterial = new THREE.MeshBasicMaterial({ 
                        color: haloColor, 
                        transparent: true, 
                        opacity: 0.15,
                        blending: THREE.AdditiveBlending, // This creates the cinematic glow
                        depthWrite: false // Prevents weird clipping issues
                    });
                    const haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);

                    group.add(coreMesh);
                    group.add(haloMesh);

                    return group;
                }}

                enableNodeDrag={true}
                enableNavigationControls={true}
            />
        </div>
    );
}
