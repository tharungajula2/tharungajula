import type { Metadata } from 'next';
import './_theme/theme.css';

export const metadata: Metadata = {
  title: 'Credit Risk OS 2.0 | India Banking Risk & Transformation Workbench',
  description:
    'Standalone enterprise banking risk and transformation workbench for Credit Risk, Ind AS 109, RBI Basel III/3.1 capital, Treasury, BCBS 239 lineage and Business Analysis delivery.',
  openGraph: {
    title: 'Credit Risk OS 2.0 | India Banking Risk & Transformation Workbench',
    description:
      'Standalone enterprise banking risk and transformation workbench for Credit Risk, Ind AS 109, RBI Basel III/3.1 capital, Treasury, BCBS 239 lineage and Business Analysis delivery.',
    url: 'https://tharungajula.com/notebook/apps/credit-risk-os',
    siteName: 'Credit Risk OS 2.0',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Risk OS 2.0 | India Banking Risk & Transformation Workbench',
    description:
      'Standalone enterprise banking risk and transformation workbench for Credit Risk, Ind AS 109, RBI Basel III/3.1 capital, Treasury, BCBS 239 lineage and Business Analysis delivery.',
  },
};

export default function CreditRiskOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="credit-risk-os-root w-full min-h-screen bg-[#0b0f19] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {children}
    </div>
  );
}
