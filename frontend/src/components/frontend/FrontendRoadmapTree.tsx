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
  FileCode,
  Workflow,
  Search,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export interface TopicGroup {
  groupTitle: string;
  items: string[];
}

export interface RoadmapBranch {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  topicGroups: TopicGroup[];
  links: Array<{ label: string; href: string }>;
}

export interface MilestoneProject {
  title: string;
  subtitle: string;
  techStack: string[];
  challenge: string;
  projectLink?: { label: string; href: string };
}

export interface RoadmapMilestone {
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

export const ROADMAP_MILESTONES: RoadmapMilestone[] = [
  {
    step: '00',
    level: 'beginner',
    role: 'Pre-Frontend Foundations',
    roleAr: 'مستكشف الويب وبيئة المطور الأساسية',
    title: 'المحطة 00: أساسيات الإنترنت، كيف يعمل الويب، وبيئة العمل ونظام Git & GitHub',
    duration: 'أسبوعان',
    description:
      'قبل أن تكتب سطراً برمجياً واحداً في HTML أو جافاسكريبت، يجب أن تفهم البنية التحتية للإنترنت، وكيف يستقبل المتصفح البيانات ويرسمها، وإتقان نظام إدارة النسخ Git ومنصة GitHub والتعامل مع موجه الأوامر (Terminal).',
    prerequisites: [
      'جهاز كمبيوتر واتصال بالإنترنت',
      'لا يُشترط أي خبرة برمجية سابقة (نبدأ تمامًا من الصفر)',
      'الرغبة في الفهم العميق للشبكات وما يدور خلف كواليس المتصفح',
    ],
    learningOutcomes: [
      'فهم دورة الطلب والاستجابة الكاملة: كيف يعمل الإنترنت، خوادم الـ DNS، أسماء النطاقات (Domain Name)، والاستضافة (Hosting)',
      'فهم بروتوكولات الويب: HTTP و HTTPS وتشفير TLS وأكواد الحالة ومعنى CORS و CSP',
      'تشريح محركات المتصفحات: الـ Rendering Engine (Blink, WebKit, Gecko) وخطوات Critical Rendering Path',
      'إتقان أوامر التيرمينال (CLI) للتحكم في الملفات وتثبيت البيئات البرمجية',
      'احتراف نظام Git لإدارة النسخ والتحكم بالمستودعات، وإنشاء الفروع والدمج، والتعاون عبر GitHub و Pull Requests',
    ],
    accentClass: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    glowClass: 'from-amber-500/20 via-amber-500/5 to-transparent',
    branches: [
      {
        id: 'internet-web-basics',
        title: 'الإنترنت وكيف يعمل الويب (How the Internet Works)',
        subtitle: 'المسار الدقيق للبيانات بين المتصفح والخادم',
        tag: 'تأسيس شبكات الويب',
        icon: Globe,
        topicGroups: [
          {
            groupTitle: '1. بنية الإنترنت والشبكات (Internet Architecture)',
            items: [
              'كيف يعمل الإنترنت؟ (How does the Internet work): الكابلات البحرية، الـ Routers، وحزم البيانات (Packets)',
              'عناوين الـ IP وأسماء النطاقات: ما هو Domain Name؟ الفرق بين IPv4 و IPv6 ونظام تسمية النطاقات TLDs',
              'خوادم الـ DNS: دورة ترجمة العنوان (Recursive Resolver, Root Server, TLD Server, Authoritative Server)',
              'ما هي الاستضافة السحابية (Hosting)؟ الفرق بين الاستضافة المشتركة، السيرفرات الافتراضية VPS، والسحابة (Cloud/Serverless)',
            ],
          },
          {
            groupTitle: '2. بروتوكولات الاتصال والمتصفحات (HTTP & Browsers)',
            items: [
              'ما هو بروتوكول HTTP؟ إصدارات HTTP/1.1 و HTTP/2 و HTTP/3 وطبقة الأمان والتشفير HTTPS / TLS',
              'أكواد الحالة (HTTP Status Codes): فئات 2xx (نجاح)، 3xx (إعادة توجيه)، 4xx (أخطاء عميل)، 5xx (أخطاء خادم)',
              'كيف تعمل المتصفحات (Browsers & Rendering Engine): من تحميل HTML إلى شجرة الـ DOM و CSSOM و Render Tree',
              'مراحل رسم الشاشة (Layout / Reflow, Paint, Compositing) وتفادي الاختناقات الأدائية الأولية',
            ],
          },
        ],
        links: [
          { label: 'توثيق كيف يعمل الإنترنت والـ DNS', href: '/articles/web-docs-01-how-internet-dns-ip-domain-works' },
          { label: 'دليل بروتوكول HTTP/HTTPS وأكواد الحالة', href: '/articles/web-docs-02-http-https-tls-status-codes' },
          { label: 'شرح معمارية المتصفحات و DOM و CSSOM', href: '/articles/web-docs-03-browser-rendering-dom-cssom-critical-path' },
          { label: 'معمارية العميل والخادم Client vs Server', href: '/articles/web-docs-04-client-vs-server-and-apis-architecture' },
        ],
      },
      {
        id: 'git-github-tooling',
        title: 'نظام إدارة النسخ ومستودعات GitHub (Git & GitHub Mastery)',
        subtitle: 'بيئة العمل اليومية للمبرمج المحترف من سطر الأوامر حتى التعاون الجماعي',
        tag: 'مهارة هندسية إلزامية',
        icon: GitBranch,
        topicGroups: [
          {
            groupTitle: '1. أساسيات Git وسطر الأوامر (Core Git CLI)',
            items: [
              'أساسيات سطر الأوامر (Terminal / Bash / PowerShell): تنقل المجلدات، إنشاء الملفات، تشغيل الأوامر والبرامج',
              'مفهوم أنظمة التحكم بالإصدار (VCS): لماذا نستخدم Git؟ ومقارنته بالأنظمة القديمة مثل SVN',
              'دورة حياة الملف في Git: Working Directory، Staging Area، و Commit History',
              'أوامر Git الأساسية: `git init`, `git config` (المحلي والعالمي), `git add`, `git commit`, `git status`, `git log`',
              'ملف التطهير والتجاهل `.gitignore`: القواعد، الأنماط، وتفادي رفع الملفات الحساسة وبيئات العمل `node_modules`',
            ],
          },
          {
            groupTitle: '2. التفريع والدمج واستراتيجيات الحل (Branching & Merging)',
            items: [
              'الفروع (Branches): إنشاء الفروع، التبديل بينها (`git checkout` / `git switch`)، وإعادة التسمية والحذف',
              'استراتيجيات الدمج (Merging Strategies): Fast-Forward مقابل 3-Way Merge، ومفهوم `git rebase` و `git cherry-pick`',
              'حل التعارضات البرمجية (Merge Conflicts): فهم إشارات التعارض `<<<<<<<` وحلها خطوة بخطوة',
              'حفظ التعديلات المؤقتة بـ `git stash` (pop, apply, drop, list)',
              'إلغاء التغييرات والرجوع في التاريخ: `git revert` الآمن، و `git reset` بخياراته (`--soft`, `--mixed`, `--hard`)',
            ],
          },
          {
            groupTitle: '3. التعاون عبر GitHub و CI/CD الأساسي (Collaboration on GitHub)',
            items: [
              'المستودعات البعيدة (Remotes): ربط المستودع، `git remote add`, `git push`, `git pull`, و `git fetch`',
              'منصة GitHub: إدارة الحساب والملف الشخصي، إنشاء المستودعات العامة والخاصة، وتوثيق README بصيغة Markdown',
              'سير عمل الفرق (Team Workflow): Forking، إنشاء الفروع الموجهة، وفتح الـ Pull Requests (PRs)',
              'مراجعة الأكواد (Code Reviews): طلب المراجعة، إضافة التعليقات السطرية، والـ Approvals',
              'أدوات GitHub المتقدمة: Issues و Labels والـ Milestones ومشاريع الـ Kanban، والتعريف بمقدمة GitHub Actions للـ CI/CD',
            ],
          },
        ],
        links: [
          { label: 'دليل إعداد بيئة VS Code والتيرمينال', href: '/articles/tooling-docs-01-vscode-setup-extensions-shortcuts' },
          { label: 'دليل Git الشامل: من الصفر حتى الفروع والدمج', href: '/articles/tooling-docs-03-git-fundamentals-branching-merging' },
          { label: 'دليل GitHub والتعاون و Pull Requests الاحترافية', href: '/articles/tooling-docs-04-github-pull-requests-readme' },
          { label: 'دليل النشر المجاني واستضافة المشاريع', href: '/articles/web-deployment-free-guide' },
        ],
      },
    ],
    milestoneProject: {
      title: 'تجهيز بيئة العمل الكاملة ونشر أول مستودع Git موثق مع سير عمل الفريق',
      subtitle: 'تطبيق عملي حقيقي يغطي التيرمينال، التفريع، وحل التعارضات، ورفع مستند موثق على GitHub',
      techStack: ['VS Code', 'Terminal / Bash', 'Git CLI', 'GitHub Markdown', 'Branching & PRs'],
      challenge:
        'إنشاء مستودع Git محلي عبر سطر الأوامر، وضبط ملف .gitignore احترافي، وإنشاء فرعين ومحاكاة تعارض ودمجه (Merge Conflict Resolution)، ثم رفع المشروع إلى GitHub مع وثيقة README غنية ومفصلة بخطة التعلم مع فتح Pull Request واعتماده.',
      projectLink: { label: 'دليل Git و GitHub العملي', href: '/articles/tooling-docs-03-git-fundamentals-branching-merging' },
    },
    nextStepPill: 'الانتقال إلى المرحلة 01: معمارية الويب والواجهات (HTML5 الكامل & Modern CSS3)',
  },
  {
    step: '01',
    level: 'beginner',
    role: 'Web Interface Developer',
    roleAr: 'مهندس هيكلة وتصميم واجهات الويب',
    title: 'المرحلة الأولى: معمارية الويب الدلالية، هندسة التنسيق، والتصميم المتجاوب (HTML5 & CSS3 & Tailwind)',
    duration: '4 – 5 أسابيع',
    description:
      'هيكل وتصميم صفحات الويب وفق أعلى المعايير القياسية العالمية (W3C و WHATWG). في هذه المحطة تتقن لغة HTML5 الدلالية، وتستوعب معماريات CSS المتقدمة (Flexbox, CSS Grid, Box Model)، ومبادئ التصميم المتجاوب Mobile-First، وإطار عمل Tailwind CSS مع إمكانية الوصول A11y ومعايير محركات البحث SEO.',
    prerequisites: [
      'إكمال المحطة 00 واستخدام التيرمينال ومحرر VS Code ومستودعات Git',
      'فهم كيفية استدعاء ملفات HTML و CSS وربطها بالمتصفح',
    ],
    learningOutcomes: [
      'بناء صفحات ويب دلالية Semantic HTML5 مطابقة تماماً لمعايير محركات البحث (SEO) وقارئات الشاشة (A11y)',
      'التحكم الكامل في الـ Forms والتحقق من صحة المدخلات ورفع الملفات وقيود الأمان',
      'تضمين الوسائط المتعددة (Images, Audio, Video, iframes) بأعلى أداء واستخدام Priority Hints و WebP/AVIF',
      'فهم عميق لـ CSS Box Model، المحددات (Selectors)، الهوامش المنهارة (Margin Collapse)، ونظام الأوزان (Specificity)',
      'احتراف التوزيعات الحديثة: Flexbox للواجهات المرنة أحادية البعد، و CSS Grid للتخطيطات ثنائية الأبعاد المعقدة',
      'إتقان التصميم المتجاوب (Responsive Design) مع Mobile-First و Media Queries و Container Queries',
      'كتابة CSS سريع وقابل للصيانة عبر Tailwind CSS ومعمارية BEM ومتغيرات CSS ونظام الوضع الليلي (Dark Mode)',
    ],
    accentClass: 'border-teal-500/40 bg-teal-500/10 text-teal-400',
    badgeClass: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
    glowClass: 'from-teal-500/20 via-teal-500/5 to-transparent',
    branches: [
      {
        id: 'html5-deep-dive',
        title: 'توثيق HTML5 الكامل والدلالي (Semantic HTML5 & Accessibility)',
        subtitle: 'الهيكل المعماري السليم، النماذج، الوسائط، ومحركات البحث',
        tag: 'معايير الويب القياسية',
        icon: Layers,
        topicGroups: [
          {
            groupTitle: '1. أساسيات ولغة التوصيف (HTML Basics & Structure)',
            items: [
              'مفهوم لغات التوصيف (Markup Languages) ومكانة HTML في الواجهات الأمامية',
              'بنية المستند الأساسية: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, وبيانات الـ `<meta>` والـ `<title>`',
              'الوسوم والسمات (Tags & Attributes): المعيار العالمي، عدم حساسية الأحرف، الكيانات الخاصة (HTML Entities)، والتعليقات والمسافات البيضاء',
              'وسوم النصوص والتنسيق الأساسي: العناوين `<h1>` إلى `<h6>`، الفقرات `<p>`، الروابط `<a>`، الفواصل `<hr>` و `<br>`، التوكيد `<strong>` و `<em>`، والرموز `<code>` و `<pre>`',
              'تجميع النصوص والسمات العامة: `<div>` و `<span>`، ومحددات المعرفات `id` والفئات `class`، وسمات البيانات المخصصة `data-*` و `style`',
            ],
          },
          {
            groupTitle: '2. القوائم، الجداول، والوسائط المتعددة (Lists, Tables & Media)',
            items: [
              'أنواع القوائم: القوائم المرتبة `<ol>`، غير المرتبة `<ul>`، قوائم التعريفات `<dl>, <dt>, <dd>`، والقوائم المتداخلة (Nested Lists)',
              'بنية الجداول الكاملة: `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>` والسمات `colspan` و `rowspan`',
              'تضمين الصور: الفرق بين `<img>` و `<figure>/<figcaption>`، واستخدام `alt`، وأبعاد العرض والارتفاع لمنع الـ CLS، و Priority Hints و `loading="lazy"`',
              'الصوت والفيديو والتضمين الخارجي: وسوم `<audio>` و `<video>` مع `<source>` و `controls`، وتضمين الـ `<iframe>` وسياسات الأمان CSP',
            ],
          },
          {
            groupTitle: '3. النماذج، الدلالات، وإمكانية الوصول (Forms, Semantics & A11y)',
            items: [
              'استخدام النماذج (Forms): الحقول `<input>` بأنواعها (text, email, password, number, checkbox, radio)، `<textarea>`، القوائم `<select>` و `<option>`',
              'عناصر التسمية والتحقق: وسوم `<label>` المرتبطة بـ `for/id`، رفع الملفات `type="file"`، والتحقق الأصلي (required, pattern, min/max)',
              'الوسوم الدلالية لهيكلة الصفحة: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`',
              'وسوم الاقتباس والمراجع: `<blockquote>`, `<q>`, `<cite>`, `<abbr>`, `<dfn>`, `<address>`، ووسوم إبراز التغييرات `<ins>`, `<del>`, `<s>`',
              'إمكانية الوصول (Web Accessibility): معايير WCAG، أدوار ARIA (role, aria-label, aria-expanded)، التصفح بالـ Keyboard و Focus States',
              'أساسيات الـ SEO في HTML: وسوم Meta الوصفية، الروابط الأساسية (Canonical URLs)، وبطاقات Open Graph و Twitter Cards',
            ],
          },
        ],
        links: [
          { label: 'توثيق HTML5 الكامل (6 دروس بالبلدي)', href: '/frontend/html' },
          { label: 'دليل وسوم HTML الأساسية الشامل', href: '/articles/html-basic-tags-guide' },
          { label: 'دليل وسوم HTML المتقدمة والدلالية', href: '/articles/advanced-html-tags-guide' },
        ],
      },
      {
        id: 'css3-architecture-tailwind',
        title: 'هندسة التنسيق والتصميم المتجاوب و Tailwind CSS (CSS3 Mastery)',
        subtitle: 'المظهر الاحترافي، أنظمة التوزيع، الحركة، وهندسة الأكواد الحديثة',
        tag: 'تصميم عالي الجودة',
        icon: Layout,
        topicGroups: [
          {
            groupTitle: '1. أساسيات وبنية CSS (Syntax & Box Model)',
            items: [
              'طرق تضمين CSS: Inline CSS، Internal CSS، و External CSS، وفهم أسبقية التدفق (Cascading Order)',
              'بنية القواعد والمحددات: Simple Selectors (النوع، الفئة، المعرف، العام، التجميع)، ومحددات السمات (Attribute Selectors)',
              'محددات الروابط (Combinators): الأبناء (`child >`)، السلالة (`descendant `)، الأخ المجاور (`adjacent sibling +`)، والأخوة العامة (`general sibling ~`)',
              'العناصر الشبه زائفة والفئات (Pseudo-classes & Pseudo-elements): `:hover`, `:focus`, `:active`, `:first-child`, `:nth-child()`, و `::before`, `::after`',
              'نموذج الصندوق (Box Model): تفصيل Content, Padding, Border, Margin، وتأثير `box-sizing: border-box`، وظاهرة Margin Collapse',
              'الألوان والوحدات: Hex, RGB, RGBA, HSL, HSLA، والوحدات المطلقة (px) مقابل النسبية (rem, em, %, vw, vh) ودوال CSS الحسابية (`calc()`, `min()`, `max()`, `clamp()`)',
            ],
          },
          {
            groupTitle: '2. التوزيع والمواقع وشبكات العرض (Display, Positioning & Layouts)',
            items: [
              'خاصية Display: الفرق الجوهري بين `inline` و `block` و `inline-block` و `none` مقابل `visibility: hidden`',
              'خاصية الموقع (Positioning): `static`, `relative`, `absolute`, `fixed`, `sticky`، ومفهوم سياق التكديس Z-Index & Stacking Context',
              'أوزان الخصائص والأسبقية (CSS Specificity): حساب نقاط المحددات وفهم كيفية تجنب استخدام `!important`',
              'توزيع العناصر بـ Flexbox: اتجاه المحاور (flex-direction)، المحاذاة (justify-content, align-items, align-self)، والنمو والانكماش (flex-grow, flex-shrink, flex-basis, gap)',
              'توزيع العناصر بـ CSS Grid: تعريف الأعمدة والصفوف (grid-template-columns, grid-template-rows, fr unit)، المناطق (grid-template-areas)، والملء التلقائي (auto-fit, auto-fill, minmax())',
            ],
          },
          {
            groupTitle: '3. التصميم المتجاوب، الحركة، ومعماريات الإنتاج (Responsive, Animations & Tailwind)',
            items: [
              'فلسفة التصميم المتجاوب (Responsive Web Design): منهجية Mobile-First ونقاط التوقف (Breakpoints) باستخدام Media Queries',
              'مستقبل التجاوب: استعلامات الحاويات (Container Queries) لتجاوب المكونات مع مساحتها وليس نافذة المتصفح فقط',
              'الحركة والانتقالات: خصائص Transitions، التحويلات ثنائية وثلاثية الأبعاد Transforms (translate, rotate, scale, skew)، والرسوم المتحركة بـ `@keyframes`',
              'المعالجات القبلية وهندسة الكود: Sass و SCSS، منهجية التسمية BEM، و CSS Modules لتفادي تضارب الفئات',
              'إطار عمل Tailwind CSS: الفئات المساعدة (Utility-First)، أنظمة التصميم (Design Tokens)، الوضع الليلي (Dark Mode)، وضغط الحزمة (JIT Compiler)',
            ],
          },
        ],
        links: [
          { label: 'توثيق CSS3 الكامل (8 دروس مفصلة)', href: '/frontend/css' },
          { label: 'أساسيات CSS للمبتدئين خطوة بخطوة', href: '/articles/css-tutorial-for-beginners' },
          { label: 'احتراف CSS الحديث و Tailwind CSS وأنظمة التصميم', href: '/articles/modern-css-mastery-tailwind-design-systems-responsive-ui' },
        ],
      },
    ],
    milestoneProject: {
      title: 'بناء منصة متجاوبة متعددة الأقسام مع لوحة تحكم شبكية ووضع داكن كامل ومعايير A11y',
      subtitle: 'مشروع حقيقي متكامل يجمع HTML5 دلالي متقدم و CSS Grid و Flexbox و Tailwind CSS',
      techStack: ['HTML5 Semantic', 'CSS Grid & Flexbox', 'Tailwind CSS', 'Responsive Mobile-First', 'Accessible Forms'],
      challenge:
        'بناء موقع متكامل (Landing Page + Dashboard Grid) متجاوب تماماً من 320px حتى 4K، يحتوي على جداول تفاعلية مجهزة للتمرير الأفقي، ونماذج تحقق كاملة، ويدعم التنقل بلوحة المفاتيح، مع تبديل وضع ليلي/نهاري مريح وفحص Lighthouse بنتيجة 98+ في Accessibility و Best Practices.',
      projectLink: { label: 'استعرض توثيق HTML و CSS على المنصة', href: '/frontend/html' },
    },
    nextStepPill: 'الانتقال إلى المرحلة 02: احتراف جافاسكريبت الشامل (75 درسًا موسوعيًا + 10 مشاريع)',
  },
  {
    step: '02',
    level: 'intermediate',
    role: 'Core JavaScript Engineer',
    roleAr: 'مهندس جافاسكريبت الشامل والمتعمق',
    title: 'المرحلة الثانية: احتراف لغة JavaScript الشامل (من محرك V8 وحتى الـ Event Loop والـ Web APIs)',
    duration: '8 – 10 أسابيع',
    description:
      'العمود الفقري الحقيقي لكل مهندس واجهات أمامية. بدون إتقان جافاسكريبت بمستواها المعماري، تصبح أطر العمل مثل React مجرد سحر غامض. هنا تدرس المنهج الأضخم: 75 درساً موسوعياً (أكثر من 780,000 كلمة و 221 جدولاً و 4,000 كود) مع 10 مشاريع عملية كاملة.',
    prerequisites: [
      'إتقان المرحلة 01: بناء العناصر الدلالية بـ HTML5 وتنسيقها بـ CSS3 المتجاوب',
      'فهم المنطق البرمجي العام والرغبة في استيعاب ما يجري داخل ذاكرة الحاسوب',
    ],
    learningOutcomes: [
      'فهم تشريح محركات جافاسكريبت (V8, SpiderMonkey) ومراحل التنفيذ (Call Stack, Memory Heap, Lexical Scope, Hoisting)',
      'السيطرة الكاملة على أنواع البيانات، مقارنات التساوي الخوارزمية (SameValue, SameValueZero)، والتحويل الضمني والصريح (Coercion)',
      'إتقان البرمجة الكائنية وتدفق الوراثة عبر سلاسل الـ Prototypes وفئات ES6 Classes',
      'التحكم الاحترافي في شجرة الـ DOM ومعالجة الأحداث بأنماط Bubbling و Capturing و Event Delegation',
      'احتراف البرمجة غير المتزامنة: الـ Event Loop، طوابير Microtasks و Macrotasks، الـ Promises، والـ async/await',
      'التواصل مع السيرفر عبر Fetch API وإلغاء الطلبات بـ AbortController وتتبع الأخطاء بـ DevTools',
      'إتقان ميزات JavaScript الحديثة (ES6 حتى ES2025)، والوحدات البرمجية (ES Modules vs CommonJS)، و Web Storage و Browser APIs',
    ],
    accentClass: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400',
    badgeClass: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    glowClass: 'from-yellow-500/20 via-yellow-500/5 to-transparent',
    branches: [
      {
        id: 'js-core-foundations',
        title: 'الأساسيات المعمارية وأنواع البيانات والمحرك (Engine, Variables & Types)',
        subtitle: 'المرحلة 01 إلى 05 من منهج جافاسكريبت',
        tag: 'فهم أسرار الذاكرة',
        icon: Terminal,
        topicGroups: [
          {
            groupTitle: '1. مقدمة اللغة والمتغيرات والأنواع (Introduction, Variables & Types)',
            items: [
              'مقدمة وتاريخ JavaScript: كيف نشأت، معايير ECMAScript وتطورها، ولجنة TC39 والمراحل الأربع للاقتراحات',
              'المتغيرات وأماكن التخزين: مقارنة تفصيلية بين `var` و `let` و `const`، نطاقات المتغيرات (Block, Function, Global Scopes)',
              'ظاهرة الرفع (Hoisting) والمنطقة الميتة المؤقتة Temporal Dead Zone (TDZ)',
              'أنواع البيانات البدائية (Primitive Types): string, number, bigint, boolean, undefined, null, symbol',
              'التحويل بين الأنواع (Type Casting): التحويل الصريح مقابل التحويل الضمني (Implicit Coercion) ومخاطره',
            ],
          },
          {
            groupTitle: '2. المقارنات، العوامل، والتحكم بالتدفق (Equality, Operators & Control Flow)',
            items: [
              'خوارزميات التساوي في المحرك: الفرق الدقيق بين `==` و `===` و `Object.is` وخوارزميات `isLooselyEqual` و `SameValue` و `SameValueZero`',
              'العمليات والتعبيرات (Expressions & Operators): الحسابية، المنطقية (Short-circuiting)، الشرطية الثلاثية (Ternary)، دمج القيم الخالية (`??`)، والربط الاختياري (`?.`)',
              'بنى التحكم والتكرار: `if/else`, `switch`، وحلقات `for`, `while`, `do...while`, `for...of`, `for...in` مع `break` و `continue`',
              'إدارة الاستثناءات والأخطاء: `try`, `catch`, `finally`، إطلاق الأخطاء بـ `throw`، وأنواع كائنات الأخطاء المدمجة (TypeError, ReferenceError, SyntaxError)',
            ],
          },
        ],
        links: [
          { label: 'توثيق JavaScript الكامل (75 درسًا)', href: '/frontend/javascript' },
          { label: 'المرحلة 01: أساسيات اللغة والبيانات (الدروس 1-5)', href: '/frontend/javascript#phase-01' },
          { label: 'المرحلة 02: المتغيرات والأنواع (الدروس 6-12)', href: '/frontend/javascript#phase-02' },
          { label: 'المرحلة 03: العمليات والتحكم (الدروس 13-20)', href: '/frontend/javascript#phase-03' },
        ],
      },
      {
        id: 'js-functions-objects-data',
        title: 'الدوال، الكائنات، وهياكل البيانات وسلاسل الـ Prototypes',
        subtitle: 'المرحلة 04 إلى 08 من منهج جافاسكريبت',
        tag: 'أهم موضوع في المقابلات',
        icon: Code2,
        topicGroups: [
          {
            groupTitle: '1. هندسة الدوال والنطاقات والـ Closures (Functions & Scope)',
            items: [
              'أنماط تعريف الدوال: Function Declarations مقابل Function Expressions وسلوك الـ Hoisting بينهما',
              'الدوال السهمية (Arrow Functions): القواعد، الإرجاع الضمني، وغياب كائن `arguments` وسلوك `this` المعجمي',
              'المعاملات المتقدمة: المعاملات الافتراضية (Default Parameters) ومعاملات البقية (Rest Parameters `...args`)',
              'الدوال الذاتية الاستدعاء (IIFE) ودوال الرتب العليا (Higher-Order Functions) وتطبيقات Callback Functions',
              'سلسلة النطاقات والـ Closures: فهم Lexical Environment وكيف تحتفظ الدوال بذاكرتها واستخداماتها في حماية البيانات (Encapsulation)',
              'الاستدعاء الذاتي (Recursion): شروط الإيقاف (Base Case) وإدارة Call Stack وتفادي الـ Stack Overflow',
            ],
          },
          {
            groupTitle: '2. المصفوفات، الكائنات، والبرمجة كائنية التوجه (Arrays, Objects & OOP)',
            items: [
              'المصفوفات وهياكل البيانات: طرق الإضافة والحذف، ودوال التحويل الشهيرة (`map`, `filter`, `reduce`, `flat`, `flatMap`)',
              'المجموعات المتقدمة المدمجة (Keyed Collections): كائنات `Map` و `Set` و `WeakMap` و `WeakSet` وتطبيقات إدارة الذاكرة',
              'الكائنات وتفكيك البيانات: Object Literals، التفكيك (Destructuring) للكائنات والمصفوفات، ومعامل النشر (Spread Operator)',
              'دوال الكائنات الثابتة: `Object.keys`, `Object.values`, `Object.entries`, `Object.freeze`, و `Object.seal`',
              'سلوك الكلمة المفتاحية `this`: في الدوال، الكائنات، الأحداث، وأدوات الربط الصريح (`call`, `apply`, `bind`)',
              'الوراثة وسلاسل الـ Prototypes: فهم `prototype` و `__proto__`، والوراثة بالكائنات مقابل فئات ES6 Classes (constructor, extends, super, static, getters/setters)',
            ],
          },
        ],
        links: [
          { label: 'المرحلة 04: الدوال المتقدمة (الدروس 21-30)', href: '/frontend/javascript#phase-04' },
          { label: 'المرحلة 05: المصفوفات والنصوص (الدروس 31-40)', href: '/frontend/javascript#phase-05' },
          { label: 'المرحلة 06: الكائنات وهياكل البيانات (الدروس 41-49)', href: '/frontend/javascript#phase-06' },
          { label: 'المرحلة 07: Scope و this و OOP (الدروس 50-57)', href: '/frontend/javascript#phase-07' },
        ],
      },
      {
        id: 'js-dom-async-browser',
        title: 'الـ DOM، البرمجة غير المتزامنة، والـ Event Loop و Web APIs',
        subtitle: 'المرحلة 09 إلى 11 من منهج جافاسكريبت والمشاريع العملية',
        tag: 'لبّ الويب التفاعلي',
        icon: Zap,
        topicGroups: [
          {
            groupTitle: '1. شجرة الـ DOM وتدفق الأحداث (DOM & Events Architecture)',
            items: [
              'معمارية شجرة الـ DOM: التمييز الدقيق بين Nodes و Elements وطرق التحديد السريعة (`querySelector`, `getElementById`)',
              'إنشاء وتعديل وحذف العناصر: `createElement`, `append`, `prepend`, `remove`، وإدارة الـ ClassList و Styles و Attributes',
              'تدفق الأحداث المتقدم (Event Flow): مراحل Event Capturing، Target، و Event Bubbling، واستخدام `stopPropagation` و `preventDefault`',
              'نمط تفويض الأحداث (Event Delegation): إدارة أحداث القوائم والجداول الكبيرة عبر مستمع واحد عالي الكفاءة',
            ],
          },
          {
            groupTitle: '2. البرمجة غير المتزامنة والـ Event Loop (Asynchronous JavaScript)',
            items: [
              'البرمجة المتزامنة مقابل غير المتزامنة: كيف تنجز جافاسكريبت الأحادية الخيط مهاماً متعددة دون تجميد الواجهة',
              'تشريح الـ Event Loop بالكامل: Call Stack، و Web APIs، وطابور المهام الدقيقة (Microtask Queue للـ Promises)، وطابور المهام العامة (Macrotask Queue للـ Timers)',
              'الوعود (Promises): فهم الحالات (Pending, Fulfilled, Rejected)، وسلسلة الوعود، ودوال `Promise.all`, `Promise.race`, `Promise.allSettled`, `Promise.any`',
              'البرمجة غير المتزامنة بـ `async/await`: كتابة كود يشبه الكود المتزامن، ومعالجة الأخطاء الشاملة بـ `try/catch`',
              'التخاطب الشبكي بـ Fetch API: استدعاء الـ REST APIs، إرسال ترويسات Headers والـ Body، وإلغاء الطلبات بـ `AbortController`',
            ],
          },
          {
            groupTitle: '3. واجهات المتصفح الحديثة وتصحيح الأخطاء (Browser APIs & Modern JS)',
            items: [
              'التخزين في المتصفح: مقارنة تفصيلية بين LocalStorage و SessionStorage والـ Cookies الآمنة وتخزين IndexedDB',
              'واجهات المتصفح المدمجة (Web APIs): Clipboard API، Geolocation API، Notifications API، و Intersection Observer',
              'وحدات جافاسكريبت (Modules): معايير ES Modules (`import`/`export`) مقابل CommonJS (`require`) في السيرفر والمتصفح',
              'أدوات تصحيح الأخطاء (Browser DevTools): استخدام نقاط التوقف (Breakpoints)، مراقبة Call Stack، واكتشاف تسريبات الذاكرة (Memory Leaks)',
            ],
          },
        ],
        links: [
          { label: 'المرحلة 09: الـ DOM وتدفق الأحداث (الدروس 60-64)', href: '/frontend/javascript#phase-09' },
          { label: 'المرحلة 10: البرمجة غير المتزامنة والـ Event Loop (الدروس 65-71)', href: '/frontend/javascript#phase-10' },
          { label: 'المرحلة 11: جافاسكريبت الحديثة و Browser APIs (الدروس 72-75)', href: '/frontend/javascript#phase-11' },
          { label: 'دليل تصحيح أخطاء جافاسكريبت الاحترافي', href: '/articles/javascript-debugging-errors-guide' },
        ],
      },
    ],
    milestoneProject: {
      title: 'إنجاز المشاريع العشرة التطبيقية المكتملة في توثيق جافاسكريبت (P01 إلى P10)',
      subtitle: 'مشاريع متدرجة الصعوبة مبنية بكود Vanilla JS خالص بدون أي مكتبات أو أطر عمل خارجية',
      techStack: ['Vanilla JS (ES6+)', 'DOM Manipulation', 'Event Delegation', 'Async / Fetch', 'LocalStorage', 'Browser APIs'],
      challenge:
        'إنجاز المشاريع العشرة الرسمية: الآلة الحاسبة العلمية، لعبة تخمين الأرقام، تطبيق إدارة المهام Todo List، تطبيق الاختبارات التفاعلي Quiz App، تطبيق الطقس بالـ API الحي، متتبع المصروفات Expense Tracker، سلة التسوق التفاعلية Shopping Cart، مستكشف مستخدمي GitHub، لوحة التحكم المتقدمة Dashboard، والمشروع الختامي الشامل Final Project.',
      projectLink: { label: 'استعرض المشاريع العشرة في قسم جافاسكريبت', href: '/frontend/javascript#projects' },
    },
    nextStepPill: 'الانتقال إلى المرحلة 03: احتراف React.js الكامل ومنظومة الـ Hooks المتقدمة',
  },
  {
    step: '03',
    level: 'intermediate',
    role: 'React Frontend Engineer',
    roleAr: 'مهندس واجهات متخصص في مكتبة React.js',
    title: 'المرحلة الثالثة: احتراف مكتبة React.js الكامل، منظومة الـ Hooks، وإدارة الحالة (React 19)',
    duration: '6 – 8 أسابيع',
    description:
      'الانتقال من جافاسكريبت التقليدية إلى بناء تطبيقات أحادية الصفحة (SPA) معقدة وقابلة للتوسع. منهج React الكامل المكون من 10 فصول تطبيقية يغطي المعمارية الداخلية، منظومة الـ Hooks، إدارة النماذج، والتوجيه، وإدارة الحالة العالمية، وإدارة بيانات السيرفر.',
    prerequisites: [
      'إتقان عميق لـ ES6+ (Destructuring, Spread, Arrow Functions, Array Methods)',
      'فهم الـ Closures والـ Promises والـ Async/Await وتدفق الأحداث في DOM (Stage 02)',
    ],
    learningOutcomes: [
      'فهم معمارية React الداخلية: Virtual DOM ومحرك React Fiber وآلية المطابقة (Reconciliation) وشجرة المكونات',
      'إتقان القواعد الأساسية: صيغة JSX، المكونات الوظيفية، تفكيك وتمرير الـ Props، وتكوين المكونات (Component Composition)',
      'التحكم التام في منظومة الـ Hooks الأساسية: `useState`, `useEffect`, `useRef`, `useReducer`, `useMemo`, `useCallback`, `useContext`',
      'بناء الـ Custom Hooks لإعادة استخدام المنطق البرمجي (Business Logic) عبر شاشات التطبيق بكفاءة',
      'إدارة الحالة العامة للمشروع والتحرر من الـ Prop Drilling باستخدام Context API ومكتبة Zustand السريعة',
      'بناء نماذج الإدخال المعقدة بكفاءة قصوى والتحقق الصارم بـ React Hook Form ومخططات Zod Schemas',
      'إدارة حالة السيرفر والـ Caching والتحديثات المتفائلة والتزامن بـ TanStack Query v5 (React Query)',
      'مواكبة مميزات React 19 والتحسينات المتقدمة لمعمارية الأداء وتفادي إعادة الرندر الزائدة بـ Profiler و React.memo',
    ],
    accentClass: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
    badgeClass: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    glowClass: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
    branches: [
      {
        id: 'react-core-architecture',
        title: 'معمارية المكونات، JSX، ومنظومة الـ Hooks (React Fundamentals & Hooks)',
        subtitle: 'الفصول 1 إلى 7 من توثيق React.js الكامل',
        tag: 'الأساس المعماري لـ React',
        icon: Code2,
        topicGroups: [
          {
            groupTitle: '1. أساسيات المكونات والرندر (Component Basics & Rendering)',
            items: [
              'مقدمة React: لماذا نستخدم React؟ والفرق بين التطبيقات متعددة الصفحات (MPA) والتطبيقات أحادية الصفحة (SPA)',
              'المكونات الوظيفية (Functional Components): قواعد كتابة JSX، استخدام التعابير البرمجية، وتصدير واستيراد المكونات',
              'الخصائص (Props) وتكوين المكونات: تمرير البيانات، الخصائص الافتراضية، خاصية `children`، ونمط Component Composition',
              'الرندر الشرطي والقوائم: عرض العناصر شرطياً بـ (`&&` و Ternary)، وتوليد القوائم عبر `.map()` وأهمية خاصية `key` الفريدة لمنع المشاكل الأدائية',
              'مفهوم شجرة الـ Virtual DOM: كيف يحسب React الفروقات عبر Reconciliation ومحرك React Fiber لتحديث الشاشة بأقل تكلفة',
            ],
          },
          {
            groupTitle: '2. إدارة الحالة ودورة الحياة بـ Hooks (State & Lifecycle Hooks)',
            items: [
              'إدارة الحالة بـ `useState`: مفهوم الـ Immutability، تحديث المصفوفات والكائنات، وتفادي الأخطاء الشائعة في التحديث المتزامن',
              'الآثار الجانبية ودورة الحياة بـ `useEffect`: متى يُستدعى؟ مصفوفة الاعتماديات (Dependency Array)، ودالة التنظيف (Cleanup Function)',
              'التعامل مع عناصر DOM المباشرة بـ `useRef`: حفظ المراجع بدون التسبب في إعادة الرندر، والتحكم في حقول الإدخال والـ Timers',
              'إدارة الحالات المعقدة بـ `useReducer`: مقارنة `useState` مع `useReducer` ونمط Actions و Reducer Function',
              'تحسين الأداء الحسابي: حفظ نتائج العمليات الثقيلة بـ `useMemo` وتثبيت مراجع الدوال البرمجية بـ `useCallback`',
              'بناء الـ Custom Hooks: قواعد الـ Hooks، وكيفية استخراج المنطق البرمجي المشترك في دوال تبدأ بـ `use`',
            ],
          },
        ],
        links: [
          { label: 'فهرس توثيق React.js الكامل (10 فصول بالعامية)', href: '/frontend/react' },
          { label: 'الفصل 1: المكونات والـ Virtual DOM', href: '/articles/react-docs-01-intro-components-virtual-dom' },
          { label: 'الفصل 5: useEffect ودورة الحياة وجلب البيانات', href: '/articles/react-docs-05-useeffect-lifecycle-data-fetching' },
          { label: 'دليل React Hooks العملي للمبتدئين', href: '/articles/react-hooks-beginners-guide' },
        ],
      },
      {
        id: 'react-ecosystem-advanced',
        title: 'منظومة الإنتاج، النماذج، التوجيه، وإدارة الحالة (Ecosystem & Production Readiness)',
        subtitle: 'الفصول 8 إلى 10 من توثيق React: التوجيه، النماذج، البيانات، والأداء',
        tag: 'جاهزية سوق العمل',
        icon: Workflow,
        topicGroups: [
          {
            groupTitle: '1. التوجيه وإدارة النماذج والتحقق (Routing, Forms & Validation)',
            items: [
              'التوجيه في تطبيقات الـ SPA بـ React Router: تعريف المسارات `Routes`, `Route`, المعاملات الديناميكية `useParams`, والـ Query Parameters بـ `useSearchParams`',
              'المسارات المتداخلة (Nested Routes) ومكون المخرج `<Outlet>` والروابط الذكية `<Link>` و `<NavLink>` وحماية المسارات الخاصة (Protected Routes)',
              'بناء النماذج الاحترافية بـ React Hook Form: تسجيل الحقول بـ `register`، تقليل إعادة الرندر، والتعامل السلس مع الأخطاء',
              'التحقق الصارم من صحة البيانات بـ Zod: بناء Schemas للمدخلات، وربط Zod مع React Hook Form عبر `@hookform/resolvers/zod`',
            ],
          },
          {
            groupTitle: '2. إدارة الحالة وبيانات السيرفر والأداء (State Management & Data Fetching)',
            items: [
              'إدارة الحالة العامة (Global State Management): متى نستخدم Context API؟ ومكتبة Zustand السريعة كبديل خفيف وعصري لـ Redux',
              'إدارة بيانات السيرفر بـ TanStack Query v5: مفهوم Caching، حالات التحميل والخطأ (`isLoading`, `isError`)، إعادة الجلب بالخلفية، والتحديثات المتفائلة (Optimistic Updates)',
              'مكتبات المكونات وواجهات المستخدم (UI Libraries): Tailwind CSS، مكونات Headless UI (Radix UI, Shadcn UI) للتصميم المرن',
              'معمارية الأداء وتحديثات React 19: تقسيم الكود بـ `React.lazy` و `Suspense`، التقاط الانهيارات بـ `ErrorBoundary`، وتحسينات الرندر المتقدمة',
            ],
          },
        ],
        links: [
          { label: 'الفصل 8: النماذج والتحقق الصارم بـ RHF و Zod', href: '/articles/react-docs-08-forms-validation-rhf-zod' },
          { label: 'الفصل 9: التوجيه بـ React Router وإدارة بيانات السيرفر', href: '/articles/react-docs-09-routing-and-tanstack-query' },
          { label: 'الفصل 10: معمارية الأداء الفائق وتحديثات React 19', href: '/articles/react-docs-10-performance-architecture-react-19' },
          { label: 'دليل معماريات React 19 والـ Server Actions', href: '/articles/react-19-architecture-deep-dive-server-actions' },
        ],
      },
    ],
    milestoneProject: {
      title: 'بناء منصة تفاعلية لإدارة المهام والمشاريع مع سلة تسوق وإدارة حالة معقدة بـ TanStack Query',
      subtitle: 'تطبيق SPA متكامل يربط React 19 مع React Router و TanStack Query و React Hook Form و Zod و Zustand',
      techStack: ['React 19', 'React Router v6', 'TanStack Query v5', 'React Hook Form', 'Zod Schemas', 'Zustand', 'Tailwind CSS'],
      challenge:
        'بناء تطبيق SPA تفاعلي كامل متصل بواجهات API حقيقية، يدعم البحث والفلترة اللحظية بدون إعادة رندر زائدة، مع نظام تحقق صارم من النماذج، وسلة تسوق محفوظة بالحالة العامة، وإدارة أخطاء احترافية بـ Error Boundaries مع دعم الوضع الداكن.',
      projectLink: { label: 'ابدأ دراسة توثيق React.js الشامل', href: '/frontend/react' },
    },
    nextStepPill: 'الانتقال إلى المرحلة 04: إتقان Next.js وبيئة الإنتاج السحابية و TypeScript الصارمة',
  },
  {
    step: '04',
    level: 'advanced',
    role: 'Next.js & Full-Stack Specialist',
    roleAr: 'متخصص تطبيقات Next.js والإنتاج السحابي و TypeScript',
    title: 'المرحلة الرابعة: إتقان Next.js App Router، السيرفرات السحابية، و TypeScript الصارمة للمشاريع الكبرى',
    duration: '6 – 8 أسابيع',
    description:
      'المعيار الأكثر طلباً في كبرى شركات التكنولوجيا في العالم والشرق الأوسط. تجمع هذه المحطة بين قوة React وسرعة السيرفر والأمان الفائق عبر Next.js App Router (RSC, Server Actions)، مع حماية الكود بنظام TypeScript الصارم، وتطبيق التوثيق الأمني وإدارة الجلسات.',
    prerequisites: [
      'إتقان عميق لـ React.js ومفاهيم الـ Hooks وإدارة الحالة (Stage 03)',
      'فهم كيفية تخاطب السيرفر والعميل عبر بروتوكول HTTP وأكواد الحالة',
    ],
    learningOutcomes: [
      'إتقان لغة TypeScript: الأنواع الأساسية، Interfaces، Type Aliases، الـ Generics، والـ Utility Types لتأمين مشاريع React بالكامل',
      'فهم معمارية Next.js App Router والفرق الجوهري بين مكونات السيرفر (RSC) ومكونات العميل (Client Components)',
      'استيعاب استراتيجيات الرندر الحديثة: Static Site Generation (SSG)، Server-Side Rendering (SSR)، و Incremental Static Regeneration (ISR)',
      'إتقان العمليات السيرفرية بـ Server Actions لحفظ البيانات دون الحاجة لكتابة REST API مستقلة للواجهة',
      'حماية المسارات وإدارة المصادقة الأمنية (Authentication بـ HttpOnly Cookies و JWT) باستخدام Next.js Middleware',
      'تحسين محركات البحث الديناميكي (Dynamic Metadata، خريطة الموقع sitemap.xml، ملف robots.txt، والـ Open Graph)',
      'نشر المشاريع على السحابة (Vercel / Hostinger / Docker) وضبط متغيرات البيئة باحترافية وضمان الأداء الأقصى',
    ],
    accentClass: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    glowClass: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    branches: [
      {
        id: 'typescript-strict-mastery',
        title: 'تايب سكريبت الصارمة للمشاريع الكبرى (Strict TypeScript for React)',
        subtitle: 'حماية الكود، الأمان النوعي، وتفادي أخطاء الـ Runtime الشائعة',
        tag: 'شرط إلزامي للشركات',
        icon: Cpu,
        topicGroups: [
          {
            groupTitle: '1. أساسيات الأنواع والـ Interfaces والـ Generics',
            items: [
              'مقدمة TypeScript: لماذا نستخدمها؟ وكيف يعمل الـ Transpiler لإنتاج كود JavaScript نظيف',
              'الأنواع البدائية والخاصة: number, string, boolean, arrays, tuples, enums, any vs unknown, void, never',
              'مقارنة Interfaces مقابل Type Aliases: الوراثة (`extends`)، الدمج التلقائي (Declaration Merging)، واستخدام Union و Intersection Types',
              'احتراف الـ Generics: كتابة دوال ومكونات وواجهات قابلة لإعادة الاستخدام مع الحفاظ على الأمان النوعي الصارم',
            ],
          },
          {
            groupTitle: '2. الأنواع المساعدة و TypeScript داخل React',
            items: [
              'أدوات الأنواع المساعدة (Utility Types): `Partial`, `Required`, `Readonly`, `Record`, `Pick`, `Omit`, `Exclude`, `Extract`',
              'تحديد أنواع مكونات React: أنواع الـ Props، الـ State، معالجات الأحداث (Event Handlers مثل `React.MouseEvent`, `React.ChangeEvent`)',
              'تحديد أنواع الـ Hooks: تحديد نوع الـ Refs بـ `useRef<HTMLInputElement>(null)`، والـ Context، ومستودعات البيانات مع مكتبات إدارة الحالة',
            ],
          },
        ],
        links: [
          { label: 'دليل TypeScript الشامل للإنتاج وهندسة المشاريع', href: '/articles/comprehensive-typescript-guide-types-generics-patterns' },
        ],
      },
      {
        id: 'nextjs-deep-architecture',
        title: 'معمارية Next.js App Router والسيرفرات (RSC, Data Fetching & Caching)',
        subtitle: 'التوجيه المتقدم، الرندر السيرفري، وإدارة البيانات والذاكرة المؤقتة',
        tag: 'معيار الويب الحديث',
        icon: Rocket,
        topicGroups: [
          {
            groupTitle: '1. بنية التوجيه والمكونات (App Router & Component Architecture)',
            items: [
              'مقدمة Next.js: لماذا نستخدم Next.js؟ ومقارنته بالأطر الأخرى مثل Remix و Vite SPA',
              'معمارية مجلد `app`: الصفحات (`page.tsx`)، التخطيطات العامة والفرعية (`layout.tsx`)، القوالب (`template.tsx`)، وشاشات التحميل (`loading.tsx`) والأخطاء (`error.tsx`, `not-found.tsx`)',
              'مكونات السيرفر مقابل مكونات العميل: الفرق المعماري بين Server Components (RSC) و Client Components ومحدد `"use client"`',
              'أنماط التوجيه المتقدمة: المسارات الديناميكية `[slug]`، المسارات المتوازية (Parallel Routes `@slot`)، واعتراض المسارات (Intercepting Routes `(..)`)',
              'مسارات الواجهة البرمجية (Route Handlers): كتابة دوال `GET`, `POST`, `PUT`, `DELETE` داخل ملفات `route.ts`',
            ],
          },
          {
            groupTitle: '2. جلب البيانات والتخزين المؤقت والـ Server Actions',
            items: [
              'استراتيجيات الرندر: Server-Side Rendering (SSR)، Static Site Generation (SSG)، و Incremental Static Regeneration (ISR) عبر `revalidate`',
              'معمارية التخزين المؤقت (Next.js Caching Architecture): Request Memoization، Data Cache، Full Route Cache، و Router Cache',
              'إلغاء التخزين المؤقت وتحديث البيانات: استخدام `revalidatePath` و `revalidateTag` لإعادة توليد الصفحات فورياً',
              'العمليات السيرفرية (Server Actions): تنفيذ الطفرات (Mutations) على الخادم مباشرة عبر `"use server"` وتكاملها مع النماذج ونظام الأمان',
            ],
          },
          {
            groupTitle: '3. الأمان، التحسينات، والنشر السحابي (Security, Optimization & Deployment)',
            items: [
              'برمجيات الوسيط (Middleware): فحص الطلبات، إعادة التوجيه، وحماية المسارات الخاصة ومنع الوصول غير المصرح به',
              'المصادقة وإدارة الجلسات: توثيق المستخدمين عبر JWT والـ HttpOnly Cookies المشفرة وتفادي ثغرات التخزين المحلي',
              'تحسينات الموارد المدمجة: تحسين الصور بـ `<Image>` (تلقائية الحجم والضغط)، تحسين الخطوط بـ `next/font`، وسكربتات الطرف الثالث بـ `<Script>`',
              'تحسين محركات البحث الديناميكي (SEO): دالة `generateMetadata`، وتوليد خرائط الموقع الديناميكية `sitemap.xml` وملف `robots.txt`',
              'خيارات النشر في بيئات الإنتاج: النشر التلقائي على Vercel، السيرفرات الخاصة Node.js Server عبر PM2، حاويات Docker، والتصدير الثابت Static Export',
            ],
          },
        ],
        links: [
          { label: 'دليل Next.js App Router الشامل للإنتاج والأداء', href: '/articles/nextjs-app-router-engineering-guide-production-performance' },
          { label: 'مقارنة أمان JWT: التخزين في Cookies أم LocalStorage', href: '/articles/jwt-storage-localstorage-vs-httponly-cookies' },
          { label: 'دليل النشر المجاني للمشاريع على السيرفرات السحابية', href: '/articles/web-deployment-free-guide' },
        ],
      },
    ],
    milestoneProject: {
      title: 'بناء منصة تجارة إلكترونية / محتوى رقمي Full-Stack بـ Next.js و TypeScript مع Server Actions ومصادقة آمنة',
      subtitle: 'مشروع إنتاجي متكامل يطبق معايير الشركات الكبرى مع SSR و Caching و SEO ديناميكي متفوق',
      techStack: ['Next.js 15 (App Router)', 'TypeScript Strict', 'Server Actions', 'HttpOnly Cookies & Auth', 'Zod', 'Tailwind CSS', 'Vercel / Cloud'],
      challenge:
        'بناء تطبيق Full-Stack حقيقي يجمع بين الصفحات الثابتة والسيرفرية، يحتوي على نظام تسجيل دخول بالمصادقة الآمنة عبر Middleware و Cookies، مع لوحة تحكم كاملة لإدارة المنتجات أو المقالات عبر Server Actions، وتطبيق الـ Caching و Revalidation اللحظي مع تحقيق نتيجة 95+ في فحص Lighthouse.',
      projectLink: { label: 'اقرأ دليل Next.js App Router للإنتاج', href: '/articles/nextjs-app-router-engineering-guide-production-performance' },
    },
    nextStepPill: 'الانتقال إلى المرحلة 05: مستوى مهندس البرمجيات المحترف (المعمارية، الاختبارات، والأمان)',
  },
  {
    step: '05',
    level: 'advanced',
    role: 'Senior Frontend Engineer & Tech Lead',
    roleAr: 'مهندس واجهات خبير (Senior Engineer & Tech Lead)',
    title: 'المرحلة الخامسة: مستوى مهندس البرمجيات المحترف (المعمارية، الاختبارات الآلية، الأداء والأمان ومقابلات العمل)',
    duration: 'مستمر (مسار الاحتراف الدائم)',
    description:
      'المحطة التي تفصل بين من يكتب كوداً يعمل بالصدفة، ومهندس برمجيات حقيقي قادر على قيادة فرق التطوير، وتصميم معماريات برمجية ضخمة قابلة للتوسع، وتطبيق أتمتة الاختبارات الشاملة، ورفع سرعة الأداء وتأمين الأنظمة ضد الاختراق.',
    prerequisites: [
      'خبرة متينة في بناء وتطوير تطبيقات Next.js و React و TypeScript كاملة (Stage 04)',
      'الرغبة في الانتقال إلى مصاف المطورين المحترفين في كبرى الشركات التقنية الإقليمية والعالمية',
    ],
    learningOutcomes: [
      'تنظيم المشاريع الضخمة وفق معمارية Feature-Sliced Design (FSD) ومبادئ Clean Code و SOLID في الواجهات الأمامية',
      'بناء هرم الاختبارات الآلية الشامل: Unit & Integration بـ Vitest، واختبار المكونات بـ React Testing Library، واختبارات E2E بـ Playwright',
      'قياس وتحسين مؤشرات الأداء الحيوية للويب Core Web Vitals (LCP, INP, CLS) وتحليل وتجزئة الحزم بـ Bundle Analyzers',
      'تأمين تطبيقات الواجهة الأمامية ضد أشهر ثغرات الويب: OWASP Top 10 (XSS, CSRF, Clickjacking) وتهيئة سياسات المحتوى الصارمة CSP',
      'بناء أنظمة التصميم (Design Systems) ومكونات الـ Headless UI القابلة لإعادة الاستخدام عبر مشاريع الشركة',
      'إعداد خطوط التكامل والنشر المستمر CI/CD عبر GitHub Actions لاختبار وتدقيق الكود تلقائياً قبل كل عملية دمج',
      'بناء ملف أعمال (Portfolio) استثنائي، وتجاوز المقابلات الفنية المعمارية ومقابلات الـ Live Coding في مصر والخليج والعالم',
    ],
    accentClass: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
    badgeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    glowClass: 'from-purple-500/20 via-purple-500/5 to-transparent',
    branches: [
      {
        id: 'arch-clean-code-solid',
        title: 'المعمارية الحديثة ومبادئ الكود النظيف (Architecture, Clean Code & SOLID)',
        subtitle: 'هندسة كود قابل للصيانة والتوسع مع نمو الفريق وحجم المشروع',
        tag: 'مستوى القيادة الهندسية',
        icon: Gauge,
        topicGroups: [
          {
            groupTitle: '1. معمارية المشاريع وأنظمة التصميم (Project Structure & Design Systems)',
            items: [
              'تنظيم مجلدات المشاريع الضخمة: مقارنة معمارية Feature-Based ومعمارية الطبقات الصارمة Feature-Sliced Design (FSD)',
              'بناء أنظمة التصميم (Design Systems): مكتبات المكونات المشتركة، توحيد الألوان والخطوط (Design Tokens)، ومكونات Headless UI المفتوحة',
              'معمارية المكونات المعقدة: Compound Components Pattern، Render Props Pattern، ومكونات التحكم بالوصول والمحتوى المشروط',
            ],
          },
          {
            groupTitle: '2. الكود النظيف ومبادئ SOLID (Clean Code & SOLID Principles)',
            items: [
              'مبادئ SOLID الخمسة وتطبيقها العملي داخل واجهات الفرونت إند ومكونات React',
              'مبادئ هندسة البرمجيات العامة: DRY (لا تكرر نفسك)، KISS (اجعلها بسيطة)، YAGNI (لن تحتاجها الآن)، وتجنب الـ Premature Optimization',
              'إدارة الأكواد المتباعدة: عزل منطق الأعمال (Business Logic) تماماً عن طبقة العرض والـ UI عبر Custom Hooks و Services',
            ],
          },
        ],
        links: [
          { label: 'معمارية الفرونت إند الحديثة وإدارة الحالة والمكونات', href: '/articles/modern-frontend-architecture-state-management-component-design' },
          { label: 'دليل الكود النظيف ومبادئ SOLID وأنماط التصميم للواجهات', href: '/articles/clean-code-solid-design-patterns-practical-guide' },
        ],
      },
      {
        id: 'qa-automated-testing-cicd',
        title: 'الاختبارات الآلية وضمان الجودة و CI/CD (QA & Automated Testing)',
        subtitle: 'حماية النظام من الانهيار وثقة كاملة في كل عملية نشر للإنتاج',
        tag: 'معيار الشركات العالمية',
        icon: ShieldCheck,
        topicGroups: [
          {
            groupTitle: '1. هرم الاختبارات واختبارات الوحدة والتكامل (Unit & Integration Testing)',
            items: [
              'فلسفة اختبارات البرمجيات: هرم الاختبارات (Testing Pyramid) والتوازن بين السرعة وتكلفة الصيانة',
              'اختبارات الوحدة السريعة (Unit Tests): كتابة الاختبارات باستخدام Vitest أو Jest للدوال الصافية ومعالجة البيانات',
              'اختبار مكونات الواجهة بـ React Testing Library: التركيز على سلوك المستخدم بدلاً من تفاصيل التنفيذ الداخلية (Avoid Implementation Details)',
              'محاكاة استدعاءات الشبكة: استخدام Mock Service Worker (MSW) لاعتراض طلبات الـ API ومحاكاة الاستجابات وحالات الفشل بأمان',
            ],
          },
          {
            groupTitle: '2. الاختبارات الشاملة وأتمتة النشر (E2E Testing & CI/CD Pipelines)',
            items: [
              'اختبارات المسار الكامل End-to-End (E2E) بـ Playwright أو Cypress: محاكاة تفاعل المستخدم الحقيقي، ملء النماذج، تسجيل الدخول، واختبار الشراء',
              'خطوط التكامل والنشر المستمر (CI/CD Pipelines) بـ GitHub Actions: تشغيل الـ Linters (ESLint, Prettier)، فحص الأنواع TypeScript، وتشغيل الاختبارات آلياً قبل كل Merge',
            ],
          },
        ],
        links: [
          { label: 'دليل الاختبارات البرمجية الشامل Unit & Integration & E2E', href: '/articles/complete-software-testing-guide-unit-integration-e2e' },
        ],
      },
      {
        id: 'performance-security-careers',
        title: 'الأداء الفائق، أمان الويب، والمسار المهني ومقابلات العمل (Performance, Security & Career)',
        subtitle: 'الوصول لقمة السرعة والأمان وتخطي أصعب المقابلات الفنية',
        tag: 'النخبة وسوق العمل',
        icon: Rocket,
        topicGroups: [
          {
            groupTitle: '1. الأداء الفائق ومؤشرات Core Web Vitals (Web Performance)',
            items: [
              'مؤشرات الويب الحيوية الثلاثة (Core Web Vitals): LCP (سرعة التحميل الأكبر)، INP (سرعة التفاعل والاستجابة)، و CLS (ثبات العناصر ومنع القفزات)',
              'تقنيات تسريع التحميل: تحليل حجم الحزم (Bundle Analysis)، تقسيم الكود (Code Splitting)، التحميل الديناميكي، وتنظيف المكتبات الزائدة (Tree Shaking)',
              'استخدام أدوات الفحص المتقدمة: تدقيق الأداء بـ Google Lighthouse، وتبويب Performance في Chrome DevTools لتحديد الاختناقات',
            ],
          },
          {
            groupTitle: '2. أمان الواجهات الأمامية والـ OWASP Top 10 (Web Security)',
            items: [
              'الحماية ضد أشهر الثغرات الأمنية: Cross-Site Scripting (XSS) وطرق التطهير (Sanitization)، وثغرات CSRF، و Clickjacking',
              'سياسات أمان المتصفح: سياسة أمان المحتوى الصارمة Content Security Policy (CSP)، ضبط ترويسات الأمان (Security Headers)، ومشاركة الموارد عبر الأصول (CORS)',
            ],
          },
          {
            groupTitle: '3. المسار المهني، الـ Portfolio ومقابلات التوظيف (Career & Interviews)',
            items: [
              'بناء ملف أعمال (Portfolio) نوعي: تصميم ونشر 2 إلى 3 مشاريع إنتاجية كبرى ذات قيمة حقيقية بدل المشاريع المكررة',
              'استخدام أدوات الذكاء الاصطناعي (Claude Code / Cursor) لرفع الإنتاجية بدون الإضرار بجودة الأساسيات الهندسية',
              'التحضير للمقابلات التقنية المعقدة في مصر والخليج والعالم: مقابلات الـ Live Coding، أسئلة معمارية الأنظمة، والأسئلة السلوكية',
            ],
          },
        ],
        links: [
          { label: 'تحسين الأداء و Core Web Vitals ومؤشرات السرعة', href: '/articles/web-performance-core-web-vitals-speed-optimization' },
          { label: 'دليل أمان الويب ومعايير OWASP Top 10 للمطورين', href: '/articles/web-security-developer-guide-owasp-top-10' },
          { label: 'بناء أول مشروع احترافي للـ Portfolio الشخصي', href: '/articles/build-first-programming-project-portfolio' },
          { label: 'أسئلة انترفيو البرمجة في مصر والخليج 2027', href: '/articles/programming-interview-questions-egypt-gulf-2027' },
        ],
      },
    ],
    milestoneProject: {
      title: 'مشروع التخرج الهندسي النهائي الكبير (The Capstone Engineering Platform)',
      subtitle: 'مشروع الإنتاج الحقيقي الذي يثبت أهليتك الهندسية كـ Senior Frontend Engineer أمام أي شركة عالمية',
      techStack: [
        'Next.js 15 App Router',
        'TypeScript Strict Mode',
        'React 19 & TanStack Query',
        'Feature-Sliced Design (FSD)',
        'Automated Tests (Vitest & Playwright)',
        'Core Web Vitals 95+',
        'OWASP Security & Strict CSP',
        'CI/CD GitHub Actions',
      ],
      challenge:
        'بناء منصة SaaS سحابية أو منصة تجارة إلكترونية كاملة، مبنية بمعمارية نظيفة، مغطاة باختبارات Unit واختبارات E2E، مع زمن استجابة فائق وحماية أمنية صارمة، ونشر مؤتمت عبر CI/CD وتحقيق درجة 95+ في مقاييس الأداء والأمان.',
      projectLink: { label: 'استعرض دليل بناء مشاريع الـ Portfolio الاحترافية', href: '/articles/build-first-programming-project-portfolio' },
    },
    nextStepPill: 'مبروك! لقد وصلت إلى مستوى مهندس واجهات محترف (Senior Engineer) مؤهل للمنافسة العالمية',
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
  const [searchQuery, setSearchQuery] = useState('');

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
    const elem = document.getElementById(`stage-${step}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredMilestones = ROADMAP_MILESTONES.filter(milestone => {
    if (activeFilter !== 'all' && milestone.level !== activeFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const titleMatch = milestone.title.toLowerCase().includes(q);
    const descMatch = milestone.description.toLowerCase().includes(q);
    const branchMatch = milestone.branches.some(b =>
      b.title.toLowerCase().includes(q) ||
      b.topicGroups.some(g =>
        g.groupTitle.toLowerCase().includes(q) ||
        g.items.some(item => item.toLowerCase().includes(q))
      )
    );
    return titleMatch || descMatch || branchMatch;
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
              <span>خارطة طريق هندسة الفرونت إند 2027 • المنهج التفصيلي الشامل (المطابق لمعايير Roadmap.sh)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              خارطة الطريق الكاملة: من أساسيات الويب إلى Senior Frontend Engineer
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted max-w-3xl leading-relaxed">
              تفكيك تفصيلي ودقيق لمسار هندسة الواجهات الأمامية بالكامل (Internet, Git, HTML5, CSS3, JavaScript, React.js, Next.js, TypeScript, Architecture & Testing)، مصممة بالعامية المصرية ومربوطة بمئات الدروس والمشاريع العملية على المنصة.
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

        {/* Search & Topic Lookup Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث في محاور ومواضيع الخارطة (مثل: Event Loop, Flexbox, Next.js, Zod)..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-border bg-surface text-xs font-sans text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-foreground-muted hover:text-foreground"
              >
                مسح
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-xl text-xs font-bold border border-border bg-surface hover:bg-surface-hover text-foreground-secondary transition-colors"
            >
              توسيع كل المحطات
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-xl text-xs font-bold border border-border bg-surface hover:bg-surface-hover text-foreground-secondary transition-colors"
            >
              طي الكل
            </button>
          </div>
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-bold text-foreground-muted ml-2">فلترة حسب المستوى:</span>
          {[
            { id: 'all', label: 'كافة المحطات (00 إلى 05)' },
            { id: 'beginner', label: 'المبتدئ (00 و 01)' },
            { id: 'intermediate', label: 'المتوسط (02 و 03)' },
            { id: 'advanced', label: 'المتقدم (04 و 05)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                activeFilter === tab.id
                  ? 'bg-primary text-black border-primary shadow-sm'
                  : 'bg-surface hover:bg-surface-hover border-border text-foreground-secondary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Roadmap Milestones Sequence */}
      <div className="space-y-10">
        {filteredMilestones.map(milestone => {
          const isExpanded = expandedStages[milestone.step] !== false;
          const isCompleted = completedStages.includes(milestone.step);
          const isCurrent = currentStageBookmark === milestone.step;

          return (
            <div
              key={milestone.step}
              id={`stage-${milestone.step}`}
              className={`rounded-3xl border transition-all duration-300 relative overflow-hidden bg-card shadow-card ${
                isCurrent
                  ? 'border-primary ring-2 ring-primary/20 shadow-2xl'
                  : 'border-border/80 hover:border-border'
              }`}
            >
              {/* Header Box */}
              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-primary px-3.5 py-1 rounded-2xl bg-primary/10 border border-primary/20">
                      {milestone.step}
                    </span>
                    <div>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${milestone.badgeClass}`}>
                        {milestone.roleAr}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-foreground mt-1">
                        {milestone.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setStageAsCurrent(milestone.step)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        isCurrent
                          ? 'bg-primary/20 text-primary border-primary/40'
                          : 'bg-surface hover:bg-surface-hover border-border text-foreground-muted'
                      }`}
                      title="تحديد كمحطتي الحالية"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      <span>{isCurrent ? 'محطتك الحالية' : 'أنا هنا الآن'}</span>
                    </button>

                    <button
                      onClick={() => toggleStageCompletion(milestone.step)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        isCompleted
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          : 'bg-surface hover:bg-surface-hover border-border text-foreground-muted'
                      }`}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{isCompleted ? 'مكتملة ✓' : 'تحديد كمكتملة'}</span>
                    </button>

                    <button
                      onClick={() => toggleStageExpand(milestone.step)}
                      className="p-2 rounded-xl bg-surface hover:bg-surface-hover border border-border text-foreground-muted hover:text-foreground transition-colors"
                      aria-label="تبديل العرض"
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed max-w-4xl">
                  {milestone.description}
                </p>

                {/* Duration & Prerequisites Chips */}
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface border border-border text-foreground-secondary">
                    <span className="text-foreground-muted">المدة المقدرة:</span>
                    <span className="font-bold text-foreground">{milestone.duration}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface border border-border text-foreground-secondary">
                    <span className="text-foreground-muted">المتطلبات السابقة:</span>
                    <span className="font-bold text-foreground">{milestone.prerequisites[0]}</span>
                  </div>
                </div>
              </div>

              {/* Collapsible Content: Detailed Branches and Topics */}
              {isExpanded && (
                <div className="px-6 sm:px-8 pb-8 space-y-8 border-t border-border/70 pt-8 bg-surface/30">
                  {/* Learning Outcomes */}
                  <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-3">
                    <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>مخرجات التعلم والكفاءة الهندسية لهذه المحطة:</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {milestone.learningOutcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-foreground-secondary">
                          <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Branches & Detailed Topic Groups */}
                  <div className="space-y-6">
                    {milestone.branches.map(branch => {
                      const IconComponent = branch.icon;

                      return (
                        <div
                          key={branch.id}
                          className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-5"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-base font-bold text-foreground">
                                    {branch.title}
                                  </h4>
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-elevated border border-border text-foreground-muted">
                                    {branch.tag}
                                  </span>
                                </div>
                                <p className="text-xs text-foreground-muted mt-0.5">
                                  {branch.subtitle}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Topic Groups Breakdown */}
                          <div className="space-y-4">
                            {branch.topicGroups.map((group, gIdx) => (
                              <div
                                key={gIdx}
                                className="rounded-xl border border-border/60 bg-surface/50 p-4 space-y-2.5"
                              >
                                <h5 className="text-xs font-extrabold text-foreground flex items-center gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                  <span>{group.groupTitle}</span>
                                </h5>
                                <ul className="space-y-1.5 pr-3 list-none">
                                  {group.items.map((item, iIdx) => (
                                    <li
                                      key={iIdx}
                                      className="text-xs text-foreground-secondary flex items-start gap-2 leading-relaxed"
                                    >
                                      <span className="text-primary/70 font-mono text-[11px] mt-0.5">▪</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* Related Platform Links */}
                          {branch.links && branch.links.length > 0 && (
                            <div className="pt-2 flex flex-wrap items-center gap-2">
                              <span className="text-xs font-bold text-foreground-muted ml-2">دروس وتوثيقات المنصة ذات الصلة:</span>
                              {branch.links.map((link, lIdx) => (
                                <Link
                                  key={lIdx}
                                  href={link.href}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-surface hover:bg-surface-hover border border-border text-foreground hover:text-primary transition-colors"
                                >
                                  <span>{link.label}</span>
                                  <ExternalLink className="h-3 w-3 opacity-60" />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Milestone Practical Project */}
                  <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                          تحدي الإتقان العملي لهذه المحطة
                        </span>
                        <h4 className="text-base font-black text-foreground mt-0.5">
                          {milestone.milestoneProject.title}
                        </h4>
                        <p className="text-xs text-foreground-muted">
                          {milestone.milestoneProject.subtitle}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        {milestone.milestoneProject.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-surface text-[10px] font-mono font-bold text-foreground-secondary border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-foreground-secondary leading-relaxed bg-card/60 p-4 rounded-xl border border-border/60">
                      {milestone.milestoneProject.challenge}
                    </p>

                    {milestone.milestoneProject.projectLink && (
                      <div className="pt-1">
                        <Link href={milestone.milestoneProject.projectLink.href}>
                          <Button size="sm" className="gap-1.5 font-bold text-xs">
                            <Rocket className="h-3.5 w-3.5" />
                            <span>{milestone.milestoneProject.projectLink.label}</span>
                            <ArrowLeft className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Next Step Pill */}
                  <div className="pt-2 text-center">
                    <span className="inline-block text-xs font-bold text-foreground-muted px-4 py-1.5 rounded-full bg-surface border border-border">
                      {milestone.nextStepPill}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Capstone Project Section */}
      <section className="rounded-3xl border border-primary/40 bg-gradient-to-br from-card via-surface to-card p-6 sm:p-10 shadow-card space-y-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-bold">
            <Award className="h-3.5 w-3.5" />
            <span>مشروع التخرج الهندسي الشامل لمسار الواجهات الأمامية</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-foreground">
            المشروع النهائي: بناء منصة إنتاجية كبرى قابلة للتوسع بمستوى الشركات العالمية
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
