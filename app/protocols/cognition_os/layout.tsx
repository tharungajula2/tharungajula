import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Protocol Cognition // The Cognitive OS",
    description: "The Operator's Mind is the primary leverage. A synthesis of Mental Models and High-Velocity Information Architecture to engineer the 'Software' (Cognition) required to run the 'Hardware' (Biology).",
};

export default function ProtocolCognitionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
