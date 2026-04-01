'use client';

import type { ReactNode } from 'react';
import NextLink from 'next/link';
import { tasty } from '@tenphi/tasty';
import Space from '@/app/ui/Space';
import Button from '@/app/ui/Button';
import SpecialButton from '@/app/ui/SpecialButton';

const CTAWrapper = tasty({
  as: 'section',
  styles: {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flow: 'column',
    align: 'center',
    textAlign: 'center',
    padding: {
      '': '14x 4x',
      '@mobile': '10x 2x',
    },
    gap: '4x',
    image:
      'radial-gradient(ellipse 70% 50% at 50% 100%, #violet-surface-3.60, transparent), linear-gradient(180deg, #surface-2, #surface)',
  },
});

const CTATitle = tasty({
  as: 'h2',
  styles: {
    preset: {
      '': 'h1',
      '@mobile': 'h2',
    },
    color: '#text',
    margin: 0,
    textWrap: 'balance',
  },
});

const CTASubtitle = tasty({
  as: 'p',
  styles: {
    preset: 't1',
    color: '#text-soft',
    margin: 0,
    width: 'max 500px',
    textAlign: 'center',
    textWrap: 'balance',
  },
});

const GlowOrb = tasty({
  styles: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    radius: 'ellipse',
    filter: 'blur(140px)',
    opacity: 0.12,
    pointerEvents: 'none',
  },
});

export default function CallToActionClient({
  installBlock,
}: {
  installBlock: ReactNode;
}) {
  return (
    <CTAWrapper>
      <GlowOrb
        fill="#violet-accent-surface"
        inset="auto auto -200px 50%"
        translate="-50% 0"
      />
      <CTATitle>Start with runtime, add structure as needed</CTATitle>
      <CTASubtitle>
        Install the runtime, build a first component, then layer in shared
        configuration, methodology, SSR, or zero-runtime only where your system
        needs them.
      </CTASubtitle>
      {installBlock}
      <Space
        flow={{ '': 'row', '@mobile': 'column' }}
        gap="2x"
        width={{ '': 'auto', '@mobile': '100%' }}
        align={{ '@mobile': 'center' }}
      >
        <SpecialButton as={NextLink} href="/docs/getting-started">
          Get Started
        </SpecialButton>
        <Button as="a" variant="secondary" href="/docs">
          Browse Docs
        </Button>
      </Space>
    </CTAWrapper>
  );
}
