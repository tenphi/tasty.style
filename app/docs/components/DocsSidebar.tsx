'use client';

import { usePathname } from 'next/navigation';
import { tasty } from '@tenphi/tasty';
import { IconX } from '@tabler/icons-react';
import Button from '@/app/ui/Button';
import { INTRODUCTION, NAV_GROUPS } from '../lib/navigation';
import { useDocsSidebar } from './DocsSidebarContext';

const Overlay = tasty({
  styles: {
    display: {
      '': 'block',
      '@desktop': 'none',
    },
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    fill: '#black.40',
    visibility: {
      '': 'hidden',
      open: 'visible',
    },
    opacity: {
      '': 0,
      open: 1,
    },
    transition: 'opacity, visibility',
    $transition: '0.2s',
  },
});

const Aside = tasty({
  as: 'aside',
  styles: {
    display: 'flex',
    flow: 'column',
    width: {
      '': 'fixed 300px',
      '@desktop': 'fixed 260px',
    },
    height: {
      '': '100%',
      '@desktop': 'calc(100dvh - ($header-height, 64px))',
    },
    overflow: 'hidden auto',
    overscrollBehavior: 'none',
    padding: '3x 0',
    borderRight: {
      '': 'none',
      '@desktop': '1bw solid #primary-border',
    },
    borderLeft: {
      '': '1bw solid #primary-border',
      '@desktop': 'none',
    },
    fill: '#primary-surface',
    scrollbar: 'thin',
    position: {
      '': 'fixed',
      '@desktop': 'sticky',
    },
    top: {
      '': 'auto',
      '@desktop': '($header-height, 64px)',
    },
    inset: {
      '': '0 0 0 auto',
      '@desktop': 'auto',
    },
    zIndex: {
      '': 201,
      '@desktop': 'auto',
    },
    transform: {
      '': 'translateX(100%)',
      open: 'translateX(0)',
      '@desktop': 'none',
    },
    transition: {
      '': 'transform',
      '@desktop': 'none',
    },
    $transition: '0.2s',
    shadow: {
      '': 'none',
      'open & !@desktop': '-4x 0 8x #primary-shadow-md',
    },
  },
});

const TopBar = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    gap: '1x',
    placeItems: 'center',
    placeContent: 'end',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    fill: 'transparent',
    padding: '1x 1.5x',
    hide: {
      '': false,
      '@desktop': true,
    },
  },
});

const GroupTitle = tasty({
  as: 'span',
  styles: {
    preset: 't4 strong',
    color: '#primary-text-soft',
    padding: '2x 1.5x 0.5x',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
});

const NavList = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '1bw',
    padding: '0 1.5x',
  },
});

const NavLink = tasty({
  as: 'a',
  styles: {
    display: 'block',
    padding: '0.75x 1.5x',
    preset: 't3',
    color: {
      '': '#primary-text-soft',
      active: '#primary-accent-text',
      ':hover & !active': '#primary-text',
    },
    textDecoration: 'none',
    radius: '1r',
    fill: {
      '': 'transparent',
      active: '#primary-accent-surface.12',
      ':hover & !active': '#primary-surface-2',
    },
    fontWeight: {
      '': 400,
      active: 500,
    },
    transition: 'theme',
    cursor: 'pointer',
  },
});

function getSlugFromPathname(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);

  return parts.length > 1 ? parts[parts.length - 1] : 'introduction';
}

export default function DocsSidebar() {
  const pathname = usePathname();
  const sidebar = useDocsSidebar();
  const currentSlug = getSlugFromPathname(pathname);
  const isOpen = sidebar?.isOpen ?? false;

  function handleNavClick() {
    sidebar?.close();
  }

  return (
    <>
      <Overlay mods={{ open: isOpen }} onClick={() => sidebar?.close()} />
      <Aside mods={{ open: isOpen }}>
        <TopBar>
          <Button
            variant="secondary"
            padding="1x"
            aria-label="Close menu"
            onClick={() => sidebar?.close()}
          >
            <IconX size={18} />
          </Button>
        </TopBar>

        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <GroupTitle>{group.title}</GroupTitle>
            <NavList>
              {group.items.map((item) => {
                const href =
                  item.slug === INTRODUCTION.slug
                    ? '/docs'
                    : `/docs/${item.slug}`;

                return (
                  <NavLink
                    key={item.slug}
                    href={href}
                    mods={{ active: currentSlug === item.slug }}
                    onClick={handleNavClick}
                  >
                    {item.title}
                  </NavLink>
                );
              })}
            </NavList>
          </div>
        ))}
      </Aside>
    </>
  );
}
