"use client";

import { Suspense } from "react";
import ChurnMasterclass from "@/app/work/_components/churn/ChurnMasterclass";

export const dynamic = 'force-dynamic';

export default function NotebookChurnPage() {
  return (
    <Suspense fallback={null}>
      <ChurnMasterclass />
    </Suspense>
  );
}
