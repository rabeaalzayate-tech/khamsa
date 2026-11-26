export interface CssDocChapter {
  number: number;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  topics: string[];
  readTimeMinutes: number;
}

export const CSS_DOCS_CURRICULUM: CssDocChapter[] = [
  {
    number: 1,
    slug: 'css-docs-01-selectors-cascade-specificity',
    title: 'توثيق CSS3 بالبلدي (الدرس 1): كيف تعمل CSS؟ الـ Selectors و Cascade و Specificity',
    shortTitle: 'Selectors و Cascade و Specificity و @layer',
    summary:
      'افهم كيف يطبق المتصفح التنسيقات، كل أنواع الـ Selectors الحديثة (:is, :where, :has)، حساب الـ Specificity بدون حفظ، والـ Inheritance و @layer.',
    topics: ['Selectors & Combinators', ':is() :where() :has()', 'Specificity', 'Cascade & @layer', 'Inheritance'],
    readTimeMinutes: 26,
  },
  {
    number: 2,
    slug: 'css-docs-02-box-model-units-typography-colors',
    title: 'توثيق CSS3 بالبلدي (الدرس 2): الـ Box Model، الوحدات الحديثة، الألوان، والخطوط',
    shortTitle: 'Box Model، الوحدات (rem/dvh/clamp)، الألوان، والخطوط',
    summary:
      'أسرار content/padding/border/margin، ليه box-sizing: border-box إلزامية، حل مشكلة Margin Collapsing، الوحدات النسبية والحديثة، وأنظمة الألوان والخطوط.',
    topics: ['border-box', 'Margin Collapsing', 'rem / em / dvh / ch', 'oklch & hsl', 'Web Typography'],
    readTimeMinutes: 26,
  },
  {
    number: 3,
    slug: 'css-docs-03-display-positioning-stacking-context',
    title: 'توثيق CSS3 بالبلدي (الدرس 3): الـ Display والـ Positioning وسر z-index و Stacking Context',
    shortTitle: 'Display و Positioning (sticky/absolute) و Stacking Context',
    summary:
      'الفرق الدقيق بين block و inline و inline-block، كل أوضاع position الخمسة، وحل لغز z-index الذي لا يعمل عبر فهم الـ Stacking Context و isolation.',
    topics: ['block vs inline', 'relative & absolute', 'fixed & sticky', 'z-index & Stacking Context', 'overflow & clip'],
    readTimeMinutes: 26,
  },
  {
    number: 4,
    slug: 'css-docs-04-flexbox-complete-guide',
    title: 'توثيق CSS3 بالبلدي (الدرس 4): احتراف Flexbox بالكامل (تخطيط البعد الواحد 1D)',
    shortTitle: 'احتراف Flexbox بالكامل (1D Layouts)',
    summary:
      'فهم المحاور الرئيسية والفرعية، خصائص الحاوية والعناصر (flex-grow, flex-shrink, flex-basis, gap, order)، وتطبيقات عملية لـ Navbar و Cards وتوسيط مثالي.',
    topics: ['Main & Cross Axis', 'justify & align', 'flex-grow/shrink/basis', 'flex-wrap & gap', 'Real UI Patterns'],
    readTimeMinutes: 28,
  },
  {
    number: 5,
    slug: 'css-docs-05-css-grid-complete-guide',
    title: 'توثيق CSS3 بالبلدي (الدرس 5): احتراف CSS Grid بالكامل (تخطيط البعدين 2D)',
    shortTitle: 'احتراف CSS Grid بالكامل (2D Layouts & Subgrid)',
    summary:
      'بناء شبكات احترافية بوحدة fr و repeat و minmax و auto-fit/auto-fill، تسمية المناطق بـ grid-template-areas، و subgrid، والمقارنة العملية مع Flexbox.',
    topics: ['fr & minmax()', 'auto-fit vs auto-fill', 'grid-template-areas', 'subgrid', 'Grid vs Flexbox'],
    readTimeMinutes: 28,
  },
  {
    number: 6,
    slug: 'css-docs-06-responsive-media-container-queries',
    title: 'توثيق CSS3 بالبلدي (الدرس 6): التصميم المتجاوب، Media Queries، و Container Queries',
    shortTitle: 'التصميم المتجاوب و Media Queries و Container Queries',
    summary:
      'منهجية Mobile-First، اختيار الـ Breakpoints بذكاء، استعلامات التفضيلات (prefers-color-scheme و reduced-motion)، وثورة @container و aspect-ratio.',
    topics: ['Mobile-First', 'Media Queries', '@container Queries', 'prefers-reduced-motion', 'aspect-ratio & object-fit'],
    readTimeMinutes: 26,
  },
  {
    number: 7,
    slug: 'css-docs-07-css-variables-math-pseudo-dark-mode',
    title: 'توثيق CSS3 بالبلدي (الدرس 7): المتغيرات، الدوال الحسابية، Pseudo-elements، و Dark Mode',
    shortTitle: 'CSS Variables، calc/clamp، Pseudo-elements، و Dark Mode',
    summary:
      'بناء Design Tokens بـ CSS Custom Properties، التصميم السلس بدون breakpoints عبر clamp() و min()/max()، احتراف ::before/::after، وبناء Dark/Light Mode نظيف.',
    topics: ['Custom Properties', 'calc() & clamp()', '::before & ::after', 'Logical Properties RTL', 'Pure CSS Dark Mode'],
    readTimeMinutes: 28,
  },
  {
    number: 8,
    slug: 'css-docs-08-animations-nesting-performance-architecture',
    title: 'توثيق CSS3 بالبلدي (الدرس 8): الحركات، CSS Nesting، الأداء، ومعمارية المشاريع الكبيرة',
    shortTitle: 'Transitions و @keyframes و CSS Nesting والأداء والمعمارية',
    summary:
      'بناء حركات سلسة بسرعة 60fps عبر GPU-composited properties، استخدام CSS Nesting الأصلي بدون Sass، وتنظيم ملفات المشاريع الضخمة بـ BEM و @layer.',
    topics: ['Transitions & @keyframes', '60fps GPU Composite', 'backdrop-filter', 'Native CSS Nesting', 'BEM & CSS Architecture'],
    readTimeMinutes: 30,
  },
];
