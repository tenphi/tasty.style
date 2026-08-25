import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import puppeteer from 'puppeteer';

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const OUT_DIR = path.join(ROOT, 'out');
const ROUTES = [
  '/',
  '/docs',
  '/docs/getting-started',
  '/docs/comparison',
  '/playground',
];
const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1280, height: 720 },
];

const CONTENT_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

function resolveFile(pathname) {
  const relative = decodeURIComponent(pathname).replace(/^\/+/, '');
  const candidates = relative
    ? [
        path.join(OUT_DIR, relative),
        path.join(OUT_DIR, `${relative}.html`),
        path.join(OUT_DIR, relative, 'index.html'),
      ]
    : [path.join(OUT_DIR, 'index.html')];

  return candidates.find(
    (candidate) =>
      candidate.startsWith(OUT_DIR) &&
      existsSync(candidate) &&
      statSync(candidate).isFile(),
  );
}

function startServer() {
  const server = createServer((request, response) => {
    const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
    const file = resolveFile(pathname);

    response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    response.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');

    if (!file) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    response.writeHead(200, {
      'content-type':
        CONTENT_TYPES[path.extname(file)] ?? 'application/octet-stream',
    });
    createReadStream(file).pipe(response);
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function inspectRoute(browser, baseUrl, route, viewport) {
  const page = await browser.newPage();
  const consoleProblems = [];
  const failedResources = [];

  page.on('console', (message) => {
    if (message.type() === 'warning' || message.type() === 'error') {
      consoleProblems.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on('pageerror', (error) =>
    consoleProblems.push(`pageerror: ${error.message}`),
  );
  page.on('response', (response) => {
    if (response.status() >= 400) {
      failedResources.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const hostname = new URL(request.url()).hostname;
    if (hostname === 'gc.zgo.at') {
      request.respond({
        status: 200,
        contentType: 'text/javascript',
        body: 'window.goatcounter={count:function(){},bind_events:function(){}};',
      });
    } else if (hostname.endsWith('.goatcounter.com')) {
      request.respond({ status: 204, body: '' });
    } else {
      request.continue();
    }
  });

  await page.setViewport({ width: viewport.width, height: viewport.height });
  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'reduce' },
  ]);
  await page.goto(`${baseUrl}${route}`, {
    waitUntil: 'networkidle0',
    timeout: 30_000,
  });

  if (route === '/playground') {
    await page.waitForSelector('iframe[title="Playground preview"]', {
      timeout: 20_000,
    });
    await page.waitForSelector('.cm-editor', { timeout: 20_000 });
  }

  const result = await page.evaluate(() => {
    const h1s = [...document.querySelectorAll('h1')];
    const unnamedSelects = [...document.querySelectorAll('select')].filter(
      (element) =>
        !element.getAttribute('aria-label') &&
        !element.getAttribute('aria-labelledby') &&
        !element.labels?.length,
    );
    const unnamedButtons = [...document.querySelectorAll('button')].filter(
      (element) =>
        !element.innerText.trim() &&
        !element.getAttribute('aria-label') &&
        !element.getAttribute('aria-labelledby') &&
        !element.getAttribute('title'),
    );
    const unnamedFrames = [...document.querySelectorAll('iframe')].filter(
      (element) => !element.getAttribute('title'),
    );
    const unnamedSeparators = [
      ...document.querySelectorAll('[role="separator"]'),
    ].filter(
      (element) =>
        !element.getAttribute('aria-label') &&
        !element.getAttribute('aria-labelledby'),
    );
    const unnamedEditors = [
      ...document.querySelectorAll('.cm-content[contenteditable="true"]'),
    ].filter(
      (element) =>
        !element.getAttribute('aria-label') &&
        !element.getAttribute('aria-labelledby'),
    );

    return {
      h1Count: h1s.length,
      h1Text: h1s.map((heading) => heading.innerText.trim()).filter(Boolean),
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      overflowElements: [...document.querySelectorAll('body *')]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName.toLowerCase(),
            id: element.id,
            className:
              typeof element.className === 'string' ? element.className : '',
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            scrollWidth: element.scrollWidth,
          };
        })
        .filter(
          (element) =>
            element.right > document.documentElement.clientWidth + 1 ||
            element.left < -1,
        )
        .slice(0, 10),
      unnamedSelects: unnamedSelects.length,
      unnamedButtons: unnamedButtons.length,
      unnamedFrames: unnamedFrames.length,
      unnamedSeparators: unnamedSeparators.length,
      unnamedEditors: unnamedEditors.length,
    };
  });

  const label = `${route} (${viewport.name})`;
  assert(
    result.h1Count === 1,
    `${label}: expected one h1, found ${result.h1Count}`,
  );
  assert(result.h1Text.length === 1, `${label}: h1 has no useful text`);
  assert(
    result.scrollWidth <= result.clientWidth + 1,
    `${label}: horizontal overflow (${result.scrollWidth}px > ${result.clientWidth}px): ${JSON.stringify(result.overflowElements)}`,
  );
  assert(
    result.unnamedSelects === 0,
    `${label}: found unnamed select controls`,
  );
  assert(result.unnamedButtons === 0, `${label}: found unnamed icon buttons`);
  assert(result.unnamedFrames === 0, `${label}: found unnamed iframes`);
  assert(
    result.unnamedSeparators === 0,
    `${label}: found unnamed resize handles`,
  );
  assert(result.unnamedEditors === 0, `${label}: found unnamed code editors`);
  assert(
    consoleProblems.length === 0,
    `${label}: console problems:\n${consoleProblems.join('\n')}\n${failedResources.join('\n')}`,
  );

  await page.keyboard.press('Tab');
  const focusMoved = await page.evaluate(
    () => document.activeElement !== document.body,
  );
  assert(focusMoved, `${label}: keyboard focus did not enter the page`);
  await page.close();
}

if (!existsSync(OUT_DIR)) {
  throw new Error('Missing out/. Run `pnpm build` before `pnpm test:browser`.');
}

const server = await startServer();
const address = server.address();
const port = typeof address === 'object' && address ? address.port : 0;
const baseUrl = `http://127.0.0.1:${port}`;
const browser = await puppeteer.launch({
  headless: 'shell',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  for (const viewport of VIEWPORTS) {
    for (const route of ROUTES) {
      await inspectRoute(browser, baseUrl, route, viewport);
      console.log(`✓ ${route} (${viewport.name})`);
    }
  }

  console.log(
    `Browser smoke checks passed for ${ROUTES.length * VIEWPORTS.length} route/viewport pairs.`,
  );
} finally {
  await browser.close();
  await new Promise((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
}
