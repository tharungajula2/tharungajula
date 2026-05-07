export interface SystemProject {
    id: string;
    title: string;
    label: string;
    description: string;
    status: "Live" | "Live Concept Prototype" | "Live Archive" | "Clinical Prep" | "Development" | "Archive";
    href: string;
    ctaLabel: string;
    isExternal: boolean;
    tags: string[];
}

export const systemsData: SystemProject[] = [
    {
        id: "parents-health-os",
        title: "PARENTS HEALTH OS",
        label: "HEALTH SYSTEM",
        description: "A context-first parents' health companion and longevity OS. Synthesizes high-frequency daily habit logs with low-frequency clinical data using a 15-question clinical matrix, 175-point health index, and empathetic AI persona powered by Gemini 2.0 Flash.",
        status: "Live Concept Prototype",
        href: "https://parents-health-os.vercel.app",
        ctaLabel: "Open Prototype",
        isExternal: true,
        tags: ["Health", "Protocol Design", "Clinical Context", "AI RAG"]
    },
    {
        id: "trellis",
        title: "TRELLIS",
        label: "CLINICAL SYSTEM",
        description: "A clinical matching engine concept for therapy. Implements a 58-point clinical matching algorithm, PCOMS feedback loops, and C-NIP preferences to maximize therapeutic alliance probability.",
        status: "Live Concept Prototype",
        href: "https://github.com/tharungajula2/Portfolio",
        ctaLabel: "Open Prototype",
        isExternal: true,
        tags: ["Therapy", "Matching Algorithm", "Clinical Psychology", "PCOMS"]
    },
    {
        id: "quant-os",
        title: "QUANT OS",
        label: "KNOWLEDGE SYSTEM",
        description: "A spatial learning environment and quantitative knowledge graph. Transforms the full analytics portfolio into a navigable 2D physics map built on a 14-pillar knowledge architecture with KaTeX equation rendering and a secure AI RAG terminal.",
        status: "Live Concept Prototype",
        href: "https://quant-os.vercel.app",
        ctaLabel: "Open Prototype",
        isExternal: true,
        tags: ["Analytics", "Knowledge Graph", "Spatial Architecture", "Physics Engine"]
    },
    {
        id: "curiosity-os",
        title: "CURIOSITY OS",
        label: "LEARNING SYSTEM",
        description: "A teacher operating system and learning layer for educators. Built on an immutable 147-node atomic knowledge graph with 381 semantic edges, a 4-Wing curriculum system, and a 6-stage pedagogical operating loop from Browse to Adapt.",
        status: "Live Concept Prototype",
        href: "https://curiosity-os.vercel.app",
        ctaLabel: "Open Prototype",
        isExternal: true,
        tags: ["Education", "Knowledge Graph", "Workflow System", "Pedagogy"]
    },
    {
        id: "mila",
        title: "MILA",
        label: "SOCIAL SYSTEM",
        description: "A curated, psychology-backed dating ecosystem replacing infinite swiping with a strict 3-Layer Matching Algorithm. Built on a custom 80-profile MECE psychological matrix with explained matching and anti-engagement Red Lines.",
        status: "Live Concept Prototype",
        href: "https://meetmila.vercel.app",
        ctaLabel: "Open Prototype",
        isExternal: true,
        tags: ["Dating", "Psychology", "Matching Algorithm", "Behavioral Science"]
    },
    {
        id: "pause",
        title: "PAUSE",
        label: "FMCG SYSTEM",
        description: "A visionary FMCG/D2C growth framework and strategic brand exploration. Maps economic unit-level P&L waterfalls, protein quality matrices, and product-occasion fit with cinematic GSAP scroll storytelling.",
        status: "Archive",
        href: "https://pause-lac.vercel.app",
        ctaLabel: "View Archive",
        isExternal: true,
        tags: ["FMCG", "D2C", "Economic Modeling", "Brand Strategy"]
    },
    {
        id: "analytics-portfolio",
        title: "ANALYTICS PORTFOLIO",
        label: "QUANTITATIVE BODY OF WORK",
        description: "Eight end-to-end quantitative architectures spanning institutional credit risk, neural network classification, reinforcement learning, NLP, time-series forecasting, and Modern Portfolio Theory. The clinical-grade proof of analytical depth.",
        status: "Live Archive",
        href: "https://github.com/tharungajula2/Portfolio",
        ctaLabel: "View GitHub Repo",
        isExternal: true,
        tags: ["Portfolio", "Python/SQL", "ML/Quant", "Credit Risk"]
    }
];
