import { useGlobalStyles } from '@tenphi/tasty';

export function useAppGlobalStyles() {
  useGlobalStyles('body', {
    fill: '#surface',
    color: '#text',
    preset: 't2',
    margin: 0,
    padding: '2x',
    fontFamily: 'system-ui, sans-serif',
  });
}
