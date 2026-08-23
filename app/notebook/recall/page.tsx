"use client";

import { Suspense } from "react";
import RapidRecall from "@/app/work/_components/recall/RapidRecall";

export const dynamic = 'force-dynamic';

export default function NotebookRecallPage() {
  return (
    <Suspense fallback={null}>
      <RapidRecall />
    </Suspense>
  );
}
