'use client';

import React, { useState } from 'react';
import {
  ListOrdered,
  FolderTree,
  ArrowUp,
  X,
} from 'lucide-react';
import { DocsSidebar } from '@/components/articles/DocsSidebar';
import { TableOfContents, type TocItem } from '@/components/articles/TableOfContents';
import type { CurriculumContext } from '@/lib/docs/curriculum-lookup';

interface ArticleDocumentationLayoutProps {
  curriculum: CurriculumContext | null;
  tableOfContents: TocItem[];
  currentSlug: string;
  children: React.ReactNode;
}

export function ArticleDocumentationLayout({
  curriculum,
  tableOfContents,
  currentSlug,
  children,
}: ArticleDocumentationLayoutProps) {
  const [isTocDrawerOpen, setIsTocDrawerOpen] = useState(false);
  const [isSidebarDrawerOpen, setIsSidebarDrawerOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasCurriculum = !!curriculum;
  const hasToc = tableOfContents && tableOfContents.length > 0;

  return (
    <div className="relative w-full" dir="rtl">
      {/* Main Grid: Responsive 3-area layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        {/* Right Area (Desktop): Curriculum Navigation Sidebar (Visible on 1280px+) */}
        {hasCurriculum && (
          <div className="hidden xl:block w-72 shrink-0 sticky top-24 self-start">
            <DocsSidebar
              curriculum={curriculum}
              currentSlug={currentSlug}
            />
          </div>
        )}

        {/* Center Area: Main Article Content */}
        <div className="flex-1 min-w-0 w-full max-w-4xl mx-auto space-y-10">
          {children}
        </div>

        {/* Left Area (Desktop): Sticky Table of Contents (Visible on 1024px+) */}
        {hasToc && (
          <div className="hidden lg:block w-64 shrink-0 sticky top-24 self-start">
            <TableOfContents items={tableOfContents} />
          </div>
        )}
      </div>

      {/* Floating Bottom Quick Action Bar for Mobile & Tablets (< 1024px) */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 flex items-center justify-center gap-2 pointer-events-none">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-card/90 backdrop-blur-md border border-border/80 shadow-2xl pointer-events-auto">
          {hasCurriculum && (
            <button
              type="button"
              onClick={() => setIsSidebarDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-surface hover:bg-surface-hover border border-border text-foreground transition-colors"
            >
              <FolderTree className="h-4 w-4 text-primary" />
              <span>دروس المسار</span>
            </button>
          )}

          {hasToc && (
            <button
              type="button"
              onClick={() => setIsTocDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-surface hover:bg-surface-hover border border-border text-foreground transition-colors"
            >
              <ListOrdered className="h-4 w-4 text-primary" />
              <span>فهرس المقال</span>
            </button>
          )}

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-surface hover:bg-surface-hover border border-border text-foreground-muted hover:text-foreground transition-colors"
            aria-label="للأعلى"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile Modal Drawer: Table of Contents */}
      {isTocDrawerOpen && hasToc && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card border border-border rounded-3xl p-5 shadow-2xl space-y-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <ListOrdered className="h-4 w-4 text-primary" />
                <span>فهرس المحتويات والمحاور</span>
              </div>
              <button
                onClick={() => setIsTocDrawerOpen(false)}
                className="p-1.5 rounded-lg border border-border text-foreground-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <TableOfContents
                items={tableOfContents}
                isMobileDrawer
                onCloseMobileDrawer={() => setIsTocDrawerOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Modal Drawer: Curriculum Lessons */}
      {isSidebarDrawerOpen && hasCurriculum && (
        <div className="xl:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card border border-border rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <FolderTree className="h-4 w-4 text-primary" />
                <span>دروس المنهج الدراسي</span>
              </div>
              <button
                onClick={() => setIsSidebarDrawerOpen(false)}
                className="p-1.5 rounded-lg border border-border text-foreground-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <DocsSidebar
                curriculum={curriculum}
                currentSlug={currentSlug}
                isMobileDrawer
                onCloseMobileDrawer={() => setIsSidebarDrawerOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
