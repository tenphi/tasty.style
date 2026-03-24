import type { Metadata } from 'next';

import './global-styles';
import TastyStyleRegistry from './tasty-registry';
import { onest, sourceCodePro } from './fonts';

export const metadata: Metadata = {
  title: 'Tasty — The Styling Engine Built for Design Systems',
  description:
    'Deterministic CSS generation. State-aware DSL. Zero specificity conflicts. Ever.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${onest.variable} ${sourceCodePro.variable}`}
    >
      <body>
        <TastyStyleRegistry>{children}</TastyStyleRegistry>
      </body>
    </html>
  );
}
