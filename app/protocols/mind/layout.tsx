import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Protocol Mind // Cognitive OS",
    description: "Engineering critical thinking and mental clarity. The Cognitive Operating System (Concept Phase).",
};

export default function ProtocolMindLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
