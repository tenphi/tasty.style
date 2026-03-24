import { getDocContent, extractHeadings } from './lib/docs';
import { INTRODUCTION } from './lib/navigation';
import MarkdownRenderer from './components/MarkdownRenderer';
import TableOfContents from './components/TableOfContents';
import { Article, PageTitle } from './components/DocsPageContent';

export default function DocsPage() {
  const source = getDocContent(INTRODUCTION.slug);
  const headings = extractHeadings(source);

  return (
    <>
      <Article data-pagefind-body>
        <PageTitle>{INTRODUCTION.title}</PageTitle>
        <MarkdownRenderer source={source} />
      </Article>
      <TableOfContents headings={headings} />
    </>
  );
}
