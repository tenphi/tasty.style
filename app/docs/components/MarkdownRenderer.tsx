import type { ComponentPropsWithoutRef } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
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

function rewriteHref(href: string | undefined): string | undefined {
  if (!href) return href;

  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  if (href.startsWith('#')) return href;

  // docs/foo.md -> /docs/foo
  const cleaned = href
    .replace(/^\.\//, '')
    .replace(/^docs\//, '')
    .replace(/\.md(?=$|#)/, '');

  return `/docs/${cleaned}`;
}

function MdxLink({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const rewritten = rewriteHref(href);
  const isExternal =
    rewritten?.startsWith('http://') || rewritten?.startsWith('https://');

  return (
    <Link
      href={rewritten}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </Link>
  );
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

    return <DocCodeBlock lang={lang}>{code}</DocCodeBlock>;
  }

  return <pre>{children}</pre>;
}

function MdxCode({ children, ...props }: ComponentPropsWithoutRef<'code'>) {
  return <InlineCode {...props}>{children}</InlineCode>;
}

const components = {
  h1: () => null,
  h2: DocH2,
  h3: DocH3,
  h4: DocH4,
  p: DocParagraph,
  a: MdxLink,
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
  img: DocImg,
  strong: DocStrong,
};

export default function MarkdownRenderer({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      }}
      components={components}
    />
  );
}
