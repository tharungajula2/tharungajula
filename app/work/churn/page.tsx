"use client";

import { Suspense } from "react";
import ChurnMasterclass from "../_components/churn/ChurnMasterclass";

export const dynamic = 'force-dynamic';

export default function ChurnPage() {
  return (
    <Suspense fallback={null}>
      <ChurnMasterclass />
    </Suspense>
  );
}
