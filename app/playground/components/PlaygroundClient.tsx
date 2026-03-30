'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { tasty, useKeyframes } from '@tenphi/tasty';
import { useMove } from '@react-aria/interactions';
import {
  IconRefresh,
  IconLink,
  IconArrowBackUp,
  IconDownload,
  IconToggleLeft,
  IconToggleRight,
} from '@tabler/icons-react';
import CodeEditor from './CodeEditor';
import type { CodeEditorHandle } from './CodeEditor';
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
  Toolbar,
  ToolbarSpacer,
  ToolbarButton,
  ExampleSelect,
  ModifiedBadge,
  CopiedToast,
} from './primitives';
import {
  DEFAULT_GLOBAL,
  DEFAULT_CONFIG,
  getSourceFiles,
  fetchPlaygroundSnapshot,
  PREVIEW_SCRIPT,
  SETUP_BINS_SCRIPT,
} from '../lib/project-files';
import { downloadProject } from '../lib/download-project';
import { prettifyHTML } from '../lib/prettify-html';
import { splitCSS, type CssSections } from '../lib/reorder-css';
import {
  decodeHash,
  updateHashDebounced,
  isStateModified,
  EXAMPLES,
  findExample,
  type PlaygroundState,
} from '../lib/hash-state';

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

const PlaygroundWrap = tasty({
  styles: {
    display: 'flex',
    flow: 'column',
    height: 'calc(100vh - ($header-height, 64px))',
    overflow: 'hidden',
  },
});

const PlaygroundGrid = tasty({
  styles: {
    display: 'grid',
    gridTemplateColumns: {
      '': 'var(--left-col, 50%) var(--right-col, 50%)',
      '@mobile': '1fr',
    },
    gridTemplateRows: {
      '': '1fr 1fr',
      'outputHidden': '1fr',
      'outputHidden & @mobile': '1fr 1fr',
    },
    flex: '1 1 0',
    minHeight: 0,
    overflow: 'hidden',
    position: 'relative',
  },
});

const OutputPanelsWrapper = tasty({
  styles: {
    display: {
      '': 'contents',
      'hidden': 'none',
      'hidden & @mobile': 'contents',
    },
  },
});

const OutputToggleButton = tasty({
  as: 'button',
  styles: {
    display: {
      '': 'inline-flex',
      '@mobile': 'none',
    },
    placeItems: 'center',
    placeContent: 'center',
    gap: '0.5x',
    padding: '0.5x 1.5x',
    fill: {
      '': 'transparent',
      ':hover | pressed': '#surface-3',
    },
    color: {
      '': '#text-soft',
      ':hover | pressed': '#text',
    },
    border: 'none',
    cursor: 'pointer',
    radius: '$button-radius',
    transition: 'theme',
    preset: 'label',
    flexShrink: 0,
    whiteSpace: 'nowrap',
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
      '': '#text-soft',
      ':hover': '#text',
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
    fill: '#surface-2',
    color: '#text',
    zIndex: 10,
    gap: '1x',
  },
});

const Spinner = tasty({
  styles: {
    width: '32px',
    height: '32px',
    border: '3px solid #border',
    borderTopColor: '#accent-text',
    radius: 'round',
    animation: 'spin 0.8s linear infinite',
  },
});

const StatusText = tasty({
  as: 'p',
  styles: {
    preset: 't3',
    color: '#text-soft',
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
        '': '#border',
        'dragging | :hover': '#accent-text',
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

function getInitialState(): PlaygroundState {
  if (typeof window === 'undefined') {
    return {
      slug: EXAMPLES[0].slug,
      code: EXAMPLES[0].code,
      global: DEFAULT_GLOBAL,
      config: DEFAULT_CONFIG,
      isModified: false,
    };
  }

  return decodeHash(window.location.hash);
}

const EXAMPLE_OPTIONS = EXAMPLES.map((e) => ({
  value: e.slug,
  label: e.label,
}));

export default function PlaygroundClient() {
  useKeyframes(
    {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
    { name: 'spin' },
  );

  const initialState = useRef(getInitialState());

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

  const [currentSlug, setCurrentSlug] = useState(initialState.current.slug);
  const [isModified, setIsModified] = useState(initialState.current.isModified);
  const [showCopied, setShowCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(true);

  const codeRef = useRef(initialState.current.code);
  const globalRef = useRef(initialState.current.global);
  const configRef = useRef(initialState.current.config);

  const editorRef = useRef<CodeEditorHandle>(null);
  const wcRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const copiedTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

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

  const updateHash = useCallback(() => {
    const example = findExample(currentSlug);

    if (!example) return;

    const state: PlaygroundState = {
      slug: currentSlug,
      code: codeRef.current,
      global: globalRef.current,
      config: configRef.current,
      isModified: isStateModified(
        {
          code: codeRef.current,
          global: globalRef.current,
          config: configRef.current,
        },
        example,
      ),
    };

    setIsModified(state.isModified);
    updateHashDebounced(state);
  }, [currentSlug]);

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
          getSourceFiles(
            codeRef.current,
            configRef.current,
            globalRef.current,
          ),
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

        devServer.exit.then((code: number) => {
          if (code !== 0 && !teardown) {
            console.error('[vite] process exited with code', code);
            setPhase('error');
            setErrorMsg(
              isSafari
                ? 'Safari requires DevTools to be open during initial loading. Open DevTools (\u2325\u2318I), then reload the page. You can close them once the playground is ready.'
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

  useEffect(() => {
    function handleHashChange() {
      const state = decodeHash(window.location.hash);

      codeRef.current = state.code;
      globalRef.current = state.global;
      configRef.current = state.config;
      setCurrentSlug(state.slug);
      setIsModified(state.isModified);

      editorRef.current?.setContent('code', state.code);
      editorRef.current?.setContent('global', state.global);
      editorRef.current?.setContent('config', state.config);

      writeAllFilesToWC(state.code, state.config, state.global);
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const writeAllFilesToWC = useCallback(
    async (code: string, config: string, global: string) => {
      const wc = wcRef.current;

      if (!wc) return;

      try {
        await Promise.all([
          wc.fs.writeFile('/src/App.tsx', code),
          wc.fs.writeFile('/src/config.ts', config),
          wc.fs.writeFile('/src/global.ts', global),
        ]);
      } catch (err) {
        console.warn('Failed to write files:', err);
      }
    },
    [],
  );

  const handleCodeChange = useCallback(
    (code: string) => {
      codeRef.current = code;
      wcRef.current?.fs
        .writeFile('/src/App.tsx', code)
        .catch((err: unknown) => console.warn('Failed to write App.tsx:', err));
      updateHash();
    },
    [updateHash],
  );

  const handleGlobalChange = useCallback(
    (global: string) => {
      globalRef.current = global;
      wcRef.current?.fs
        .writeFile('/src/global.ts', global)
        .catch((err: unknown) =>
          console.warn('Failed to write global.ts:', err),
        );
      updateHash();
    },
    [updateHash],
  );

  const handleConfigChange = useCallback(
    (config: string) => {
      configRef.current = config;
      wcRef.current?.fs
        .writeFile('/src/config.ts', config)
        .catch((err: unknown) =>
          console.warn('Failed to write config.ts:', err),
        );
      updateHash();
    },
    [updateHash],
  );

  const handleExampleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const slug = e.target.value;
      const example = findExample(slug);

      if (!example) return;

      editorRef.current?.flushPending();

      codeRef.current = example.code;
      globalRef.current = DEFAULT_GLOBAL;
      configRef.current = DEFAULT_CONFIG;
      setCurrentSlug(slug);
      setIsModified(false);

      editorRef.current?.setContent('code', example.code);
      editorRef.current?.setContent('global', DEFAULT_GLOBAL);
      editorRef.current?.setContent('config', DEFAULT_CONFIG);

      writeAllFilesToWC(example.code, DEFAULT_CONFIG, DEFAULT_GLOBAL);

      const url = new URL(window.location.href);

      url.hash = slug;
      window.history.replaceState(null, '', url.toString());
    },
    [writeAllFilesToWC],
  );

  const handleReset = useCallback(() => {
    const example = findExample(currentSlug);

    if (!example) return;

    editorRef.current?.flushPending();

    codeRef.current = example.code;
    globalRef.current = DEFAULT_GLOBAL;
    configRef.current = DEFAULT_CONFIG;
    setIsModified(false);

    editorRef.current?.setContent('code', example.code);
    editorRef.current?.setContent('global', DEFAULT_GLOBAL);
    editorRef.current?.setContent('config', DEFAULT_CONFIG);

    writeAllFilesToWC(example.code, DEFAULT_CONFIG, DEFAULT_GLOBAL);

    const url = new URL(window.location.href);

    url.hash = example.slug;
    window.history.replaceState(null, '', url.toString());
  }, [currentSlug, writeAllFilesToWC]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowCopied(true);
      clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = setTimeout(() => setShowCopied(false), 1500);
    });
  }, []);

  const handleDownload = useCallback(() => {
    downloadProject(
      codeRef.current,
      configRef.current,
      globalRef.current,
      currentSlug,
    );
  }, [currentSlug]);

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

  const handleToggleOutput = useCallback(() => {
    setShowOutput((prev) => !prev);
  }, []);

  const gridStyle = {
    '--left-col': `${leftWidth}%`,
    '--right-col': `${100 - leftWidth}%`,
  } as React.CSSProperties;

  return (
    <PlaygroundWrap>
      <Toolbar>
        <ExampleSelect
          value={currentSlug}
          options={EXAMPLE_OPTIONS}
          onChange={handleExampleChange}
        />
        <ModifiedBadge mods={{ visible: isModified }}>
          (modified)
        </ModifiedBadge>
        {isModified && (
          <ToolbarButton
            onClick={handleReset}
            aria-label="Reset to original"
            title="Reset to original"
          >
            <IconArrowBackUp size={14} />
            Reset
          </ToolbarButton>
        )}
        <ToolbarSpacer />
        <CopiedToast mods={{ visible: showCopied }}>Copied!</CopiedToast>
        <OutputToggleButton
          onClick={handleToggleOutput}
          mods={{ pressed: showOutput }}
          aria-label={showOutput ? 'Hide output panels' : 'Show output panels'}
          title={showOutput ? 'Hide output panels' : 'Show output panels'}
          aria-pressed={showOutput}
        >
          {showOutput ? <IconToggleRight size={14} /> : <IconToggleLeft size={14} />}
          Output
        </OutputToggleButton>
        <ToolbarButton
          onClick={handleCopyLink}
          aria-label="Copy link"
          title="Copy link to clipboard"
        >
          <IconLink size={14} />
          Share
        </ToolbarButton>
        <ToolbarButton
          onClick={handleDownload}
          aria-label="Download project"
          title="Download as zip"
        >
          <IconDownload size={14} />
          Download
        </ToolbarButton>
      </Toolbar>
      <PlaygroundGrid ref={gridRef} style={gridStyle} mods={{ outputHidden: !showOutput }}>
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
          ref={editorRef}
          initialCode={initialState.current.code}
          initialGlobal={initialState.current.global}
          initialConfig={initialState.current.config}
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

        <OutputPanelsWrapper mods={{ hidden: !showOutput }}>
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
        </OutputPanelsWrapper>
      </OutputSection>
      </PlaygroundGrid>
    </PlaygroundWrap>
  );
}
