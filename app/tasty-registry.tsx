'use client';

import './tasty-config';

import { TastyRegistry } from '@tenphi/tasty/ssr/next';
import { ThemeProvider } from './components/ThemeContext';

export default function TastyStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TastyRegistry>
      <ThemeProvider>{children}</ThemeProvider>
    </TastyRegistry>
  );
}
