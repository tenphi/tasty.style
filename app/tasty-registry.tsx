'use client';

import './tasty-config';

import { TastyRegistry } from '@tenphi/tasty/ssr/next';

export default function TastyStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TastyRegistry>{children}</TastyRegistry>;
}
