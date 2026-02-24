import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Biology OS // The Knowledge OS: Clinical Biology",
    description: "A rigorous academic approach to decoding the human organism. Clinical Biochemistry, Systems Physiology, and Bio-optimization for the individual.",
};

export default function ProtocolN1Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
