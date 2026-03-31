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

tastyStatic('.cm-panels', {
  fill: '#surface-2',
  color: '#text',
  font: 'monospace',
  preset: 't4',
});

tastyStatic('.sh-c', { color: '#syntax-comment', fontStyle: 'italic' });
tastyStatic('.sh-p', { color: '#syntax-punctuation' });
tastyStatic('.sh-k', { color: '#syntax-keyword' });
tastyStatic('.sh-s', { color: '#syntax-string' });
tastyStatic('.sh-t', { color: '#syntax-token' });
tastyStatic('.sh-r', { color: '#syntax-property' });
tastyStatic('.sh-n', { color: '#syntax-number' });
tastyStatic('.sh-f', { color: '#syntax-function' });
tastyStatic('.sh-v', { color: '#syntax-value' });
tastyStatic('.sh-o', { color: '#syntax-operator' });
