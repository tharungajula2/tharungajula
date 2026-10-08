import { Metadata } from 'next';
import { getSortedDocumentsData } from '@/lib/notes/markdown';
import { HomeViewContainer } from '@/components/notes/HomeViewContainer';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Learning out loud. AI first, plus finance, health and now and then, life. One subject at a time, explained badly until it isn\'t.',
  alternates: {
    canonical: '/notes',
  },
  openGraph: {
    type: 'website',
    url: '/notes',
    title: 'Notes — Tharun Gajula',
    description: 'Learning out loud. AI first, plus finance, health and now and then, life. One subject at a time, explained badly until it isn\'t.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tharun Gajula — Notes' }],
  },
};

export default function NotesPage() {
  const documents = getSortedDocumentsData();
  return <HomeViewContainer documents={documents} />;
}
