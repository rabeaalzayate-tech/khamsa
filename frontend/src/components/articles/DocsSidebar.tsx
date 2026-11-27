'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FolderTree,
  Search,
  X,
} from 'lucide-react';
import type { CurriculumContext } from '@/lib/docs/curriculum-lookup';

interface DocsSidebarProps {
  curriculum: CurriculumContext;
  currentSlug: string;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export function DocsSidebar({
  curriculum,
  currentSlug,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}: DocsSidebarProps) {
  const [search, setSearch] = useState('');
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({});

  const cleanCurrentSlug = decodeURIComponent(currentSlug).trim().toLowerCase();

  // Find which phase the current lesson is in to auto-expand it
  useEffect(() => {
    const currentPhase = curriculum.phases.find(phase =>
      phase.lessons.some(l => l.slug.toLowerCase() === cleanCurrentSlug)
    );
    if (currentPhase) {
      setExpandedPhases(prev => ({ ...prev, [currentPhase.number]: true }));
    } else {
      // Default expand first phase
      setExpandedPhases({ 1: true });
    }
  }, [cleanCurrentSlug, curriculum.phases]);

  // Load completed lessons from storageKey
  useEffect(() => {
    if (!curriculum.storageKey) return;
    try {
      const raw = window.localStorage.getItem(curriculum.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCompletedLessons(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [curriculum.storageKey]);

  const togglePhase = (phaseNum: number) => {
    setExpandedPhases(prev => ({ ...prev, [phaseNum]: !prev[phaseNum] }));
  };

  const filteredPhases = useMemo(() => {
    if (!search.trim()) return curriculum.phases;
    const q = search.trim().toLowerCase();
    return curriculum.phases
      .map(phase => ({
        ...phase,
        lessons: phase.lessons.filter(
          l =>
            l.title.toLowerCase().includes(q) ||
            l.shortTitle.toLowerCase().includes(q) ||
            String(l.number).includes(q)
        ),
      }))
      .filter(phase => phase.lessons.length > 0);
  }, [curriculum.phases, search]);

  const totalLessonsCount = curriculum.totalLessons || 0;
  const completedCount = completedLessons.length;
  const progressPercent = totalLessonsCount
    ? Math.round((completedCount / totalLessonsCount) * 100)
    : 0;

  return (
    <aside
      className={`flex flex-col h-full bg-card border border-border/80 rounded-3xl shadow-card overflow-hidden ${
        isMobileDrawer ? 'w-full max-w-sm max-h-[85vh]' : 'w-full'
      }`}
      dir="rtl"
    >
      {/* Sidebar Header */}
      <div className="p-4 sm:p-5 border-b border-border/70 space-y-3 bg-surface/50">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={curriculum.trackHubUrl}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
          >
            <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shrink-0">
              <FolderTree className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-black group-hover:text-primary transition-colors line-clamp-1">
                {curriculum.trackTitle}
              </h3>
              <span className="text-[10px] text-foreground-muted block line-clamp-1">
                {curriculum.trackSubtitle}
              </span>
            </div>
          </Link>

          {isMobileDrawer && onCloseMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1.5 rounded-lg border border-border hover:bg-surface text-foreground-muted hover:text-foreground transition-colors"
              aria-label="إغلاق القائمة"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Progress bar in sidebar if storageKey is present */}
        {curriculum.storageKey && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-foreground-muted">نسبة إنجاز المنهج:</span>
              <span className="text-primary font-mono">{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-border/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Search input */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ابحث برقم الدرس أو العنوان..."
            className="w-full pl-3 pr-9 py-1.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Lessons List by Phase */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-[600px] scrollbar-thin">
        {filteredPhases.length === 0 ? (
          <div className="p-6 text-center text-xs text-foreground-muted">
            لا توجد دروس مطابقة لبحثك
          </div>
        ) : (
          filteredPhases.map(phase => {
            const isExpanded = search ? true : expandedPhases[phase.number] !== false;
            return (
              <div
                key={phase.number}
                className="rounded-2xl border border-border/60 bg-surface/40 overflow-hidden"
              >
                {/* Phase Header */}
                <button
                  type="button"
                  onClick={() => togglePhase(phase.number)}
                  className="w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-right hover:bg-surface/80 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 shrink-0">
                      P{phase.number}
                    </span>
                    <span className="text-xs font-bold text-foreground truncate">
                      {phase.arTitle || phase.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] text-foreground-muted font-mono">
                      {phase.lessons.length}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5 text-foreground-muted" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-foreground-muted" />
                    )}
                  </div>
                </button>

                {/* Lessons inside Phase */}
                {isExpanded && (
                  <div className="p-1.5 space-y-1 border-t border-border/40">
                    {phase.lessons.map(lesson => {
                      const isActive =
                        lesson.slug.toLowerCase() === cleanCurrentSlug;
                      const isDone = completedLessons.includes(lesson.number);

                      return (
                        <Link
                          key={lesson.slug}
                          href={`/articles/${lesson.slug}`}
                          onClick={() => {
                            if (onCloseMobileDrawer) onCloseMobileDrawer();
                          }}
                          className={`flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-primary text-black font-black shadow-sm'
                              : 'text-foreground-secondary hover:text-foreground hover:bg-surface'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`h-5 w-5 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold shrink-0 border ${
                                isActive
                                  ? 'bg-black/20 text-black border-black/30'
                                  : 'bg-background text-foreground-muted border-border'
                              }`}
                            >
                              {String(lesson.number).padStart(2, '0')}
                            </span>
                            <span className="truncate leading-normal">
                              {lesson.shortTitle || lesson.title}
                            </span>
                          </div>

                          {isDone && (
                            <CheckCircle2
                              className={`h-3.5 w-3.5 shrink-0 ${
                                isActive ? 'text-black' : 'text-emerald-400'
                              }`}
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Sidebar Footer Link */}
      <div className="p-3 border-t border-border/70 bg-surface/50 text-center">
        <Link
          href={curriculum.trackHubUrl}
          className="text-[11px] font-bold text-foreground-muted hover:text-primary transition-colors flex items-center justify-center gap-1.5"
        >
          <span>عرض جميع دروس ومشاريع المسار</span>
          <BookOpen className="h-3 w-3" />
        </Link>
      </div>
    </aside>
  );
}
