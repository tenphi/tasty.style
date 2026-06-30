/**
 * Browser hydration entry for the prebuilt playground preview.
 *
 * Bundled by esbuild (platform=browser, format=esm) and loaded via
 * <script type="module" src="/playground/preview/hydrate.js"> inside each
 * prebuilt <slug>.html. Runs in the iframe's own JS realm, so
 * default-config.ts calls `configure()` fresh with the playground tokens —
 * fully isolated from the host site's Tasty config.
 */
import { createElement } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { tastyDebug } from '@tenphi/tasty';

// Browser-safe hydration: importing the astro-client entry auto-populates the
// injector cache from window.__TASTY__ (the class list emitted in the prebuilt
// HTML), so computeStyles() hits the cache during hydration. This path does
// NOT import node:async_hooks, unlike the main @tenphi/tasty/ssr entry.
import '@tenphi/tasty/ssr/astro-client';

import '../examples/default-config';
import { exampleModules } from './example-map';

declare global {
  interface Window {
    __PLAYGROUND_SLUG__?: string;
    __getPlaygroundCSS?: () => string;
    __getPlaygroundHTML?: () => string;
  }
}

function applyRootAttr(name: string, value: string | null) {
  if (value) {
    document.documentElement.setAttribute('data-' + name, value);
  } else {
    document.documentElement.removeAttribute('data-' + name);
  }
}

window.addEventListener('message', (event) => {
  if (event.data?.type === 'tasty-playground-root-states') {
    applyRootAttr('schema', event.data.schema ?? null);
    applyRootAttr('contrast', event.data.contrast ?? null);
  }
});
window.parent.postMessage(
  { type: 'tasty-playground-request-root-states' },
  '*',
);

// hydrateTastyClasses() ran on import of @tenphi/tasty/ssr/astro-client,
// reading the class list from window.__TASTY__ set in the prebuilt HTML.

const slug = window.__PLAYGROUND_SLUG__ ?? '';
const App = exampleModules[slug]?.App;
const rootEl = document.getElementById('app');
if (App && rootEl) {
  hydrateRoot(rootEl, createElement(App));
}

window.__getPlaygroundCSS = () => {
  try {
    return tastyDebug.css('all', { raw: true, prettify: true });
  } catch {
    return '';
  }
};
window.__getPlaygroundHTML = () => rootEl?.innerHTML ?? '';

let debounceTimer: ReturnType<typeof setTimeout> | undefined;
function sendUpdate() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    let css: string;
    let html: string;
    try {
      css = window.__getPlaygroundCSS?.() ?? '';
    } catch (e) {
      css = '/* Error collecting CSS: ' + (e as Error).message + ' */';
    }
    try {
      html = window.__getPlaygroundHTML?.() ?? '';
    } catch (e) {
      html = '<!-- Error collecting HTML: ' + (e as Error).message + ' -->';
    }
    window.parent.postMessage(
      { type: 'tasty-playground-update', css, html },
      '*',
    );
  }, 150);
}

const observer = new MutationObserver(sendUpdate);
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true,
});
setTimeout(sendUpdate, 300);
window.addEventListener('load', () => setTimeout(sendUpdate, 500));
