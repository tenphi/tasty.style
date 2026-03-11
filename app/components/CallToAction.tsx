'use client';

import { tasty } from '@tenphi/tasty';
import Space from '@/app/ui/Space';
import Button from '@/app/ui/Button';
import CodeBlock from '@/app/ui/CodeBlock';

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
      'radial-gradient(ellipse 70% 50% at 50% 100%, #violet-surface-3.60, transparent), linear-gradient(180deg, #primary-surface-2, #primary-surface)',
  },
});

const CTATitle = tasty({
  as: 'h2',
  styles: {
    preset: {
      '': 'h1',
      '@mobile': 'h2',
    },
    color: '#primary-text',
    margin: 0,
    textWrap: 'balance',
  },
});

const CTASubtitle = tasty({
  as: 'p',
  styles: {
    preset: 't1',
    color: '#primary-text-soft',
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

export default function CallToAction() {
  return (
    <CTAWrapper>
      <GlowOrb
        fill="#violet-accent-surface"
        inset="auto auto -200px 50%"
        translate="-50% 0"
      />
      <CTATitle>Start building with Tasty</CTATitle>
      <CTASubtitle>
        One install. Zero config. Ship beautiful, accessible UIs today.
      </CTASubtitle>
      <CodeBlock>pnpm add @tenphi/tasty</CodeBlock>
      <Space
        flow={{ '': 'row', '@mobile': 'column' }}
        gap="2x"
        width={{ '': 'auto', '@mobile': '100%' }}
        align={{ '@mobile': 'center' }}
      >
        <Button
          as="a"
          href="https://github.com/tenphi/tasty/blob/main/docs/usage.md"
        >
          Read the Docs
        </Button>
        <Button
          as="a"
          variant="secondary"
          href="https://github.com/tenphi/tasty"
        >
          View on GitHub
        </Button>
      </Space>
    </CTAWrapper>
  );
}
