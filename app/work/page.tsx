"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LearningOS from "./_components/LearningOS";
import CreditRiskMasterclass from "./_components/credit-risk/CreditRiskMasterclass";
import WorkGallery from "@/components/WorkGallery";

export const dynamic = 'force-dynamic';

function WorkContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "product-lab";

  return (
    <>
      {tab === "overview" && <LearningOS />}
      {tab === "product-lab" && <WorkGallery type="product_lab" />}
      {tab === "analytics-quant" && <WorkGallery type="analytics_quant" />}
      {tab === "credit-risk" && <CreditRiskMasterclass />}
    </>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <WorkContent />
    </Suspense>
  );
}
