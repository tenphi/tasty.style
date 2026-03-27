import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';
import {
  type PlaygroundExample,
  EXAMPLES,
  DEFAULT_EXAMPLE,
  findExample,
} from './examples';
import { DEFAULT_CONFIG, DEFAULT_GLOBAL } from './project-files';

export interface PlaygroundState {
  slug: string;
  code: string;
  global: string;
  config: string;
  isModified: boolean;
}

interface CompactPayload {
  e: string;
  c?: string;
  g?: string;
  k?: string;
}

export function getDefaultState(): PlaygroundState {
  return {
    slug: DEFAULT_EXAMPLE.slug,
    code: DEFAULT_EXAMPLE.code,
    global: DEFAULT_GLOBAL,
    config: DEFAULT_CONFIG,
    isModified: false,
  };
}

export function isStateModified(
  state: { code: string; global: string; config: string },
  example: PlaygroundExample,
): boolean {
  return (
    state.code !== example.code ||
    state.global !== DEFAULT_GLOBAL ||
    state.config !== DEFAULT_CONFIG
  );
}

export function encodeHash(state: PlaygroundState): string {
  const example = findExample(state.slug);

  if (!example) return state.slug;

  const modified = isStateModified(state, example);

  if (!modified) return example.slug;

  const payload: CompactPayload = { e: example.slug };

  if (state.code !== example.code) payload.c = state.code;
  if (state.global !== DEFAULT_GLOBAL) payload.g = state.global;
  if (state.config !== DEFAULT_CONFIG) payload.k = state.config;

  return compressToEncodedURIComponent(JSON.stringify(payload));
}

export function decodeHash(hash: string): PlaygroundState {
  const raw = hash.replace(/^#/, '');

  if (!raw) return getDefaultState();

  const matchedExample = findExample(raw);

  if (matchedExample) {
    return {
      slug: matchedExample.slug,
      code: matchedExample.code,
      global: DEFAULT_GLOBAL,
      config: DEFAULT_CONFIG,
      isModified: false,
    };
  }

  try {
    const json = decompressFromEncodedURIComponent(raw);

    if (!json) return getDefaultState();

    const payload: CompactPayload = JSON.parse(json);
    const baseExample = findExample(payload.e) ?? DEFAULT_EXAMPLE;

    const state: PlaygroundState = {
      slug: baseExample.slug,
      code: payload.c ?? baseExample.code,
      global: payload.g ?? DEFAULT_GLOBAL,
      config: payload.k ?? DEFAULT_CONFIG,
      isModified: false,
    };

    state.isModified = isStateModified(state, baseExample);

    return state;
  } catch {
    return getDefaultState();
  }
}

let hashUpdateTimer: ReturnType<typeof setTimeout> | undefined;

export function updateHashDebounced(state: PlaygroundState, delay = 500) {
  clearTimeout(hashUpdateTimer);
  hashUpdateTimer = setTimeout(() => {
    const hash = encodeHash(state);
    const url = new URL(window.location.href);

    url.hash = hash;
    window.history.replaceState(null, '', url.toString());
  }, delay);
}

export { EXAMPLES, DEFAULT_EXAMPLE, findExample };
