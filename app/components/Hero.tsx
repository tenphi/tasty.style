'use client';

import { tasty, OUTER_STYLES } from '@tenphi/tasty';
import { IconArrowRight, IconBrandGithub } from '@tabler/icons-react';
import Space from '@/app/ui/Space';
import Button from '@/app/ui/Button';
import SpecialButton from '@/app/ui/SpecialButton';
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
      '': '14x 4x',
      '@mobile': '8x 2x',
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
      '': '120px',
      '@mobile': '72px',
    },
    height: 'auto',
    filter: 'drop-shadow(0 4px 12px #primary-shadow-logo)',
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
    image:
      'linear-gradient(to right, #violet-accent-text, #coral-accent-text, #teal-accent-text, #amber-accent-text, #blue-accent-text, #rose-accent-text, #lime-accent-text)',
    backgroundClip: 'text',
    color: 'transparent',
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
    opacity: 0.1,
    pointerEvents: 'none',
  },
  styleProps: ['fill', ...OUTER_STYLES],
});

export default function Hero() {
  return (
    <HeroOuter>
      <GlowOrb fill="#violet-accent-surface" inset="10% auto auto 15%" />
      <GlowOrb
        fill="#coral-accent-surface"
        inset="20% 10% auto auto"
        width="300px"
        height="300px"
      />
      <HeroInner>
        <HeroLogo src="/tasty.svg" alt="Tasty logo" />
        <Badge>v1.0</Badge>
        <HeroTitle>
          The styling engine <HeroAccent>built for design systems</HeroAccent>
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
          <SpecialButton
            as="a"
            href="https://github.com/tenphi/tasty/blob/main/docs/usage.md"
          >
            Get Started <IconArrowRight size={20} />
          </SpecialButton>
          <Button
            as="a"
            variant="secondary"
            href="https://github.com/tenphi/tasty"
          >
            <IconBrandGithub size={20} /> View on GitHub
          </Button>
        </Space>
      </HeroInner>
    </HeroOuter>
  );
}
