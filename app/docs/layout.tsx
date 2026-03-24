import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import DocsSidebar from './components/DocsSidebar';
import { DocsBody } from './components/DocsPageContent';
import { DocsSidebarProvider } from './components/DocsSidebarContext';

export const metadata: Metadata = {
  title: 'Docs — Tasty',
  description:
    'Documentation for Tasty — the styling engine built for design systems.',
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsSidebarProvider>
      <Header />
      <DocsBody>
        <DocsSidebar />
        {children}
      </DocsBody>
    </DocsSidebarProvider>
  );
}
