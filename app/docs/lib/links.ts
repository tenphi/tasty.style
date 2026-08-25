export type MarkdownSourceRoot = 'root' | 'docs';

const EXTERNAL_OR_SPECIAL = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;

function splitSuffix(value: string): { pathname: string; suffix: string } {
  const index = value.search(/[?#]/);

  if (index === -1) return { pathname: value, suffix: '' };

  return {
    pathname: value.slice(0, index),
    suffix: value.slice(index),
  };
}

export function rewriteDocsHref(
  href: string | undefined,
  sourceRoot: MarkdownSourceRoot,
): string | undefined {
  if (!href || href.startsWith('#') || EXTERNAL_OR_SPECIAL.test(href)) {
    return href;
  }

  if (href.startsWith('/')) return href;

  const { pathname, suffix } = splitSuffix(href);
  const cleaned = pathname.replace(/^\.\//, '');

  if (sourceRoot === 'root' && cleaned === 'LICENSE') {
    return 'https://github.com/tenphi/tasty/blob/main/LICENSE';
  }

  if (sourceRoot === 'docs' && cleaned.startsWith('../src/')) {
    return `https://github.com/tenphi/tasty/tree/main/${cleaned.slice(3)}${suffix}`;
  }

  if (
    cleaned === 'README.md' ||
    cleaned === '../README.md' ||
    cleaned === 'docs/README.md'
  ) {
    return `/docs${suffix}`;
  }

  const docsPath =
    sourceRoot === 'root' ? cleaned.replace(/^docs\//, '') : cleaned;
  const route = docsPath.replace(/\.md$/, '').replace(/^\.\.\//, '');

  return `/docs/${route}${suffix}`;
}

export function rewriteDocsImageSrc(
  src: string | undefined,
): string | undefined {
  if (!src || EXTERNAL_OR_SPECIAL.test(src) || src.startsWith('/')) {
    return src;
  }

  return `/${src.replace(/^(?:\.\.\/|\.\/)+/, '')}`;
}
