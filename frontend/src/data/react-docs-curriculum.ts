export interface ReactDocChapter {
  number: number;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  topics: string[];
  readTimeMinutes: number;
}

export const REACT_DOCS_CURRICULUM: ReactDocChapter[] = [
  {
    number: 1,
    slug: 'react-docs-01-intro-components-virtual-dom',
    title: 'توثيق React.js بالبلدي (الفصل 1): المقدمة، فلسفة الـ Components، والـ Virtual DOM من الصفر',
    shortTitle: 'المقدمة وفلسفة الـ Components و Virtual DOM',
    summary:
      'افهم ليه React اتعملت أصلاً، الفرق بين البرمجة الأمرية والتصريحية، إزاي الـ Virtual DOM والـ Reconciliation بيشتغلوا من جوه، وإعداد أول مشروع بـ Vite خطوة بخطوة.',
    topics: ['Declarative UI', 'Components Tree', 'Virtual DOM & Fiber', 'Vite Setup', 'StrictMode'],
    readTimeMinutes: 25,
  },
  {
    number: 2,
    slug: 'react-docs-02-jsx-and-props-deep-dive',
    title: 'توثيق React.js بالبلدي (الفصل 2): شرح JSX بالكامل وقواعده والـ Props وإعادة الاستخدام',
    shortTitle: 'شرح JSX بالكامل والـ Props والـ Composition',
    summary:
      'إزاي JSX بيتحول لكود JavaScript، قواعد كتابة JSX بدون أخطاء، تمرير الـ Props و children، والفرق بين الوراثة والـ Component Composition.',
    topics: ['JSX Compilation', 'Fragments', 'Props & Destructuring', 'Children Prop', 'Composition'],
    readTimeMinutes: 25,
  },
  {
    number: 3,
    slug: 'react-docs-03-state-usestate-rerendering',
    title: 'توثيق React.js بالبلدي (الفصل 3): إدارة الحالة (State) و useState والـ Immutability وفهم الـ Re-rendering',
    shortTitle: 'إدارة الحالة (useState) و Immutability و Re-rendering',
    summary:
      'إيه الفرق الجوهري بين المتغير العادي والـ State، إزاي React بتعمل Snapshot للبيانات، ليه بنعمل State Batching، وإزاي تحدث المصفوفات والكائنات بدون Mutation.',
    topics: ['useState', 'Render & Commit', 'State Batching', 'Immutability', 'Lifting State Up'],
    readTimeMinutes: 28,
  },
  {
    number: 4,
    slug: 'react-docs-04-events-lists-conditional-rendering',
    title: 'توثيق React.js بالبلدي (الفصل 4): الأحداث (Events)، القوائم (Lists & Keys)، والعرض الشرطي',
    shortTitle: 'الأحداث، القوائم والمفاتيح، والعرض الشرطي',
    summary:
      'التعامل مع Synthetic Events ومنع الأخطاء الشائعة في الـ Event Handlers، رسم القوائم بـ map()، سر اختيار الـ key الصح، وأنماط Conditional Rendering النظيفة.',
    topics: ['Synthetic Events', 'Event Propagation', 'Lists & Keys', 'Conditional Rendering', 'Controlled UI'],
    readTimeMinutes: 25,
  },
  {
    number: 5,
    slug: 'react-docs-05-useeffect-lifecycle-data-fetching',
    title: 'توثيق React.js بالبلدي (الفصل 5): شرح useEffect ودورة حياة المكون وجلب البيانات بدون أخطاء',
    shortTitle: 'useEffect ودورة حياة المكون وجلب البيانات',
    summary:
      'إمتى تحتاج useEffect وإمتى تبقى غلطة معمارية، مصفوفة الاعتماديات، دالة التنظيف (Cleanup)، وحل مشاكل Race Conditions و AbortController عند جلب البيانات.',
    topics: ['useEffect Mental Model', 'Dependency Array', 'Cleanup Function', 'AbortController', 'You Might Not Need an Effect'],
    readTimeMinutes: 30,
  },
  {
    number: 6,
    slug: 'react-docs-06-advanced-hooks-ref-reducer-memo',
    title: 'توثيق React.js بالبلدي (الفصل 6): الـ Hooks المتقدمة: useRef و useReducer و useMemo و useCallback',
    shortTitle: 'الـ Hooks المتقدمة (useRef, useReducer, Memo)',
    summary:
      'متى تستخدم useRef بدون Re-render، الوصول للـ DOM الحقيقي، إدارة الحالات المعقدة بـ useReducer، ومتى تستخدم useMemo و useCallback و React.memo بوعي.',
    topics: ['useRef & forwardRef', 'useReducer', 'useMemo', 'useCallback', 'useId & useLayoutEffect'],
    readTimeMinutes: 30,
  },
  {
    number: 7,
    slug: 'react-docs-07-custom-hooks-context-api',
    title: 'توثيق React.js بالبلدي (الفصل 7): بناء Custom Hooks وإدارة الحالة العامة بـ Context API',
    shortTitle: 'بناء Custom Hooks وإدارة الحالة بـ Context API',
    summary:
      'إزاي تستخرج منطق متكرر في Custom Hook احترافي، حل مشكلة Prop Drilling بـ Context API، منع إعادة الرسم الزائدة في Context، ومقارنة Context بـ Zustand.',
    topics: ['Custom Hooks Rules', 'useFetch & useDebounce', 'Context API', 'Splitting Contexts', 'Zustand Comparison'],
    readTimeMinutes: 26,
  },
  {
    number: 8,
    slug: 'react-docs-08-forms-validation-rhf-zod',
    title: 'توثيق React.js بالبلدي (الفصل 8): إدارة النماذج (Forms) والتحقق (Validation) بـ React Hook Form و Zod',
    shortTitle: 'النماذج والتحقق باستخدام React Hook Form و Zod',
    summary:
      'الفرق بين Controlled و Uncontrolled Inputs، بناء نماذج سريعة بدون Re-renders باستخدام React Hook Form، وكتابة Validation Schemas قوية بـ Zod.',
    topics: ['Controlled vs Uncontrolled', 'React Hook Form', 'Zod Schemas', 'Field Arrays', 'Server Errors Handling'],
    readTimeMinutes: 26,
  },
  {
    number: 9,
    slug: 'react-docs-09-routing-and-tanstack-query',
    title: 'توثيق React.js بالبلدي (الفصل 9): التوجيه بـ React Router وإدارة بيانات السيرفر بـ TanStack Query',
    shortTitle: 'التوجيه بـ React Router و TanStack Query',
    summary:
      'بناء تطبيقات SPA متعددة الصفحات بـ React Router (Nested Routes, Protected Routes, Loaders)، واحتراف Caching و Optimistic Updates بـ TanStack Query.',
    topics: ['React Router v6/v7', 'Protected Routes', 'TanStack Query', 'Caching & Invalidation', 'Optimistic UI'],
    readTimeMinutes: 28,
  },
  {
    number: 10,
    slug: 'react-docs-10-performance-architecture-react-19',
    title: 'توثيق React.js بالبلدي (الفصل 10): تحسين الأداء، تقسيم الكود، Error Boundaries، ومزايا React 19',
    shortTitle: 'تحسين الأداء، المعمارية، ومزايا React 19',
    summary:
      'استخدام React DevTools Profiler لاكتشاف بطء التطبيق، React.lazy و Suspense، حماية التطبيق بـ Error Boundaries، وأهم إضافات React 19 مثل useActionState و Server Components.',
    topics: ['React Profiler', 'Code Splitting & Suspense', 'Error Boundaries', 'React 19 Actions', 'Production Architecture'],
    readTimeMinutes: 30,
  },
];
