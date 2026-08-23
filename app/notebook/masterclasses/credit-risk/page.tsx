"use client";

import { Suspense } from "react";
import CreditRiskMasterclass from "@/app/work/_components/credit-risk/CreditRiskMasterclass";

export const dynamic = 'force-dynamic';

export default function NotebookCreditRiskPage() {
  return (
    <Suspense fallback={null}>
      <CreditRiskMasterclass />
    </Suspense>
  );
}
