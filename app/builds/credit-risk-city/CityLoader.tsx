'use client';

import '@/lib/patch-react19-drei';
import dynamic from 'next/dynamic';

const CityApp = dynamic(() => import('@/features/credit-risk-city/CityApp'), {
  ssr: false,
  loading: () => <p className="px-4 py-8 text-sm text-ink-muted">Loading the city…</p>,
});

export default function CityLoader() {
  return <CityApp />;
}
