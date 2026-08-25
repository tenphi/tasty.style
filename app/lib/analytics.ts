interface GoatCounter {
  count?: (options: { path: string; title?: string; event: true }) => void;
}

export function trackEvent(path: string, title?: string, attempt = 0): void {
  if (typeof window === 'undefined') return;

  const goatcounter = (window as Window & { goatcounter?: GoatCounter })
    .goatcounter;

  if (goatcounter?.count) {
    goatcounter.count({ path, title, event: true });
    return;
  }

  if (attempt < 20) {
    window.setTimeout(() => trackEvent(path, title, attempt + 1), 250);
  }
}
