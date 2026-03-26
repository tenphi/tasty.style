'use client';

import dynamic from 'next/dynamic';

const PlaygroundClient = dynamic(
  () => import('./components/PlaygroundClient'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 64px)',
          color: 'var(--primary-text-color)',
          backgroundColor: 'var(--primary-surface-color)',
          fontFamily: 'var(--font-sans), sans-serif',
          fontSize: '16px',
        }}
      >
        Loading playground…
      </div>
    ),
  },
);

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
