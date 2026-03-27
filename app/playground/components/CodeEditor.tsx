'use client';

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TabBar, Tab, EditorWrap } from './primitives';

type TabName = 'code' | 'global' | 'config';

export interface CodeEditorHandle {
  setContent(tab: TabName, value: string): void;
  getContent(tab: TabName): string;
  flushPending(): void;
}

interface CodeEditorProps {
  initialCode: string;
  initialGlobal: string;
  initialConfig: string;
  onCodeChange: (code: string) => void;
  onGlobalChange: (global: string) => void;
  onConfigChange: (config: string) => void;
}

const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(
  function CodeEditor(
    {
      initialCode,
      initialGlobal,
      initialConfig,
      onCodeChange,
      onGlobalChange,
      onConfigChange,
    },
    ref,
  ) {
    const [activeTab, setActiveTab] = useState<TabName>('code');
    const codeContainerRef = useRef<HTMLDivElement>(null);
    const globalContainerRef = useRef<HTMLDivElement>(null);
    const configContainerRef = useRef<HTMLDivElement>(null);
    const codeViewRef = useRef<any>(null);
    const globalViewRef = useRef<any>(null);
    const configViewRef = useRef<any>(null);
    const debounceRef = useRef<{
      code?: ReturnType<typeof setTimeout>;
      global?: ReturnType<typeof setTimeout>;
      config?: ReturnType<typeof setTimeout>;
    }>({});
    const suppressRef = useRef(false);

    const onCodeChangeRef = useRef(onCodeChange);
    const onGlobalChangeRef = useRef(onGlobalChange);
    const onConfigChangeRef = useRef(onConfigChange);
    onCodeChangeRef.current = onCodeChange;
    onGlobalChangeRef.current = onGlobalChange;
    onConfigChangeRef.current = onConfigChange;

    const viewForTab = useCallback((tab: TabName) => {
      switch (tab) {
        case 'code':
          return codeViewRef.current;
        case 'global':
          return globalViewRef.current;
        case 'config':
          return configViewRef.current;
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        setContent(tab: TabName, value: string) {
          const view = viewForTab(tab);

          if (!view) return;

          const current = view.state.doc.toString();

          if (current !== value) {
            suppressRef.current = true;
            clearTimeout(debounceRef.current[tab]);
            view.dispatch({
              changes: { from: 0, to: current.length, insert: value },
            });
            suppressRef.current = false;
          }
        },
        getContent(tab: TabName): string {
          const view = viewForTab(tab);

          return view ? view.state.doc.toString() : '';
        },
        flushPending() {
          clearTimeout(debounceRef.current.code);
          clearTimeout(debounceRef.current.global);
          clearTimeout(debounceRef.current.config);
        },
      }),
      [viewForTab],
    );

    useEffect(() => {
      let destroyed = false;

      async function initEditors() {
        const [
          { EditorView, basicSetup },
          { EditorState },
          { javascript },
          { tastyCodeMirrorTheme },
        ] = await Promise.all([
          import('codemirror'),
          import('@codemirror/state'),
          import('@codemirror/lang-javascript'),
          import('../lib/codemirror-theme'),
        ]);

        if (destroyed) return;

        if (codeContainerRef.current && !codeViewRef.current) {
          codeViewRef.current = new EditorView({
            state: EditorState.create({
              doc: initialCode,
              extensions: [
                basicSetup,
                javascript({ jsx: true, typescript: true }),
                ...tastyCodeMirrorTheme,
                EditorView.updateListener.of((update) => {
                  if (update.docChanged && !suppressRef.current) {
                    clearTimeout(debounceRef.current.code);
                    debounceRef.current.code = setTimeout(() => {
                      onCodeChangeRef.current(update.state.doc.toString());
                    }, 500);
                  }
                }),
              ],
            }),
            parent: codeContainerRef.current,
          });
        }

        if (globalContainerRef.current && !globalViewRef.current) {
          globalViewRef.current = new EditorView({
            state: EditorState.create({
              doc: initialGlobal,
              extensions: [
                basicSetup,
                javascript({ jsx: false, typescript: true }),
                ...tastyCodeMirrorTheme,
                EditorView.updateListener.of((update) => {
                  if (update.docChanged && !suppressRef.current) {
                    clearTimeout(debounceRef.current.global);
                    debounceRef.current.global = setTimeout(() => {
                      onGlobalChangeRef.current(update.state.doc.toString());
                    }, 500);
                  }
                }),
              ],
            }),
            parent: globalContainerRef.current,
          });
        }

        if (configContainerRef.current && !configViewRef.current) {
          configViewRef.current = new EditorView({
            state: EditorState.create({
              doc: initialConfig,
              extensions: [
                basicSetup,
                javascript({ jsx: false, typescript: true }),
                ...tastyCodeMirrorTheme,
                EditorView.updateListener.of((update) => {
                  if (update.docChanged && !suppressRef.current) {
                    clearTimeout(debounceRef.current.config);
                    debounceRef.current.config = setTimeout(() => {
                      onConfigChangeRef.current(update.state.doc.toString());
                    }, 500);
                  }
                }),
              ],
            }),
            parent: configContainerRef.current,
          });
        }
      }

      initEditors();

      return () => {
        destroyed = true;
        clearTimeout(debounceRef.current.code);
        clearTimeout(debounceRef.current.global);
        clearTimeout(debounceRef.current.config);
        codeViewRef.current?.destroy();
        globalViewRef.current?.destroy();
        configViewRef.current?.destroy();
        codeViewRef.current = null;
        globalViewRef.current = null;
        configViewRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const switchTab = useCallback((tab: TabName) => {
      setActiveTab(tab);
    }, []);

    return (
      <>
        <TabBar>
          <Tab
            mods={{ active: activeTab === 'code' }}
            onClick={() => switchTab('code')}
          >
            Code
          </Tab>
          <Tab
            mods={{ active: activeTab === 'global' }}
            onClick={() => switchTab('global')}
          >
            Global
          </Tab>
          <Tab
            mods={{ active: activeTab === 'config' }}
            onClick={() => switchTab('config')}
          >
            Config
          </Tab>
        </TabBar>
        <EditorWrap
          ref={codeContainerRef}
          mods={{ hidden: activeTab !== 'code' }}
        />
        <EditorWrap
          ref={globalContainerRef}
          mods={{ hidden: activeTab !== 'global' }}
        />
        <EditorWrap
          ref={configContainerRef}
          mods={{ hidden: activeTab !== 'config' }}
        />
      </>
    );
  },
);

export default CodeEditor;
