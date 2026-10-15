import { satteri } from '@astrojs/markdown-satteri';
import cookbook from '@tenphi/cookbook';
import { defineConfig } from 'astro/config';
import type { ShikiConfig } from 'astro';
import tastyGrammar from '../app/lib/tasty.tmLanguage.json' with { type: 'json' };
import { stripReadmeHeader } from './strip-readme-header';

const tastyLang = {
  ...tastyGrammar,
  name: 'tasty',
  injectTo: ['source.tsx', 'source.ts', 'source.js', 'source.jsx'],
} as unknown as NonNullable<ShikiConfig['langs']>[number];

export default defineConfig({
  site: 'https://tasty.style',
  base: '/docs/',
  // Emits `guide.html` so pages keep their extensionless `/docs/guide` URLs.
  build: { format: 'file' },
  // Runs after `next build`, which recreates `out/`.
  outDir: '../out/docs',
  markdown: {
    processor: satteri({ mdastPlugins: [stripReadmeHeader] }),
    shikiConfig: { langs: [tastyLang] },
  },
  integrations: [cookbook()],
});
