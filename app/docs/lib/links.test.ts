import assert from 'node:assert/strict';
import test from 'node:test';

import { rewriteDocsHref, rewriteDocsImageSrc } from './links.ts';

test('rewrites links from the package README', () => {
  assert.equal(
    rewriteDocsHref('docs/getting-started.md', 'root'),
    '/docs/getting-started',
  );
  assert.equal(
    rewriteDocsHref('docs/react-api.md#style-props', 'root'),
    '/docs/react-api#style-props',
  );
  assert.equal(rewriteDocsHref('docs/README.md', 'root'), '/docs');
  assert.equal(
    rewriteDocsHref('LICENSE', 'root'),
    'https://github.com/tenphi/tasty/blob/main/LICENSE',
  );
});

test('rewrites links from files in the docs directory', () => {
  assert.equal(rewriteDocsHref('README.md', 'docs'), '/docs');
  assert.equal(rewriteDocsHref('../README.md', 'docs'), '/docs');
  assert.equal(
    rewriteDocsHref('./react-api.md#style-props', 'docs'),
    '/docs/react-api#style-props',
  );
  assert.equal(
    rewriteDocsHref('../src/pipeline/', 'docs'),
    'https://github.com/tenphi/tasty/tree/main/src/pipeline/',
  );
});

test('preserves anchors, routes, and external links', () => {
  assert.equal(rewriteDocsHref('#configuration', 'docs'), '#configuration');
  assert.equal(
    rewriteDocsHref('/playground#button', 'docs'),
    '/playground#button',
  );
  assert.equal(
    rewriteDocsHref('https://github.com/tenphi/tasty', 'docs'),
    'https://github.com/tenphi/tasty',
  );
  assert.equal(
    rewriteDocsHref('mailto:hello@example.com', 'docs'),
    'mailto:hello@example.com',
  );
});

test('rewrites local images without touching remote or root paths', () => {
  assert.equal(rewriteDocsImageSrc('assets/tasty.svg'), '/assets/tasty.svg');
  assert.equal(rewriteDocsImageSrc('../assets/tasty.svg'), '/assets/tasty.svg');
  assert.equal(rewriteDocsImageSrc('/tasty.svg'), '/tasty.svg');
  assert.equal(
    rewriteDocsImageSrc('https://example.com/tasty.svg'),
    'https://example.com/tasty.svg',
  );
});
