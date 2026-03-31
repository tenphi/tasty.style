import { tasty } from '@tenphi/tasty';

const GradientCard = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '1.5x',
    padding: '4x',
    radius: '2r',
    width: 'max 340px',
    '$gradient-angle': '0deg',
    '#glow': 'oklch(65% 0.25 265)',
    image:
      'linear-gradient($gradient-angle, #accent-surface, #info-accent-surface)',
    color: '#accent-surface-text',
    $transition: '.3s',
    transition: 'shadow',
    shadow: {
      '': '0 2x 16x $glow-color',
      ':hover': '0 3x 24x $glow-color',
    },
    '@keyframes': {
      rotate: {
        '0%': { '$gradient-angle': '0deg' },
        '100%': { '$gradient-angle': '360deg' },
      },
      pulse: {
        '0%, 100%': { '#glow': 'oklch(65% 0.25 265)' },
        '50%': { '#glow': 'oklch(65% 0.25 330)' },
      },
    },
    animation: 'rotate 6s linear infinite, pulse 4s ease-in-out infinite',

    Title: { preset: 't1 strong' },
    Body: { preset: 't2', opacity: 0.85 },
  },
  elements: { Title: 'h3', Body: 'p' },
});

const Layout = tasty({
  styles: {
    display: 'grid',
    placeItems: 'center',
    padding: '4x',
    height: 'min 40x',
  },
});

export const App = () => (
  <Layout>
    <GradientCard>
      <GradientCard.Title>Animated Gradient</GradientCard.Title>
      <GradientCard.Body>
        The gradient rotates and the glow color pulses — both powered by
        @property auto-inference and @keyframes.
      </GradientCard.Body>
    </GradientCard>
  </Layout>
);
