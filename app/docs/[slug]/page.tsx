import { notFound } from 'next/navigation';
import { getDocContent, extractHeadings } from '../lib/docs';
import { getAllSlugs, findNavItem } from '../lib/navigation';
import MarkdownRenderer from '../components/MarkdownRenderer';
import TableOfContents from '../components/TableOfContents';
import { Article, PageTitle } from '../components/DocsPageContent';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
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
        <MarkdownRenderer source={source} />
      </Article>
      <TableOfContents headings={headings} />
    </>
  );
}
