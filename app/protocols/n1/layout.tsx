import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Protocol N=1 // The Biology Academy",
    description: "A rigorous academic approach to decoding the human organism. Clinical Biochemistry, Systems Physiology, and Bio-optimization for the individual.",
};

export default function ProtocolN1Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
