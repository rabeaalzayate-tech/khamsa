'use client';

import React, { useState, useMemo } from 'react';
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
  GitBranch,
  Zap,
  Compass,
  ArrowLeft,
  Check,
  CornerDownLeft,
  Flame,
  Layout,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export type NodeType = 'core' | 'recommended' | 'alternative' | 'optional';

export interface DiagramTopicItem {
  name: string;
  nameAr: string;
  type: NodeType;
  details: string;
  whyItMatters?: string;
  link?: string;
  linkText?: string;
  subItems?: string[];
  proTip?: string;
}

export interface DiagramSubBranch {
  id: string;
  title: string;
  titleAr: string;
  description?: string;
  items: DiagramTopicItem[];
}

export interface DiagramStage {
  id: string;
  title: string;
  titleAr: string;
  order: string;
  badgeText: string;
  themeColor: 'amber' | 'teal' | 'yellow' | 'orange' | 'cyan' | 'purple' | 'emerald' | 'blue';
  level: 'مبتدئ (Junior Foundation)' | 'متوسط (Mid-Level Core)' | 'متقدم (Senior Architect)';
  summary: string;
  icon: string;
  articleLink?: string;
  branches: DiagramSubBranch[];
}

export const MODERN_ROADMAP_STAGES: DiagramStage[] = [
  {
    id: 'stage-internet',
    title: 'Internet & Web Architecture',
    titleAr: 'كيف يعمل الإنترنت والويب في العمق',
    order: '01',
    badgeText: 'الأساس الحتمي قبل كتابة أي سطر كود',
    themeColor: 'amber',
    level: 'مبتدئ (Junior Foundation)',
    summary: 'فهم فيزياء الشبكات ومسار حزم البيانات من لحظة كتابة الدومين في المتصفح حتى وصول أول بايت HTML.',
    icon: 'Globe',
    branches: [
      {
        id: 'branch-net-protocols',
        title: 'Network & Protocols',
        titleAr: 'بروتوكولات الاتصال ونقل البيانات',
        items: [
          {
            name: 'How Internet Works',
            nameAr: 'كيف يعمل الإنترنت والـ IP',
            type: 'core',
            details: 'فهم مسار الحزم (Packets)، أجهزة التوجيه (Routers)، مزود خدمة الإنترنت (ISP)، وعناوين IPv4 و IPv6.',
            whyItMatters: 'بدون فهم كيف تنتقل البيانات، لن تستطيع استيعاب بطء الاتصال أو أخطاء الشبكة في الإنتاج.',
            subItems: ['IP Addressing & Routing', 'Packets & Latency', 'ISP & Fiber backbones', 'TCP / UDP handshakes'],
            proTip: 'احفظ الفرق بين TCP (الموثوق ذو المصافحة الثلاثية) و UDP (السريع للبث والألعاب).',
          },
          {
            name: 'HTTP / HTTPS Protocols',
            nameAr: 'بروتوكولات HTTP و HTTPS و HTTP/3',
            type: 'core',
            details: 'تطور بروتوكول الويب: من HTTP/1.1 (مشكلة Head-of-line blocking) إلى HTTP/2 (Multiplexing) و HTTP/3 (QUIC عبر UDP). شهادات SSL/TLS وتشفير البيانات.',
            whyItMatters: 'كل طلب API أو صفحة ويب تعتمد على Headers و Status Codes و Caching الخاصة بهذا البروتوكول.',
            subItems: ['Request & Response Headers', 'HTTP Status Codes (200, 301, 401, 404, 500)', 'SSL/TLS Handshake', 'HTTP/2 Multiplexing & HTTP/3 QUIC'],
            proTip: 'في الإنتاج، احرص دائمًا على تفعيل HTTP/2 أو HTTP/3 عبر السيرفر أو CDN لتسريع جلب الملفات بالتوازي.',
          },
          {
            name: 'DNS Resolution',
            nameAr: 'نظام أسماء النطاقات (DNS)',
            type: 'core',
            details: 'آلية تحويل الدومين مثل khamsaprogramming.com إلى عنوان IP السيرفر عبر Root Nameserver و TLD و Authoritative Nameserver.',
            whyItMatters: 'ضروري عند ضبط نطاق موقعك وربط سجلات A Record و CNAME و TXT للبريد والحماية.',
            subItems: ['DNS Hierarchy & Caching', 'A & AAAA Records', 'CNAME & ALIAS', 'TTL (Time To Live) Propagation'],
          },
        ],
      },
      {
        id: 'branch-browser-engine',
        title: 'Browser Internals & Rendering',
        titleAr: 'محرك المتصفح ومسار الرندر الحرج',
        items: [
          {
            name: 'Browser Critical Rendering Path',
            nameAr: 'مسار الرندر الحرج (CRP)',
            type: 'recommended',
            details: 'كيف يحول المتصفح النص إلى بكسلات: بناء الـ DOM Tree، والـ CSSOM Tree، ودمجهما في Render Tree، ثم حسابات الـ Layout والـ Paint والـ Compositing.',
            whyItMatters: 'هذا هو المرجع الأهم لحل مشاكل الـ Performance وهبوط الفريمات (Jank) في الواجهات.',
            subItems: ['DOM & CSSOM construction', 'Render Tree generation', 'Reflow / Layout calculation', 'Repaint & Compositing Layers', 'will-change & GPU optimization'],
            proTip: 'تجنب تعديل الخصائص التي تسبب Reflow (مثل width, height, top) واستبدلها بـ transform و opacity لتتم على GPU مباشرة.',
          },
          {
            name: 'Hosting & CDN Infrastructure',
            nameAr: 'الاستضافة وشبكات التوزيع CDN',
            type: 'recommended',
            details: 'الفرق بين الاستضافة المشتركة و VPS والسيرفرات السحابية، ودور شبكات الـ CDN (مثل Cloudflare) في تقريب المحتوى من المستخدم.',
            whyItMatters: 'الواجهة السريعة تحتاج بنية تحتية سريعة توزع الملفات الثابتة عبر أقرب Edge Server.',
            subItems: ['Static vs Dynamic Hosting', 'Edge Computing & CDNs', 'Cache-Control & ETag headers', 'Vercel / Cloudflare Pages / VPS'],
          },
        ],
      },
    ],
  },
  {
    id: 'stage-html',
    title: 'HTML5 & Semantic Web',
    titleAr: 'بنية الويب الدلالية ومعايير الوصول A11y',
    order: '02',
    badgeText: 'هيكل الموقع وعظام الصفحة الدلالية',
    themeColor: 'teal',
    level: 'مبتدئ (Junior Foundation)',
    summary: 'كتابة شيفرة HTML دلالية نظيفة، متوافقة مع محركات البحث SEO، ومتاحة للجميع وفق معايير إمكانية الوصول العالمية.',
    icon: 'Layers',
    articleLink: '/frontend/html',
    branches: [
      {
        id: 'branch-semantic-core',
        title: 'Semantic Elements & Structure',
        titleAr: 'العناصر الدلالية وبنية الصفحة',
        items: [
          {
            name: 'Semantic Tags Hierarchy',
            nameAr: 'الهيكل الدلالي الصحيح',
            type: 'core',
            details: 'استخدام الوسوم الدلالية الصحيحة: header, nav, main, section, article, aside, footer، بدلاً من تكديس عناصر div عشوائية.',
            whyItMatters: 'يساعد قراءات الشاشة لمحركات البحث والمتصفحات في فهم المحتوى وأهميته بدقة.',
            subItems: ['main vs section vs article', 'h1..h6 Heading Structure', 'nav & semantic lists', 'figure & figcaption'],
          },
          {
            name: 'Modern Forms & Validation',
            nameAr: 'النماذج المتقدمة والتحقق المدمج',
            type: 'core',
            details: 'هندسة النماذج التفاعلية باستخدام input types الحديثة، وضبط label المرتبط بـ id، وقواعد التحقق المدمجة pattern و required.',
            whyItMatters: 'النماذج هي وسيلة التواصل الأساسية بين المستخدم والأنظمة (تسجيل دخول، دفع، مراسلة).',
            subItems: ['Form validation constraints', 'input types (email, tel, date, number)', 'label for/id accessibility', 'fieldset & legend grouping'],
          },
        ],
      },
      {
        id: 'branch-a11y-seo',
        title: 'Accessibility (A11y) & SEO',
        titleAr: 'إمكانية الوصول وتحسين محركات البحث',
        items: [
          {
            name: 'WAI-ARIA & Accessibility',
            nameAr: 'معايير الوصول A11y و ARIA',
            type: 'recommended',
            details: 'تطبيق معايير WCAG: أدوار ARIA (role="dialog", role="tab")، وحالات aria-expanded و aria-hidden، وإمكانية التنقل الكامل بلوحة المفاتيح Focus management.',
            whyItMatters: 'معيار دولي ملزم في كبرى الشركات لضمان وصول المستخدمين ذوي الهمم وتفادي الغرامات القانونية.',
            subItems: ['WCAG 2.2 AA Compliance', 'ARIA roles & attributes', 'Keyboard navigation (Tab, Enter, Esc)', 'Focus traps & Skip to content links'],
            proTip: 'القاعدة الذهبية في ARIA: إذا وُجد عنصر HTML أصلي يؤدي الغرض (مثل <button>)، لا تستخدم div مع ARIA!',
          },
          {
            name: 'SEO Meta & Open Graph',
            nameAr: 'وسوم الميتا ومشاركة السوشيال',
            type: 'core',
            details: 'ضبط وسوم Title و Description والـ Canonical URL، وبيانات Open Graph و Twitter Cards لضمان ظهور بطاقات جذابة عند مشاركة الرابط.',
            whyItMatters: 'يضمن تصدر الموقع لنتائج جوجل وجذب الزوار عند نشر المقالات والصفحات.',
            subItems: ['Title & Meta Description', 'Open Graph (og:image, og:title)', 'Canonical links', 'Structured Data (Schema.org JSON-LD)'],
          },
        ],
      },
    ],
  },
  {
    id: 'stage-css',
    title: 'CSS3, Modern Layouts & Tailwind',
    titleAr: 'التنسيقات المتقدمة والأنظمة المرئية',
    order: '03',
    badgeText: 'روح الواجهة وجمال التصميم المتجاوب',
    themeColor: 'cyan',
    level: 'مبتدئ (Junior Foundation)',
    summary: 'إتقان الـ Box Model، وتوزيعات Flexbox و Grid المعقدة، والتحريك المتجاوب، وبناء واجهات عصرية بنظام Tailwind CSS 4.',
    icon: 'Layout',
    articleLink: '/frontend/css',
    branches: [
      {
        id: 'branch-css-foundations',
        title: 'Core Engine & Layouts',
        titleAr: 'محرك CSS وتوزيع العناصر',
        items: [
          {
            name: 'Box Model & Specificity',
            nameAr: 'نموذج الصندوق وأولوية المحددات',
            type: 'core',
            details: 'حسابات content, padding, border, margin وضبط box-sizing: border-box. حساب أوزان المحددات (Specificity) وقواعد Cascade المتقدمة.',
            whyItMatters: 'أكثر من 80% من مشاكل التنسيق سببها عدم إتقان أوزان المحددات أو حسابات الصندوق.',
            subItems: ['box-sizing: border-box', 'Specificity formula (Inline > ID > Class > Element)', 'Cascade Layers (@layer)', 'CSS Custom Properties (Variables)'],
          },
          {
            name: 'Flexbox (1D Layout)',
            nameAr: 'توزيعات Flexbox أحادية البعد',
            type: 'core',
            details: 'توزيع ومحاذاة العناصر على المحورين Main Axis و Cross Axis باستخدام flex-direction, justify-content, align-items, flex-grow, flex-shrink.',
            whyItMatters: 'الحل الافتراضي لتنسيق أشرطة التنقل، الأزرار، والبطاقات الأفقية والعمودية.',
            subItems: ['justify-content & align-items', 'flex-basis, grow, shrink', 'gap & flex-wrap', 'Nested flex containers'],
          },
          {
            name: 'CSS Grid (2D Layout)',
            nameAr: 'شبكات CSS Grid ثنائية الأبعاد',
            type: 'core',
            details: 'بناء تخطيطات معقدة بصفوف وأعمدة متزامنة: grid-template-columns (fr, repeat, minmax, auto-fit/fill) و grid-template-areas و Subgrid.',
            whyItMatters: 'لبناء صفحات كاملة ولوحات تحكم (Dashboards) متجاوبة بدون كود معقد.',
            subItems: ['repeat(auto-fit, minmax(...))', 'grid-template-areas', 'Subgrid for nested alignment', 'Implicit vs Explicit grids'],
          },
        ],
      },
      {
        id: 'branch-modern-styling',
        title: 'Tailwind CSS & Animations',
        titleAr: 'نظام Tailwind CSS والتحريك الحديث',
        items: [
          {
            name: 'Tailwind CSS Modern Ecosystem',
            nameAr: 'نظام Tailwind CSS الحديث',
            type: 'core',
            details: 'منهجية Utility-First CSS، التهيئة الصارمة، الفئات المتجاوبة (sm, md, lg, xl)، وحالات التفاعل (hover, focus, group, peer)، ودعم Dark Mode.',
            whyItMatters: 'المعيار الصناعي الأول في سوق العمل لسرعة الإنتاج وتوحيد Design Tokens.',
            subItems: ['Utility-First methodology', 'Responsive variants & Breakpoints', 'Arbitrary values & Theme config', 'Dark mode via class/media'],
          },
          {
            name: 'Responsive Design & Container Queries',
            nameAr: 'التصميم المتجاوب و Container Queries',
            type: 'core',
            details: 'التصميم للهواتف أولاً (Mobile-First)، وسائط الاستعلام @media، وميزة @container queries لتكييف البطاقات حسب مساحة الحاوية لا الشاشة.',
            whyItMatters: 'مكونات قابلة لإعادة الاستخدام في أي مكان وتتكيف تلقائيًا مع المساحة المتاحة.',
            subItems: ['Mobile-First philosophy', 'Viewport units (vw, vh, dvh, svh)', '@container (min-width: ...)', 'Fluid typography via clamp()'],
          },
          {
            name: 'CSS Transitions & Keyframes',
            nameAr: 'الحركات والانتقالات السلسة',
            type: 'recommended',
            details: 'بناء تفاعلات سلسة بمعدل 60fps باستخدام transition و @keyframes مع الاعتماد على GPU transforms بدلاً من تعديل أبعاد العناصر.',
            whyItMatters: 'اللمسات الحركية المدروسة تميز المواقع الاحترافية وتمنح المستخدم تجربة تفاعلية ممتعة.',
            subItems: ['CSS transitions & easing curves', '@keyframes animation', 'transform (translate, scale, rotate)', 'will-change & hardware acceleration'],
          },
        ],
      },
    ],
  },
  {
    id: 'stage-javascript',
    title: 'JavaScript Core & V8 Engine',
    titleAr: 'محرك جافاسكريبت العميق والبرمجة الحديثة',
    order: '04',
    badgeText: '75 درساً معتمداً ومكتمل 100% بالمنصة',
    themeColor: 'yellow',
    level: 'متوسط (Mid-Level Core)',
    summary: 'عصب الواجهات التفاعلية: فهم عميق لمحرك V8، وإدارة الذاكرة، وسلسلة النطاقات، والـ DOM، والـ Event Loop، والبرمجة غير المتزامنة.',
    icon: 'Terminal',
    articleLink: '/frontend/javascript',
    branches: [
      {
        id: 'branch-js-engine-foundations',
        title: 'V8 Engine & Core Syntax',
        titleAr: 'أساسيات اللغة ومحرك V8',
        items: [
          {
            name: 'Data Types & Memory Model',
            nameAr: 'أنواع البيانات ونموذج الذاكرة',
            type: 'core',
            details: 'الأنواع البدائية (Primitives) مقابل الكائنات (Objects/References)، وتخزين الذاكرة في الـ Stack والـ Heap، وجمع القمامة (Garbage Collection).',
            whyItMatters: 'فهم كيف يمرر جافاسكريبت البيانات بالمرجع (By Reference) يمنع أخطاء التعديل غير المقصود (Mutation bugs).',
            link: '/articles/js-data-types',
            linkText: 'درس JS-03: أنواع البيانات ونموذج الذاكرة',
            subItems: ['7 Primitives & Object type', 'Call Stack vs Memory Heap', 'Value vs Reference mutation', 'Garbage Collector & Mark-and-Sweep'],
          },
          {
            name: 'Scope, Hoisting & Closures',
            nameAr: 'النطاقات والـ Hoisting والـ Closures',
            type: 'core',
            details: 'سياق التنفيذ (Execution Context)، والـ Lexical Scope، والمنطقة الميتة المؤقتة (TDZ)، وكيف تحتفظ الدوال بنطاقها الخارجي عبر الـ Closures.',
            whyItMatters: 'السؤال رقم 1 في جميع مقابلات عمل مهندسي الفرونت إند في العالم.',
            link: '/articles/js-closures',
            linkText: 'درس JS-24: الـ Closures والنطاقات عملياً',
            subItems: ['Global vs Function vs Block Scope', 'Var vs Let/Const & TDZ', 'Scope Chain resolution', 'Closure patterns & Data privacy'],
            proTip: 'الـ Closure هو دالة تتذكر وتصل إلى المتغيرات في نطاقها الأب حتى بعد انتهاء تنفيذ الدالة الأب.',
          },
          {
            name: 'Prototypes & OOP Classes',
            nameAr: 'النماذج الأولية والبرمجة كائنية التوجه',
            type: 'recommended',
            details: 'سلسلة الـ Prototype Chain، والوراثة النموذجية، وكلمة this وديناميكيتها، وفئات ES6 Classes مع الـ Getters والـ Setters.',
            whyItMatters: 'فهم كيف بُنيت جافاسكريبت وكيف تعمل المكتبات التي تستخدمها يومياً تحت الغطاء.',
            link: '/articles/js-prototypes',
            linkText: 'درس JS-38: النماذج الأولية وسلسلة الـ Prototype',
            subItems: ['[[Prototype]] & __proto__', 'Object.create() & Inheritance', 'this binding (call, apply, bind)', 'ES6 class syntax & Private fields #'],
          },
        ],
      },
      {
        id: 'branch-js-dom-async',
        title: 'DOM Architecture & Async JS',
        titleAr: 'هندسة الـ DOM والـ Event Loop',
        items: [
          {
            name: 'DOM Events & Delegation',
            nameAr: 'هندسة أحداث الـ DOM وتفويضها',
            type: 'core',
            details: 'شجرة الـ DOM، ومراحل تدفق الأحداث (Capturing و Target و Bubbling)، ونمط التفويض (Event Delegation) لإدارة آلاف العناصر بكفاءة.',
            whyItMatters: 'المفتاح لبناء واجهات فائقة السرعة تستهلك أقل قدر من الذاكرة وتتعامل مع المحتوى الديناميكي بسلاسة.',
            link: '/articles/js-event-delegation',
            linkText: 'درس JS-64: تدفق الأحداث والـ Event Delegation',
            subItems: ['Event Bubbling & Capturing phases', 'event.stopPropagation() & preventDefault()', 'Event Delegation on dynamic lists', 'Custom Events & dispatchEvent'],
          },
          {
            name: 'Event Loop & Concurrency',
            nameAr: 'حلقة الأحداث (Event Loop) والمزامنة',
            type: 'core',
            details: 'كيف ينفذ جافاسكريبت أحادي الخيط الكود غير المتزامن: Call Stack و Web APIs و Microtask Queue (Promises) و Macrotask Queue (setTimeout).',
            whyItMatters: 'يفسر لك بدقة متى يتم تنفيذ الـ Promise والـ Timeout ويمنع تجميد واجهة المستخدم (UI Freeze).',
            link: '/articles/js-event-loop',
            linkText: 'درس JS-66: حلقة الأحداث بالتفصيل الممتع',
            subItems: ['Call Stack execution', 'Microtasks (Promises, queueMicrotask)', 'Macrotasks (Timers, I/O)', 'requestAnimationFrame for smooth UI'],
          },
          {
            name: 'Promises, Async/Await & Fetch',
            nameAr: 'الوعود والاتصال بالسيرفر Fetch API',
            type: 'core',
            details: 'التعامل مع الوعود (Pending, Fulfilled, Rejected)، والتسلسل النظيف بـ async/await، وجلب البيانات عبر Fetch API مع إدارة أخطاء الشبكة والـ AbortController.',
            whyItMatters: 'الوسيلة الأساسية لجلب البيانات من الـ REST APIs وربط الواجهة بالباك إند.',
            link: '/articles/js-async-await',
            linkText: 'درس JS-69: البرمجة بـ Async/Await بدون تعقيد',
            subItems: ['Promise.all / allSettled / race', 'async / await with try..catch', 'Fetch API with JSON payload', 'AbortController for cancellation'],
          },
          {
            name: 'ES Modules & Modern Browser APIs',
            nameAr: 'الوحدات وميزات المتصفح التخزينية',
            type: 'recommended',
            details: 'تقسيم الكود بنظام ES Modules (import/export)، والتخزين في LocalStorage و SessionStorage و Cookies، ومراقبة الرؤية عبر IntersectionObserver.',
            whyItMatters: 'ضروري لبناء تطبيقات حديثة تدعم التخزين المحلي والتحميل الكسول (Lazy Loading) للصور والمحتوى.',
            link: '/articles/js-web-storage',
            linkText: 'درس JS-74: التخزين المحلي والكوكيز',
            subItems: ['ES Modules syntax', 'LocalStorage vs Cookies', 'IntersectionObserver API', 'Clipboard & Geolocation APIs'],
          },
        ],
      },
    ],
  },
  {
    id: 'stage-git',
    title: 'Version Control & Build Pipeline',
    titleAr: 'إدارة الإصدارات ومنظومة بناء المشاريع',
    order: '05',
    badgeText: 'أدوات العمل الجماعي وبناء حزم الإنتاج',
    themeColor: 'orange',
    level: 'متوسط (Mid-Level Core)',
    summary: 'احتراف Git و GitHub في بيئة عمل الفرق، وفهم أدوات التجميع السريعة (Vite و Turbopack) ومديري الحزم.',
    icon: 'GitBranch',
    branches: [
      {
        id: 'branch-git-collaboration',
        title: 'Git & GitHub Mastery',
        titleAr: 'احتراف Git والعمل الجماعي',
        items: [
          {
            name: 'Git Fundamentals & Branching',
            nameAr: 'أساسيات Git والفروع',
            type: 'core',
            details: 'دورة حياة الملفات (Untracked, Staged, Committed)، وإنشاء الفروع (Branches)، والدمج (Merge)، وفحص التغييرات (Diff & Log).',
            whyItMatters: 'لا يوجد فريق عمل برمجي في العالم يعمل بدون Git لحفظ تاريخ وتطور المشروع.',
            subItems: ['git add, commit, push, pull', 'Feature branch workflow', 'git stash for temporary work', 'git log --graph --oneline'],
          },
          {
            name: 'Advanced Git & Conflict Resolution',
            nameAr: 'فض التعارضات و Git Rebase',
            type: 'recommended',
            details: 'حل تعارضات الدمج (Merge Conflicts)، واستخدام git rebase للحفاظ على تاريخ خطي نظيف، و git cherry-pick لنقل تعديلات محددة.',
            whyItMatters: 'المهارة التي تميز المهندس المحترف وتنقذ المشاريع عند تداخل تعديلات المطورين.',
            subItems: ['Interactive rebase (git rebase -i)', 'Resolving merge conflicts', 'git cherry-pick', 'git reset vs git revert (Safe undo)'],
          },
          {
            name: 'GitHub & Pull Requests (PRs)',
            nameAr: 'منظومة GitHub والمراجعة البرمجية',
            type: 'core',
            details: 'إنشاء الـ Pull Requests، والمراجعة الكودية (Code Review)، وربط الـ Issues، وحماية الفروع الرئيسية (Branch Protection Rules).',
            whyItMatters: 'البوابة لتوثيق مساهماتك وبناء معرض أعمالك والحصول على وظائف عالمية.',
            subItems: ['Pull Request workflows', 'Code review best practices', 'Branch protection rules', 'GitHub Issues & Milestones'],
          },
        ],
      },
      {
        id: 'branch-package-bundlers',
        title: 'Package Managers & Bundlers',
        titleAr: 'مديرو الحزم ومجمعات الكود',
        items: [
          {
            name: 'Package Managers (pnpm, npm)',
            nameAr: 'مديرو الحزم pnpm و npm',
            type: 'core',
            details: 'ملف package.json و lockfiles، والفرق بين dependencies و devDependencies، وتفضيل pnpm لكفاءته الفائقة وسرعته في حفظ المساحة.',
            whyItMatters: 'إدارة اعتماديات المشروع وتفادي تضارب الإصدارات بين بيئات العمل المختلفة.',
            subItems: ['package.json & semantic versioning (^, ~)', 'pnpm symlinked node_modules', 'npm scripts automation', 'Audit & security vulnerabilities'],
          },
          {
            name: 'Vite & Modern Bundlers',
            nameAr: 'مجمعات الكود Vite و Turbopack',
            type: 'core',
            details: 'كيف يستفيد Vite من Native ES Modules لتوفير تحديث فوري (Instant HMR)، والتجميع للإنتاج عبر Rollup، ونظام Turbopack في Next.js.',
            whyItMatters: 'يوفر ساعات من وقت التطوير اليومي بفضل سرعة التشغيل اللحظية.',
            subItems: ['Vite dev server & native ESM', 'Hot Module Replacement (HMR)', 'Tree-shaking & Code Splitting', 'Turbopack architecture'],
          },
        ],
      },
    ],
  },
  {
    id: 'stage-react',
    title: 'React 19 & Component Ecosystem',
    titleAr: 'مكتبة React 19 والأنظمة التفاعلية',
    order: '06',
    badgeText: 'المكتبة الأولى عالمياً لبناء الواجهات',
    themeColor: 'cyan',
    level: 'متوسط (Mid-Level Core)',
    summary: 'إتقان React 19 الحديثة: من Virtual DOM والمكونات الدالية والـ Hooks، إلى إدارة الحالة وتحديثات React 19 مثل Actions و use() و useTransition.',
    icon: 'Code2',
    articleLink: '/frontend/react',
    branches: [
      {
        id: 'branch-react-foundations',
        title: 'React Core & Modern Hooks',
        titleAr: 'عناصر React الأساسية والـ Hooks',
        items: [
          {
            name: 'Components, JSX & Virtual DOM',
            nameAr: 'المكونات والـ JSX والـ Virtual DOM',
            type: 'core',
            details: 'بناء المكونات الدالية (Functional Components)، وقواعد JSX، وتدفق البيانات أحادي الاتجاه (One-way data flow)، وخوارزمية Reconciliation & React Fiber.',
            whyItMatters: 'الأساس المعماري الذي تبنى عليه كل شاشة وزر ونموذج في عالم React.',
            subItems: ['JSX compilation to JS', 'Props & Children composition', 'Virtual DOM diffing algorithm', 'Keys and list rendering best practices'],
          },
          {
            name: 'Core Hooks (useState, useEffect)',
            nameAr: 'الـ Hooks الأساسية ودورة الحياة',
            type: 'core',
            details: 'إدارة الحالة بـ useState، وتنفيذ الآثار الجانبية بـ useEffect مع مصفوفة الاعتماديات (Dependencies) ودالة التنظيف (Cleanup function).',
            whyItMatters: 'تحكم كامل في منطق المكون وعمليات جلب البيانات وربط الـ Listeners.',
            subItems: ['useState & functional updates', 'useEffect & cleanup functions', 'useRef for DOM & mutable values', 'Custom Hooks abstraction'],
            proTip: 'لا تستخدم useEffect لتعديل حالة مشتقة (Derived State)؛ احسبها مباشرة أثناء الرندر!',
          },
          {
            name: 'Performance Hooks (useMemo, useCallback)',
            nameAr: 'خطافات الأداء useMemo و useCallback',
            type: 'recommended',
            details: 'حفظ نتائج العمليات الحسابية الثقيلة بـ useMemo، وحفظ مراجع الدوال بـ useCallback لتفادي إعادة رندر المكونات الأبناء بدون داعٍ.',
            whyItMatters: 'حماية التطبيقات الكبيرة من التباطؤ واستهلاك الذاكرة الزائد.',
            subItems: ['React.memo for pure components', 'useMemo for heavy calculations', 'useCallback for stable function references', 'React 19 Compiler automated memoization'],
          },
        ],
      },
      {
        id: 'branch-react-state-new',
        title: 'State Management & React 19',
        titleAr: 'إدارة الحالة وتحديثات React 19',
        items: [
          {
            name: 'React 19 New Features',
            nameAr: 'ميزات React 19 الثورية',
            type: 'core',
            details: 'تحديثات React 19 الرسمية: خطاف use() لقراءة الوعود والسياق، و useTransition للانتقالات غير المعطلة، و useActionState لإدارة النماذج، و useOptimistic للتحديثات اللحظية.',
            whyItMatters: 'الأسلوب الأحدث والأكثر نظافة لكتابة كود React دون الحاجة لمكتبات مساعدة ضخمة.',
            subItems: ['use() hook with Suspense', 'useTransition for non-blocking UI', 'useActionState for form mutations', 'useOptimistic for instant UX'],
          },
          {
            name: 'Global State Management (Zustand)',
            nameAr: 'إدارة الحالة الشاملة بـ Zustand',
            type: 'recommended',
            details: 'مقارنة Context API بالمكتبات الخارجية، واحتراف Zustand كحل خفيف وبسيط بدون Boilerplate معقد مثل Redux التقليدي.',
            whyItMatters: 'مشاركة البيانات (مثل سلة المشتريات، بيانات المستخدم، الثيم) عبر كل أجزاء التطبيق بسلاسة.',
            subItems: ['Context API vs External stores', 'Zustand store creation & hooks', 'Selectors for fine-grained re-renders', 'Persist middleware for LocalStorage'],
          },
          {
            name: 'Server State (TanStack Query)',
            nameAr: 'إدارة بيانات السيرفر بـ React Query',
            type: 'core',
            details: 'فصل Server State عن Client State باستخدام TanStack Query: التخزين المؤقت الذكي (Caching)، وتحديث البيانات في الخلفية، وإلغاء الطلبات المتكررة.',
            whyItMatters: 'يوفر آلاف الأسطر من كود جلب البيانات وإدارة حالات التحميل (loading/error) يدويًا.',
            subItems: ['useQuery & Query Keys', 'useMutation & Invalidation', 'Stale-While-Revalidate caching', 'Optimistic updates pattern'],
          },
        ],
      },
    ],
  },
  {
    id: 'stage-nextjs',
    title: 'TypeScript & Next.js App Router',
    titleAr: 'تايب سكريبت الصارمة وإطار عمل Next.js 15',
    order: '07',
    badgeText: 'معيار الشركات العالمية لإنتاج التطبيقات الكبرى',
    themeColor: 'purple',
    level: 'متقدم (Senior Architect)',
    summary: 'الجمع بين أمان الأنواع الصارم بـ TypeScript، وقوة الرندر السيرفري (SSR) ومكونات السيرفر (RSC) مع أحدث إصدارات Next.js App Router.',
    icon: 'Cpu',
    branches: [
      {
        id: 'branch-typescript',
        title: 'Strict TypeScript Foundations',
        titleAr: 'لغة تايب سكريبت الصارمة',
        items: [
          {
            name: 'Types, Interfaces & Generics',
            nameAr: 'الأنواع والـ Interfaces والـ Generics',
            type: 'core',
            details: 'الأنواع الأساسية، واتحادات الأنواع (Union Types)، والفروق بين Interface و Type Alias، والـ Generics لبناء دوال ومكونات مرنة وآمنة نوعياً.',
            whyItMatters: 'يكتشف أكثر من 40% من أخطاء وقت التشغيل قبل تشغيل التطبيق في المتصفح.',
            subItems: ['Union & Intersection types', 'Interfaces vs Type Aliases', 'Generics (<T>) in functions', 'Utility types (Partial, Pick, Omit, Record)'],
          },
          {
            name: 'TypeScript with React Components',
            nameAr: 'تأمين مكونات React بالـ Types',
            type: 'core',
            details: 'تحديد أنواع الـ Props، وتأمين الـ Hooks (useState, useRef)، وتحديد أنواع أحداث المتصفح (MouseEvent, ChangeEvent, FormEvent).',
            whyItMatters: 'تجربة تطوير فائقة مع ميزة الإكمال التلقائي وتأمين تمرير البيانات بين المكونات.',
            subItems: ['Props typing & default values', 'React.ReactNode vs React.JSX.Element', 'Event handler types (React.ChangeEvent)', 'ComponentProps & HTML attributes'],
          },
        ],
      },
      {
        id: 'branch-nextjs-app-router',
        title: 'Next.js App Router Architecture',
        titleAr: 'معمارية Next.js App Router',
        items: [
          {
            name: 'Server vs Client Components (RSC)',
            nameAr: 'مكونات السيرفر ومكونات العميل',
            type: 'core',
            details: 'فلسفة React Server Components (RSC): تشغيل المكونات على السيرفر بدون إرسال جافاسكريبت للعميل، واستخدام "use client" فقط للتفاعل والـ Hooks.',
            whyItMatters: 'تقليل حجم حزمة الجافاسكريبت وتحقيق سرعة تحميل قصوى وتصدر محركات البحث.',
            subItems: ['Server Components by default', '"use client" boundary placement', 'Composition pattern (Passing Server into Client)', 'Zero-bundle-size dependencies on server'],
          },
          {
            name: 'Routing & Nested Layouts',
            nameAr: 'التوجيه والـ Layouts المتداخلة',
            type: 'core',
            details: 'نظام الملفات في مجلد app: صفحات page.tsx، والقوالب المشتركة layout.tsx، وشاشات التحميل loading.tsx، وشاشات الخطأ error.tsx، والمسارات الديناميكية [slug].',
            whyItMatters: 'بناء هياكل تطبيقات معقدة مع حفظ حالة أشرطة التنقل دون إعادة تحميل الصفحة بالكامل.',
            subItems: ['page.tsx, layout.tsx, template.tsx', 'loading.tsx & Suspense streaming', 'error.tsx & not-found.tsx', 'Dynamic routes [slug] & Catch-all [...slug]'],
          },
          {
            name: 'Rendering Strategies (SSR, SSG, ISR)',
            nameAr: 'استراتيجيات الرندر والأداء',
            type: 'core',
            details: 'الرندر المسبق الثابت (SSG)، والرندر على السيرفر عند الطلب (SSR)، والتحديث المتدرج للمحتوى الثابت (ISR) عبر revalidate.',
            whyItMatters: 'اختيار الاستراتيجية المثلى لكل صفحة لتحقيق أفضل توازن بين السرعة وحداثة البيانات.',
            subItems: ['Static Site Generation (SSG)', 'Server-Side Rendering (SSR)', 'Incremental Static Regeneration (ISR)', 'Dynamic Segment Configs'],
          },
          {
            name: 'Server Actions & Data Mutations',
            nameAr: 'عمليات السيرفر السريعة (Server Actions)',
            type: 'core',
            details: 'تنفيذ العمليات السيرفرية مباشرة من مكونات React بدون كتابة API Routes منفصلة، وتحديث الكاش تلقائيًا عبر revalidatePath و revalidateTag.',
            whyItMatters: 'تبسيط بناء النماذج وتعديل البيانات بأمان ومباشرة داخل نفس المشروع.',
            subItems: ['"use server" directive', 'revalidatePath & revalidateTag', 'Form mutations with useActionState', 'Secure cookie & session management'],
          },
        ],
      },
    ],
  },
  {
    id: 'stage-testing-perf',
    title: 'Testing, Security & Performance',
    titleAr: 'الاختبارات الآلية، الأداء الفائق، وأمان الويب',
    order: '08',
    badgeText: 'المستوى الذي يفصل بين الهاوي ومهندس البرمجيات الحقيقي',
    themeColor: 'emerald',
    level: 'متقدم (Senior Architect)',
    summary: 'ضمان استقرار التطبيق باختبارات آلية شاملة، وتحقيق أعلى درجات الأداء Core Web Vitals، وتأمين الواجهة ضد الثغرات الأمنية.',
    icon: 'ShieldCheck',
    branches: [
      {
        id: 'branch-testing-qa',
        title: 'Automated Testing Pyramid',
        titleAr: 'هرم الاختبارات الآلية الشامل',
        items: [
          {
            name: 'Unit Testing (Vitest / Jest)',
            nameAr: 'اختبارات الوحدات المنفصلة',
            type: 'core',
            details: 'اختبار الدوال الخالصة (Pure Functions)، والـ Reducers، وحسابات البيانات بمعزل عن الواجهة باستخدام Vitest لسرعته الفائقة.',
            whyItMatters: 'يضمن أن منطق العمل الأساسي سليم ولا يتعطل مع أي تحديثات جديدة في الكود.',
            subItems: ['describe, it, expect syntax', 'Test doubles (Mocks, Spies, Stubs)', 'Code coverage reports', 'Fast execution with Vitest'],
          },
          {
            name: 'Component Testing (React Testing Library)',
            nameAr: 'اختبار تفاعل المكونات (RTL)',
            type: 'core',
            details: 'اختبار المكونات من وجهة نظر المستخدم الحقيقي: البحث بالنصوص و Accessibility Roles (getByRole) ومحاكاة النقر والكتابة عبر userEvent.',
            whyItMatters: 'يختبر سلوك المكون كما يراه المستخدم وليس التفاصيل الداخلية، مما يجعل الاختبارات متينة.',
            subItems: ['getByRole / findByText philosophy', 'userEvent simulations', 'Testing forms & validation errors', 'Mocking API calls with MSW'],
          },
          {
            name: 'End-to-End Testing (Playwright)',
            nameAr: 'اختبارات التدفق الشامل E2E',
            type: 'recommended',
            details: 'محاكاة مستخدم حقيقي يتصفح الموقع بالكامل: تسجيل الدخول، إضافة عناصر للسلة، إتمام عملية الشراء عبر متصفحات Chromium و Firefox و WebKit الحقيقية.',
            whyItMatters: 'خط الدفاع الأخير للتأكد من أن جميع أجزاء النظام (فرونت وباك إند) تعمل معًا بانسجام تام.',
            subItems: ['Browser automation tests', 'Cross-browser testing (Chrome, Safari, Firefox)', 'Page object model pattern', 'CI pipeline automated testing'],
          },
        ],
      },
      {
        id: 'branch-perf-security',
        title: 'Web Vitals & Security',
        titleAr: 'الأداء الفائق وأمان الويب',
        items: [
          {
            name: 'Core Web Vitals & Optimization',
            nameAr: 'مؤشرات الأداء الحيوية Core Web Vitals',
            type: 'core',
            details: 'تحسين مقاييس جوجل الرسمية: LCP (سرعة أكبر عنصر)، و INP (زمن الاستجابة للنقر)، و CLS (استقرار التنسيق)، وتقنيات الـ Code Splitting والـ Lazy Loading.',
            whyItMatters: 'المعيار المباشر لترتيب موقعك في نتائج بحث جوجل وضمان عدم مغادرة الزوار بسبب البطء.',
            subItems: ['LCP (Largest Contentful Paint) < 2.5s', 'INP (Interaction to Next Paint) < 200ms', 'CLS (Cumulative Layout Shift) < 0.1', 'Dynamic import() & Route splitting'],
          },
          {
            name: 'Web Security (OWASP)',
            nameAr: 'أمان الويب ومكافحة الثغرات',
            type: 'core',
            details: 'الحماية من ثغرات Cross-Site Scripting (XSS)، و CSRF، وسياسات مشاركة الموارد (CORS)، وضبط ترويسات Content Security Policy (CSP)، وتخزين الـ Tokens في HttpOnly Cookies.',
            whyItMatters: 'حماية بيانات المستخدمين وأسرار الجلسة من الاختراق وسرقة الحسابات.',
            subItems: ['XSS sanitization & innerHTML traps', 'CORS headers configuration', 'Content Security Policy (CSP)', 'HttpOnly & SameSite Secure Cookies'],
          },
        ],
      },
    ],
  },
];

export function FrontendRoadmapDiagram() {
  const [selectedNode, setSelectedNode] = useState<DiagramTopicItem | null>(null);
  const [filterType, setFilterType] = useState<NodeType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStageId, setActiveStageId] = useState<string>('all');
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'stage-internet': true,
    'stage-html': true,
    'stage-css': true,
    'stage-javascript': true,
    'stage-git': true,
    'stage-react': true,
    'stage-nextjs': true,
    'stage-testing-perf': true,
  });

  const toggleStageExpand = (stageId: string) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    MODERN_ROADMAP_STAGES.forEach(s => (allExpanded[s.id] = true));
    setExpandedStages(allExpanded);
  };

  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    MODERN_ROADMAP_STAGES.forEach(s => (allCollapsed[s.id] = false));
    setExpandedStages(allCollapsed);
  };

  // Filter stages and topics
  const filteredStages = useMemo(() => {
    return MODERN_ROADMAP_STAGES.filter(stage => {
      if (activeStageId !== 'all' && stage.id !== activeStageId) return false;
      return true;
    }).map(stage => {
      // Filter branches
      const filteredBranches = stage.branches.map(branch => {
        const filteredItems = branch.items.filter(item => {
          // Type filter
          if (filterType !== 'all' && item.type !== filterType) return false;

          // Search filter
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matchName = item.name.toLowerCase().includes(q);
            const matchAr = item.nameAr.toLowerCase().includes(q);
            const matchDetails = item.details.toLowerCase().includes(q);
            const matchSub = item.subItems?.some(s => s.toLowerCase().includes(q));
            return matchName || matchAr || matchDetails || matchSub;
          }
          return true;
        });

        return {
          ...branch,
          items: filteredItems,
        };
      }).filter(b => b.items.length > 0 || !searchQuery.trim());

      return {
        ...stage,
        branches: filteredBranches,
      };
    });
  }, [activeStageId, filterType, searchQuery]);

  // Color mapper helper
  const getThemeColors = (theme: DiagramStage['themeColor']) => {
    switch (theme) {
      case 'amber':
        return {
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          spineNode: 'border-amber-500 bg-amber-500/20 text-amber-300 shadow-amber-500/20',
          border: 'border-amber-500/30',
          glow: 'from-amber-500/10',
          accent: 'text-amber-400',
        };
      case 'teal':
        return {
          badge: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
          spineNode: 'border-teal-500 bg-teal-500/20 text-teal-300 shadow-teal-500/20',
          border: 'border-teal-500/30',
          glow: 'from-teal-500/10',
          accent: 'text-teal-400',
        };
      case 'cyan':
        return {
          badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          spineNode: 'border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-cyan-500/20',
          border: 'border-cyan-500/30',
          glow: 'from-cyan-500/10',
          accent: 'text-cyan-400',
        };
      case 'yellow':
        return {
          badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
          spineNode: 'border-yellow-500 bg-yellow-500/20 text-yellow-300 shadow-yellow-500/20',
          border: 'border-yellow-500/30',
          glow: 'from-yellow-500/10',
          accent: 'text-yellow-400',
        };
      case 'orange':
        return {
          badge: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
          spineNode: 'border-orange-500 bg-orange-500/20 text-orange-300 shadow-orange-500/20',
          border: 'border-orange-500/30',
          glow: 'from-orange-500/10',
          accent: 'text-orange-400',
        };
      case 'purple':
        return {
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          spineNode: 'border-purple-500 bg-purple-500/20 text-purple-300 shadow-purple-500/20',
          border: 'border-purple-500/30',
          glow: 'from-purple-500/10',
          accent: 'text-purple-400',
        };
      case 'emerald':
        return {
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          spineNode: 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-emerald-500/20',
          border: 'border-emerald-500/30',
          glow: 'from-emerald-500/10',
          accent: 'text-emerald-400',
        };
      default:
        return {
          badge: 'bg-primary/10 text-primary border-primary/30',
          spineNode: 'border-primary bg-primary/20 text-primary shadow-primary/20',
          border: 'border-primary/30',
          glow: 'from-primary/10',
          accent: 'text-primary',
        };
    }
  };

  return (
    <div className="space-y-10" dir="rtl">
      {/* 2025 Modern Control Command Center */}
      <div className="rounded-3xl border border-border/80 bg-gradient-to-b from-card via-surface/90 to-card p-6 shadow-card space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/70">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-black">
                <Workflow className="h-3.5 w-3.5" />
                <span>شجرة المسار الهندسي التفاعلية 2025</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-surface border border-border text-foreground-muted font-mono">
                8 محطات رئيسية • 85+ عقدة معرفية
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              خريطة شجرية متفرعة تربط المفاهيم والتقنيات حتى مستوى Senior
            </h3>
            <p className="text-xs sm:text-sm text-foreground-muted max-w-3xl leading-relaxed">
              تصفح شجرة المعرفة الهندسية المترابطة خطوة بخطوة. اضغط على أي فرع أو عقدة لعرض الشرح المفصل، المفاهيم المطلوبة في سوق العمل، والدروس العملية المرتبطة بها في المنصة.
            </p>
          </div>

          {/* Interactive Node Legend */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-surface/80 p-3.5 rounded-2xl border border-border text-xs font-bold shrink-0">
            <span className="text-foreground-muted flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>دليل ألوان العقد:</span>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFilterType(filterType === 'core' ? 'all' : 'core')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                  filterType === 'core'
                    ? 'bg-amber-400 text-slate-950 border-amber-500 font-black scale-105'
                    : 'bg-amber-400/20 text-amber-300 border-amber-500/40 hover:bg-amber-400/30'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span>مسار أساسي (Core)</span>
              </button>

              <button
                onClick={() => setFilterType(filterType === 'recommended' ? 'all' : 'recommended')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                  filterType === 'recommended'
                    ? 'bg-purple-600 text-white border-purple-700 font-black scale-105'
                    : 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                <span>موصى به (Recommended)</span>
              </button>

              <button
                onClick={() => setFilterType(filterType === 'alternative' ? 'all' : 'alternative')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                  filterType === 'alternative'
                    ? 'bg-teal-500 text-slate-950 border-teal-600 font-black scale-105'
                    : 'bg-teal-500/20 text-teal-300 border-teal-500/40 hover:bg-teal-500/30'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-teal-400" />
                <span>بدائل (Alternative)</span>
              </button>

              {filterType !== 'all' && (
                <button
                  onClick={() => setFilterType('all')}
                  className="text-[11px] text-foreground-muted hover:text-foreground underline pr-1"
                >
                  إلغاء التصفية
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Toolbar: Search, Stage Jump, View Toggle */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Quick Stage Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveStageId('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 ${
                activeStageId === 'all'
                  ? 'bg-primary text-black border-primary shadow-sm'
                  : 'bg-surface hover:bg-surface-hover border-border text-foreground-secondary'
              }`}
            >
              كامل الشجرة
            </button>
            {MODERN_ROADMAP_STAGES.map(stage => {
              const isActive = activeStageId === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary text-black border-primary shadow-sm font-black'
                      : 'bg-surface hover:bg-surface-hover border-border text-foreground-secondary'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{stage.order}</span>
                  <span>{stage.titleAr.split(' ')[0]} {stage.titleAr.split(' ')[1] || ''}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box + Expand / Collapse Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مفهوم، أداة، أو مصطلح..."
                className="w-full pr-10 pl-4 py-2 rounded-xl border border-border bg-surface text-xs font-sans text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-foreground-muted hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 border border-border rounded-xl p-1 bg-surface shrink-0">
              <button
                onClick={expandAll}
                className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-hover text-xs font-bold flex items-center gap-1"
                title="توسيع كافة الفروع"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">توسيع الكل</span>
              </button>
              <button
                onClick={collapseAll}
                className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-hover text-xs font-bold flex items-center gap-1"
                title="طي كافة الفروع"
              >
                <Minimize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">طي الكل</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2025 Tree Backbone & Branching Network */}
      <div className="relative space-y-12">
        {/* Continuous Central Glowing Spine (Desktop) */}
        <div
          className="hidden lg:block absolute right-1/2 translate-x-1/2 top-10 bottom-10 w-1 bg-gradient-to-b from-primary via-cyan-400 via-yellow-400 via-purple-500 to-emerald-400 rounded-full opacity-40 pointer-events-none"
          aria-hidden="true"
        />

        {/* Mobile Left/Right Spine */}
        <div
          className="lg:hidden absolute right-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-cyan-400 to-emerald-400 rounded-full opacity-30 pointer-events-none"
          aria-hidden="true"
        />

        {filteredStages.map((stage, stageIdx) => {
          const isExpanded = expandedStages[stage.id] ?? true;
          const theme = getThemeColors(stage.themeColor);
          const isEven = stageIdx % 2 === 0;

          return (
            <div
              key={stage.id}
              className="relative space-y-6 scroll-mt-24"
              id={stage.id}
            >
              {/* Stage Milestone Hub (The Junction on the Tree Trunk) */}
              <div className="flex items-center justify-between gap-4 relative z-10">
                {/* Central Milestone Pin */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`h-12 w-12 rounded-2xl border-2 flex items-center justify-center font-mono font-black text-lg shadow-lg backdrop-blur-md ${theme.spineNode}`}
                  >
                    {stage.order}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${theme.badge}`}>
                        STAGE {stage.order} • {stage.level}
                      </span>
                      {stage.articleLink && (
                        <Link
                          href={stage.articleLink}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                        >
                          <span>دخول التوثيق</span>
                          <ArrowLeft className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black text-foreground">
                      {stage.titleAr}{' '}
                      <span className="text-xs sm:text-sm font-normal text-foreground-muted font-sans mr-1">
                        ({stage.title})
                      </span>
                    </h4>
                  </div>
                </div>

                {/* Expand / Collapse Button */}
                <button
                  onClick={() => toggleStageExpand(stage.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface hover:bg-surface-hover text-xs font-bold text-foreground-secondary transition-all"
                >
                  <span>{isExpanded ? 'طي المحطة' : 'عرض الفروع'}</span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Stage Summary Description */}
              <div className="pr-14 text-xs sm:text-sm text-foreground-muted max-w-3xl leading-relaxed">
                {stage.summary}
              </div>

              {/* Branching Cards & Sub-branches Content */}
              {isExpanded && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative pt-2">
                  {stage.branches.map((branch, bIdx) => {
                    return (
                      <div
                        key={branch.id}
                        className={`rounded-3xl border ${theme.border} bg-card/80 backdrop-blur-md p-5 sm:p-6 shadow-card hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between space-y-6`}
                      >
                        {/* Branch Card Header with Tree Branch Stem Icon */}
                        <div className="space-y-3 pb-4 border-b border-border/70">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                              <span className="text-[11px] font-mono font-bold text-primary uppercase">
                                BRANCH {stage.order}.{bIdx + 1}
                              </span>
                            </div>
                            <span className="text-[11px] text-foreground-muted font-mono">
                              {branch.items.length} عقدة
                            </span>
                          </div>

                          <h5 className="text-base sm:text-lg font-black text-foreground group-hover:text-primary transition-colors">
                            {branch.titleAr}{' '}
                            <span className="text-xs font-sans font-normal text-foreground-muted block sm:inline">
                              ({branch.title})
                            </span>
                          </h5>
                          {branch.description && (
                            <p className="text-xs text-foreground-muted leading-relaxed">
                              {branch.description}
                            </p>
                          )}
                        </div>

                        {/* Interactive Tree Sub-nodes */}
                        <div className="space-y-3">
                          <span className="text-[11px] font-bold text-foreground-muted block">
                            المحاور والعقد المتفرعة (اضغط على أي عقدة للاطلاع على التفاصيل):
                          </span>

                          <div className="flex flex-wrap gap-2.5">
                            {branch.items.map((item, iIdx) => {
                              const isSelected = selectedNode?.name === item.name;

                              // Modern 2025 Roadmap Style Badges
                              let badgeStyle = '';
                              let indicatorColor = '';

                              if (item.type === 'core') {
                                badgeStyle =
                                  'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-500 font-black shadow-amber-500/20 hover:brightness-110';
                                indicatorColor = 'bg-slate-950';
                              } else if (item.type === 'recommended') {
                                badgeStyle =
                                  'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 font-bold shadow-purple-500/25 hover:brightness-110';
                                indicatorColor = 'bg-purple-200';
                              } else if (item.type === 'alternative') {
                                badgeStyle =
                                  'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 border-teal-500 font-black shadow-teal-500/20 hover:brightness-110';
                                indicatorColor = 'bg-slate-950';
                              } else {
                                badgeStyle =
                                  'bg-surface-elevated text-foreground border-border hover:bg-surface-hover';
                                indicatorColor = 'bg-primary';
                              }

                              return (
                                <button
                                  key={iIdx}
                                  onClick={() => setSelectedNode(item)}
                                  className={`group/node relative text-right transition-all transform active:scale-95 duration-150 rounded-2xl px-3.5 py-2.5 border text-xs shadow-sm flex items-center gap-2 ${badgeStyle} ${
                                    isSelected
                                      ? 'ring-4 ring-primary ring-offset-2 ring-offset-background scale-105 z-20'
                                      : 'hover:-translate-y-0.5'
                                  }`}
                                >
                                  <span className={`h-1.5 w-1.5 rounded-full ${indicatorColor} shrink-0`} />
                                  <span className="font-bold tracking-tight">{item.name}</span>

                                  {item.subItems && item.subItems.length > 0 && (
                                    <span className="h-4 px-1.5 rounded-md bg-black/25 text-[10px] flex items-center justify-center font-mono opacity-80 shrink-0">
                                      {item.subItems.length}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Branch Footer: Direct Practical Link if exists */}
                        <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-foreground-muted">
                            مسار تطبيقي عملي
                          </span>
                          <span className="text-primary font-bold flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
                            <span>استكشاف المحور</span>
                            <ArrowLeft className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Connecting Branch Indicator Between Stages */}
              {stageIdx < filteredStages.length - 1 && (
                <div className="flex justify-center pt-4 pb-2 relative z-10">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-8 w-0.5 bg-gradient-to-b from-primary to-transparent" />
                    <div className="h-8 w-8 rounded-full bg-surface border border-border shadow-md flex items-center justify-center text-primary animate-bounce">
                      <ArrowDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 2025 Ultra-Modern Glassmorphic Detail Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-card border border-border/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] flex flex-col relative overflow-hidden">
            {/* Top decorative glow */}
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-primary via-cyan-400 to-yellow-400" />

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                    {selectedNode.type === 'core'
                      ? 'مسار أساسي (Core Foundation)'
                      : selectedNode.type === 'recommended'
                      ? 'موصى به لسوق العمل (Recommended)'
                      : 'بديل حديث (Modern Alternative)'}
                  </span>
                </div>
                <h4 className="text-2xl font-black text-foreground">
                  {selectedNode.name}
                </h4>
                <p className="text-sm font-bold text-foreground-secondary">
                  {selectedNode.nameAr}
                </p>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="h-9 w-9 rounded-xl border border-border bg-surface text-foreground-muted hover:text-foreground hover:bg-surface-hover flex items-center justify-center transition-all shrink-0"
                aria-label="إغلاق النافذة"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-1 pl-1">
              {/* Detailed Explanation */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  <span>الشرح الهندسي للمفهوم:</span>
                </span>
                <div className="rounded-2xl bg-surface/80 p-4 border border-border/80 text-xs sm:text-sm text-foreground leading-relaxed">
                  {selectedNode.details}
                </div>
              </div>

              {/* Why It Matters */}
              {selectedNode.whyItMatters && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-yellow-400 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" />
                    <span>لماذا يعتبر هذا المحور مهمًا في الإنتاج؟</span>
                  </span>
                  <div className="rounded-2xl bg-yellow-500/5 p-4 border border-yellow-500/20 text-xs text-foreground-secondary leading-relaxed">
                    {selectedNode.whyItMatters}
                  </div>
                </div>
              )}

              {/* Pro Tip */}
              {selectedNode.proTip && (
                <div className="rounded-2xl bg-cyan-500/10 p-4 border border-cyan-500/25 space-y-1">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    <Flame className="h-4 w-4" />
                    <span>نصيحة المهندس للمقابلات والإنتاج:</span>
                  </span>
                  <p className="text-xs text-foreground-secondary leading-relaxed">
                    {selectedNode.proTip}
                  </p>
                </div>
              )}

              {/* Sub-items Checklist */}
              {selectedNode.subItems && selectedNode.subItems.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>المفاهيم والأدوات التي يجب أن تتقنها في هذه العقدة:</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedNode.subItems.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 p-2.5 rounded-xl border border-border bg-surface/60 text-xs text-foreground font-mono"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Lesson Link if available */}
              {selectedNode.link && (
                <div className="pt-2">
                  <Link
                    href={selectedNode.link}
                    className="flex items-center justify-between p-3.5 rounded-2xl border border-primary/40 bg-primary/10 hover:bg-primary/15 transition-all text-xs font-bold text-primary group"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{selectedNode.linkText || 'ادخل لدراسة الدرس العملي الكامل الآن'}</span>
                    </div>
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
              <span className="text-[11px] text-foreground-muted">
                خمسة برمجة • مسار الواجهات الأمامية المعتمد 2027
              </span>
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
