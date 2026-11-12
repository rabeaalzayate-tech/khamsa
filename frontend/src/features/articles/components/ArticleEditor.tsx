'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { AlertTriangle } from 'lucide-react';
import { EditorToolbar } from './EditorToolbar';
import { Video } from './VideoExtension';
import { Iframe } from './IframeExtension';
import { cn } from '@/lib/utils/cn';

const formatHtmlForCodeView = (html: string): string => {
  return html
    .replace(/(<\/(?:p|h[1-6]|ul|ol|li|blockquote|pre|div|figure|video|iframe)>|<hr\s*\/?>)/gi, '$1\n')
    .trim();
};

interface ArticleEditorProps {
  content?: Record<string, unknown> | string | null;
  onChange: (content: Record<string, unknown>) => void;
  className?: string;
  error?: string;
}

export function ArticleEditor({
  content,
  onChange,
  className,
  error,
}: ArticleEditorProps) {
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [htmlCode, setHtmlCode] = useState('');

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        link: {
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-primary underline font-medium underline-offset-4 hover:text-primary/80',
          },
        },
        underline: {},
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: 'rounded-2xl max-h-[500px] w-full object-cover border border-border shadow-xl my-6 mx-auto',
        },
      }),
      Video,
      Iframe,
      Placeholder.configure({
        placeholder: 'ابدأ كتابة محتوى المقال والدروس البرمجية هنا بالتفصيل...',
      }),
    ],
    content: typeof content === 'object' ? content : undefined,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-headings:text-foreground prose-headings:font-bold prose-p:text-foreground/90 prose-p:leading-relaxed prose-code:font-mono prose-code:text-primary prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:text-foreground max-w-none min-h-[420px] p-5 sm:p-7 focus:outline-none text-right font-sans text-foreground text-base leading-relaxed',
        dir: 'rtl',
      },
    },
    onUpdate: ({ editor: ed }) => {
      const json = ed.getJSON();
      onChange(json as Record<string, unknown>);
    },
  });

  // Synchronize external content changes when editing
  useEffect(() => {
    if (editor && content && !isCodeMode) {
      const isSame = JSON.stringify(editor.getJSON()) === JSON.stringify(content);
      if (!isSame) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor, isCodeMode]);

  const handleToggleCodeMode = () => {
    if (!editor) return;

    if (!isCodeMode) {
      setHtmlCode(formatHtmlForCodeView(editor.getHTML()));
      setIsCodeMode(true);
    } else {
      editor.commands.setContent(htmlCode);
      onChange(editor.getJSON() as Record<string, unknown>);
      setIsCodeMode(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextHtml = e.target.value;
    setHtmlCode(nextHtml);
    if (editor) {
      editor.commands.setContent(nextHtml);
      onChange(editor.getJSON() as Record<string, unknown>);
    }
  };

  return (
    <div
      className={cn(
        'w-full rounded-2xl border border-border bg-card shadow-xl transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 overflow-visible',
        error && 'border-destructive focus-within:ring-destructive/20',
        className,
      )}
    >
      <EditorToolbar
        editor={editor}
        isCodeMode={isCodeMode}
        onToggleCodeMode={handleToggleCodeMode}
      />
      <div className="bg-card/40 rounded-b-2xl">
        {isCodeMode ? (
          <div className="p-4 sm:p-5 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>وضع كود HTML — يمكنك لصق أكواد &lt;iframe&gt; أو تعديل HTML مباشرة</span>
              <span className="font-mono text-primary/80">HTML</span>
            </div>
            <textarea
              dir="ltr"
              value={htmlCode}
              onChange={handleCodeChange}
              placeholder='<p>اكتب كود HTML هنا أو الصق كود iframe...</p>&#10;<iframe src="https://www.youtube.com/embed/..." allowfullscreen></iframe>'
              className="w-full min-h-[380px] p-4 rounded-xl border border-border bg-background/80 text-foreground font-mono text-xs leading-relaxed focus:outline-none focus:border-primary resize-y"
              spellCheck={false}
            />
          </div>
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
      {error && (
        <div className="p-3 bg-destructive/10 border-t border-destructive/20 text-xs text-destructive font-semibold flex items-center gap-1.5">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
