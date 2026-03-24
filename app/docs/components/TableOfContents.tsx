'use client';

import { useEffect, useRef, useState } from 'react';
import { tasty } from '@tenphi/tasty';
import type { Heading } from '../lib/docs';

const Aside = tasty({
  as: 'aside',
  styles: {
    display: {
      '': 'none',
      '@desktop': 'flex',
    },
    flow: 'column',
    width: 'fixed 260px',
    height: 'calc(100dvh - ($header-height, 64px))',
    overflow: 'hidden auto',
    padding: '3x 2x',
    borderLeft: '1bw solid #primary-border',
    fill: '#primary-surface',
    scrollbar: 'thin',
    position: 'sticky',
    top: '($header-height, 64px)',
  },
});

const TocTitle = tasty({
  as: 'span',
  styles: {
    preset: 't4 strong',
    fontSize: '13px',
    color: '#primary-text-soft',
    padding: '0 0 1x',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
});

const TocLink = tasty({
  as: 'a',
  styles: {
    display: 'block',
    preset: 't4',
    fontSize: '13px',
    color: {
      '': '#primary-text-soft',
      active: '#primary-accent-text',
      ':hover & !active': '#primary-text',
    },
    textDecoration: 'none',
    padding: '0.5x 0',
    transition: 'theme',
    cursor: 'pointer',
  },
});

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const ids = headings.map((h) => h.id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <Aside>
      <TocTitle>On this page</TocTitle>
      {headings.map((heading) => (
        <TocLink
          key={heading.id}
          href={`#${heading.id}`}
          mods={{ active: activeId === heading.id }}
          style={{
            paddingLeft: heading.depth === 3 ? '12px' : undefined,
          }}
        >
          {heading.text}
        </TocLink>
      ))}
    </Aside>
  );
}
