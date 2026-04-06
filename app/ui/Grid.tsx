import {
  tasty,
  BASE_STYLES,
  OUTER_STYLES,
  BLOCK_STYLES,
  FLOW_STYLES,
} from '@tenphi/tasty';

const Grid = tasty({
  styles: {
    display: 'grid',
    gap: '2x',
  },
  styleProps: [
    ...BASE_STYLES,
    ...OUTER_STYLES,
    ...BLOCK_STYLES,
    ...FLOW_STYLES,
  ],
});

export default Grid;
