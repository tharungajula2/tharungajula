import { OutreachContent } from "@/types/outreach";

export const homepageContent: OutreachContent = {
    id: "homepage",
    company: "Tharun Gajula",
    hero: {
        label: "// THESIS",
        headline: "Building Better Ways to Learn, Think, and Build.",
        subheadline: "I build systems at the intersection of product, analytics, and operational architecture.\n\nFrom institutional credit-risk systems to AI-native workflows, I specialize in making dense, high-friction domains clearer, more structured, and deeply usable.",
        ctas: [
            { label: "Explore Work", href: "/systems", variant: "primary" },
            { label: "Connect Directly", href: "#contact", variant: "secondary" }
        ]
    },
    tracks: {
        label: "// CAPABILITY ARCHITECTURE",
        intro: "My work evolved across four tracks that now converge in the systems I build.",
        items: [
            {
                label: "01",
                title: "Systems Foundation",
                body: "Deep institutional grounding in lending systems and credit risk. I focus on the structural logic of decisions: workflows, requirements, validation, and the operational coordination required to move institutional momentum.",
                tags: ["Jana Small Finance Bank", "Lentra AI", "Banking & Finance"]
            },
            {
                label: "02",
                title: "Analytics & Decision Intelligence",
                body: "End-to-end analytics and ML focused on decision-usefulness. I treat data not just as information, but as the raw material for problem-framing, evaluation honesty, and the reduction of organizational ambiguity.",
                tags: ["Quant Portfolio", "ML Work", "Automation Systems"]
            },
            {
                label: "03",
                title: "Product Systems",
                body: "I build structured digital systems and concept-operating systems, not generic websites. My focus is on domain understanding through building: creating environments like Quant OS, Yukti OS, and Curiosity OS to prototype the future of thought.",
                tags: ["Quant OS", "Yukti OS", "Curiosity OS"]
            },
            {
                label: "04",
                title: "Architectural Interstitials",
                body: "The craft required to make systems durable: documentation, high-signal communication, and workflow design. I bring clinical order to the messy gaps between code, design, and execution.",
                tags: ["Systems Design", "Documentation", "Decision Workflows", "Communication"]
            }
        ]
    },
    alignment: {
        title: "Thesis & Practice",
        leftSide: {
            title: "Core Thesis",
            cards: [
                {
                    title: "Cognitive Scaling",
                    description: "I am focused on systems that amplify learning and coherence. I build environments where people learn faster, think more clearly, and build with more intentional stability over time."
                },
                {
                    title: "Structured Complexity",
                    description: "Impact lives where dense information meets real-world execution. I work to unify expert interpretation, high-friction data, and workflow into single, coherent operating structures."
                }
            ]
        },
        rightSide: {
            title: "How I Build",
            cards: [
                {
                    title: "Systems-First Product",
                    description: "I work best where products must unify messy inputs and expert judgment into resilient systems. I build for follow-through, not just first-glance interaction."
                },
                {
                    title: "Reduction of Ambiguity",
                    description: "A large part of my work is taking dense architectures and making them structured, interpretable, and decision-useful for long-horizon outcomes."
                },
                {
                    title: "Momentum Under Chaos",
                    description: "I thrive in undefined environments. My role is to create structure where none exists, driving momentum through clinical planning and relentless operational forward movement."
                }
            ]
        }
    },
    softCTA: {
        headline: "Open to meaningful collaboration on long-horizon systems.",
        description: "This site is the live headquarters for the way I think and build. If there is deep alignment around thoughtful, difficult work, I value the direct connection.",
        link: { label: "Contact Directly", href: "mailto:tharun.gajula@gmail.com" },
        contact: {
            email: "tharun.gajula@gmail.com",
            linkedin: "https://linkedin.com/in/tharungajula"
        }
    }
};
