import {
  JS_DOCS_CURRICULUM,
  JS_DOCS_PHASES,
} from '@/data/javascript-docs-curriculum';
import { HTML_DOCS_CURRICULUM } from '@/data/html-docs-curriculum';
import { CSS_DOCS_CURRICULUM } from '@/data/css-docs-curriculum';
import { REACT_DOCS_CURRICULUM } from '@/data/react-docs-curriculum';
import { STATIC_ARTICLES } from '@/data/static-articles';

export interface CurriculumLessonItem {
  number: number;
  slug: string;
  title: string;
  shortTitle: string;
  phaseNumber?: number;
  phaseTitle?: string;
  difficulty?: string;
  readTimeMinutes?: number;
}

export interface CurriculumPhaseGroup {
  number: number;
  title: string;
  arTitle: string;
  lessons: CurriculumLessonItem[];
}

export interface CurriculumContext {
  track: 'javascript' | 'react' | 'html' | 'css' | 'frontend' | 'general';
  trackTitle: string;
  trackSubtitle: string;
  trackHubUrl: string;
  storageKey?: string;
  lessonNumber?: number;
  totalLessons?: number;
  phaseTitle?: string;
  difficulty?: string;
  previousLesson?: {
    slug: string;
    title: string;
    shortTitle?: string;
    number?: number;
  } | null;
  nextLesson?: {
    slug: string;
    title: string;
    shortTitle?: string;
    number?: number;
  } | null;
  phases: CurriculumPhaseGroup[];
}

interface CuratedTrackDefinition {
  id: string;
  trackTitle: string;
  trackSubtitle: string;
  trackHubUrl: string;
  storageKey: string;
  slugs: string[];
}

const CURATED_TRACKS: CuratedTrackDefinition[] = [
  {
    id: 'fundamentals',
    trackTitle: 'مسار أساسيات الويب والبرمجة',
    trackSubtitle: 'المسار التأسيسي لتعلم البرمجة و HTML و CSS و JavaScript من الصفر',
    trackHubUrl: '/frontend',
    storageKey: 'khamsa_fundamentals_learner_progress',
    slugs: [
      'learn-programming-from-scratch',
      'html-tutorial-for-beginners',
      'html-basic-tags-guide',
      'advanced-html-tags-guide',
      'css-tutorial-for-beginners',
      'javascript-tutorial-for-beginners',
    ],
  },
  {
    id: 'academic_career',
    trackTitle: 'دليل التخصصات الحاسوبية والمسار المهني',
    trackSubtitle: 'مقارنات شاملة وعملية لطلاب وخريجي كليات الحاسبات والمعلومات',
    trackHubUrl: '/articles',
    storageKey: 'khamsa_academic_career_learner_progress',
    slugs: [
      'information-systems-guide',
      'difference-between-cs-is-se-guide',
    ],
  },
  {
    id: 'adv_frontend',
    trackTitle: 'هندسة الواجهات الأمامية وجافاسكريبت المتقدمة',
    trackSubtitle: 'الأنماط المعمارية الحديثة، معالجة الأخطاء، وإدارة الأداء في الإنتاج',
    trackHubUrl: '/frontend/javascript',
    storageKey: 'khamsa_adv_frontend_learner_progress',
    slugs: [
      'modern-javascript-comprehensive-guide-es6-async',
      'javascript-debugging-errors-guide',
      'modern-css-mastery-tailwind-design-systems-responsive-ui',
      'modern-frontend-architecture-state-management-component-design',
      'web-performance-core-web-vitals-speed-optimization',
    ],
  },
  {
    id: 'react_nextjs',
    trackTitle: 'مسار معمارية React و Next.js المتكامل',
    trackSubtitle: 'من الـ Hooks الحديثة حتى Server Components ومحرك Next.js App Router',
    trackHubUrl: '/frontend/react',
    storageKey: 'khamsa_react_next_learner_progress',
    slugs: [
      'react-hooks-beginners-guide',
      'react-19-architecture-server-components-advanced-hooks',
      'nextjs-app-router-engineering-guide-production-performance',
    ],
  },
  {
    id: 'typescript',
    trackTitle: 'مسار هندسة الأنواع بـ TypeScript',
    trackSubtitle: 'دليل المطور الشامل للـ Generics والأنماط المعمارية للإنتاج',
    trackHubUrl: '/frontend',
    storageKey: 'khamsa_typescript_learner_progress',
    slugs: [
      'comprehensive-typescript-guide-types-generics-patterns',
    ],
  },
  {
    id: 'backend_distributed',
    trackTitle: 'معمارية الباك إند وهندسة النظم الموزعة',
    trackSubtitle: 'من بناء الـ APIs النظيفة حتى قواعد البيانات والتخزين المؤقت وتأمين النظم',
    trackHubUrl: '/articles',
    storageKey: 'khamsa_backend_distributed_learner_progress',
    slugs: [
      'advanced-nodejs-engineering-event-loop-streams-workers',
      'build-rest-api-express-nodejs',
      'building-production-restful-apis-express-clean-architecture',
      'database-architecture-sql-postgresql-vs-nosql-mongodb',
      'comprehensive-mongodb-guide-indexing-aggregation-performance',
      'advanced-caching-redis-strategies-practical-patterns',
      'graphql-vs-rest-apis-architectural-comparison-practical-guide',
      'web-security-developer-guide-owasp-top-10',
      'authentication-authorization-jwt-sessions-oauth2-rbac',
      'system-design-guide-monolith-to-distributed-scale',
      'clean-software-engineering-solid-principles-design-patterns',
      'complete-software-testing-guide-unit-integration-e2e',
    ],
  },
  {
    id: 'devops_tooling',
    trackTitle: 'مسار أدوات المطورين و DevOps والإنتاج',
    trackSubtitle: 'احتراف Git و Docker والنشر السحابي وأدوات الـ AI للمطورين',
    trackHubUrl: '/articles',
    storageKey: 'khamsa_devops_tooling_learner_progress',
    slugs: [
      'git-github-practical-guide',
      'professional-git-github-branching-strategies-cicd',
      'practical-docker-containerization-guide-web-developers',
      'web-deployment-free-guide',
      'claude-code-cli-developer-guide',
      'يعني-إيه-api-شرح-api-للمبتدئين-وكيف-تعمل-واجهات-برمجة-التطبيقات',
    ],
  },
];

export function getCurriculumContextBySlug(slug: string): CurriculumContext | null {
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();

  // 1. Check JavaScript Curriculum (75 lessons)
  const jsIndex = JS_DOCS_CURRICULUM.findIndex(
    ch => ch.slug.toLowerCase() === cleanSlug
  );
  if (jsIndex !== -1) {
    const current = JS_DOCS_CURRICULUM[jsIndex];
    const prev = jsIndex > 0 ? JS_DOCS_CURRICULUM[jsIndex - 1] : null;
    const next =
      jsIndex < JS_DOCS_CURRICULUM.length - 1
        ? JS_DOCS_CURRICULUM[jsIndex + 1]
        : null;

    const phase = JS_DOCS_PHASES.find(p => p.number === current.phaseNumber);

    const phases: CurriculumPhaseGroup[] = JS_DOCS_PHASES.map(p => ({
      number: p.number,
      title: p.title,
      arTitle: p.arTitle,
      lessons: JS_DOCS_CURRICULUM.filter(ch => ch.phaseNumber === p.number).map(ch => ({
        number: ch.number,
        slug: ch.slug,
        title: ch.arTitle,
        shortTitle: ch.arTitle,
        phaseNumber: ch.phaseNumber,
        phaseTitle: p.arTitle,
        difficulty: ch.difficulty,
        readTimeMinutes: Math.ceil(ch.targetWordCount / 200),
      })),
    }));

    return {
      track: 'javascript',
      trackTitle: 'توثيق JavaScript الكامل',
      trackSubtitle: '75 درساً مرجعياً + 10 مشاريع عملية',
      trackHubUrl: '/frontend/javascript',
      storageKey: 'khamsa_js_docs_learner_progress',
      lessonNumber: current.number,
      totalLessons: JS_DOCS_CURRICULUM.length,
      phaseTitle: phase ? `${phase.folder}: ${phase.arTitle}` : undefined,
      difficulty: current.difficulty,
      previousLesson: prev
        ? { slug: prev.slug, title: prev.arTitle, number: prev.number }
        : null,
      nextLesson: next
        ? { slug: next.slug, title: next.arTitle, number: next.number }
        : null,
      phases,
    };
  }

  // 2. Check React.js Curriculum (10 chapters)
  const reactIndex = REACT_DOCS_CURRICULUM.findIndex(
    ch => ch.slug.toLowerCase() === cleanSlug
  );
  if (reactIndex !== -1) {
    const current = REACT_DOCS_CURRICULUM[reactIndex];
    const prev = reactIndex > 0 ? REACT_DOCS_CURRICULUM[reactIndex - 1] : null;
    const next =
      reactIndex < REACT_DOCS_CURRICULUM.length - 1
        ? REACT_DOCS_CURRICULUM[reactIndex + 1]
        : null;

    const phases: CurriculumPhaseGroup[] = [
      {
        number: 1,
        title: 'React.js Core & Ecosystem',
        arTitle: 'فصول توثيق React.js العشرة',
        lessons: REACT_DOCS_CURRICULUM.map(ch => ({
          number: ch.number,
          slug: ch.slug,
          title: ch.title,
          shortTitle: ch.shortTitle,
          readTimeMinutes: ch.readTimeMinutes,
        })),
      },
    ];

    return {
      track: 'react',
      trackTitle: 'توثيق React.js الرسمي بالبلدي',
      trackSubtitle: '10 فصول شاملة من الصفر حتى React 19',
      trackHubUrl: '/frontend/react',
      storageKey: 'khamsa_react_docs_learner_progress',
      lessonNumber: current.number,
      totalLessons: REACT_DOCS_CURRICULUM.length,
      phaseTitle: 'منهج React.js الكامل',
      previousLesson: prev
        ? { slug: prev.slug, title: prev.shortTitle || prev.title, number: prev.number }
        : null,
      nextLesson: next
        ? { slug: next.slug, title: next.shortTitle || next.title, number: next.number }
        : null,
      phases,
    };
  }

  // 3. Check HTML5 Curriculum (6 chapters)
  const htmlIndex = HTML_DOCS_CURRICULUM.findIndex(
    ch => ch.slug.toLowerCase() === cleanSlug
  );
  if (htmlIndex !== -1) {
    const current = HTML_DOCS_CURRICULUM[htmlIndex];
    const prev = htmlIndex > 0 ? HTML_DOCS_CURRICULUM[htmlIndex - 1] : null;
    const next =
      htmlIndex < HTML_DOCS_CURRICULUM.length - 1
        ? HTML_DOCS_CURRICULUM[htmlIndex + 1]
        : null;

    const phases: CurriculumPhaseGroup[] = [
      {
        number: 1,
        title: 'HTML5 Semantic & Modern Web',
        arTitle: 'دروس توثيق HTML5 الكاملة',
        lessons: HTML_DOCS_CURRICULUM.map(ch => ({
          number: ch.number,
          slug: ch.slug,
          title: ch.title,
          shortTitle: ch.shortTitle,
          readTimeMinutes: ch.readTimeMinutes,
        })),
      },
    ];

    return {
      track: 'html',
      trackTitle: 'توثيق HTML5 الكامل بالبلدي',
      trackSubtitle: '6 دروس في الهيكلة الدلالية وإمكانية الوصول A11y',
      trackHubUrl: '/frontend/html',
      storageKey: 'khamsa_html_docs_learner_progress',
      lessonNumber: current.number,
      totalLessons: HTML_DOCS_CURRICULUM.length,
      phaseTitle: 'منهج HTML5 الدلالي',
      previousLesson: prev
        ? { slug: prev.slug, title: prev.shortTitle || prev.title, number: prev.number }
        : null,
      nextLesson: next
        ? { slug: next.slug, title: next.shortTitle || next.title, number: next.number }
        : null,
      phases,
    };
  }

  // 4. Check CSS3 Curriculum (8 chapters)
  const cssIndex = CSS_DOCS_CURRICULUM.findIndex(
    ch => ch.slug.toLowerCase() === cleanSlug
  );
  if (cssIndex !== -1) {
    const current = CSS_DOCS_CURRICULUM[cssIndex];
    const prev = cssIndex > 0 ? CSS_DOCS_CURRICULUM[cssIndex - 1] : null;
    const next =
      cssIndex < CSS_DOCS_CURRICULUM.length - 1
        ? CSS_DOCS_CURRICULUM[cssIndex + 1]
        : null;

    const phases: CurriculumPhaseGroup[] = [
      {
        number: 1,
        title: 'Modern CSS3 & Responsive Architecture',
        arTitle: 'دروس توثيق CSS3 الكاملة',
        lessons: CSS_DOCS_CURRICULUM.map(ch => ({
          number: ch.number,
          slug: ch.slug,
          title: ch.title,
          shortTitle: ch.shortTitle,
          readTimeMinutes: ch.readTimeMinutes,
        })),
      },
    ];

    return {
      track: 'css',
      trackTitle: 'توثيق CSS3 الكامل بالبلدي',
      trackSubtitle: '8 دروس في Box Model و Flexbox و CSS Grid المتجاوب',
      trackHubUrl: '/frontend/css',
      storageKey: 'khamsa_css_docs_learner_progress',
      lessonNumber: current.number,
      totalLessons: CSS_DOCS_CURRICULUM.length,
      phaseTitle: 'منهج CSS3 الحديث',
      previousLesson: prev
        ? { slug: prev.slug, title: prev.shortTitle || prev.title, number: prev.number }
        : null,
      nextLesson: next
        ? { slug: next.slug, title: next.shortTitle || next.title, number: next.number }
        : null,
      phases,
    };
  }

  // 5. Check Curated Technology Tracks for Static Articles
  const matchedTrack = CURATED_TRACKS.find(track =>
    track.slugs.some(s => s.toLowerCase() === cleanSlug)
  );

  if (matchedTrack) {
    const trackArticles: CurriculumLessonItem[] = [];
    matchedTrack.slugs.forEach((s, idx) => {
      const art = STATIC_ARTICLES.find(a => a.slug.toLowerCase() === s.toLowerCase());
      if (art) {
        trackArticles.push({
          number: idx + 1,
          slug: art.slug,
          title: art.title,
          shortTitle: art.title,
          readTimeMinutes: art.readTimeMinutes,
        });
      }
    });

    const currentIndex = trackArticles.findIndex(
      a => a.slug.toLowerCase() === cleanSlug
    );

    if (currentIndex !== -1) {
      const current = trackArticles[currentIndex];
      const prev = currentIndex > 0 ? trackArticles[currentIndex - 1] : null;
      const next =
        currentIndex < trackArticles.length - 1
          ? trackArticles[currentIndex + 1]
          : null;

      const phases: CurriculumPhaseGroup[] = [
        {
          number: 1,
          title: matchedTrack.id,
          arTitle: matchedTrack.trackTitle,
          lessons: trackArticles,
        },
      ];

      return {
        track: 'frontend',
        trackTitle: matchedTrack.trackTitle,
        trackSubtitle: matchedTrack.trackSubtitle,
        trackHubUrl: matchedTrack.trackHubUrl,
        storageKey: matchedTrack.storageKey,
        lessonNumber: current.number,
        totalLessons: trackArticles.length,
        phaseTitle: matchedTrack.trackTitle,
        previousLesson: prev
          ? { slug: prev.slug, title: prev.shortTitle || prev.title, number: prev.number }
          : null,
        nextLesson: next
          ? { slug: next.slug, title: next.shortTitle || next.title, number: next.number }
          : null,
        phases,
      };
    }
  }

  // 6. Generic Fallback for Any Standalone Static Article
  const staticIndex = STATIC_ARTICLES.findIndex(
    a => a.slug.toLowerCase() === cleanSlug
  );
  if (staticIndex !== -1) {
    const current = STATIC_ARTICLES[staticIndex];
    const sameCat = STATIC_ARTICLES.filter(
      a => a.category.toLowerCase() === current.category.toLowerCase()
    );
    const catIndex = sameCat.findIndex(
      a => a.slug.toLowerCase() === cleanSlug
    );
    const prev = catIndex > 0 ? sameCat[catIndex - 1] : null;
    const next = catIndex < sameCat.length - 1 ? sameCat[catIndex + 1] : null;

    const phases: CurriculumPhaseGroup[] = [
      {
        number: 1,
        title: current.category,
        arTitle: `مقالات ${current.category}`,
        lessons: sameCat.map((a, idx) => ({
          number: idx + 1,
          slug: a.slug,
          title: a.title,
          shortTitle: a.title,
          readTimeMinutes: a.readTimeMinutes,
        })),
      },
    ];

    return {
      track: 'general',
      trackTitle: `قسم ${current.category}`,
      trackSubtitle: `سلسلة شروحات ${current.category} الهندسية`,
      trackHubUrl: '/articles',
      lessonNumber: catIndex !== -1 ? catIndex + 1 : undefined,
      totalLessons: sameCat.length,
      phaseTitle: current.category,
      previousLesson: prev
        ? { slug: prev.slug, title: prev.title, number: catIndex }
        : null,
      nextLesson: next
        ? { slug: next.slug, title: next.title, number: catIndex + 2 }
        : null,
      phases,
    };
  }

  return null;
}
