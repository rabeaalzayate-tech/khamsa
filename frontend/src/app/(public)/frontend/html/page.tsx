import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, Clock, ArrowLeft, Layers, CheckCircle2, ArrowRight, Code2 } from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { HTML_DOCS_CURRICULUM } from '@/data/html-docs-curriculum';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'توثيق HTML5 الكامل بالعامية المصرية (6 دروس شاملة)',
  description:
    'مرجع وتوثيق HTML5 الشامل بالعامية المصرية: 6 دروس عميقة تغطي تشريح الصفحة، النصوص والروابط، الصور المتجاوبة والوسائط، الجداول والوسوم الدلالية، النماذج، و Accessibility و Technical SEO.',
  alternates: {
    canonical: `${siteUrl}/frontend/html`,
  },
};

function Html5ShieldSvg({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 2l1.6 18L12 22l7.4-2L21 2H3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M17 6.5H7.5l.4 4.2h8.5l-.6 6.2-3.8 1.1-3.8-1.1-.2-2.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HtmlDocsHubPage() {
  const totalMinutes = HTML_DOCS_CURRICULUM.reduce((acc, ch) => acc + ch.readTimeMinutes, 0);

  return (
    <div className="space-y-12" dir="rtl">
      <ArticleBreadcrumb
        items={[
          { label: 'قسم الفرونت إند', href: '/frontend' },
          { label: 'توثيق HTML5' },
        ]}
      />

      {/* Docs Header */}
      <section className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-card via-card to-orange-950/20 p-6 sm:p-10 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/25 text-xs font-bold">
              <Html5ShieldSvg className="w-4 h-4" />
              <span>التوثيق العربي الشامل — HTML5 Documentation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
              توثيق HTML5 الكامل بالعامية المصرية
            </h1>

            <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
              مرجع هندسي متكامل لأساس الويب (HTML5) مستند إلى مواصفات MDN و WHATWG ومكتوب
              بالعامية المصرية الواضحة: 6 دروس عميقة تشرح كل وسم وخاصية، مع أمثلة حقيقية،
              قواعد الـ Accessibility والـ Technical SEO، وأكثر من 30,000 كلمة شرح عملي.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-muted pt-1">
              <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                <Layers className="h-4 w-4 text-primary" />
                <span>6 دروس متكاملة</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <span>حوالي {Math.round(totalMinutes / 60)} ساعات قراءة وتطبيق</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>HTML Living Standard + A11y + SEO</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <Link href={`/articles/${HTML_DOCS_CURRICULUM[0].slug}`}>
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
            <h2 className="text-2xl font-black text-foreground">فهرس دروس توثيق HTML5</h2>
            <p className="text-xs sm:text-sm text-foreground-muted mt-1">
              ادرس الدروس بالترتيب لبناء أساس قوي قبل الانتقال إلى CSS و JavaScript و React
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {HTML_DOCS_CURRICULUM.map(chapter => (
            <Link
              key={chapter.slug}
              href={`/articles/${chapter.slug}`}
              className="group rounded-2xl border border-border bg-card hover:border-orange-500/50 p-5 sm:p-6 transition-all shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-orange-500/10 border border-orange-500/25 text-orange-400 font-mono font-black text-lg flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  {String(chapter.number).padStart(2, '0')}
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-orange-400">
                      الدرس {chapter.number} من 6
                    </span>
                    <span className="text-foreground-muted/50">•</span>
                    <span className="text-xs text-foreground-muted inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {chapter.readTimeMinutes} دقيقة
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-foreground group-hover:text-orange-400 transition-colors">
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

              <div className="flex items-center gap-2 text-xs font-bold text-orange-400 shrink-0 self-end lg:self-center">
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
            <span>الخطوة التالية بعد إتقان HTML5</span>
          </h3>
          <p className="text-xs sm:text-sm text-foreground-muted">
            راجع خارطة الطريق الكاملة للفرونت إند أو انتقل مباشرة لتعلم CSS و JavaScript و React.
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
