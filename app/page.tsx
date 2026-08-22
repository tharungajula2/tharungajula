"use client";

import { useLayout } from "./LayoutContext";
import SplineAvatar from "@/components/SplineAvatar";

export const dynamic = 'force-dynamic';

export default function Home() {
  const { isChatOpen, setIsChatOpen } = useLayout();

  return (
    <SplineAvatar 
      onTalkClick={() => setIsChatOpen(true)} 
      isChatOpen={isChatOpen} 
    />
  );
}
