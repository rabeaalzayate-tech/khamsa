import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Code2,
  BookOpen,
  ArrowLeft,
  Terminal,
  Cpu,
  CheckCircle2,
  GitBranch,
  Globe,
  Rocket,
  Gauge,
  Laptop,
  Play,
  ChevronLeft,
} from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FrontendProgressOverview } from '@/components/frontend/FrontendProgressOverview';
import { getSiteUrl } from '@/lib/seo/site-url';
import { REACT_DOCS_CURRICULUM } from '@/data/react-docs-curriculum';
import { HTML_DOCS_CURRICULUM } from '@/data/html-docs-curriculum';
import { CSS_DOCS_CURRICULUM } from '@/data/css-docs-curriculum';
import { JS_DOCS_CURRICULUM, JS_DOCS_PROJECTS } from '@/data/javascript-docs-curriculum';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'قسم الفرونت إند الشامل — مسار مهندس الواجهات (110 مقالة + 10 مشاريع)',
  description:
    'المسار التعليمي المنظم لتطوير واجهات المستخدم (Frontend Engineering) بالعربي: ما قبل الفرونت إند، توثيق HTML5 الكامل، CSS3، توثيق JavaScript بـ 75 درسًا و10 مشاريع، توثيق React.js، و Next.js للإنتاج.',
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

function JsSquareSvg({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 10.5v5.2c0 1.2-.7 1.8-1.8 1.8-.8 0-1.4-.3-1.8-.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17.2 11.4c-.4-.6-1-.9-1.8-.9-1.1 0-1.8.6-1.8 1.4 0 .9.7 1.3 1.9 1.7 1.2.4 1.9.9 1.9 2 0 1.1-.9 1.9-2.2 1.9-1.1 0-1.9-.4-2.4-1.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const WEB_FUNDAMENTALS_LESSONS = [
  {
    number: '01',
    title: 'كيف يعمل الإنترنت؟ شرح DNS و IP و Domain Name بالبلدي',
    href: '/articles/web-docs-01-how-internet-dns-ip-domain-works',
    tag: 'DNS & IP',
    readTime: '20 دقيقة',
  },
  {
    number: '02',
    title: 'شرح بروتوكول HTTP و HTTPS و TLS 1.3 ورموز الحالة (200, 401, 404, 500)',
    href: '/articles/web-docs-02-http-https-tls-status-codes',
    tag: 'HTTP / TLS',
    readTime: '25 دقيقة',
  },
  {
    number: '03',
    title: 'كيف يرسم المتصفح الصفحة؟ شرح DOM و CSSOM والـ Critical Rendering Path',
    href: '/articles/web-docs-03-browser-rendering-dom-cssom-critical-path',
    tag: 'DOM & CRP',
    readTime: '28 دقيقة',
  },
  {
    number: '04',
    title: 'مفهوم Client vs Server والـ APIs بالتفصيل (REST و JSON و CORS و CSR vs SSR)',
    href: '/articles/web-docs-04-client-vs-server-and-apis-architecture',
    tag: 'REST & CORS',
    readTime: '30 دقيقة',
  },
];

const TOOLING_GIT_LESSONS = [
  {
    number: '01',
    title: 'إعداد VS Code باحتراف: الإضافات، settings.json، واختصارات الكيبورد',
    href: '/articles/tooling-docs-01-vscode-setup-extensions-shortcuts',
    tag: 'VS Code IDE',
    readTime: '22 دقيقة',
  },
  {
    number: '02',
    title: 'احتراف الـ Terminal والـ Command Line للمبرمجين (PowerShell و Bash)',
    href: '/articles/tooling-docs-02-terminal-cli-essentials',
    tag: 'CLI & Bash',
    readTime: '25 دقيقة',
  },
  {
    number: '03',
    title: 'توثيق Git الكامل بالبلدي (init, add, commit, branch, merge)',
    href: '/articles/tooling-docs-03-git-fundamentals-branching-merging',
    tag: 'Git Core',
    readTime: '32 دقيقة',
  },
  {
    number: '04',
    title: 'رفع مشاريعك على GitHub، الـ Pull Requests، وكتابة README احترافي',
    href: '/articles/tooling-docs-04-github-pull-requests-readme',
    tag: 'GitHub PRs',
    readTime: '26 دقيقة',
  },
];

const PRODUCTION_TRACKS = [
  {
    title: 'TypeScript للمشاريع الحقيقية',
    subtitle: 'Types, Interfaces, Generics & Runtime Safety',
    description: 'أنواع البيانات، Interfaces، Generics، وحماية كود React من أخطاء Runtime في التطبيقات الكبيرة.',
    href: '/articles/comprehensive-typescript-guide-types-generics-patterns',
    badge: 'الاحتراف المتقدم',
    icon: Cpu,
    tag: 'TypeScript 5.x',
    accentColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10 group-hover:border-blue-500/60',
  },
  {
    title: 'Next.js App Router للإنتاج',
    subtitle: 'RSC, Server Actions, SSR/SSG & Edge Performance',
    description: 'Server Components، SSR، SSG، ISR، Server Actions، تحسين محركات البحث، وتأمين الـ APIs.',
    href: '/articles/nextjs-app-router-engineering-guide-production-performance',
    badge: 'Next.js Engineer',
    icon: Rocket,
    tag: 'Next.js 15+ App Router',
    accentColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 group-hover:border-emerald-500/60',
  },
  {
    title: 'معمارية الفرونت إند والأداء (CWV)',
    subtitle: 'Scalable Architecture, State Design & Core Web Vitals',
    description: 'تنظيم المشاريع الضخمة، تحسين Core Web Vitals (LCP, INP, CLS)، والتخزين المؤقت وحماية الثغرات.',
    href: '/articles/modern-frontend-architecture-state-management-component-design',
    badge: 'Frontend Architect',
    icon: Gauge,
    tag: 'Architecture & Perf',
    accentColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10 group-hover:border-purple-500/60',
  },
];

export default function FrontendHubPage() {
  // Dynamically calculate statistics from actual curriculum datasets
  const totalHtmlLessons = HTML_DOCS_CURRICULUM.length;
  const totalCssLessons = CSS_DOCS_CURRICULUM.length;
  const totalJsLessons = JS_DOCS_CURRICULUM.length;
  const totalReactLessons = REACT_DOCS_CURRICULUM.length;
  const totalWebAndTooling = WEB_FUNDAMENTALS_LESSONS.length + TOOLING_GIT_LESSONS.length;
  const totalProdGuides = PRODUCTION_TRACKS.length;

  const grandTotalLessons =
    totalHtmlLessons + totalCssLessons + totalJsLessons + totalReactLessons + totalWebAndTooling + totalProdGuides;
  const totalProjects = JS_DOCS_PROJECTS.length;

  return (
    <div className="space-y-20 pb-16" dir="rtl">
      {/* 1. Breadcrumb Navigation */}
      <ArticleBreadcrumb
        items={[
          { label: 'قسم الفرونت إند (Frontend Engineering)' },
        ]}
      />

      {/* 2. Hero Section — Premium Developer Learning Portal */}
      <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-surface/90 via-card to-background p-6 sm:p-10 lg:p-14 shadow-card">
        {/* Subtle Ambient Glows */}
        <div
          className="absolute -top-24 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 left-1/4 w-96 h-96 bg-cyan-400/8 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          {/* Main Hero Headline & Copy */}
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-black tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span>مسار مهندس الواجهات الأمامية • FRONTEND ENGINEERING ROADMAP</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.2] tracking-tight">
              منهج الفرونت إند الكامل{' '}
              <span className="bg-gradient-to-l from-primary via-amber-300 to-cyan-400 bg-clip-text text-transparent">
                بالترتيب الصحيح لسوق العمل
              </span>
            </h1>

            <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed font-medium">
              بدل التشتت بين الكورسات والمقالات العشوائية، جمعنا لك مسارًا هندسيًا متسلسلاً ومترابطًا بالكامل باللغة العربية مع المصطلحات الإنجليزية: يبدأ من{' '}
              <strong className="text-foreground font-black">ما قبل الفرونت إند</strong> (كيف يعمل الويب و Git)، ثم{' '}
              <strong className="text-foreground font-black">توثيق HTML5 و CSS3 و JavaScript الشامل</strong> مع 10 مشاريع عملية، ثم{' '}
              <strong className="text-foreground font-black">توثيق React.js المتقدم</strong>، وصولاً إلى{' '}
              <strong className="text-foreground font-black">Next.js App Router و TypeScript</strong> ومعمارية الإنتاج.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a href="#stage-00">
                <Button size="lg" className="gap-2 font-black bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/20 px-6 py-3 rounded-2xl text-sm">
                  <Play className="h-4 w-4 fill-current" />
                  <span>ابدأ رحلة التعلم (المرحلة 00)</span>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </a>

              <Link href="/frontend/roadmap">
                <Button variant="outline" size="lg" className="gap-2 font-bold border-border/80 hover:border-primary/50 hover:bg-surface px-6 py-3 rounded-2xl text-sm">
                  <GitBranch className="h-4 w-4 text-primary" />
                  <span>خريطة الطريق الشجرية (Roadmap)</span>
                </Button>
              </Link>
            </div>

            {/* Quick Stage Anchor Links */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-foreground-muted">
              <span className="text-[11px] font-sans">الانتقال السريع:</span>
              <a href="#stage-00" className="px-2.5 py-1 rounded-lg bg-surface border border-border/60 hover:text-amber-400 hover:border-amber-400/40 transition-colors">
                00. الأساسيات
              </a>
              <a href="#stage-01" className="px-2.5 py-1 rounded-lg bg-surface border border-border/60 hover:text-orange-400 hover:border-orange-400/40 transition-colors">
                01. HTML &amp; CSS &amp; JS
              </a>
              <a href="#stage-02" className="px-2.5 py-1 rounded-lg bg-surface border border-border/60 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors">
                02. React.js
              </a>
              <a href="#stage-03" className="px-2.5 py-1 rounded-lg bg-surface border border-border/60 hover:text-emerald-400 hover:border-emerald-400/40 transition-colors">
                03. الإنتاج و Next.js
              </a>
            </div>
          </div>

          {/* Hero Stats Card Component (Real dynamic data) */}
          <div className="w-full lg:w-[380px] shrink-0 rounded-2xl border border-border/80 bg-surface/80 p-6 backdrop-blur space-y-4 shadow-subtle">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black">
                  <Code2 className="h-4 w-4" />
                </div>
                <span className="text-xs font-black text-foreground">إحصائيات المسار الشامل</span>
              </div>
              <Badge variant="secondary" className="font-mono text-[10px] text-primary border border-primary/25">
                v2.0 Living Docs
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3.5 rounded-xl bg-card border border-border/60 space-y-1">
                <span className="text-[11px] font-sans text-foreground-muted block font-bold">مقالات التوثيق</span>
                <span className="text-2xl font-black text-foreground">{grandTotalLessons}</span>
                <span className="text-[10px] font-sans text-primary block">مقالة مرجعية كاملة</span>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-border/60 space-y-1">
                <span className="text-[11px] font-sans text-foreground-muted block font-bold">المشاريع العملية</span>
                <span className="text-2xl font-black text-cyan-400">{totalProjects}</span>
                <span className="text-[10px] font-sans text-cyan-400 block">تطبيقات تفاعلية حية</span>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-border/60 space-y-1">
                <span className="text-[11px] font-sans text-foreground-muted block font-bold">المراحل الهندسية</span>
                <span className="text-2xl font-black text-amber-400">4</span>
                <span className="text-[10px] font-sans text-amber-400 block">مراحل متدرجة</span>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-border/60 space-y-1">
                <span className="text-[11px] font-sans text-foreground-muted block font-bold">كلمات المحتوى</span>
                <span className="text-2xl font-black text-emerald-400">+1M</span>
                <span className="text-[10px] font-sans text-emerald-400 block">كلمة شرح عملي دقيق</span>
              </div>
            </div>

            {/* Technology tags */}
            <div className="pt-2 border-t border-border/60">
              <span className="text-[11px] text-foreground-muted block mb-2 font-bold">التقنيات والمواصفات المغطاة:</span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                <span className="px-2 py-0.5 rounded-md bg-card border border-border text-foreground-secondary">HTML5</span>
                <span className="px-2 py-0.5 rounded-md bg-card border border-border text-foreground-secondary">CSS3 Grid/Flex</span>
                <span className="px-2 py-0.5 rounded-md bg-card border border-primary/30 text-primary">JavaScript ES2025</span>
                <span className="px-2 py-0.5 rounded-md bg-card border border-cyan-500/30 text-cyan-400">React 19</span>
                <span className="px-2 py-0.5 rounded-md bg-card border border-border text-foreground-secondary">TypeScript</span>
                <span className="px-2 py-0.5 rounded-md bg-card border border-emerald-500/30 text-emerald-400">Next.js App Router</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Learning Progress Tracker Component */}
      <FrontendProgressOverview totalLessons={grandTotalLessons} totalProjects={totalProjects} />

      {/* 4. Visual 4-Step Roadmap Journey Timeline */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono font-black text-primary tracking-wider uppercase">
              ENGINEERING PROGRESSION TIMELINE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              مسار التدرج الهندسي من الصفر حتى الإنتاج
            </h2>
          </div>
          <Link href="/frontend/roadmap" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            <span>عرض الخريطة التفاعلية الكاملة</span>
            <ChevronLeft className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <a href="#stage-00" className="group p-4 rounded-2xl border border-amber-500/30 bg-surface/80 hover:bg-surface hover:border-amber-400 transition-all flex flex-col justify-between gap-3 shadow-subtle">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black text-amber-400">00</span>
              <Badge variant="secondary" className="text-[10px] font-bold text-amber-400 border border-amber-500/30">
                8 دروس
              </Badge>
            </div>
            <div>
              <h3 className="font-black text-sm text-foreground group-hover:text-amber-400 transition-colors">
                ما قبل الفرونت إند
              </h3>
              <p className="text-xs text-foreground-muted mt-1 line-clamp-2">
                الإنترنت، الشبكات، المتصفح، VS Code، و Git &amp; GitHub.
              </p>
            </div>
          </a>

          <a href="#stage-01" className="group p-4 rounded-2xl border border-primary/30 bg-surface/80 hover:bg-surface hover:border-primary transition-all flex flex-col justify-between gap-3 shadow-subtle">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black text-primary">01</span>
              <Badge variant="secondary" className="text-[10px] font-bold text-primary border border-primary/30">
                89 درسًا + 10 مشاريع
              </Badge>
            </div>
            <div>
              <h3 className="font-black text-sm text-foreground group-hover:text-primary transition-colors">
                ثلاثي الويب الأساسي
              </h3>
              <p className="text-xs text-foreground-muted mt-1 line-clamp-2">
                توثيق HTML5 الكامل + CSS3 النقية + JavaScript الشامل بـ 75 درسًا.
              </p>
            </div>
          </a>

          <a href="#stage-02" className="group p-4 rounded-2xl border border-cyan-500/30 bg-surface/80 hover:bg-surface hover:border-cyan-400 transition-all flex flex-col justify-between gap-3 shadow-subtle">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black text-cyan-400">02</span>
              <Badge variant="secondary" className="text-[10px] font-bold text-cyan-400 border border-cyan-500/30">
                10 فصول
              </Badge>
            </div>
            <div>
              <h3 className="font-black text-sm text-foreground group-hover:text-cyan-400 transition-colors">
                توثيق React.js المتقدم
              </h3>
              <p className="text-xs text-foreground-muted mt-1 line-clamp-2">
                Virtual DOM، الـ Hooks، Context API، TanStack Query، وأداء React 19.
              </p>
            </div>
          </a>

          <a href="#stage-03" className="group p-4 rounded-2xl border border-emerald-500/30 bg-surface/80 hover:bg-surface hover:border-emerald-400 transition-all flex flex-col justify-between gap-3 shadow-subtle">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black text-emerald-400">03</span>
              <Badge variant="secondary" className="text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                3 أدلة إنتاج
              </Badge>
            </div>
            <div>
              <h3 className="font-black text-sm text-foreground group-hover:text-emerald-400 transition-colors">
                الإنتاج و Next.js
              </h3>
              <p className="text-xs text-foreground-muted mt-1 line-clamp-2">
                TypeScript، Next.js App Router، ومعمارية الواجهات والأداء (CWV).
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* 5. STAGE 00: Pre-Frontend Foundations (Web Fundamentals + Developer Tooling) */}
      <section id="stage-00" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 text-[11px] font-mono font-bold">
              <span>00 — PRE-FRONTEND FOUNDATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              المرحلة 00: ما قبل الفرونت إند وأدوات المبرمج
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted">
              ابدأ من هنا لفهم كيف يعمل الإنترنت والشبكات والمتصفح، وتجهيز بيئة التطوير و Git قبل كتابة أول مشروع.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Track 00-A: How the Web Works */}
          <div className="rounded-3xl border border-amber-500/30 bg-card p-6 sm:p-7 shadow-card space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center shrink-0">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-amber-400 block font-mono">
                    السلسلة الأولى • 4 دروس
                  </span>
                  <h3 className="text-lg font-black text-foreground">
                    الإنترنت والشبكات (How the Web Works)
                  </h3>
                </div>
              </div>
              <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-bold">
                تأسيس إلزامي
              </Badge>
            </div>

            <div className="space-y-2.5">
              {WEB_FUNDAMENTALS_LESSONS.map(lesson => (
                <Link
                  key={lesson.href}
                  href={lesson.href}
                  className="group flex items-center justify-between gap-3 p-3.5 rounded-2xl border border-border bg-surface/70 hover:border-amber-400 hover:bg-surface transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-black text-amber-400 shrink-0">
                      {lesson.number}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-amber-400 transition-colors truncate">
                      {lesson.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[10px] text-foreground-muted hidden sm:inline">{lesson.tag}</span>
                    <ArrowLeft className="h-3.5 w-3.5 text-foreground-muted group-hover:text-amber-400 transition-transform group-hover:-translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Track 00-B: Tooling & Git */}
          <div className="rounded-3xl border border-primary/30 bg-card p-6 sm:p-7 shadow-card space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shrink-0">
                  <Terminal className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-primary block font-mono">
                    السلسلة الثانية • 4 دروس
                  </span>
                  <h3 className="text-lg font-black text-foreground">
                    بيئة التطوير و Git &amp; GitHub
                  </h3>
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary border border-primary/30 text-[11px] font-bold">
                أدوات الإنتاج
              </Badge>
            </div>

            <div className="space-y-2.5">
              {TOOLING_GIT_LESSONS.map(lesson => (
                <Link
                  key={lesson.href}
                  href={lesson.href}
                  className="group flex items-center justify-between gap-3 p-3.5 rounded-2xl border border-border bg-surface/70 hover:border-primary hover:bg-surface transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-black text-primary shrink-0">
                      {lesson.number}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {lesson.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[10px] text-foreground-muted hidden sm:inline">{lesson.tag}</span>
                    <ArrowLeft className="h-3.5 w-3.5 text-foreground-muted group-hover:text-primary transition-transform group-hover:-translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. STAGE 01: Core Web Foundations (HTML5 + CSS3 + JavaScript) */}
      <section id="stage-01" className="space-y-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/25 text-[11px] font-mono font-bold">
              <span>01 — FRONTEND DEVELOPER FOUNDATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              المرحلة 01: ثلاثي الويب الأساسي (HTML5 + CSS3 + JavaScript)
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted">
              هنا تبني الأساس الهندسي المتين: هيكلة الويب الدلالية، التصميم المتجاوب الحديث، وبرمجة التفاعل المعماري عبر JavaScript مع 10 مشاريع عملية.
            </p>
          </div>
        </div>

        {/* 6-A. HTML5 Documentation Box */}
        <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-card via-card to-orange-950/20 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-orange-500/15 text-orange-400 border border-orange-500/30 font-bold">
                  6 دروس متكاملة
                </Badge>
                <Badge variant="secondary" className="font-mono text-xs">
                  WHATWG Living Standard
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  أكثر من 30,000 كلمة موثقة
                </Badge>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                توثيق HTML5 الكامل بالعامية المصرية
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed font-medium">
                من أول تشريح الصفحة والـ DOM، للصور المتجاوبة والوسائط، والجداول والوسوم الدلالية، حتى النماذج الاحترافية وإمكانية الوصول (A11y) والـ Technical SEO.
              </p>
            </div>

            <Link href="/frontend/html" className="shrink-0">
              <Button size="lg" className="w-full lg:w-auto gap-2 font-black bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 px-6 py-3 rounded-2xl text-sm">
                <span>افتح توثيق HTML5 الكامل</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-border/60">
            {HTML_DOCS_CURRICULUM.map(ch => (
              <Link
                key={ch.slug}
                href={`/articles/${ch.slug}`}
                className="group p-4 rounded-2xl border border-border bg-surface/70 hover:border-orange-500/60 hover:bg-surface transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-orange-400">
                    الدرس {String(ch.number).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[10px] text-foreground-muted">{ch.readTimeMinutes} دقيقة</span>
                </div>
                <h4 className="font-bold text-sm text-foreground group-hover:text-orange-400 transition-colors line-clamp-2">
                  {ch.shortTitle}
                </h4>
              </Link>
            ))}
          </div>
        </div>

        {/* 6-B. CSS3 Documentation Card */}
        <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-card via-card to-blue-950/20 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-blue-500/15 text-blue-400 border border-blue-500/30 font-bold">
                  8 دروس متقدمة
                </Badge>
                <Badge variant="secondary" className="font-mono text-xs">
                  Pure Modern CSS3
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  بدون مكتبات جاهزة
                </Badge>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                توثيق CSS3 النقية الكامل بالعامية المصرية
              </h3>
              <p className="text-sm text-foreground-secondary leading-relaxed font-medium">
                احتراف تنسيق الويب من الصفر: الـ Box Model، أنظمة الألوان الحديثة و clamp، التموضع و Stacking Context، احتراف Flexbox و CSS Grid ثنائي الأبعاد، والـ Responsive Design والمتغيرات والأنيميشن.
              </p>
            </div>

            <Link href="/frontend/css" className="shrink-0">
              <Button size="lg" className="w-full lg:w-auto gap-2 font-black bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 px-6 py-3 rounded-2xl text-sm">
                <span>افتح توثيق CSS3 الكامل</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-border/60">
            {CSS_DOCS_CURRICULUM.map(ch => (
              <Link
                key={ch.slug}
                href={`/articles/${ch.slug}`}
                className="group p-3.5 rounded-2xl border border-border bg-surface/70 hover:border-blue-500/60 hover:bg-surface transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-black text-blue-400">
                    الدرس {String(ch.number).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[10px] text-foreground-muted">{ch.readTimeMinutes} دقيقة</span>
                </div>
                <h4 className="font-bold text-xs text-foreground group-hover:text-blue-400 transition-colors line-clamp-2">
                  {ch.shortTitle}
                </h4>
              </Link>
            ))}
          </div>
        </div>

        {/* 6-C. JAVASCRIPT COMPLETE DOCUMENTATION (THE FLAGSHIP TRACK) */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-primary/50 bg-gradient-to-br from-card via-surface/90 to-amber-950/20 p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary text-primary-foreground font-black text-xs px-3 py-1">
                  المسار الأكبر والأشمل
                </Badge>
                <Badge className="bg-primary/10 text-primary border border-primary/30 font-bold">
                  75 مقالة تخصصية
                </Badge>
                <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                  10 مشاريع تفاعلية
                </Badge>
                <Badge variant="secondary" className="text-xs font-mono">
                  779,644 كلمة موثقة
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  100% مكتمل ومنشور
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black shrink-0">
                  <JsSquareSvg className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                  توثيق JavaScript الكامل والمشاريع التطبيقية
                </h3>
              </div>

              <p className="text-sm text-foreground-secondary leading-relaxed font-medium">
                المرجع العربي الأضخم للغة JavaScript: 11 مرحلة متكاملة تغطي المحرك V8، الأساسيات الصارمة، المعاملات، الدوال والـ Closures، المصفوفات وتحويل البيانات، الكائنات والبرمجة الكائنية، ميكانيكا الـ Execution Context، شجرة الـ DOM والأحداث، حلقة الأحداث (Event Loop)، الوعود و Async/Await، وميزات ES6+ الحديثة وواجهات المتصفح.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link href="/frontend/javascript">
                <Button size="lg" className="w-full gap-2 font-black bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/25 px-6 py-3.5 rounded-2xl text-sm">
                  <BookOpen className="h-4 w-4" />
                  <span>تصفح فهرس الـ 75 درسًا</span>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>

              <a href="#javascript-projects">
                <Button variant="outline" size="lg" className="w-full gap-2 font-bold border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 px-6 py-3 rounded-2xl text-sm">
                  <Laptop className="h-4 w-4" />
                  <span>المشاريع العملية العشرة</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Highlight: 10 Practical Interactive Projects Spotlight */}
          <div id="javascript-projects" className="rounded-2xl border border-cyan-500/30 bg-surface/90 p-5 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-cyan-400/10 text-cyan-400 flex items-center justify-center">
                  <Laptop className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-base font-black text-foreground">
                    المشاريع العملية التفاعلية العشرة (Hands-on Interactive Projects)
                  </h4>
                  <span className="text-xs text-foreground-muted">
                    مشاريع تطبيقية مبنية كصفحات كاملة داخل الموقع مع كود مصدري نظيف وموثق
                  </span>
                </div>
              </div>
              <Badge className="bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 text-xs font-bold self-start sm:self-auto">
                10 / 10 مكتمل
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {JS_DOCS_PROJECTS.map(proj => (
                <Link
                  key={proj.number}
                  href={proj.demoUrl || '/frontend/javascript'}
                  className="group p-3.5 rounded-xl border border-border/70 bg-card/80 hover:border-cyan-400/70 hover:bg-surface transition-all flex flex-col justify-between gap-3 shadow-subtle"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-black text-cyan-400">
                        P{String(proj.number).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>جاهز للتجربة</span>
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-foreground group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {proj.arTitle}
                    </h5>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-cyan-400 font-bold pt-1 border-t border-border/40">
                    <span>تشغيل التطبيق</span>
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. STAGE 02: React.js Documentation (10 Chapters) */}
      <section id="stage-02" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 text-[11px] font-mono font-bold">
              <span>02 — REACT ENGINEER DOCUMENTATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground flex items-center gap-3">
              <ReactAtomSvg className="w-8 h-8 text-cyan-400 shrink-0" />
              <span>المرحلة 02: توثيق React.js الكامل بالعامية المصرية</span>
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted">
              منهج متكامل يغطي المفاهيم الأساسية، الـ Hooks العشرة، إدارة الحالة، والتكامل مع TanStack Query والأداء في React 19.
            </p>
          </div>

          <Link href="/frontend/react">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-cyan-400 font-bold hover:bg-cyan-500/10">
              <span>عرض الفهرس الكامل (10 فصول)</span>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-card via-card to-cyan-950/20 p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-bold">
                  10 فصول مرجعية
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
              <p className="text-sm text-foreground-secondary leading-relaxed font-medium">
                سلسلة مرجعية تغطي React من أول فكرة الـ Virtual DOM والـ JSX والـ Props، مروراً بكل الـ Hooks (`useState`, `useEffect`, `useRef`, `useReducer`, `useMemo`)، ثم Context API و Custom Hooks و Forms و Routing و TanStack Query حتى React 19 والأداء.
              </p>
            </div>

            <Link href="/frontend/react" className="shrink-0">
              <Button size="lg" className="w-full lg:w-auto gap-2 font-black bg-cyan-500 hover:bg-cyan-600 text-black shadow-lg shadow-cyan-500/20 px-6 py-3 rounded-2xl text-sm">
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
                className="group p-3.5 rounded-2xl border border-border bg-surface/70 hover:border-cyan-500/60 hover:bg-surface transition-all space-y-1.5"
              >
                <span className="font-mono text-[11px] font-black text-cyan-400 block">
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

      {/* 8. STAGE 03: TypeScript, Next.js & Production Engineering */}
      <section id="stage-03" className="space-y-6 pt-4">
        <div className="space-y-1.5 border-b border-border/80 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[11px] font-mono font-bold">
            <span>03 — NEXT.JS &amp; FRONTEND ENGINEER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">
            المرحلة 03: TypeScript، Next.js، وهندسة الإنتاج
          </h2>
          <p className="text-xs sm:text-sm text-foreground-muted">
            الخطوة النهائية للانتقال من مطوّر React تقليدي إلى Next.js Engineer و Frontend Architect قادر على قيادة وتطوير مشاريع إنتاجية ضخمة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTION_TRACKS.map(track => {
            const Icon = track.icon;
            return (
              <Link
                key={track.href}
                href={track.href}
                className="group p-6 sm:p-7 rounded-3xl border border-border bg-card hover:border-emerald-500/60 transition-all shadow-card flex flex-col justify-between gap-5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="text-[11px] font-bold">
                      {track.badge}
                    </Badge>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-emerald-400 block font-bold mb-1">{track.tag}</span>
                    <h3 className="text-lg font-black text-foreground group-hover:text-emerald-400 transition-colors">
                      {track.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed font-medium">
                    {track.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400 pt-3 border-t border-border/50">
                  <span>قراءة الدليل الهندسي</span>
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 9. Study Methodology & Advice ("إزاي تذاكر قسم الفرونت إند صح؟") */}
      <section className="rounded-3xl border border-border/80 bg-surface/80 p-6 sm:p-10 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-black text-primary uppercase">
            BEST PRACTICES &amp; STUDY METHODOLOGY
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            إزاي تذاكر قسم الفرونت إند وتستفيد أقصى استفادة؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl border border-border/60 bg-card space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="h-7 w-7 rounded-lg bg-primary/10 text-primary font-mono text-xs font-black flex items-center justify-center">
                01
              </span>
              <h3 className="font-bold text-sm text-foreground">الالتزام بالترتيب التسلسلي</h3>
            </div>
            <p className="text-xs text-foreground-secondary leading-relaxed font-medium">
              ابدأ دائمًا من المرحلة 00 (الشبكات و Git) ثم توثيق HTML5 و CSS3 و JavaScript قبل القفز لأي Framework؛ الأساس المتين يختصر عليك 80% من وقت التعلم لاحقًا.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border/60 bg-card space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="h-7 w-7 rounded-lg bg-cyan-400/10 text-cyan-400 font-mono text-xs font-black flex items-center justify-center">
                02
              </span>
              <h3 className="font-bold text-sm text-foreground">التطبيق العملي وكتابة الكود</h3>
            </div>
            <p className="text-xs text-foreground-secondary leading-relaxed font-medium">
              لا تكتفِ بالقراءة النظرية؛ افتح محرر الأكواد وطبّق كل مثال ومارس حل التمارين وأسئلة المقابلات الموجودة في نهاية كل مقالة، ونفّذ المشاريع العشرة بيدك.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border/60 bg-card space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="h-7 w-7 rounded-lg bg-emerald-400/10 text-emerald-400 font-mono text-xs font-black flex items-center justify-center">
                03
              </span>
              <h3 className="font-bold text-sm text-foreground">متابعة خريطة الطريق والإنتاج</h3>
            </div>
            <p className="text-xs text-foreground-secondary leading-relaxed font-medium">
              استعن بخريطة الطريق الشجرية في <code className="font-mono text-primary font-bold">/frontend/roadmap</code> لمراقبة تقدمك والتحضير لمشاريع التخرج ومتطلبات التوظيف الحقيقية.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
