import { OutreachContent } from "@/types/outreach";

export const foxoContent: OutreachContent = {
    id: "foxo",
    company: "FOXO",
    hero: {
        label: "// FOXO’S VISION",
        headline: "I want to help build FOXO",
        subheadline: "I work at the intersection of product management, analytics & AI, and systems-oriented operations.\n\nThis page is my way of showing why I believe that fit is real, not just in interest, but in the way I think, build, and work.",
        ctas: [
            { label: "What I Bring Into This", href: "#tracks", variant: "primary" },
            { label: "Connect Directly", href: "#contact", variant: "secondary" }
        ]
    },
    tracks: {
        label: "// WHAT I BRING INTO THIS",
        intro: "My background did not come from one lane. It came through four tracks that now fit together naturally in the kind of systems FOXO is building.",
        items: [
            {
                label: "TRACK 01",
                title: "Corporate Foundation",
                body: "My foundation comes from credit risk and lending systems. At Jana and Lentra, along with my MBA in Banking & Finance, I learned how decisions actually move inside real organizations, through workflows, requirements, validation, reporting, and operational follow-through.",
                tags: ["Jana Small Finance Bank", "Lentra AI", "MBA / Banking & Finance"]
            },
            {
                label: "TRACK 02",
                title: "Analytics Depth",
                body: "A large part of my thinking comes from building end-to-end analytics work across credit risk, churn, attrition, socio-economic classification, NLP, forecasting, reinforcement learning, and portfolio optimization. More than any single model, that work taught me how to frame problems well, work carefully with messy data, evaluate honestly, and turn analysis into something decision-useful.",
                buttons: [
                    { label: "View Analytics Portfolio", href: "https://github.com/tharungajula2/Portfolio" },
                    { label: "Open Quant OS", href: "https://quant-os.vercel.app/" }
                ]
            },
            {
                label: "TRACK 03",
                title: "Product Prototypes",
                body: "Over the last few months, I have been building a few personal work-in-progress concepts to understand domains by making them. Quant OS is my own knowledge graph for analytics and quantitative thinking. Yukti is a context-first health concept built on the belief that medical data without patient context is noise. Curiosity is a learning-layer concept built to bring more curiosity back through activity-led planning, guidance, reflection, and adaptation.",
                buttons: [
                    { label: "Open Yukti OS", href: "https://yukti-os.vercel.app/" },
                    { label: "Open Curiosity OS", href: "https://curiosity-os.vercel.app/" }
                ]
            },
            {
                label: "TRACK 04",
                title: "Independent Craft",
                body: "A lot of my judgment also came from work outside formal roles. That includes design, documentation, content, digital experimentation, and helping early ideas take shape. It gave me a stronger sense for communication, workflow thinking, and making complex things usable for real people.",
                tags: ["Design", "Documentation", "Workflow Systems", "Communication"]
            }
        ]
    },
    alignment: {
        title: "Builder Alignment",
        leftSide: {
            title: "FOXO's Mission",
            cards: [
                {
                    title: "Connected Health System",
                    description: "FOXO seems to be building a more connected way to understand health, where diagnostics, interpretation, habits, and follow-through sit in one loop instead of separate reports."
                },
                {
                    title: "Interpretation Over More Testing",
                    description: "What stands out to me is not just the number of tests, but the effort to make those results more interpretable, more longitudinal, and more useful over time."
                }
            ]
        },
        rightSide: {
            title: "How I Can Help",
            cards: [
                {
                    title: "Systems-Minded Product",
                    description: "I am strongest where a product has to bring messy inputs, expert judgment, and ongoing follow-through into one usable system."
                },
                {
                    title: "Analytics for Clarity",
                    description: "A lot of my work has been about taking dense information and making it clearer, more structured, and easier to act on."
                }
            ]
        },
        deepView: {
            label: "What I Mean By This",
            blocks: [
                {
                    title: "What I think FOXO is really building",
                    points: [
                        "A longitudinal health loop, not just a collection of reports",
                        "Diagnostics only matter if they lead to better decisions over time",
                        "The real product feels closer to an operating system than a health dashboard",
                        "Trust seems to come from transparency, cleaner incentives, and careful interpretation",
                        "AI appears most useful when it supports clinicians and workflows, not when it tries to replace judgment"
                    ]
                },
                {
                    title: "Where I think I can help",
                    points: [
                        "Making dense inputs more structured and easier to work with",
                        "Building product workflows around interpretation, follow-through, and visibility",
                        "Helping turn information into something more decision-grade, not just more available",
                        "Thinking carefully about traceability, usability, and trust",
                        "Supporting systems that reduce noise instead of adding more of it"
                    ]
                }
            ]
        }
    },
    projectBridge: {
        title: "Yukti OS",
        premise: "An evidence-based interpretation prototype for high-stakes healthcare cognition and workflow management.",
        highlights: [
            { title: "Context-First Thinking", description: "Design language optimized for interpreting complex clinical datasets without noise." },
            { title: "Modular Architecture", description: "Engineered for diagnostic workflows where interpreting evidence is the primary product goal." },
            { title: "Evidence-Led Design", description: "Visual patterns that assist clinical synthesis by prioritizing the most relevant data streams." }
        ],
        relevance: "Yukti OS reflects how I approach interpretation-first product design in health-adjacent contexts."
    },

    proofStack: {
        title: "Selected Proof",
        points: [
            {
                label: "Interpretability Thinking",
                description: "Built around the core problem of helping users make sense of dense, context-sensitive health data.",
                tags: ["Systems Design", "Cognition"]
            },
            {
                label: "Grounded Analytics",
                description: "Experience translating complex datasets into interpretable analytical and product-facing outputs.",
                tags: ["Data Viz", "Product Growth"]
            },
            {
                label: "Code-Native Builder",
                description: "Moving from concept framing to functional product surfaces in code with systems-level precision.",
                tags: ["TypeScript", "Next.js", "AI"]
            }
        ]
    },
    principles: [
        { title: "Systems Over Hacks", description: "Intentional frameworks scale; one-off solutions inevitably break." },
        { title: "Evidence Over Noise", description: "Information only gains value when it informs a distinct product decision." },
        { title: "Context Over Metrics", description: "Biological numbers without historical context lead to over-interpretation." },
        { title: "Intentionality First", description: "Every UI element should earn its place in the user's focus through meaning." }
    ],
    contributions: [
        {
            title: "Signal Interpretability",
            description: "Designing the bridge between FOXO's raw epigenetic signatures and intuitive clinical or consumer decisions."
        },
        {
            title: "Contextual Workflows",
            description: "Building the internal or external systems that turn longevity monitoring into an intentional product experience."
        },
        {
            title: "AI-Powered Narrative",
            description: "Integrating modern AI patterns to help users navigate their biological context with clarity and confidence."
        }
    ],
    softCTA: {
        headline: "Start a conversation about how I could help at FOXO.",
        description: "I am reaching out because I think my background is adjacent in the right ways: product thinking, analytics, and making complex systems more usable. If that feels relevant to where FOXO is going, I would value the chance to talk.",
        link: { label: "Open a Conversation", href: "/contact" },
        contact: {
            email: "tharun.gajula@gmail.com",
            linkedin: "https://linkedin.com/in/tharungajula"
        }
    },
    projectLinks: {
        yukti: "https://yukti-os.vercel.app",
        quant: "https://quant-os.vercel.app",
        curiosity: "https://curiosity-os.vercel.app",
        portfolio: "https://tharungajula.vercel.app"
    }
};

