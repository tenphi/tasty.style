'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { tasty } from '@tenphi/tasty';
import { IconSearch } from '@tabler/icons-react';

interface SearchResult {
  url: string;
  title: string;
  excerpt: string;
}

interface PagefindResult {
  data: () => Promise<{
    url: string;
    meta: { title?: string };
    excerpt: string;
  }>;
}

interface PagefindResponse {
  results: PagefindResult[];
}

interface PagefindModule {
  init: () => Promise<void>;
  search: (query: string) => Promise<PagefindResponse>;
}

const SearchTrigger = tasty({
  as: 'button',
  styles: {
    display: 'flex',
    flow: 'row',
    placeItems: 'center',
    gap: '1x',
    padding: '0.75x 1.5x',
    radius: 'round',
    border: true,
    fill: '#surface-2',
    color: '#text-soft',
    preset: 't3',
    cursor: 'pointer',
    transition: 'theme',
    opacity: {
      '': 0.8,
      ':hover': 1,
    },
    textAlign: 'left',
    hide: {
      '': true,
      '@desktop': false,
    },
  },
});

const SearchIconTrigger = tasty({
  as: 'button',
  styles: {
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    padding: '1x',
    radius: 'round',
    border: 'none',
    fill: {
      '': 'transparent',
      ':hover': '#surface-2',
    },
    color: '#text-soft',
    cursor: 'pointer',
    transition: 'theme',
    hide: {
      '': false,
      '@desktop': true,
    },
  },
});

const Kbd = tasty({
  as: 'kbd',
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    margin: 'auto left',
    padding: '0 0.75x',
    height: '2.5x',
    radius: '0.5r',
    fill: '#surface',
    border: true,
    preset: 't4',
    color: '#text-soft',
    fontFamily: 'inherit',
    lineHeight: 1,
  },
});

const Backdrop = tasty({
  styles: {
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    fill: '#black.50',
    display: 'flex',
    placeItems: 'center',
    padding: '10vh 2x 2x',
  },
});

const DialogPanel = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    width: 'initial 100% 560px',
    maxHeight: '70vh',
    radius: '1.5r',
    fill: '#surface',
    border: true,
    shadow: '0 8x 24x #shadow-lg',
    overflow: 'hidden',
  },
});

const SearchInputWrap = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    placeItems: 'center',
    gap: '1.5x',
    padding: '2x 2.5x',
    borderBottom: '1bw solid #border',
  },
});

const SearchInput = tasty({
  as: 'input',
  styles: {
    display: 'block',
    flexGrow: 1,
    border: 'none',
    outline: 'none',
    fill: 'transparent',
    color: '#text',
    preset: 't2',
    Placeholder: {
      $: '::placeholder',
      color: '#text-soft',
    },
  },
});

const ResultsList = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    flexGrow: 1,
    overflow: 'hidden auto',
    padding: '1x',
    scrollbar: 'thin',
  },
});

const ResultItem = tasty({
  as: 'a',
  styles: {
    display: 'block',
    padding: '1.5x 2x',
    radius: '1r',
    textDecoration: 'none',
    cursor: 'pointer',
    fill: {
      '': 'transparent',
      selected: '#accent-surface.08',
    },
    transition: 'theme',
    ResultTitle: {
      $: '>',
      display: 'block',
      preset: 't3m',
      color: {
        '': '#text',
        '@parent(selected)': '#accent-text',
      },
      margin: '0 0 0.25x',
    },
    ResultExcerpt: {
      $: '>',
      display: 'block',
      preset: 't4',
      color: '#text-soft',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'normal',
    },
  },
  elements: {
    ResultTitle: 'span',
    ResultExcerpt: 'span',
  },
});

const EmptyState = tasty({
  styles: {
    display: 'flex',
    placeContent: 'center',
    placeItems: 'center',
    padding: '4x 2x',
    preset: 't3',
    color: '#text-soft',
  },
});

const Footer = tasty({
  styles: {
    display: 'flex',
    flow: 'row',
    placeItems: 'center',
    placeContent: 'space-between',
    padding: '1x 2x',
    border: 'top #border',
    preset: 't4',
    color: '#text-soft',
    gap: '0.5x',
  },
});

let pagefindInstance: PagefindModule | null = null;

async function loadPagefind(): Promise<PagefindModule | null> {
  if (pagefindInstance) return pagefindInstance;

  try {
    const pfPath = '/pagefind/pagefind.js';
    const pf = (await import(
      /* webpackIgnore: true */ pfPath
    )) as PagefindModule;
    await pf.init();
    pagefindInstance = pf;
    return pf;
  } catch {
    return null;
  }
}

export default function SearchDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pfAvailable, setPfAvailable] = useState<boolean | null>(null);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    setSelectedIndex(0);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    loadPagefind().then((pf) => {
      setPfAvailable(pf !== null);
    });
  }, []);

  useEffect(() => {
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          open();
        }
      }

      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close, open]);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform ?? ''));
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const pf = await loadPagefind();
      if (!pf) return;

      setIsLoading(true);
      try {
        const response = await pf.search(query);
        const items: SearchResult[] = [];

        for (const result of response.results.slice(0, 8)) {
          const data = await result.data();
          items.push({
            url: data.url,
            title: data.meta.title || 'Untitled',
            excerpt: data.excerpt,
          });
        }

        setResults(items);
        setSelectedIndex(0);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function navigateTo(url: string) {
    close();
    router.push(url);
  }

  function handleResultKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      navigateTo(results[selectedIndex].url);
    }
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === backdropRef.current) {
      close();
    }
  }

  const handleTriggerClick = isOpen ? close : open;

  return (
    <>
      <SearchTrigger onClick={handleTriggerClick} aria-label="Search docs">
        <IconSearch size={16} />
        Search docs...
        <Kbd>{isMac ? '⌘K' : 'Ctrl K'}</Kbd>
      </SearchTrigger>
      <SearchIconTrigger onClick={handleTriggerClick} aria-label="Search docs">
        <IconSearch size={18} />
      </SearchIconTrigger>
      {isOpen &&
        createPortal(
          <Backdrop ref={backdropRef} onClick={handleBackdropClick}>
            <DialogPanel role="dialog" aria-label="Search documentation">
              <SearchInputWrap>
                <IconSearch size={18} style={{ flexShrink: 0, opacity: 0.5 }} />
                <SearchInput
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation..."
                  value={query}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuery(e.target.value)
                  }
                  onKeyDown={handleResultKeyDown}
                  aria-label="Search query"
                />
              </SearchInputWrap>

              <ResultsList>
                {pfAvailable === false ? (
                  <EmptyState>
                    Search is available in production builds.
                  </EmptyState>
                ) : isLoading ? (
                  <EmptyState>Searching...</EmptyState>
                ) : query && results.length === 0 ? (
                  <EmptyState>No results found.</EmptyState>
                ) : results.length > 0 ? (
                  results.map((result, i) => (
                    <ResultItem
                      key={result.url}
                      href={result.url}
                      mods={{ selected: i === selectedIndex }}
                      ref={(el: HTMLAnchorElement | null) => {
                        if (i === selectedIndex && el) {
                          el.scrollIntoView({ block: 'nearest' });
                        }
                      }}
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        navigateTo(result.url);
                      }}
                    >
                      <ResultItem.ResultTitle>
                        {result.title}
                      </ResultItem.ResultTitle>
                      <ResultItem.ResultExcerpt
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    </ResultItem>
                  ))
                ) : (
                  <EmptyState>Type to search the docs.</EmptyState>
                )}
              </ResultsList>

              <Footer>
                <span>
                  <Kbd>↑↓</Kbd> navigate
                </span>
                <span>
                  <Kbd>↵</Kbd> open
                </span>
                <span>
                  <Kbd>esc</Kbd> close
                </span>
              </Footer>
            </DialogPanel>
          </Backdrop>,
          document.body,
        )}
    </>
  );
}
