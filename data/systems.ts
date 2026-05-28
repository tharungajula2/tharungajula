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
        id: "ponder",
        title: "PONDER AGENTIC RAG",
        label: "AGENT SYSTEM",
        description: "A live, high-observability agentic RAG console. Ingests raw text or markdown documents, compiles 3,072-dimensional Gemini embeddings in a session-isolated memory singleton, and exposes the agent's real-time search, analysis, citations, and evaluation timelines.",
        status: "Live Concept Prototype",
        href: "/ponder",
        ctaLabel: "Open Showcase",
        isExternal: false,
        tags: ["Agentic RAG", "Gemini", "Vector Search", "Observability"]
    },
    {
        id: "parents-health-os",
        title: "PARENTS HEALTH OS",
        label: "HEALTH SYSTEM",
        description: "A functional concept prototype mapping high-frequency daily habit logs with low-frequency clinical metrics. Built to demonstrate a 15-question clinical matrix, 175-point health index, and structured document synthesis with high-aesthetic layout and dense logic.",
        status: "Live Concept Prototype",
        href: "https://parents-health-os.vercel.app",
        ctaLabel: "Open Prototype",
        isExternal: true,
        tags: ["Health", "Protocol Design", "Clinical Context", "AI RAG"]
    },
    {
        id: "trellis",
        title: "THERAPY MATCHING OS",
        label: "CLINICAL SYSTEM",
        description: "A functional concept prototype of a clinical matching engine for therapy. Implements a 58-point clinical matching algorithm and PCOMS preference matching on a pixel-perfect, highly responsive interface.",
        status: "Live Concept Prototype",
        href: "https://therapy-matching-os.vercel.app",
        ctaLabel: "Open Prototype",
        isExternal: true,
        tags: ["Therapy", "Matching Algorithm", "Clinical Psychology", "PCOMS"]
    },
    {
        id: "quant-os",
        title: "QUANT OS",
        label: "KNOWLEDGE SYSTEM",
        description: "A functional concept product showcasing a quantitative learning environment and portfolio knowledge graph. Translates a dense analytics portfolio into a navigable 2D spatial physics graph with secure RAG capabilities.",
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
        description: "A functional concept prototype designed as a pedagogical curriculum mapping workspace. Connects 147 pedagogical nodes and 381 semantic edges across a visual 6-stage operational loop.",
        status: "Live Concept Prototype",
        href: "https://curiosity-os.vercel.app",
        ctaLabel: "Open Prototype",
        isExternal: true,
        tags: ["Education", "Knowledge Graph", "Workflow System", "Pedagogy"]
    },
    {
        id: "mila",
        title: "RELATIONAL MATCHING OS",
        label: "SOCIAL SYSTEM",
        description: "A functional concept prototype demonstrating psychology-backed high-intent matching. Utilizes a 3-layer matching algorithm and custom 80 MECE profiles on a highly interactive, aesthetic layout.",
        status: "Live Concept Prototype",
        href: "https://relational-matching-os.vercel.app",
        ctaLabel: "Open Prototype",
        isExternal: true,
        tags: ["Relational Matching", "Psychology", "Matching Algorithm", "Behavioral Science"]
    },
    {
        id: "pause",
        title: "FMCG WHITESPACE OS",
        label: "FMCG SYSTEM",
        description: "A functional concept prototype mapping FMCG growth frameworks, unit-level P&L waterfalls, and occasion fit. Demonstrates premium cinematic GSAP scrolling animations and high-density product storytelling.",
        status: "Archive",
        href: "https://fmcg-whitespace-os.vercel.app",
        ctaLabel: "View Archive",
        isExternal: true,
        tags: ["FMCG", "D2C", "Economic Modeling", "Brand Strategy"]
    },
    {
        id: "analytics-portfolio",
        title: "ANALYTICS PORTFOLIO",
        label: "QUANTITATIVE BODY OF WORK",
        description: "Eight end-to-end quantitative systems spanning credit risk, bank churn neural networks, reinforcement learning, NLP, and time-series forecasting. The logical foundation of my systems execution.",
        status: "Live Archive",
        href: "https://github.com/tharungajula2/Portfolio",
        ctaLabel: "View GitHub Repo",
        isExternal: true,
        tags: ["Portfolio", "Python/SQL", "ML/Quant", "Credit Risk"]
    }
];
