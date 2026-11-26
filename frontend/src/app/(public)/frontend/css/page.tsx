import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, Clock, ArrowLeft, Layers, CheckCircle2, ArrowRight, Code2 } from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CSS_DOCS_CURRICULUM } from '@/data/css-docs-curriculum';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'توثيق CSS3 النقية الكامل بالعامية المصرية (8 دروس)',
  description:
    'مرجع وتوثيق CSS3 الشامل بدون مكتبات بالعامية المصرية: 8 دروس عميقة تغطي Selectors و Specificity و Box Model و Flexbox و CSS Grid و Responsive و Container Queries و Animations.',
  alternates: {
    canonical: `${siteUrl}/frontend/css`,
  },
};

function Css3ShieldSvg({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 2l1.6 18L12 22l7.4-2L21 2H3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M7 7h10l-.4 4.2H8.5l.3 2.8h7.4l-.4 4.1-3.8 1.1-3.8-1.1-.2-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CssDocsHubPage() {
  const totalMinutes = CSS_DOCS_CURRICULUM.reduce((acc, ch) => acc + ch.readTimeMinutes, 0);

  return (
    <div className="space-y-12" dir="rtl">
      <ArticleBreadcrumb
        items={[
          { label: 'قسم الفرونت إند', href: '/frontend' },
          { label: 'توثيق CSS3' },
        ]}
      />

      {/* Docs Header */}
      <section className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-card via-card to-blue-950/20 p-6 sm:p-10 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/25 text-xs font-bold">
              <Css3ShieldSvg className="w-4 h-4" />
              <span>التوثيق العربي الشامل — Pure CSS3 Documentation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
              توثيق CSS3 النقية الكامل بالعامية المصرية
            </h1>

            <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
              منهج عميق ومرتب لتعلّم CSS بدون أي مكتبات: 8 دروس مرجعية تبدأ من الـ Cascade والـ
              Specificity والـ Box Model، وتوصلك لاحتراف Flexbox و CSS Grid و Container Queries و
              Variables و Dark Mode والحركات السلسة ومعمارية المشاريع الكبيرة.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-muted pt-1">
              <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                <Layers className="h-4 w-4 text-primary" />
                <span>8 دروس متكاملة</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <span>حوالي {Math.round(totalMinutes / 60)} ساعات قراءة وتطبيق</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Pure CSS3 + Modern Specs</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <Link href={`/articles/${CSS_DOCS_CURRICULUM[0].slug}`}>
              <Button size="lg" className="w-full gap-2 font-bold shadow-lg shadow-primary/20">
                <BookOpen className="h-4 w-4" />
                <span>ابدأ من الدرس الأول</span>
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

      {/* Lessons List */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-2xl font-black text-foreground">فهرس دروس توثيق CSS3</h2>
            <p className="text-xs sm:text-sm text-foreground-muted mt-1">
              ادرس الدروس بالترتيب لتبني فهم معماري حقيقي للتنسيق قبل استخدام Tailwind أو React
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {CSS_DOCS_CURRICULUM.map(chapter => (
            <Link
              key={chapter.slug}
              href={`/articles/${chapter.slug}`}
              className="group rounded-2xl border border-border bg-card hover:border-blue-500/50 p-5 sm:p-6 transition-all shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/25 text-blue-400 font-mono font-black text-lg flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  {String(chapter.number).padStart(2, '0')}
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-blue-400">
                      الدرس {chapter.number} من 8
                    </span>
                    <span className="text-foreground-muted/50">•</span>
                    <span className="text-xs text-foreground-muted inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {chapter.readTimeMinutes} دقيقة
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-foreground group-hover:text-blue-400 transition-colors">
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

              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 shrink-0 self-end lg:self-center">
                <span>اقرأ الدرس</span>
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="rounded-3xl border border-border bg-surface/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-black text-foreground flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <span>الخطوة التالية بعد إتقان CSS3</span>
          </h3>
          <p className="text-xs sm:text-sm text-foreground-muted">
            انتقل إلى Tailwind CSS ثم JavaScript الحديثة وتوثيق React.js الكامل.
          </p>
        </div>
        <Link href="/frontend/roadmap">
          <Button variant="outline" className="gap-2 font-bold">
            <span>افتح خريطة الطريق</span>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
