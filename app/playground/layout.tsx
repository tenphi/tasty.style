import type { Metadata, Viewport } from 'next';
import Header from '@/app/components/Header';

export const metadata: Metadata = {
  title: 'Playground — Tasty',
  description:
    'Interactive playground for Tasty — write styled React components and see live CSS output.',
  alternates: {
    canonical: '/playground',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-playground="">
      <Header />
      {children}
    </div>
  );
}
