"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
    ssr: false,
    loading: () => <div className="flex w-full h-full items-center justify-center text-zinc-500 font-mono text-sm absolute inset-0">INITIALIZING_NEURAL_NETWORK...</div>
});
import { useRouter } from "next/navigation";

type NodeData = {
    id: string;
    name: string;
    group: string;
    val: number;
};

type LinkData = {
    source: string;
    target: string;
};

type GraphData = {
    nodes: NodeData[];
    links: LinkData[];
};

export default function KnowledgeGraph({ graphData }: { graphData: GraphData }) {
    const router = useRouter();
    const fgRef = useRef<any>(null);

    // Handle Window Resizing for Canvas
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(entries => {
            if (entries.length > 0) {
                const { width, height } = entries[0].contentRect;
                setDimensions({ width, height });
            }
        });

        observer.observe(containerRef.current);

        // Initial zoom to fit
        if (fgRef.current) {
            setTimeout(() => {
                fgRef.current?.zoomToFit(400, 50);
            }, 100);
        }

        return () => observer.disconnect();
    }, []);

    const handleNodeClick = (node: any) => {
        router.push(`/notes/${node.id}`);
    };

    return (
        <div ref={containerRef} className="w-full h-full relative flex-1">
            <ForceGraph2D
                ref={fgRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={graphData}
                nodeLabel="name"
                nodeColor={(node: any) => {
                    // Map Protocol ID to Tailwind Hex Colors
                    switch (node.group) {
                        case "0": return "#a1a1aa"; // Zinc-400
                        case "1": return "#a855f7"; // Purple-500
                        case "2": return "#f97316"; // Orange-500
                        case "3": return "#0ea5e9"; // Sky-500
                        default: return "#71717a";  // Zinc-500 fallback
                    }
                }}
                nodeRelSize={6}
                linkColor={() => "rgba(113, 113, 122, 0.3)"} // Subtle Zinc
                linkWidth={1.5}
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={1.5}
                linkDirectionalParticleColor={() => "rgba(255,255,255,0.4)"}
                linkDirectionalParticleSpeed={0.005}
                onNodeClick={handleNodeClick}
                backgroundColor="rgba(0,0,0,0)"
                nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
                    // 1. Determine Color
                    let nodeColor = "#71717a"; // Default Zinc
                    if (node.group === "0") nodeColor = "#a1a1aa"; // Zinc
                    if (node.group === "1") nodeColor = "#a855f7"; // Purple
                    if (node.group === "2") nodeColor = "#f97316"; // Orange
                    if (node.group === "3") nodeColor = "#0ea5e9"; // Sky

                    // 2. Draw Glow & Circle
                    const r = 4; // Node radius
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
                    ctx.fillStyle = nodeColor;
                    ctx.shadowColor = nodeColor;
                    ctx.shadowBlur = 10; // The glow effect
                    ctx.fill();
                    ctx.shadowBlur = 0; // Reset for other elements

                    // 3. Draw Text Label
                    const label = node.name;
                    const fontSize = 12 / globalScale;
                    ctx.font = `${fontSize}px Inter, sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.fillText(label, node.x, node.y + r + 2);
                }}
                onNodeHover={(node) => {
                    // Subtle hover effect
                    if (containerRef.current) {
                        containerRef.current.style.cursor = node ? "pointer" : "crosshair";
                    }
                }}
            />
        </div>
    );
}
