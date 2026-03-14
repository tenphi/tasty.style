'use client';

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
    display: 'flex',
    flow: 'row',
    placeItems: 'center',
    padding: {
      '': '0 4x',
      '@mobile': '0 2x',
    },
    height: '($header-height, 64px)',
    fill: '#primary-surface.6',
    backdropFilter: 'blur(12px)',
    border: 'bottom',
    width: '100%',
    Logo: {
      $: '>',
      display: 'inline-flex',
      placeItems: 'center',
      gap: '1x',
      textDecoration: 'none',
      color: '#primary-text',
      transition: 'opacity',
      opacity: {
        '': 1,
        '@own(:hover)': 0.8,
      },
    },
    LogoImg: {
      $: '>Logo>',
      height: '28px',
      width: 'auto',
    },
    LogoText: {
      $: '>Logo>',
      preset: 'h4',
      color: '#primary-text',
      fontWeight: 700,
    },
    Nav: {
      $: '>',
      display: 'flex',
      hide: {
        '': false,
        '@tablet': true,
      },
      flow: 'row',
      gap: '0.5x',
      margin: 'auto left',
      padding: '0 3x',
    },
    NavLink: {
      $: '>Nav>',
      preset: 't3',
      color: {
        '': '#primary-text-soft',
        '@own(:hover)': '#primary-text',
      },
      textDecoration: 'none',
      padding: '1x 1.5x',
      radius: true,
      fill: {
        '': 'transparent',
        '@own(:hover)': '#primary-surface-2',
      },
      transition: 'theme',
      cursor: 'pointer',
    },
    Actions: {
      $: '>',
      display: 'flex',
      flow: 'row',
      gap: '1x',
      placeItems: 'center',
      margin: {
        '': 'auto left',
        '@mobile': 'auto left',
      },
    },
  },
  elements: {
    Logo: 'a',
    LogoImg: { as: 'img' },
    LogoText: 'span',
    Nav: 'nav',
    NavLink: 'a',
    Actions: 'div',
  },
});

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Code', href: '#code-showcase' },
  { label: 'Ecosystem', href: '#ecosystem' },
];

export default function Header() {
  return (
    <HeaderElement>
      <HeaderElement.Logo href="#">
        <HeaderElement.LogoImg src="/tasty.svg" alt="Tasty logo" />
        <HeaderElement.LogoText>Tasty</HeaderElement.LogoText>
      </HeaderElement.Logo>
      <HeaderElement.Nav>
        {NAV_LINKS.map((link) => (
          <HeaderElement.NavLink key={link.href} href={link.href}>
            {link.label}
          </HeaderElement.NavLink>
        ))}
      </HeaderElement.Nav>
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
        <SpecialButton
          as="a"
          href="https://github.com/tenphi/tasty/blob/main/docs/usage.md"
          size="small"
        >
          Get Started
        </SpecialButton>
      </HeaderElement.Actions>
    </HeaderElement>
  );
}
