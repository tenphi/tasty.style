import { tasty, useGlobalStyles } from '@tenphi/tasty';
import { IconBolt } from './icons';

const PARAGRAPH =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod ' +
  'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ' +
  'veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
  'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate ' +
  'velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint ' +
  'occaecat cupidatat non proident, sunt in culpa qui officia deserunt ' +
  'mollit anim id est laborum.';

const Page = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '3x',
    width: 'min 100% 44x',
    margin: '0 auto',
    padding: '6x bottom',
  },
});

const Header = tasty({
  as: 'header',
  styles: {
    '@scrolled-down':
      '@supports(container-type: scroll-state) & @(scroll-state(scrolled: block-end))',
    position: 'sticky',
    zIndex: 100,
    margin: '-2x -2x 0 -2x',
    padding: '1.5x 2x',
    inset: {
      '': 'top 0',
      '@scrolled-down': 'top -8x',
    },
    fill: '#surface.72',
    shadow: '0 .5x 1.5x #shadow',
    backdropFilter: 'blur(1x)',
    transition: 'inset .4s',

    Nav: {
      display: 'flex',
      flow: 'row',
      justifyContent: 'space-between',
      align: 'center',
      gap: '2x',
      width: 'min 100% 44x',
      margin: '0 auto',
    },

    Brand: {
      display: 'flex',
      flow: 'row',
      align: 'center',
      gap: '1x',
      preset: 't1m',
      color: '#text',
      textDecoration: 'none',
    },

    Logo: {
      display: 'grid',
      placeItems: 'center',
      width: '4x',
      height: '4x',
      radius: '1r',
      fill: '#accent-surface',
      color: '#accent-surface-text',
    },

    Links: {
      display: 'flex',
      flow: 'row',
      gap: { '': '2.5x', '@mobile': '1.5x' },
      align: 'center',
    },

    Link: {
      preset: 't2m',
      color: {
        '': '#text-soft',
        ':hover': '#text',
      },
      textDecoration: 'none',
      transition: 'color .15s',
      cursor: 'pointer',
    },
  },
  elements: {
    Nav: 'nav',
    Brand: 'a',
    Logo: 'span',
    Links: 'div',
    Link: 'a',
  },
});

const Article = tasty({
  as: 'article',
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '2x',

    Title: { preset: 't1m', color: '#text' },
    Paragraph: { preset: 't2', color: '#text-soft', lineHeight: '1.6' },
  },
  elements: {
    Title: 'h1',
    Paragraph: 'p',
  },
});

export const App = () => {
  // The document root is the scrolling container in the preview; opt it into
  // scroll-state queries so the sticky header can react to scroll position.
  useGlobalStyles('html', { containerType: 'scroll-state' });

  return (
    <>
      <Header>
        <Header.Nav>
          <Header.Brand href="#">
            <Header.Logo>
              <IconBolt size={18} />
            </Header.Logo>
            Voltage
          </Header.Brand>
          <Header.Links>
            <Header.Link href="#">Features</Header.Link>
            <Header.Link href="#">Pricing</Header.Link>
            <Header.Link href="#">Docs</Header.Link>
          </Header.Links>
        </Header.Nav>
      </Header>

      <Page>
        <Article>
          <Article.Title>Scroll to wake the header</Article.Title>
          {Array.from({ length: 12 }, (_, i) => (
            <Article.Paragraph key={i}>{PARAGRAPH}</Article.Paragraph>
          ))}
        </Article>
      </Page>
    </>
  );
};
