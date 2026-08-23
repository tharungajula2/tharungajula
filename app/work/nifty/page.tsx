"use client";

import { Suspense } from "react";
import NiftyMasterclass from "../_components/nifty/NiftyMasterclass";

export const dynamic = 'force-dynamic';

export default function NiftyPage() {
  return (
    <Suspense fallback={null}>
      <NiftyMasterclass />
    </Suspense>
  );
}
