import { tasty } from '@tenphi/tasty';

const Block = tasty({
  styles: {
    padding: '2x',
  },
});

export const App = () => {
  return <Block>Hello, Tasty!</Block>;
};
