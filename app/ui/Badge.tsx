import {
  tasty,
  BASE_STYLES,
  OUTER_STYLES,
  BLOCK_STYLES,
  COLOR_STYLES,
} from '@tenphi/tasty';

const Badge = tasty({
  as: 'span',
  styles: {
    display: 'inline-flex',
    padding: '0.5x 1.5x',
    preset: 't3m',
    radius: 'round',
    fill: '#surface-3',
    color: '#accent-text-3',
    letterSpacing: '0.05em',
  },
  styleProps: [
    ...BASE_STYLES,
    ...OUTER_STYLES,
    ...BLOCK_STYLES,
    ...COLOR_STYLES,
  ],
});

export default Badge;
