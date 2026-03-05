import { Activity, Brain, Utensils, Zap, Database, Heart, Pill, Smartphone, Code2, Server, Leaf, Flame, Home, Wind, Droplets, Sun, ShieldAlert, LayoutTemplate, Truck, Siren, ShieldCheck, Shield, LineChart, Briefcase, Layers } from "lucide-react";

export type ProtocolData = {
    slug: string;
    title: string;
    subtitle: string;
    color: string;
    bgColor: string;
    icon: any;
    status: string;
    mission: string;
    stack: { name: string; icon: any }[];
};

export const protocols: Record<string, ProtocolData> = {
    "meta": {
        slug: "meta",
        title: "THE SANDBOX",
        subtitle: "The OS Architecture",
        color: "text-zinc-400",
        bgColor: "bg-zinc-400",
        icon: Database,
        status: "Active System",
        mission: "To document the systemic approach, logical frameworks, and baseline infrastructure driving this portfolio.",
        stack: [
            { name: "Architecture", icon: Database },
            { name: "Philosophy", icon: Brain }
        ]
    },
    "risk_os": {
        slug: "risk_os",
        title: "PREDICTIVE RISK",
        subtitle: "Probability & Capital Management",
        color: "text-purple-500",
        bgColor: "bg-purple-500",
        icon: LineChart,
        status: "Production",
        mission: "To engineer robust risk frameworks. Focuses on PD Scorecards, Asset Liability Management (ALM), and Regulatory Stress Testing. Bringing statistical rigor to retail and institutional credit decisions.",
        stack: [
            { name: "Credit Models", icon: LineChart },
            { name: "ALM", icon: Layers },
            { name: "Stress Testing", icon: ShieldAlert },
            { name: "Basel III", icon: ShieldCheck },
        ]
    },
    "product_os": {
        slug: "product_os",
        title: "PRODUCT STRATEGY",
        subtitle: "Execution & Lifecycle",
        color: "text-orange-500",
        bgColor: "bg-orange-500",
        icon: Briefcase,
        status: "Production",
        mission: "Translating complex business requirements into shipping code. Bridging stakeholders, engineering teams, and regulatory constraints to deliver viable 0-to-1 banking products.",
        stack: [
            { name: "BRD / PRD", icon: LayoutTemplate },
            { name: "Agile Delivery", icon: Truck },
            { name: "UAT", icon: ShieldCheck },
            { name: "0-to-1 Builds", icon: Code2 },
        ]
    },
    "data_os": {
        slug: "data_os",
        title: "DATA ENGINEERING",
        subtitle: "Pipelines & Intelligence",
        color: "text-sky-500",
        bgColor: "bg-sky-500",
        icon: Layers,
        status: "Production",
        mission: "Structuring unstructured finance. Building the data pipelines, ETL flows, and ML integrations required to power predictive models and LLM agents at scale.",
        stack: [
            { name: "Python / Pandas", icon: Code2 },
            { name: "SQL", icon: Database },
            { name: "PowerBI", icon: Activity },
            { name: "ETL Pipelines", icon: Server },
        ]
    }
};
