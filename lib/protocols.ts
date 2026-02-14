import { Activity, Brain, Utensils, Zap, Database, Heart, Pill, Smartphone, Code2, Server, Leaf, Flame, Home, Wind, Droplets, Sun, ShieldAlert } from "lucide-react";

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
    "yukti": {
        slug: "yukti",
        title: "PROTOCOL YUKTI",
        subtitle: "The Context-Aware Health OS",
        color: "text-orange-500",
        bgColor: "bg-orange-500",
        icon: Brain,
        status: "Building v1.0",
        mission: "Moving beyond raw health data. Protocol Yukti is a digital clinical twin system designed to interpret biomarkers in the context of a specific user's history and goals. It uses LLMs to synthesize lab reports, wearable data, and subjective logs into actionable intelligence.",
        stack: [
            { name: "Next.js", icon: Code2 },
            { name: "Gemini Flash", icon: Brain },
            { name: "Python", icon: Server },
            { name: "Vector DB", icon: Database },
        ]
    },
    "habitat": {
        slug: "habitat",
        title: "PROTOCOL HABITAT",
        subtitle: "The Environmental Architecture",
        color: "text-blue-500",
        bgColor: "bg-blue-500",
        icon: Home, // You might need to update imports in this file too
        status: "Incubation Phase",
        mission: "To engineer a Sanctuary that acts as a passive life-support system. Exploring the impact of air quality, water security, light spectrums, and material safety on biological performance.",
        stack: [
            { name: "Air Quality", icon: Wind },
            { name: "Water Filtering", icon: Droplets },
            { name: "Circadian Light", icon: Sun },
            { name: "Low Tox", icon: ShieldAlert },
        ]
    }
};
