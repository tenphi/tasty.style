import { tastyStatic } from '@tenphi/tasty/static';

tastyStatic('*, *::before, *::after', {
  boxSizing: 'border-box',
});

tastyStatic('html', {
  scrollBehavior: {
    '': 'smooth',
    '@reduce-motion': 'auto',
  },
  scrollPaddingTop: '($header-height, 64px)',
});

tastyStatic('body', {
  recipe: 'palette typography',
  margin: 0,
  padding: 0,
  fill: '#primary-surface',
  color: '#primary-text',
  '#border': '#primary-border',
  font: true,
  preset: 't2',
  '$gap': '8px',
  '$radius': '10px',
  '$card-radius': '20px',
  '$border-width': '1px',
  '$outline-width': '2px',
  '$bold-font-weight': '600',
  '$transition': '0.2s',
  '$content-width': '1200px',
  '$header-height': '64px',
});
