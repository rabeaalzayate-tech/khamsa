'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface FrontendProgressOverviewProps {
  totalLessons?: number;
  totalProjects?: number;
}

export function FrontendProgressOverview({
  totalLessons = 110,
  totalProjects = 10,
}: FrontendProgressOverviewProps) {
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [completedProjectsCount, setCompletedProjectsCount] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      // Read completed items from existing storage keys
      let lessonsCompleted = 0;
      let projectsCompleted = 0;

      // JavaScript track progress
      const jsRaw = window.localStorage.getItem('khamsa_js_docs_learner_progress');
      if (jsRaw) {
        const parsed = JSON.parse(jsRaw);
        if (Array.isArray(parsed)) {
          lessonsCompleted += parsed.length;
        }
      }

      // HTML track progress
      const htmlRaw = window.localStorage.getItem('khamsa_html_docs_learner_progress');
      if (htmlRaw) {
        const parsed = JSON.parse(htmlRaw);
        if (Array.isArray(parsed)) {
          lessonsCompleted += parsed.length;
        }
      }

      // React track progress
      const reactRaw = window.localStorage.getItem('khamsa_react_docs_learner_progress');
      if (reactRaw) {
        const parsed = JSON.parse(reactRaw);
        if (Array.isArray(parsed)) {
          lessonsCompleted += parsed.length;
        }
      }

      // CSS track progress
      const cssRaw = window.localStorage.getItem('khamsa_css_docs_learner_progress');
      if (cssRaw) {
        const parsed = JSON.parse(cssRaw);
        if (Array.isArray(parsed)) {
          lessonsCompleted += parsed.length;
        }
      }

      // Projects completed (if stored)
      const projRaw = window.localStorage.getItem('khamsa_js_projects_completed');
      if (projRaw) {
        const parsed = JSON.parse(projRaw);
        if (Array.isArray(parsed)) {
          projectsCompleted = parsed.length;
        }
      }

      setCompletedCount(lessonsCompleted);
      setCompletedProjectsCount(projectsCompleted);
    } catch {
      // Ignore localStorage read errors gracefully
    }
  }, []);

  const totalItems = totalLessons + totalProjects;
  const currentTotal = completedCount + completedProjectsCount;
  const progressPercent = Math.min(100, Math.round((currentTotal / (totalItems || 1)) * 100));

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-r from-surface via-card to-surface p-6 sm:p-8 shadow-card backdrop-blur-sm">
      {/* Decorative background glow */}
      <div
        className="absolute top-0 right-1/4 w-72 h-44 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-72 h-44 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Title and description */}
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-black bg-primary/10 text-primary border border-primary/25">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>متابعة تقدمك الدراسي المباشر</span>
            </span>
            <span className="text-xs font-mono text-foreground-muted hidden sm:inline">
              (تخزين محلي آمن في متصفحك)
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            لوحة إنجاز مسار مهندس الواجهات الأمامية
          </h3>

          <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
            كل مقالة مرجعية تقرأها أو مشروع عملي تنجزه يتم حفظه تلقائيًا لتستكمل مسارك من حيث توقفت بدون أي تشتت.
          </p>
        </div>

        {/* Progress Stats and Bar */}
        <div className="w-full lg:w-96 space-y-3 bg-background/50 border border-border/60 p-4 sm:p-5 rounded-2xl backdrop-blur">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-foreground-secondary flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>نسبة الإنجاز في المسار</span>
            </span>
            <span className="font-mono text-sm font-black text-primary">
              {mounted ? `${progressPercent}%` : '0%'}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full bg-surface border border-border rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-l from-primary via-amber-400 to-cyan-400 transition-all duration-700 ease-out"
              style={{ width: `${mounted ? Math.max(progressPercent, 2) : 2}%` }}
            />
          </div>

          {/* Detailed metrics counters */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
            <div className="p-2 rounded-xl bg-surface/80 border border-border/50">
              <span className="text-[10px] text-foreground-muted block font-sans">مقالات منجزة</span>
              <span className="text-sm font-black text-foreground">
                {mounted ? completedCount : 0}
                <span className="text-[10px] text-foreground-muted font-normal">/{totalLessons}</span>
              </span>
            </div>

            <div className="p-2 rounded-xl bg-surface/80 border border-border/50">
              <span className="text-[10px] text-foreground-muted block font-sans">مشاريع مكتملة</span>
              <span className="text-sm font-black text-cyan-400">
                {mounted ? completedProjectsCount : 0}
                <span className="text-[10px] text-foreground-muted font-normal">/{totalProjects}</span>
              </span>
            </div>

            <div className="p-2 rounded-xl bg-surface/80 border border-border/50">
              <span className="text-[10px] text-foreground-muted block font-sans">المراحل المتاحة</span>
              <span className="text-sm font-black text-primary">4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
