"use client";

import { Suspense } from "react";
import NiftyMasterclass from "@/app/work/_components/nifty/NiftyMasterclass";

export const dynamic = 'force-dynamic';

export default function NotebookNiftyPage() {
  return (
    <Suspense fallback={null}>
      <NiftyMasterclass />
    </Suspense>
  );
}
