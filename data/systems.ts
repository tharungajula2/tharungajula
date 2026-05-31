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
        label: "FLAGSHIP SYSTEM",
        description: "Health tracking system for geriatric care. Connects daily habit logs with clinical indices and synthesizes doctor-ready summaries in a clear, usable dashboard.",
        status: "Live",
        href: "https://parents-health-os.vercel.app",
        ctaLabel: "Open System",
        isExternal: true,
        tags: ["Health", "Protocol Design", "Clinical Context", "AI RAG"]
    },
    {
        id: "trellis",
        title: "THERAPY MATCHING OS",
        label: "ROLE-SPECIFIC SYSTEM",
        description: "Clinical matching engine for therapy services. Implements clinical matching logic and client preference parameters on a functional interface.",
        status: "Live Archive",
        href: "https://therapy-matching-os.vercel.app",
        ctaLabel: "Open System",
        isExternal: true,
        tags: ["Therapy", "Matching Algorithm", "Clinical Psychology", "PCOMS"]
    },
    {
        id: "quant-os",
        title: "QUANT OS",
        label: "FLAGSHIP SYSTEM",
        description: "Research map and learning workspace for quantitative finance. Maps research papers and financial models onto a navigable physics-based knowledge graph.",
        status: "Live",
        href: "https://quant-os.vercel.app",
        ctaLabel: "Open System",
        isExternal: true,
        tags: ["Analytics", "Knowledge Graph", "Spatial Architecture", "Physics Engine"]
    },
    {
        id: "curiosity-os",
        title: "CURIOSITY OS",
        label: "FLAGSHIP SYSTEM",
        description: "Learning workspace designed for pedagogical planning. Connects learning units, course concepts, and classroom activities into a structured visual graph.",
        status: "Live",
        href: "https://curiosity-os.vercel.app",
        ctaLabel: "Open System",
        isExternal: true,
        tags: ["Education", "Knowledge Graph", "Workflow System", "Pedagogy"]
    },
    {
        id: "mila",
        title: "RELATIONAL MATCHING OS",
        label: "HIDDEN / ARCHIVE SYSTEM",
        description: "Relationship matching system implementing psychological profile matching and structured algorithmic logic.",
        status: "Archive",
        href: "https://relational-matching-os.vercel.app",
        ctaLabel: "Open System",
        isExternal: true,
        tags: ["Relational Matching", "Psychology", "Matching Algorithm", "Behavioral Science"]
    },
    {
        id: "pause",
        title: "FMCG WHITESPACE OS",
        label: "COMMERCIAL CASE STUDY",
        description: "Product strategy case study mapping growth frameworks, unit-level P&L waterfalls, and margins using smooth custom interfaces.",
        status: "Live",
        href: "https://fmcg-whitespace-os.vercel.app",
        ctaLabel: "Open System",
        isExternal: true,
        tags: ["FMCG", "D2C", "Economic Modeling", "Brand Strategy"]
    },
    {
        id: "analytics-portfolio",
        title: "ANALYTICS PORTFOLIO",
        label: "QUANTITATIVE BODY OF WORK",
        description: "A collection of quantitative models covering credit risk, attrition forecasting, reinforcement learning, and demand forecasting.",
        status: "Live Archive",
        href: "https://github.com/tharungajula2/Portfolio",
        ctaLabel: "View GitHub Repo",
        isExternal: true,
        tags: ["Portfolio", "Python/SQL", "ML/Quant", "Credit Risk"]
    }
];
