'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FolderTree,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface LessonNavTarget {
  slug: string;
  title: string;
  shortTitle?: string;
  number?: number;
}

interface LessonNavigationCardsProps {
  previousLesson?: LessonNavTarget | null;
  nextLesson?: LessonNavTarget | null;
  trackHubUrl: string;
  trackTitle: string;
  currentSlug: string;
  storageKey?: string;
  lessonNumber?: number;
}

export function LessonNavigationCards({
  previousLesson,
  nextLesson,
  trackHubUrl,
  trackTitle,
  currentSlug: _currentSlug,
  storageKey,
  lessonNumber,
}: LessonNavigationCardsProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!storageKey || typeof lessonNumber !== 'number') return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.includes(lessonNumber)) {
          setIsCompleted(true);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [storageKey, lessonNumber]);

  const toggleCompletion = () => {
    if (!storageKey || typeof lessonNumber !== 'number') return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      let list: number[] = [];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) list = parsed;
      }
      const updated = isCompleted
        ? list.filter(n => n !== lessonNumber)
        : [...list, lessonNumber];
      window.localStorage.setItem(storageKey, JSON.stringify(updated));
      setIsCompleted(!isCompleted);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <section className="pt-8 border-t border-border/80 space-y-6" dir="rtl">
      {/* Completion & Hub Return Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border/80 bg-surface/60 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shrink-0">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-foreground-muted block">
              المسار التعليمي:
            </span>
            <Link
              href={trackHubUrl}
              className="text-sm font-extrabold text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <span>{trackTitle}</span>
              <FolderTree className="h-3.5 w-3.5 text-primary" />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-center">
          {storageKey && typeof lessonNumber === 'number' && mounted && (
            <button
              type="button"
              onClick={toggleCompletion}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                isCompleted
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : 'bg-background hover:bg-card border-border text-foreground-muted hover:text-foreground'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isCompleted ? 'تمت دراسة هذا الدرس' : 'تحديد كمدروس'}</span>
            </button>
          )}

          <Link href={trackHubUrl}>
            <Button variant="outline" size="sm" className="gap-1.5 font-bold text-xs h-9">
              <FolderTree className="h-3.5 w-3.5" />
              <span>فهرس الدروس</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Previous / Next Lesson Two-Column Cards */}
      {(previousLesson || nextLesson) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Previous Lesson Card */}
          {previousLesson ? (
            <Link
              href={`/articles/${previousLesson.slug}`}
              className="group rounded-2xl border border-border/80 bg-card hover:border-primary/40 p-5 shadow-card transition-all flex flex-col justify-between gap-3 text-right"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-foreground-muted flex items-center gap-1.5 group-hover:text-primary transition-colors">
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  <span>الدرس السابق {previousLesson.number ? `(${previousLesson.number})` : ''}</span>
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {previousLesson.shortTitle || previousLesson.title}
                </h4>
              </div>
              <span className="text-[11px] text-foreground-muted block font-mono">
                اقرأ الدرس السابق &rarr;
              </span>
            </Link>
          ) : (
            <div className="rounded-2xl border border-dashed border-border/60 bg-surface/30 p-5 flex items-center justify-center text-xs text-foreground-muted font-bold text-center">
              أنت في بداية المسار التعليمي (الدرس الأول)
            </div>
          )}

          {/* Next Lesson Card */}
          {nextLesson ? (
            <Link
              href={`/articles/${nextLesson.slug}`}
              className="group rounded-2xl border border-primary/30 bg-gradient-to-l from-card via-surface to-card hover:border-primary p-5 shadow-card transition-all flex flex-col justify-between gap-3 text-left"
              dir="ltr"
            >
              <div className="space-y-1 text-right" dir="rtl">
                <span className="text-[11px] font-bold text-primary flex items-center justify-end gap-1.5">
                  <span>الدرس التالي {nextLesson.number ? `(${nextLesson.number})` : ''}</span>
                  <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {nextLesson.shortTitle || nextLesson.title}
                </h4>
              </div>
              <span className="text-[11px] text-primary block font-mono text-left" dir="ltr">
                &larr; التالي في المنهج
              </span>
            </Link>
          ) : (
            <div className="rounded-2xl border border-dashed border-border/60 bg-surface/30 p-5 flex items-center justify-center text-xs text-foreground-muted font-bold text-center">
              مبروك! هذا هو الدرس الأخير في هذا المنهج
            </div>
          )}
        </div>
      )}
    </section>
  );
}
