import { tasty } from '@tenphi/tasty';
import { useState } from 'react';

const MOODS = ['calm', 'excited', 'warning', 'danger', 'loading'] as const;
type Mood = (typeof MOODS)[number];

const MOOD_EMOJI: Record<Mood, string> = {
  calm: '😌',
  excited: '🤩',
  warning: '😬',
  danger: '😡',
  loading: '🔄',
};

const MOOD_LABEL: Record<Mood, string> = {
  calm: 'Feeling Calm',
  excited: 'So Excited!',
  warning: 'Uh Oh...',
  danger: 'DANGER!',
  loading: 'Loading...',
};

const MoodRing = tasty({
  as: 'button',
  modProps: {
    mood: MOODS,
  },
  styles: {
    display: 'inline-grid',
    placeItems: 'center',
    position: 'relative',
    padding: '2x 4x',
    radius: '1.5r',
    preset: 't2m',
    cursor: 'pointer',
    transition: 'theme, scale',
    opacity: { '': 1, '@starting': 0 },
    transform: {
      '': 'scale(1)',
      '@starting': 'scale(0.8)',
      'mood=excited': 'scale(1.05)',
      'mood=loading': 'scale(0.97)',
    },
    fill: {
      '': '#surface #accent-text.08',
      'mood=excited': '#surface #success-accent-text.12',
      'mood=warning': '#surface #warning-accent-text.12',
      'mood=danger': '#surface #danger-accent-text.12',
      'mood=loading': '#surface #accent-text.05',
    },
    color: {
      '': '#accent-text',
      'mood=excited': '#success-accent-text',
      'mood=warning': '#warning-accent-text',
      'mood=danger': '#danger-accent-text',
      'mood=loading': '#text-soft',
    },
    border: {
      '': '2bw solid #accent-text.25',
      'mood=excited': '2bw solid #success-accent-text.25',
      'mood=warning': '2bw solid #warning-accent-text.25',
      'mood=danger': '2bw solid #danger-accent-text.25',
      'mood=loading': '2bw solid #border',
    },
    shadow: {
      '': '0 2x 8x #accent-text.12',
      'mood=excited': '0 2x 12x #success-accent-text.20',
      'mood=warning': '0 2x 8x #warning-accent-text.15',
      'mood=danger': '0 2x 12x #danger-accent-text.20',
      'mood=loading': '0 1x 4x #black.05',
    },
    animation: {
      '': 'none',
      'mood=excited': 'wiggle 0.5s ease-in-out',
      'mood=loading': 'pulse 1.5s ease-in-out infinite',
    },
    $transition: '.3s',

    '@keyframes': {
      wiggle: {
        '0%, 100%': { transform: 'scale(1.05) rotate(0deg)' },
        '25%': { transform: 'scale(1.05) rotate(-3deg)' },
        '75%': { transform: 'scale(1.05) rotate(3deg)' },
      },
      pulse: {
        '0%, 100%': { opacity: '1', transform: 'scale(0.97)' },
        '50%': { opacity: '0.7', transform: 'scale(1)' },
      },
    },

    Badge: {
      position: 'absolute',
      inset: '-1.5x top, -1.5x right',
      display: 'grid',
      placeItems: 'center',
      width: '3.5x',
      height: '3.5x',
      preset: 't3',
      radius: 'round',
      fill: '#surface',
      border: true,
      shadow: '0 1x 3x #black.08',
      transition: 'scale',
      transform: { '': 'scale(1)', '@starting': 'scale(0)' },
    },
  },
  elements: {
    Badge: 'span',
  },
});

const Layout = tasty({
  styles: {
    display: 'grid',
    placeItems: 'center',
    height: 'min 40x',
  },
});

export const App = () => {
  const [moodIndex, setMoodIndex] = useState(0);
  const mood = MOODS[moodIndex];

  return (
    <Layout>
      <MoodRing
        mood={mood}
        onClick={() => setMoodIndex((i) => (i + 1) % MOODS.length)}
      >
        {MOOD_LABEL[mood]}
        <MoodRing.Badge>{MOOD_EMOJI[mood]}</MoodRing.Badge>
      </MoodRing>
    </Layout>
  );
};
