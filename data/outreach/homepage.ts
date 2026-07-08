import { OutreachContent } from "@/types/outreach";

export const homepageContent: OutreachContent = {
    id: "homepage",
    company: "Tharun Gajula",
    hero: {
        label: "// THESIS",
        headline: "Building High-Ownership Products from Abstract Logic.",
        subheadline: "I am a Systems Architect and Product Owner who transitioned from institutional finance and data analytics into functional AI prototyping. I thrive in ambiguous environments, taking high-friction domain logic and mapping it into simple, high-aesthetic interfaces. Seeking high-ownership roles in Bengaluru building product systems that bridge complex logic and human-centered design.",
        ctas: [
            { label: "Explore Work", href: "/#work", variant: "primary" },
            { label: "Connect Directly", href: "#contact", variant: "secondary" }
        ]
    },
    tracks: {
        label: "// CAPABILITY ARCHITECTURE",
        intro: "My work has evolved across four tracks that now converge in the systems I build today.",
        items: [
            {
                label: "01",
                title: "Product Ownership & Workflows",
                body: "My foundation lies in institutional banking and lending tech. As an Internal Product Owner and Workflow Architect, I specialize in mapping complex B2B workflows, managing PRDs, API testing, and aligning engineering with risk constraints.",
                tags: ["Internal Product Owner", "Workflow Architect", "B2B Lending"]
            },
            {
                label: "02",
                title: "Analytics & Quantitative Rigor",
                body: "Statistical machine learning and loan product development. I treat data as a raw material for robust product decisions, structuring validation frameworks, scoring models, and predictive pipelines.",
                tags: ["Scoring Models", "Deep Learning", "Validation Systems"]
            },
            {
                label: "03",
                title: "Functional AI Prototyping",
                body: "I build functional concept prototypes to test complex LLM orchestration and spatial layouts. My focus is on taste, pixel-perfect aesthetics, and high-density logic, rather than scaling pre-mature systems.",
                tags: ["LLM Orchestration", "Concept Products", "UI/UX Design"]
            },
            {
                label: "04",
                title: "Systems Architecture & GTM",
                body: "The high-agency capacity to bridge backend engineering and product storytelling. If a product needs interactive visual graphs, system diagrams, or brand architectures, I map and ship it.",
                tags: ["Systems Design", "Technical PRDs", "Product Walkthroughs"]
            }
        ]
    },
    softCTA: {
        headline: "Open to meaningful collaboration on long horizon systems.",
        description: "This site is the live headquarters for the way I think and build. If there is deep alignment around thoughtful, difficult work, I value the direct connection.",
        contact: {
            email: "tharun.gajula.2@gmail.com",
            linkedin: "https://linkedin.com/in/tharungajula"
        }
    }
};
