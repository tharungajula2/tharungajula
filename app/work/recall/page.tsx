"use client";

import { Suspense } from "react";
import RapidRecall from "../_components/recall/RapidRecall";

export const dynamic = 'force-dynamic';

export default function RecallPage() {
  return (
    <Suspense fallback={null}>
      <RapidRecall />
    </Suspense>
  );
}
