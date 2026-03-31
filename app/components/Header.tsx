'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { tasty } from '@tenphi/tasty';
import { IconBrandGithub, IconMenu2 } from '@tabler/icons-react';
import Button from '@/app/ui/Button';
import SpecialButton from '@/app/ui/SpecialButton';
import { useDocsSidebar } from '@/app/docs/components/DocsSidebarContext';
import SearchDialog from '@/app/docs/components/SearchDialog';
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
      preset: 'h4',
      color: '#text',
      fontWeight: 700,
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
      '': 'transparent',
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

const SearchWrap = tasty({
  styles: {
    display: 'flex',
    placeItems: 'center',
    flexGrow: { '': 0, '@desktop': 1 },
    padding: { '': '0', '@desktop': '0 2x' },
  },
});

const NAV_LINKS = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Documentation', href: '/docs' },
  { label: 'Playground', href: '/playground' },
];

export default function Header() {
  const pathname = usePathname();
  const sidebar = useDocsSidebar();
  const isDocs = pathname.startsWith('/docs');
  const isPlayground = pathname.startsWith('/playground');

  return (
    <HeaderElement mods={{ docs: isDocs, playground: isPlayground }}>
      <HeaderElement.Inner>
        <LogoLink href="/">
          <HeaderElement.LogoImg src="/tasty.svg" alt="Tasty logo" />
          <HeaderElement.LogoText>Tasty</HeaderElement.LogoText>
        </LogoLink>
        {!isDocs && !isPlayground ? (
          <HeaderElement.Nav>
            {NAV_LINKS.map((link) => (
              <HeaderNavLink key={link.href} href={link.href}>
                {link.label}
              </HeaderNavLink>
            ))}
          </HeaderElement.Nav>
        ) : null}
        <HeaderElement.Actions>
          {isDocs ? (
            <SearchWrap>
              <SearchDialog />
            </SearchWrap>
          ) : null}
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
          {isDocs && sidebar ? (
            <>
              <SpecialButton as={NextLink} href="/playground" size="small">
                Playground
              </SpecialButton>
              <Button
                variant="ghost"
                padding="1x"
                aria-label="Open menu"
                onClick={sidebar.toggle}
                hide={{ '': false, '@desktop': true }}
              >
                <IconMenu2 size={20} />
              </Button>
            </>
          ) : isPlayground ? (
            <SpecialButton as={NextLink} href="/docs" size="small">
              Docs
            </SpecialButton>
          ) : (
            <SpecialButton
              as={NextLink}
              href="/docs/getting-started"
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
