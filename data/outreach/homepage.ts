import { OutreachContent } from "@/types/outreach";

export const homepageContent: OutreachContent = {
    id: "homepage",
    company: "Tharun Gajula",
    hero: {
        label: "// THESIS",
        headline: "Building Better Ways to Learn, Think, and Build.",
        subheadline: "I am a 0-1 builder operating at the intersection of complex data and human psychology. \n\nThree months ago, I did not know how to code. But I wanted to solve real problems, so I learned the stack, used AI as a co-developer, and started building. I now take dense, high friction problems and turn them into usable, premium concept prototypes.",
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
                title: "Systems Foundation",
                body: "My foundation is in banking and credit risk. I know how to handle strict validation, logic, and the operational architecture required to move actual institutional momentum.",
                tags: ["Jana Small Finance Bank", "Lentra AI", "Banking & Finance"]
            },
            {
                label: "02",
                title: "Analytics & Decision Intelligence",
                body: "End-to-end machine learning and data science. I do not just fit models. I treat data as the raw material for problem-framing, honest evaluation, and bridging the gap to actual business decisions.",
                tags: ["Quant Portfolio", "ML Work", "Automation Systems"]
            },
            {
                label: "03",
                title: "Product Systems",
                body: "I build domain-specific operating systems, not generic websites. Over the last 90 days, I taught myself to build and ship completely functional prototypes to solve problems I care about deeply.",
                tags: ["Quant OS", "Parents Health OS", "Curiosity OS"]
            },
            {
                label: "04",
                title: "Spatial & Pre-Visualization",
                body: "The ability to bridge the gap between backend code and the market. If a product needs a 3D environment, a cinematic concept, or a specific brand architecture, I learn the tool and build it.",
                tags: ["Systems Design", "Documentation", "3D Reasoning", "Communication"]
            }
        ]
    },
    softCTA: {
        headline: "Open to meaningful collaboration on long horizon systems.",
        description: "This site is the live headquarters for the way I think and build. If there is deep alignment around thoughtful, difficult work, I value the direct connection.",
        contact: {
            email: "tharun.gajula@gmail.com",
            linkedin: "https://linkedin.com/in/tharungajula"
        }
    }
};
