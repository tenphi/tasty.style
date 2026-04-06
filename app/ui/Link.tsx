import NextLink from 'next/link';
import { tasty, BASE_STYLES, OUTER_STYLES, BLOCK_STYLES } from '@tenphi/tasty';

const Link = tasty({
  as: NextLink,
  styles: {
    color: {
      '': '#accent-text',
      ':hover': '#icon',
    },
    textDecoration: {
      '': 'none',
      ':hover': 'underline',
    },
    cursor: 'pointer',
    transition: 'color',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES],
});

export default Link;
