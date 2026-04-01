import ServerCodeBlock from '@/app/ui/ServerCodeBlock';
import TokenShowcaseClient from './TokenShowcaseClient';

const CORE_TOKENS_CODE = `configure({
  tokens: {
    '$gap': '8px',
    '$radius': '10px',
    '$border-width': '1px',
    '#surface': {
      '': '#fff',
      '@dark': 'okhsl(255 18% 12%)',
    },
    '#text': {
      '': 'okhsl(255 12% 16%)',
      '@dark': 'okhsl(255 15% 96%)',
    },
    '#primary': {
      '': 'okhsl(272 75% 55%)',
      '@dark': 'okhsl(272 70% 72%)',
    },
  },
});`;

const SEMANTIC_TOKENS_CODE = `const violet = glaze(272, 75);

violet.colors({
  surface: {
    lightness: 98, saturation: 0.2,
  },
  text: {
    base: 'surface', lightness: '-62',
    contrast: 'AAA', saturation: 0.08,
  },
  'accent-surface': {
    lightness: 52, mode: 'fixed',
  },
  'shadow-md': {
    type: 'shadow', bg: 'surface',
    fg: 'text', intensity: 12,
  },
});`;

export default function TokenShowcase() {
  return (
    <TokenShowcaseClient
      coreTokensBlock={
        <ServerCodeBlock radius="0 1cr 1cr 1cr" lang="tsx">
          {CORE_TOKENS_CODE}
        </ServerCodeBlock>
      }
      semanticTokensBlock={
        <ServerCodeBlock radius="0 1cr 1cr 1cr" lang="tsx">
          {SEMANTIC_TOKENS_CODE}
        </ServerCodeBlock>
      }
    />
  );
}
