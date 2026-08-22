"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import WorkOverview from "@/components/WorkOverview";
import WorkGallery from "@/components/WorkGallery";

export const dynamic = 'force-dynamic';

function WorkContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "product-lab";

  return (
    <>
      {tab === "overview" && <WorkOverview />}
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
