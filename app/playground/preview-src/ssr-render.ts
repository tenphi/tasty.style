/**
 * Build-time SSR entry. Bundled by esbuild (platform=node) and imported by
 * scripts/build-playground-previews.mjs to pre-render each playground example
 * to static HTML + CSS + Tasty cache state.
 *
 * Runs in its own Node process/realm, so importing default-config.ts calls
 * `configure()` with the playground tokens — fully isolated from the site's
 * Tasty config (which matters because `configure()` is locked after first
 * render).
 */
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleCollector, runWithCollector } from '@tenphi/tasty/ssr';

import '../examples/default-config';
import { exampleSlugs, exampleModules } from './example-map';
import { splitCSS, type CssSections } from '../lib/reorder-css';
import { prettifyHTML } from '../lib/prettify-html';

export interface RenderResult {
  slug: string;
  /** Inner HTML for <div id="app">. */
  html: string;
  /** Full generated CSS (tokens + element rules + @property + @keyframes). */
  css: string;
  /** Class names rendered on the server — crossed to the client via
   *  window.__TASTY__ for hydration (see @tenphi/tasty/ssr/astro-client). */
  classList: string[];
  cssSections: CssSections;
  htmlOutput: string;
  /** True when SSR threw — the playground falls back to live WebContainer. */
  liveOnly: boolean;
}

export async function renderAll(): Promise<Record<string, RenderResult>> {
  const out: Record<string, RenderResult> = {};

  for (const slug of exampleSlugs) {
    try {
      const App = exampleModules[slug]?.App;
      if (!App) {
        throw new Error(`No App export found for example "${slug}"`);
      }

      const collector = new ServerStyleCollector();
      const html = await runWithCollector(collector, () =>
        renderToString(createElement(App)),
      );
      const css = collector.getCSS();
      const classList = collector.getRenderedClassNames();

      out[slug] = {
        slug,
        html,
        css,
        classList,
        cssSections: splitCSS(css),
        htmlOutput: prettifyHTML(html),
        liveOnly: false,
      };
    } catch (err) {
      console.error(`[previews] SSR failed for "${slug}":`, err);
      out[slug] = {
        slug,
        html: '',
        css: '',
        classList: [],
        cssSections: { elements: '', tokens: '', utility: '' },
        htmlOutput: '',
        liveOnly: true,
      };
    }
  }

  return out;
}
