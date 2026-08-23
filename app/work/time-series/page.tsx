"use client";

import { Suspense } from "react";
import TimeSeriesMasterclass from "../_components/time-series/TimeSeriesMasterclass";

export const dynamic = 'force-dynamic';

export default function TimeSeriesPage() {
  return (
    <Suspense fallback={null}>
      <TimeSeriesMasterclass />
    </Suspense>
  );
}
