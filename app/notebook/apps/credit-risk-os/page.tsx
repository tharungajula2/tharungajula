"use client";

import { CreditRiskOSProvider } from './_state/creditRiskOSContext';
import Shell from './_components/shell/Shell';

export default function CreditRiskOSPage() {
  return (
    <CreditRiskOSProvider>
      <Shell />
    </CreditRiskOSProvider>
  );
}
