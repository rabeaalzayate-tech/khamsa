'use client';

import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Zap,
  Check,
  Compass,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Award,
  Layout,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface RoadmapBranch {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  learnItems: string[];
  links: Array<{ label: string; href: string }>;
}

interface MilestoneProject {
  title: string;
  subtitle: string;
  techStack: string[];
  challenge: string;
  projectLink?: { label: string; href: string };
}

interface RoadmapMilestone {
  step: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  role: string;
  roleAr: string;
  title: string;
  duration: string;
  description: string;
  prerequisites: string[];
  learningOutcomes: string[];
  accentClass: string;
  badgeClass: string;
  glowClass: string;
  branches: RoadmapBranch[];
  milestoneProject: MilestoneProject;
  nextStepPill: string;
}

const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    step: '00',
    level: 'beginner',
    role: 'Pre-Frontend Foundations',
    roleAr: 'مستكشف الويب والأساسيات',
    title: 'ما قبل الفرونت إند: كيف يعمل الويب وبيئة المطور',
    duration: 'أسبوعان',
    description:
      'قبل ما تكتب أول سطر كود أو تبدأ في React، لازم تفهم المتصفح والإنترنت بيشتغلوا إزاي في الكواليس، وتجهز أدواتك كمبرمج محترف.',
    prerequisites: [
      'جهاز كمبيوتر واتصال بالإنترنت',
      'لا يُشترط أي خبرة برمجية سابقة (نبدأ تمامًا من الصفر)',
      'الرغبة في الفهم العميق لما يدور خلف كواليس المتصفح',
    ],
    learningOutcomes: [
      'فهم مسار الطلب الكامل من كتابة الدومين حتى ظهور البكسلات على الشاشة (DNS, IP, HTTP/HTTPS)',
      'استيعاب طريقة رسم المتصفح للصفحة (DOM, CSSOM, Render Tree, Paint, Layout)',
      'التعامل السلس مع موجه الأوامر (Terminal / CLI) لإدارة الملفات والمجلدات',
      'إدارة النسخ وحماية الكود بنظام Git الاحترافي والتعاون على GitHub عبر Pull Requests',
    ],
    accentClass: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    glowClass: 'from-amber-500/20 via-amber-500/5 to-transparent',
    branches: [
      {
        id: 'web-internet',
        title: 'الإنترنت والشبكات (How the Web Works)',
        subtitle: 'فهم دورة الطلب والاستجابة',
        tag: 'مفاهيم تأسيسية',
        icon: Globe,
        learnItems: [
          'كيف يعمل الـ DNS، الـ IP، والـ Domain Name والفرق بين IPv4 و IPv6',
          'بروتوكول HTTP / HTTPS وتشفير TLS وأكواد الحالة (200, 301, 401, 404, 500)',
          'كيف يرسم المتصفح الصفحة: Critical Rendering Path، DOM و CSSOM',
          'الفرق المعماري بين الـ Client والـ Server وكيف تتخاطب الـ APIs',
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
        title: 'بيئة التطوير والتحكم بالنسخ (Tooling & Git)',
        subtitle: 'عدة الشغل اليومية للمبرمج',
        tag: 'إلزامي للعمل',
        icon: GitBranch,
        learnItems: [
          'تهيئة محرر VS Code وأهم الإضافات والاختصارات الإنتاجية',
          'استخدام الـ Terminal و CLI للتنقل وتشغيل السيرفرات وإدارة الحزم',
          'أساسيات Git: init, add, commit, branch, merge, stash, rebase',
          'رفع مشاريعك على GitHub وإدارتها عبر Pull Requests وتوثيق README احترافي',
        ],
        links: [
          { label: '1. إعداد VS Code باحتراف', href: '/articles/tooling-docs-01-vscode-setup-extensions-shortcuts' },
          { label: '2. احتراف الـ Terminal و CLI', href: '/articles/tooling-docs-02-terminal-cli-essentials' },
          { label: '3. توثيق Git الكامل', href: '/articles/tooling-docs-03-git-fundamentals-branching-merging' },
          { label: '4. GitHub و PRs و README', href: '/articles/tooling-docs-04-github-pull-requests-readme' },
        ],
      },
    ],
    milestoneProject: {
      title: 'تجهيز بيئة العمل ونشر أول مستودع Git موثق',
      subtitle: 'تطبيق عملي على التيرمينال و Git و GitHub',
      techStack: ['VS Code', 'Terminal / Bash', 'Git CLI', 'GitHub Markdown'],
      challenge:
        'إعداد بيئة عمل متكاملة، إنشاء مستودع Git محلي عبر الـ CLI، وعمل فروع مستقلة (branches)، وحل تعارض بسيط (merge conflict)، ثم رفعه على GitHub مع README احترافي يوضح خطتك التعليمية.',
      projectLink: { label: 'دليل Git و GitHub العملي', href: '/articles/git-github-practical-guide' },
    },
    nextStepPill: 'الانتقال إلى المرحلة 01: معمارية الويب والواجهات (HTML5 & Modern CSS3)',
  },
  {
    step: '01',
    level: 'beginner',
    role: 'Web Interface Developer',
    roleAr: 'مطور واجهات الويب الأساسية',
    title: 'المرحلة الأولى: معمارية الويب والواجهات المتجاوبة (HTML5 & CSS3)',
    duration: '3 – 4 أسابيع',
    description:
      'هيكل وتصميم صفحات الويب بمواصفات المعايير العالمية (WHATWG و W3C). هنا تتعلم بناء واجهات سهلة الاستخدام، متوافقة مع محركات البحث، وتعمل بانسيابية على كل الشاشات.',
    prerequisites: [
      'إكمال المحطة 00 واستخدام التيرمينال ومحرر VS Code',
      'فهم كيفية استدعاء ملفات HTML و CSS داخل المتصفح',
    ],
    learningOutcomes: [
      'بناء صفحات دلالية Semantic HTML5 متوافقة مع متطلبات الـ SEO ومعايير الوصول A11y',
      'السيطرة التامة على CSS Box Model ونماذج التدفق والتراكب (Z-Index و Stacking Context)',
      'إتقان التوزيعات أحادية البعد (Flexbox) والتوزيعات الشبكية المعقدة (CSS Grid)',
      'تصميم واجهات متجاوبة Responsive Design تعتمد فلسفة Mobile-First ونقاط التوقف',
      'تسريع التطوير وبناء واجهات عصرية متناسقة باستخدام Tailwind CSS و Design Tokens',
    ],
    accentClass: 'border-teal-500/40 bg-teal-500/10 text-teal-400',
    badgeClass: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
    glowClass: 'from-teal-500/20 via-teal-500/5 to-transparent',
    branches: [
      {
        id: 'html5-semantics',
        title: 'HTML5 الدلالي وإمكانية الوصول (Accessibility & SEO)',
        subtitle: 'الهيكل المعماري السليم للصفحة',
        tag: 'معايير دولية',
        icon: Layers,
        learnItems: [
          'العناصر الدلالية: header, nav, main, article, section, aside, footer والفرق الدقيق بينها',
          'نماذج الإدخال المعقدة: Form Validation، حقول الإدخال، accessibility labels، و autocomplete',
          'معايير الوصول A11y: أدوار ARIA، لوحة المفاتيح والـ Focus States، ودعم قارئات الشاشة',
          'تهيئة الـ Meta Tags لمحركات البحث (SEO) والـ Open Graph لشبكات التواصل الاجتماعي',
        ],
        links: [
          { label: 'توثيق HTML5 الكامل (6 دروس)', href: '/frontend/html' },
          { label: 'دليل الوسوم الأساسية للمبتدئين', href: '/articles/html-basic-tags-guide' },
          { label: 'دليل وسوم HTML المتقدمة', href: '/articles/advanced-html-tags-guide' },
        ],
      },
      {
        id: 'modern-css3-tailwind',
        title: 'هندسة CSS3 والتصميم المتجاوب و Tailwind CSS',
        subtitle: 'المظهر، التجاوب، والحركة الانسيابية',
        tag: 'تصميم عالي الجودة',
        icon: Layout,
        learnItems: [
          'فهم Box-Sizing، الهوامش المنهارة (Margin Collapse)، و Specificity في CSS',
          'احتراف Flexbox لبناء شاشات الموبايل والـ Navbars والقوائم المرنة',
          'احتراف CSS Grid لبناء شبكات المنتجات، لوحات التحكم، والـ Dashboards المعقدة',
          'تصميم متجاوب Mobile-First باستخدام Media Queries ودوال `clamp()` و `calc()`',
          'بناء واجهات إنتاجية بـ Tailwind CSS بنظام الألوان والمتغيرات والمتغيرات الداكنة (Dark Mode)',
        ],
        links: [
          { label: 'توثيق CSS3 الكامل (8 دروس)', href: '/frontend/css' },
          { label: 'أساسيات CSS للمبتدئين', href: '/articles/css-tutorial-for-beginners' },
          { label: 'احتراف Tailwind CSS وأنظمة التصميم', href: '/articles/modern-css-mastery-tailwind-design-systems-responsive-ui' },
        ],
      },
    ],
    milestoneProject: {
      title: 'بناء صفحة هبوط متجاوبة بالكامل مع Dark Mode ومعايير A11y',
      subtitle: 'مشروع متكامل يجمع HTML5 دلالي و CSS Grid و Tailwind',
      techStack: ['HTML5 Semantic', 'Modern CSS Grid', 'Tailwind CSS', 'Accessible Forms'],
      challenge:
        'بناء Landing Page احترافية متعددة الأقسام متجاوبة تمامًا من 320px إلى 2560px، تدعم لوحة المفاتيح بدون فأرة، متوافقة بنسبة 100% مع قارئات الشاشة، مع وضع ليلي/نهاري مريح.',
      projectLink: { label: 'انتقل لتوثيق HTML و CSS', href: '/frontend/html' },
    },
    nextStepPill: 'الانتقال إلى المرحلة 02: احتراف جافاسكريبت الشامل (75 درسًا + 10 مشاريع)',
  },
  {
    step: '02',
    level: 'intermediate',
    role: 'Core JavaScript Engineer',
    roleAr: 'مهندس جافاسكريبت المتقن للأساسيات',
    title: 'المرحلة الثانية: احتراف جافاسكريبت الشامل (Core JS, DOM & Event Loop)',
    duration: '6 – 8 أسابيع',
    description:
      'العمود الفقري لأي مهندس واجهات أمامية حقيقي. من غير إتقان جافاسكريبت النظيفة، ستتحول React وأي إطار عمل إلى طلاسم. هنا تتقن اللغة من محرك V8 وحتى الـ Event Loop والـ Asynchronous.',
    prerequisites: [
      'فهم جيد لـ HTML و CSS وبناء عناصر الويب (Stage 01)',
      'معرفة أساسية بمتغيرات ودوال البرمجة العامة',
    ],
    learningOutcomes: [
      'فهم عميق لكيفية تنفيذ الكود داخل محرك جافاسكريبت (Call Stack, Memory Heap, Lexical Scope, Closures)',
      'إتقان البرمجة الكائنية وتدفق الوراثة بالـ Prototype Chain و ES6 Classes',
      'التحكم الكامل في شجرة الـ DOM وتدفق الأحداث (Event Bubbling, Capturing, Delegation)',
      'احتراف البرمجة غير المتزامنة: الـ Event Loop، الـ Microtasks والـ Macrotasks، الـ Promises، والـ async/await',
      'التواصل مع السيرفر عبر Fetch API و REST APIs والتعامل الآمن مع الأخطاء واستخدام أدوات الـ Debugger',
    ],
    accentClass: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400',
    badgeClass: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    glowClass: 'from-yellow-500/20 via-yellow-500/5 to-transparent',
    branches: [
      {
        id: 'js-engine-deep',
        title: 'محرك جافاسكريبت والأساس العميق (Engine, Scope & Closures)',
        subtitle: 'أسرار ما يجري داخل الذاكرة',
        tag: 'أهم موضوع في المقابلات',
        icon: Terminal,
        learnItems: [
          'Execution Context، مراحل الإنشاء والتنفيذ، و Hoisting في المتغيرات والدوال',
          'Scope Chain، الـ Lexical Environment، والـ Closures وتطبيقاتها في الخصوصية وحفظ الحالة',
          'سلوك الكلمة المفتاحية `this` والربط الصريح (call, apply, bind) وسلوك Arrow Functions',
          'الكائنات و Prototype Chain و Prototypal Inheritance وفئات ES6 الحديثة',
        ],
        links: [
          { label: 'توثيق JavaScript الكامل (75 درسًا)', href: '/frontend/javascript' },
          { label: 'المرحلة 01: أساسيات اللغة والبيانات', href: '/frontend/javascript#phase-01' },
          { label: 'المرحلة 06: الكائنات والـ Prototypes', href: '/frontend/javascript#phase-06' },
          { label: 'المرحلة 08: جافاسكريبت المتقدمة والـ Closures', href: '/frontend/javascript#phase-08' },
        ],
      },
      {
        id: 'js-dom-events',
        title: 'الـ DOM وهندسة الأحداث (DOM Manipulation & Events)',
        subtitle: 'التفاعل المباشر مع واجهة المستخدم',
        tag: 'أساس بناء الـ UI',
        icon: Code2,
        learnItems: [
          'شجرة الـ DOM والفرق بين Node و Element وطرق البحث والتعديل السريعة',
          'دورة حياة الأحداث: Event Capturing و Event Target و Event Bubbling',
          'نمط Event Delegation لإدارة أحداث مئات العناصر بكفاءة وسرعة فائقة',
          'إدارة النماذج والـ Form Events وتفادي إعادة تحميل الصفحة الافتراضية',
        ],
        links: [
          { label: 'المرحلة 09: الـ DOM وتدفق الأحداث', href: '/frontend/javascript#phase-09' },
          { label: 'دليل تتبع وإصلاح أخطاء جافاسكريبت', href: '/articles/javascript-debugging-errors-guide' },
        ],
      },
      {
        id: 'js-async-eventloop',
        title: 'البرمجة غير المتزامنة والـ Event Loop و Fetch API',
        subtitle: 'إدارة العمليات الشبكية والـ Asynchronous',
        tag: 'لبّ الويب الحديث',
        icon: Zap,
        learnItems: [
          'كيف تتعامل جافاسكريبت الأحادية الخيط مع العمليات المتزامنة وغير المتزامنة',
          'تشريح الـ Event Loop: Call Stack، Microtask Queue (Promises)، و Macrotask Queue (Timer)',
          'بناء الـ Promises والتعامل مع حالاتها (Pending, Fulfilled, Rejected) وسلسلة `.then()`',
          'كتابة كود نظيف مقروء بـ `async/await` وإدارة الأخطاء الشاملة بـ `try/catch/finally`',
          'استدعاء البيانات من السيرفر عبر Fetch API وإلغاء الطلبات بـ `AbortController`',
        ],
        links: [
          { label: 'المرحلة 10: البرمجة غير المتزامنة والـ Event Loop', href: '/frontend/javascript#phase-10' },
          { label: 'المرحلة 11: جافاسكريبت الحديثة و Browser APIs', href: '/frontend/javascript#phase-11' },
          { label: 'دليل جافاسكريبت الحديثة ES6+ الشامل', href: '/articles/modern-javascript-comprehensive-guide-es6-async' },
        ],
      },
    ],
    milestoneProject: {
      title: 'إنجاز المشاريع العشرة التطبيقية المكتملة في التوثيق (P01 – P10)',
      subtitle: 'تطبيقات عملية نقدية من كود الـ Vanilla JS الخالص بدون أي مكتبات',
      techStack: ['Vanilla JS (ES6+)', 'DOM API', 'Event Delegation', 'Async/Fetch', 'LocalStorage'],
      challenge:
        'بناء 10 مشاريع حقيقية متدرجة الصعوبة: من نظام تبديل الأنماط والـ Modals وحتى تطبيق إدارة مهام Kanban تفاعلي وتطبيق SPA مصغر مع تخزين محلي وتزامن كامل.',
      projectLink: { label: 'استعرض المشاريع العشرة في قسم جافاسكريبت', href: '/frontend/javascript#projects' },
    },
    nextStepPill: 'الانتقال إلى المرحلة 03: توثيق React.js الكامل (10 فصول بالعامية المصرية)',
  },
  {
    step: '03',
    level: 'intermediate',
    role: 'React Frontend Engineer',
    roleAr: 'مهندس واجهات متخصص في React.js',
    title: 'المرحلة الثالثة: توثيق React.js الكامل ومنظومة الـ Hooks (React 19)',
    duration: '6 – 8 أسابيع',
    description:
      'الانتقال من كتابة جافاسكريبت التقليدية لبناء تطبيقات أحادية الصفحة (SPA) معقدة وقابلة للتوسع. منهج React الكامل المكون من 10 فصول مكتوب بأسلوب عملي عميق بالعامية المصرية.',
    prerequisites: [
      'فهم قوي لـ ES6+ (Destructuring, Spread, Arrow Functions, Array Methods)',
      'فهم الـ Closures والـ Async/Await وتدفق الأحداث في DOM (Stage 02)',
    ],
    learningOutcomes: [
      'فهم معمارية React الداخلية: Virtual DOM ومحرك React Fiber وآلية الـ Reconciliation',
      'إتقان منظومة الـ Hooks: `useState`, `useEffect`, `useRef`, `useReducer`, `useMemo`, `useCallback`',
      'بناء Custom Hooks لإعادة استخدام منطق الحالة (Business Logic) عبر التطبيق',
      'إدارة الحالة العامة والتخلص من الـ Prop Drilling باستخدام Context API و Zustand',
      'بناء نماذج إدخال معقدة وسريعة مع التحقق المتقدم بـ React Hook Form و Zod',
      'إدارة حالة السيرفر والـ Caching والتحديثات المتفائلة بـ TanStack Query (React Query)',
      'مواكبة مميزات وتحديثات React 19 والتحسينات المتقدمة للأداء وتفادي إعادة الرندر',
    ],
    accentClass: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
    badgeClass: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    glowClass: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
    branches: [
      {
        id: 'react-core-hooks',
        title: 'توثيق React.js (الفصول 1 إلى 7): الأساس، المكونات، والـ Hooks',
        subtitle: 'المفاهيم الجوهرية من الصفر للاحتراف',
        tag: 'منهج React المتكامل',
        icon: Code2,
        learnItems: [
          'الفصل 1–2: مقدمة React، Virtual DOM، Fiber، قواعد JSX، الـ Props، وتكوين المكونات (Composition)',
          'الفصل 3–4: إدارة الـ State، الـ Immutability، دورة إعادة الرندر، الـ Events، والقوائم والـ Keys',
          'الفصل 5: الـ Side Effects، دورة حياة المكون بـ `useEffect`، وظيفة الـ Cleanup، و `AbortController`',
          'الفصل 6: أدوات التحكم المتقدمة: `useRef`، وإدارة الحالات المعقدة بـ `useReducer`، وحفظ الحسابات بـ `useMemo`',
          'الفصل 7: بناء Custom Hooks ومشاركة الحالة عبر التطبيق بـ Context API',
        ],
        links: [
          { label: 'فهرس توثيق React.js الكامل (10 فصول)', href: '/frontend/react' },
          { label: 'الفصل 1: المكونات و Virtual DOM', href: '/articles/react-docs-01-intro-components-virtual-dom' },
          { label: 'الفصل 5: useEffect ودورة الحياة', href: '/articles/react-docs-05-useeffect-lifecycle-data-fetching' },
          { label: 'دليل React Hooks العملي للمبتدئين', href: '/articles/react-hooks-beginners-guide' },
        ],
      },
      {
        id: 'react-ecosystem-prod',
        title: 'توثيق React.js (الفصول 8 إلى 10): منظومة الإنتاج والأداء',
        subtitle: 'النماذج، التوجيه، وإدارة بيانات السيرفر',
        tag: 'جاهزية الشركات',
        icon: BookOpen,
        learnItems: [
          'الفصل 8: بناء النماذج بكفاءة قصوى عبر React Hook Form والتحقق الصارم بـ Zod Schemas',
          'الفصل 9: التوجيه في تطبيقات الـ SPA بـ React Router وإدارة بيانات السيرفر بـ TanStack Query',
          'الفصل 10: معمارية الأداء الفائق: Profiler، Lazy Loading & Suspense، Error Boundaries، وتحديثات React 19',
        ],
        links: [
          { label: 'الفصل 8: النماذج والتحقق بـ RHF و Zod', href: '/articles/react-docs-08-forms-validation-rhf-zod' },
          { label: 'الفصل 9: React Router و TanStack Query', href: '/articles/react-docs-09-routing-and-tanstack-query' },
          { label: 'الفصل 10: معمارية الأداء وتحديثات React 19', href: '/articles/react-docs-10-performance-architecture-react-19' },
          { label: 'دليل معماريات React 19 والـ Server Actions', href: '/articles/react-19-architecture-deep-dive-server-actions' },
        ],
      },
    ],
    milestoneProject: {
      title: 'بناء منصة تفاعلية لإدارة المشاريع مع سلة تسوق وإدارة حالة معقدة',
      subtitle: 'تطبيق SPA متكامل مع TanStack Query و React Hook Form و Zod',
      techStack: ['React 19', 'TanStack Query v5', 'React Hook Form', 'Zod', 'Tailwind CSS'],
      challenge:
        'بناء تطبيق تفاعلي معقد يتعامل مع واجهات API حقيقية، يدعم التخزين المؤقت للبيانات، والفلترة الفورية، ونماذج تحقق صارمة بدون إعادة رندر زائدة، مع معالجة راقية لحالات التحميل والأخطاء.',
      projectLink: { label: 'ابدأ دراسة توثيق React.js الآن', href: '/frontend/react' },
    },
    nextStepPill: 'الانتقال إلى المرحلة 04: بيئة الإنتاج Full-Stack و Next.js و TypeScript',
  },
  {
    step: '04',
    level: 'advanced',
    role: 'Next.js & Full-Stack Specialist',
    roleAr: 'متخصص تطبيقات Next.js والإنتاج السحابي',
    title: 'المرحلة الرابعة: بيئة الإنتاج Full-Stack و Next.js و TypeScript',
    duration: '4 – 6 أسابيع',
    description:
      'المعيار الأول لشركات التكنولوجيا في مصر والخليج والعالم. هنا تتعلم الجمع بين قوة React وسرعة السيرفر والأمان عبر Next.js App Router وحماية الكود بنظام TypeScript الصارم.',
    prerequisites: [
      'إتقان React.js ومفاهيم الـ Hooks وإدارة الحالة (Stage 03)',
      'فهم كيفية تخاطب السيرفر والعميل عبر بروتوكول HTTP',
    ],
    learningOutcomes: [
      'إتقان لغة TypeScript: الأنواع الصارمة، Generics، Utility Types، وتحديد أنواع الـ Props والـ State بدقة',
      'فهم معمارية Next.js App Router والفرق بين Server Components (RSC) و Client Components',
      'استخدام أنماط الرندر الحديثة: Static Generation (SSG)، Server-Side Rendering (SSR)، و ISR',
      'تنفيذ العمليات السيرفرية بأمان عبر Server Actions وحماية المسارات بـ Next.js Middleware',
      'تهيئة محركات البحث المتقدمة (Dynamic Metadata, Open Graph, Sitemap, Robots.txt)',
      'تطبيق التوثيق وإدارة الجلسات الآمنة (Authentication بـ HttpOnly Cookies و JWT)',
      'نشر المشاريع على السحابة (Vercel / Cloudflare) وضبط متغيرات البيئة باحترافية',
    ],
    accentClass: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    glowClass: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    branches: [
      {
        id: 'typescript-strict',
        title: 'تايب سكريبت الصارمة للمشاريع الاحترافية (Strict TypeScript)',
        subtitle: 'حماية الكود وتفادي أخطاء الـ Runtime',
        tag: 'مطلب وظيفي إلزامي',
        icon: Cpu,
        learnItems: [
          'الأنواع الأساسية، الفرق بين Interface و Type Alias، و Union و Literal Types',
          'احتراف الـ Generics لبناء دوال ومكونات قابلة لإعادة الاستخدام بأمان نوعي',
          'استخدام الـ Utility Types (Partial, Pick, Omit, Record, Readonly) والـ Type Narrowing',
          'تحديد أنواع الـ Props والـ Events والـ Hooks ومستودعات البيانات داخل React',
        ],
        links: [
          { label: 'دليل TypeScript الشامل للإنتاج', href: '/articles/comprehensive-typescript-guide-types-generics-patterns' },
        ],
      },
      {
        id: 'nextjs-app-router',
        title: 'Next.js App Router ومعمارية السيرفر (RSC & Server Actions)',
        subtitle: 'أعلى أداء وأفضل توافق مع محركات البحث SEO',
        tag: 'معيار الشركات الحديثة',
        icon: Rocket,
        learnItems: [
          'معمارية React Server Components (RSC): متى تستخدم Server ومحتوى Client',
          'استراتيجيات التحميل والرندر: SSR، SSG، ISR، و Streaming مع Suspense',
          'استبدال واجهات الـ REST البسيطة بـ Server Actions مع معالجة البيانات على السيرفر',
          'تحسين محركات البحث الديناميكي: توليد Metadata و Open Graph تلقائيًا',
        ],
        links: [
          { label: 'دليل Next.js App Router الشامل للإنتاج', href: '/articles/nextjs-app-router-engineering-guide-production-performance' },
        ],
      },
      {
        id: 'auth-security-deploy',
        title: 'التوثيق الآمن وإدارة الجلسات والنشر السحابي',
        subtitle: 'Authentication, Security & Production Deployment',
        tag: 'مستوى الإنتاج الحقيقي',
        icon: ShieldCheck,
        learnItems: [
          'إدارة الجلسات الآمنة باستخدام JWT والـ HttpOnly Cookies وتفادي ثغرات التخزين',
          'حماية المسارات وحظر الوصول غير المصرح به باستخدام Next.js Middleware',
          'إعداد خطوط النشر السحابي على Vercel وضبط متغيرات البيئة (Production Env Vars)',
        ],
        links: [
          { label: 'مقارنة أمان JWT: التخزين في Cookies أم LocalStorage', href: '/articles/jwt-storage-localstorage-vs-httponly-cookies' },
          { label: 'دليل النشر المجاني للمشاريع على السيرفرات', href: '/articles/web-deployment-free-guide' },
        ],
      },
    ],
    milestoneProject: {
      title: 'بناء متجر إلكتروني / مدونة تقنية Full-Stack بـ Next.js و TypeScript',
      subtitle: 'تطبيق إنتاجي متكامل مع Server Actions و Auth و SEO كامل',
      techStack: ['Next.js 15 (App Router)', 'TypeScript Strict', 'Server Actions', 'Auth / Cookies', 'Vercel Deployment'],
      challenge:
        'بناء تطبيق Full-Stack كامل يدعم الرندر السيرفري (SSR) وتوليد الصفحات الثابتة (SSG)، مع نظام توثيق مستخدمين آمن، ولوحة تحكم لإدارة المحتوى، مع تحقيق درجة 95+ في فحص أداء ومؤشرات SEO.',
      projectLink: { label: 'اقرأ دليل Next.js App Router للإنتاج', href: '/articles/nextjs-app-router-engineering-guide-production-performance' },
    },
    nextStepPill: 'الانتقال إلى المرحلة 05: مستوى مهندس البرمجيات، المعمارية، والمشروع النهائي',
  },
  {
    step: '05',
    level: 'advanced',
    role: 'Senior Frontend Engineer',
    roleAr: 'مهندس واجهات محترف (Senior Engineer & Tech Lead)',
    title: 'المرحلة الخامسة: مستوى مهندس البرمجيات، المعمارية والمشروع النهائي',
    duration: 'مستمر (Ongoing Excellence)',
    description:
      'المرحلة التي تفصل بين من يكتب كودًا يعمل فقط، ومهندس برمجيات حقيقي قادر على قيادة فرق العمل، وتصميم معماريات ضخمة مستقرة، وضمان الجودة والاختبارات والأمان الفائق.',
    prerequisites: [
      'خبرة في بناء وتطوير تطبيقات Next.js و React و TypeScript كاملة (Stage 04)',
      'الرغبة في الانتقال إلى مصاف المطورين المحترفين في كبرى الشركات العالمية',
    ],
    learningOutcomes: [
      'تنظيم المشاريع الضخمة وفق معمارية Feature-Sliced Design (FSD) ومبادئ Clean Code و SOLID',
      'كتابة اختبارات آلية شاملة: Unit & Integration بـ Vitest، واختبارات المكونات بـ Testing Library، و E2E بـ Playwright',
      'قياس وتحسين مؤشرات الأداء الحيوية للويب Core Web Vitals (LCP, INP, CLS) وتحليل حجم الحزم (Bundle Splitting)',
      'تأمين تطبيقات الويب الأمامية ضد ثغرات OWASP Top 10 مثل XSS و CSRF و Clickjacking وتهيئة الـ CSP',
      'إعداد خطوط التكامل والنشر المستمر CI/CD عبر GitHub Actions لفحص الكود تلقائيًا',
      'بناء Portfolio شخصي استثنائي، وتجاوز المقابلات الفنية الصعبة في كبرى شركات مصر والخليج والعالم',
    ],
    accentClass: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
    badgeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    glowClass: 'from-purple-500/20 via-purple-500/5 to-transparent',
    branches: [
      {
        id: 'arch-clean-code',
        title: 'المعمارية الحديثة ومبادئ الكود النظيف (Architecture & SOLID)',
        subtitle: 'هندسة كود قابل للصيانة والتوسع مع نمو الفريق',
        tag: 'مستوى القيادة الهندسية',
        icon: Gauge,
        learnItems: [
          'تنظيم ملفات ومجلدات المشاريع بمعمارية Feature-Based ومعمارية Feature-Sliced Design (FSD)',
          'تطبيق مبادئ SOLID الخمسة ومبادئ DRY و KISS و YAGNI في تصميم مكونات الواجهة',
          'تصميم واستخدام مكتبات المكونات وأنظمة التصميم (Design Systems) بمكونات Headless UI',
          'إدارة الحالة العامة للمشاريع المعقدة وتفادي الفوضى باستخدام معايير واضحة',
        ],
        links: [
          { label: 'معمارية الفرونت إند الحديثة وإدارة الحالة', href: '/articles/modern-frontend-architecture-state-management-component-design' },
          { label: 'دليل الكود النظيف ومبادئ SOLID وأنماط التصميم', href: '/articles/clean-code-solid-design-patterns-practical-guide' },
        ],
      },
      {
        id: 'qa-testing-automation',
        title: 'الاختبارات الآلية وضمان الجودة (QA & Automated Testing)',
        subtitle: 'حماية النظام من الانهيار وثقة كاملة في كل Deploy',
        tag: 'معيار الشركات العالمية',
        icon: ShieldCheck,
        learnItems: [
          'أنواع الاختبارات: هرم الاختبارات (Unit, Integration, End-to-End)',
          'كتابة اختبارات الدوال الصافية والمنطق البرمجي السريع باستخدام Vitest / Jest',
          'اختبار تفاعل المستخدم والمكونات باستخدام React Testing Library و Mock Service Worker (MSW)',
          'اختبار سيناريوهات المستخدم الكاملة والمسارات الحساسة E2E باستخدام Playwright',
        ],
        links: [
          { label: 'دليل الاختبارات البرمجية الشامل Unit & Integration & E2E', href: '/articles/complete-software-testing-guide-unit-integration-e2e' },
        ],
      },
      {
        id: 'perf-cwv-security',
        title: 'الأداء الفائق وأمان الويب (Performance & Web Security)',
        subtitle: 'سرعة البرق وحماية البيانات من الاختراق',
        tag: 'معايير النخبة',
        icon: Rocket,
        learnItems: [
          'تحسين مقاييس Core Web Vitals الثلاثة: LCP (سرعة التحميل)، INP (سرعة الاستجابة)، و CLS (ثبات التصميم)',
          'تحليل حجم الحزمة واستبعاد المكتبات الثقيلة عبر Code Splitting و Dynamic Imports و Tree Shaking',
          'تأمين الواجهات ضد أشهر ثغرات الويب: XSS (Cross-Site Scripting)، CSRF، و Clickjacking',
          'تطبيق سياسة أمان المحتوى الصارمة Content Security Policy (CSP) وحماية الـ Headers',
        ],
        links: [
          { label: 'تحسين الأداء و Core Web Vitals ومؤشرات السرعة', href: '/articles/web-performance-core-web-vitals-speed-optimization' },
          { label: 'دليل أمان الويب ومعايير OWASP Top 10 للمطورين', href: '/articles/web-security-developer-guide-owasp-top-10' },
        ],
      },
      {
        id: 'career-portfolio-interviews',
        title: 'المسار المهني، الـ Portfolio ومقابلات التوظيف التقنية',
        subtitle: 'من مرحلة التعلم إلى الحصول على أفضل العروض الوظيفية',
        tag: 'سوق العمل والتوظيف',
        icon: Briefcase,
        learnItems: [
          'بناء 2 إلى 3 مشاريع واقعية منشورة ذات قيمة إنتاجية بدل المشاريع التقليدية المكررة',
          'استخدام أدوات الذكاء الاصطناعي (Claude Code / Cursor) لرفع الإنتاجية بدون الإضرار بجودة الأساسيات',
          'التحضير للمقابلات التقنية المعقدة في مصر والخليج: Live Coding، أسئلة المعمارية، وأسئلة حل المشكلات',
        ],
        links: [
          { label: 'بناء أول مشروع احترافي للـ Portfolio الشخصي', href: '/articles/build-first-programming-project-portfolio' },
          { label: 'أسئلة انترفيو البرمجة في مصر والخليج 2027', href: '/articles/programming-interview-questions-egypt-gulf-2027' },
        ],
      },
    ],
    milestoneProject: {
      title: 'مشروع التخرج النهائي الكبير (The Capstone Engineering Project)',
      subtitle: 'مشروع الإنتاج الحقيقي الذي يثبت أهليتك الهندسية أمام أي شركة كبرى',
      techStack: [
        'Next.js 15 App Router',
        'TypeScript Strict Mode',
        'React 19 & TanStack Query',
        'Feature-Sliced Design',
        'Automated Tests (Vitest & Playwright)',
        'Core Web Vitals 95+',
        'OWASP Security & CSP',
        'CI/CD GitHub Actions',
      ],
      challenge:
        'بناء منصة SaaS سحابية أو منصة تجارة إلكترونية عالمية متكاملة، مبنية بمعمارية نظيفة، مغطاة باختبارات Unit و E2E، مع زمن استجابة فائق وحماية أمنية صارمة، ونشر مؤتمت عبر CI/CD.',
      projectLink: { label: 'استعرض دليل بناء مشاريع الـ Portfolio الاحترافية', href: '/articles/build-first-programming-project-portfolio' },
    },
    nextStepPill: 'مبروك! لقد وصلت إلى مرحلة المهندس المحترف الجاهز لسوق العمل العالمي',
  },
];

export function FrontendRoadmapTree() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    '00': true,
    '01': true,
    '02': true,
    '03': true,
    '04': true,
    '05': true,
  });
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [currentStageBookmark, setCurrentStageBookmark] = useState<string>('00');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const storedCompleted = window.localStorage.getItem('khamsa_frontend_roadmap_completed_stages');
      if (storedCompleted) {
        const parsed = JSON.parse(storedCompleted);
        if (Array.isArray(parsed)) {
          setCompletedStages(parsed);
        }
      }
      const storedBookmark = window.localStorage.getItem('khamsa_frontend_roadmap_current_stage');
      if (storedBookmark) {
        setCurrentStageBookmark(storedBookmark);
      }
    } catch {
      // Graceful fallback if storage is restricted
    }
  }, []);

  const toggleStageExpand = (step: string) => {
    setExpandedStages(prev => ({ ...prev, [step]: !prev[step] }));
  };

  const expandAll = () => {
    setExpandedStages({
      '00': true,
      '01': true,
      '02': true,
      '03': true,
      '04': true,
      '05': true,
    });
  };

  const collapseAll = () => {
    setExpandedStages({
      '00': false,
      '01': false,
      '02': false,
      '03': false,
      '04': false,
      '05': false,
    });
  };

  const toggleStageCompletion = (step: string) => {
    const isCompleted = completedStages.includes(step);
    const updated = isCompleted ? completedStages.filter(s => s !== step) : [...completedStages, step];
    setCompletedStages(updated);
    try {
      window.localStorage.setItem('khamsa_frontend_roadmap_completed_stages', JSON.stringify(updated));
    } catch {
      // Storage unavailable or quota exceeded
    }
  };

  const setStageAsCurrent = (step: string) => {
    setCurrentStageBookmark(step);
    try {
      window.localStorage.setItem('khamsa_frontend_roadmap_current_stage', step);
    } catch {
      // Storage unavailable or quota exceeded
    }
    // Smooth scroll to stage element
    const elem = document.getElementById(`stage-${step}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredMilestones = ROADMAP_MILESTONES.filter(milestone => {
    if (activeFilter === 'all') return true;
    return milestone.level === activeFilter;
  });

  const completionPercent = Math.round((completedStages.length / ROADMAP_MILESTONES.length) * 100);

  return (
    <section id="roadmap" className="space-y-12" dir="rtl">
      {/* Roadmap Navigation Bar & Progress Header */}
      <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/70">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-bold">
              <Compass className="h-3.5 w-3.5" />
              <span>خارطة طريق هندسة الفرونت إند 2027 • مسار معتمد وشامل</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              خارطة الطريق الكاملة: من الصفر إلى Senior Frontend Engineer
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted max-w-3xl leading-relaxed">
              منهج عملي منظم بالعامية المصرية يربط بين الفهم العميق للأساسيات وتطبيقات الإنتاج الحقيقية، مع روابط مباشرة لمئات الدروس والمشاريع البرمجية.
            </p>
          </div>

          {/* Quick Stage Completion Indicator */}
          {mounted && (
            <div className="shrink-0 bg-surface/80 rounded-2xl border border-border p-4 min-w-[240px] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-foreground-secondary flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-primary" />
                  <span>مستوى إنجاز المسار</span>
                </span>
                <span className="font-mono text-primary">{completionPercent}%</span>
              </div>
              <div className="h-2 w-full bg-border/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-500 rounded-full"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-foreground-muted flex items-center justify-between">
                <span>
                  أكملت {completedStages.length} من {ROADMAP_MILESTONES.length} محطات
                </span>
                <span className="font-mono text-primary font-bold">
                  محطتك الحالية: {currentStageBookmark}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Self-Assessment "أنت فين دلوقتي؟" */}
        <div className="rounded-2xl border border-border/60 bg-surface/60 p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>مش عارف تبدأ منين؟ اختر مستواك الحالي وسنرشدك فورًا:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            <button
              onClick={() => setStageAsCurrent('00')}
              className="p-3 text-right rounded-xl border border-border bg-card hover:border-amber-500/50 hover:bg-amber-500/5 transition-all group"
            >
              <div className="text-xs font-bold text-foreground group-hover:text-amber-400 flex items-center justify-between">
                <span>مبتدئ تمامًا من الصفر</span>
                <ArrowLeft className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
              </div>
              <p className="text-[11px] text-foreground-muted mt-1 leading-normal">
                ابدأ من المرحلة 00 لفهم كيف يعمل الويب والتيرمينال و Git.
              </p>
            </button>

            <button
              onClick={() => setStageAsCurrent('01')}
              className="p-3 text-right rounded-xl border border-border bg-card hover:border-teal-500/50 hover:bg-teal-500/5 transition-all group"
            >
              <div className="text-xs font-bold text-foreground group-hover:text-teal-400 flex items-center justify-between">
                <span>عارف الأساسيات وعايز أتقن التصميم</span>
                <ArrowLeft className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
              </div>
              <p className="text-[11px] text-foreground-muted mt-1 leading-normal">
                انتقل للمرحلة 01 لإتقان HTML5 الدلالي، CSS Grid، و Tailwind.
              </p>
            </button>

            <button
              onClick={() => setStageAsCurrent('02')}
              className="p-3 text-right rounded-xl border border-border bg-card hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all group"
            >
              <div className="text-xs font-bold text-foreground group-hover:text-yellow-400 flex items-center justify-between">
                <span>عايز أفهم جافاسكريبت الحقيقية</span>
                <ArrowLeft className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
              </div>
              <p className="text-[11px] text-foreground-muted mt-1 leading-normal">
                المرحلة 02: 75 درسًا في محرك JS والـ Event Loop و 10 مشاريع عملية.
              </p>
            </button>

            <button
              onClick={() => setStageAsCurrent('03')}
              className="p-3 text-right rounded-xl border border-border bg-card hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group"
            >
              <div className="text-xs font-bold text-foreground group-hover:text-cyan-400 flex items-center justify-between">
                <span>متمكن من JS ومستعد لـ React</span>
                <ArrowLeft className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
              </div>
              <p className="text-[11px] text-foreground-muted mt-1 leading-normal">
                المرحلة 03: توثيق React الكامل (10 فصول) ومنظومة الـ Hooks و React 19.
              </p>
            </button>
          </div>
        </div>

        {/* Filter and View Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Stage Jump Pill Links */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {ROADMAP_MILESTONES.map(m => {
              const isCurrent = currentStageBookmark === m.step;
              const isDone = completedStages.includes(m.step);
              return (
                <button
                  key={m.step}
                  onClick={() => setStageAsCurrent(m.step)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-bold ${
                    isCurrent
                      ? 'border-primary bg-primary/15 text-primary shadow-sm'
                      : 'border-border bg-surface hover:bg-card text-foreground-secondary hover:text-foreground'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <span className="font-mono text-[11px] opacity-70">{m.step}</span>
                  )}
                  <span>{m.role}</span>
                </button>
              );
            })}
          </div>

          {/* Level Filter & Expand Buttons */}
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-xl border border-border bg-surface p-1 text-xs">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  activeFilter === 'all' ? 'bg-primary text-black' : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => setActiveFilter('beginner')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  activeFilter === 'beginner' ? 'bg-primary text-black' : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                مبتدئ
              </button>
              <button
                onClick={() => setActiveFilter('intermediate')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  activeFilter === 'intermediate' ? 'bg-primary text-black' : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                متوسط
              </button>
              <button
                onClick={() => setActiveFilter('advanced')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  activeFilter === 'advanced' ? 'bg-primary text-black' : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                متقدم
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-xs">
              <button
                onClick={expandAll}
                className="px-2.5 py-1 rounded-lg border border-border hover:border-primary/40 text-foreground-muted hover:text-foreground font-bold transition-colors"
              >
                فتح الكل
              </button>
              <button
                onClick={collapseAll}
                className="px-2.5 py-1 rounded-lg border border-border hover:border-primary/40 text-foreground-muted hover:text-foreground font-bold transition-colors"
              >
                طي الكل
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Spine + Branching Timeline */}
      <div className="relative pr-6 sm:pr-0">
        {/* Continuous Spine Line */}
        <div
          aria-hidden="true"
          className="absolute top-6 bottom-6 right-3 sm:right-1/2 sm:translate-x-1/2 w-0.5 bg-gradient-to-b from-amber-500/70 via-cyan-500/70 to-purple-500/70"
        />

        <div className="space-y-16">
          {filteredMilestones.map((milestone, mIndex) => {
            const isExpanded = expandedStages[milestone.step] !== false;
            const isCompleted = completedStages.includes(milestone.step);
            const isCurrentBookmark = currentStageBookmark === milestone.step;

            return (
              <div
                key={milestone.step}
                id={`stage-${milestone.step}`}
                className="relative space-y-6 scroll-mt-24"
              >
                {/* Central Milestone Node */}
                <div className="relative flex flex-col sm:items-center">
                  {/* Step Circle Node */}
                  <div
                    className={`absolute -right-6 sm:static h-9 w-9 sm:h-14 sm:w-14 rounded-2xl border-2 ${
                      milestone.accentClass
                    } font-mono font-black text-xs sm:text-base flex items-center justify-center shadow-lg z-10 bg-background ${
                      isCurrentBookmark ? 'ring-4 ring-primary/20 scale-105' : ''
                    }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5 text-primary" /> : milestone.step}
                  </div>

                  {/* Milestone Card Header */}
                  <div className="sm:mt-4 w-full max-w-4xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-card relative z-10 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={`border font-mono text-[11px] font-bold ${milestone.badgeClass}`}>
                          {milestone.role}
                        </Badge>
                        <Badge variant="secondary" className="text-[11px] font-bold">
                          المستوى: {milestone.roleAr}
                        </Badge>
                        <Badge variant="secondary" className="text-[11px] font-bold">
                          المدة المتوقعة: {milestone.duration}
                        </Badge>
                      </div>

                      {/* Interactive Stage Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setStageAsCurrent(milestone.step)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors ${
                            isCurrentBookmark
                              ? 'bg-primary/15 text-primary border-primary/30'
                              : 'bg-surface hover:bg-card border-border text-foreground-muted hover:text-foreground'
                          }`}
                          title="تحديد كمحطة حالية"
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                          <span>{isCurrentBookmark ? 'محطتك الحالية' : 'أنا هنا الآن'}</span>
                        </button>

                        <button
                          onClick={() => toggleStageCompletion(milestone.step)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors ${
                            isCompleted
                              ? 'bg-primary text-black border-primary'
                              : 'bg-surface hover:bg-card border-border text-foreground-muted hover:text-foreground'
                          }`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>{isCompleted ? 'مكتمل' : 'تحديد كمكتمل'}</span>
                        </button>

                        <button
                          onClick={() => toggleStageExpand(milestone.step)}
                          className="p-1.5 rounded-xl border border-border hover:border-primary/40 text-foreground-muted hover:text-foreground transition-colors"
                          aria-label={isExpanded ? 'طي المحطة' : 'فتح المحطة'}
                        >
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-foreground">
                        {milestone.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed mt-1.5">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Prerequisites and Learning Outcomes Callout (Collapsible / Visible) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {/* Prerequisites */}
                      <div className="rounded-2xl border border-border/70 bg-surface/70 p-4 space-y-2">
                        <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5 text-primary" />
                          <span>المتطلبات السابقة (Prerequisites):</span>
                        </span>
                        <ul className="space-y-1.5 text-xs text-foreground-muted">
                          {milestone.prerequisites.map((prereq, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="text-primary mt-1 font-bold">•</span>
                              <span>{prereq}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Learning Outcomes */}
                      <div className="rounded-2xl border border-border/70 bg-surface/70 p-4 space-y-2">
                        <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                          <span>ماذا ستتقن عمليًا (Outcomes):</span>
                        </span>
                        <ul className="space-y-1.5 text-xs text-foreground-muted">
                          {milestone.learningOutcomes.map((outcome, oIdx) => (
                            <li key={oIdx} className="flex items-start gap-2">
                              <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Branches Grid & Milestone Project under Stage */}
                {isExpanded && (
                  <div className="space-y-6 relative z-10 max-w-5xl mx-auto">
                    {/* Branches Cards */}
                    <div
                      className={`grid grid-cols-1 ${
                        milestone.branches.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
                      } gap-5`}
                    >
                      {milestone.branches.map(branch => {
                        const Icon = branch.icon;
                        return (
                          <div
                            key={branch.id}
                            className="rounded-3xl border border-border bg-surface/80 backdrop-blur-sm p-6 shadow-card flex flex-col justify-between gap-5 hover:border-primary/40 transition-all group"
                          >
                            <div className="space-y-4">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`h-11 w-11 rounded-2xl border flex items-center justify-center shrink-0 ${milestone.accentClass}`}
                                  >
                                    <Icon className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <span className="text-[11px] text-foreground-muted block font-medium">
                                      {branch.subtitle}
                                    </span>
                                    <h4 className="text-base font-extrabold text-foreground group-hover:text-primary transition-colors">
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
                                  المفاهيم والمهارات المستهدفة:
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

                            {/* Direct Documentation & Lesson Links */}
                            <div className="pt-4 border-t border-border/60 space-y-2">
                              <span className="text-[11px] font-bold text-foreground-muted block">
                                الدروس والمراجع المباشرة في المنصة:
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {branch.links.map(link => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background hover:bg-primary/10 border border-border hover:border-primary/40 text-xs font-bold text-foreground hover:text-primary transition-colors"
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

                    {/* Milestone Practical Project Card */}
                    <div className="rounded-3xl border border-primary/30 bg-gradient-to-r from-card via-surface to-card p-6 sm:p-7 shadow-card space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-2xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center shrink-0">
                            <Sparkles className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-[11px] font-bold text-primary block">
                              المشروع التطبيقي لمحطة ({milestone.step}):
                            </span>
                            <h4 className="text-base sm:text-lg font-black text-foreground">
                              {milestone.milestoneProject.title}
                            </h4>
                          </div>
                        </div>

                        {milestone.milestoneProject.projectLink && (
                          <Link href={milestone.milestoneProject.projectLink.href}>
                            <Button size="sm" className="gap-2 font-bold shrink-0">
                              <span>{milestone.milestoneProject.projectLink.label}</span>
                              <ArrowLeft className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                        {milestone.milestoneProject.challenge}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-[11px] font-bold text-foreground-muted">الأدوات المستعملة:</span>
                        {milestone.milestoneProject.techStack.map(tech => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-background border border-border text-[11px] font-mono text-foreground font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Road Connector between Milestones */}
                {mIndex < filteredMilestones.length - 1 && (
                  <div className="hidden sm:flex justify-center pt-2">
                    <div className="px-4 py-1.5 rounded-full bg-surface border border-border text-xs font-bold text-foreground-muted flex items-center gap-2">
                      <span>{milestone.nextStepPill}</span>
                      <ArrowLeft className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Graduation Milestone: The Final Capstone Project Section */}
      <section className="rounded-3xl border-2 border-primary/40 bg-gradient-to-b from-card via-surface to-background p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-black">
            <Award className="h-4 w-4" />
            <span>محطة التخرج الكبرى (The Final Capstone Project)</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-foreground">
            مشروع التخرج النهائي: منصة إنتاجية عالمية تثبت جدارتك الهندسية
          </h3>

          <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed max-w-3xl">
            بعد إنهاء كل المراحل من 00 إلى 05، لن تكتفي ببناء مشروع To-Do بسيط! ستجمع كل ما تعلمته في مشروع تخرج حقيقي ينافس تطبيقات الشركات الكبرى ويحتوي على كل معايير هندسة البرمجيات الحديثة.
          </p>

          {/* Capstone Checklist Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="rounded-2xl border border-border/80 bg-background/80 p-4 space-y-2">
              <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                <Rocket className="h-4 w-4" />
                <span>1. المعمارية و Full-Stack</span>
              </span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                Next.js 15 App Router، Server Components، Server Actions، و Feature-Sliced Design مع TypeScript صارم.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-background/80 p-4 space-y-2">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>2. الاختبارات الآلية (QA)</span>
              </span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                تغطية اختبارات Unit و Integration بـ Vitest، واختبارات E2E شاملة بـ Playwright تحاكي استخدام العميل الحقيقي.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-background/80 p-4 space-y-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Gauge className="h-4 w-4" />
                <span>3. الأداء والـ Core Web Vitals</span>
              </span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                مؤشر 95+ في Lighthouse مع تحسين LCP و INP و CLS وتصغير الـ Bundle و Code Splitting محكم.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-background/80 p-4 space-y-2">
              <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                <span>4. الأمان والنشر و CI/CD</span>
              </span>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                حماية OWASP كاملة (CSP, HttpOnly Cookies)، وخطوط فحص آلي بـ GitHub Actions ونشر سحابي سريع على Vercel.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Link href="/articles/build-first-programming-project-portfolio">
              <Button className="gap-2 font-bold">
                <Sparkles className="h-4 w-4" />
                <span>دليل بناء مشروع التخرج للـ Portfolio</span>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/articles/programming-interview-questions-egypt-gulf-2027">
              <Button variant="outline" className="gap-1.5 font-bold">
                <Briefcase className="h-4 w-4" />
                <span>أسئلة مقابلات العمل في مصر والخليج 2027</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
