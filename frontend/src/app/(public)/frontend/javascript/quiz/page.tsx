import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  HelpCircle,
  ArrowRight,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Award,
  Timer,
} from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { QuizApp } from '@/components/projects/javascript/quiz/QuizApp';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'المشروع 04: تطبيق الاختبارات التفاعلي ومحرك المؤقت الزمني | توثيق JavaScript',
  description:
    'مشروع تطبيقي يترجم مفاهيم مصفوفات الكائنات والمؤقتات الزمنية في JavaScript: تطبيق اختبارات متقدم، مؤقت تنازلي، تحليل النتيجة النهائية، وتفسير هندسي شامل.',
  alternates: {
    canonical: `${siteUrl}/frontend/javascript/quiz`,
  },
};

export default function QuizProjectPage() {
  return (
    <div className="space-y-10" dir="rtl">
      <ArticleBreadcrumb
        items={[
          { label: 'قسم الفرونت إند', href: '/frontend' },
          { label: 'توثيق JavaScript', href: '/frontend/javascript' },
          { label: 'المشروع 04: تطبيق اختبارات تفاعلي (Quiz App)' },
        ]}
      />

      {/* Hero Header */}
      <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-card via-card to-amber-950/20 p-6 sm:p-10 shadow-card space-y-6">
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>المشروع العملي 04 — تطبيق مفاهيم الكائنات والمؤقتات والمصفوفات</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
            تطبيق الاختبارات التفاعلي ومحرك التقييم الزمني
          </h1>

          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            مشروع تطبيقي يربط بين معالجة مصفوفات الكائنات المعقدة (Objects & Arrays) وإدارة المؤقتات
            التنازلية (Timers) وإدارة دورة حياة الذاكرة في JavaScript. يختبر التطبيق معلوماتك المعمارية
            في مفاهيم مثل النماذج الأولية، الرفع، سياق التنفيذ، وEvent Loop مع تفسير علمي لكل سؤال.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-muted pt-2 border-t border-border">
            <span className="inline-flex items-center gap-1.5 font-mono text-amber-400">
              <Timer className="w-4 h-4" />
              <span>Interval Lifecycle & Clear Interval Cleanup</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-cyan-400">
              <Layers className="w-4 h-4" />
              <span>Array Operations & State Reducer</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-emerald-400">
              <Award className="w-4 h-4" />
              <span>Dynamic Scoring & Performance Analytics</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive App Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">منصة الاختبار التفاعلية</h2>
              <p className="text-xs text-foreground-secondary">
                أجب عن الأسئلة المعمارية قبل نفاد الوقت واكتشف مستواك التقني في هندسة JavaScript
              </p>
            </div>
          </div>
        </div>

        <QuizApp />
      </section>

      {/* Educational Deep Dive Section */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-8">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <BookOpen className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            المفاهيم الهندسية المطبقة في محرك الاختبارات
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-foreground-secondary leading-relaxed">
          <div className="space-y-3 p-5 rounded-2xl border border-border bg-muted/20">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Timer className="w-4 h-4 text-amber-400" />
              <span>1. إدارة المؤقتات التنازلية ومنع تسرب الذاكرة</span>
            </h3>
            <p>
              استخدام <code>setInterval</code> يتطلب دائماً استدعاء دالة التنظيف المقابلة{' '}
              <code>clearInterval</code> بمجرد إلغاء تثبيت المكون أو انتقال الحالة، لتفادي استمرار
              تشغيل الدالة في الخلفية واستهلاك موارد المعالج.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl border border-border bg-muted/20">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>2. فصل منطق البيانات عن واجهة المستخدم</span>
            </h3>
            <p>
              تخزين الأسئلة والخيارات والتفسيرات في مصفوفة كائنات نقية (Pure Data Structure) يتيح
              توسيع قاعدة الأسئلة أو جلبها ديناميكياً من واجهة برمجة تطبيقات (API) دون أي تعديل في
              كود الواجهة التفاعلية.
            </p>
          </div>
        </div>

        {/* Back Link to Hub */}
        <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/frontend/javascript"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground text-xs font-bold transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى فهرس توثيق JavaScript الكامل</span>
          </Link>

          <Link
            href="/frontend/javascript/todo-list"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20"
          >
            <span>استكشاف المشروع 03: تطبيق إدارة المهام</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
