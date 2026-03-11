import { withTastyZero } from '@tenphi/tasty/next';

export default withTastyZero({
  output: 'public/tasty.css',
  configFile: './app/tasty-zero.config.ts',
  configDeps: ['./app/theme.ts'],
})({
  reactStrictMode: true,
});
