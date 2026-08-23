"use client";

import { Suspense } from "react";
import TimeSeriesMasterclass from "@/app/work/_components/time-series/TimeSeriesMasterclass";

export const dynamic = 'force-dynamic';

export default function NotebookTimeSeriesPage() {
  return (
    <Suspense fallback={null}>
      <TimeSeriesMasterclass />
    </Suspense>
  );
}
