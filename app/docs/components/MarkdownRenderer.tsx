import { Fragment, type ComponentPropsWithoutRef } from 'react';
import type { Html, Root } from 'mdast';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';
import { highlightCode } from '@/app/lib/shiki';
import { SYNTAX_COLOR_CLASSES } from '@/app/lib/shiki-theme';
import InlineCode from '@/app/ui/InlineCode';
import Link from '@/app/ui/Link';
import { DocCodeBlock } from './MarkdownElements';
import {
  DocH2,
  DocH3,
  DocH4,
  DocParagraph,
  DocBlockquote,
  DocHr,
  DocUl,
  DocOl,
  DocLi,
  DocTable,
  DocThead,
  DocTbody,
  DocTr,
  DocTh,
  DocTd,
  DocImg,
  DocStrong,
} from './MarkdownElements';

function remarkRewriteImgSrc() {
  return (tree: Root) => {
    visit(tree, 'html', (node: Html) => {
      node.value = node.value.replace(
        /(<img\s[^>]*?)src="(?!\/|https?:\/\/)([^"]*?)"/g,
        (_match: string, prefix: string, src: string) =>
          `${prefix}src="/${src}"`,
      );
    });
  };
}

const TASTY_GITHUB_ROOT = 'https://github.com/tenphi/tasty';

function resolveRepositoryPath(sourcePath: string, targetPath: string): string {
  const parts = sourcePath.split('/');

  parts.pop();

  for (const part of targetPath.replace(/^\.\//, '').split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') parts.pop();
    else parts.push(part);
  }

  return parts.join('/');
}

function rewriteHref(
  href: string | undefined,
  sourcePath: string,
): string | undefined {
  if (!href) return href;

  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  if (href.startsWith('/')) return href;
  if (href.startsWith('#')) return href;

  const hashIndex = href.indexOf('#');
  const targetPath = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? '' : href.slice(hashIndex);
  const repositoryPath = resolveRepositoryPath(sourcePath, targetPath);

  if (repositoryPath === 'README.md') return `/docs${hash}`;
  if (repositoryPath === 'docs/README.md') return `/docs/docs-hub${hash}`;

  const docMatch = repositoryPath.match(/^docs\/([^/]+)\.md$/);

  if (docMatch) return `/docs/${docMatch[1]}${hash}`;

  const isDirectory =
    targetPath.endsWith('/') ||
    (!repositoryPath.split('/').pop()?.includes('.') &&
      repositoryPath !== 'LICENSE');
  const view = isDirectory ? 'tree' : 'blob';

  return `${TASTY_GITHUB_ROOT}/${view}/main/${repositoryPath}${hash}`;
}

function createMdxLink(sourcePath: string) {
  return function MdxLink({
    href,
    children,
    ...props
  }: ComponentPropsWithoutRef<'a'>) {
    const rewritten = rewriteHref(href, sourcePath);
    const isExternal =
      rewritten?.startsWith('http://') || rewritten?.startsWith('https://');

    return (
      <Link
        href={rewritten!}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </Link>
    );
  };
}

function MdxPre({ children }: ComponentPropsWithoutRef<'pre'>) {
  const child = children as React.ReactElement<{
    className?: string;
    children?: string;
  }>;

  if (child?.props) {
    const className = child.props.className || '';
    const lang = className.replace(/^language-/, '') || undefined;
    const code =
      typeof child.props.children === 'string'
        ? child.props.children
        : String(child.props.children ?? '');

    if (lang) {
      const { tokens } = highlightCode(code, lang);

      return (
        <DocCodeBlock>
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
        </DocCodeBlock>
      );
    }

    return <DocCodeBlock>{code}</DocCodeBlock>;
  }

  return <pre>{children}</pre>;
}

function MdxImg(props: ComponentPropsWithoutRef<'img'>) {
  const { src: srcProp, ...rest } = props;
  let src = srcProp;

  if (
    typeof src === 'string' &&
    !src.startsWith('/') &&
    !src.startsWith('http')
  ) {
    src = `/${src}`;
  }

  return <DocImg src={src} {...rest} />;
}

function MdxCode({ children, ...props }: ComponentPropsWithoutRef<'code'>) {
  return <InlineCode {...props}>{children}</InlineCode>;
}

const baseComponents = {
  h1: () => null,
  h2: DocH2,
  h3: DocH3,
  h4: DocH4,
  p: DocParagraph,
  pre: MdxPre,
  code: MdxCode,
  blockquote: DocBlockquote,
  hr: DocHr,
  ul: DocUl,
  ol: DocOl,
  li: DocLi,
  table: DocTable,
  thead: DocThead,
  tbody: DocTbody,
  tr: DocTr,
  th: DocTh,
  td: DocTd,
  img: MdxImg,
  strong: DocStrong,
};

export default function MarkdownRenderer({
  source,
  sourcePath,
}: {
  source: string;
  sourcePath: string;
}) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkRewriteImgSrc],
          rehypePlugins: [rehypeSlug],
        },
      }}
      components={{ ...baseComponents, a: createMdxLink(sourcePath) }}
    />
  );
}
