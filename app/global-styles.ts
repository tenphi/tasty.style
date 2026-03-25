import { tastyStatic } from '@tenphi/tasty/static';

tastyStatic('*, *::before, *::after', {
  boxSizing: 'border-box',
});

tastyStatic('html', {
  scrollPaddingTop: '($header-height, 64px)',
});

tastyStatic('body', {
  '-webkit-text-size-adjust': '100%',
  textSizeAdjust: '100%',
  margin: 0,
  padding: 0,
  fill: '#primary-surface',
  color: '#primary-text',
  '#border': '#primary-border',
  font: true,
  preset: 't2',
});

tastyStatic('code, pre, kbd', {
  fontFamily: 'var(--monospace-font)',
});

tastyStatic('b', {
  fontWeight: '$bold-font-weight',
});
