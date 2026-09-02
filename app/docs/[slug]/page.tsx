import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getDocContent,
  getDocSourcePath,
  extractDescription,
  extractHeadings,
  assertAllDocsAreRouted,
} from '../lib/docs';
import { getAllSlugs, findNavItem } from '../lib/navigation';
import MarkdownRenderer from '../components/MarkdownRenderer';
import TableOfContents from '../components/TableOfContents';
import { Article, PageTitle } from '../components/DocsPageContent';

export function generateStaticParams() {
  const slugs = getAllSlugs();

  assertAllDocsAreRouted(slugs);

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const navItem = findNavItem(slug);

  if (!navItem) return {};

  const source = getDocContent(slug);
  const description = extractDescription(source);

  return {
    title: `${navItem.title} — Tasty Docs`,
    description,
    alternates: {
      canonical: slug === 'introduction' ? '/docs' : `/docs/${slug}`,
    },
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const navItem = findNavItem(slug);

  if (!navItem) notFound();

  const source = getDocContent(slug);
  const headings = extractHeadings(source);

  return (
    <>
      <Article data-pagefind-body>
        <PageTitle>{navItem.title}</PageTitle>
        <MarkdownRenderer source={source} sourcePath={getDocSourcePath(slug)} />
      </Article>
      <TableOfContents headings={headings} />
    </>
  );
}
