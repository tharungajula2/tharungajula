import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Renforge Credit Risk OS — UK Regulated Bank Simulation | Tharun Gajula',
  description: 'Full-screen interactive UK regulated bank workstation connecting credit risk, IFRS 9 staging, Basel III IRB capital, Treasury, regulatory reporting, data lineage, and BA change delivery.',
};

export default function CreditRiskOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="credit-risk-os-root w-full min-h-screen bg-surface text-ink antialiased">
      {children}
    </div>
  );
}
