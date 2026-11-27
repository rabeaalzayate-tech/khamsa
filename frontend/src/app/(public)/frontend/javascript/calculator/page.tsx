import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calculator,
  ArrowRight,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { ScientificCalculator } from '@/components/projects/javascript/calculator/ScientificCalculator';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'المشروع 01: محرك الآلة الحاسبة العلمية ومحول العملات | توثيق JavaScript',
  description:
    'مشروع تطبيقي هندسي متكامل يطبق مفاهيم المرحلة 03 من توثيق JavaScript: المعاملات الحسابية، أسبقية المعاملات وخوارزمية Shunting-Yard، كائن Math، وحسابات العملات المالية.',
  alternates: {
    canonical: `${siteUrl}/frontend/javascript/calculator`,
  },
};

export default function CalculatorProjectPage() {
  return (
    <div className="space-y-10" dir="rtl">
      <ArticleBreadcrumb
        items={[
          { label: 'قسم الفرونت إند', href: '/frontend' },
          { label: 'توثيق JavaScript', href: '/frontend/javascript' },
          { label: 'المشروع 01: الآلة الحاسبة العلمية ومحول العملات' },
        ]}
      />

      {/* Hero Header */}
      <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-card via-card to-amber-950/20 p-6 sm:p-10 shadow-card space-y-6">
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>المشروع العملي 01 — تطبيق المرحلة 03 (Operators & Expressions)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
            محرك الآلة الحاسبة العلمية ومحول العملات التفاعلي
          </h1>

          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            تطبيق هندسي متكامل يترجم المفاهيم النظرية المشروحة في دروس المرحلة الثالثة من توثيق
            JavaScript إلى كود إنتاجي حقيقي. يعتمد المحرك على خوارزمية Shunting-Yard لمعالجة أسبقية
            المعاملات الرياضية، كائن Math للدوال العلمية والمثلثية، ومعالجة دقيقة للفاصلة العائمة
            IEEE 754 وحسابات مالية موثقة.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-muted pt-2 border-t border-border">
            <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
              <Cpu className="h-4 w-4 text-amber-400" />
              <span>خوارزمية Shunting-Yard (RPN)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
              <Layers className="h-4 w-4 text-amber-400" />
              <span>معالجة دقة IEEE 754 و Number.EPSILON</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
              <Code2 className="h-4 w-4 text-amber-400" />
              <span>TypeScript بنية نظيفة 100%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Component */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2">
            <Calculator className="h-6 w-6 text-amber-400" />
            <span>التطبيق التفاعلي المباشر</span>
          </h2>
          <span className="text-xs text-foreground-muted font-mono">Interactive Live Demo</span>
        </div>

        <ScientificCalculator />
      </section>

      {/* Educational Breakdown Section */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-foreground">
            التشريح الهندسي للمشروع: كيف تم توظيف دروس المرحلة 03؟
          </h2>
          <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
            الهدف من هذا المشروع ليس مجرد واجهة مستخدم لأزرار حسابية، بل بناء محرك رياضي تحليلي
            مستقل يعكس القواعد الصارمة للغة JavaScript في معالجة التعبيرات والمعاملات.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl border border-border bg-background p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Code2 className="h-4 w-4" />
              <span>1. خوارزمية Shunting-Yard وقواعد الأسبقية</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
              عند إدخال تعبير مثل <code className="text-amber-400 font-mono">3 + 5 * 2 ^ 3</code>،
              لا يمكن تنفيذه بالترتيب من اليسار إلى اليمين. يقوم المحرك بتحويل التعبير من صيغة Infix
              إلى Postfix (RPN) بالاعتماد على جدول أسبقية دقيق: الأسس أولا بتجميع من اليمين إلى
              اليسار، ثم الضرب والقسمة، ثم الجمع والطرح.
            </p>
            <Link
              href="/articles/js-docs-17-operator-precedence-and-associativity"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline pt-1"
            >
              <span>مراجعة الدرس 17: أسبقية المعاملات وقواعد التجميع</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-border bg-background p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Layers className="h-4 w-4" />
              <span>2. معالجة معضلة الفاصلة العائمة (IEEE 754)</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
              تخزن JavaScript الأرقام وفق معيار IEEE 754 64-bit، مما يسبب أخطاء تمثيل ثنائي مثل{' '}
              <code className="text-amber-400 font-mono">0.1 + 0.2 = 0.30000000000000004</code>. تم
              تزويد المحرك بدالة تنظيف مخصصة تستخدم{' '}
              <code className="text-amber-400 font-mono">Number.EPSILON</code> وتقريب ذكي لإرجاع
              قيم رياضية منضبطة للمستخدم دون المساس بدقة العمليات الوسيطة.
            </p>
            <Link
              href="/articles/js-docs-13-arithmetic-operators-and-math-object"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline pt-1"
            >
              <span>مراجعة الدرس 13: المعاملات الحسابية وكائن Math</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-border bg-background p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Cpu className="h-4 w-4" />
              <span>3. المعاملات المنطقية والدارة القصيرة</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
              يعتمد الكود الداخلي للمحرك على معاملات التقييم ذي الدارة القصيرة مثل معامل الدمج مع
              القيمة الفارغة (<code className="text-amber-400 font-mono">??</code>) لتعيين القيم
              الافتراضية للزوايا ومعدلات الرسوم، والمعامل الشرطي الثلاثي لتبديل أنظمة العرض دون
              توليد أخطاء وقت التشغيل.
            </p>
            <Link
              href="/articles/js-docs-15-logical-operators-and-short-circuit-evaluation"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline pt-1"
            >
              <span>مراجعة الدرس 15: المعاملات المنطقية والدارة القصيرة</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-border bg-background p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <ShieldAlert className="h-4 w-4" />
              <span>4. محول العملات والبيانات المرجعية التعليمية</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
              يطبق المحول الحسابات النقدية عبر تقنية Integer Scaling لمنع تراكم أخطاء التقريب في
              الكسور، مع تنسيق كامل عبر واجهة المتصفح القياسية{' '}
              <code className="text-amber-400 font-mono">Intl.NumberFormat</code>. جميع أسعار الصرف
              المستخدمة هي بيانات مرجعية تعليمية ثابتة وموثقة مخصصة للأغراض التعليمية.
            </p>
            <Link
              href="/articles/js-docs-14-assignment-and-comparison-operators"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline pt-1"
            >
              <span>مراجعة الدرس 14: معاملات الإسناد والمقارنة</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Phase 03 Links */}
        <div className="pt-6 border-t border-border">
          <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-amber-400" />
            <span>مقالات المرحلة 03 المرتبطة بهذا المشروع:</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
            <Link
              href="/articles/js-docs-13-arithmetic-operators-and-math-object"
              className="p-2.5 rounded-xl border border-border bg-background hover:border-amber-500/40 text-foreground transition-colors flex items-center justify-between"
            >
              <span>13. المعاملات الحسابية وكائن Math</span>
              <ExternalLink className="h-3.5 w-3.5 text-foreground-muted" />
            </Link>
            <Link
              href="/articles/js-docs-14-assignment-and-comparison-operators"
              className="p-2.5 rounded-xl border border-border bg-background hover:border-amber-500/40 text-foreground transition-colors flex items-center justify-between"
            >
              <span>14. معاملات الإسناد والمقارنة</span>
              <ExternalLink className="h-3.5 w-3.5 text-foreground-muted" />
            </Link>
            <Link
              href="/articles/js-docs-15-logical-operators-and-short-circuit-evaluation"
              className="p-2.5 rounded-xl border border-border bg-background hover:border-amber-500/40 text-foreground transition-colors flex items-center justify-between"
            >
              <span>15. المعاملات المنطقية والدارة القصيرة</span>
              <ExternalLink className="h-3.5 w-3.5 text-foreground-muted" />
            </Link>
            <Link
              href="/articles/js-docs-16-bitwise-and-miscellaneous-operators"
              className="p-2.5 rounded-xl border border-border bg-background hover:border-amber-500/40 text-foreground transition-colors flex items-center justify-between"
            >
              <span>16. المعاملات البتية والمعاملات المتنوعة</span>
              <ExternalLink className="h-3.5 w-3.5 text-foreground-muted" />
            </Link>
            <Link
              href="/articles/js-docs-17-operator-precedence-and-associativity"
              className="p-2.5 rounded-xl border border-border bg-background hover:border-amber-500/40 text-foreground transition-colors flex items-center justify-between"
            >
              <span>17. أسبقية المعاملات وقواعد التجميع</span>
              <ExternalLink className="h-3.5 w-3.5 text-foreground-muted" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
