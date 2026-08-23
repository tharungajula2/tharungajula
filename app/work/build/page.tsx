"use client";

import { Suspense } from "react";
import BuildMasterclass from "../_components/build/BuildMasterclass";

export const dynamic = 'force-dynamic';

export default function BuildPage() {
  return (
    <Suspense fallback={null}>
      <BuildMasterclass />
    </Suspense>
  );
}
