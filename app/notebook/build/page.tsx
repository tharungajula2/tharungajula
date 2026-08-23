"use client";

import { Suspense } from "react";
import BuildMasterclass from "@/app/work/_components/build/BuildMasterclass";

export const dynamic = 'force-dynamic';

export default function NotebookBuildPage() {
  return (
    <Suspense fallback={null}>
      <BuildMasterclass />
    </Suspense>
  );
}
