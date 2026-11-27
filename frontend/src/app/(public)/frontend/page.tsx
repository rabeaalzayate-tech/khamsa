import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Code2,
  BookOpen,
  Layers,
  ArrowLeft,
  Terminal,
  Cpu,
  CheckCircle2,
  GitBranch,
  Globe,
  Rocket,
  Gauge,
} from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getSiteUrl } from '@/lib/seo/site-url';
import { REACT_DOCS_CURRICULUM } from '@/data/react-docs-curriculum';
import { HTML_DOCS_CURRICULUM } from '@/data/html-docs-curriculum';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'قسم الفرونت إند (Frontend Engineering)',
  description:
    'المسار التعليمي المنظم لتطوير واجهات المستخدم (Frontend) بالعربي: ما قبل الفرونت إند، توثيق HTML5 الكامل، CSS و JavaScript، TypeScript، وتوثيق React.js و Next.js.',
  alternates: {
    canonical: `${siteUrl}/frontend`,
  },
};

function ReactAtomSvg({ className = 'w-7 h-7' }: { className?: string }) {
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

const WEB_FUNDAMENTALS_LESSONS = [
  {
    number: '01',
    title: 'كيف يعمل الإنترنت؟ شرح DNS و IP و Domain Name بالبلدي',
    href: '/articles/web-docs-01-how-internet-dns-ip-domain-works',
  },
  {
    number: '02',
    title: 'شرح بروتوكول HTTP و HTTPS و TLS 1.3 ورموز الحالة (200, 401, 404, 500)',
    href: '/articles/web-docs-02-http-https-tls-status-codes',
  },
  {
    number: '03',
    title: 'كيف يرسم المتصفح الصفحة؟ شرح DOM و CSSOM والـ Critical Rendering Path',
    href: '/articles/web-docs-03-browser-rendering-dom-cssom-critical-path',
  },
  {
    number: '04',
    title: 'مفهوم Client vs Server والـ APIs بالتفصيل (REST و JSON و CORS و CSR vs SSR)',
    href: '/articles/web-docs-04-client-vs-server-and-apis-architecture',
  },
];

const TOOLING_GIT_LESSONS = [
  {
    number: '01',
    title: 'إعداد VS Code باحتراف: الإضافات، settings.json، واختصارات الكيبورد',
    href: '/articles/tooling-docs-01-vscode-setup-extensions-shortcuts',
  },
  {
    number: '02',
    title: 'احتراف الـ Terminal والـ Command Line للمبرمجين (PowerShell و Bash)',
    href: '/articles/tooling-docs-02-terminal-cli-essentials',
  },
  {
    number: '03',
    title: 'توثيق Git الكامل بالبلدي (init, add, commit, branch, merge)',
    href: '/articles/tooling-docs-03-git-fundamentals-branching-merging',
  },
  {
    number: '04',
    title: 'رفع مشاريعك على GitHub، الـ Pull Requests، وكتابة README احترافي',
    href: '/articles/tooling-docs-04-github-pull-requests-readme',
  },
];

const STYLING_JS_TRACKS = [
  {
    title: 'توثيق CSS3 النقية الكامل (8 دروس)',
    description: 'من الصفر للاحتراف بدون مكتبات: Box Model، Flexbox، CSS Grid، Responsive، Variables، و Animations.',
    href: '/frontend/css',
    badge: 'Pure CSS3 Docs',
    icon: Layers,
  },
  {
    title: 'توثيق JavaScript الكامل (75 درسًا + 10 مشاريع)',
    description: 'المرجع الشامل من الصفر للاحتراف: 11 مرحلة تغطي الأساسيات، Closures، الـ DOM، الـ Event Loop، Promises، و Browser APIs.',
    href: '/frontend/javascript',
    badge: 'JavaScript Docs',
    icon: Code2,
  },
];

const PRODUCTION_TRACKS = [
  {
    title: 'TypeScript للمشاريع الحقيقية',
    description: 'أنواع البيانات، Interfaces، Generics، وحماية كود React من أخطاء Runtime.',
    href: '/articles/comprehensive-typescript-guide-types-generics-patterns',
    badge: 'الاحتراف',
    icon: Cpu,
  },
  {
    title: 'Next.js App Router للإنتاج',
    description: 'Server Components و SSR و SSG و ISR و Server Actions وتحسين محركات البحث.',
    href: '/articles/nextjs-app-router-engineering-guide-production-performance',
    badge: 'Next.js Engineer',
    icon: Rocket,
  },
  {
    title: 'معمارية الفرونت إند والأداء (CWV)',
    description: 'تنظيم المشاريع الكبيرة، تحسين Core Web Vitals، والاختبارات والأمان.',
    href: '/articles/modern-frontend-architecture-state-management-component-design',
    badge: 'Frontend Engineer',
    icon: Gauge,
  },
];

export default function FrontendHubPage() {
  return (
    <div className="space-y-16" dir="rtl">
      <ArticleBreadcrumb items={[{ label: 'قسم الفرونت إند' }]} />

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-card">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
            <Code2 className="h-3.5 w-3.5" />
            <span>قسم الفرونت إند (Frontend Engineering)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
            منهج الفرونت إند الكامل بالترتيب الصحيح
          </h1>

          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            بدل التشتت بين المقالات العشوائية، جمعنالك هنا مسار توثيق متسلسل ومنفصل بالكامل:
            يبدأ من <strong className="text-foreground">ما قبل الفرونت إند</strong> (الإنترنت و
            VS Code و Git)، ثم <strong className="text-foreground">توثيق HTML5</strong> و CSS و JS،
            ثم <strong className="text-foreground">توثيق React.js الكامل</strong>، وصولاً لـ
            Next.js وسوق العمل.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/frontend/roadmap">
              <Button className="gap-2 font-bold shadow-lg shadow-primary/20">
                <GitBranch className="h-4 w-4" />
                <span>افتح خريطة الطريق الشجرية (Roadmap)</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#stage-00">
              <Button variant="outline" className="gap-2 font-bold">
                <BookOpen className="h-4 w-4" />
                <span>ابدأ من المرحلة 00</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Stage 00: Pre-Frontend (Web Fundamentals + Developer Tooling) */}
      <section id="stage-00" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-amber-400">
              00 — PRE-FRONTEND FOUNDATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              المرحلة 00: ما قبل الفرونت إند وأدوات المبرمج
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted">
              ابدأ من هنا لفهم الشبكات والمتصفح وتجهيز بيئة التطوير و Git قبل كتابة أول مشروع
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Track 00-A: How the Web Works */}
          <div className="rounded-3xl border border-amber-500/30 bg-card p-6 shadow-card space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center shrink-0">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-400 block">
                    السلسلة الأولى (4 دروس)
                  </span>
                  <h3 className="text-lg font-black text-foreground">
                    الإنترنت والشبكات (How the Web Works)
                  </h3>
                </div>
              </div>
              <Badge variant="secondary" className="text-[11px] font-bold">
                أساسي
              </Badge>
            </div>

            <div className="space-y-2.5">
              {WEB_FUNDAMENTALS_LESSONS.map(lesson => (
                <Link
                  key={lesson.href}
                  href={lesson.href}
                  className="group flex items-center justify-between gap-3 p-3.5 rounded-2xl border border-border bg-background/60 hover:border-amber-500/50 hover:bg-surface-hover/50 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-black text-amber-400 shrink-0">
                      {lesson.number}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-amber-400 transition-colors truncate">
                      {lesson.title}
                    </span>
                  </div>
                  <ArrowLeft className="h-3.5 w-3.5 text-foreground-muted group-hover:text-amber-400 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Track 00-B: Tooling & Git */}
          <div className="rounded-3xl border border-primary/30 bg-card p-6 shadow-card space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shrink-0">
                  <Terminal className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-primary block">
                    السلسلة الثانية (4 دروس)
                  </span>
                  <h3 className="text-lg font-black text-foreground">
                    بيئة التطوير و Git &amp; GitHub
                  </h3>
                </div>
              </div>
              <Badge variant="secondary" className="text-[11px] font-bold">
                إلزامي
              </Badge>
            </div>

            <div className="space-y-2.5">
              {TOOLING_GIT_LESSONS.map(lesson => (
                <Link
                  key={lesson.href}
                  href={lesson.href}
                  className="group flex items-center justify-between gap-3 p-3.5 rounded-2xl border border-border bg-background/60 hover:border-primary/50 hover:bg-surface-hover/50 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-black text-primary shrink-0">
                      {lesson.number}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {lesson.title}
                    </span>
                  </div>
                  <ArrowLeft className="h-3.5 w-3.5 text-foreground-muted group-hover:text-primary shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stage 01: Web Foundations (HTML5 Docs + CSS & JS) */}
      <section id="stage-01" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-orange-400">
              01 — FRONTEND DEVELOPER FOUNDATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              المرحلة 01: توثيق HTML5 الكامل + CSS3 و JavaScript
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted">
              هنا تتعلم بناء هيكل الويب الدلالي، التصميم المتجاوب، وبرمجة التفاعل بالـ JavaScript
            </p>
          </div>

          <Link href="/frontend/html">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-orange-400 font-bold">
              <span>فهرس توثيق HTML5 (6 دروس)</span>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* HTML5 Full Documentation Box */}
        <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-card via-card to-orange-950/20 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-orange-500/15 text-orange-400 border border-orange-500/30 font-bold">
                  6 دروس شاملة
                </Badge>
                <Badge variant="secondary" className="font-mono text-xs">
                  HTML5 Living Standard
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  أكثر من 30,000 كلمة
                </Badge>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                توثيق HTML5 الكامل بالعامية المصرية
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                من أول تشريح الصفحة والـ DOM، للصور المتجاوبة والوسائط، والجداول والوسوم الدلالية،
                حتى النماذج الاحترافية وإمكانية الوصول (A11y) والـ Technical SEO.
              </p>
            </div>

            <Link href="/frontend/html" className="shrink-0">
              <Button size="lg" className="w-full lg:w-auto gap-2 font-bold">
                <span>افتح توثيق HTML5</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-border/60">
            {HTML_DOCS_CURRICULUM.map(ch => (
              <Link
                key={ch.slug}
                href={`/articles/${ch.slug}`}
                className="group p-4 rounded-2xl border border-border bg-background/60 hover:border-orange-500/50 hover:bg-surface-hover/50 transition-all space-y-1.5"
              >
                <span className="font-mono text-xs font-bold text-orange-400 block">
                  الدرس {String(ch.number).padStart(2, '0')}
                </span>
                <h4 className="font-bold text-sm text-foreground group-hover:text-orange-400 transition-colors line-clamp-2">
                  {ch.shortTitle}
                </h4>
              </Link>
            ))}
          </div>
        </div>

        {/* CSS & JavaScript Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {STYLING_JS_TRACKS.map(track => {
            const Icon = track.icon;
            return (
              <Link
                key={track.href}
                href={track.href}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all shadow-card flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="text-[11px] font-bold">
                      {track.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground group-hover:text-primary transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                    {track.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                  <span>اقرأ الدليل</span>
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Stage 02: React.js Documentation (10 Chapters) */}
      <section id="stage-02" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-cyan-400">
              02 — REACT ENGINEER DOCUMENTATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground flex items-center gap-2.5">
              <ReactAtomSvg className="w-7 h-7 text-cyan-400 shrink-0" />
              <span>المرحلة 02: توثيق React.js الكامل بالعامية المصرية</span>
            </h2>
          </div>

          <Link href="/frontend/react">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-cyan-400 font-bold">
              <span>عرض الفهرس الكامل (10 فصول)</span>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-card via-card to-cyan-950/20 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary" className="font-bold">
                  10 فصول شاملة
                </Badge>
                <Badge variant="secondary" className="font-mono text-xs">
                  React 18 / 19 Docs
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  أكثر من 52,000 كلمة شرح عملي
                </Badge>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                منهج React.js الكامل كأنه Documentation رسمي بالبلدي
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                سلسلة مرجعية تغطي React من أول فكرة الـ Virtual DOM والـ JSX والـ Props، مروراً بكل
                الـ Hooks (`useState`, `useEffect`, `useRef`, `useReducer`, `useMemo`)، ثم Context
                API و Custom Hooks و Forms و Routing و TanStack Query حتى React 19 والأداء.
              </p>
            </div>

            <Link href="/frontend/react" className="shrink-0">
              <Button size="lg" className="w-full lg:w-auto gap-2 font-bold">
                <span>ابدأ قراءة توثيق React</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 pt-4 border-t border-border/60">
            {REACT_DOCS_CURRICULUM.map(ch => (
              <Link
                key={ch.slug}
                href={`/articles/${ch.slug}`}
                className="group p-3.5 rounded-2xl border border-border bg-background/60 hover:border-cyan-500/50 hover:bg-surface-hover/50 transition-all space-y-1.5"
              >
                <span className="font-mono text-[11px] font-bold text-cyan-400 block">
                  الفصل {String(ch.number).padStart(2, '0')}
                </span>
                <h4 className="font-bold text-xs text-foreground group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {ch.shortTitle}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stage 03: TypeScript, Next.js & Production Engineering */}
      <section id="stage-03" className="space-y-6">
        <div className="space-y-1 border-b border-border pb-4">
          <span className="text-xs font-mono font-bold text-emerald-400">
            03 — NEXT.JS &amp; FRONTEND ENGINEER
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">
            المرحلة 03: TypeScript، Next.js، وهندسة الإنتاج
          </h2>
          <p className="text-xs sm:text-sm text-foreground-muted">
            الخطوة النهائية للانتقال من مطوّر React إلى Next.js Engineer و Frontend Engineer جاهز لسوق العمل
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRODUCTION_TRACKS.map(track => {
            const Icon = track.icon;
            return (
              <Link
                key={track.href}
                href={track.href}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-emerald-500/50 transition-all shadow-card flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="text-[11px] font-bold">
                      {track.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground group-hover:text-emerald-400 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <span>اقرأ الدليل</span>
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Study Guide */}
      <section className="rounded-3xl border border-border bg-surface/60 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-black text-foreground">
          إزاي تذاكر قسم الفرونت إند صح؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-foreground-secondary">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>ابدأ من المرحلة 00 (الشبكات و Git) ثم توثيق HTML5 و CSS و JS قبل أي Framework.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>ادخل على فصول React العشرة بالترتيب وجرّب كل مثال وتمارين نهاية الدرس بإيدك.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>اتبع خريطة الطريق الشجرية في /frontend/roadmap عشان توصل لمستوى Frontend Engineer.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
