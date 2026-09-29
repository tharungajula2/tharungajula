'use client';

import { useState } from 'react';
import type { DistrictId } from '../content/types';
import { Button } from './primitives';
import HomePanel from './HomePanel';
import LessonReader from './lesson/LessonReader';

/** The 2D fallback: the reading path and the same lesson reader, without the 3D city. */
export default function ListApp({ onOpen3D }: { onOpen3D?: () => void }) {
  const [lesson, setLesson] = useState<DistrictId | null>(null);
  return (
    <div className="relative min-h-full">
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-semibold">Credit Risk City</h1>
          {onOpen3D && <Button variant="ghost" onClick={onOpen3D}>Open the 3D city</Button>}
        </div>
        <HomePanel onRead={setLesson} />
      </div>
      {lesson && (
        <div className="fixed inset-x-0 bottom-0 top-14 z-40 sm:top-16">
          <LessonReader district={lesson} onClose={() => setLesson(null)} onOpen={setLesson} />
        </div>
      )}
    </div>
  );
}
