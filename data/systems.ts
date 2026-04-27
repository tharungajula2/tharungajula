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
        id: "yukti-os",
        title: "YUKTI OS",
        label: "HEALTH SYSTEM",
        description: "A context first geriatric care companion and longevity OS. Built on the belief that medical data without patient context is just noise. It synthesizes daily habit logs with clinical data using an empathetic AI persona.",
        status: "Live Concept Prototype",
        href: "https://yukti-os.vercel.app",
        ctaLabel: "Open Prototype",
        isExternal: true,
        tags: ["Health", "Protocol Design", "Clinical Context"]
    },
    {
        id: "quant-os",
        title: "QUANT OS",
        label: "KNOWLEDGE SYSTEM",
        description: "A spatial learning environment and quantitative knowledge graph. Built to turn my raw analytics and Reinforcement Learning portfolio into a navigable 2D physics map.",
        status: "Live Concept Prototype",
        href: "https://quant-os.vercel.app",
        ctaLabel: "Open Prototype",
        isExternal: true,
        tags: ["Analytics", "Knowledge Graph", "Context Rendering"]
    },
    {
        id: "curiosity-os",
        title: "CURIOSITY OS",
        label: "LEARNING SYSTEM",
        description: "A teacher operating system and learning layer. Built on a 147 node atomic knowledge graph to digitize the pedagogical cycle from planning to active reflection.",
        status: "Live Concept Prototype",
        href: "https://curiosity-os.vercel.app",
        ctaLabel: "Open Prototype",
        isExternal: true,
        tags: ["Education", "Knowledge Graph", "Workflow System"]
    },
    {
        id: "analytics-portfolio",
        title: "ANALYTICS PORTFOLIO",
        label: "QUANTITATIVE BODY OF WORK",
        description: "A deep archive of technical work across credit risk, machine learning, and automation. Synthesis of end to end data pipelines and decision useful intelligence.",
        status: "Live Archive",
        href: "https://github.com/tharungajula2/Portfolio",
        ctaLabel: "View GitHub Repo",
        isExternal: true,
        tags: ["Portfolio", "Python/SQL", "ML/Quant"]
    }
];
