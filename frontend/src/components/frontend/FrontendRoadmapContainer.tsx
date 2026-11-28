'use client';

import React, { useState } from 'react';
import {
  Workflow,
  Layers,
  Sparkles,
  BookOpen,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { FrontendRoadmapDiagram } from './FrontendRoadmapDiagram';
import { FrontendRoadmapTree } from './FrontendRoadmapTree';

export function FrontendRoadmapContainer() {
  const [viewMode, setViewMode] = useState<'diagram' | 'tree'>('diagram');

  return (
    <div className="space-y-8" id="roadmap" dir="rtl">
      {/* View Switcher Header Bar */}
      <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-primary/15 text-primary border border-primary/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>طريقة العرض المخصصة (Interactive Roadmap Views)</span>
            </div>
            <h2 className="text-2xl font-black text-foreground">
              اختر طريقة تصفح خارطة الطريق
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted">
              يمكنك استعراض المسار عبر المخطط البصري التفاعلي للعقد (على غرار roadmap.sh) أو عبر الدليل الهيكلي المفصل للمشاريع والدروس.
            </p>
          </div>

          {/* Toggle Pills */}
          <div className="flex items-center p-1.5 rounded-2xl bg-surface border border-border shadow-inner gap-1.5 self-start md:self-auto shrink-0">
            <button
              onClick={() => setViewMode('diagram')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                viewMode === 'diagram'
                  ? 'bg-primary text-black font-black shadow-md'
                  : 'text-foreground-secondary hover:text-foreground hover:bg-surface-hover'
              }`}
            >
              <Workflow className="h-4 w-4" />
              <span>المخطط البصري (Flowchart UI)</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-md bg-black/20 text-[10px] font-mono">
                جديد
              </span>
            </button>

            <button
              onClick={() => setViewMode('tree')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                viewMode === 'tree'
                  ? 'bg-primary text-black font-black shadow-md'
                  : 'text-foreground-secondary hover:text-foreground hover:bg-surface-hover'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>الدليل الهيكلي والمشاريع (Detailed)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render Selected View */}
      {viewMode === 'diagram' ? (
        <div className="animate-in fade-in duration-300">
          <FrontendRoadmapDiagram />
        </div>
      ) : (
        <div className="animate-in fade-in duration-300">
          <FrontendRoadmapTree />
        </div>
      )}
    </div>
  );
}
