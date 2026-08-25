import { tasty, OUTER_STYLES } from '@tenphi/tasty';
import { IconArrowRight } from '@tabler/icons-react';
import Space from '@/app/ui/Space';
import Button from '@/app/ui/Button';
import SpecialButton from '@/app/ui/SpecialButton';
import Badge from '@/app/ui/Badge';
import pkg from '../../package.json';

const HeroOuter = tasty({
  as: 'section',
  styles: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    image:
      'radial-gradient(ellipse 80% 60% at 50% 0%, #violet-surface-3, #clear), radial-gradient(ellipse 60% 50% at 80% 20%, #coral-surface-3.40, #clear), radial-gradient(ellipse 60% 50% at 20% 30%, #blue-surface-3.40, #clear), linear-gradient(180deg, #surface, #surface-2)',
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
      '': '5x 4x',
      '@mobile': '5x 2x',
    },
    gap: '2x',
    width: 'max ($content-width, 1200px)',
    margin: 'auto left right',
  },
});

const HeroLogo = tasty({
  as: 'img',
  styles: {
    width: {
      '': '96px',
      '@mobile': '8x',
    },
    height: 'auto',
    filter: 'drop-shadow(0 4px 12px #shadow-logo)',
  },
});

const HeroTitle = tasty({
  as: 'h1',
  styles: {
    preset: {
      '': 'd1',
      '@mobile': 'h1',
    },
    color: '#text',
    margin: 0,
    textAlign: 'center',
    textWrap: 'balance',
    width: 'max 860px',
  },
});

const HeroAccent = tasty({
  as: 'span',
  styles: {
    image:
      'linear-gradient(to right, #violet-pop-text, #coral-pop-text, #amber-pop-text, #blue-pop-text, #rose-pop-text, #lime-pop-text)',
    backgroundClip: 'text',
    color: '#clear',
  },
});

const HeroSubtitle = tasty({
  as: 'p',
  styles: {
    preset: 't1',
    color: '#text-soft',
    margin: 0,
    textAlign: 'center',
    textWrap: 'balance',
    width: 'max 860px',
  },
});

const GlowOrb = tasty({
  styles: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    radius: 'ellipse',
    filter: 'blur(120px)',
    opacity: 0.2,
    pointerEvents: 'none',
  },
  styleProps: ['fill', ...OUTER_STYLES],
});

const ConflictDemo = tasty({
  styles: {
    display: 'flex',
    flow: 'row wrap',
    placeItems: 'center',
    placeContent: 'center',
    gap: '1x',
    padding: '1.5x 2x',
    radius: 'round',
    border: true,
    fill: '#surface.7',
    color: '#text-soft',
    preset: 't3',
  },
});

const ConflictState = tasty({
  as: 'span',
  styles: {
    display: 'inline-flex',
    padding: '0.5x 1x',
    radius: 'round',
    fill: '#surface-3',
    color: '#text',
    preset: 't3m',
  },
});

const Proof = tasty({
  as: 'span',
  styles: {
    color: '#text-soft',
    preset: 't3m',
  },
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
        <Badge>tasty v{pkg.dependencies['@tenphi/tasty']}</Badge>
        <HeroTitle>
          Stop CSS <HeroAccent>states</HeroAccent> from fighting each other
        </HeroTitle>
        <HeroSubtitle>
          Tasty turns hover, active, disabled, responsive, and custom states
          into mutually exclusive selectors. One branch wins by construction,
          even as components are extended.
        </HeroSubtitle>
        <ConflictDemo aria-label="When hover and disabled overlap, disabled wins">
          <ConflictState>:hover</ConflictState>
          <span>+</span>
          <ConflictState>[disabled]</ConflictState>
          <IconArrowRight aria-hidden size={18} />
          <strong>disabled wins</strong>
        </ConflictDemo>
        <Space flow="row wrap" gap="2x" align="center" justify="center">
          <Proof>100+ production components</Proof>
          <Proof aria-hidden>•</Proof>
          <Proof>5+ years in Cube Cloud</Proof>
          <Proof aria-hidden>•</Proof>
          <Proof>Runtime, SSR, and static paths</Proof>
        </Space>
        <Space
          flow={{ '': 'row', '@mobile': 'column' }}
          gap="2x"
          padding="2x 0 0 0"
          width={{ '': 'auto', '@mobile': '100%' }}
          align={{ '@mobile': 'center' }}
        >
          <SpecialButton
            as="a"
            href="/playground#button"
            data-goatcounter-click="hero-state-conflict-playground"
          >
            Edit this example <IconArrowRight size={20} />
          </SpecialButton>
          <Button
            as="a"
            variant="secondary"
            href="/docs/comparison"
            data-goatcounter-click="hero-evaluate-fit"
          >
            Evaluate fit
          </Button>
        </Space>
      </HeroInner>
    </HeroOuter>
  );
}
