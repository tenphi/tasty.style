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
  fill: '#surface',
  color: '#text',
  '#border': '#border',
  font: true,
  preset: 't2',
});

tastyStatic('code, pre, kbd', {
  fontFamily: '$font-mono',
});

tastyStatic('b', {
  fontWeight: '$bold-font-weight',
});

tastyStatic('.cm-editor', {
  fontFamily: '$font-mono',
  fontSize: '14px',
  fontWeight: '$c1-font-weight',
  height: '100%',
});
