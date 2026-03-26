'use client';

import type { ChangeEvent } from 'react';
import { useRef, useEffect } from 'react';
import {
  PanelHeaderBar,
  HeaderLabel,
  MobilePanelSelect,
  EditorWrap,
} from './primitives';

interface OutputPanelProps {
  value: string;
  language: 'css' | 'html';
  label: string;
  mobilePanel?: string;
  onMobilePanelChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function OutputPanel({
  value,
  language,
  label,
  mobilePanel,
  onMobilePanelChange,
}: OutputPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<any>(null);
  const latestValueRef = useRef(value);
  latestValueRef.current = value;

  useEffect(() => {
    let destroyed = false;

    async function init() {
      const [{ EditorView, basicSetup }, { EditorState }] = await Promise.all([
        import('codemirror'),
        import('@codemirror/state'),
      ]);

      const [langModule, { tastyCodeMirrorTheme }] = await Promise.all([
        language === 'css'
          ? import('@codemirror/lang-css')
          : import('@codemirror/lang-html'),
        import('../lib/codemirror-theme'),
      ]);

      if (destroyed || !containerRef.current) return;

      const langExtension =
        'css' in langModule ? langModule.css() : langModule.html();

      viewRef.current = new EditorView({
        state: EditorState.create({
          doc: latestValueRef.current,
          extensions: [
            basicSetup,
            langExtension,
            ...tastyCodeMirrorTheme,
            EditorState.readOnly.of(true),
            EditorView.editable.of(false),
          ],
        }),
        parent: containerRef.current,
      });
    }

    init();

    return () => {
      destroyed = true;
      viewRef.current?.destroy();
      viewRef.current = null;
    };
  }, [language]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return (
    <>
      <PanelHeaderBar>
        <MobilePanelSelect
          value={mobilePanel}
          onChange={onMobilePanelChange}
        />
        <HeaderLabel>{label}</HeaderLabel>
      </PanelHeaderBar>
      <EditorWrap ref={containerRef} />
    </>
  );
}
