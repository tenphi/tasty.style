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
          height: 'calc(100dvh - 64px)',
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
  return (
    <main id="button">
      <h1
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        Tasty Playground
      </h1>
      <PlaygroundClient />
    </main>
  );
}
