export interface HtmlDocChapter {
  number: number;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  topics: string[];
  readTimeMinutes: number;
}

export const HTML_DOCS_CURRICULUM: HtmlDocChapter[] = [
  {
    number: 1,
    slug: 'html-docs-01-browser-dom-document-structure',
    title: 'توثيق HTML5 بالبلدي (الدرس 1): كيف يقرأ المتصفح الـ HTML وتشريح الصفحة الكامل',
    shortTitle: 'كيف يقرأ المتصفح الـ HTML وتشريح الصفحة (DOCTYPE, head, meta)',
    summary:
      'رحلة الصفحة من السيرفر للشاشة: Parsing وبناء شجرة الـ DOM، أهمية DOCTYPE و Quirks Mode، وسوم head والـ meta الأساسية، Charset، Viewport، وربط CSS و JS باحتراف.',
    topics: ['DOCTYPE & Quirks Mode', 'DOM Tree', 'head & meta tags', 'UTF-8 & Viewport', 'Script defer vs async'],
    readTimeMinutes: 25,
  },
  {
    number: 2,
    slug: 'html-docs-02-typography-links-lists',
    title: 'توثيق HTML5 بالبلدي (الدرس 2): النصوص، العناوين، الروابط، والقوائم بالتفصيل',
    shortTitle: 'النصوص، العناوين، الروابط، والقوائم (Typography, Links & Lists)',
    summary:
      'هيكلة العناوين h1-h6 للـ SEO، الفرق الدلالي بين strong/b و em/i، الروابط المطلقة والنسبية وأمان target=_blank، والقوائم المرتبة وغير المرتبة وقوائم التعريف dl.',
    topics: ['h1-h6 Hierarchy', 'Semantic Text', 'Anchor & Security', 'ul / ol / dl', 'Entities & Code tags'],
    readTimeMinutes: 25,
  },
  {
    number: 3,
    slug: 'html-docs-03-responsive-images-multimedia-iframe',
    title: 'توثيق HTML5 بالبلدي (الدرس 3): الصور المتجاوبة، الصوت، الفيديو، والـ SVG و Iframe',
    shortTitle: 'الصور المتجاوبة والوسائط (img, picture, video, audio, svg, iframe)',
    summary:
      'اتقان img و alt و CLS و loading=lazy، الصور المتجاوبة بـ srcset و sizes و picture (WebP/AVIF)، وسائط video و audio مع الترجمة track، و SVG المضمن وتأمين iframe.',
    topics: ['srcset & sizes', 'picture WebP/AVIF', 'video & audio', 'Inline SVG', 'iframe sandbox'],
    readTimeMinutes: 28,
  },
  {
    number: 4,
    slug: 'html-docs-04-tables-semantic-html5',
    title: 'توثيق HTML5 بالبلدي (الدرس 4): الجداول الاحترافية وهيكلة الصفحة الدلالية (Semantic HTML5)',
    shortTitle: 'الجداول الاحترافية وهيكلة الصفحة الدلالية (Tables & Semantic HTML5)',
    summary:
      'بناء الجداول السليمة بـ caption و thead و tbody و tfoot و scope، وهيكلة الصفحات الحديثة بـ header و nav و main و article و section و aside و footer و dialog و details.',
    topics: ['Semantic Landmarks', 'article vs section', 'Accessible Tables', 'dialog & popover', 'details & summary'],
    readTimeMinutes: 26,
  },
  {
    number: 5,
    slug: 'html-docs-05-forms-and-native-validation',
    title: 'توثيق HTML5 بالبلدي (الدرس 5): النماذج الاحترافية والتحقق المدمج بدون JavaScript',
    shortTitle: 'النماذج الكاملة والتحقق المدمج (Forms & Native Validation)',
    summary:
      'كل تفاصيل form و action و method و enctype، ربط label و fieldset، كل أنواع input الحديثة، select و datalist و textarea، وقواعد التحقق المدمجة مع CSS pseudo-classes.',
    topics: ['Form Submission', 'Input Types', 'label & fieldset', 'Native Validation', 'Constraint API'],
    readTimeMinutes: 30,
  },
  {
    number: 6,
    slug: 'html-docs-06-accessibility-aria-technical-seo',
    title: 'توثيق HTML5 بالبلدي (الدرس 6): إمكانية الوصول (Accessibility / A11y) والـ Technical SEO',
    shortTitle: 'إمكانية الوصول (A11y / ARIA) والـ Technical SEO في HTML',
    summary:
      'قواعد WAI-ARIA الخمسة، role و aria-label و aria-live، التنقل بالكيبورد و Focus Management، ووسوم Open Graph و Twitter Cards و Canonical و JSON-LD لتصدر جوجل.',
    topics: ['WAI-ARIA Rules', 'Keyboard & Focus', 'Screen Readers', 'Open Graph & Twitter', 'Canonical & JSON-LD'],
    readTimeMinutes: 28,
  },
];
