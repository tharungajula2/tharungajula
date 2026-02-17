import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Protocol Family // The Family Health OS",
    description: "The Fortress Architecture. A Context-Aware Engine for Families to manage Medical Records, Logistics, and Environmental Engineering.",
};

export default function ProtocolFamilyOSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
