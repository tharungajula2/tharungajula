import { OutreachContent } from "@/types/outreach";

export const foxoContent: OutreachContent = {
    id: "foxo",
    company: "FOXO",
    hero: {
        label: "// FOXO’S VISION",
        headline: "I want to go all in on what FOXO is building.",
        subheadline: "I work at the intersection of product management, analytics & AI, and systems-oriented operations.\n\nThis page is my way of showing why I believe that fit is real — not just in interest, but in the way I think, build, and work.",
        ctas: [
            { label: "What I Bring Into This", href: "#tracks", variant: "primary" },
            { label: "Connect Directly", href: "/contact", variant: "secondary" }
        ]
    },
    tracks: {
        label: "// WHAT I BRING INTO THIS",
        intro: "My background is not one straight line. It comes from four tracks that now connect naturally in the kind of systems FOXO is trying to build.",
        items: [
            {
                label: "TRACK 01",
                title: "Corporate Foundation",
                body: "My corporate base comes from credit risk, lending workflows, and an MBA grounding in how real systems are designed, reviewed, and operationalized. That experience taught me how decisions move through organizations — from analysis to process to execution.",
                tags: ["Jana Small Finance Bank", "Lentra AI", "MBA / Banking & Finance"]
            },
            {
                label: "TRACK 02",
                title: "Analytics Depth",
                body: "A large part of my thinking comes from quantitative work across risk, NLP, forecasting, and portfolio-style problem solving. Alongside that, Quant OS and my deep learning coursework helped me build more discipline around modeling, interpretation, and translating messy data into usable signals.",
                buttons: [
                    { label: "View Analytics Portfolio", href: "https://github.com/tharungajula2/Portfolio" },
                    { label: "Open Quant OS", href: "https://quant-os.vercel.app/" }
                ]
            },
            {
                label: "TRACK 03",
                title: "Product Prototypes",
                body: "I do not just like analyzing systems — I like building them. Yukti, Curiosity, and related prototypes are how I explore workflow design, interface clarity, and product thinking in domains where the user is dealing with complexity, ambiguity, or cognitive load.",
                buttons: [
                    { label: "Open Yukti OS", href: "https://yukti-os.vercel.app/" },
                    { label: "Open Curiosity OS", href: "https://curiosity-os.vercel.app/" }
                ]
            },
            {
                label: "TRACK 04",
                title: "Independent Craft",
                body: "Freelancing and self-directed work gave me another layer that matters a lot to me: design judgment, documentation, communication, workflow thinking, and the discipline of making things usable for real people. That independent craft is a big part of how I approach product work today.",
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
                    title: "Epigenetic Intelligence",
                    description: "Making complex health data easier to interpret, so people can understand what is changing and what to do next."
                },
                {
                    title: "System-Driven Health",
                    description: "Bringing tests, interpretation, habits, and follow-through into one connected system."
                }
            ]
        },
        rightSide: {
            title: "How I Can Help",
            cards: [
                {
                    title: "Systems-Minded Product",
                    description: "I am strongest where a product has to connect messy inputs, expert judgment, and an experience people can trust and keep using."
                },
                {
                    title: "Analytics x Design Bridge",
                    description: "My background sits between analysis and usability — helping dense information become clearer, more useful, and easier to act on."
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
        description: "I am reaching out because I think my background is adjacent in the right ways — product thinking, analytics, and the work of making complex systems more usable. If that feels relevant to where FOXO is going, I would value the chance to talk.",
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

