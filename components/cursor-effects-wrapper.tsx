'use client';

import dynamic from 'next/dynamic';

const CursorEffects = dynamic(
  () => import('@/components/cursor-effects').then((mod) => mod.CursorEffects),
  { ssr: false }
);

export default function CursorEffectsWrapper() {
  return <CursorEffects />;
}