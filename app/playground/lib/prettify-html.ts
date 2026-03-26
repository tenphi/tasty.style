const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

export function prettifyHTML(html: string): string {
  if (!html?.trim()) return '';

  const result: string[] = [];
  let indent = 0;
  let i = 0;

  while (i < html.length) {
    if (html[i] === '<') {
      const end = html.indexOf('>', i);
      if (end === -1) {
        result.push('  '.repeat(indent) + html.slice(i));
        break;
      }

      const tag = html.slice(i, end + 1);
      const isClosing = tag.startsWith('</');
      const isSelfClosing = tag.endsWith('/>');
      const tagName = tag
        .replace(/^<\/?/, '')
        .replace(/[\s/>].*/, '')
        .toLowerCase();
      const isVoid = VOID_ELEMENTS.has(tagName);

      if (isClosing) {
        indent = Math.max(0, indent - 1);
      }

      result.push('  '.repeat(indent) + tag);

      if (!isClosing && !isSelfClosing && !isVoid && tagName) {
        indent++;
      }

      i = end + 1;
    } else {
      const nextTag = html.indexOf('<', i);
      const text = nextTag === -1 ? html.slice(i) : html.slice(i, nextTag);
      const trimmed = text.trim();

      if (trimmed) {
        result.push('  '.repeat(indent) + trimmed);
      }

      i = nextTag === -1 ? html.length : nextTag;
    }
  }

  return result.join('\n');
}
