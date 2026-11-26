import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, Clock, ArrowLeft, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { REACT_DOCS_CURRICULUM } from '@/data/react-docs-curriculum';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'توثيق React.js الكامل بالعامية المصرية (10 فصول)',
  description:
    'مرجع وتوثيق React.js الشامل بالعامية المصرية (بالبلدي): 10 فصول عميقة تغطي Components, JSX, Props, State, Hooks, Context API, Forms, Routing, TanStack Query, و React 19.',
  alternates: {
    canonical: `${siteUrl}/frontend/react`,
  },
};

function ReactAtomSvg({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} aria-hidden="true">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export default function ReactDocsHubPage() {
  const totalMinutes = REACT_DOCS_CURRICULUM.reduce((acc, ch) => acc + ch.readTimeMinutes, 0);

  return (
    <div className="space-y-12" dir="rtl">
      <ArticleBreadcrumb
        items={[
          { label: 'قسم الفرونت إند', href: '/frontend' },
          { label: 'توثيق React.js' },
        ]}
      />

      {/* Docs Header */}
      <section className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-card via-card to-cyan-950/20 p-6 sm:p-10 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 text-xs font-bold">
              <ReactAtomSvg className="w-4 h-4" />
              <span>التوثيق العربي الشامل — React.js Documentation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
              توثيق React.js الكامل بالعامية المصرية
            </h1>

            <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
              ده مش كورس سريع ولا ملخص سطحي — ده{' '}
              <strong className="text-foreground">Documentation متكامل لـ React.js</strong> مكتوب
              بالعامية المصرية البسيطة، مقسّم لـ 10 فصول مرجعية مترابطة، كل فصل بيشرح المفهوم من
              الجذور، بيوريك الكود الغلط والكود الصح، وبيديك أمثلة حقيقية من سوق العمل.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-muted pt-1">
              <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                <Layers className="h-4 w-4 text-primary" />
                <span>10 فصول كاملة</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <span>حوالي {Math.round(totalMinutes / 60)} ساعات قراءة وتطبيق</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>محدّث لـ React 18 &amp; React 19</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <Link href={`/articles/${REACT_DOCS_CURRICULUM[0].slug}`}>
              <Button size="lg" className="w-full gap-2 font-bold shadow-lg shadow-primary/20">
                <BookOpen className="h-4 w-4" />
                <span>ابدأ من الفصل الأول</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/frontend">
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs font-bold">
                <ArrowRight className="h-3.5 w-3.5" />
                <span>العودة لقسم الفرونت إند</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Curriculum Chapters List */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-2xl font-black text-foreground">فهرس فصول توثيق React.js</h2>
            <p className="text-xs sm:text-sm text-foreground-muted mt-1">
              اتبع الفصول بالترتيب للحصول على فهم معماري متكامل لـ React
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {REACT_DOCS_CURRICULUM.map(chapter => (
            <Link
              key={chapter.slug}
              href={`/articles/${chapter.slug}`}
              className="group rounded-2xl border border-border bg-card hover:border-primary/50 p-5 sm:p-6 transition-all shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/25 text-primary font-mono font-black text-lg flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {String(chapter.number).padStart(2, '0')}
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-primary">
                      الفصل {chapter.number} من 10
                    </span>
                    <span className="text-foreground-muted/50">•</span>
                    <span className="text-xs text-foreground-muted inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {chapter.readTimeMinutes} دقيقة
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                    {chapter.shortTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed max-w-3xl">
                    {chapter.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {chapter.topics.map(topic => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="font-mono text-[11px] font-medium"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-primary shrink-0 self-end lg:self-center">
                <span>اقرأ الفصل</span>
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
