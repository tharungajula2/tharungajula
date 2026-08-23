"use client";

import { Suspense } from "react";
import ClientEquityMasterclass from "@/app/work/_components/client-equity/ClientEquityMasterclass";

export const dynamic = 'force-dynamic';

export default function NotebookClientEquityPage() {
  return (
    <Suspense fallback={null}>
      <ClientEquityMasterclass />
    </Suspense>
  );
}
