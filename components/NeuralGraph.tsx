'use client';

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { neuralData } from '@/data/neuralData';

// Dynamically import the 2D graph to prevent SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center w-full h-full bg-black/20">
            <div className="animate-pulse font-mono text-[10px] text-slate-500 tracking-[0.4em] uppercase">
                INIT_NEURAL_MAP_2D...
            </div>
        </div>
    )
});

// Helper for strict clinical palette
const getNodeColor = (node: any) => {
    switch (node.group) {
        case 0: return '#FFFFFF'; // Core: Pure White
        case 1: return '#00FFFF'; // Analytics: Electric Cyan
        case 2: return '#10B981'; // Product OS: Sharp Emerald
        case 3: return '#64748B'; // Systems Foundation: Muted Slate
        case 4: return '#A855F7'; // Adaptive Craft: Sharp Purple
        default: return '#FFFFFF';
    }
};

interface NeuralGraphProps {
    onNodeClick?: (node: any) => void;
}

export function NeuralGraph({ onNodeClick }: NeuralGraphProps) {
    const fgRef = useRef<any>(null);
    const [zoomLevel, setZoomLevel] = React.useState(1);

    useEffect(() => {
        if (fgRef.current) {
            // Physics Tuning: Spread-out military blueprint layout
            fgRef.current.d3Force('charge').strength(-250);
            fgRef.current.d3Force('link').distance(80);
        }
    }, []);

    return (
        <div className="w-full h-full fixed inset-0 z-0 bg-black">
            <ForceGraph2D
                ref={fgRef}
                graphData={neuralData}
                backgroundColor="#000000"
                onNodeClick={onNodeClick}
                onZoom={(transform) => setZoomLevel(transform.k)}
                
                // 1. Precise Connections
                linkColor={() => 'rgba(255, 255, 255, 0.1)'}
                linkWidth={1 / zoomLevel}
                
                // 2. Cluster-Coded Data Flow
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={2}
                linkDirectionalParticleColor={(link: any) => {
                    // Particle color matches the source node
                    if (link.source.group === 1) return '#00ffff';
                    if (link.source.group === 2) return '#10b981';
                    if (link.source.group === 3) return '#64748b';
                    if (link.source.group === 4) return '#a855f7';
                    return '#ffffff';
                }}
                linkDirectionalParticleSpeed={0.006}

                // 3. BRUTE-FORCE 2D CANVAS RENDERER
                nodeCanvasObject={(node: any, ctx: any, globalScale: number) => {
                    // 1. Calculate precise size based on node value
                    const size = (node.val || 10) * 0.4; 
                    
                    // 2. Strict Color Mapping
                    let color = '#ffffff'; // Group 0: Core (White)
                    if (node.group === 1) color = '#00ffff'; // Group 1: Analytics (Cyan)
                    if (node.group === 2) color = '#10b981'; // Group 2: Product OS (Emerald)
                    if (node.group === 3) color = '#64748b'; // Group 3: Foundation (Slate)
                    if (node.group === 4) color = '#a855f7'; // Group 4: Adaptive Craft (Purple)

                    // 3. Draw Outer Glow (Shadow)
                    ctx.shadowColor = color;
                    ctx.shadowBlur = 15 * globalScale; // Scale glow with zoom
                    
                    // 4. Draw Solid Inner Core
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
                    ctx.fillStyle = color;
                    ctx.fill();
                    
                    // Reset shadow for the outer stroke
                    ctx.shadowBlur = 0; 
                    
                    // 5. Draw Precision Targeting Ring
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size + 3, 0, 2 * Math.PI, false);
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 1.5 / globalScale; // Line stays crisp when zoomed
                    ctx.stroke();

                    // 6. Draw Node Label Text (Visible on zoom)
                    if (globalScale > 1.5) { // Only show text when zoomed in slightly
                        const fontSize = 10 / globalScale;
                        ctx.font = `${fontSize}px monospace`;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                        ctx.fillText(node.name, node.x, node.y + size + (8 / globalScale));
                    }
                }}
                
                nodePointerAreaPaint={(node: any, color: any, ctx: any) => {
                    ctx.fillStyle = color;
                    const size = (node.val || 10) * 0.4; 
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size + 5, 0, 2 * Math.PI, false);
                    ctx.fill();
                }}

                enableNodeDrag={true}
                enablePanInteraction={true}
                enableZoomInteraction={true}
            />
        </div>
    );
}
