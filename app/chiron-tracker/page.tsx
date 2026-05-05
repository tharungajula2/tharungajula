import { cookies } from 'next/headers';
import { getChironData } from '@/lib/chiron-parser';
import MissionControl from '@/components/chiron/MissionControl';
import PinPad from '@/components/chiron/PinPad';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CHIRON | Mission Control',
  robots: { index: false, follow: false },
};

// Disable static caching — always read live markdown files
export const dynamic = 'force-dynamic';

export default async function ChironTrackerPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('chiron_auth');
  const isAuthenticated = authCookie?.value === 'CHIRON_UNLOCKED';

  if (!isAuthenticated) {
    return <PinPad />;
  }

  const data = await getChironData();

  return <MissionControl data={data} />;
}
