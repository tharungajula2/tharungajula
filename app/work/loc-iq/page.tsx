"use client";

import { Suspense } from "react";
import LocIqMasterclass from "../_components/loc-iq/LocIqMasterclass";

export const dynamic = 'force-dynamic';

export default function LocIqPage() {
  return (
    <Suspense fallback={null}>
      <LocIqMasterclass />
    </Suspense>
  );
}
