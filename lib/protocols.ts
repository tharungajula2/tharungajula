import { Activity, Brain, Utensils, Zap, Database, Heart, Pill, Smartphone, Code2, Server, Leaf, Flame, Home, Wind, Droplets, Sun, ShieldAlert, LayoutTemplate, Truck, Siren, ShieldCheck, Shield } from "lucide-react";

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
    "n1": {
        slug: "n1",
        title: "PROTOCOL N=1",
        subtitle: "The Pursuit of Biological Optimization",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500",
        icon: Activity,
        status: "Active Research",
        mission: "To engineer a biological system capable of sustained high performance. This protocol focuses on longevity, geriatric care for family, and aggressive bio-hacking to optimize sleep, recovery, and cognitive output. Data is the bridge between feeling good and actually being good.",
        stack: [
            { name: "Oura Ring", icon: Activity },
            { name: "Supplements", icon: Pill },
            { name: "Sleep Tech", icon: Zap },
            { name: "Strength Training", icon: Heart },
        ]
    },
    "family": {
        slug: "family",
        title: "PROTOCOL FAMILY",
        subtitle: "The Fortress Architecture",
        color: "text-orange-500",
        bgColor: "bg-orange-500",
        icon: Shield,
        status: "Active Research",
        mission: "To engineer the Fortress Architecture required to protect Protocol N=1 and sustain Protocol Cognition.",
        stack: [
            { name: "Intelligence", icon: Brain },
            { name: "Logistics", icon: Truck },
            { name: "Emergency", icon: Siren },
            { name: "Governance", icon: ShieldCheck },
        ]
    },
    "cognition": {
        slug: "cognition",
        title: "PROTOCOL COGNITION",
        subtitle: "The Cognitive Operating System",
        color: "text-sky-500",
        bgColor: "bg-sky-500",
        icon: Brain,
        status: "Concept Phase",
        mission: "To engineer the Cognitive Software required to run Protocol N=1 and Protocol Family.",
        stack: [
            { name: "Bayesian Filter", icon: Utensils },
            { name: "Mental Models", icon: Brain },
            { name: "Second Brain", icon: Database },
            { name: "Deep Work", icon: Zap },
        ]
    }
};
