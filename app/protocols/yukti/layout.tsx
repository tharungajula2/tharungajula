import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Protocol Yukti // The Family Health OS",
    description: "Solving the 'Broken Loop' of Indian Healthcare. A Context-Aware Engine for Families to manage Medical Records, Logistics, and Triage in Bangalore.",
};

export default function ProtocolYuktiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
