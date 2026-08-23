"use client";

import { Suspense } from "react";
import ClientEquityMasterclass from "../_components/client-equity/ClientEquityMasterclass";

export const dynamic = 'force-dynamic';

export default function ClientEquityPage() {
  return (
    <Suspense fallback={null}>
      <ClientEquityMasterclass />
    </Suspense>
  );
}
