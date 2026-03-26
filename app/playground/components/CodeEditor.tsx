'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { TabBar, Tab, EditorWrap } from './primitives';

interface CodeEditorProps {
  defaultCode: string;
  defaultGlobal: string;
  defaultConfig: string;
  onCodeChange: (code: string) => void;
  onGlobalChange: (global: string) => void;
  onConfigChange: (config: string) => void;
}

export default function CodeEditor({
  defaultCode,
  defaultGlobal,
  defaultConfig,
  onCodeChange,
  onGlobalChange,
  onConfigChange,
}: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'global' | 'config'>(
    'code',
  );
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

  const onCodeChangeRef = useRef(onCodeChange);
  const onGlobalChangeRef = useRef(onGlobalChange);
  const onConfigChangeRef = useRef(onConfigChange);
  onCodeChangeRef.current = onCodeChange;
  onGlobalChangeRef.current = onGlobalChange;
  onConfigChangeRef.current = onConfigChange;

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
            doc: defaultCode,
            extensions: [
              basicSetup,
              javascript({ jsx: true, typescript: true }),
              ...tastyCodeMirrorTheme,
              EditorView.updateListener.of((update) => {
                if (update.docChanged) {
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
            doc: defaultGlobal,
            extensions: [
              basicSetup,
              javascript({ jsx: false, typescript: true }),
              ...tastyCodeMirrorTheme,
              EditorView.updateListener.of((update) => {
                if (update.docChanged) {
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
            doc: defaultConfig,
            extensions: [
              basicSetup,
              javascript({ jsx: false, typescript: true }),
              ...tastyCodeMirrorTheme,
              EditorView.updateListener.of((update) => {
                if (update.docChanged) {
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

  const switchTab = useCallback((tab: 'code' | 'global' | 'config') => {
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
}
