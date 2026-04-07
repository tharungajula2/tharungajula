export interface SystemProject {
    id: string;
    title: string;
    label: string;
    description: string;
    status: "Live" | "Clinical Prep" | "Development" | "Archive";
    href: string;
    ctaLabel: string;
    isExternal: boolean;
    tags: string[];
}

export const systemsData: SystemProject[] = [
    {
        id: "quant-os",
        title: "Quant OS",
        label: "// KNOWLEDGE SYSTEM",
        description: "A centralized knowledge graph for analytics and quantitative thinking. Built to synthesize dense clinical and statistical mental models into a unified building environment.",
        status: "Live",
        href: "https://quant-os.vercel.app/",
        ctaLabel: "Open System",
        isExternal: true,
        tags: ["Analytics", "Knowledge Graph", "Context Rendering"]
    },
    {
        id: "yukti-os",
        title: "Yukti OS",
        label: "// HEALTH SYSTEM",
        description: "A context-first health operating concept built on the belief that longitudinal medical data without patient context is noise. Focused on clinical-grade interpretation and protocol design.",
        status: "Live",
        href: "https://yukti-os.vercel.app/",
        ctaLabel: "Open System",
        isExternal: true,
        tags: ["Health", "Protocol Design", "Clinical Context"]
    },
    {
        id: "curiosity-os",
        title: "Curiosity OS",
        label: "// LEARNING SYSTEM",
        description: "A systemic learning concept designed to bring curiosity back through activity-led planning, guidance, and reflection. Moving from passive consumption to active synthesis.",
        status: "Live",
        href: "https://curiosity-os.vercel.app/",
        ctaLabel: "Open System",
        isExternal: true,
        tags: ["Education", "Cognitive Architecture", "Learning Logic"]
    },
    {
        id: "analytics-portfolio",
        title: "Analytics Portfolio",
        label: "// QUANTITATIVE BODY OF WORK",
        description: "A deep archive of technical work across credit risk, machine learning, and automation. Synthesis of end-to-end data pipelines and decision-useful intelligence.",
        status: "Live",
        href: "https://github.com/tharungajula2/Portfolio",
        ctaLabel: "View GitHub Repo",
        isExternal: true,
        tags: ["Portfolio", "Python/SQL", "ML/Quant"]
    }
];
