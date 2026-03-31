import type { Metadata } from 'next';
import Header from '@/app/components/Header';

export const metadata: Metadata = {
  title: 'Playground — Tasty',
  description:
    'Interactive playground for Tasty — write styled React components and see live CSS output.',
  alternates: {
    canonical: '/playground',
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
