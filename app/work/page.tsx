"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LearningOS from "./_components/LearningOS";
import WorkGallery from "@/components/WorkGallery";

export const dynamic = 'force-dynamic';

function WorkContent() {
  const searchParams = useSearchParams();
  const rawTab = searchParams.get("tab");
  const tab = rawTab || "overview";

  return (
    <>
      {(tab === "overview" || !rawTab) && <LearningOS />}
      {tab === "product-lab" && <WorkGallery type="product_lab" />}
      {tab === "analytics-quant" && <WorkGallery type="analytics_quant" />}
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
