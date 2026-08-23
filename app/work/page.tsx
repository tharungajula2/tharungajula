"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LearningOS from "./_components/LearningOS";
import CreditRiskMasterclass from "./_components/credit-risk/CreditRiskMasterclass";
import ChurnMasterclass from "./_components/churn/ChurnMasterclass";
import TimeSeriesMasterclass from "./_components/time-series/TimeSeriesMasterclass";
import NiftyMasterclass from "./_components/nifty/NiftyMasterclass";
import ClientEquityMasterclass from "./_components/client-equity/ClientEquityMasterclass";
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
      {tab === "churn" && <ChurnMasterclass />}
      {tab === "time-series" && <TimeSeriesMasterclass />}
      {tab === "nifty" && <NiftyMasterclass />}
      {tab === "client-equity" && <ClientEquityMasterclass />}
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
