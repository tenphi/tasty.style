'use client';

import { Fragment } from 'react';
import { tasty, BASE_STYLES, OUTER_STYLES, BLOCK_STYLES } from '@tenphi/tasty';
import { highlightCode } from '@/app/lib/shiki';

const CodeBlockElement = tasty({
  as: 'pre',
  styles: {
    padding: '3x',
    fill: '#syntax-bg',
    color: '#syntax-text',
    radius: '1cr',
    overflow: 'auto',
    preset: 't3',
    font: 'monospace',
    border: true,
    scrollbar: 'thin',
    maxWidth: '100%',
    margin: 0,
    placeSelf: 'stretch',
    flexGrow: 1,
    Code: {
      $: '>',
      font: 'monospace',
      whiteSpace: 'pre',
    },
  },
  elements: {
    Code: 'code',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES],
});

export default function CodeBlock({
  children,
  lang,
  ...props
}: {
  children: string;
  lang?: string;
} & Record<string, unknown>) {
  if (lang) {
    const { tokens } = highlightCode(children, lang);

    return (
      <CodeBlockElement {...props}>
        <CodeBlockElement.Code>
          {tokens.map((line, i) => (
            <Fragment key={i}>
              {line.map((token, j) => (
                <span key={j} style={{ color: token.color }}>
                  {token.content}
                </span>
              ))}
              {i < tokens.length - 1 ? '\n' : null}
            </Fragment>
          ))}
        </CodeBlockElement.Code>
      </CodeBlockElement>
    );
  }

  return (
    <CodeBlockElement {...props}>
      <CodeBlockElement.Code>{children}</CodeBlockElement.Code>
    </CodeBlockElement>
  );
}
