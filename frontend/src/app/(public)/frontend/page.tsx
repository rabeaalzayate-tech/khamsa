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
  Sparkles,
  Compass,
  Rocket,
  Gauge,
} from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getSiteUrl } from '@/lib/seo/site-url';
import { REACT_DOCS_CURRICULUM } from '@/data/react-docs-curriculum';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'قسم الفرونت إند (Frontend Engineering)',
  description:
    'الدليل الشامل لتعلم تطوير واجهات المستخدم (Frontend) بالعربي: HTML، CSS، JavaScript، TypeScript، وتوثيق React.js الكامل بالعامية المصرية.',
  alternates: {
    canonical: `${siteUrl}/frontend`,
  },
};

function ReactAtomSvg({ className = 'w-8 h-8' }: { className?: string }) {
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

const FRONTEND_ROADMAP_STAGES = [
  {
    step: '01',
    role: 'Frontend Developer',
    arabicTitle: 'المرحلة الأولى: مطوّر واجهات (التأسيس الصلب)',
    duration: '6 – 8 أسابيع',
    summary:
      'المرحلة دي بتبني فيها عضلات الويب الأساسية قبل ما تلمس أي Framework. أي اختصار هنا هيتعبك قدام في React و Next.js.',
    skills: [
      'Semantic HTML5، النماذج (Forms)، وأساسيات SEO و Accessibility',
      'CSS3 الحديثة: Flexbox و CSS Grid والتصميم المتجاوب لكل الشاشات',
      'Tailwind CSS لبناء واجهات احترافية بسرعة ونظام ألوان موحد',
      'JavaScript (ES6+): DOM، Events، Fetch API، Promises، و Event Loop',
      'Git & GitHub لإدارة الكود ورفع المشاريع الاحترافية',
    ],
    links: [
      { label: 'دليل HTML للمبتدئين', href: '/articles/html-tutorial-for-beginners' },
      { label: 'دليل CSS للمبتدئين', href: '/articles/css-tutorial-for-beginners' },
      { label: 'JavaScript الحديثة ES6+', href: '/articles/modern-javascript-comprehensive-guide-es6-async' },
      { label: 'دليل Git و GitHub العملي', href: '/articles/git-github-practical-guide' },
    ],
    icon: Terminal,
  },
  {
    step: '02',
    role: 'React Engineer',
    arabicTitle: 'المرحلة الثانية: مهندس React.js',
    duration: '6 – 8 أسابيع',
    summary:
      'هنا بتتحول من مجرد كتابة صفحات ثابتة لبناء تطبيقات ويب تفاعلية كاملة باستخدام React.js و TypeScript وإدارة البيانات.',
    skills: [
      'TypeScript: Interfaces، Union Types، Generics، وكتابة Components بدون أخطاء',
      'توثيق React.js الكامل (10 فصول): JSX، Props، State، Hooks، و Lifecycle',
      'إدارة الحالة العامة بـ Context API و Zustand، والنماذج بـ React Hook Form + Zod',
      'التوجيه بـ React Router وإدارة بيانات السيرفر بـ TanStack Query',
      'كتابة اختبارات للمكونات بـ Vitest و React Testing Library',
    ],
    links: [
      { label: 'توثيق React.js الكامل (10 فصول)', href: '/frontend/react' },
      { label: 'دليل TypeScript الشامل', href: '/articles/comprehensive-typescript-guide-types-generics-patterns' },
      { label: 'دليل الاختبارات (Testing)', href: '/articles/complete-software-testing-guide-unit-integration-e2e' },
    ],
    icon: Code2,
  },
  {
    step: '03',
    role: 'Next.js Engineer',
    arabicTitle: 'المرحلة الثالثة: مهندس Next.js والإنتاج',
    duration: '4 – 6 أسابيع',
    summary:
      'المعيار الأساسي لشركات مصر والخليج حالياً. بتتعلم إزاي تبني تطبيقات سريعة متوافقة مع محركات البحث (SEO) وجاهزة للإنتاج.',
    skills: [
      'App Router: الفرق الحقيقي بين Server Components و Client Components',
      'أنماط الرندر: SSR و SSG و ISR و Streaming لتسريع الموقع',
      'Server Actions و Route Handlers وربط قواعد البيانات (Prisma / API)',
      'التحقق والحماية (JWT و HttpOnly Cookies) و Dynamic Metadata & Sitemap',
      'نشر المشاريع على Vercel وضبط متغيرات البيئة',
    ],
    links: [
      { label: 'دليل Next.js App Router للإنتاج', href: '/articles/nextjs-app-router-engineering-guide-production-performance' },
      { label: 'تخزين JWT: Cookies أم LocalStorage', href: '/articles/jwt-storage-localstorage-vs-httponly-cookies' },
      { label: 'نشر المواقع مجاناً خطوة بخطوة', href: '/articles/web-deployment-free-guide' },
    ],
    icon: Rocket,
  },
  {
    step: '04',
    role: 'Frontend Engineer',
    arabicTitle: 'المرحلة الرابعة: مهندس برمجيات واجهات (Senior Mindset)',
    duration: 'مستمر مع المشاريع',
    summary:
      'الفرق بين المبرمج العادي والـ Frontend Engineer هو القدرة على تصميم معمارية نظيفة، قياس الأداء، وتأمين التطبيق على مستوى الشركات.',
    skills: [
      'المعمارية النظيفة: Feature-Based Structure و Design Systems و Clean Code',
      'تحسين الأداء و Core Web Vitals (LCP، CLS، INP، Code Splitting، Profiler)',
      'أمان الواجهات الأمامية: الحماية من XSS و CSRF و CSP و OWASP Top 10',
      'CI/CD، Docker، ومراجعة الكود باحترافية (مع توظيف أدوات AI بذكاء)',
      'التحضير لمقابلات العمل في مصر والخليج وبناء Portfolio عملي قوي',
    ],
    links: [
      { label: 'معمارية الفرونت إند الحديثة', href: '/articles/modern-frontend-architecture-state-management-component-design' },
      { label: 'تحسين الأداء و Core Web Vitals', href: '/articles/web-performance-core-web-vitals-speed-optimization' },
      { label: 'أمان الويب OWASP Top 10', href: '/articles/web-security-developer-guide-owasp-top-10' },
      { label: 'أسئلة انترفيو مصر والخليج 2027', href: '/articles/programming-interview-questions-egypt-gulf-2027' },
    ],
    icon: Gauge,
  },
];

const FRONTEND_TRACKS = [
  {
    title: 'أساسيات HTML5 وبناء الهيكل',
    description: 'الوسوم الأساسية والمتقدمة، Semantic HTML، والنماذج وإمكانية الوصول.',
    href: '/articles/html-tutorial-for-beginners',
    badge: 'التأسيس',
    icon: Terminal,
  },
  {
    title: 'CSS الحديثة و Tailwind CSS',
    description: 'Flexbox و Grid والتصميم المتجاوب وبناء أنظمة تصميم سريعة وعملية.',
    href: '/articles/css-tutorial-for-beginners',
    badge: 'التنسيق',
    icon: Layers,
  },
  {
    title: 'JavaScript الحديثة (ES6+ و Async)',
    description: 'الـ Event Loop، الـ Closures، الـ Promises، والتعامل مع الـ DOM والـ APIs.',
    href: '/articles/modern-javascript-comprehensive-guide-es6-async',
    badge: 'الأساس البرمجي',
    icon: Code2,
  },
  {
    title: 'TypeScript للمشاريع الحقيقية',
    description: 'أنواع البيانات، Interfaces، Generics، وحماية كود React من أخطاء Runtime.',
    href: '/articles/comprehensive-typescript-guide-types-generics-patterns',
    badge: 'الاحتراف',
    icon: Cpu,
  },
];

export default function FrontendHubPage() {
  return (
    <div className="space-y-14" dir="rtl">
      <ArticleBreadcrumb items={[{ label: 'قسم الفرونت إند' }]} />

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-card">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
            <Code2 className="h-3.5 w-3.5" />
            <span>قسم الفرونت إند (Frontend Engineering)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
            تعلّم تطوير الواجهات الأمامية من الصفر حتى الاحتراف
          </h1>

          <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
            هنا هتلاقي مسار متكامل ومنظم لكل تقنيات الـ Frontend بالعامية المصرية وبأسلوب عملي:
            بداية من HTML و CSS و JavaScript، مروراً بـ TypeScript، وصولاً لتوثيق{' '}
            <strong className="text-foreground">React.js الكامل</strong> المكون من 10 فصول عميقة.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/frontend/react">
              <Button className="gap-2 font-bold shadow-lg shadow-primary/20">
                <ReactAtomSvg className="w-4 h-4 text-primary-foreground" />
                <span>ادخل قسم توثيق React.js الكامل</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/articles?category=Frontend">
              <Button variant="outline" className="gap-2 font-bold">
                <BookOpen className="h-4 w-4" />
                <span>كل مقالات الفرونت إند</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sub-Section: React.js Documentation */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-primary">
              <Sparkles className="h-4 w-4" />
              <span>القسم الرئيسي داخل الفرونت إند</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground flex items-center gap-2.5">
              <ReactAtomSvg className="w-7 h-7 text-cyan-400 shrink-0" />
              <span>قسم React.js — التوثيق الكامل بالعامية المصرية</span>
            </h2>
          </div>

          <Link href="/frontend/react">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-primary font-bold">
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
                  أكثر من 50,000 كلمة شرح عملي
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

          {/* Preview of Chapters 1-6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-border/60">
            {REACT_DOCS_CURRICULUM.slice(0, 6).map(ch => (
              <Link
                key={ch.slug}
                href={`/articles/${ch.slug}`}
                className="group p-4 rounded-2xl border border-border bg-background/60 hover:border-primary/50 hover:bg-surface-hover/50 transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-primary">
                    الفصل {String(ch.number).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] text-foreground-muted">
                    {ch.readTimeMinutes} دقيقة قراءة
                  </span>
                </div>
                <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {ch.shortTitle}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Career Roadmap Section: Frontend Developer -> React -> Next.js -> Frontend Engineer */}
      <section id="roadmap" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-primary">
              <Compass className="h-4 w-4" />
              <span>خارطة الطريق الكاملة لسوق العمل</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              خريطة طريق الفرونت إند (من المبتدئ لمهندس واجهات)
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted">
              4 مراحل واضحة ومرتبة تحوّلك من Frontend Developer إلى React Engineer ثم Next.js Engineer وصولاً لمستوى Frontend Engineer
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FRONTEND_ROADMAP_STAGES.map(stage => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-card flex flex-col justify-between gap-6 hover:border-primary/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider block">
                          {stage.step} — {stage.role}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-foreground">
                          {stage.arabicTitle}
                        </h3>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[11px] font-bold shrink-0">
                      {stage.duration}
                    </Badge>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                    {stage.summary}
                  </p>

                  <ul className="space-y-2 pt-1">
                    {stage.skills.map(skill => (
                      <li
                        key={skill}
                        className="flex items-start gap-2 text-xs text-foreground-secondary leading-relaxed"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border/70 space-y-2">
                  <span className="text-[11px] font-bold text-foreground-muted block">
                    مصادر المذاكرة في المنصة:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {stage.links.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface hover:bg-primary/10 border border-border hover:border-primary/40 text-xs font-bold text-foreground hover:text-primary transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowLeft className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Supporting Frontend Tracks */}
      <section className="space-y-6">
        <div className="space-y-1 border-b border-border pb-4">
          <h2 className="text-2xl font-black text-foreground">
            مسارات التأسيس قبل وبعد React
          </h2>
          <p className="text-xs sm:text-sm text-foreground-muted">
            مقالات مرجعية داخل المنصة لبناء أساس قوي في تطوير الواجهات الأمامية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FRONTEND_TRACKS.map(track => {
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

      {/* Why Learn Frontend Here */}
      <section className="rounded-3xl border border-border bg-surface/60 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-black text-foreground">
          إزاي تذاكر قسم الفرونت إند صح؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-foreground-secondary">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>ابدأ بتأسيس HTML و CSS و Modern JavaScript عشان تفهم اللي بيحصل تحت الغطاء.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>امشي في فصول توثيق React العشرة بالترتيب وجرّب كل مثال كود بإيدك في المحرر.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>بعد الفصل العاشر، انتقل لـ TypeScript و Next.js لبناء مشاريع كاملة لسوق العمل.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
