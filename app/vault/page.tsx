import VaultPage from "@/components/vault/VaultPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vault",
  description: "A protected space for the flagship build.",
};

export const dynamic = 'force-dynamic';

export default function Vault() {
  return <VaultPage />;
}
