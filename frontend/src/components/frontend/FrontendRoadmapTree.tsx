import React from 'react';
import Link from 'next/link';
import {
  Globe,
  Terminal,
  Code2,
  Layers,
  Cpu,
  Rocket,
  Gauge,
  CheckCircle2,
  ArrowLeft,
  GitBranch,
  ShieldCheck,
  Briefcase,
  BookOpen,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface RoadmapBranch {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  learnItems: string[];
  links: Array<{ label: string; href: string }>;
}

interface RoadmapMilestone {
  step: string;
  role: string;
  title: string;
  duration: string;
  description: string;
  accentClass: string;
  badgeClass: string;
  branches: RoadmapBranch[];
}

const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    step: '00',
    role: 'Pre-Frontend Foundations',
    title: 'ما قبل الفرونت إند: كيف يعمل الويب وأدوات المطور',
    duration: 'أسبوعان',
    description:
      'قبل ما تكتب أول سطر HTML أو React، لازم تفهم المتصفح والإنترنت بيشتغلوا إزاي، وتجهز أدوات شغلك صح.',
    accentClass: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    branches: [
      {
        id: 'web-internet',
        title: 'الإنترنت والشبكات (How the Web Works)',
        subtitle: 'فهم الطلب والاستجابة',
        tag: 'أساسي',
        icon: Globe,
        learnItems: [
          'كيف يعمل الـ DNS، الـ IP، والـ Domain Name',
          'بروتوكول HTTP / HTTPS ورموز الحالة (200, 401, 404, 500)',
          'كيف يقوم المتصفح برسم الصفحة (HTML Parsing, DOM, CSSOM)',
          'مفهوم الـ Client vs Server والـ APIs',
        ],
        links: [
          { label: '1. DNS و IP و Domain', href: '/articles/web-docs-01-how-internet-dns-ip-domain-works' },
          { label: '2. HTTP/HTTPS و Status Codes', href: '/articles/web-docs-02-http-https-tls-status-codes' },
          { label: '3. DOM و CSSOM ورسم الصفحة', href: '/articles/web-docs-03-browser-rendering-dom-cssom-critical-path' },
          { label: '4. Client vs Server و APIs', href: '/articles/web-docs-04-client-vs-server-and-apis-architecture' },
        ],
      },
      {
        id: 'tooling-git',
        title: 'بيئة التطوير و Git & GitHub',
        subtitle: 'أدواتك اليومية كمبرمج',
        tag: 'إلزامي',
        icon: GitBranch,
        learnItems: [
          'إعداد VS Code وأهم الإضافات والاختصارات',
          'استخدام الـ Terminal / Command Line للتنقل وإدارة الملفات',
          'أساسيات Git: init, add, commit, branch, merge, pull request',
          'رفع مشاريعك على GitHub وكتابة README احترافية',
        ],
        links: [
          { label: '1. إعداد VS Code باحتراف', href: '/articles/tooling-docs-01-vscode-setup-extensions-shortcuts' },
          { label: '2. احتراف الـ Terminal و CLI', href: '/articles/tooling-docs-02-terminal-cli-essentials' },
          { label: '3. توثيق Git الكامل', href: '/articles/tooling-docs-03-git-fundamentals-branching-merging' },
          { label: '4. GitHub و PRs و README', href: '/articles/tooling-docs-04-github-pull-requests-readme' },
        ],
      },
    ],
  },
  {
    step: '01',
    role: 'Frontend Developer',
    title: 'المرحلة الأولى: مثلث الويب الأساسي (HTML + CSS + JS)',
    duration: '6 – 8 أسابيع',
    description:
      'هنا بتبني الأساس الحقيقي لأي Frontend Developer. اتقانك لـ JavaScript النقية هو اللي هيخلي React سهلة جداً معاك.',
    accentClass: 'border-primary/40 bg-primary/10 text-primary',
    badgeClass: 'bg-primary/15 text-primary border-primary/30',
    branches: [
      {
        id: 'html-css',
        title: 'HTML5 الدلالي و CSS3 و Tailwind',
        subtitle: 'الهيكل والتصميم المتجاوب',
        tag: 'الواجهة والشكل',
        icon: Layers,
        learnItems: [
          'Semantic HTML (header, nav, main, article, section) + SEO + A11y',
          'CSS Box Model، Flexbox، و CSS Grid لبناء أي Layout معقد',
          'Responsive Design و Media Queries للموبايل والتابلت',
          'Tailwind CSS لبناء تصاميم عصرية وسريعة بنظام Design Tokens',
        ],
        links: [
          { label: 'توثيق HTML5 الكامل (6 دروس)', href: '/frontend/html' },
          { label: 'توثيق CSS3 الكامل (8 دروس)', href: '/frontend/css' },
          { label: 'احتراف Tailwind CSS', href: '/articles/modern-css-mastery-tailwind-design-systems-responsive-ui' },
        ],
      },
      {
        id: 'javascript-core',
        title: 'JavaScript الحديثة (ES6+ و Async)',
        subtitle: 'عقل الصفحة والتفاعل',
        tag: 'أهم خطوة',
        icon: Terminal,
        learnItems: [
          'Closures، Scope، Hoisting، و `this` و Array Methods (map, filter, reduce)',
          'DOM Manipulation و Event Bubbling / Delegation',
          'البرمجة غير المتزامنة: Promises، `async/await`، و Event Loop',
          'التعامل مع Fetch API و JSON واكتشاف الأخطاء (Debugging)',
        ],
        links: [
          { label: 'JavaScript الحديثة ES6+', href: '/articles/modern-javascript-comprehensive-guide-es6-async' },
          { label: 'اكتشاف وإصلاح أخطاء JS', href: '/articles/javascript-debugging-errors-guide' },
        ],
      },
    ],
  },
  {
    step: '02',
    role: 'React Engineer',
    title: 'المرحلة الثانية: TypeScript وتوثيق React.js الكامل',
    duration: '6 – 8 أسابيع',
    description:
      'الانتقال من صفحات تقليدية لتطبيقات SPA احترافية. ادمج TypeScript مع منهج React الكامل (10 فصول بالبلدي) عشان تبني تطبيقات حقيقية.',
    accentClass: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
    badgeClass: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    branches: [
      {
        id: 'typescript-lang',
        title: 'TypeScript للمشاريع الاحترافية',
        subtitle: 'حماية الكود قبل التشغيل',
        tag: 'مطلوب في السوق',
        icon: Cpu,
        learnItems: [
          'الأنواع الأساسية، Interfaces vs Types، و Union / Literal Types',
          'استخدام Generics و Utility Types (Partial, Pick, Omit)',
          'تحديد أنواع الـ Props والـ State والـ Events داخل React',
        ],
        links: [
          { label: 'دليل TypeScript الشامل', href: '/articles/comprehensive-typescript-guide-types-generics-patterns' },
        ],
      },
      {
        id: 'react-core-hooks',
        title: 'توثيق React.js (الفصول 1 إلى 7): الأساس والـ Hooks',
        subtitle: 'لبّ React من الصفر',
        tag: 'منهج React',
        icon: Code2,
        learnItems: [
          'الفصل 1–2: Virtual DOM، Fiber، قواعد JSX، Props، و Composition',
          'الفصل 3–4: State، Immutability، Re-rendering، Events، و Lists/Keys',
          'الفصل 5–6: `useEffect`، Cleanup، `AbortController`، `useRef`، `useReducer`، `useMemo`',
          'الفصل 7: بناء Custom Hooks وإدارة الحالة بـ Context API',
        ],
        links: [
          { label: 'فهرس توثيق React (10 فصول)', href: '/frontend/react' },
          { label: 'ابدأ الفصل 1', href: '/articles/react-docs-01-intro-components-virtual-dom' },
          { label: 'الفصل 5: useEffect', href: '/articles/react-docs-05-useeffect-lifecycle-data-fetching' },
        ],
      },
      {
        id: 'react-ecosystem',
        title: 'توثيق React.js (الفصول 8 إلى 10): منظومة الإنتاج',
        subtitle: 'النماذج، التوجيه، والبيانات',
        tag: 'منهج React',
        icon: BookOpen,
        learnItems: [
          'الفصل 8: بناء النماذج بـ React Hook Form والتحقق بـ Zod',
          'الفصل 9: التوجيه بـ React Router وإدارة بيانات السيرفر بـ TanStack Query',
          'الفصل 10: تحسين الأداء بـ Profiler، Code Splitting، Error Boundaries، و React 19',
        ],
        links: [
          { label: 'الفصل 8: Forms & Zod', href: '/articles/react-docs-08-forms-validation-rhf-zod' },
          { label: 'الفصل 9: Router & Query', href: '/articles/react-docs-09-routing-and-tanstack-query' },
          { label: 'الفصل 10: React 19 & Perf', href: '/articles/react-docs-10-performance-architecture-react-19' },
        ],
      },
    ],
  },
  {
    step: '03',
    role: 'Next.js Engineer',
    title: 'المرحلة الثالثة: Next.js وبناء تطبيقات Full-Stack جاهزة للـ SEO',
    duration: '4 – 6 أسابيع',
    description:
      'أغلب شركات مصر والخليج بتطلب Next.js مع React عشان الأداء الفائق وظهور الموقع في محركات البحث.',
    accentClass: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    branches: [
      {
        id: 'nextjs-app-router',
        title: 'Next.js App Router و أنماط الرندر',
        subtitle: 'SSR / SSG / ISR / RSC',
        tag: 'أساسي في Next',
        icon: Rocket,
        learnItems: [
          'الفرق بين Server Components و Client Components وإمتى تستخدم كل نوع',
          'Static Generation (SSG)، Server-Side Rendering (SSR)، و ISR',
          'Server Actions، Route Handlers، و Dynamic Metadata + Sitemap للـ SEO',
        ],
        links: [
          { label: 'دليل Next.js App Router للإنتاج', href: '/articles/nextjs-app-router-engineering-guide-production-performance' },
        ],
      },
      {
        id: 'auth-deploy',
        title: 'التوثيق الآمن والنشر السحابي',
        subtitle: 'Authentication & Deployment',
        tag: 'إنتاج',
        icon: ShieldCheck,
        learnItems: [
          'إدارة الجلسات الآمنة باستخدام JWT و HttpOnly Cookies',
          'حماية المسارات (Middleware & Protected Routes)',
          'نشر المشاريع على Vercel وضبط متغيرات البيئة (Environment Variables)',
        ],
        links: [
          { label: 'JWT: Cookies أم LocalStorage', href: '/articles/jwt-storage-localstorage-vs-httponly-cookies' },
          { label: 'دليل النشر المجاني على السيرفرات', href: '/articles/web-deployment-free-guide' },
        ],
      },
    ],
  },
  {
    step: '04',
    role: 'Frontend Engineer',
    title: 'المرحلة الرابعة: مستوى مهندس البرمجيات (Architecture & Career)',
    duration: 'مستمر',
    description:
      'المرحلة اللي بتفرق بين شخص بيكتب كود شغال ومهندس واجهات محترف تقدر تعتمد عليه الشركات الكبرى في مشاريع ضخمة.',
    accentClass: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
    badgeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    branches: [
      {
        id: 'arch-perf-sec',
        title: 'المعمارية، الاختبارات، الأداء، والأمان',
        subtitle: 'معايير الشركات الكبرى',
        tag: 'Senior Level',
        icon: Gauge,
        learnItems: [
          'تنظيم المشاريع الكبيرة بمعمارية Feature-Based و Clean Code / SOLID',
          'اختبار الكود: Unit, Integration, E2E Testing (Vitest & Playwright)',
          'تحسين Core Web Vitals (LCP, CLS, INP) وحجم الـ Bundle',
          'حماية الواجهات من XSS و CSRF و ثغرات OWASP Top 10',
        ],
        links: [
          { label: 'معمارية الفرونت إند الحديثة', href: '/articles/modern-frontend-architecture-state-management-component-design' },
          { label: 'دليل الاختبارات الشامل', href: '/articles/complete-software-testing-guide-unit-integration-e2e' },
          { label: 'تحسين الأداء CWV', href: '/articles/web-performance-core-web-vitals-speed-optimization' },
          { label: 'أمان الويب OWASP', href: '/articles/web-security-developer-guide-owasp-top-10' },
        ],
      },
      {
        id: 'career-interviews',
        title: 'الـ Portfolio ومقابلات العمل في مصر والخليج',
        subtitle: 'من التعلم لأول وظيفة',
        tag: 'سوق العمل',
        icon: Briefcase,
        learnItems: [
          'بناء 2–3 مشاريع حقيقية منشورة Online بدل مشاريع الـ To-Do المكررة',
          'توظيف أدوات الذكاء الاصطناعي (Cursor / Claude Code) بدون فقدان مستواك',
          'مراجعة أسئلة الانترفيو الفنية في JavaScript و React و Next.js و Security',
        ],
        links: [
          { label: 'بناء أول مشروع للـ Portfolio', href: '/articles/build-first-programming-project-portfolio' },
          { label: 'Vibe Coding باحتراف', href: '/articles/vibe-coding-cursor-claude-code-guide' },
          { label: 'أسئلة انترفيو مصر والخليج 2027', href: '/articles/programming-interview-questions-egypt-gulf-2027' },
        ],
      },
    ],
  },
];

export function FrontendRoadmapTree() {
  return (
    <section id="roadmap" className="space-y-10" dir="rtl">
      {/* Section Header */}
      <div className="space-y-3 border-b border-border pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-bold">
          <GitBranch className="h-3.5 w-3.5" />
          <span>مسار تفاعلي متدرج من الصفر للاحتراف</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-foreground">
          خارطة الطريق الكاملة: من ما قبل الفرونت إند إلى Frontend Engineer
        </h2>
        <p className="text-xs sm:text-sm text-foreground-muted max-w-3xl leading-relaxed">
          امشي مع الطريق الرئيسي من الأعلى للأسفل، وفي كل محطة هتلاقي الفروع المطلوب تتعلمها
          بالترتيب مع روابط مباشرة للشروحات العملية داخل المنصة.
        </p>

        {/* Quick Path Pill Summary */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/25 font-bold">
            00 Pre-Frontend
          </span>
          <ArrowLeft className="h-3.5 w-3.5 text-foreground-muted" />
          <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/25 font-bold">
            01 Frontend Developer
          </span>
          <ArrowLeft className="h-3.5 w-3.5 text-foreground-muted" />
          <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 font-bold">
            02 React Engineer
          </span>
          <ArrowLeft className="h-3.5 w-3.5 text-foreground-muted" />
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-bold">
            03 Next.js Engineer
          </span>
          <ArrowLeft className="h-3.5 w-3.5 text-foreground-muted" />
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/25 font-bold">
            04 Frontend Engineer
          </span>
        </div>
      </div>

      {/* Vertical Spine + Branching Tree */}
      <div className="relative pr-6 sm:pr-0">
        {/* Spine Line (Right side on mobile, Center on desktop) */}
        <div
          aria-hidden="true"
          className="absolute top-6 bottom-6 right-3 sm:right-1/2 sm:translate-x-1/2 w-0.5 bg-gradient-to-b from-amber-500/60 via-cyan-500/60 to-purple-500/60"
        />

        <div className="space-y-12">
          {ROADMAP_MILESTONES.map((milestone, mIndex) => (
            <div key={milestone.step} className="relative space-y-6">
              {/* Central Milestone Node on the Spine */}
              <div className="relative flex flex-col sm:items-center">
                {/* Circle Node */}
                <div
                  className={`absolute -right-6 sm:static h-8 w-8 sm:h-12 sm:w-12 rounded-2xl border-2 ${milestone.accentClass} font-mono font-black text-xs sm:text-base flex items-center justify-center shadow-lg z-10 bg-background`}
                >
                  {milestone.step}
                </div>

                {/* Milestone Banner Card */}
                <div className="sm:mt-4 w-full max-w-3xl rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card sm:text-center space-y-2 relative z-10">
                  <div className="flex flex-wrap items-center sm:justify-center gap-2">
                    <Badge className={`border font-mono text-[11px] font-bold ${milestone.badgeClass}`}>
                      {milestone.role}
                    </Badge>
                    <Badge variant="secondary" className="text-[11px] font-bold">
                      المدة التقريبية: {milestone.duration}
                    </Badge>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Branches Grid under Milestone */}
              <div
                className={`grid grid-cols-1 ${
                  milestone.branches.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
                } gap-5 relative z-10`}
              >
                {milestone.branches.map(branch => {
                  const Icon = branch.icon;
                  return (
                    <div
                      key={branch.id}
                      className="rounded-2xl border border-border bg-surface/80 backdrop-blur-sm p-5 sm:p-6 shadow-card flex flex-col justify-between gap-5 hover:border-primary/40 transition-all"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${milestone.accentClass}`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="text-[11px] text-foreground-muted block">
                                {branch.subtitle}
                              </span>
                              <h4 className="text-sm sm:text-base font-extrabold text-foreground">
                                {branch.title}
                              </h4>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-[10px] font-bold shrink-0">
                            {branch.tag}
                          </Badge>
                        </div>

                        <div className="space-y-2 pt-1">
                          <span className="text-[11px] font-bold text-foreground-muted block">
                            المفروض تتعلم إيه هنا:
                          </span>
                          <ul className="space-y-2">
                            {branch.learnItems.map(item => (
                              <li
                                key={item}
                                className="flex items-start gap-2 text-xs text-foreground-secondary leading-relaxed"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border/60 flex flex-wrap gap-2">
                        {branch.links.map(link => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-background hover:bg-primary/10 border border-border hover:border-primary/40 text-[11px] font-bold text-foreground hover:text-primary transition-colors"
                          >
                            <span>{link.label}</span>
                            <ArrowLeft className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Connector arrow between milestones */}
              {mIndex < ROADMAP_MILESTONES.length - 1 && (
                <div className="hidden sm:flex justify-center pt-1">
                  <div className="px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono text-foreground-muted">
                    الخطوة التالية في المسار
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
