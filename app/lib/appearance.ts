// Appearance choices are shared with the Cookbook docs under /docs. Both run
// on the same origin and use Cookbook's documented storage contract: one JSON
// object, `{ theme?: 'light' | 'dark' | 'system', contrast?: 'normal' | 'more'
// | 'system' }`, under `cookbook-appearance`. Each site maps it onto its own
// root attributes.
export const APPEARANCE_KEY = 'cookbook-appearance';

export type Theme = 'light' | 'dark';
export type Contrast = 'normal' | 'more';

/** Explicit choices; a missing field follows the system preference. */
export interface Appearance {
  theme?: Theme;
  contrast?: Contrast;
}

export function parseTheme(value: unknown): Theme | undefined {
  return value === 'light' || value === 'dark' ? value : undefined;
}

export function parseContrast(value: unknown): Contrast | undefined {
  return value === 'normal' || value === 'more' ? value : undefined;
}

function storedAppearance(): Record<string, unknown> {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(APPEARANCE_KEY) ?? '{}',
    );

    return value && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  } catch {
    // Without storage, the system preference applies.
    return {};
  }
}

export function loadAppearance(): Appearance {
  const stored = storedAppearance();

  return {
    theme: parseTheme(stored.theme),
    contrast: parseContrast(stored.contrast),
  };
}

/** Saves the given choices, keeping the rest of the object, including fields Cookbook may add. */
export function storeAppearance(change: Appearance): void {
  try {
    localStorage.setItem(
      APPEARANCE_KEY,
      JSON.stringify({ ...storedAppearance(), ...change }),
    );
  } catch {
    // The current page still updates when the choice cannot be persisted.
  }
}

/** Sets the root attributes; without them, the `@dark` and `@high-contrast` states fall back to media queries. */
export function applyAppearance({ theme, contrast }: Appearance): void {
  const root = document.documentElement;

  if (theme) root.dataset.schema = theme;
  else delete root.dataset.schema;

  if (contrast) root.dataset.contrast = contrast;
  else delete root.dataset.contrast;
}

/** Inline `<head>` script that applies a stored choice before the first paint. */
export const APPEARANCE_SCRIPT = `(() => {
  const root = document.documentElement;
  try {
    const { theme, contrast } =
      JSON.parse(localStorage.getItem(${JSON.stringify(APPEARANCE_KEY)}) || '{}') || {};
    if (theme === 'light' || theme === 'dark') root.dataset.schema = theme;
    if (contrast === 'normal' || contrast === 'more') root.dataset.contrast = contrast;
  } catch {}
})();`;
