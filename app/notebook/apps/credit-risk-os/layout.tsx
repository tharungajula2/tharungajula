import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Renforge Credit Risk OS | Tharun Gajula',
  description:
    'Interactive UK regulated-bank simulation connecting credit risk, IFRS 9, regulatory capital, Treasury, regulatory reporting, BCBS 239 data lineage and Business Analysis delivery.',
  openGraph: {
    title: 'Renforge Credit Risk OS | Tharun Gajula',
    description:
      'Interactive UK regulated-bank simulation connecting credit risk, IFRS 9, regulatory capital, Treasury, regulatory reporting, BCBS 239 data lineage and Business Analysis delivery.',
    url: 'https://tharungajula.com/notebook/apps/credit-risk-os',
    siteName: 'Tharun Gajula Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renforge Credit Risk OS | Tharun Gajula',
    description:
      'Interactive UK regulated-bank simulation connecting credit risk, IFRS 9, regulatory capital, Treasury, regulatory reporting, BCBS 239 data lineage and Business Analysis delivery.',
  },
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
