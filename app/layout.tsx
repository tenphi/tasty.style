import type { Metadata } from 'next';

import '@/public/tasty.css';
import './global-styles';
import TastyStyleRegistry from './tasty-registry';

export const metadata: Metadata = {
  title: 'Tasty — The Styling Engine Built for Design Systems',
  description:
    'Deterministic CSS generation. State-aware DSL. Zero specificity conflicts. Ever.',
};

const THEME_RESTORE_SCRIPT = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.dataset.schema = t;
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_RESTORE_SCRIPT }} />
      </head>
      <body>
        <TastyStyleRegistry>{children}</TastyStyleRegistry>
      </body>
    </html>
  );
}
