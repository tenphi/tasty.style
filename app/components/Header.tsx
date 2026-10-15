'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { tasty } from '@tenphi/tasty';
import { IconBrandGithub } from '@tabler/icons-react';
import Button from '@/app/ui/Button';
import SpecialButton from '@/app/ui/SpecialButton';
import ThemeSwitcher from './ThemeSwitcher';
import ContrastSwitcher from './ContrastSwitcher';

const HeaderElement = tasty({
  as: 'header',
  styles: {
    position: 'sticky',
    inset: '0 top',
    zIndex: 100,
    fill: '#surface.6',
    backdropFilter: 'blur(12px)',
    border: 'bottom',
    width: '100%',
    Inner: {
      $: '>',
      display: 'flex',
      flow: 'row',
      placeItems: 'center',
      padding: '0 2x',
      height: '($header-height, 64px)',
      width: {
        '': 'initial 100% 1400px',
        playground: '100%',
      },
      margin: '0 auto',
    },
    LogoImg: {
      $: '>Inner>Logo>',
      position: 'relative',
      height: '28px',
      width: 'auto',
      inset: '-3px top',
    },
    LogoText: {
      $: '>Inner>Logo>',
      preset: 'h4 / strong',
      color: '#text',
      hide: {
        '': false,
        '@mobile': true,
      },
    },
    Nav: {
      $: '>Inner>',
      display: 'flex',
      hide: {
        '': true,
        '@desktop': false,
      },
      flow: 'row',
      gap: '0.5x',
      margin: 'auto left',
      padding: '0 3x',
    },
    Actions: {
      $: '>Inner>',
      display: 'flex',
      flow: 'row',
      gap: '1x',
      placeItems: 'center',
      margin: 'auto left',
    },
  },
  elements: {
    Inner: 'div',
    LogoImg: { as: 'img' },
    LogoText: 'span',
    Nav: 'nav',
    Actions: 'div',
  },
});

const LogoLink = tasty({
  as: NextLink,
  element: 'Logo',
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    gap: '1x',
    textDecoration: 'none',
    color: '#text',
    transition: 'opacity',
    opacity: {
      '': 1,
      ':hover': 0.8,
    },
  },
});

const HeaderNavLink = tasty({
  as: NextLink,
  element: 'NavLink',
  styles: {
    preset: 't3',
    color: {
      '': '#text-soft',
      ':hover': '#text',
    },
    textDecoration: 'none',
    padding: '1x 1.5x',
    radius: true,
    fill: {
      '': '#clear',
      ':hover': '#surface-2',
    },
    transition: 'theme',
    cursor: 'pointer',
    shadow: {
      '': 'inset 0 0 2x #shadow-inset-2.0',
      ':active': 'inset 0 0 2x #shadow-inset-2',
    },
  },
});

// The documentation is a separate Cookbook build under /docs/, so links to it
// load the page instead of using client-side navigation.
const DOCS_URL = '/docs/';

const NAV_LINKS = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Documentation', href: DOCS_URL, document: true },
  { label: 'Playground', href: '/playground' },
];

export default function Header() {
  const pathname = usePathname();
  const isPlayground = pathname.startsWith('/playground');

  return (
    <HeaderElement mods={{ playground: isPlayground }}>
      <HeaderElement.Inner>
        <LogoLink href="/">
          <HeaderElement.LogoImg src="/tasty.svg" alt="Tasty logo" />
          <HeaderElement.LogoText>Tasty</HeaderElement.LogoText>
        </LogoLink>
        {!isPlayground ? (
          <HeaderElement.Nav>
            {NAV_LINKS.map((link) => (
              <HeaderNavLink
                key={link.href}
                as={link.document ? 'a' : undefined}
                href={link.href}
              >
                {link.label}
              </HeaderNavLink>
            ))}
          </HeaderElement.Nav>
        ) : null}
        <HeaderElement.Actions>
          <ThemeSwitcher />
          <ContrastSwitcher />
          <Button
            as="a"
            href="https://github.com/tenphi/tasty"
            variant="ghost"
            padding="1x"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
          >
            <IconBrandGithub size={20} />
          </Button>
          {isPlayground ? (
            <SpecialButton as="a" href={DOCS_URL} size="small">
              Docs
            </SpecialButton>
          ) : (
            <SpecialButton
              as="a"
              href={`${DOCS_URL}getting-started`}
              size="small"
            >
              Get Started
            </SpecialButton>
          )}
        </HeaderElement.Actions>
      </HeaderElement.Inner>
    </HeaderElement>
  );
}
