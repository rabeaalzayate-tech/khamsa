import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Target,
  ArrowRight,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Dices,
} from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { NumberGuessingGame } from '@/components/projects/javascript/guessing-game/NumberGuessingGame';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'المشروع 02: لعبة تخمين الأرقام وخوارزمية البحث الثنائي | توثيق JavaScript',
  description:
    'تطبيق تفاعلي يترجم مفاهيم الأرقام وكائن Math في JavaScript: توليد أرقام عشوائية Math.random، إدارة الحالة التفاعلية، وتطبيق استراتيجية البحث الثنائي لحل اللعبة بأقل عدد محاولات.',
  alternates: {
    canonical: `${siteUrl}/frontend/javascript/guessing-game`,
  },
};

export default function GuessingGameProjectPage() {
  return (
    <div className="space-y-10" dir="rtl">
      <ArticleBreadcrumb
        items={[
          { label: 'قسم الفرونت إند', href: '/frontend' },
          { label: 'توثيق JavaScript', href: '/frontend/javascript' },
          { label: 'المشروع 02: لعبة تخمين الأرقام' },
        ]}
      />

      {/* Hero Header */}
      <section className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-card via-card to-cyan-950/20 p-6 sm:p-10 shadow-card space-y-6">
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>المشروع العملي 02 — تطبيق المرحلة 06 (Strings, Numbers, and Math)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
            لعبة تخمين الأرقام التفاعلية ومحرك البحث الثنائي
          </h1>

          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            مشروع تطبيقي ممتع يربط بين دوال كائن Math في JavaScript ومفاهيم إدارة الحالة التفاعلية
            (State Management). يوضح التطبيق كيفية توليد نطاقات عشوائية موثوقة باستخدام Math.random،
            إدارة فضاء الاحتمالات الرياضية، وتطبيق خوارزمية البحث الثنائي (Binary Search) لتقليص
            المحاولات إلى حدها الأدنى علمياً.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-muted pt-2 border-t border-border">
            <span className="inline-flex items-center gap-1.5 font-mono text-cyan-400">
              <Cpu className="w-4 h-4" />
              <span>Math.random() & Math.floor()</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-amber-400">
              <Target className="w-4 h-4" />
              <span>Binary Search Algorithm O(log n)</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-emerald-400">
              <Layers className="w-4 h-4" />
              <span>React Reactive State & LocalStorage</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive App Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">ساحة اللعب التفاعلية</h2>
              <p className="text-xs text-foreground-secondary">
                اختر مستوى الصعوبة وابدأ التخمين مع الاستفادة من التوجيهات الرياضية الحية
              </p>
            </div>
          </div>
        </div>

        <NumberGuessingGame />
      </section>

      {/* Educational Deep Dive Section */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-8">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <BookOpen className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            التشريح البرمجي والمعماري للمشروع
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-foreground-secondary leading-relaxed">
          <div className="space-y-3 p-5 rounded-2xl border border-border bg-muted/20">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>1. توليد الأرقام العشوائية في نطاق [min, max]</span>
            </h3>
            <p>
              دالة <code>Math.random()</code> تُعيد رقماً كسرRowاً عشوائياً يقع في النطاق نصف المفتوح{' '}
              <code>[0, 1)</code>. لتحويله إلى عدد صحيح مغلق بين <code>min</code> و <code>max</code>،
              نستخدم الصيغة القياسية:
            </p>
            <pre className="p-3 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs overflow-x-auto text-left" dir="ltr">
{`const randomInt = Math.floor(
  Math.random() * (max - min + 1)
) + min;`}
            </pre>
            <p className="text-xs text-foreground-muted">
              حيث تضمن <code>(max - min + 1)</code> شمولية الحد الأقصى، بينما تقتطع <code>Math.floor</code>{' '}
              الكسور بالتساوي وباحتمالية منتظمة (Uniform Distribution).
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl border border-border bg-muted/20">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span>2. استراتيجية البحث الثنائي (Binary Search)</span>
            </h3>
            <p>
              لماذا 7 محاولات كافية دائماً لتخمين رقم بين 1 و 100؟ لأن خوارزمية البحث الثنائي تخفّض
              فضاء البحث إلى النصف في كل خطوة:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 text-amber-300 font-mono text-xs overflow-x-auto text-left" dir="ltr">
{`log2(100) ≈ 6.64 => ceil(6.64) = 7 محاولات`}
            </div>
            <p className="text-xs text-foreground-muted">
              باختيار نقطة المنتصف <code>Math.floor((low + high) / 2)</code> في كل مرة، يستحيل أن
              تتجاوز 7 تخمينات مهما كان الرقم السري!
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
            href="/frontend/javascript/calculator"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20"
          >
            <span>استكشاف المشروع 01: محرك الآلة الحاسبة</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
