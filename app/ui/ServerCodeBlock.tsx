import { Fragment } from 'react';
import { highlightCode } from '@/app/lib/shiki';
import { SYNTAX_COLOR_CLASSES } from '@/app/lib/shiki-theme';
import CodeBlock from './CodeBlock';

export default function ServerCodeBlock({
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
      <CodeBlock {...props}>
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
      </CodeBlock>
    );
  }

  return <CodeBlock {...props}>{children}</CodeBlock>;
}
