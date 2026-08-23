"use client";

import { Suspense } from "react";
import LocIqMasterclass from "@/app/work/_components/loc-iq/LocIqMasterclass";

export const dynamic = 'force-dynamic';

export default function NotebookLocIqPage() {
  return (
    <Suspense fallback={null}>
      <LocIqMasterclass />
    </Suspense>
  );
}
