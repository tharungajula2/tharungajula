"use client";

import { Suspense } from "react";
import CreditRiskMasterclass from "../_components/credit-risk/CreditRiskMasterclass";

export const dynamic = 'force-dynamic';

export default function CreditRiskPage() {
  return (
    <Suspense fallback={null}>
      <CreditRiskMasterclass />
    </Suspense>
  );
}
