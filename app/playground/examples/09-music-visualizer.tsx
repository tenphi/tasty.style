import { tasty, useKeyframes } from '@tenphi/tasty';
import { useState, useEffect } from 'react';

const BAR_COUNT = 8;

const Layout = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    gap: '3x',
    align: 'center',
    padding: '4x',
    width: 'max 400px',
  },
});

const BarRow = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    gap: '1x',
    align: 'flex-end',
    height: '25x',
    padding: '2x',
    fill: '#accent-text.03',
    radius: '1.5r',
  },
});

const Bar = tasty({
  styles: {
    '$bar-height': '10%',
    width: '3x',
    height: '0 $bar-height 100%',
    radius: '1r top',
    fill: '#accent-surface',
    transition: 'height 0.15s',
    '@keyframes': {
      shimmer: {
        '0%, 100%': { opacity: '0.85' },
        '50%': { opacity: '1' },
      },
    },
    animation: 'shimmer 2s ease-in-out infinite',
  },
});

const ProgressTrack = tasty({
  styles: {
    display: 'flex',
    width: '100%',
    height: '1x',
    radius: 'round',
    fill: '#accent-text.08',
    overflow: 'hidden',

    Fill: {
      '$progress': '0%',
      '$sweep-name': 'none',
      width: '$progress',
      height: '100%',
      radius: 'round',
      fill: '#accent-surface',
      image:
        'linear-gradient(90deg, #accent-surface, #info-accent-surface, #accent-surface)',
      backgroundSize: '200% 100%',
      transition: 'width .5s',
      animation: '$sweep-name 2s linear infinite',
    },
  },
  elements: { Fill: 'div' },
});

export const App = () => {
  const [bars, setBars] = useState(() =>
    Array.from({ length: BAR_COUNT }, () => 10),
  );
  const [progress, setProgress] = useState(0);

  const sweep = useKeyframes(
    {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
    { name: 'gradient-sweep' },
  );

  useEffect(() => {
    const id = setInterval(() => {
      setBars(
        Array.from({ length: BAR_COUNT }, () =>
          Math.max(5, Math.random() * 100),
        ),
      );
      setProgress((p) => (p >= 100 ? 0 : p + 2));
    }, 200);
    return () => clearInterval(id);
  }, []);

  return (
    <Layout>
      <BarRow>
        {bars.map((h, i) => (
          <Bar key={i} tokens={{ '$bar-height': `${h}%` }} />
        ))}
      </BarRow>
      <ProgressTrack>
        <ProgressTrack.Fill
          tokens={{ '$progress': `${progress}%`, '$sweep-name': sweep }}
        />
      </ProgressTrack>
    </Layout>
  );
};
