'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  FolderCode,
  Search,
  Sparkles,
  Lock,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import {
  calculateDocsOfficialProgress,
  isDocChapterPublished,
  type DocDifficulty,
  type DocPhaseMetadata,
  type DocPracticalProject,
  type StructuredDocChapter,
} from '@/data/docs-curriculum-types';

interface StructuredDocsHubClientProps {
  phases: readonly DocPhaseMetadata[];
  chapters: readonly StructuredDocChapter[];
  projects: readonly DocPracticalProject[];
  storageKey: string;
  trackLabel: string;
}

const DIFFICULTY_LABELS: Record<DocDifficulty, string> = {
  Beginner: 'مبتدئ',
  Intermediate: 'متوسط',
  Advanced: 'متقدم',
};

const DIFFICULTY_BADGE_CLASSES: Record<DocDifficulty, string> = {
  Beginner: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  Intermediate: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  Advanced: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
};

const STATUS_LABELS = {
  not_started: 'لم يبدأ بعد',
  in_progress: 'قيد الكتابة',
  completed: 'مكتمل ومنشور',
  reviewed: 'مُراجع ومنشور',
} as const;

export function StructuredDocsHubClient({
  phases,
  chapters,
  projects,
  storageKey,
  trackLabel,
}: StructuredDocsHubClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<number | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DocDifficulty | 'all'>('all');
  const [completedByLearner, setCompletedByLearner] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const officialProgress = useMemo(() => calculateDocsOfficialProgress(chapters), [chapters]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCompletedByLearner(parsed.filter((n): n is number => typeof n === 'number'));
        }
      }
    } catch {
      // Ignore storage errors
    } finally {
      setHydrated(true);
    }
  }, [storageKey]);

  const toggleLearnerLesson = (lessonNumber: number) => {
    setCompletedByLearner(prev => {
      const next = prev.includes(lessonNumber)
        ? prev.filter(n => n !== lessonNumber)
        : [...prev, lessonNumber];
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const resetLearnerProgress = () => {
    setCompletedByLearner([]);
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Ignore storage errors
    }
  };

  const filteredChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return chapters.filter(ch => {
      if (selectedPhase !== 'all' && ch.phaseNumber !== selectedPhase) return false;
      if (selectedDifficulty !== 'all' && ch.difficulty !== selectedDifficulty) return false;
      if (!q) return true;

      const haystack = [
        String(ch.number),
        ch.title,
        ch.arTitle,
        ch.summary,
        ch.slug,
        ...ch.topics,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [chapters, searchQuery, selectedPhase, selectedDifficulty]);

  const groupedByPhase = useMemo(() => {
    return phases
      .map(phase => ({
        phase,
        lessons: filteredChapters.filter(ch => ch.phaseNumber === phase.number),
      }))
      .filter(group => group.lessons.length > 0);
  }, [phases, filteredChapters]);

  const learnerPercentage =
    officialProgress.total > 0
      ? Math.round((completedByLearner.length / officialProgress.total) * 100)
      : 0;

  return (
    <div className="space-y-12">
      {/* Dual Progress Tracking: Official Content Status vs Personal Study Progress */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-amber-500/30 bg-card p-5 sm:p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400">
                التقدم الرسمي لإنتاج التوثيق
              </span>
              <h2 className="text-lg font-black text-foreground">
                حالة نشر مقالات {trackLabel}
              </h2>
            </div>
            <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-400 font-mono text-sm px-3 py-1">
              {officialProgress.completionPercentage}%
            </Badge>
          </div>

          <div className="h-2.5 w-full rounded-full bg-background border border-border overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${officialProgress.completionPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center pt-1">
            <div className="rounded-xl bg-background/70 border border-border p-2.5">
              <div className="text-base font-black text-foreground font-mono">
                {officialProgress.completed} / {officialProgress.total}
              </div>
              <div className="text-[11px] text-foreground-muted">مقالة منشورة</div>
            </div>
            <div className="rounded-xl bg-background/70 border border-border p-2.5">
              <div className="text-base font-black text-foreground font-mono">
                {officialProgress.inProgress}
              </div>
              <div className="text-[11px] text-foreground-muted">قيد الكتابة</div>
            </div>
            <div className="rounded-xl bg-background/70 border border-border p-2.5">
              <div className="text-base font-black text-foreground font-mono">
                {officialProgress.actualWords.toLocaleString('en-US')}
              </div>
              <div className="text-[11px] text-foreground-muted">
                من {officialProgress.targetWords.toLocaleString('en-US')}+ كلمة
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold text-primary">تقدمك الشخصي في المذاكرة</span>
              <h2 className="text-lg font-black text-foreground">متابع الإنجاز الذاتي (Local)</h2>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="border-primary/30 bg-primary/10 text-primary font-mono text-sm px-3 py-1">
                {hydrated ? `${learnerPercentage}%` : '0%'}
              </Badge>
              {hydrated && completedByLearner.length > 0 && (
                <button
                  type="button"
                  onClick={resetLearnerProgress}
                  title="إعادة ضبط تقدمك الشخصي"
                  className="p-1.5 rounded-lg border border-border text-foreground-muted hover:text-foreground hover:border-primary/40 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="h-2.5 w-full rounded-full bg-background border border-border overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${hydrated ? learnerPercentage : 0}%` }}
            />
          </div>

          <p className="text-xs text-foreground-muted leading-relaxed">
            هذا العداد محفوظ في متصفحك فقط لتتبع الدروس التي أتممت مذاكرتها ({hydrated ? completedByLearner.length : 0} من{' '}
            {officialProgress.total})، وهو منفصل تمامًا عن نسبة النشر الرسمية للمحتوى.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="h-4 w-4 text-foreground-muted absolute top-1/2 -translate-y-1/2 right-3.5 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم الدرس أو المصطلح (مثل: Closures, Event Loop, Promises)..."
              aria-label="البحث في دروس المنهج"
              className="w-full rounded-xl border border-border bg-background pr-10 pl-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedPhase}
              onChange={e =>
                setSelectedPhase(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              aria-label="تصفية حسب المرحلة"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
            >
              <option value="all">كل المراحل ({phases.length} مرحلة)</option>
              {phases.map(phase => (
                <option key={phase.number} value={phase.number}>
                  {phase.arTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={e =>
                setSelectedDifficulty(e.target.value as DocDifficulty | 'all')
              }
              aria-label="تصفية حسب المستوى"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
            >
              <option value="all">كل المستويات</option>
              <option value="Beginner">مبتدئ (Beginner)</option>
              <option value="Intermediate">متوسط (Intermediate)</option>
              <option value="Advanced">متقدم (Advanced)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-foreground-muted">
          <span>
            عرض <strong className="text-foreground">{filteredChapters.length}</strong> من أصل{' '}
            <strong className="text-foreground">{chapters.length}</strong> درسًا
          </span>
          {(searchQuery || selectedPhase !== 'all' || selectedDifficulty !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedPhase('all');
                setSelectedDifficulty('all');
              }}
              className="text-primary hover:underline font-bold"
            >
              إعادة ضبط الفلاتر
            </button>
          )}
        </div>
      </section>

      {/* Curriculum Phases & Lessons */}
      <section className="space-y-8">
        {groupedByPhase.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center space-y-2">
            <p className="text-base font-bold text-foreground">لا توجد دروس مطابقة لبحثك</p>
            <p className="text-xs text-foreground-muted">
              جرّب البحث بمصطلح آخر أو امسح الفلاتر لعرض جميع المراحل.
            </p>
          </div>
        ) : (
          groupedByPhase.map(({ phase, lessons }) => {
            const phaseStats = officialProgress.byPhase[phase.number];
            return (
              <div key={phase.number} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/25">
                        {phase.folder}/
                      </span>
                      <span className="text-xs text-foreground-muted font-mono">
                        {phase.title}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-foreground mt-1.5">{phase.arTitle}</h3>
                    <p className="text-xs sm:text-sm text-foreground-muted mt-0.5">
                      {phase.description}
                    </p>
                  </div>

                  {phaseStats && (
                    <div className="text-xs font-mono text-foreground-muted shrink-0">
                      منشور: {phaseStats.completed} / {phaseStats.total}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {lessons.map(chapter => {
                    const published = isDocChapterPublished(chapter);
                    const isChecked = hydrated && completedByLearner.includes(chapter.number);

                    const cardBody = (
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full">
                        <div className="flex items-start gap-4">
                          <div
                            className={`h-11 w-11 rounded-xl font-mono font-black text-base flex items-center justify-center shrink-0 border ${
                              published
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors'
                                : 'bg-background border-border text-foreground-muted'
                            }`}
                          >
                            {String(chapter.number).padStart(2, '0')}
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                                  DIFFICULTY_BADGE_CLASSES[chapter.difficulty]
                                }`}
                              >
                                {DIFFICULTY_LABELS[chapter.difficulty]}
                              </span>

                              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full border border-border bg-background text-foreground-muted">
                                {STATUS_LABELS[chapter.status]}
                              </span>

                              <span className="text-xs text-foreground-muted inline-flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                مستهدف +{chapter.targetWordCount.toLocaleString('en-US')} كلمة
                              </span>
                            </div>

                            <h4 className="text-base sm:text-lg font-black text-foreground">
                              {chapter.arTitle}
                            </h4>
                            <p className="text-xs font-mono text-foreground-muted" dir="ltr">
                              {chapter.title}
                            </p>
                            <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                              {chapter.summary}
                            </p>

                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              {chapter.topics.map(topic => (
                                <Badge
                                  key={topic}
                                  variant="secondary"
                                  className="text-[11px] font-mono bg-background border border-border"
                                >
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                          {published ? (
                            <>
                              <button
                                type="button"
                                onClick={e => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleLearnerLesson(chapter.number);
                                }}
                                aria-label={`تحديد الدرس ${chapter.number} كمكتمل في تقدمك الشخصي`}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${
                                  isChecked
                                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                                    : 'border-border bg-background text-foreground-muted hover:text-foreground'
                                }`}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>{isChecked ? 'تمت المذاكرة' : 'تحديد كمقروء'}</span>
                              </button>

                              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                                <BookOpen className="h-4 w-4" />
                                <span>اقرأ الدرس</span>
                                <ArrowLeft className="h-4 w-4" />
                              </span>
                            </>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground-muted px-3 py-1.5 rounded-lg border border-border bg-background">
                              <Lock className="h-3.5 w-3.5" />
                              <span>قريبًا — قيد الإعداد</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );

                    if (published) {
                      return (
                        <Link
                          key={chapter.slug}
                          href={`/articles/${chapter.slug}`}
                          className="group rounded-2xl border border-border bg-card hover:border-amber-500/50 p-5 transition-all shadow-card block"
                        >
                          {cardBody}
                        </Link>
                      );
                    }

                    return (
                      <div
                        key={chapter.slug}
                        aria-disabled="true"
                        className="rounded-2xl border border-border/80 bg-card/70 p-5 shadow-card"
                      >
                        {cardBody}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Practical Projects Section */}
      <section className="space-y-5 pt-4 border-t border-border">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
            <FolderCode className="h-4 w-4" />
            <span>12-Practical-Projects/</span>
          </div>
          <h2 className="text-2xl font-black text-foreground">
            المشاريع العملية التطبيقية ({projects.length} مشاريع)
          </h2>
          <p className="text-xs sm:text-sm text-foreground-muted">
            تطبيقات عملية متدرجة الصعوبة لتثبيت مفاهيم كل مرحلة حتى الوصول إلى تطبيق متكامل بمعمارية ES Modules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(project => (
            <div
              key={project.number}
              className="rounded-2xl border border-border bg-card p-5 shadow-card space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  Project {String(project.number).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full border border-border bg-background text-foreground-muted">
                  {STATUS_LABELS[project.status]}
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-foreground">{project.arTitle}</h3>
                <p className="text-xs font-mono text-foreground-muted" dir="ltr">
                  {project.title}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.concepts.map(concept => (
                  <Badge
                    key={concept}
                    variant="secondary"
                    className="text-[11px] font-mono bg-background border border-border"
                  >
                    {concept}
                  </Badge>
                ))}
              </div>

              {project.demoUrl && (
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <Link
                    href={project.demoUrl}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 text-xs font-bold transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>تجربة المشروع التفاعلي</span>
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
