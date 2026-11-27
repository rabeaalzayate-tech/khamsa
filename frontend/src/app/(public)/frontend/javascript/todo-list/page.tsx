import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckSquare,
  ArrowRight,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  Database,
} from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { TodoListApp } from '@/components/projects/javascript/todo-list/TodoListApp';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'المشروع 03: تطبيق إدارة المهام وتحديث الحالة بدون تعديل مباشر | توثيق JavaScript',
  description:
    'تطبيق تطبيقي متكامل يطبق مفاهيم المصفوفات والكائنات في JavaScript: عمليات CRUD بنمط لا يقبل التعديل Immutable Updates، تخزين البيانات في LocalStorage، والتصفية والبحث المتقدم.',
  alternates: {
    canonical: `${siteUrl}/frontend/javascript/todo-list`,
  },
};

export default function TodoListProjectPage() {
  return (
    <div className="space-y-10" dir="rtl">
      <ArticleBreadcrumb
        items={[
          { label: 'قسم الفرونت إند', href: '/frontend' },
          { label: 'توثيق JavaScript', href: '/frontend/javascript' },
          { label: 'المشروع 03: تطبيق إدارة المهام (To-Do List)' },
        ]}
      />

      {/* Hero Header */}
      <section className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-card via-card to-emerald-950/20 p-6 sm:p-10 shadow-card space-y-6">
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>المشروع العملي 03 — تطبيق المرحلتين 05 و 07 (Arrays & Objects Data Structures)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
            تطبيق إدارة المهام المتطور ونمط التحديث غير القابل للتعديل
          </h1>

          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            مشروع تطبيقي يترجم مفاهيم معالجة المصفوفات والكائنات (Arrays & Objects) في JavaScript إلى
            نظام تفاعلي متكامل. يركز التطبيق على تطبيق مبدأ عدم تعديل المراجع الأصلية (Immutability) في
            عمليات الإضافة والتعديل والحذف، مع إدارة التخزين المستديم عبر LocalStorage والبحث الفوري.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-muted pt-2 border-t border-border">
            <span className="inline-flex items-center gap-1.5 font-mono text-emerald-400">
              <Layers className="w-4 h-4" />
              <span>Immutable Array Operations (map, filter, spread)</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-amber-400">
              <Database className="w-4 h-4" />
              <span>LocalStorage Persistence & JSON Serialization</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-cyan-400">
              <CheckSquare className="w-4 h-4" />
              <span>Live Reactive State & Priority Filtering</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive App Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">تطبيق إدارة المهام الحي</h2>
              <p className="text-xs text-foreground-secondary">
                أضف المهام وقم بتعديل أولوياتها وتصفيتها وافحص شفرة التحديث البرمجية التفاعلية
              </p>
            </div>
          </div>
        </div>

        <TodoListApp />
      </section>

      {/* Educational Deep Dive Section */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-10 space-y-8">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <BookOpen className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            التشريح المعماري لأنماط المعالجة غير القابلة للتعديل
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-foreground-secondary leading-relaxed">
          <div className="space-y-3 p-5 rounded-2xl border border-border bg-muted/20">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>1. لماذا نتجنب push و splice في التطبيقات الحديثة؟</span>
            </h3>
            <p>
              دوال مثل <code>push()</code> و <code>splice()</code> تعدل المصفوفة في نفس موقع الذاكرة
              (In-place Mutation). هذا يكسر آلية التتبع في أطر العمل الحديثة مثل React التي تعتمد على
              مقارنة المراجع الضحلة (Shallow Equality Check).
            </p>
            <p className="text-xs text-foreground-muted">
              استخدام <code>[newItem, ...items]</code> يضمن إنشاء مرجع مصفوفة جديد يطلق إعادة التصيير
              (Re-render) فوراً وبكفاءة يمكن التنبؤ بها.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl border border-border bg-muted/20">
            <h3 className="font-bold text-foreground flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              <span>2. إدارة البيانات في LocalStorage والحماية من الأخطاء</span>
            </h3>
            <p>
              يخزن <code>LocalStorage</code> البيانات كسلاسل نصية متزامنة (Synchronous Strings).
              لذلك يجب دائماً تغليف عمليات القراءة والكتابة داخل كتل <code>try...catch</code> لتفادي
              تعطل الواجهة في حال امتلاء مساحة التخزين (QuotaExceededError) أو تفعيل وضع التصفح الخاص.
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
            href="/frontend/javascript/guessing-game"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20"
          >
            <span>استكشاف المشروع 02: لعبة تخمين الأرقام</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
