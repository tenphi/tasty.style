'use client';

import { Fragment } from 'react';
import { tasty } from '@tenphi/tasty';
import { highlightCode } from '@/app/lib/shiki';
import { SYNTAX_COLOR_CLASSES } from '@/app/lib/shiki-theme';

export const DocH2 = tasty({
  as: 'h2',
  styles: {
    preset: 'h2',
    color: '#text-soft',
    margin: '4x 0 2x',
    padding: '1x 0 0',
    scrollMarginTop: '($header-height, 64px)',
  },
});

export const DocH3 = tasty({
  as: 'h3',
  styles: {
    preset: 'h3',
    color: '#text-soft',
    margin: '3x 0 1.5x',
    scrollMarginTop: '($header-height, 64px)',
  },
});

export const DocH4 = tasty({
  as: 'h4',
  styles: {
    preset: 'h4',
    color: '#text-soft',
    margin: '2x 0 1x',
    scrollMarginTop: '($header-height, 64px)',
  },
});

export const DocParagraph = tasty({
  as: 'p',
  styles: {
    preset: 't2',
    color: '#text',
    margin: '0 0 2x',
    '$t2-line-height': '1.7',
  },
});

export const DocBlockquote = tasty({
  as: 'blockquote',
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '1x',
    padding: '2x 3x',
    margin: '0 0 2x',
    fill: '#surface-2',
    border: 'left 3px solid #accent-surface',
    radius: '0 1r 1r 0',
    color: '#text-soft',
    preset: 't2',
  },
});

export const DocHr = tasty({
  as: 'hr',
  styles: {
    border: 'none',
    borderTop: '1bw solid #border',
    margin: '4x 0',
  },
});

export const DocUl = tasty({
  as: 'ul',
  styles: {
    preset: 't2',
    color: '#text',
    margin: '0 0 2x',
    padding: '0 0 0 3x',
    '$t2-line-height': '1.7',
  },
});

export const DocOl = tasty({
  as: 'ol',
  styles: {
    preset: 't2',
    color: '#text',
    margin: '0 0 2x',
    padding: '0 0 0 3x',
    '$t2-line-height': '1.7',
  },
});

export const DocLi = tasty({
  as: 'li',
  styles: {
    preset: 't2',
    margin: '0 0 0.5x',
    '$t2-line-height': '1.7',
  },
});

export const DocTable = tasty({
  as: 'table',
  styles: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '0 0 2x',
    preset: 't3',
    overflow: 'auto',
    display: 'block',
  },
});

export const DocThead = tasty({
  as: 'thead',
  styles: {
    fill: '#surface-2',
  },
});

export const DocTbody = tasty({
  as: 'tbody',
  styles: {},
});

export const DocTr = tasty({
  as: 'tr',
  styles: {
    borderBottom: '1bw solid #border',
  },
});

export const DocTh = tasty({
  as: 'th',
  styles: {
    padding: '1x 1.5x',
    textAlign: 'left',
    fontWeight: 600,
    color: '#text',
    whiteSpace: 'nowrap',
  },
});

export const DocTd = tasty({
  as: 'td',
  styles: {
    padding: '1x 1.5x',
    color: '#text',
  },
});

export const DocImg = tasty({
  as: 'img',
  styles: {
    width: 'max 100%',
    height: 'auto',
    radius: '1r',
    margin: '1x 0',
  },
});

export const DocStrong = tasty({
  as: 'strong',
  styles: {
    fontWeight: '$bold-font-weight',
  },
});

const DocCodeBlockElement = tasty({
  as: 'pre',
  styles: {
    padding: '2x 2.5x',
    fill: '#syntax-bg',
    color: '#syntax-text',
    radius: '1cr',
    overflow: 'auto',
    preset: 't3',
    font: 'monospace',
    border: true,
    scrollbar: 'thin',
    margin: '0 0 2x',
    Code: {
      $: '>',
      font: 'monospace',
      whiteSpace: 'pre',
    },
  },
  elements: {
    Code: 'code',
  },
});

export function DocCodeBlock({
  children,
  lang,
}: {
  children: string;
  lang?: string;
}) {
  if (lang) {
    const { tokens } = highlightCode(children, lang);

    return (
      <DocCodeBlockElement>
        <DocCodeBlockElement.Code>
          {tokens.map((line, i) => (
            <Fragment key={i}>
              {line.map((token, j) => {
                const cls = token.color
                  ? SYNTAX_COLOR_CLASSES[token.color]
                  : undefined;

                return cls ? (
                  <span key={j} className={cls}>
                    {token.content}
                  </span>
                ) : (
                  <Fragment key={j}>{token.content}</Fragment>
                );
              })}
              {i < tokens.length - 1 ? '\n' : null}
            </Fragment>
          ))}
        </DocCodeBlockElement.Code>
      </DocCodeBlockElement>
    );
  }

  return (
    <DocCodeBlockElement>
      <DocCodeBlockElement.Code>{children}</DocCodeBlockElement.Code>
    </DocCodeBlockElement>
  );
}
