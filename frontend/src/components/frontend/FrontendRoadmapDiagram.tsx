'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info,
  Maximize2,
  Minimize2,
  BookOpen,
  ArrowDown,
  Layers,
  Code2,
  Globe,
  Terminal,
  Cpu,
  Rocket,
  ShieldCheck,
  Search,
  Workflow,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export type NodeType = 'core' | 'recommended' | 'alternative' | 'optional';

export interface DiagramTopicItem {
  name: string;
  nameAr?: string;
  type?: NodeType;
  details?: string;
  link?: string;
  subItems?: string[];
}

export interface DiagramGroup {
  id: string;
  title: string;
  titleAr: string;
  order: string;
  color: string; // e.g., 'amber', 'teal', 'yellow', 'cyan', 'emerald', 'purple'
  summary: string;
  topics: {
    id?: string;
    title: string;
    description?: string;
    items: DiagramTopicItem[];
  }[];
  sideNotes?: string[];
}

export const DIAGRAM_STAGES: DiagramGroup[] = [
  {
    id: 'stage-internet',
    title: 'Internet & Web Foundations',
    titleAr: 'كيف يعمل الإنترنت والويب',
    order: '01',
    color: 'amber',
    summary: 'قبل كتابة أي كود: فهم الشبكات، مسار البيانات، والبروتوكولات والمتصفح',
    topics: [
      {
        title: 'بنية الإنترنت (How the Internet Works)',
        description: 'المسار الدقيق لنقل حزم البيانات حول العالم',
        items: [
          { name: 'How does the internet work?', nameAr: 'كيف يعمل الإنترنت فعلياً؟', type: 'core', details: 'الكابلات البحرية، الـ Routers، وحزم البيانات TCP/IP' },
          { name: 'What is HTTP / HTTPS?', nameAr: 'ما هو بروتوكول HTTP وتشفير TLS؟', type: 'core', details: 'إصدارات HTTP/1.1 و HTTP/2 و HTTP/3 وأكواد الحالة Status Codes' },
          { name: 'What is a Domain Name?', nameAr: 'ما هو اسم النطاق (Domain)؟', type: 'core', details: 'النطاقات، TLDs، وعلاقتها بالـ IP' },
          { name: 'What is Hosting?', nameAr: 'ما هي الاستضافة السحابية؟', type: 'core', details: 'الفرق بين Shared و VPS و Cloud و Serverless' },
          { name: 'DNS and how it works?', nameAr: 'كيف تعمل خوادم الـ DNS؟', type: 'core', details: 'رحلة ترجمة الاسم إلى IP عبر Root و TLD و Authoritative servers' },
          { name: 'Browsers and how they work?', nameAr: 'كيف ترسم المتصفحات الصفحات؟', type: 'core', details: 'محركات Blink و WebKit، ومراحل الـ Critical Rendering Path (DOM, CSSOM, Render Tree, Layout, Paint)' },
        ],
      },
    ],
    sideNotes: [
      'هذه المحطة تمنحك الأفضلية في المقابلات التقنية لفهم ما يحدث خلف الشاشة وليس فقط كتابة كود ظاهري.',
    ],
  },
  {
    id: 'stage-html',
    title: 'HTML (HyperText Markup Language)',
    titleAr: 'هيكلة الويب والمعايير الدلالية',
    order: '02',
    color: 'teal',
    summary: 'العظام والهيكل الأساسي لصفحات وتطبيقات الويب وفق معايير W3C',
    topics: [
      {
        title: 'أساسيات ودلالات HTML5',
        description: 'بناء مستندات منظمة وسهلة الفهرسة والوصول',
        items: [
          { name: 'Learn the Basics', nameAr: 'الوسوم وبنية المستند الأساسية', type: 'core', subItems: ['!DOCTYPE', 'html', 'head', 'body', 'meta', 'headings h1-h6', 'paragraphs', 'links & anchors'] },
          { name: 'Writing Semantic HTML', nameAr: 'كتابة HTML الدلالية', type: 'recommended', subItems: ['header', 'nav', 'main', 'article', 'section', 'aside', 'footer'] },
          { name: 'Forms and Validations', nameAr: 'النماذج والتحقق من المدخلات', type: 'recommended', subItems: ['input types', 'label linking', 'textarea & select', 'native form validation', 'file upload'] },
          { name: 'Accessibility (a11y)', nameAr: 'إمكانية الوصول وقارئات الشاشة', type: 'recommended', subItems: ['ARIA roles & attributes', 'keyboard navigation', 'focus states', 'alt text rules'] },
          { name: 'SEO Basics', nameAr: 'أساسيات تهيئة محركات البحث', type: 'recommended', subItems: ['Meta title & description', 'Open Graph (og:tags)', 'Canonical URLs', 'Twitter Cards'] },
          { name: 'Embedding Media', nameAr: 'تضمين الوسائط المتعددة', type: 'optional', subItems: ['img vs picture vs figure', 'video & audio tags', 'iframe security & sandbox'] },
        ],
      },
    ],
  },
  {
    id: 'stage-css',
    title: 'CSS (Cascading Style Sheets)',
    titleAr: 'هندسة التصميم، التجاوب، والـ Modern Layouts',
    order: '03',
    color: 'sky',
    summary: 'تحويل الهيكل الجاف إلى واجهات حية، متجاوبة مع كافة الشاشات وأنيقة الحركة',
    topics: [
      {
        title: 'أساسيات ومحددات التنسيق (CSS Basics & Selectors)',
        items: [
          { name: 'Learn the Basics', nameAr: 'أساسيات التنسيق والقواعد', type: 'core', subItems: ['Syntax, rules & comments', 'Color formats (Hex, RGB, HSL)', 'Typography & fonts (Google Fonts)', 'CSS Units (px, rem, em, %, vh, vw)'] },
          { name: 'CSS Box Model', nameAr: 'نموذج الصندوق والهوامش', type: 'core', subItems: ['Content, Padding, Border, Margin', 'box-sizing: border-box', 'Margin Collapse', 'CSS Specificity & Cascade'] },
          { name: 'Making Layouts', nameAr: 'أنظمة التوزيع الحديثة', type: 'core', subItems: ['Display (block, inline, inline-block, none)', 'Position (static, relative, absolute, fixed, sticky)', 'Z-Index & Stacking Context'] },
          { name: 'Flexbox Architecture', nameAr: 'توزيع فليكس أحادي البعد (Flexbox)', type: 'recommended', subItems: ['flex-direction, justify-content, align-items', 'flex-grow, flex-shrink, flex-basis', 'gap & wrapping'] },
          { name: 'CSS Grid Architecture', nameAr: 'شبكات جريد ثنائية الأبعاد (CSS Grid)', type: 'recommended', subItems: ['grid-template-columns/rows', 'fraction unit (fr)', 'grid-template-areas', 'minmax(), auto-fit, auto-fill'] },
          { name: 'Responsive Design', nameAr: 'التصميم المتجاوب Mobile-First', type: 'recommended', subItems: ['Mobile-First philosophy', 'Media Queries (@media)', 'Container Queries (@container)', 'Fluid typography (clamp, min, max)'] },
        ],
      },
      {
        title: 'أطر العمل والمعالجات (CSS Frameworks & Architecture)',
        items: [
          { name: 'Tailwind CSS', nameAr: 'إطار عمل Tailwind CSS (Utility-First)', type: 'recommended', details: 'الأكثر طلباً عالمياً لبناء واجهات إنتاجية سريعة بنظام Design Tokens' },
          { name: 'CSS Architecture (BEM)', nameAr: 'معمارية التسمية المنظمة BEM', type: 'optional', details: 'Block Element Modifier لتفادي فوضى التسميات في المشاريع التقليدية' },
          { name: 'CSS Preprocessors (Sass / SCSS)', nameAr: 'المعالجات القبلية (Sass)', type: 'alternative', details: 'المتغيرات، التداخل (Nesting)، والـ Mixins' },
          { name: 'CSS Modules & Modern Styling', nameAr: 'عزل الفئات (CSS Modules)', type: 'recommended', details: 'عزل فئات الـ CSS على مستوى المكون في React و Next.js لمنع تضارب الأسماء' },
        ],
      },
    ],
  },
  {
    id: 'stage-javascript',
    title: 'JavaScript (The Core Engine)',
    titleAr: 'احتراف جافاسكريبت الشامل (75 درسًا)',
    order: '04',
    color: 'yellow',
    summary: 'لغة البرمجة الأساسية للويب: من المتغيرات وأنواع البيانات إلى الـ Event Loop والـ DOM الكامل',
    topics: [
      {
        title: 'الأساسيات والمحرك (Fundamentals & Engine)',
        items: [
          { name: 'Variables & Data Types', nameAr: 'المتغيرات وأنواع البيانات', type: 'core', subItems: ['var vs let vs const', 'Scopes (Block, Function, Global)', 'Hoisting & TDZ', '7 Primitive Types & Objects'] },
          { name: 'Equality & Type Casting', nameAr: 'المقارنات والتحويل الخوارزمي', type: 'core', subItems: ['== vs === vs Object.is', 'SameValue & SameValueZero algorithms', 'Explicit vs Implicit Coercion'] },
          { name: 'Control Flow & Loops', nameAr: 'التحكم بالتدفق والحلقات التكرارية', type: 'core', subItems: ['if/else & Switch', 'for, while, do..while', 'for..of & for..in', 'try..catch..finally error handling'] },
          { name: 'Functions & Closures', nameAr: 'الدوال وسلسلة النطاقات والـ Closures', type: 'recommended', subItems: ['Declarations vs Expressions', 'Arrow Functions & lexical this', 'Rest & Default Params', 'Closures & Scope Chain', 'Recursion & Stack'] },
        ],
      },
      {
        id: 'js-objects-dom',
        title: 'الكائنات والـ DOM والبرمجة غير المتزامنة (Objects, DOM & Async)',
        items: [
          { name: 'Objects & Prototypes', nameAr: 'الكائنات وسلاسل الـ Prototypes', type: 'recommended', subItems: ['Object methods (keys, values, entries)', 'Destructuring & Spread', 'Prototypal Inheritance', 'ES6 Classes & Getters/Setters'] },
          { name: 'DOM Manipulation', nameAr: 'التحكم في شجرة الـ DOM', type: 'core', subItems: ['Selecting elements (querySelector)', 'Creating, modifying & removing nodes', 'ClassList & style manipulation'] },
          { name: 'DOM Events & Flow', nameAr: 'هندسة الأحداث وتدفقها', type: 'core', subItems: ['Event Bubbling & Capturing', 'Event Delegation pattern', 'Form submit & preventDefault()'] },
          { name: 'Async JS & Event Loop', nameAr: 'البرمجة غير المتزامنة والـ Event Loop', type: 'core', subItems: ['Call Stack & Web APIs', 'Microtask Queue (Promises) vs Macrotask Queue', 'async/await & Promise.all', 'Fetch API & AbortController'] },
          { name: 'Modern JS & Browser APIs', nameAr: 'الميزات الحديثة وواجهات المتصفح', type: 'recommended', subItems: ['ES Modules (import/export)', 'LocalStorage, SessionStorage & Cookies', 'Browser APIs (Geolocation, Clipboard, IntersectionObserver)'] },
        ],
      },
    ],
  },
  {
    id: 'stage-git-tools',
    title: 'Version Control & Build Tools',
    titleAr: 'إدارة النسخ Git، الحزم، وأدوات البناء',
    order: '05',
    color: 'emerald',
    summary: 'منظومة التطوير المشترك، مدراء الحزم، ومجمعات الأكواد الإنتاجية الحديثة',
    topics: [
      {
        title: 'أنظمة إدارة النسخ والتعاون (VCS & Hosting)',
        items: [
          { name: 'Git', nameAr: 'نظام Git الأساسي', type: 'core', subItems: ['init, add, commit, status, log', 'branching, checkout, merge', 'stash, revert, reset', 'Merge conflicts resolution'] },
          { name: 'GitHub / GitLab', nameAr: 'منصات المستودعات السحابية', type: 'recommended', subItems: ['Remotes (push, pull, fetch)', 'Pull Requests & Code Reviews', 'Issues & Project Boards', 'GitHub Actions Basics'] },
        ],
      },
      {
        title: 'مدراء الحزم وأدوات البناء (Package Managers & Bundlers)',
        items: [
          { name: 'Package Managers', nameAr: 'مدراء الحزم البرمجية', type: 'core', subItems: ['npm (Default standard)', 'pnpm (Fast & disk efficient)', 'yarn (Alternative ecosystem)'] },
          { name: 'Build Tools & Bundlers', nameAr: 'مجمعات ومسرعات البناء الحديثة', type: 'recommended', subItems: ['Vite (Industry standard modern tool)', 'esbuild & SWC (Superfast compilers)', 'Webpack (Legacy enterprise standard)', 'Turbopack (Next-gen Next.js bundler)'] },
          { name: 'Linters & Formatters', nameAr: 'أدوات ضبط الجودة والتنسيق', type: 'recommended', subItems: ['ESLint (Code quality & rules)', 'Prettier (Automated code formatting)'] },
        ],
      },
    ],
  },
  {
    id: 'stage-react',
    title: 'Pick a Framework: React.js Ecosystem',
    titleAr: 'اختيار إطار العمل: منظومة React.js (React 19)',
    order: '06',
    color: 'cyan',
    summary: 'المكتبة الأكثر انتشاراً واستخداماً عالمياً لبناء واجهات الـ SPA التفاعلية والمعقدة',
    topics: [
      {
        title: 'أساسيات React ومنظومة الـ Hooks (React Core & Hooks)',
        items: [
          { name: 'Components & JSX', nameAr: 'المكونات وصيغة JSX', type: 'core', subItems: ['Functional components', 'JSX syntax & rules', 'Props vs State', 'Conditional rendering & Lists keys'] },
          { name: 'Basic Hooks', nameAr: 'الـ Hooks الأساسية لدورة الحياة', type: 'core', subItems: ['useState (State management)', 'useEffect (Side effects & cleanup)', 'useRef (DOM references without re-render)'] },
          { name: 'Advanced Hooks', nameAr: 'الـ Hooks المتقدمة وضبط الأداء', type: 'recommended', subItems: ['useReducer (Complex state transitions)', 'useMemo (Memoized values)', 'useCallback (Stable function references)', 'useContext (Context API for broad state)'] },
          { name: 'Custom Hooks', nameAr: 'بناء الـ Custom Hooks', type: 'recommended', details: 'استخراج منطق الأعمال القابل لإعادة الاستخدام في دوال تبدأ بـ use' },
        ],
      },
      {
        title: 'منظومة React للإنتاج (Ecosystem: Routing, Forms & State)',
        items: [
          { name: 'Routers', nameAr: 'التوجيه في تطبيقات SPA', type: 'recommended', subItems: ['React Router v6/v7 (Standard)', 'TanStack Router (Type-safe router)'] },
          { name: 'State Management', nameAr: 'إدارة الحالة العامة للمشروع', type: 'recommended', subItems: ['Context API (Built-in)', 'Zustand (Fast, light & modern)', 'Redux Toolkit (Enterprise legacy)', 'Jotai / Recoil (Atomic state)'] },
          { name: 'Server State & API Calls', nameAr: 'إدارة بيانات الخادم والـ Caching', type: 'recommended', subItems: ['TanStack Query / React Query v5 (Industry standard)', 'Axios (HTTP client)', 'SWR (Vercel data fetching)'] },
          { name: 'Forms & Validation', nameAr: 'النماذج والتحقق الصارم', type: 'recommended', subItems: ['React Hook Form (Performant forms)', 'Zod (Type-safe schema validation)', 'Formik (Alternative)'] },
          { name: 'Headless UI & Components', nameAr: 'مكتبات المكونات المفتوحة والتصميم', type: 'recommended', subItems: ['Shadcn UI (Tailwind based standard)', 'Radix UI / React Aria (Headless accessible)', 'Lucide Icons'] },
        ],
      },
    ],
  },
  {
    id: 'stage-nextjs-ts',
    title: 'TypeScript & Next.js (Full-Stack Production)',
    titleAr: 'بيئة الإنتاج السحابية: تايب سكريبت و Next.js App Router',
    order: '07',
    color: 'emerald',
    summary: 'معيار الشركات العالمية: الجمع بين أمان TypeScript وقوة الرندر السيرفري SSR بـ Next.js',
    topics: [
      {
        title: 'تايب سكريبت الصارمة (Strict TypeScript)',
        items: [
          { name: 'Types & Interfaces', nameAr: 'الأنواع والـ Interfaces', type: 'core', subItems: ['Primitives, Union & Intersection', 'Interfaces vs Type Aliases', 'Generics functions & components', 'Utility Types (Partial, Pick, Omit, Record)'] },
          { name: 'TypeScript in React', nameAr: 'تأمين مكونات React بالـ Types', type: 'core', subItems: ['Props typing', 'Hooks typing (useState, useRef)', 'Event handler typing (MouseEvent, ChangeEvent)'] },
        ],
      },
      {
        title: 'معمارية Next.js App Router',
        items: [
          { name: 'Routing & Component Architecture', nameAr: 'التوجيه ومكونات السيرفر والعميل', type: 'core', subItems: ['App directory (page, layout, loading, error)', 'Server Components (RSC) vs Client Components', 'Dynamic routes [slug] & Route Handlers'] },
          { name: 'Rendering Strategies', nameAr: 'استراتيجيات الرندر والأداء', type: 'core', subItems: ['Server-Side Rendering (SSR)', 'Static Site Generation (SSG)', 'Incremental Static Regeneration (ISR)', 'Streaming with Suspense'] },
          { name: 'Data Fetching & Caching', nameAr: 'جلب البيانات والذاكرة المؤقتة', type: 'core', subItems: ['Next.js Caching Architecture', 'revalidatePath & revalidateTag', 'Server Actions (Direct server mutations)'] },
          { name: 'Security & Deployment', nameAr: 'الأمان، المصادقة، والنشر السحابي', type: 'recommended', subItems: ['Middleware for route protection', 'Auth via HttpOnly Cookies & JWT', 'Metadata & Dynamic sitemap.xml SEO', 'Deployment on Vercel, Docker & Node VPS'] },
        ],
      },
    ],
  },
  {
    id: 'stage-testing-perf',
    title: 'Testing, Security & Performance (Senior Level)',
    titleAr: 'الاختبارات الآلية، الأداء الفائق، وأمان الويب',
    order: '08',
    color: 'purple',
    summary: 'المحطة التي تفصل بين كتابة كود هاوٍ، ومهندس برمجيات حقيقي قادر على قيادة المشاريع',
    topics: [
      {
        title: 'هرم الاختبارات الآلية (Testing Pyramid & QA)',
        items: [
          { name: 'Unit & Integration Testing', nameAr: 'اختبارات الوحدة والتكامل', type: 'recommended', subItems: ['Vitest (Modern superfast runner)', 'Jest (Standard test runner)', 'React Testing Library (Component behavior)', 'Mock Service Worker (MSW for API mocking)'] },
          { name: 'End-to-End (E2E) Testing', nameAr: 'اختبارات المسار الكامل E2E', type: 'recommended', subItems: ['Playwright (Modern cross-browser standard)', 'Cypress (Alternative E2E framework)'] },
        ],
      },
      {
        title: 'أداء الويب وأمان التطبيقات (Performance & Web Security)',
        items: [
          { name: 'Core Web Vitals', nameAr: 'مؤشرات الأداء الحيوية للويب', type: 'recommended', subItems: ['LCP (Largest Contentful Paint - التحميل)', 'INP (Interaction to Next Paint - التفاعل)', 'CLS (Cumulative Layout Shift - الثبات)', 'Code Splitting, Dynamic Imports & Tree Shaking'] },
          { name: 'Web Security Basics (OWASP)', nameAr: 'أمان الويب ومعايير OWASP', type: 'recommended', subItems: ['Cross-Site Scripting (XSS) prevention', 'CSRF protection', 'Content Security Policy (CSP headers)', 'CORS configuration & Clickjacking defense'] },
          { name: 'Authentication Strategies', nameAr: 'استراتيجيات المصادقة وإدارة الجلسات', type: 'recommended', subItems: ['JWT tokens', 'HttpOnly secure cookies', 'OAuth 2.0 / SSO', 'Session based authentication'] },
        ],
      },
    ],
  },
];

export function FrontendRoadmapDiagram() {
  const [selectedNode, setSelectedNode] = useState<DiagramTopicItem | null>(null);
  const [filterType, setFilterType] = useState<NodeType | 'all'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [activeStageId, setActiveStageId] = useState<string>('all');

  const filteredStages = DIAGRAM_STAGES.filter(stage => {
    if (activeStageId !== 'all' && stage.id !== activeStageId) return false;
    return true;
  });

  return (
    <div className="space-y-10" dir="rtl">
      {/* Diagram Control Bar */}
      <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/70">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>المخطط البصري التفاعلي (Interactive Flowchart Visual UI)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-foreground">
              مخطط عقد ومحاور مسار الفرونت إند بالتفصيل الدقيق
            </h3>
            <p className="text-xs sm:text-sm text-foreground-muted max-w-2xl leading-relaxed">
              تصفح العقد والمسارات الشجرية المترابطة تماماً كما في مخططات roadmap.sh العالمية. اضغط على أي عقدة للاطلاع على تفاصيلها ومكوناتها.
            </p>
          </div>

          {/* Color Legend matching roadmap.sh convention */}
          <div className="flex flex-wrap items-center gap-3 bg-surface/80 p-3.5 rounded-2xl border border-border text-xs font-bold shrink-0">
            <span className="text-foreground-muted">دليل ألوان العقد:</span>
            <div className="flex items-center gap-1.5">
              <span className="h-3.5 w-3.5 rounded-md bg-amber-400 border border-amber-600 shadow-sm" />
              <span className="text-foreground-secondary">المسار الأساسي (Core)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3.5 w-3.5 rounded-md bg-purple-500 border border-purple-700 shadow-sm" />
              <span className="text-foreground-secondary">خيار موصى به (Recommended)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3.5 w-3.5 rounded-md bg-teal-400 border border-teal-600 shadow-sm" />
              <span className="text-foreground-secondary">بدائل شائعة (Alternative)</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-foreground-muted">المحطة:</span>
            <button
              onClick={() => setActiveStageId('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                activeStageId === 'all'
                  ? 'bg-primary text-black border-primary'
                  : 'bg-surface hover:bg-surface-hover border-border text-foreground-secondary'
              }`}
            >
              كافة المخطط (All Stages)
            </button>
            {DIAGRAM_STAGES.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveStageId(s.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                  activeStageId === s.id
                    ? 'bg-primary text-black border-primary'
                    : 'bg-surface hover:bg-surface-hover border-border text-foreground-secondary'
                }`}
              >
                {s.order}. {s.title.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <input
              type="text"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              placeholder="ابحث عن موضوع أو أداة..."
              className="w-full pr-10 pl-4 py-2 rounded-xl border border-border bg-surface text-xs font-sans text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Main Visual Flowchart Container */}
      <div className="space-y-12 relative">
        {filteredStages.map((stage, sIdx) => {
          return (
            <div
              key={stage.id}
              className="rounded-3xl border border-border/90 bg-card/60 backdrop-blur-sm p-6 sm:p-8 shadow-card relative space-y-8"
            >
              {/* Stage Header Banner (Roadmap node style) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
                <div className="flex items-center gap-3.5">
                  <span className="h-10 w-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-mono font-black text-lg flex items-center justify-center shrink-0">
                    {stage.order}
                  </span>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-primary block">
                      STAGE {stage.order}
                    </span>
                    <h4 className="text-xl font-black text-foreground mt-0.5">
                      {stage.titleAr} <span className="text-sm font-sans font-normal text-foreground-muted mr-2">({stage.title})</span>
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-foreground-secondary max-w-md leading-relaxed">
                  {stage.summary}
                </p>
              </div>

              {/* Topics Grid as Flowchart Node Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {stage.topics.map((topic, tIdx) => (
                  <div
                    key={tIdx}
                    className="rounded-2xl border border-border bg-surface/70 p-5 shadow-sm space-y-4 relative"
                  >
                    {/* Topic Pillar Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        <h5 className="text-sm font-black text-foreground">
                          {topic.title}
                        </h5>
                      </div>
                      {topic.description && (
                        <span className="text-[11px] text-foreground-muted">
                          {topic.description}
                        </span>
                      )}
                    </div>

                    {/* Nodes inside Topic */}
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {topic.items
                        .filter(item => {
                          if (!searchFilter.trim()) return true;
                          const q = searchFilter.toLowerCase();
                          return (
                            item.name.toLowerCase().includes(q) ||
                            (item.nameAr && item.nameAr.toLowerCase().includes(q)) ||
                            (item.subItems && item.subItems.some(sub => sub.toLowerCase().includes(q)))
                          );
                        })
                        .map((item, iIdx) => {
                          const isSelected = selectedNode?.name === item.name;

                          // Color classes based on Roadmap.sh styling:
                          // Yellowish for Core, Purple for Recommended, Cyan/Teal for Alternative
                          let badgeBg = 'bg-amber-400 text-slate-950 border-amber-500 hover:bg-amber-300';
                          if (item.type === 'recommended') {
                            badgeBg = 'bg-purple-600 text-white border-purple-700 hover:bg-purple-500';
                          } else if (item.type === 'alternative') {
                            badgeBg = 'bg-teal-500 text-slate-950 border-teal-600 hover:bg-teal-400';
                          } else if (item.type === 'optional') {
                            badgeBg = 'bg-surface-elevated text-foreground border-border hover:bg-surface-hover';
                          }

                          return (
                            <button
                              key={iIdx}
                              onClick={() => setSelectedNode(item)}
                              className={`group relative text-right transition-all transform active:scale-95 duration-150 rounded-xl px-3.5 py-2 border font-sans text-xs font-bold shadow-sm flex items-center gap-2 ${badgeBg} ${
                                isSelected ? 'ring-2 ring-primary scale-105 z-10' : ''
                              }`}
                            >
                              <span>{item.name}</span>
                              {item.subItems && item.subItems.length > 0 && (
                                <span className="h-4 w-4 rounded-full bg-black/20 text-[10px] flex items-center justify-center font-mono">
                                  {item.subItems.length}
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Connecting Flow Indicator between Stages */}
              {sIdx < filteredStages.length - 1 && (
                <div className="flex justify-center -mb-4 pt-2">
                  <div className="h-10 w-10 rounded-full bg-surface border border-border shadow-md flex items-center justify-center text-foreground-muted">
                    <ArrowDown className="h-5 w-5 text-primary" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Slide-out / Modal Card when clicking on any Node */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-5 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-primary uppercase">
                  ROADMAP TOPIC NODE DETAILS
                </span>
                <h4 className="text-lg font-black text-foreground">
                  {selectedNode.name}
                </h4>
                {selectedNode.nameAr && (
                  <p className="text-xs text-foreground-muted">
                    {selectedNode.nameAr}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1.5 rounded-lg border border-border text-foreground-muted hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {selectedNode.details && (
                <div className="rounded-xl bg-surface p-3.5 border border-border/80 text-xs text-foreground-secondary leading-relaxed">
                  {selectedNode.details}
                </div>
              )}

              {selectedNode.subItems && selectedNode.subItems.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-foreground block">
                    المفاهيم والأدوات المتضمنة في هذه العقدة:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedNode.subItems.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 p-2.5 rounded-xl border border-border bg-surface/50 text-xs text-foreground font-mono"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedNode(null)}
                className="font-bold text-xs"
              >
                إغلاق النافذة
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
