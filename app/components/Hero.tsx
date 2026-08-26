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

const HERO_TAGS = [
  'Type-safe',
  'React Server Components',
  'Runtime or build time',
  'Production proven',
];

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
        <Badge>
          CSS-in-JS for React design systems · v
          {pkg.dependencies['@tenphi/tasty']}
        </Badge>
        <HeroTitle>
          Build components whose <HeroAccent>styles don’t fight.</HeroAccent>
        </HeroTitle>
        <HeroSubtitle>
          Describe hover, disabled, variants, themes, and responsive behavior as
          state maps. Tasty&nbsp;makes one branch win by design—without
          specificity fights or source-order surprises.
        </HeroSubtitle>
        <Space flow="row wrap" gap="1x" align="center" justify="center">
          {HERO_TAGS.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </Space>
        <Space
          flow={{ '': 'row', '@mobile': 'column' }}
          gap="2x"
          padding="2x 0 0 0"
          width={{ '': 'auto', '@mobile': '100%' }}
          align={{ '@mobile': 'center' }}
        >
          <SpecialButton as="a" href="/playground">
            Try State Maps <IconArrowRight size={20} />
          </SpecialButton>
          <Button as="a" variant="secondary" href="#how-it-works">
            See How It Works
          </Button>
        </Space>
      </HeroInner>
    </HeroOuter>
  );
}
