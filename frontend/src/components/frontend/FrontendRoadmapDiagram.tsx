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
  ArrowRight,
  Check,
  CornerDownLeft,
  Flame,
  Layout,
  Filter,
  Activity,
  Radio,
  Sliders,
  TerminalSquare,
  Crosshair,
  Orbit,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export type NodeType = 'core' | 'recommended' | 'alternative' | 'optional';

export interface TechNode {
  id: string;
  code: string;
  name: string;
  nameAr: string;
  type: NodeType;
  status: 'mastered' | 'active' | 'future';
  details: string;
  whyItMatters: string;
  subItems: string[];
  proTip?: string;
  codeSnippet?: string;
  prerequisite?: string;
  nextStep?: string;
  link?: string;
  linkText?: string;
}

export interface TreeBranch {
  id: string;
  code: string;
  title: string;
  titleAr: string;
  description: string;
  nodes: TechNode[];
}

export interface TreeStage {
  id: string;
  order: string;
  code: string;
  title: string;
  titleAr: string;
  tagline: string;
  level: 'Junior Foundation' | 'Mid-Level Core' | 'Senior Architect';
  accent: 'cyan' | 'amber' | 'emerald' | 'purple' | 'blue' | 'yellow';
  summary: string;
  articleLink?: string;
  branches: TreeBranch[];
}

export const ROADMAP_2030_DATA: TreeStage[] = [
  {
    id: 'stage-01-web-core',
    order: '01',
    code: 'SYS::NET_FOUNDATION',
    title: 'Internet & Web Architecture 2030',
    titleAr: 'فيزياء الإنترنت وشبكات الويب الفائقة',
    tagline: 'الأساس الخوارزمي لحركة البيانات من السحابة حتى شاشة المستخدم',
    level: 'Junior Foundation',
    accent: 'amber',
    summary: 'فهم مسار الحزم، بروتوكولات HTTP/3 و QUIC، محركات الرندر الحرج، وشبكات الـ Edge Computing العالمية.',
    articleLink: '/frontend/html',
    branches: [
      {
        id: 'branch-01-protocols',
        code: 'MOD::NET_PROTOCOL',
        title: 'High-Speed Web Protocols',
        titleAr: 'بروتوكولات الاتصال ونقل الحزم',
        description: 'بنية نقل البيانات بدون تأخير (Zero-RTT) وتشفير TLS 1.3 المتطور',
        nodes: [
          {
            id: 'node-net-ip',
            code: 'IP::PACKET_ROUTING',
            name: 'Internet Architecture & IP Routing',
            nameAr: 'كيف يعمل الإنترنت ومسار الحزم',
            type: 'core',
            status: 'mastered',
            details: 'آلية تقسيم البيانات إلى حزم (Packets)، وتوجيهها عبر أجهزة التوجيه (Routers) ومزودي خدمة الإنترنت (ISPs)، ومسار الكابلات البحرية العالمية.',
            whyItMatters: 'فهم زمن الاستجابة (Latency) وهدر الحزم (Packet Loss) هو الأساس لتشخيص أي بطء في الواجهات الضخمة.',
            subItems: ['IPv4 & IPv6 addressing', 'TCP 3-way handshake vs UDP', 'ISP peering & BGP routing', 'Packet loss & Jitter diagnosis'],
            proTip: 'في بيئة الـ Cloud والإنتاج، تقليل عدد قفزات التوجيه (Hops) عبر CDNs يوفر مئات المللي ثانية.',
            prerequisite: 'مفاهيم الحاسوب العامة',
            nextStep: 'HTTP/2 و HTTP/3',
          },
          {
            id: 'node-http3',
            code: 'HTTP::QUIC_STREAMING',
            name: 'HTTP/2, HTTP/3 & QUIC Protocol',
            nameAr: 'بروتوكولات HTTP الحديثة و QUIC',
            type: 'core',
            status: 'mastered',
            details: 'تجاوز مشكلة Head-of-line blocking بفضل Multiplexing في HTTP/2، والانتقال إلى UDP مع HTTP/3 و QUIC لتحقيق اتصال فوري Zero-RTT.',
            whyItMatters: 'المتصفحات الحديثة تنزل الأكواد والصور بالتوازي عبر اتصال واحد دون انتظار انتهاء الطلب السابق.',
            subItems: ['Multiplexed streams in single connection', 'HTTP/3 QUIC over UDP', 'HPACK & QPACK header compression', 'Server Push & Early Hints (103)'],
            codeSnippet: `// Early Hints Header (103) for instant preloading
Link: </styles.css>; rel=preload; as=style,
      </app.js>; rel=preload; as=script`,
            prerequisite: 'أساسيات الـ IP والشبكات',
            nextStep: 'محركات المتصفح والـ CRP',
          },
          {
            id: 'node-dns-ssl',
            code: 'SEC::DNS_TLS',
            name: 'DNS Anycast & TLS 1.3 Security',
            nameAr: 'نظام DNS الموزع وتشفير TLS 1.3',
            type: 'recommended',
            status: 'active',
            details: 'نظام أسماء النطاقات الموزع Anycast DNS، وسجلات A, CNAME, ALIAS، والتشفير السحابي فائق السرعة عبر TLS 1.3 مع مفاتيح ECDSA.',
            whyItMatters: 'يضمن وصول المستخدم لأقرب سيرفر في العالم بأمان تام دون الوقوع في هجمات DNS Spoofing.',
            subItems: ['Anycast DNS resolution hierarchy', 'DNSSEC validation', 'TLS 1.3 1-RTT & 0-RTT handshakes', 'HSTS & OCSP Stapling'],
            prerequisite: 'مفاهيم بروتوكول HTTP',
            nextStep: 'الاستضافة السحابية والـ Edge',
          },
        ],
      },
      {
        id: 'branch-01-browser',
        code: 'MOD::BROWSER_INTERNALS',
        title: 'Browser Engine & Rendering Pipeline',
        titleAr: 'محرك المتصفح ومسار الرندر الحرج 2030',
        description: 'تحويل كود HTML و CSS إلى بكسلات على كارت الشاشة بمعدل 120fps',
        nodes: [
          {
            id: 'node-crp',
            code: 'ENG::CRITICAL_PATH',
            name: 'Critical Rendering Path (CRP)',
            nameAr: 'مسار الرندر الحرج ومحرك Blink',
            type: 'core',
            status: 'mastered',
            details: 'مراحل بناء الواجهة: HTML Parser -> DOM Tree -> CSSOM Tree -> Render Tree -> Layout (Reflow) -> Paint -> GPU Compositing Layers.',
            whyItMatters: 'المعيار رقم 1 لمنع تهنيج المتصفح وضمان معدل 60fps/120fps فائق السلاسة.',
            subItems: ['DOM & CSSOM Tokenization', 'Render Tree computation', 'Layout calculations & Layout thrashing', 'Compositing on GPU layers'],
            proTip: 'تجنب القراءة ثم الكتابة في الـ DOM في نفس الفريم (Layout Thrashing) واستعن بـ requestAnimationFrame.',
            prerequisite: 'أساسيات HTML و CSS',
            nextStep: 'تحسين مؤشرات Core Web Vitals',
          },
          {
            id: 'node-edge-infra',
            code: 'INFRA::EDGE_COMPUTING',
            name: 'Edge CDNs & Smart Caching',
            nameAr: 'الحوسبة الطرفية Edge وشبكات CDN',
            type: 'recommended',
            status: 'active',
            details: 'تشغيل الكود على حواف السيرفرات القريبة من المستخدم (Cloudflare Workers, Vercel Edge Runtime) وضبط ترويسات Cache-Control و Stale-While-Revalidate.',
            whyItMatters: 'تحقيق زمن استجابة عالمي يقل عن 50ms لأي زائر في العالم.',
            subItems: ['Edge computing runtime', 'Cache-Control: s-maxage & SWR', 'Purging & CDN Tag invalidation', 'Geo-routing & Anycast network'],
            prerequisite: 'استضافة الويب والـ DNS',
            nextStep: 'بنية HTML5 الدلالية',
          },
        ],
      },
    ],
  },
  {
    id: 'stage-02-semantic-web',
    order: '02',
    code: 'SYS::SEMANTIC_A11Y',
    title: 'HTML5 Semantic & Universal Accessibility (A11y)',
    titleAr: 'بنية الويب الدلالية والوصول الشامل للجميع',
    tagline: 'عظام الموقع الدلالية ومعايير الوصول العالمية لجميع البشر ومحركات الذكاء الاصطناعي',
    level: 'Junior Foundation',
    accent: 'cyan',
    summary: 'إتقان العناصر الدلالية، معايير إمكانية الوصول WCAG 2.2 AA، هياكل النماذج التفاعلية، وتجهيز صفحات الويب لقراء الشاشة ومحركات البحث الذكية.',
    articleLink: '/frontend/html',
    branches: [
      {
        id: 'branch-02-semantic',
        code: 'MOD::SEMANTIC_CORE',
        title: 'Semantic Architecture & SEO',
        titleAr: 'الهيكل الدلالي ومحركات البحث الذكية',
        description: 'بناء واجهات قابلة للفهم من قبل محركات بحث الذكاء الاصطناعي وقراء الشاشة',
        nodes: [
          {
            id: 'node-semantic-tags',
            code: 'HTML::SEMANTIC_TAGS',
            name: 'Semantic Elements Architecture',
            nameAr: 'العناصر الدلالية المتقدمة',
            type: 'core',
            status: 'mastered',
            details: 'توزيع هيكل الصفحة الدلالي بدقة: header, nav, main, section, article, aside, footer بدلاً من ظاهرة الـ Div Soup.',
            whyItMatters: 'يحدد لمحركات بحث الذكاء الاصطناعي (ChatGPT, Gemini, Perplexity) الأجزاء الحيوية في مقالك وصفحتك.',
            subItems: ['article vs section separation', 'h1..h6 hierarchical outline', 'figure & figcaption', 'nav landmark roles'],
            prerequisite: 'مفاهيم الويب الأساسية',
            nextStep: 'معايير الوصول WAI-ARIA',
          },
          {
            id: 'node-forms-modern',
            code: 'HTML::FORM_ENGINE',
            name: 'Accessible Interactive Forms',
            nameAr: 'النماذج التفاعلية الميسرة والتحقق الأصلي',
            type: 'core',
            status: 'mastered',
            details: 'بناء نماذج إدخال مؤمنة تدعم التحقق المدمج (Constraint Validation API)، وتسميات الحقول الصريحة label for/id، ومجموعات fieldset/legend.',
            whyItMatters: 'النماذج هي شريان التحويل المالي والتفاعلي في أي منصة تقنية.',
            subItems: ['Constraint Validation API (validity, setCustomValidity)', 'inputmode & autocomplete for mobile UX', 'label / id explicit binding', 'accessible error messaging'],
            prerequisite: 'أساسيات وسوم HTML',
            nextStep: 'التحكم في النماذج بـ React 19',
          },
        ],
      },
      {
        id: 'branch-02-a11y',
        code: 'MOD::A11Y_WCAG',
        title: 'Universal Accessibility (WCAG 2.2)',
        titleAr: 'إمكانية الوصول الشامل WAI-ARIA',
        description: 'تجربة مستخدم كاملة تدعم لوحة المفاتيح وقراءات الشاشة والمستخدمين ذوي الهمم',
        nodes: [
          {
            id: 'node-wai-aria',
            code: 'A11Y::ARIA_PATTERNS',
            name: 'WAI-ARIA & Keyboard Navigation',
            nameAr: 'أنماط ARIA والتنقل بلوحة المفاتيح',
            type: 'recommended',
            status: 'active',
            details: 'تطبيق سمات ARIA: role, aria-expanded, aria-controls, aria-live، وإدارة التركيز (Focus Trap) في النوافذ المنبثقة.',
            whyItMatters: 'معيار قانوني إلزامي في كبرى الشركات الأمريكية والأوروبية لضمان المساواة الرقمية وتجنب القضايا القضائية.',
            subItems: ['WCAG 2.2 AA Compliance targets', 'Keyboard navigation: Tab, Shift+Tab, Enter, Space, Escape', 'Focus Trap & Focus restoration', 'aria-live="polite" / "assertive" updates'],
            proTip: 'القاعدة الأولى لـ ARIA: لا تستخدم ARIA إذا كان هناك عنصر HTML أصلي يؤدي نفس الوظيفة.',
            prerequisite: 'بنية HTML الدلالية',
            nextStep: 'تنسيقات CSS المتجاوبة',
          },
        ],
      },
    ],
  },
  {
    id: 'stage-03-css-systems',
    order: '03',
    code: 'SYS::CSS_ENGINEERING',
    title: 'CSS3, Modern Layouts & Design Tokens',
    titleAr: 'هندسة التنسيقات والأنظمة البصرية الحديثة',
    tagline: 'منطق التنسيق الرياضي، شبكات Grid المعقدة، ونظام Tailwind CSS 4',
    level: 'Junior Foundation',
    accent: 'cyan',
    summary: 'إتقان نموذج الصندوق، خوارزميات Specificity، توزيعات Flexbox و Grid المتطورة، وأنظمة التصميم المتجاوبة مع شاشات الهواتف والشاشات العملاقة.',
    articleLink: '/frontend/css',
    branches: [
      {
        id: 'branch-03-layout',
        code: 'MOD::LAYOUT_ALGO',
        title: 'Flexbox & CSS Grid 2D Engine',
        titleAr: 'محركات التوزيع Flexbox و CSS Grid ثنائية الأبعاد',
        description: 'بناء واجهات متجاوبة معقدة دون الحاجة لأي سطر جافاسكريبت',
        nodes: [
          {
            id: 'node-css-box-model',
            code: 'CSS::BOX_SPECIFICITY',
            name: 'Box Model & Specificity Algorithm',
            nameAr: 'نموذج الصندوق وحسابات أوزان المحددات',
            type: 'core',
            status: 'mastered',
            details: 'ضبط box-sizing: border-box، وحساب أوزان المحددات (Inline > ID > Class > Element)، واستخدام طبقات الـ Cascade Layers (@layer).',
            whyItMatters: 'يمنع 90% من تداخل التنسيقات العشوائي في المشاريع الكبيرة.',
            subItems: ['box-sizing: border-box math', 'Specificity calculation formula', 'Cascade Layers (@layer)', 'Logical properties (margin-inline, padding-block)'],
            prerequisite: 'مفاهيم HTML',
            nextStep: 'Flexbox و Grid',
          },
          {
            id: 'node-flexbox-grid',
            code: 'CSS::GRID_SUBGRID',
            name: 'Advanced CSS Grid & Subgrid',
            nameAr: 'شبكات CSS Grid و Subgrid المتقدمة',
            type: 'core',
            status: 'mastered',
            details: 'توزيع شبكات ثنائية الأبعاد باستخدام repeat(auto-fit, minmax(280px, 1fr)) وتوحيد المحاذاة الداخلية عبر Subgrid.',
            whyItMatters: 'بناء لوحات تحكم (Dashboards) وقوائم بطاقات تتكيف تلقائيًا مع أي حجم شاشة بدقة بكسل واحدة.',
            subItems: ['auto-fit vs auto-fill algorithms', 'minmax() & fr dynamic units', 'CSS Subgrid for nested cards alignment', 'grid-template-areas declarative layout'],
            codeSnippet: `/* Production Responsive Grid without Media Queries */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}`,
            prerequisite: 'نموذج الصندوق (Box Model)',
            nextStep: 'Tailwind CSS 4',
          },
        ],
      },
      {
        id: 'branch-03-tailwind',
        code: 'MOD::TAILWIND_TOKENS',
        title: 'Tailwind CSS 4 & Container Queries',
        titleAr: 'نظام Tailwind CSS 4 والـ Container Queries',
        description: 'أنظمة التصميم السريعة القائمة على Design Tokens المتطورة',
        nodes: [
          {
            id: 'node-tailwind4',
            code: 'CSS::TAILWIND_V4',
            name: 'Tailwind CSS Modern Architecture',
            nameAr: 'معمارية Tailwind CSS الحديثة',
            type: 'core',
            status: 'mastered',
            details: 'فلسفة Utility-First، التكويد السريع بدون تشتت، متغيرات الثيمات في CSS، حالات group و peer، ودعم الوضع الليلي Dark Mode بدقة.',
            whyItMatters: 'المعيار الصناعي المعتمد في Vercel, Next.js, shadcn/ui وكبرى الشركات لسرعة الإنتاج الفائقة.',
            subItems: ['Utility-First methodology', 'Arbitrary variants & theme tokens', 'group-hover & peer-checked states', 'Dark mode via CSS variables & class strategy'],
            prerequisite: 'أساسيات CSS',
            nextStep: 'جافاسكريبت ومحرك V8',
          },
          {
            id: 'node-container-queries',
            code: 'CSS::CONTAINER_QUERIES',
            name: 'Container Queries (@container)',
            nameAr: 'استعلامات الحاوية (@container queries)',
            type: 'recommended',
            status: 'active',
            details: 'تكييف تصميم البطاقة بناءً على المساحة المتوفرة داخل الحاوية الأب (Parent Container) وليس عرض شاشة المتصفح بالكامل.',
            whyItMatters: 'المستقبل الحقيقي لتصميم المكونات المستقلة (Design Systems) القابلة للزرع في أي مكان بالصفحة.',
            subItems: ['@container (min-width: 400px)', 'cqw and cqh container units', 'Modular component-driven responsiveness'],
            prerequisite: 'التصميم المتجاوب بـ Media Queries',
            nextStep: 'جافاسكريبت المتقدمة',
          },
        ],
      },
    ],
  },
  {
    id: 'stage-04-js-engine',
    order: '04',
    code: 'SYS::V8_JAVASCRIPT',
    title: 'JavaScript Deep Engine & 75 Production Lessons',
    titleAr: 'محرك جافاسكريبت العميق V8 (75 درساً معتمداً)',
    tagline: 'عصب الواجهات التفاعلية: محرك V8، وإدارة الذاكرة، والـ Closures، والـ Event Loop، والـ DOM',
    level: 'Mid-Level Core',
    accent: 'yellow',
    summary: 'إتقان اللغة التي تحكم عالم الويب: الذاكرة (Stack vs Heap)، النطاقات وسياق التنفيذ، تفويض الأحداث، حلقة الأحداث (Event Loop)، والبرمجة غير المتزامنة.',
    articleLink: '/frontend/javascript',
    branches: [
      {
        id: 'branch-04-v8-memory',
        code: 'MOD::V8_INTERNALS',
        title: 'V8 Engine, Memory & Execution Context',
        titleAr: 'محرك V8 والذاكرة وسياق التنفيذ',
        description: 'كيف يترجم محرك V8 كودك إلى Machine Code وكيف يدير الذاكرة وسلسلة النطاقات',
        nodes: [
          {
            id: 'node-js-memory',
            code: 'V8::STACK_HEAP',
            name: 'Memory Model: Stack vs Heap & GC',
            nameAr: 'نموذج الذاكرة: Stack و Heap وجمع القمامة',
            type: 'core',
            status: 'mastered',
            details: 'تخزين القيم البدائية في Call Stack وتخزين الكائنات والمصفوفات في Memory Heap. خوارزمية Mark-and-Sweep لجمع القمامة (Garbage Collection).',
            whyItMatters: 'يمنع تسريبات الذاكرة (Memory Leaks) ويمنع أخطاء تعديل الكائنات بالمرجع غير المقصودة.',
            subItems: ['Primitives vs Reference types', 'Call Stack frames allocation', 'Heap memory allocation & references', 'Mark-and-Sweep garbage collection algorithm'],
            link: '/articles/js-data-types',
            linkText: 'درس JS-03: أنواع البيانات ونموذج الذاكرة بالبلدي',
            prerequisite: 'مفاهيم المتغيرات الأساسية',
            nextStep: 'الـ Closures وسياق التنفيذ',
          },
          {
            id: 'node-js-closures',
            code: 'JS::EXEC_CLOSURES',
            name: 'Execution Context & Closures',
            nameAr: 'سياق التنفيذ والـ Hoisting والـ Closures',
            type: 'core',
            status: 'mastered',
            details: 'مراحل إنشاء سياق التنفيذ (Creation Phase vs Execution Phase)، والمنطقة الميتة المؤقتة (TDZ)، وكيف تحتفظ الدوال بسلسلة النطاقات عبر الـ Closures.',
            whyItMatters: 'السؤال رقم 1 الذي يُسأل في كل المقابلات التقنية لمهندسي البرمجيات حول العالم.',
            subItems: ['Creation Phase & Variable Environment', 'Lexical Scope & Scope Chain resolution', 'Temporal Dead Zone (TDZ)', 'Data privacy & Memoization closure patterns'],
            codeSnippet: `// Classic Closure Factory
function createCounter(initial = 0) {
  let count = initial; // Private in Lexical Environment
  return {
    increment: () => ++count,
    get: () => count
  };
}`,
            link: '/articles/js-closures',
            linkText: 'درس JS-24: الـ Closures وسلسلة النطاقات عملياً',
            prerequisite: 'الدوال والمتغيرات',
            nextStep: 'النماذج الأولية Prototypes',
          },
          {
            id: 'node-js-prototypes',
            code: 'JS::PROTO_OOP',
            name: 'Prototypes & Prototypal Inheritance',
            nameAr: 'النماذج الأولية والوراثة وسلسلة Prototype',
            type: 'recommended',
            status: 'active',
            details: 'كيف يعمل الـ Prototype Chain تحت غطاء كلاسات ES6، وكيف ترتبط الكائنات بـ Object.prototype، وفهم كلمة this وسياقات الربط المختلفة.',
            whyItMatters: 'فهم الأساس الذي بُنيت عليه لغة جافاسكريبت والمكتبات المتقدمة.',
            subItems: ['[[Prototype]] internal slot vs prototype property', 'Object.create() & Prototype delegation', 'this explicit binding: call, apply, bind', 'ES6 Classes syntactic sugar & private fields #'],
            link: '/articles/js-prototypes',
            linkText: 'درس JS-38: النماذج الأولية وسلسلة الـ Prototype',
            prerequisite: 'الكائنات والدوال',
            nextStep: 'هندسة الـ DOM والأحداث',
          },
        ],
      },
      {
        id: 'branch-04-dom-async',
        code: 'MOD::DOM_EVENT_LOOP',
        title: 'DOM Engineering, Events & Event Loop',
        titleAr: 'هندسة شجرة الـ DOM وحلقة الأحداث Event Loop',
        description: 'إدارة تفاعل المستخدم بكفاءة فائقة والتعامل مع العمليات غير المتزامنة بدون تعليق الواجهة',
        nodes: [
          {
            id: 'node-js-events',
            code: 'DOM::EVENT_FLOW',
            name: 'DOM Flow & Event Delegation Pattern',
            nameAr: 'تدفق الأحداث ونمط تفويض الأحداث (Delegation)',
            type: 'core',
            status: 'mastered',
            details: 'مراحل تدفق الأحداث: Capturing -> Target -> Bubbling. نمط Event Delegation لربط مستمع حدث واحد على الحاوية الأب بدلاً من آلاف العناصر الفرعية.',
            whyItMatters: 'يوفر استهلاك الذاكرة ويتعامل مع العناصر الديناميكية التي تُضاف لاحقاً بدون أي إعادة ربط.',
            subItems: ['Event Capturing & Bubbling phases', 'event.target vs event.currentTarget', 'Event Delegation on infinite scroll lists', 'CustomEvent & dispatchEvent API'],
            link: '/articles/js-event-delegation',
            linkText: 'درس JS-64: تدفق الأحداث والـ Event Delegation',
            prerequisite: 'محددات الـ DOM الأساسية',
            nextStep: 'حلقة الأحداث Event Loop',
          },
          {
            id: 'node-js-event-loop',
            code: 'ASYNC::EVENT_LOOP',
            name: 'Event Loop & Task Queues Architecture',
            nameAr: 'حلقة الأحداث: Call Stack و Microtasks و Macrotasks',
            type: 'core',
            status: 'mastered',
            details: 'كيف ينفذ جافاسكريبت أحادي الخيط الأكواد غير المتزامنة دون توقف: Call Stack -> Web APIs -> Microtask Queue (Promises, queueMicrotask) -> Macrotask Queue (setTimeout).',
            whyItMatters: 'يفسر لك بدقة ترتيب تنفيذ الكود ويمنع تجميد الشاشة أثناء المعالجة الثقيلة.',
            subItems: ['Single-threaded non-blocking I/O model', 'Microtasks priority over Macrotasks', 'requestAnimationFrame render pipeline timing', 'queueMicrotask() for high-priority dispatch'],
            link: '/articles/js-event-loop',
            linkText: 'درس JS-66: حلقة الأحداث بالتفصيل الممتع',
            prerequisite: 'الدوال غير المتزامنة',
            nextStep: 'Promises و Async/Await',
          },
          {
            id: 'node-js-async-await',
            code: 'ASYNC::PROMISES_FETCH',
            name: 'Promises, Async/Await & Fetch API',
            nameAr: 'الوعود والاتصال بالسيرفر مع AbortController',
            type: 'core',
            status: 'mastered',
            details: 'التعامل الاحترافي مع الوعود: Promise.all, Promise.allSettled, Promise.race، وكتابة كود خطي بـ async/await، وإلغاء طلبات الشبكة المعلقة عبر AbortController.',
            whyItMatters: 'شريان الاتصال بـ REST APIs ومنع هدر بيانات المستخدم عند الانتقال السريع بين الصفحات.',
            subItems: ['Promise lifecycle states', 'Parallel resolution with Promise.allSettled', 'Fetch API streaming & JSON decoding', 'AbortController signal for cleanup'],
            link: '/articles/js-async-await',
            linkText: 'درس JS-69: البرمجة بـ Async/Await بدون تعقيد',
            prerequisite: 'حلقة الأحداث والـ Callbacks',
            nextStep: 'منظومة Git وبناء المشاريع',
          },
        ],
      },
    ],
  },
  {
    id: 'stage-05-git-tools',
    order: '05',
    code: 'SYS::DEV_TOOLCHAIN',
    title: 'Version Control, Bundlers & Modern Tooling',
    titleAr: 'إدارة الإصدارات ومنظومة بناء البرمجيات',
    tagline: 'احتراف Git، سير عمل الفرق، وأسرع مجمعات الكود في العالم (Vite & Turbopack)',
    level: 'Mid-Level Core',
    accent: 'amber',
    summary: 'التعاون البرمجي الاحترافي: فروع Git، الدمج وإعادة التأسيس (Rebase)، مديري الحزم السريعة (pnpm)، ومجمعات الكود الحديثة.',
    branches: [
      {
        id: 'branch-05-git',
        code: 'MOD::GIT_MASTERY',
        title: 'Git & Collaboration Pipeline',
        titleAr: 'احتراف Git والعمل الجماعي بالفرق',
        description: 'إدارة شجرة الإصدارات، حل النزاعات، والمراجعة الكودية الاحترافية',
        nodes: [
          {
            id: 'node-git-rebase',
            code: 'GIT::BRANCH_REBASE',
            name: 'Interactive Rebase & Conflict Resolution',
            nameAr: 'إعادة التأسيس التفاعلية (git rebase -i) وفض النزاعات',
            type: 'recommended',
            status: 'active',
            details: 'تنظيم تاريخ المشروع عبر التأسيس التفاعلي (Squash, Reword, Drop)، وحل تعارضات الدمج يدويًا، ونقل تعديلات محددة بـ git cherry-pick.',
            whyItMatters: 'يحافظ على تاريخ مستودع GitHub خطياً ونظيفاً ويسهل التراجع عن الأخطاء في الإنتاج.',
            subItems: ['git rebase -i HEAD~N workflow', 'Resolving merge conflicts step-by-step', 'git cherry-pick specific commits', 'git reset vs git revert for production rollback'],
            prerequisite: 'أوامر Git الأساسية (add, commit, push)',
            nextStep: 'مجمعات الكود Vite',
          },
        ],
      },
      {
        id: 'branch-05-bundlers',
        code: 'MOD::BUNDLER_SPEED',
        title: 'Modern Bundlers & Package Managers',
        titleAr: 'مجمعات الكود فائقة السرعة ومديرو الحزم',
        description: 'بناء حزم الإنتاج بسرعة البرق بفضل Native ESM و Rust',
        nodes: [
          {
            id: 'node-vite-turbopack',
            code: 'BUILD::TURBOPACK_VITE',
            name: 'Vite & Turbopack (Rust-Powered Build)',
            nameAr: 'مجمعات الكود Vite و Turbopack المبنية بلغة Rust',
            type: 'core',
            status: 'mastered',
            details: 'كيف يستغل Vite ميزة Native ES Modules في المتصفح لتحديث الشاشة لحظيًا (Instant HMR)، والتجميع الفائق لـ Turbopack بلغة Rust داخل Next.js.',
            whyItMatters: 'يوفر ساعات عمل يومية على مستوى الفريق بفضل اختفاء شاشات الانتظار وبطء التحديث.',
            subItems: ['Instant Hot Module Replacement (HMR)', 'Tree-shaking dead code elimination', 'Dynamic code splitting chunks', 'pnpm symlinked hard-link store architecture'],
            prerequisite: 'مفاهيم موديولات جافاسكريبت (ESM)',
            nextStep: 'مكتبة React 19',
          },
        ],
      },
    ],
  },
  {
    id: 'stage-06-react19',
    order: '06',
    code: 'SYS::REACT_ECOSYSTEM',
    title: 'React 19 & Component Architecture 2030',
    titleAr: 'مكتبة React 19 والأنظمة التفاعلية الحديثة',
    tagline: 'المعيار العالمي الأول للواجهات: خوارزمية Fiber، خطافات React 19 الثورية، وإدارة البيانات',
    level: 'Mid-Level Core',
    accent: 'cyan',
    summary: 'إتقان React 19: من Virtual DOM والمكونات الدالية، إلى ميزات React 19 الجديدة كلياً (use(), useTransition, useActionState, useOptimistic) وإدارة الـ Server State بـ TanStack Query.',
    articleLink: '/frontend/react',
    branches: [
      {
        id: 'branch-06-core-hooks',
        code: 'MOD::REACT_CORE_HOOKS',
        title: 'Component Engine & Essential Hooks',
        titleAr: 'محرك المكونات والـ Hooks الأساسية',
        description: 'التحكم في دورة حياة المكون وتدفق البيانات أحادي الاتجاه',
        nodes: [
          {
            id: 'node-react-fiber',
            code: 'REACT::FIBER_DOM',
            name: 'Virtual DOM & React Fiber Reconciliation',
            nameAr: 'الـ Virtual DOM وخوارزمية React Fiber',
            type: 'core',
            status: 'mastered',
            details: 'كيف تقارن React شجرة المكونات القديمة بالجديدة عبر خوارزمية Diffing ثنائية الشجرة، وكيف تجدول Fiber العمليات الحسابية بدون تعطيل تفاعل المستخدم.',
            whyItMatters: 'فهم كيف ومتى يتم إعادة رندر المكون هو المفتاح لحل أي بطء في تطبيقات React الكبيرة.',
            subItems: ['Component render phase vs commit phase', 'Reconciliation Diffing heuristics', 'Keys rule in list rendering', 'Pure components & immutable state'],
            prerequisite: 'جافاسكريبت المتقدمة والـ DOM',
            nextStep: 'الـ Hooks المتقدمة',
          },
          {
            id: 'node-react-hooks',
            code: 'REACT::STATE_LIFECYCLE',
            name: 'Core Hooks (useState, useEffect, useRef)',
            nameAr: 'الـ Hooks الأساسية وإدارة الآثار الجانبية',
            type: 'core',
            status: 'mastered',
            details: 'إدارة الحالة اللحظية بـ useState، وتنفيذ الآثار الجانبية مع دوال التنظيف (Cleanup Functions) بـ useEffect، وتخزين المراجع الثابتة بـ useRef.',
            whyItMatters: 'العمود الفقري لبناء كل نموذج وزر وقائمة منسدلة في الواجهة.',
            subItems: ['useState functional update patterns', 'useEffect dependency array mechanics', 'Cleanup on unmount to prevent leaks', 'Custom Hooks abstraction'],
            prerequisite: 'مفاهيم React الأساسية',
            nextStep: 'ميزات React 19 الجديدة',
          },
        ],
      },
      {
        id: 'branch-06-react19-state',
        code: 'MOD::REACT19_DATA',
        title: 'React 19 New Features & State Systems',
        titleAr: 'ميزات React 19 الثورية وإدارة الحالة',
        description: 'الأسلوب الأحدث والأكثر نظافة للتعامل مع الوعود والنماذج والتحديثات اللحظية',
        nodes: [
          {
            id: 'node-react19-actions',
            code: 'REACT19::USE_ACTIONS',
            name: 'React 19: use(), useActionState & useOptimistic',
            nameAr: 'ثورة React 19: خطافات النماذج والتحديث اللحظي',
            type: 'core',
            status: 'mastered',
            details: 'قراءة الوعود والسياق مباشرة بـ use() مع Suspense، وإدارة عمليات النماذج بـ useActionState، وعرض النتيجة للمستخدم فوريًا قبل رد السيرفر بـ useOptimistic.',
            whyItMatters: 'يلغي مئات الأسطر من كود الحالات الوسيطة (isLoading, isError) ويمنح المستخدم تجربة تطبيق فائق السرعة.',
            subItems: ['use() hook promise unwrapping', 'useActionState for server mutations', 'useOptimistic for instant UX updates', 'useTransition for non-blocking UI states'],
            codeSnippet: `// Instant UI update before network response
const [optimisticLikes, setOptimisticLikes] = useOptimistic(
  likes,
  (current, update) => current + update
);`,
            prerequisite: 'مفاهيم React الـ Hooks الأساسية',
            nextStep: 'إدارة بيانات السيرفر TanStack Query',
          },
          {
            id: 'node-react-server-state',
            code: 'STATE::TANSTACK_QUERY',
            name: 'Server State Management (TanStack Query v5)',
            nameAr: 'إدارة كاش وبيانات السيرفر بـ TanStack Query',
            type: 'core',
            status: 'mastered',
            details: 'فصل بيانات السيرفر عن حالة الواجهة: التخزين المؤقت الذكي، إعادة المحاولة التلقائية عند انقطاع الاتصال، وتحديث الكاش في الخلفية بنظام SWR.',
            whyItMatters: 'يختصر أكثر من 70% من كود الـ API والتخزين المؤقت في التطبيقات التجارية.',
            subItems: ['Query keys hierarchy & invalidation', 'Stale-While-Revalidate caching model', 'Mutations with optimistic rollback', 'Infinite scroll queries pagination'],
            prerequisite: 'الوعود و Fetch API',
            nextStep: 'تايب سكريبت و Next.js App Router',
          },
        ],
      },
    ],
  },
  {
    id: 'stage-07-nextjs',
    order: '07',
    code: 'SYS::NEXTJS_FULLSTACK',
    title: 'TypeScript & Next.js 15 App Router Architecture',
    titleAr: 'تايب سكريبت الصارمة وإطار عمل Next.js 15',
    tagline: 'معمارية النخبة العالمية: أمان الأنواع الصارم والرندر السيرفري فائق السرعة',
    level: 'Senior Architect',
    accent: 'purple',
    summary: 'الجمع بين قوة TypeScript الصارمة لحماية الكود قبل التشغيل، وبنية Next.js App Router مع React Server Components (RSC) و Server Actions لنشر تطبيقات إنتاجية عملاقة.',
    branches: [
      {
        id: 'branch-07-typescript',
        code: 'MOD::STRICT_TS',
        title: 'Strict TypeScript Foundations',
        titleAr: 'تايب سكريبت الصارمة وتأمين المكونات',
        description: 'اكتشاف الأخطاء وتأمين تدفق البيانات بالأنواع الصارمة والـ Generics',
        nodes: [
          {
            id: 'node-ts-generics',
            code: 'TS::GENERICS_UTILITY',
            name: 'Advanced Generics & Utility Types',
            nameAr: 'الأنواع المعممة (Generics) والأدوات المساعدة',
            type: 'core',
            status: 'mastered',
            details: 'بناء مكونات ودوال مرنة نوعيًا بـ Generics <T>، واستخدام Partial, Pick, Omit, Record، وتأمين الـ Props لجميع مكونات React.',
            whyItMatters: 'يمنع تسرب أي قيمة undefined أو نوع غير متطابق ويضمن وثوقية الكود في المشروعات الضخمة.',
            subItems: ['Generics constraints (<T extends object>)', 'Utility types (Omit, Pick, Record, ReturnType)', 'Discriminated Unions for state modeling', 'ComponentPropsWithRef for strict UI design systems'],
            prerequisite: 'أساسيات جافاسكريبت الحديثة',
            nextStep: 'Next.js App Router',
          },
        ],
      },
      {
        id: 'branch-07-app-router',
        code: 'MOD::RSC_NEXTJS',
        title: 'Next.js App Router & Server Components',
        titleAr: 'معمارية Next.js App Router و Server Components',
        description: 'رندر فائق السرعة على السيرفر بدون إرسال جافاسكريبت زائد للعميل',
        nodes: [
          {
            id: 'node-nextjs-rsc',
            code: 'NEXT::RSC_CLIENT_SPLIT',
            name: 'Server Components (RSC) vs Client Components',
            nameAr: 'مكونات السيرفر (RSC) ومكونات العميل ("use client")',
            type: 'core',
            status: 'mastered',
            details: 'تشغيل المكونات على السيرفر افتراضيًا مع صفر بايت جافاسكريبت في الحزمة، واستخدام "use client" فقط عند الحاجة للتفاعل والـ Hooks.',
            whyItMatters: 'تقليل حجم حزمة الجافاسكريبت بنسبة تتجاوز 60% وتحقيق أقصى درجات السرعة في محركات البحث.',
            subItems: ['Zero-bundle-size server components', 'Interleaving pattern (Server inside Client via children)', 'Data fetching directly in async components', 'Suspense streaming with loading.tsx'],
            prerequisite: 'مفاهيم React الأساسية',
            nextStep: 'عمليات السيرفر Server Actions',
          },
          {
            id: 'node-nextjs-actions',
            code: 'NEXT::SERVER_ACTIONS',
            name: 'Server Actions & Cache Invalidation',
            nameAr: 'عمليات السيرفر السريعة وتحديث الذاكرة المؤقتة',
            type: 'core',
            status: 'mastered',
            details: 'تنفيذ العمليات السيرفرية مباشرة من مكونات React باستخدام "use server"، وتحديث الكاش فورياً عبر revalidatePath و revalidateTag.',
            whyItMatters: 'يلغي الحاجة لكتابة كود API Routes منفصل ويجعل التعامل مع النماذج وقواعد البيانات آمناً وسريعاً.',
            subItems: ['"use server" inline mutations', 'revalidatePath & revalidateTag triggers', 'Zod validation on server boundary', 'Secure session cookies handling in middleware'],
            prerequisite: 'مكونات السيرفر والـ HTTP',
            nextStep: 'الاختبارات الآلية والأداء',
          },
          {
            id: 'node-nextjs-rendering',
            code: 'NEXT::SSR_SSG_ISR',
            name: 'Rendering Modes: SSG, SSR & ISR Engine',
            nameAr: 'استراتيجيات الرندر: SSG و SSR والـ ISR المتدرج',
            type: 'core',
            status: 'mastered',
            details: 'توليد الصفحات الثابتة مسبقاً (SSG)، والرندر عند الطلب على السيرفر (SSR)، والتحديث المتدرج بعد النشر بـ ISR دون إعادة بناء المشروع بالكامل.',
            whyItMatters: 'المعادلة الذهبية بين السرعة الخارقة لصفحات الـ CDN وتوفر أحدث البيانات اللحظية.',
            subItems: ['Static Site Generation (generateStaticParams)', 'Dynamic rendering per request', 'Incremental Static Regeneration (revalidate: 60)', 'Edge runtime middleware routing'],
            prerequisite: 'معمارية App Router',
            nextStep: 'الاختبارات الآلية والأداء الفائق',
          },
        ],
      },
    ],
  },
  {
    id: 'stage-08-senior',
    order: '08',
    code: 'SYS::SENIOR_ENGINEERING',
    title: 'Testing, Security, Performance & Architecture 2030',
    titleAr: 'الاختبارات الآلية، الأداء الخارق، وأمان الويب',
    tagline: 'مستوى القيادة الهندسية (Senior Frontend Architect): ثبات الأنظمة وأمانها ضد أصعب الظروف',
    level: 'Senior Architect',
    accent: 'emerald',
    summary: 'هرم الاختبارات الآلية (Vitest, React Testing Library, Playwright)، أمان الواجهات وفق OWASP، وتحقيق درجات مثالية في مؤشرات Core Web Vitals.',
    branches: [
      {
        id: 'branch-08-testing',
        code: 'MOD::TEST_AUTOMATION',
        title: 'Automated Testing Pyramid',
        titleAr: 'هرم الاختبارات الآلية الشامل',
        description: 'كتابة اختبارات تضمن عدم تعطل التطبيق مع كل تحديث جديد',
        nodes: [
          {
            id: 'node-unit-testing',
            code: 'TEST::VITEST_RTL',
            name: 'Unit & Component Testing (Vitest + RTL)',
            nameAr: 'اختبارات الوحدات وتفاعل المكونات بـ RTL',
            type: 'core',
            status: 'mastered',
            details: 'اختبار المنطق الرياضي بـ Vitest، واختبار سلوك المكونات من وجهة نظر المستخدم الحقيقي باستخدام React Testing Library ومعايير الوصول getByRole.',
            whyItMatters: 'يمنع رجوع الأخطاء القديمة (Regression) ويسمح لك بتحديث الكود بثقة مطلقة.',
            subItems: ['Vitest fast concurrent execution', 'Testing user interactions with userEvent', 'Mocking API network layer with MSW (Mock Service Worker)', 'Code coverage thresholds in CI'],
            prerequisite: 'مفاهيم React و TypeScript',
            nextStep: 'اختبارات التدفق الشامل E2E',
          },
          {
            id: 'node-e2e-playwright',
            code: 'TEST::PLAYWRIGHT_E2E',
            name: 'End-to-End Testing with Playwright',
            nameAr: 'اختبارات التدفق الشامل الحقيقي بـ Playwright',
            type: 'recommended',
            status: 'active',
            details: 'محاكاة مستخدم حقيقي يتصفح الموقع عبر متصفحات Chromium و Firefox و WebKit: تسجيل الدخول، والشراء، وإتمام رحلة المستخدم بالكامل.',
            whyItMatters: 'الضمان النهائي بأن كل أجزاء الواجهة والسيرفر وقاعدة البيانات تعمل معًا دون مفاجآت في الإنتاج.',
            subItems: ['Cross-browser test suites', 'Page Object Model (POM) pattern', 'Visual regression testing (Screenshot diffs)', 'Automated CI/CD integration with GitHub Actions'],
            prerequisite: 'اختبارات المكونات الأساسية',
            nextStep: 'الأداء الفائق وأمان الويب',
          },
        ],
      },
      {
        id: 'branch-08-perf-sec',
        code: 'MOD::PERF_SECURITY',
        title: 'Core Web Vitals & Web Security (OWASP)',
        titleAr: 'الأداء الخارق وأمان الويب العالمي',
        description: 'تحقيق أعلى درجات السرعة وتأمين المنصة ضد ثغرات XSS و CSRF',
        nodes: [
          {
            id: 'node-core-web-vitals',
            code: 'PERF::WEB_VITALS',
            name: 'Core Web Vitals & Real User Monitoring (RUM)',
            nameAr: 'مؤشرات الأداء الحيوية Core Web Vitals',
            type: 'core',
            status: 'mastered',
            details: 'تحسين مقاييس جوجل الرسمية: LCP (سرعة أكبر عنصر < 2.5s)، و INP (زمن الاستجابة للنقر < 200ms)، و CLS (استقرار التنسيق < 0.1).',
            whyItMatters: 'العامل المباشر لتصدر نتائج محركات البحث ومنع مغادرة الزوار بسبب البطء أو اهتزاز الصفحة.',
            subItems: ['LCP optimization via priority preloading', 'INP reduction via scheduler.yield() & web workers', 'CLS prevention via fixed aspect-ratios', 'Bundle analysis & dynamic code splitting'],
            prerequisite: 'مسار الرندر الحرج CRP',
            nextStep: 'أمان الويب ومكافحة الثغرات',
          },
          {
            id: 'node-web-security',
            code: 'SEC::OWASP_HARDENING',
            name: 'Web Security: XSS, CSRF & CSP Headers',
            nameAr: 'أمان الويب ومكافحة ثغرات XSS وترويسات CSP',
            type: 'core',
            status: 'mastered',
            details: 'حماية المنصة من ثغرات XSS، وضبط ترويسات Content Security Policy (CSP)، وتخزين الـ Tokens في HttpOnly Secure SameSite Cookies لمنع سرقتها.',
            whyItMatters: 'حماية سمعة المنصة وحسابات آلاف المستخدمين من الاختراق وسرقة الجلسات.',
            subItems: ['Content Security Policy (CSP) strict directives', 'HttpOnly, Secure, SameSite=Lax cookie flags', 'Sanitization of user inputs (DOMPurify)', 'CORS fine-grained origins configuration'],
            prerequisite: 'أساسيات بروتوكول HTTP والكوكيز',
            nextStep: 'الاعتماد كـ Senior Frontend Architect',
          },
        ],
      },
    ],
  },
];

export function FrontendRoadmapDiagram() {
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(null);
  const [activeFilter, setActiveFilter] = useState<NodeType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStageId, setActiveStageId] = useState<string>('all');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'stage-01-web-core': true,
    'stage-02-semantic-web': true,
    'stage-03-css-systems': true,
    'stage-04-js-engine': true,
    'stage-05-git-tools': true,
    'stage-06-react19': true,
    'stage-07-nextjs': true,
    'stage-08-senior': true,
  });

  const toggleStage = (stageId: string) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId],
    }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    ROADMAP_2030_DATA.forEach(s => (next[s.id] = true));
    setExpandedStages(next);
  };

  const collapseAll = () => {
    const next: Record<string, boolean> = {};
    ROADMAP_2030_DATA.forEach(s => (next[s.id] = false));
    setExpandedStages(next);
  };

  // Filtered dataset
  const filteredData = useMemo(() => {
    return ROADMAP_2030_DATA.filter(stage => {
      if (activeStageId !== 'all' && stage.id !== activeStageId) return false;
      return true;
    }).map(stage => {
      const filteredBranches = stage.branches.map(branch => {
        const filteredNodes = branch.nodes.filter(node => {
          if (activeFilter !== 'all' && node.type !== activeFilter) return false;
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matchName = node.name.toLowerCase().includes(q);
            const matchAr = node.nameAr.toLowerCase().includes(q);
            const matchCode = node.code.toLowerCase().includes(q);
            const matchDetails = node.details.toLowerCase().includes(q);
            const matchSub = node.subItems.some(s => s.toLowerCase().includes(q));
            return matchName || matchAr || matchCode || matchDetails || matchSub;
          }
          return true;
        });

        return {
          ...branch,
          nodes: filteredNodes,
        };
      }).filter(b => b.nodes.length > 0 || !searchQuery.trim());

      return {
        ...stage,
        branches: filteredBranches,
      };
    });
  }, [activeStageId, activeFilter, searchQuery]);

  // Accent styling helper
  const getAccentStyles = (accent: TreeStage['accent']) => {
    switch (accent) {
      case 'amber':
        return {
          glow: 'from-amber-500/20 via-amber-500/5 to-transparent',
          border: 'border-amber-500/40 hover:border-amber-400',
          text: 'text-amber-400',
          pill: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          spineNode: 'border-amber-400 bg-amber-950/40 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]',
          lineGradient: 'url(#amber-circuit)',
        };
      case 'cyan':
        return {
          glow: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
          border: 'border-cyan-500/40 hover:border-cyan-400',
          text: 'text-cyan-400',
          pill: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          spineNode: 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]',
          lineGradient: 'url(#cyan-circuit)',
        };
      case 'yellow':
        return {
          glow: 'from-yellow-500/20 via-yellow-500/5 to-transparent',
          border: 'border-yellow-500/40 hover:border-yellow-400',
          text: 'text-yellow-400',
          pill: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30',
          spineNode: 'border-yellow-400 bg-yellow-950/40 text-yellow-300 shadow-[0_0_20px_rgba(234,179,8,0.25)]',
          lineGradient: 'url(#yellow-circuit)',
        };
      case 'purple':
        return {
          glow: 'from-purple-500/20 via-purple-500/5 to-transparent',
          border: 'border-purple-500/40 hover:border-purple-400',
          text: 'text-purple-400',
          pill: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
          spineNode: 'border-purple-400 bg-purple-950/40 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.25)]',
          lineGradient: 'url(#purple-circuit)',
        };
      case 'emerald':
        return {
          glow: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
          border: 'border-emerald-500/40 hover:border-emerald-400',
          text: 'text-emerald-400',
          pill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          spineNode: 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]',
          lineGradient: 'url(#emerald-circuit)',
        };
      default:
        return {
          glow: 'from-primary/20 via-primary/5 to-transparent',
          border: 'border-primary/40 hover:border-primary',
          text: 'text-primary',
          pill: 'bg-primary/10 text-primary border-primary/30',
          spineNode: 'border-primary bg-primary/20 text-primary shadow-[0_0_20px_rgba(59,130,246,0.25)]',
          lineGradient: 'url(#cyan-circuit)',
        };
    }
  };

  return (
    <div className="space-y-10" dir="rtl">
      {/* 2030 Cyber Command & Matrix Controller */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-slate-950/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Futuristic Background Matrix Grid */}
        <div
          className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:18px_18px] opacity-25 pointer-events-none"
          aria-hidden="true"
        />

        {/* Ambient Neon Beam */}
        <div
          className="absolute -top-32 right-1/3 w-96 h-96 bg-primary/15 rounded-full blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Header */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-mono font-black tracking-wider uppercase">
                <Orbit className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                <span>NEURAL ROADMAP 2030 • INTERCONNECTED TREE</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-900 border border-slate-800 text-slate-400">
                8 STAGES • 85+ NODES • 75 JS DOCS
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              شجرة المسار العصبي التفاعلية لمهندس الواجهات الأمامية
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              تصميم شبكي متفرع فائق التطور يربط المفاهيم، البروتوكولات، والمحركات بخطوط اتصال دائرية ودوائر كهربائية (Circuit Paths). اضغط على أي عقدة لاستدعاء لوحة الفحص الشاملة (HUD Inspector).
            </p>
          </div>

          {/* Futuristic Filter Badges */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-xs font-mono shrink-0">
            <span className="text-slate-400 flex items-center gap-1.5 font-bold">
              <Activity className="h-3.5 w-3.5 text-primary" />
              <span>فئات العقد:</span>
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveFilter(activeFilter === 'core' ? 'all' : 'core')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                  activeFilter === 'core'
                    ? 'bg-amber-400 text-slate-950 border-amber-500 font-black shadow-[0_0_12px_rgba(245,158,11,0.4)] scale-105'
                    : 'bg-amber-400/10 text-amber-300 border-amber-500/30 hover:bg-amber-400/20'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span>[CORE] أساسي</span>
              </button>

              <button
                onClick={() => setActiveFilter(activeFilter === 'recommended' ? 'all' : 'recommended')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                  activeFilter === 'recommended'
                    ? 'bg-purple-600 text-white border-purple-500 font-black shadow-[0_0_12px_rgba(168,85,247,0.4)] scale-105'
                    : 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                <span>[REC] موصى به</span>
              </button>

              <button
                onClick={() => setActiveFilter(activeFilter === 'alternative' ? 'all' : 'alternative')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                  activeFilter === 'alternative'
                    ? 'bg-teal-500 text-slate-950 border-teal-400 font-black shadow-[0_0_12px_rgba(20,184,166,0.4)] scale-105'
                    : 'bg-teal-500/10 text-teal-300 border-teal-500/30 hover:bg-teal-500/20'
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-teal-400" />
                <span>[ALT] بدائل</span>
              </button>

              {activeFilter !== 'all' && (
                <button
                  onClick={() => setActiveFilter('all')}
                  className="text-[11px] text-slate-400 hover:text-slate-200 underline pr-1"
                >
                  إعادة ضبط
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Neural Controller Toolbar */}
        <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Quick Stage Orbit Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none font-mono text-xs">
            <button
              onClick={() => setActiveStageId('all')}
              className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 font-bold ${
                activeStageId === 'all'
                  ? 'bg-primary text-black border-primary shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              ALL_STAGES (01-08)
            </button>
            {ROADMAP_2030_DATA.map(st => {
              const isActive = activeStageId === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveStageId(st.id)}
                  className={`px-3 py-1.5 rounded-xl border transition-all shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary text-black border-primary shadow-[0_0_15px_rgba(59,130,246,0.4)] font-bold'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-[10px] opacity-75">{st.order}</span>
                  <span>{st.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Search Scanner + Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-72">
              <Crosshair className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ابحث في شجرة 2030 (DOM, Hooks, SSR...)"
                className="w-full pr-10 pl-4 py-2 rounded-xl border border-slate-800 bg-slate-900/90 text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 border border-slate-800 rounded-xl p-1 bg-slate-900 shrink-0">
              <button
                onClick={expandAll}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs font-bold flex items-center gap-1"
                title="توسيع كافة الفروع"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">توسيع</span>
              </button>
              <button
                onClick={collapseAll}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs font-bold flex items-center gap-1"
                title="طي كافة الفروع"
              >
                <Minimize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">طي</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2030 Interconnected Neural Tree Flow */}
      <div className="relative space-y-16">
        {/* Futuristic SVG Global Circuit Spine Overlay (Desktop) */}
        <div
          className="hidden lg:block absolute right-1/2 translate-x-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-amber-500 via-cyan-400 via-yellow-400 via-purple-500 to-emerald-400 opacity-30 pointer-events-none rounded-full"
          aria-hidden="true"
        />

        {/* Mobile Vertical Flow Line */}
        <div
          className="lg:hidden absolute right-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-cyan-400 to-emerald-400 opacity-25 pointer-events-none"
          aria-hidden="true"
        />

        {filteredData.map((stage, stageIdx) => {
          const isExpanded = expandedStages[stage.id] ?? true;
          const styles = getAccentStyles(stage.accent);

          return (
            <div
              key={stage.id}
              className="relative space-y-8 scroll-mt-24"
              id={stage.id}
            >
              {/* Stage Milestone Hub (Neural Node Station) */}
              <div className="flex items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  {/* Glowing Holographic Milestone Pin */}
                  <div
                    className={`h-14 w-14 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-black text-lg backdrop-blur-xl transition-all duration-300 ${styles.spineNode}`}
                  >
                    <span className="text-[10px] opacity-75 font-normal tracking-tighter">STAGE</span>
                    <span>{stage.order}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md border ${styles.pill}`}>
                        {stage.code} • {stage.level}
                      </span>
                      {stage.articleLink && (
                        <Link
                          href={stage.articleLink}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline font-mono"
                        >
                          <span>[DOCS_ACCESS]</span>
                          <ArrowLeft className="h-3 w-3" />
                        </Link>
                      )}
                    </div>

                    <h4 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2">
                      <span>{stage.titleAr}</span>
                      <span className="text-xs sm:text-sm font-normal text-slate-400 font-mono hidden sm:inline">
                        // {stage.title}
                      </span>
                    </h4>

                    <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                      {stage.tagline}
                    </p>
                  </div>
                </div>

                {/* Stage Collapse Toggle */}
                <button
                  onClick={() => toggleStage(stage.id)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-xs font-mono font-bold text-slate-300 transition-all shrink-0"
                >
                  <span>{isExpanded ? 'COLLAPSE' : 'EXPAND'}</span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-primary" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-primary" />
                  )}
                </button>
              </div>

              {/* Branching Grid & Sub-nodes Canvas */}
              {isExpanded && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative pt-2">
                  {stage.branches.map((branch, bIdx) => {
                    return (
                      <div
                        key={branch.id}
                        className={`rounded-3xl border ${styles.border} bg-slate-950/80 backdrop-blur-xl p-6 shadow-2xl transition-all duration-300 relative group flex flex-col justify-between space-y-6 hover:shadow-[0_0_30px_rgba(0,0,0,0.8)]`}
                      >
                        {/* Ambient Card Top Glow */}
                        <div
                          className={`absolute top-0 right-0 left-0 h-1 rounded-t-3xl bg-gradient-to-r ${styles.glow}`}
                        />

                        {/* Branch Capsule Header */}
                        <div className="space-y-3 pb-4 border-b border-slate-800/80">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                              <span className="text-[11px] font-mono font-bold text-primary">
                                {branch.code}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500 font-mono">
                              {branch.nodes.length} NODES
                            </span>
                          </div>

                          <h5 className="text-base sm:text-lg font-black text-slate-100 group-hover:text-primary transition-colors">
                            {branch.titleAr}{' '}
                            <span className="text-xs font-mono font-normal text-slate-500 block sm:inline">
                              // {branch.title}
                            </span>
                          </h5>

                          <p className="text-xs text-slate-400 leading-relaxed">
                            {branch.description}
                          </p>
                        </div>

                        {/* Interactive Futuristic Tree Nodes */}
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                            AVAILABLE CAPABILITY NODES (CLICK FOR HUD INSPECTION):
                          </span>

                          <div className="flex flex-wrap gap-2.5">
                            {branch.nodes.map((node, nIdx) => {
                              const isSelected = selectedNode?.id === node.id;
                              const isHovered = hoveredNodeId === node.id;

                              let badgeClasses = '';
                              let statusDot = 'bg-primary';

                              if (node.type === 'core') {
                                badgeClasses =
                                  'bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 text-amber-300 border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]';
                                statusDot = 'bg-amber-400';
                              } else if (node.type === 'recommended') {
                                badgeClasses =
                                  'bg-gradient-to-r from-purple-600/20 via-purple-500/10 to-purple-600/20 text-purple-300 border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]';
                                statusDot = 'bg-purple-400';
                              } else if (node.type === 'alternative') {
                                badgeClasses =
                                  'bg-gradient-to-r from-teal-500/20 via-teal-400/10 to-teal-500/20 text-teal-300 border-teal-500/40 hover:border-teal-400 hover:shadow-[0_0_15px_rgba(20,184,166,0.25)]';
                                statusDot = 'bg-teal-400';
                              } else {
                                badgeClasses =
                                  'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700';
                              }

                              return (
                                <button
                                  key={node.id}
                                  onClick={() => setSelectedNode(node)}
                                  onMouseEnter={() => setHoveredNodeId(node.id)}
                                  onMouseLeave={() => setHoveredNodeId(null)}
                                  className={`group/node relative text-right transition-all duration-200 rounded-2xl px-3.5 py-2.5 border text-xs font-mono shadow-sm flex items-center gap-2.5 backdrop-blur-md ${badgeClasses} ${
                                    isSelected
                                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-slate-950 scale-105 z-20 shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                                      : 'hover:-translate-y-0.5'
                                  }`}
                                >
                                  <span className={`h-2 w-2 rounded-full ${statusDot} shrink-0`} />
                                  <span className="font-bold tracking-tight text-slate-100">
                                    {node.name}
                                  </span>

                                  {node.subItems && node.subItems.length > 0 && (
                                    <span className="h-4 px-1.5 rounded-md bg-black/40 text-[10px] text-slate-400 flex items-center justify-center font-mono shrink-0">
                                      {node.subItems.length}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Branch Footer Inspection Trigger */}
                        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                          <span className="text-[11px] text-slate-500">
                            CIRCUIT STATUS: OPTIMAL
                          </span>
                          <span className="text-primary font-bold flex items-center gap-1 group-hover:translate-x-[-2px] transition-transform">
                            <span>INSPECT_BRANCH</span>
                            <ArrowLeft className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Connecting Neural Pulse Between Stages */}
              {stageIdx < filteredData.length - 1 && (
                <div className="flex justify-center pt-4 pb-2 relative z-10">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-10 w-0.5 bg-gradient-to-b from-primary via-cyan-400 to-transparent" />
                    <div className="h-9 w-9 rounded-full bg-slate-900 border border-slate-800 shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center text-primary">
                      <ArrowDown className="h-4 w-4 animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 2030 Futuristic Cyber HUD Inspection Panel Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] flex flex-col relative overflow-hidden">
            {/* Top Glowing Laser Beam */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-primary to-yellow-400 animate-pulse" />

            {/* HUD Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/40">
                    {selectedNode.code}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    STATUS: {selectedNode.status.toUpperCase()}
                  </span>
                </div>
                <h4 className="text-2xl font-black text-slate-100 font-mono">
                  {selectedNode.name}
                </h4>
                <p className="text-sm font-bold text-slate-300">
                  {selectedNode.nameAr}
                </p>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="h-9 w-9 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-100 hover:bg-slate-800 flex items-center justify-center transition-all shrink-0 font-mono"
                aria-label="إغلاق النافذة"
              >
                ✕
              </button>
            </div>

            {/* HUD Body */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-1 pl-1">
              {/* Technical Breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
                  <TerminalSquare className="h-4 w-4" />
                  <span>// TECHNICAL SPECIFICATION & OVERVIEW:</span>
                </span>
                <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedNode.details}
                </div>
              </div>

              {/* Why It Matters */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-yellow-400 flex items-center gap-1.5">
                  <Flame className="h-4 w-4" />
                  <span>// PRODUCTION VALUE & IMPACT:</span>
                </span>
                <div className="rounded-2xl bg-yellow-500/5 p-4 border border-yellow-500/20 text-xs text-slate-300 leading-relaxed">
                  {selectedNode.whyItMatters}
                </div>
              </div>

              {/* Code Snippet Preview (if available) */}
              {selectedNode.codeSnippet && (
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                    <Code2 className="h-4 w-4" />
                    <span>// CODE ARCHITECTURE SNIPPET:</span>
                  </span>
                  <pre className="rounded-2xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-emerald-400 overflow-x-auto text-left" dir="ltr">
                    <code>{selectedNode.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Prerequisite & Next Step Flow */}
              {(selectedNode.prerequisite || selectedNode.nextStep) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {selectedNode.prerequisite && (
                    <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">
                        PREREQUISITE (المتطلب السابق)
                      </span>
                      <span className="text-xs font-bold text-slate-200">
                        {selectedNode.prerequisite}
                      </span>
                    </div>
                  )}

                  {selectedNode.nextStep && (
                    <div className="p-3 rounded-xl border border-primary/30 bg-primary/10 space-y-1">
                      <span className="text-[10px] font-mono text-primary uppercase block">
                        NEXT STEP (الخطوة التالية)
                      </span>
                      <span className="text-xs font-bold text-primary">
                        {selectedNode.nextStep}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Sub-items Checklist */}
              {selectedNode.subItems && selectedNode.subItems.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>// VERIFIED SKILLS IN THIS NODE:</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedNode.subItems.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-800 bg-slate-900/70 text-xs text-slate-200 font-mono"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Lesson Link */}
              {selectedNode.link && (
                <div className="pt-2">
                  <Link
                    href={selectedNode.link}
                    className="flex items-center justify-between p-4 rounded-2xl border border-primary/40 bg-primary/15 hover:bg-primary/25 transition-all text-xs font-mono font-bold text-primary group shadow-[0_0_15px_rgba(59,130,246,0.2)]"
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

            {/* HUD Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 font-mono">
              <span className="text-[11px] text-slate-500">
                KHAMSA_OS // FRONTEND ROADMAP 2030
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedNode(null)}
                className="font-mono font-bold text-xs"
              >
                CLOSE_HUD
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
