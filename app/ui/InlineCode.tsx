import { tasty, BASE_STYLES, OUTER_STYLES } from '@tenphi/tasty';

const InlineCode = tasty({
  as: 'code',
  styles: {
    display: 'inline',
    padding: '0.15em 0.35em',
    fontSize: '0.875em',
    font: 'monospace',
    fill: '#surface-2',
    color: '#accent-text-2',
    radius: '1r',
    border: '1bw solid #border',
    whiteSpace: 'nowrap',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES],
});

export default InlineCode;
