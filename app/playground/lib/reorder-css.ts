export interface CssSections {
  elements: string;
  tokens: string;
  utility: string;
}

/**
 * Split generated CSS into three categories:
 * - elements: component class rules (.t0, .t1, …)
 * - tokens: :root and body declarations (design tokens)
 * - utility: @property and @keyframes at-rules
 */
export function splitCSS(css: string): CssSections {
  if (!css) return { elements: '', tokens: '', utility: '' };

  const elements: string[] = [];
  const tokens: string[] = [];
  const utility: string[] = [];

  let i = 0;
  while (i < css.length) {
    while (i < css.length && /\s/.test(css[i])) i++;
    if (i >= css.length) break;

    const blockEnd = findBlockEnd(css, i);
    const chunk = css.slice(i, blockEnd).trim();
    i = blockEnd;

    if (!chunk) continue;

    if (chunk.startsWith('@property ') || chunk.startsWith('@keyframes ')) {
      utility.push(chunk);
    } else if (
      chunk.startsWith(':root') ||
      chunk.startsWith('body') ||
      chunk.startsWith('html') ||
      (chunk.startsWith('@media') && /\s:root[\s:{[)]/m.test(chunk))
    ) {
      tokens.push(chunk);
    } else {
      elements.push(chunk);
    }
  }

  return {
    elements: elements.join('\n'),
    tokens: tokens.join('\n'),
    utility: utility.join('\n'),
  };
}

function findBlockEnd(css: string, start: number): number {
  let depth = 0;
  let i = start;

  while (i < css.length) {
    const ch = css[i];
    if (ch === '{') {
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) return i + 1;
    }
    i++;
  }

  return css.length;
}
