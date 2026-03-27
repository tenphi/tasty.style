'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { tasty, useKeyframes } from '@tenphi/tasty';
import { useMove } from '@react-aria/interactions';
import { IconRefresh } from '@tabler/icons-react';
import CodeEditor from './CodeEditor';
import OutputPanel from './OutputPanel';
import CssOutputPanel from './CssOutputPanel';
import {
  PANEL_HEADER_HEIGHT,
  Panel,
  PanelHeaderBar,
  HeaderLabel,
  MobilePanelSelect,
  PreviewFrame,
  OutputSection,
} from './primitives';
import {
  DEFAULT_CODE,
  DEFAULT_GLOBAL,
  DEFAULT_CONFIG,
  getSourceFiles,
  fetchPlaygroundSnapshot,
  PREVIEW_SCRIPT,
  SETUP_BINS_SCRIPT,
} from '../lib/project-files';
import { prettifyHTML } from '../lib/prettify-html';
import { splitCSS, type CssSections } from '../lib/reorder-css';

type BootPhase =
  | 'coi-check'
  | 'coi-registering'
  | 'booting'
  | 'mounting'
  | 'starting'
  | 'ready'
  | 'error';

const PHASE_LABELS: Record<BootPhase, string> = {
  'coi-check': 'Checking cross-origin isolation\u2026',
  'coi-registering': 'Enabling cross-origin isolation\u2026',
  booting: 'Booting WebContainer\u2026',
  mounting: 'Mounting project files\u2026',
  starting: 'Starting dev server\u2026',
  ready: 'Ready!',
  error: 'Something went wrong.',
};

const PlaygroundGrid = tasty({
  styles: {
    display: 'grid',
    gridTemplateColumns: {
      '': 'var(--left-col, 50%) var(--right-col, 50%)',
      '@mobile': '1fr',
    },
    gridTemplateRows: '1fr 1fr',
    height: 'calc(100vh - ($header-height, 64px))',
    overflow: 'hidden',
    position: 'relative',
  },
});

const ReloadButton = tasty({
  as: 'button',
  styles: {
    display: 'inline-flex',
    placeItems: 'center',
    placeContent: 'center',
    padding: '0.5x',
    fill: 'transparent',
    color: {
      '': '#primary-text-soft',
      ':hover': '#primary-text',
    },
    border: 'none',
    cursor: 'pointer',
    radius: '0.5r',
    transition: 'theme',
  },
});

const Overlay = tasty({
  styles: {
    position: 'absolute',
    inset: `${PANEL_HEADER_HEIGHT} 0 0 0`,
    display: 'flex',
    flow: 'column',
    placeItems: 'center',
    placeContent: 'center',
    fill: '#primary-surface-2',
    color: '#primary-text',
    zIndex: 10,
    gap: '1x',
  },
});

const Spinner = tasty({
  styles: {
    width: '32px',
    height: '32px',
    border: '3px solid #primary-border',
    borderTopColor: '#primary-accent-text',
    radius: 'round',
    animation: 'spin 0.8s linear infinite',
  },
});

const StatusText = tasty({
  as: 'p',
  styles: {
    preset: 't3',
    color: '#primary-text-soft',
    margin: 0,
  },
});

const ErrorText = tasty({
  as: 'p',
  styles: {
    preset: 't3',
    color: '#coral-accent-text',
    margin: 0,
    textAlign: 'center',
    textWrap: 'balance',
  },
});

const ResizeHandle = tasty({
  styles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '9px',
    margin: '0 0 0 -4px',
    cursor: 'col-resize',
    touchAction: 'none',
    zIndex: 20,
    display: {
      '': 'flex',
      '@mobile': 'none',
    },
    placeItems: 'center',
    placeContent: 'center',
    Indicator: {
      width: {
        '': '1px',
        'dragging | :hover': '3px',
      },
      height: '100%',
      fill: {
        '': '#primary-border',
        'dragging | :hover': '#primary-accent-text',
      },
      transition: 'fill 0.15s, width 0.15s',
      radius: 'round',
    },
  },
  elements: {
    Indicator: 'div',
  },
});

const DragOverlay = tasty({
  styles: {
    position: 'absolute',
    inset: 0,
    zIndex: 15,
    cursor: 'col-resize',
  },
});

type MobilePanel = 'preview' | 'css' | 'html';

export default function PlaygroundClient() {
  useKeyframes(
    {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
    { name: 'spin' },
  );

  const [phase, setPhase] = useState<BootPhase>('coi-check');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [cssSections, setCssSections] = useState<CssSections>({
    elements: '',
    tokens: '',
    utility: '',
  });
  const [htmlOutput, setHtmlOutput] = useState('');
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>('preview');
  const wcRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const { moveProps } = useMove({
    onMoveStart() {
      setIsDragging(true);
    },
    onMove(e) {
      const grid = gridRef.current;
      if (!grid) return;
      const gridWidth = grid.getBoundingClientRect().width;
      const deltaPercent = (e.deltaX / gridWidth) * 100;
      setLeftWidth((prev) => Math.min(80, Math.max(20, prev + deltaPercent)));
    },
    onMoveEnd() {
      setIsDragging(false);
    },
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const supportsCredentialless =
      typeof (window as any).chrome !== 'undefined' ||
      typeof (window as any).netscape !== 'undefined';
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (!window.crossOriginIsolated) {
      setPhase('coi-registering');

      (window as any).coi = {
        coepCredentialless: () => supportsCredentialless,
        quiet: true,
      };

      const script = document.createElement('script');
      script.src = '/coi-serviceworker.js';
      script.onerror = () => {
        setPhase('error');
        setErrorMsg(
          'Failed to load cross-origin isolation script. Make sure coi-serviceworker.js is in public/.',
        );
      };
      document.head.appendChild(script);
      return;
    }

    let teardown = false;

    async function boot() {
      try {
        setPhase('booting');
        const { WebContainer } = await import('@webcontainer/api');

        if (teardown) return;

        const coepMode = supportsCredentialless
          ? 'credentialless'
          : 'require-corp';

        const [wc, snapshotData] = await Promise.all([
          WebContainer.boot({
            coep: coepMode as 'credentialless' | 'require-corp',
            forwardPreviewErrors: true,
          }),
          fetchPlaygroundSnapshot(),
        ]);

        if (teardown) return;

        wcRef.current = wc;

        await wc.setPreviewScript(PREVIEW_SCRIPT);

        setPhase('mounting');
        await wc.mount(snapshotData);
        await wc.mount(
          getSourceFiles(DEFAULT_CODE, DEFAULT_CONFIG, DEFAULT_GLOBAL),
        );

        if (teardown) return;

        const setup = await wc.spawn('node', ['-e', SETUP_BINS_SCRIPT]);
        await setup.exit;

        if (teardown) return;

        setPhase('starting');
        const devServer = await wc.spawn('npm', ['run', 'dev']);

        devServer.output.pipeTo(
          new WritableStream({
            write(chunk) {
              console.log('[vite]', chunk);
            },
          }),
        );

        devServer.exit.then((code) => {
          if (code !== 0 && !teardown) {
            console.error('[vite] process exited with code', code);
            setPhase('error');
            setErrorMsg(
              isSafari
                ? 'Safari requires DevTools to be open during initial loading. Open DevTools (⌥⌘I), then reload the page. You can close them once the playground is ready.'
                : `Dev server crashed (exit code ${code}). Try reloading the page.`,
            );
          }
        });

        wc.on('server-ready', (_port: number, url: string) => {
          setPreviewUrl(url);
          setPhase('ready');
        });

        wc.on('error', (err: { message: string }) => {
          console.error('[webcontainer]', err.message);
        });
      } catch (err) {
        if (teardown) return;
        setPhase('error');
        setErrorMsg(
          err instanceof Error ? err.message : 'Unknown error during boot.',
        );
      }
    }

    boot();

    return () => {
      teardown = true;
      wcRef.current?.teardown();
    };
  }, []);

  useEffect(() => {
    function syncRootStates() {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;

      const root = document.documentElement;
      iframe.contentWindow.postMessage(
        {
          type: 'tasty-playground-root-states',
          schema: root.dataset.schema || null,
          contrast: root.dataset.contrast || null,
        },
        '*',
      );
    }

    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'tasty-playground-update') {
        setCssSections(splitCSS(event.data.css || ''));
        setHtmlOutput(prettifyHTML(event.data.html || ''));
      } else if (event.data?.type === 'tasty-playground-request-root-states') {
        syncRootStates();
      }
    }

    window.addEventListener('message', handleMessage);

    const rootObserver = new MutationObserver(syncRootStates);
    rootObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-schema', 'data-contrast'],
    });

    return () => {
      window.removeEventListener('message', handleMessage);
      rootObserver.disconnect();
    };
  }, []);

  const handleCodeChange = useCallback(async (code: string) => {
    try {
      await wcRef.current?.fs.writeFile('/src/App.tsx', code);
    } catch (err) {
      console.warn('Failed to write App.tsx:', err);
    }
  }, []);

  const handleGlobalChange = useCallback(async (global: string) => {
    try {
      await wcRef.current?.fs.writeFile('/src/global.ts', global);
    } catch (err) {
      console.warn('Failed to write global.ts:', err);
    }
  }, []);

  const handleConfigChange = useCallback(async (config: string) => {
    try {
      await wcRef.current?.fs.writeFile('/src/config.ts', config);
    } catch (err) {
      console.warn('Failed to write config.ts:', err);
    }
  }, []);

  const isLoading = phase !== 'ready' && phase !== 'error';

  const handleReload = useCallback(() => {
    if (iframeRef.current && previewUrl) {
      iframeRef.current.src = previewUrl;
    }
  }, [previewUrl]);

  const handleMobilePanelChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setMobilePanel(e.target.value as MobilePanel);
    },
    [],
  );

  const gridStyle = {
    '--left-col': `${leftWidth}%`,
    '--right-col': `${100 - leftWidth}%`,
  } as React.CSSProperties;

  return (
    <PlaygroundGrid ref={gridRef} style={gridStyle}>
      {isDragging && <DragOverlay />}
      <ResizeHandle
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize columns"
        aria-valuenow={Math.round(leftWidth)}
        aria-valuemin={20}
        aria-valuemax={80}
        tabIndex={0}
        style={{ left: `${leftWidth}%` }}
        mods={{ dragging: isDragging }}
        {...moveProps}
      >
        <ResizeHandle.Indicator />
      </ResizeHandle>
      <Panel>
        <CodeEditor
          defaultCode={DEFAULT_CODE}
          defaultGlobal={DEFAULT_GLOBAL}
          defaultConfig={DEFAULT_CONFIG}
          onCodeChange={handleCodeChange}
          onGlobalChange={handleGlobalChange}
          onConfigChange={handleConfigChange}
        />
      </Panel>

      <OutputSection>
        <Panel mods={{ mobileHidden: mobilePanel !== 'preview' }}>
          <PanelHeaderBar>
            <MobilePanelSelect
              value={mobilePanel}
              onChange={handleMobilePanelChange}
            />
            <HeaderLabel>Preview</HeaderLabel>
            {phase === 'ready' && (
              <ReloadButton
                onClick={handleReload}
                aria-label="Reload preview"
                title="Reload preview"
              >
                <IconRefresh size={14} />
              </ReloadButton>
            )}
          </PanelHeaderBar>
          {(isLoading || phase === 'error') && (
            <Overlay>
              {phase === 'error' ? (
                <ErrorText>{errorMsg || PHASE_LABELS.error}</ErrorText>
              ) : (
                <>
                  <Spinner />
                  <StatusText>{PHASE_LABELS[phase]}</StatusText>
                </>
              )}
            </Overlay>
          )}
          <PreviewFrame
            ref={iframeRef}
            src={previewUrl || 'about:blank'}
            title="Playground preview"
            allow="cross-origin-isolated"
          />
        </Panel>

        <Panel mods={{ mobileHidden: mobilePanel !== 'css' }}>
          <CssOutputPanel
            sections={cssSections}
            mobilePanel={mobilePanel}
            onMobilePanelChange={handleMobilePanelChange}
          />
        </Panel>

        <Panel mods={{ mobileHidden: mobilePanel !== 'html' }}>
          <OutputPanel
            label="HTML Output"
            value={htmlOutput}
            language="html"
            mobilePanel={mobilePanel}
            onMobilePanelChange={handleMobilePanelChange}
          />
        </Panel>
      </OutputSection>
    </PlaygroundGrid>
  );
}
