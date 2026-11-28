import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Compass,
  Layers,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { FrontendRoadmapContainer } from '@/components/frontend/FrontendRoadmapContainer';
import { FrontendProgressOverview } from '@/components/frontend/FrontendProgressOverview';
import { Button } from '@/components/ui/Button';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'خريطة طريق مهندس الواجهات الأمامية (Frontend Engineering Roadmap 2027) | خمسة برمجة',
  description:
    'خارطة الطريق الهندسية الشاملة لتعلم وتطوير الواجهات الأمامية من الصفر إلى مستوى Senior Frontend Engineer بالعامية المصرية: ما قبل الفرونت إند، HTML5 و CSS3، جافاسكريبت المتقدمة، React 19، Next.js 15، والمعمارية المتقدمة.',
  alternates: {
    canonical: `${siteUrl}/frontend/roadmap`,
  },
  openGraph: {
    title: 'خريطة طريق مهندس الفرونت إند الكاملة 2027 | خمسة برمجة',
    description:
      'مسار هندسي متدرج من 6 محطات معتمدة يربط بين النظرية والتطبيق العملي ومشاريع الإنتاج الحقيقية.',
    url: `${siteUrl}/frontend/roadmap`,
    type: 'website',
  },
};

export default function FrontendRoadmapPage() {
  return (
    <div className="space-y-12 pb-16" dir="rtl">
      {/* Top Breadcrumb */}
      <ArticleBreadcrumb
        items={[
          { label: 'قسم الفرونت إند', href: '/frontend' },
          { label: 'خريطة الطريق الهندسية (Roadmap)' },
        ]}
      />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card via-surface to-background p-6 sm:p-10 shadow-card">
        {/* Glow Effects */}
        <div
          className="absolute -top-20 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 left-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-primary/15 text-primary border border-primary/30">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>تحديث شامل 2027 • مسار هندسي معتمد</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-surface border border-border text-foreground-muted">
              6 محطات • 110+ درساً • 10 مشاريع عملية
            </span>
          </div>

          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
              خارطة طريق مهندس الفرونت إند الكاملة بالترتيب الصحيح
            </h1>
            <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
              دليلك الهندسي الشامل لتعلم هندسة الواجهات الأمامية من الصفر حتى مستوى Senior Frontend Engineer بالعامية المصرية. مسار يربط كل مفهوم نظري بدروسه العملية ومشاريع واقعية تثري معرض أعمالك.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-2xl border border-border/80 bg-surface/70 p-3.5 space-y-1">
              <span className="text-[11px] font-bold text-foreground-muted block">المحطات الهندسية</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-primary">6 محطات</span>
              <span className="text-[10px] text-foreground-muted block">من الصفر حتى Senior</span>
            </div>

            <div className="rounded-2xl border border-border/80 bg-surface/70 p-3.5 space-y-1">
              <span className="text-[11px] font-bold text-foreground-muted block">توثيق جافاسكريبت</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-yellow-400">75 درساً</span>
              <span className="text-[10px] text-foreground-muted block">مكتمل 100% بالمنصة</span>
            </div>

            <div className="rounded-2xl border border-border/80 bg-surface/70 p-3.5 space-y-1">
              <span className="text-[11px] font-bold text-foreground-muted block">توثيق React.js</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-cyan-400">10 فصول</span>
              <span className="text-[10px] text-foreground-muted block">تحديثات React 19 والـ Hooks</span>
            </div>

            <div className="rounded-2xl border border-border/80 bg-surface/70 p-3.5 space-y-1">
              <span className="text-[11px] font-bold text-foreground-muted block">المشاريع العملية</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">10 مشاريع</span>
              <span className="text-[10px] text-foreground-muted block">+ مشروع تخرج شامل</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href="#roadmap">
              <Button className="gap-2 font-bold">
                <Compass className="h-4 w-4" />
                <span>استكشف المحطات الست</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </a>
            <Link href="/frontend">
              <Button variant="outline" className="gap-1.5 font-bold">
                <ArrowRight className="h-4 w-4" />
                <span>العودة لمركز توثيق الفرونت إند</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Global Learning Progress Overview */}
      <FrontendProgressOverview totalLessons={110} totalProjects={10} />

      {/* The Complete Roadmap Container (Diagram View + Detailed Tree) */}
      <FrontendRoadmapContainer />

      {/* Deep Learning Navigation Grid */}
      <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-card space-y-6">
        <div className="space-y-1 text-center sm:text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/25">
            <Sparkles className="h-3.5 w-3.5" />
            <span>اختر خطوتك التالية في التعلم</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">
            مستعد لبدء التطبيق العملي الآن؟
          </h3>
          <p className="text-xs sm:text-sm text-foreground-secondary">
            اختر التوثيق أو المسار المناسب لمستواك الحالي وابدأ دراسة الدروس خطوة بخطوة مع كود تطبيقي كامل.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1: JavaScript */}
          <Link
            href="/frontend/javascript"
            className="rounded-2xl border border-border/70 bg-surface/60 hover:bg-surface p-5 space-y-3 transition-all hover:border-yellow-500/40 group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center">
                <Terminal className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-foreground group-hover:text-yellow-400 transition-colors">
                توثيق جافاسكريبت الكامل
              </h4>
              <p className="text-xs text-foreground-muted leading-relaxed">
                75 مقالة مفصلة في محرك اللغة والـ Scope والـ Closures والـ DOM والـ Event Loop، بالإضافة إلى 10 مشاريع عملية كاملة.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-yellow-400">
              <span>ادخل على توثيق جافاسكريبت</span>
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: React.js */}
          <Link
            href="/frontend/react"
            className="rounded-2xl border border-border/70 bg-surface/60 hover:bg-surface p-5 space-y-3 transition-all hover:border-cyan-500/40 group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <Code2 className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-foreground group-hover:text-cyan-400 transition-colors">
                توثيق React.js الرسمي بالبلدي
              </h4>
              <p className="text-xs text-foreground-muted leading-relaxed">
                10 فصول شاملة تشرح الـ Virtual DOM ومنظومة الـ Hooks وإدارة الحالة والـ Forms و TanStack Query وتحديثات React 19.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-cyan-400">
              <span>ادخل على توثيق React.js</span>
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: HTML & CSS */}
          <Link
            href="/frontend/html"
            className="rounded-2xl border border-border/70 bg-surface/60 hover:bg-surface p-5 space-y-3 transition-all hover:border-teal-500/40 group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center">
                <Layers className="h-5 w-5" />
              </div>
              <h4 className="text-base font-bold text-foreground group-hover:text-teal-400 transition-colors">
                توثيق HTML5 و CSS3
              </h4>
              <p className="text-xs text-foreground-muted leading-relaxed">
                أساسيات الويب الدلالي، معايير إمكانية الوصول A11y، الـ Box Model، وتوزيعات Flexbox و CSS Grid المتجاوبة.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-teal-400">
              <span>ادخل على توثيق HTML و CSS</span>
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        <div className="pt-4 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-foreground-muted text-center sm:text-right">
            جميع المقالات والدروس والمشاريع متاحة مجانًا بالكامل بالعامية المصرية المبسطة.
          </span>
          <Link href="/frontend">
            <Button variant="outline" size="sm" className="gap-1.5 font-bold">
              <ArrowRight className="h-4 w-4" />
              <span>العودة للمركز الرئيسي للفرونت إند</span>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
