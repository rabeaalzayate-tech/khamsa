import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article28: StaticArticle = {
  id: 'static-art-28',
  slug: 'claude-code-cli-developer-guide',
  title: 'شرح Claude Code بالبلدي: التثبيت والاستخدام للمبرمجين',
  excerpt:
    'اتعلم شرح Claude Code بالبلدي، من التثبيت والتشغيل لحد استخدام الذكاء الاصطناعي في فهم الكود وإصلاح الأخطاء وتأمين مشروعك.',
  description:
    'اتعلم شرح Claude Code بالبلدي، من التثبيت والتشغيل لحد استخدام الذكاء الاصطناعي في فهم الكود وإصلاح الأخطاء وتأمين مشروعك.',
  category: 'الذكاء الاصطناعي',
  tags: [
    'Claude Code',
    'الذكاء الاصطناعي',
    'أدوات المطورين',
    'Anthropic',
    'Terminal',
    'React',
    'Node.js',
    'Next.js',
    'هندسة البرمجيات',
  ],
  keywords: [
    'Claude Code',
    'شرح Claude Code',
    'كيفية استخدام Claude Code',
    'Claude Code بالعربي',
    'AI Coding Agent',
    'CLAUDE.md',
    'أدوات الذكاء الاصطناعي للمبرمجين',
  ],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-10-29T18:00:00.000Z',
  updatedAt: '2026-10-29T18:00:00.000Z',
  readTimeMinutes: 14,
  coverImage:
    'https://pub-f9f474a915314796ac71ef9e5b4b78a0.r2.dev/articles/1793299212266-5682b37ea777a913ebb91174e04df2d2.jpg',
  coverAlt:
    'دليل استخدام أداة Claude Code من Anthropic في الـ Terminal للمطورين - خمسة برمجة بالبلدي',
  isFeatured: true,
  tableOfContents: [
    { id: 'intro', title: 'دليل Claude Code بالبلدي: إزاي تخلي الذكاء الاصطناعي يساعدك في برمجة مشروعك بالكامل؟', level: 2 },
    { id: 'what-is-claude-code', title: 'إيه هي أداة Claude Code؟', level: 2 },
    { id: 'claude-code-vs-chatgpt', title: 'إيه الفرق بين Claude Code وChatGPT؟', level: 2 },
    { id: 'prerequisites', title: 'إيه اللي تحتاجه قبل التثبيت؟', level: 2 },
    { id: 'how-to-install', title: 'إزاي تثبّت Claude Code؟', level: 2 },
    { id: 'how-to-use-in-project', title: 'إزاي تبدأ باستخدام Claude Code داخل مشروعك؟', level: 2 },
    { id: 'five-practical-use-cases', title: '5 استخدامات عملية للمطورين', level: 2 },
    { id: 'claude-md-secret', title: 'السر المهم: ملف CLAUDE.md', level: 2 },
    { id: 'control-permissions', title: 'إزاي تتحكم في صلاحيات Claude Code؟', level: 2 },
    { id: 'claude-code-vs-cursor-copilot', title: 'Claude Code ولا Cursor ولا GitHub Copilot؟', level: 2 },
    { id: 'mern-stack-suitability', title: 'هل Claude Code مناسبة لمشاريع MERN Stack؟', level: 2 },
    { id: 'summary', title: 'الخلاصة والمصادر الرسمية', level: 2 },
  ],
  faq: [
    {
      question: 'هل أداة Claude Code مجانية تماماً؟',
      answer:
        'الأداة نفسها كحزمة CLI مجانية للتحميل والتثبيت عبر npm، لكن استهلاك النماذج يعتمد على حسابك في Anthropic؛ حيث يتطلب إما رصيد API عبر Anthropic Console أو اشتراكاً مدعوماً (مثل خطط Pro أو Team) أو عبر مزود سحابي معتمد بحسب طريقة المصادقة.',
    },
    {
      question: 'هل يمكن تشغيل Claude Code على نظام Windows؟',
      answer:
        'نعم، تعمل الأداة على Windows عبر بيئة Node.js و Git Bash، وللحصول على أفضل تجربة توافقية مع أوامر الـ Shell ومسارات الملفات يُوصى بتشغيلها داخل بيئة WSL (Windows Subsystem for Linux).',
    },
    {
      question: 'هل يمكن للأداة أن تحذف ملفات أو تخرب كود المشروع تلقائياً؟',
      answer:
        'الأداة مصممة بطلب موافقة وتأكيد صريح من المطور قبل تنفيذ التعديلات أو أوامر النظام الحساسة، ولا يجب تفعيل أوضاع التجاوز التلقائي للصلاحيات إلا عند الضرورة القصوى وبعد مراجعة Git diff.',
    },
    {
      question: 'ما هو دور ملف CLAUDE.md في المشروع؟',
      answer:
        'ملف CLAUDE.md يعمل بمثابة دليل إرشادات دائم للأداة داخل جذر المشروع؛ فبدلاً من إعادة توضيح المعمارية وقواعد الكود (مثل استخدام TypeScript و Tailwind و Service Layer) في كل محادثة، تقرأ الأداة هذا الملف تلقائياً وتلتزم بمعاييره.',
    },
  ],
  relatedSlugs: [
    'will-ai-replace-programmers-2027',
    'modern-frontend-architecture-scale-micro-frontends-design-systems',
    'building-production-restful-apis-express-clean-architecture',
    'professional-git-github-branching-strategies-cicd',
  ],
  seo: {
    title: 'شرح Claude Code بالبلدي: التثبيت والاستخدام للمبرمجين',
    description:
      'اتعلم شرح Claude Code بالبلدي، من التثبيت والتشغيل لحد استخدام الذكاء الاصطناعي في فهم الكود وإصلاح الأخطاء وتأمين مشروعك.',
    keywords: [
      'Claude Code',
      'شرح Claude Code',
      'كيفية استخدام Claude Code',
      'Claude Code بالعربي',
      'AI Coding Agent',
      'CLAUDE.md',
    ],
    canonicalUrl:
      'https://www.khamsaprogramming.com/articles/claude-code-cli-developer-guide',
    ogTitle: 'شرح Claude Code بالبلدي: التثبيت والاستخدام للمبرمجين',
    ogDescription:
      'اتعلم شرح Claude Code بالبلدي، من التثبيت والتشغيل لحد استخدام الذكاء الاصطناعي في فهم الكود وإصلاح الأخطاء وتأمين مشروعك.',
    ogImage:
      'https://pub-f9f474a915314796ac71ef9e5b4b78a0.r2.dev/articles/1793299212266-5682b37ea777a913ebb91174e04df2d2.jpg',
  },
  content: `
## دليل Claude Code بالبلدي: إزاي تخلي الذكاء الاصطناعي يساعدك في برمجة مشروعك بالكامل؟

لو إنت مبرمج وبتستخدم الذكاء الاصطناعي في شغلك، فغالبًا جرّبت قبل كده تبعت جزء من الكود لـ ChatGPT أو أي أداة AI، وتطلب منها تصلّح Bug أو تكتبلك Function جديدة.

لكن تخيل إنك بدل ما تنقل الكود وتنسخه يدويًا، تقدر تستخدم أداة تشتغل من داخل الـ Terminal، وتفحص ملفات مشروعك، وتفهم طريقة تنظيمه، وتقترح تعديلات على أكتر من ملف، وتساعدك تشغّل الاختبارات وتراجع النتائج.

هنا بييجي دور **Claude Code**، أداة البرمجة بالذكاء الاصطناعي من شركة **Anthropic**.

في المقال ده من «خمسة برمجة بالبلدي»، هنتعرف على Claude Code، وإزاي تثبّتها وتشغّلها، وإزاي تستخدمها في مشاريع React وNext.js وNode.js، وإزاي تتحكم في صلاحياتها وتحافظ على أمان الكود بتاعك، خاصة مع النقاشات المستمرة حول [هل الذكاء الاصطناعي سيهدد وظائف المطورين؟](/articles/will-ai-replace-programmers-2027) وكيف تحوّله إلى حليف يضاعف إنتاجيتك بدلاً من منافس لك.

---

## إيه هي أداة Claude Code؟

**Claude Code** هي أداة **AI Coding Agent** بتساعدك تتعامل مع مشروعك البرمجي من خلال سطر الأوامر (Terminal).

بدل ما تكون محصورة في سؤال وجواب داخل شات، تقدر تساعدك في مهام مرتبطة بملفات المشروع، زي:

* **قراءة ملفات الكود** وفهم العلاقات والاعتماديات بينها.
* **شرح Architecture المشروع** وطريقة تنظيمه وهيكلة الطبقات فيه.
* **اكتشاف الأخطاء (Bugs)** واقتراح إصلاحات دقيقة لها.
* **إنشاء ملفات جديدة** أو تعديل ملفات موجودة بالفعل.
* **كتابة Unit Tests** وتشغيل أوامر الاختبار المناسبة والتأكد من نجاحها.
* **تنفيذ مهام Refactoring** وإعادة هيكلة الكود وفق تعليماتك الخاصة.
* **مساعدتك في فهم أخطاء Build و TypeScript** وحلها دون تعطيل سير العمل.
* **تنفيذ أوامر Git ومراجعة التغييرات**، حسب الصلاحيات والإعدادات المتاحة، بالاستفادة من أساليب [إدارة الفروع و Git الاحترافية](/articles/professional-git-github-branching-strategies-cicd).

> 💡 **المهم تفهم الفرق بالبلدي:**  
> Claude Code مش مجرد أداة بتولّد كود على شاشة منفصلة؛ هي **وكيل برمجي (Autonomous Agent)** ممكن ينفّذ خطوات فعلية داخل بيئة التطوير، لكن لازم تراجع التعديلات والنتائج بنفسك وما تعتمدش عليها اعتماد أعمى.

للتفاصيل الرسمية، راجع [دليل Claude Code من Anthropic](https://docs.anthropic.com/en/docs/claude-code/overview).

---

## إيه الفرق بين Claude Code وChatGPT؟

خلينا نفترض إن عندك مشروع Full Stack معمول باستخدام React وNode.js وMongoDB، وظهر عندك خطأ في تسجيل المستخدمين.

باستخدام شات تقليدي، غالبًا هتحتاج تبعت رسالة الخطأ والملفات المرتبطة بيها، وبعدها تنفّذ التعديلات بنفسك في المحرر.

أما باستخدام Claude Code، فتقدر تطلب منها فحص المشروع وتتبّع مسار تسجيل المستخدم من الـ Frontend للـ Backend، وتحديد سبب المشكلة، ثم اقتراح تعديل واضح داخل الملفات نفسها.

| وجه المقارنة | شات الذكاء الاصطناعي (مثل ChatGPT) | Claude Code (Agent في الـ Terminal) |
| :--- | :--- | :--- |
| **شرح الكود** | نعم، عبر النسخ واللصق | نعم، بقراءة الملف مباشرة من مكانه |
| **قراءة ملفات المشروع** | حسب الملفات والسياق المتاح يدوياً | يستطيع فحص الملفات التي تسمح له البيئة بالوصول إليها |
| **تعديل ملفات المشروع مباشرة** | لا، تحتاج لنسخ الكود ولصقه في المحرر | نعم، يعدل الملفات مباشرة وفق صلاحياتك |
| **تشغيل أوامر Terminal** | لا يستطيع تشغيل أوامر جهازك | من المهام الأساسية للأداة تنفيذ الأوامر المحلية |
| **تشغيل الاختبارات** | يعتمد على محاكيات خارجية محدودة | يستطيع تشغيل الأوامر المناسبة والـ Tests بصلاحيات متاحة |
| **المراجعة البشرية** | ضرورية | ضرورية جداً لحماية المشروع من الأخطاء غير المقصودة |

ده مش معناه إن Claude Code أفضل في كل مهمة؛ الاختيار بيعتمد على طبيعة شغلك، وطريقة استخدامك، والتكلفة، ومدى احتياجك للتعامل المباشر مع ملفات المشروع.

---

## إيه اللي تحتاجه قبل التثبيت؟

قبل ما تبدأ، جهّز بيئة التطوير عندك.

المتطلبات وطريقة التثبيت ممكن تتغير مع تحديثات الأداة، لذلك راجع دائماً [دليل التثبيت الرسمي](https://docs.anthropic.com/en/docs/claude-code/getting-started).

بشكل عام، هتحتاج إلى:
1. **جهاز يعمل بنظام تشغيل مدعوم** (macOS أو Linux أو Windows).
2. **اتصال بالإنترنت**.
3. **بيئة Terminal مناسبة**.
4. **طريقة تسجيل دخول أو مصادقة مدعومة** (حساب Anthropic أو مفتاح API).
5. **اشتراك أو إعداد فوترة مناسب** لطريقة استخدامك.

> ⚠️ **ملحوظة لمستخدمي Windows:**  
> لو بتستخدم Windows، راجع خيارات التشغيل المدعومة، ومنها **WSL (Windows Subsystem for Linux)** أو **Git Bash** بحسب طريقة إعدادك؛ حيث توفر بيئة WSL أفضل تجربة لتنفيذ أوامر الـ Shell بدون مشاكل مسارات الملفات (Path Delimiters).  
> ولو بتستخدم Linux أو macOS، تقدر تبدأ من الـ Terminal مباشرة بعد تجهيز المتطلبات اللازمة.

> 💰 **ملحوظة هامة عن التكلفة:**  
> تثبيت الأداة مش معناه إن استخدام النماذج مجاني بالكامل. التكلفة أو حدود الاستخدام بتعتمد على طريقة المصادقة والخطة أو مزوّد الخدمة اللي بتستخدمه (سواء Anthropic Console API أو اشتراك مدعوم). راجع الشروط والأسعار الحالية قبل بدء الاستخدام المكثف.

---

## إزاي تثبّت Claude Code؟

واحدة من الطرق المباشرة والموثقة لدى Anthropic هي التثبيت باستخدام مدير الحزم **npm**.

### الخطوة الأولى: تأكد من Node.js وnpm
افتح الـ Terminal واكتب:

\`\`\`bash
node -v
npm -v
\`\`\`

لو ظهرت أرقام الإصدارات (مثلاً Node 18 أو 20 أو أحدث)، يبقى الأدوات موجودة في بيئتك. لو الأمر مش معروف، ثبّت Node.js من [الموقع الرسمي](https://nodejs.org/).

### الخطوة الثانية: تثبيت Claude Code
استخدم أمر التثبيت العام الموضح في وثائق Anthropic:

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

> 🔒 **نصيحة أمنية:** تجنّب تشغيل التثبيت باستخدام \`sudo npm install -g\` على Linux أو macOS؛ لأن ده ممكن يسبب مشكلات في صلاحيات الملفات ومخاطر أمنية على النظام.

### الخطوة الثالثة: التأكد من التثبيت
بعد اكتمال التثبيت، نفّذ الأمر التالي للتأكد من رقم الإصدار:

\`\`\`bash
claude --version
\`\`\`

ولفحص حالة التثبيت والبيئة والتأكد من عدم وجود مشاكل، تقدر تستخدم:

\`\`\`bash
claude doctor
\`\`\`

لو واجهتك أي مشكلة، راجع دليل استكشاف الأخطاء الرسمي بدل ما تنفّذ أوامر عشوائية بصلاحيات مرتفعة.

### الخطوة الرابعة: تسجيل الدخول
شغّل الأداة لأول مرة بكتابة:

\`\`\`bash
claude
\`\`\`

واتبع خطوات المصادقة التي تظهر لك في المتصفح أو سطر الأوامر. توضح الوثائق الرسمية طرقًا مختلفة للمصادقة، منها **Anthropic Console** وبعض اشتراكات Claude المدعومة، بالإضافة إلى خيارات المؤسسات عبر مزوّدين سحابيين. اختار الطريقة المناسبة لحسابك، وتأكد من تفعيل الفوترة أو الاشتراك المطلوب.

---

## إزاي تبدأ باستخدام Claude Code داخل مشروعك؟

خلينا نطبّق عملياً على مشروع موجود عندك بالفعل.

افتح الـ Terminal وانتقل إلى مجلد المشروع:

\`\`\`bash
cd my-project
\`\`\`

استبدل \`my-project\` باسم مجلد مشروعك الحقيقي، وبعدها شغّل الأداة:

\`\`\`bash
claude
\`\`\`

دلوقتي تقدر تطلب من الأداة تنفيذ مهمة محددة.

مثلاً، لو المشروع معمول باستخدام [معمارية Next.js الحديثة](/articles/modern-frontend-architecture-scale-micro-frontends-design-systems)، ابدأ دايمًا بطلب فحص وتحليل فقط قبل أي تعديل:

\`\`\`text
Analyze this project before making any changes. Identify:
1. The framework and main technologies.
2. The application structure.
3. The routing approach.
4. The data-fetching strategy.
5. The testing setup.
6. Potential technical issues.
Do not modify any files. Report your findings first.
\`\`\`

الموجه (Prompt) ده بيطلب تحليل كامل للمشروع من غير ما يمس أي ملف أو يغير سطر كود واحد.

بعد ما تراجع النتيجة وتتأكد إن الأداة فهمت بنية المشروع صح، تقدر تنتقل لمهمة أكثر تحديداً، زي إصلاح مشكلة في صفحة معينة أو إضافة اختبار لوظيفة موجودة.

> 🎯 **نصيحة ذهبية بالبلدي:**  
> متبدأش أبدًا بطلب عام ومفتوح زي «حسّن المشروع كله» أو «نضّف الكود». كل ما كانت المهمة محددة بدقة ومعايير نجاحها واضحة، كان أسهل عليك تراجع النتيجة وتعرف هل الأداة نفّذتها صح ولا عكت في ملفات تانية.

---

## 5 استخدامات عملية للمطورين

### 1. اكتشاف الأخطاء وإصلاحها (Debugging & Root Cause Analysis)
لو ظهر عندك خطأ في التطبيق، ابدأ بطلب تشخيص السبب قبل تعديل الكود:

\`\`\`text
Investigate the login failure. Trace the flow from the frontend form to the backend endpoint and database query. Identify the root cause and explain the evidence. Do not modify files until I approve the proposed fix.
\`\`\`

بعد التشخيص، راجع السبب المقترح واطلب تنفيذ إصلاح محدود لو كان منطقياً.

### 2. مراجعة الكود وتحسينه (Component Review & Performance)
لو عندك Component كبير في React أو Next.js، تقدر تطلب مراجعة قابلية الصيانة والأداء:

\`\`\`text
Review this component for maintainability, unnecessary re-renders, accessibility issues, and TypeScript problems. Do not rewrite the entire component. List the findings by severity and suggest minimal fixes.
\`\`\`

ده بيساعدك تركز على المشاكل الفعلية بدل ما تعيد كتابة الكود لمجرد إعادة كتابته.

### 3. كتابة الاختبارات (Unit & Integration Testing)
لو عندك Service في Node.js، اطلب كتابة اختبارات تناسب إطار الاختبار المستخدم في المشروع:

\`\`\`text
Inspect the existing testing setup. Add unit tests for the user service, including successful operations, invalid input, and expected error cases. Follow the project's existing conventions. Run the relevant tests and report the results.
\`\`\`

راجع الحالات التي اختبرتها الأداة، وتأكد من إن الاختبارات بتتحقق من السلوك المطلوب فعلًا.

### 4. فهم مشروع قديم (Codebase Onboarding & Exploration)
لو استلمت مشروع من مطور تاني ومش فاهم ترتيبه، ابدأ بطلب خريطة واضحة للمشروع:

\`\`\`text
Explain this codebase to a developer who has never worked on it before. Describe the main modules, entry points, data flow, API boundaries, and important dependencies. Reference the actual files and functions. Do not make changes.
\`\`\`

الهدف هنا إنك تفهم المشروع قبل ما تبدأ تعديلات ممكن تكسر وظائف موجودة.

### 5. المساعدة في Git ومراجعة التغييرات (Git Diff Review)
تقدر تطلب مراجعة التغييرات الحالية قبل عمل Commit، لتتأكد إنك ما نسيتش حاجة:

\`\`\`text
Review the current Git diff. Identify potential bugs, accidental changes, missing tests, and security concerns. Do not commit, push, or change branches.
\`\`\`

كده تقدر تستفيد من المراجعة مع الاحتفاظ بالتحكم الكامل في قرارات Git المهمة.

---

## السر المهم: ملف CLAUDE.md

واحدة من الطرق المفيدة لتنظيم شغل Claude Code هي استخدام ملف **\`CLAUDE.md\`** لتوفير تعليمات المشروع.

الفكرة ببساطة إنك بدل ما تشرح للأداة في كل مرة إن مشروعك بيستخدم TypeScript وTailwind، وإنك بتفضّل Components صغيرة، وإنك في الباك إند بتعتمد على [معمارية الباك إند النظيفة وفصل الـ Service Layer](/articles/building-production-restful-apis-express-clean-architecture)، تقدر توثّق القواعد دي كلها في ملف تعليمات دائم في جذر المستودع.

وفقًا لوثائق Anthropic، يمكن استخدام ملف \`CLAUDE.md\` داخل المشروع لتوفير تعليمات مشتركة خاصة به، مع وجود خيارات أخرى للتعليمات الشخصية. راجع [التوثيق الرسمي لإدارة الذاكرة والتعليمات](https://docs.anthropic.com/en/docs/claude-code/memory).

### مكان الملف في المشروع:

\`\`\`text
my-project/
├── src/
├── package.json
├── tsconfig.json
└── CLAUDE.md
\`\`\`

### نموذج عملي جاهز لملف CLAUDE.md:

\`\`\`markdown
# Project Guidelines

## General Rules
- Read existing code before making changes.
- Prefer small, focused modifications.
- Do not invent APIs, files, or dependencies.
- Explain important architectural decisions.

## Frontend
- Use TypeScript.
- Follow existing React component conventions.
- Use Tailwind CSS for styling when appropriate.
- Keep components focused and reusable.
- Preserve accessibility and responsive behavior.

## Backend
- Follow the existing Node.js and Express architecture.
- Keep business logic separate from route handlers.
- Validate external input using Zod or Joi.
- Handle errors consistently.
- Never expose secrets or credentials in responses.

## Testing
- Inspect the existing test setup first.
- Add or update relevant unit and integration tests.
- Run the appropriate checks after changes.
- Report any tests that could not be executed.

## Safety
- Do not modify environment files (.env) containing secrets.
- Do not delete files without explicit approval.
- Do not run destructive commands without approval.
- Do not commit or push changes unless explicitly requested.
\`\`\`

> ⚠️ **تنبيه:** المثال ده مجرد نقطة بداية يمكنك تعديلها لتناسب مشروعك الفعلي. كمان وجود التعليمات لا يضمن وحده إن كل تعديل هيكون صحيحاً بنسبة 100%؛ المراجعة البشرية هي صمام الأمان الأساسي دايمًا.

---

## إزاي تتحكم في صلاحيات Claude Code؟

بما إن الأداة ممكن تتعامل مع الملفات وتشغّل أوامر في الـ Terminal، فلازم تتعامل معاها كأداة تطوير لها صلاحيات حساسة، مش مجرد شباك شات عادي.

### القواعد الأساسية للأمان:
1. **اشتغل على Git branch منفصل** عند تنفيذ تغييرات كبيرة، عشان تقدر ترجع في أي وقت لو حصلت مشكلة.
2. **راجع الـ diff بعينك** سطر بسطر قبل اعتماد أي تعديل في الملفات.
3. **شغّل الاختبارات (Tests) وأوامر الـ Build** بعد تنفيذ المهمة للتأكد من سلامة النظام.
4. **ما تشاركش مفاتيح API أو كلمات المرور** داخل المحادثات أو في الملفات غير الآمنة.
5. **راجع الأوامر التي قد تحذف ملفات** أو تغيّر بيانات قاعدة البيانات قبل الموافقة عليها.
6. **لا تستخدم أوضاع تجاوز الصلاحيات (Auto-approve)** لمجرد تسريع التنفيذ دون داعٍ.

تدعم الأداة أوضاعًا وخيارات مختلفة للصلاحيات، وتوضح وثائق CLI أن بعض الخيارات تتجاوز طلبات التأكيد، ولذلك يجب التعامل معها بحذر شديد. راجع [مرجع أوامر Claude Code الرسمية](https://docs.anthropic.com/en/docs/claude-code/cli-usage).

### مثال على Workflow آمن لإصلاح Bug:

\`\`\`
1. اطلب تشخيص المشكلة بالأدلة دون أي تعديل في الملفات.
                        ↓
2. راجع الملفات وأسباب الخطأ التي عرضها الوكيل البرمجي.
                        ↓
3. اطلب خطة تعديل صغيرة ومحددة تركز على المشكلة فقط.
                        ↓
4. وافق على التعديلات المقترحة فقط بعد قراءتها وفهمها.
                        ↓
5. راجع Git diff للتأكد من عدم وجود تغييرات جانبية.
                        ↓
6. شغّل الاختبارات والـ Linter وأوامر الـ Type Checking.
                        ↓
7. اعتمد التغيير واعمل Commit باطمئنان.
\`\`\`

بالطريقة دي، أنت اللي بتحدد اتجاه التطوير كمهندس مسؤول، والذكاء الاصطناعي بيساعدك في التنفيذ والمراجعة والسرعة.

---

## Claude Code ولا Cursor ولا GitHub Copilot؟

مفيش أداة واحدة تعتبر "الأحسن بالمطلق" لكل المطورين؛ الاختيار بيعتمد بشكل أساسي على أسلوب عملك (Workflow) والمهمة اللي بتنفذها:

| الأداة | طبيعة الاستخدام | مناسبة عندما تكون في حاجة إلى... |
| :--- | :--- | :--- |
| **Claude Code** | وكيل برمجي يعمل مباشرة من الـ Terminal وبيئة التطوير | تنفيذ مهام مركبة تشمل فحص ملفات المشروع، تشغيل الاختبارات، وتتبع الأخطاء المعقدة |
| **Cursor** | محرر كود كامل مبني على VS Code مع ميزات AI مدمجة | تفضيل بيئة عمل متكاملة داخل واجهة رسومية مع ميزات تعديل وتوليد الكود جنبًا إلى جنب |
| **GitHub Copilot** | إضافة مساعدة داخل المحررات تدعم بيئات مختلفة | اقتراحات فورية للكود أثناء الكتابة (Autocomplete) وإجابات سريعة على الأسئلة اليومية |

الجدول ده مقارنة عامة لطبيعة الأدوات، وليس تقييماً نهائياً لأدائها أو أسعارها؛ فالميزات وخطط الأسعار تتطور باستمرار، لذا راجع المواقع الرسمية لكل أداة قبل اتخاذ قرار الشراء.

---

## هل Claude Code مناسبة لمشاريع MERN Stack؟

أيوه، مشاريع الـ MERN (MongoDB, Express, React, Node.js) ومشاريع الـ Next.js من أكتر البيئات اللي تقدر تستفيد فيها من Claude Code، خاصة في:

* **فهم تنظيم المشروع:** الربط بين مجلدات الـ Frontend ومسارات الـ Backend ومستودعات البيانات.
* **مراجعة الكود:** مراجعة الـ Controllers والـ Services ومخططات Mongoose للتأكد من الالتزام بالمعايير.
* **اقتراح وكتابة اختبارات الـ API:** توليد اختبارات Endpoints تغطي حالات النجاح والفشل.
* **تتبّع الأخطاء المشتركة:** فهم أسباب فشل الاتصال بين الـ Client والـ Server وحل مشاكل CORS أو التحقق من البيانات.
* **مراجعة الـ Validation والأمان:** التأكد من تطهير المدخلات ومعالجة الأخطاء بشكل موحد.
* **توثيق الـ APIs:** استخراج معالم الـ Endpoints وكتابة توثيق مبسط للمشروع.

لكن افتكر دايماً: وجود AI Agent في مشروعك لا يغنيك عن فهمك العميق لمعمارية البرمجيات، ولا عن التأكد بنفسك من حماية البيانات والصلاحيات وسلامة استدعاءات الـ API.

---

## الخلاصة

أداة **Claude Code** تستحق التجربة بقوة لو حابب تنقل استخدامك للذكاء الاصطناعي من مجرد أداة شات تولّد أكواد منفصلة، إلى مساعد تنفيذي يشاركك بيئة التطوير الحقيقية ويفهم هيكل مشروعك.

ابدأ دايماً بمشروع تجريبي صغير، واطلب من الأداة أولاً فحص الملفات وتشخيص مشكلة واحدة دون تعديل، وجرّب التعديلات المحدودة خطوة بخطوة. ومع استمرار عملك، طوّر ملف \`CLAUDE.md\` ليعكس قواعد مشروعك وطريقة تفكير فريقك.

> 🌟 **كلمة أخيرة من خمسة برمجة بالبلدي:**  
> المبرمج الشاطر مش اللي يخلّي الذكاء الاصطناعي يكتب أكبر كمية كود ممكنة، لكن هو اللي يعرف يوجّهه بدقة، ويراجع شغله بعين مهندس فاهم، ويتأكد إن النتيجة نظيفة وآمنة وقابلة للصيانة على المدى الطويل!

---

### المصادر الرسمية:
* [توثيق Claude Code — نظرة عامة رسمية من Anthropic](https://docs.anthropic.com/en/docs/claude-code/overview)
* [دليل التثبيت والبدء مع Claude Code](https://docs.anthropic.com/en/docs/claude-code/getting-started)
* [مرجع أوامر CLI وخيارات الصلاحيات](https://docs.anthropic.com/en/docs/claude-code/cli-usage)
* [دليل إدارة تعليمات وذاكرة المشروع (CLAUDE.md)](https://docs.anthropic.com/en/docs/claude-code/memory)
`,
};

