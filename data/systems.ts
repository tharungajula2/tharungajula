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
    wip?: boolean;
}

export const systemsData: SystemProject[] = [
    {
        id: "vizier",
        title: "VIZIER",
        label: "AGENTIC ASSISTANT",
        description: "A personal multi-agent assistant that reads my real email and calendar, researches, and drafts actions. The core product decision is trust: it proposes every email, event, or task and nothing runs without my approval.",
        status: "Development",
        href: "",
        ctaLabel: "",
        isExternal: false,
        tags: ["Agents", "Productivity", "Trust Guardrails", "Security"],
        wip: true
    },
    {
        id: "parents-health-os",
        title: "PARENTS HEALTH OS",
        label: "FLAGSHIP SYSTEM",
        description: "Remote elder-care console for Indian families. Parents check in over WhatsApp — no app to learn — while the family dashboard tracks medications, vitals, and triage, and generates doctor-ready briefs. Local-first by design.",
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
        description: "Clinical matching engine for therapy services. Implements 58-point clinical matching and PCOMS preference alignment on a functional interface.",
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
        description: "Spatial knowledge base for quantitative finance. Markdown notes become an interactive graph with wikilinks, backlinks, KaTeX math, and mastery tracking — plus Vian AI, a terminal chatbot grounded strictly in the knowledge base.",
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
        description: "A digital lab for training thinking skills. Runnable activity playbooks, evidence logging and reflection tools, curated learning paths, and a 3D causal knowledge map explored through Student, Mentor, and Builder lenses.",
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
        description: "Psychology-backed relationship matching engine implementing MECE profiling and algorithmic logic.",
        status: "Archive",
        href: "https://relational-matching-os.vercel.app",
        ctaLabel: "Open System",
        isExternal: true,
        tags: ["Relational Matching", "Psychology", "Matching Algorithm", "Behavioral Science"]
    },
    {
        id: "better4u",
        title: "better4u",
        label: "CONSUMER BRAND DESIGN",
        description: "A better-for-you food & beverage brand, designed end to end as a shippable PWA. A full house of sub-brands — sparkling ferments, smoothies, hot brews, whole-food bars, and a protein RTD line — each with its own identity, product renders, and packaging language. The focus is product and brand design: making 'healthy' look and feel premium enough that people actually reach for it.",
        status: "Live",
        href: "https://better4u.vercel.app/",
        ctaLabel: "Open Prototype",
        isExternal: true,
        tags: ["Brand Design", "PWA", "Consumer Product", "Packaging"]
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

