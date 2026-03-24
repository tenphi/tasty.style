'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface DocsSidebarContextValue {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const DocsSidebarContext = createContext<DocsSidebarContextValue | null>(null);

export function DocsSidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <DocsSidebarContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </DocsSidebarContext.Provider>
  );
}

export function useDocsSidebar(): DocsSidebarContextValue | null {
  return useContext(DocsSidebarContext);
}
