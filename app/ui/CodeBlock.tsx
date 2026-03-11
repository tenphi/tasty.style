'use client';

import { tasty, BASE_STYLES, OUTER_STYLES, BLOCK_STYLES } from '@tenphi/tasty';

const CodeBlockElement = tasty({
  as: 'pre',
  styles: {
    padding: '3x',
    fill: '#primary-code-bg',
    color: '#primary-code-text',
    radius: '1cr',
    overflow: 'auto',
    preset: 't3',
    font: 'monospace',
    border: 'none',
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

export default function CodeBlock({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) {
  return (
    <CodeBlockElement {...props}>
      <CodeBlockElement.Code>{children}</CodeBlockElement.Code>
    </CodeBlockElement>
  );
}
