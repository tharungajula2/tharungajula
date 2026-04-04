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
                },
                {
                    title: "Operations for the Unknown",
                    description: "I do my best work in ambiguous environments where the path is not obvious yet. I am ready to learn, unlearn, and adapt quickly to solve unfamiliar and unprecedented problems. At my core, I am a problem solver who brings structure, momentum, and follow-through to work that does not come with a predefined playbook."
                }
            ]
        }
    },
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

