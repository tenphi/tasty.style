'use client';

import { tasty } from '@tenphi/tasty';
import Space from '@/app/ui/Space';
import Button from '@/app/ui/Button';
import Badge from '@/app/ui/Badge';

const HeroOuter = tasty({
  as: 'section',
  styles: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    image:
      'radial-gradient(ellipse 80% 60% at 50% 0%, #violet-surface-3, transparent), radial-gradient(ellipse 60% 50% at 80% 20%, #coral-surface-3.40, transparent), radial-gradient(ellipse 60% 50% at 20% 30%, #blue-surface-3.40, transparent), linear-gradient(180deg, #primary-surface, #primary-surface-2)',
  },
});

const HeroInner = tasty({
  styles: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flow: 'column',
    align: 'center',
    textAlign: 'center',
    padding: {
      '': '18x 4x 16x',
      '@mobile': '12x 2x 10x',
    },
    gap: '3x',
    width: 'max ($content-width, 1200px)',
    margin: 'auto left right',
  },
});

const HeroLogo = tasty({
  as: 'img',
  styles: {
    width: {
      '': '88px',
      '@mobile': '64px',
    },
    height: 'auto',
    filter: 'drop-shadow(0 4px 12px #primary-shadow-md)',
  },
});

const HeroTitle = tasty({
  as: 'h1',
  styles: {
    preset: {
      '': 'd1',
      '@mobile': 'h1',
    },
    color: '#primary-text',
    margin: 0,
    textAlign: 'center',
    textWrap: 'balance',
    width: 'max 800px',
  },
});

const HeroAccent = tasty({
  as: 'span',
  styles: {
    color: '#primary-accent-text',
  },
});

const HeroSubtitle = tasty({
  as: 'p',
  styles: {
    preset: 't1',
    color: '#primary-text-soft',
    margin: 0,
    textAlign: 'center',
    textWrap: 'balance',
    width: 'max 640px',
  },
});

const GlowOrb = tasty({
  styles: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    radius: 'ellipse',
    filter: 'blur(120px)',
    opacity: 0.15,
    pointerEvents: 'none',
  },
});

export default function Hero() {
  return (
    <HeroOuter>
      <GlowOrb
        fill="#violet-accent-surface"
        inset="10% auto auto 15%"
      />
      <GlowOrb
        fill="#coral-accent-surface"
        inset="20% 10% auto auto"
        width="300px"
        height="300px"
      />
      <HeroInner>
        <HeroLogo src="/tasty.svg" alt="Tasty logo" />
        <Badge>v0.x  --  Now with SSR Support</Badge>
        <HeroTitle>
          The styling engine{' '}
          <HeroAccent>built for design systems</HeroAccent>.
        </HeroTitle>
        <HeroSubtitle>
          Deterministic CSS generation. State‑aware DSL. Zero specificity
          conflicts. Ever.
        </HeroSubtitle>
        <Space
          flow={{ '': 'row', '@mobile': 'column' }}
          gap="2x"
          padding="2x 0 0 0"
          width={{ '': 'auto', '@mobile': '100%' }}
          align={{ '@mobile': 'center' }}
        >
          <Button
            as="a"
            href="https://github.com/tenphi/tasty/blob/main/docs/usage.md"
          >
            Get Started
          </Button>
          <Button
            as="a"
            variant="secondary"
            href="https://github.com/tenphi/tasty"
          >
            View on GitHub
          </Button>
        </Space>
      </HeroInner>
    </HeroOuter>
  );
}
