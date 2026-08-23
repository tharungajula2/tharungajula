"use client";

import { use, Suspense } from "react";
import PortfolioMasterclassesAppShell from "@/components/masterclass/PortfolioMasterclassesAppShell";
import CreditRiskMasterclass from "@/app/work/_components/credit-risk/CreditRiskMasterclass";
import ChurnMasterclass from "@/app/work/_components/churn/ChurnMasterclass";
import TimeSeriesMasterclass from "@/app/work/_components/time-series/TimeSeriesMasterclass";
import NiftyMasterclass from "@/app/work/_components/nifty/NiftyMasterclass";
import ClientEquityMasterclass from "@/app/work/_components/client-equity/ClientEquityMasterclass";
import LocIqMasterclass from "@/app/work/_components/loc-iq/LocIqMasterclass";
import BuildMasterclass from "@/app/work/_components/build/BuildMasterclass";
import RapidRecall from "@/app/work/_components/recall/RapidRecall";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

function MasterclassContent({ slug }: { slug: string }) {
  let content = null;

  switch (slug) {
    case "credit-risk":
      content = <CreditRiskMasterclass />;
      break;
    case "churn":
      content = <ChurnMasterclass />;
      break;
    case "time-series":
      content = <TimeSeriesMasterclass />;
      break;
    case "nifty":
      content = <NiftyMasterclass />;
      break;
    case "client-equity":
      content = <ClientEquityMasterclass />;
      break;
    case "loc-iq":
      content = <LocIqMasterclass />;
      break;
    case "build":
      content = <BuildMasterclass />;
      break;
    case "recall":
      content = <RapidRecall />;
      break;
    default:
      notFound();
  }

  return (
    <PortfolioMasterclassesAppShell activeSlug={slug}>
      {content}
    </PortfolioMasterclassesAppShell>
  );
}

export default function PortfolioMasterclassSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  return (
    <Suspense fallback={null}>
      <MasterclassContent slug={resolvedParams.slug} />
    </Suspense>
  );
}
