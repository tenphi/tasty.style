import NextLink from 'next/link';
import { tasty, BASE_STYLES, OUTER_STYLES, BLOCK_STYLES } from '@tenphi/tasty';

const Link = tasty({
  as: NextLink,
  styles: {
    color: {
      '': '#accent-text',
      ':hover': '#icon',
    },
    textDecoration: 'underline',
    textDecorationColor: {
      '': '#accent-text.40',
      ':hover': '#accent-text',
    },
    textUnderlineOffset: '2px',
    cursor: 'pointer',
    transition: 'color, text-decoration-color',
  },
  styleProps: [...BASE_STYLES, ...OUTER_STYLES, ...BLOCK_STYLES],
});

export default Link;
