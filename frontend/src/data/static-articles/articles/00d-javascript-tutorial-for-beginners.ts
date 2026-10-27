import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const articleJS01: StaticArticle = {
  id: 'static-art-js-01',
  slug: 'javascript-tutorial-for-beginners',
  title: 'شرح JavaScript للمبتدئين من الصفر بالأمثلة العملية',
  excerpt: 'اتعلم JavaScript من الصفر مع خمسة برمجة بالبلدي. شرح المتغيرات وأنواع البيانات والعمليات والشروط والحلقات والدوال والـ DOM، مع مشروع عداد تفاعلي عملي خطوة بخطوة.',
  description: 'اتعلم JavaScript من الصفر مع خمسة برمجة بالبلدي. شرح المتغيرات والشروط والدوال وDOM، مع أمثلة عملية ومشروع عداد تفاعلي.',
  category: 'تعلم البرمجة',
  tags: ['JavaScript', 'Front-End', 'تطوير الويب', 'برمجة للمبتدئين', 'أساسيات الويب'],
  keywords: [
    'تعلم JavaScript من الصفر',
    'شرح JavaScript',
    'JavaScript للمبتدئين',
    'أساسيات JavaScript',
    'تعلم البرمجة',
    'التعامل مع DOM',
    'تطوير الواجهات التفاعلية',
    'برمجة بالبلدي',
  ],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-10-19T17:00:00.000Z',
  updatedAt: '2026-10-19T17:00:00.000Z',
  readTimeMinutes: 22,
  coverImage: '/images/articles/javascript-tutorial-for-beginners.jpg',
  coverAlt: 'شرح JavaScript للمبتدئين من الصفر بالأمثلة العملية في خمسة برمجة بالبلدي',
  isFeatured: true,
  tableOfContents: [
    { id: 'intro-concept', title: 'أولًا: يعني إيه JavaScript؟', level: 2 },
    { id: 'js-vs-java', title: 'ثانيًا: هل JavaScript هي Java؟', level: 2 },
    { id: 'first-script', title: 'ثالثًا: إزاي تشغّل JavaScript لأول مرة؟', level: 2 },
    { id: 'variables', title: 'رابعًا: يعني إيه Variables في JavaScript؟', level: 2 },
    { id: 'data-types', title: 'خامسًا: أنواع البيانات Data Types', level: 2 },
    { id: 'operators', title: 'سادسًا: العمليات الحسابية والمنطقية Operators', level: 2 },
    { id: 'conditions', title: 'سابعًا: يعني إيه Conditions في البرمجة؟', level: 2 },
    { id: 'loops', title: 'ثامنًا: يعني إيه Loops؟', level: 2 },
    { id: 'functions', title: 'تاسعًا: يعني إيه Functions؟', level: 2 },
    { id: 'dom-intro', title: 'عاشرًا: إزاي JavaScript بتتعامل مع صفحة HTML؟ (الـ DOM)', level: 2 },
    { id: 'array-methods', title: 'الحادي عشر: يعني إيه Arrays Methods؟', level: 2 },
    { id: 'sync-vs-async', title: 'الثاني عشر: إيه الفرق بين Synchronous و Asynchronous JavaScript؟', level: 2 },
    { id: 'counter-project', title: 'الثالث عشر: مشروع عملي — اصنع تطبيق عداد تفاعلي بـ JavaScript', level: 2 },
    { id: 'common-mistakes', title: 'الرابع عشر: إيه الأخطاء اللي لازم تتجنبها وأنت بتتعلم JavaScript؟', level: 2 },
    { id: 'next-steps', title: 'الخامس عشر: بعد ما تتعلم JavaScript، تتعلم إيه؟', level: 2 },
    { id: 'conclusion', title: 'الخلاصة: اتعلم JavaScript بالكود مش بالمشاهدة بس', level: 2 },
  ],
  faq: [
    {
      question: 'هل تعلم JavaScript صعب لشخص ملوش خلفية في البرمجة؟',
      answer: 'لا، JavaScript من أكثر لغات البرمجة مرونة وبدايتها سهلة جداً؛ لأنك مش محتاج تثبت برامج معقدة، كل اللي محتاجه متصفحك ومحرر أكواد، وتقدر تشوف النتيجة التفاعلية فوراً أمامك.',
    },
    {
      question: 'ما هو الفرق الحقيقي بين JavaScript و Java؟',
      answer: 'هما لغتان مختلفتان تماماً؛ JavaScript لغة مفسرة ديناميكية مصممة لصفحات الويب وتطبيقات Node.js، بينما Java لغة مجمعة ثابتة الأنواع تُستخدم في أنظمة الشركات الكبرى وتطبيقات أندرويد.',
    },
    {
      question: 'متى أستخدم const ومتى أستخدم let؟',
      answer: 'القاعدة الذهبية في الكود الحديث: استخدم const افتراضياً لأي متغير قيمته ثابتة ولا تحتاج لإعادة إسنادها، واستخدم let فقط لما تكون القيمة هتتغير (زي عداد الحلقات أو مجموع الحسابات).',
    },
    {
      question: 'يعني إيه DOM ببساطة؟',
      answer: 'الـ DOM هو اختصار لـ Document Object Model، وهو الجسر اللي بيحول صفحة الـ HTML لشجرة كائنات برمجية تفهمها JavaScript علشان تقدر تغير النصوص، والألوان، وتستجيب لضغطات الماوس بدون إعادة تحميل الصفحة.',
    },
    {
      question: 'كم من الوقت أحتاجه لإتقان أساسيات JavaScript؟',
      answer: 'مع التطبيق اليومي لمدة ساعتين بمشاريع عملية صغيرة، يمكنك إتقان الأساسيات وبناء مشاريع تفاعلية واثقة خلال 4 إلى 6 أسابيع.',
    },
  ],
  relatedSlugs: [
    'css-tutorial-for-beginners',
    'html-tutorial-for-beginners',
    'learn-programming-from-scratch',
    'modern-javascript-comprehensive-guide-es6-async',
    'react-19-architecture-server-components-advanced-hooks',
  ],
  seo: {
    title: 'تعلم JavaScript من الصفر للمبتدئين مع أمثلة عملية',
    description: 'اتعلم JavaScript من الصفر مع خمسة برمجة بالبلدي. شرح المتغيرات والشروط والدوال وDOM، مع أمثلة عملية ومشروع عداد تفاعلي.',
    keywords: [
      'تعلم JavaScript من الصفر',
      'شرح JavaScript',
      'JavaScript للمبتدئين',
      'أساسيات JavaScript',
      'تعلم البرمجة',
      'التعامل مع DOM',
      'برمجة بالبلدي',
    ],
    canonicalUrl: 'https://www.khamsaprogramming.com/articles/javascript-tutorial-for-beginners',
    ogTitle: 'شرح JavaScript للمبتدئين من الصفر بالأمثلة العملية',
    ogDescription: 'دليل عملي ومبسط بالبلدي لكل ما يخص لغة JavaScript: المتغيرات، الدوال، المصفوفات، الأحداث، والـ DOM مع مشروع عداد تفاعلي متكامل.',
  },
  content: `تخيل إنك عملت صفحة ويب متكاملة باستخدام [HTML](/articles/html-tutorial-for-beginners)، وبعدها استخدمت [CSS](/articles/css-tutorial-for-beginners) علشان تخلي شكلها احترافي وألوانها جذابة وتصميمها متناسق.

لكن لسه فيه مشكلة حقيقية! 🤔

الصفحة هادية وصامتة وثابتة؛ عايز لما المستخدم يضغط على زرار يحصل شيء تفاعلي معين، أو لما يكتب اسمه تظهر له رسالة ترحيب مخصصة، أو تعمل آلة حاسبة تجمع وتطرح، أو سلة مشتريات تحسب الأسعار لايف!

هنا بالظبط بييجي دور الوحش الكبير: **JavaScript**! ⚡

JavaScript هي لغة البرمجة السحرية اللي بتساعدك تضيف التفاعل والحياة والسلوك البرمجي لصفحات الويب، وبفضل تقنيات حديثة زي Node.js، بقت بتشتغل في كل مكان: في المتصفحات، وفي الخوادم (Back-End)، وفي تطبيقات الموبايل وسطح المكتب.

في المقال ده من **خمسة برمجة بالبلدي**، هنتعلم JavaScript من الصفر، وهنفهم أساسياتها بأمثلة عملية مبسطة، وفي النهاية هنبني تطبيق عداد تفاعلي كامل بإيدينا.

جهز محرر الأكواد بتاعك، ويلا نبدأ! 🚀

---

## أولًا: يعني إيه JavaScript؟

**JavaScript** هي لغة برمجة حقيقية (Programming Language) بتسمح لك بكتابة تعليمات منطقية تنفذ عمليات معقدة، وتتفاعل مع حركات ونقرات المستخدم، وتتعامل مع البيانات والشبكات.

خلينا ناخد مثال بسيط وممتع.

تخيل إنك بتزور موقعنا، وضغطت على زرار مكتوب عليه «اضغط هنا»، فظهرت لك رسالة تنبيهية فورية بتقول: *«أهلًا بيك في موقعنا!»*.

الرسالة دي اتنفذت بسطر كود واحد من JavaScript:

\`\`\`javascript
alert("أهلًا بيك في خمسة برمجة بالبلدي!");
\`\`\`

لما الكود ده يتنفذ في المتصفح، هيظهر مربع حوار للمستخدم.

طبعًا دي مجرد بداية بسيطة، لكن JavaScript تقدر تعمل بيها معجزات تقنية عملاقة، زي:
* التحقق اللحظي من صحة البيانات (Form Validation) قبل إرسالها.
* تحديث وتغيير محتوى الصفحة بدون ما تحتاج تعمل Refresh أو إعادة تحميل كاملة (AJAX & Fetch).
* جلب البيانات والطقس والأسعار من خدمات خارجية عبر واجهات الـ APIs.
* بناء تطبيقات ويب تفاعلية متطورة وسريعة جداً زي Trello و Netflix و Facebook.
* بناء وتطوير الخوادم وقواعد البيانات عبر بيئة [Node.js](/articles/advanced-nodejs-engineering-event-loop-streams-workers).
* بناء تطبيقات واجهات متطورة باستخدام أطر ومكتبات حديثة زي [React.js](/articles/react-19-architecture-server-components-advanced-hooks) و Next.js.

> **باختصار شديد:** HTML هي هيكل الصفحة، CSS هي ملابسها وتنسيقها، أما JavaScript فهي عقلها وروحها اللي بتخليها تتحرك وتتفاعل!

---

## ثانيًا: هل JavaScript هي Java؟

السؤال ده من أكتر الأسئلة اللي بتلخبط أي حد لسه داخل عالم البرمجة جديد.

الإجابة القاطعة: **لأ! JavaScript مختلفة تماماً عن Java، زي الفرق بين القطة والكتكوت! 🐱🐣**

صحيح إن الاسمين فيهم كلمة «Java»، وده كان مجرد حركة تسويقية ذكية سنة 1995 وقت ابتكار اللغة للاستفادة من شهرة Java وقتها، لكن اللغتين من كوكبين مختلفين:

| وجه المقارنة | JavaScript | Java |
| :--- | :--- | :--- |
| **طبيعة اللغة** | ديناميكية وسريعة ومفسرة (Interpreted) | ثابتة الأنواع (Statically Typed) ومجمعة (Compiled) |
| **مجال الاستخدام** | تطوير الويب (Front-End & Back-End) وتطبيقات السحاب | أنظمة المؤسسات الضخمة وتطبيقات Android وSpring |
| **بيئة التشغيل** | المتصفحات ومحركات V8 و Node.js و Bun | آلة جافا الافتراضية (JVM) |
| **سهولة التعلم** | سريعة البدء ومرنة جداً للمبتدئ | تحتاج معرفة معمارية وأنماط تصميم وكلاسات صارمة |

لو هدفك تطوير الويب والواجهات التفاعلية، فـ JavaScript هي اللغة الأساسية اللي لازم تبدأ بيها وتتقنها.

---

## ثالثًا: إزاي تشغّل JavaScript لأول مرة؟

علشان تبدأ، مش محتاج أي إعدادات صعبة أو برامج معقدة. كل اللي محتاجه:
1. محرر أكواد خفيف زي **Visual Studio Code**.
2. متصفح حديث زي **Google Chrome** أو **Firefox**.

هنعمل مشروع تدريبي بسيط: أنشئ مجلداً باسم \`javascript-basics\` وبداخله ملفين:

\`\`\`text
javascript-basics/
├── index.html
└── script.js
\`\`\`

### 1. في ملف \`index.html\`:
نكتب الهيكل الأساسي ونربط ملف الجافاسكريبت بوسم \`<script>\` في نهاية الـ \`<body>\`:
\`\`\`html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>أول تجربة JavaScript</title>
</head>
<body>
  <h1>أهلًا بيك في عالم JavaScript!</h1>

  <!-- ربط ملف الجافاسكريبت الخارجي -->
  <script src="script.js"></script>
</body>
</html>
\`\`\`

### 2. في ملف \`script.js\`:
اكتب السطر الشهير:
\`\`\`javascript
console.log("Hello JavaScript!");
\`\`\`

احفظ الملفين، وافتح صفحة \`index.html\` في المتصفح. 

بعد كده اضغط زر الفأرة الأيمن في أي مكان بالصفحة واختار **Inspect (فحص العنصر)** أو اضغط \`F12\`، وانتقل لتبويب **Console**.

هتشوف الرسالة بتنور قدامك:
\`\`\`text
Hello JavaScript!
\`\`\`

> **إيه فايدة \`console.log()\`؟** دي شاشة التواصل السرية بينك وبين المتصفح؛ بنستخدمها أثناء البرمجة علشان نطبع قيم المتغيرات ونكتشف الأخطاء ونتأكد إن الكود ماشي في طريقه الصح قبل ما نعرض النتيجة للمستخدم في واجهة الصفحة.

---

## رابعًا: يعني إيه Variables في JavaScript؟

تخيل إنك بتعمل تطبيق متجر إلكتروني، ومحتاج تحتفظ باسم العميل، وسعر المنتج، وعدد المنتجات في سلة المشتريات علشان تحسب الفاتورة.

هنا بنستخدم **المتغيرات (Variables)**.

المتغير ببساطة هو **صندوق تخزين محجوز في ذاكرة الكمبيوتر (RAM)** له اسم محدد، بتخزن جواه قيمة تقدر ترجع تقرأها أو تعدلها في أي وقت.

\`\`\`javascript
let userName = "Rabea";
let age = 24;

console.log(userName);
console.log(age);
\`\`\`

### الفرق بين let و const و var (الكود الحديث):

زمان كان بيُستخدم \`var\`، لكن من سنة 2015 مع تحديث ES6، أصبح الاعتماد الرئيسي على \`let\` و \`const\`:

1. **\`let\` (للقيم المتغيرة):** بنستخدمها لما تكون القيمة متوقع تتغير مع الوقت (زي عداد النتيجة في لعبة):
\`\`\`javascript
let score = 10;
score = 20; // مسموح ومفيش أي مشكلة
console.log(score); // 20
\`\`\`

2. **\`const\` (للقيم الثابتة):** اختصار لـ Constant؛ بتمنعك من إعادة تغيير اسم المتغير بقيمة جديدة بالكامل:
\`\`\`javascript
const country = "Egypt";
// country = "France"; // ❌ هيرمي TypeError فوري لأنها قيمة ثابتة!
\`\`\`

> **نصيحة للمبرمج الشاطر:** اعتمد دايماً على \`const\` كخيارك الافتراضي في 90% من كودك، ولا تلجأ لـ \`let\` إلا إذا كنت متأكد إن قيمة المتغير هتتغير لاحقاً في الحسابات.

---

## خامسًا: أنواع البيانات Data Types

البيانات في البرمجة مش كلها زي بعض؛ الكمبيوتر محتاج يعرف طبيعة كل معلومة علشان يعرف يتعامل معاها:

### 1. النصوص (String):
أي نص محاط بعلامات تنصيص فردية أو زوجية:
\`\`\`javascript
const siteName = "خمسة برمجة بالبلدي";
\`\`\`

### 2. الأرقام (Number):
تشمل الأعداد الصحيحة والعشرية والسالبة:
\`\`\`javascript
const price = 250;
const taxRate = 0.14;
\`\`\`

### 3. القيم المنطقية (Boolean):
قيمة حاسمة لا تحتمل إلا إجابتين: إما نعم (\`true\`) أو لا (\`false\`):
\`\`\`javascript
const isLoggedIn = true;
const hasDiscount = false;
\`\`\`

### 4. غير محدد (Undefined):
متغير تم الإعلان عنه لكن لسه محطناش جواه أي قيمة:
\`\`\`javascript
let userEmail;
console.log(userEmail); // undefined
\`\`\`

### 5. قيمة فارغة متعمدة (Null):
بنعبر بيها عن فراغ القيمة بشكل مقصود وواعي:
\`\`\`javascript
const selectedCategory = null; // لسه المستخدم ما اختارش تصنيف
\`\`\`

### 6. المصفوفات (Array):
قائمة مرتبة بتسمح لك بتخزين عدة عناصر وقيم في متغير واحد:
\`\`\`javascript
const technologies = ["HTML", "CSS", "JavaScript"];
console.log(technologies[0]); // HTML (الترقيم بيبدأ من الصفر!)
\`\`\`

### 7. الكائنات (Object):
طريقة ذكية لتجميع بيانات مرتبطة بكيان واحد في صورة خصائص وقيم (Key-Value Pairs):
\`\`\`javascript
const developer = {
  name: "ربيع شعبان",
  role: "Full-Stack Engineer",
  yearsOfExperience: 5
};

console.log(developer.name); // ربيع شعبان
\`\`\`

---

## سادسًا: العمليات الحسابية والمنطقية Operators

JavaScript بتوفر لك كل المعاملات الرياضية اللي بتستخدمها في حياتك اليومية:

\`\`\`javascript
const a = 20;
const b = 5;

console.log(a + b); // جمع: 25
console.log(a - b); // طرح: 15
console.log(a * b); // ضرب: 100
console.log(a / b); // قسمة: 4
console.log(10 % 3); // باقي القسمة: 1
console.log(2 ** 3); // الأس (2 أس 3): 8
\`\`\`

---

## سابعًا: يعني إيه Conditions في البرمجة؟

التطبيقات بتشتغل بناءً على قرارات منطقية: *«لو المستخدم مسجل دخول اعرض له حسابه، لو مش مسجل اعرض له زرار تسجيل الدخول»*.

دي بالظبط فكرة **الشروط (Conditions)** باستخدام \`if\` و \`else\`:

\`\`\`javascript
const score = 75;

if (score >= 50) {
  console.log("مبروك، أنت ناجح ومستواك ممتاز! 🎉");
} else {
  console.log("حاول مرة تانية، الاستمرار سر النجاح! 💪");
}
\`\`\`

### أهم معاملات المقارنة في JavaScript:
* \`>\` و \`<\`: أكبر من وأصغر من.
* \`>=\` و \`<=\`: أكبر من أو يساوي وأصغر من أو يساوي.
* \`===\` (المطابقة الدقيقة Strict Equality): بيقارن القيمة ونوع البيانات في نفس الوقت (دايماً استخدم ده وتجنب \`==\`).
* \`!==\`: لا يساوي مع التحقق من النوع.

---

## ثامنًا: يعني إيه Loops؟

تخيل لو عندك قائمة فيها 1000 طالب وعايز تطبع أسماءهم؛ مش منطقي أبداً تكتب 1000 سطر كود!

**الحلقات التكرارية (Loops)** بتنفذ نفس الأمر مرات محددة حتى يتحقق شرط التوقف:

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log("رقم الدورة:", i);
}
\`\`\`

ونقدر نلف على عناصر مصفوفة بسهولة:
\`\`\`javascript
const courses = ["HTML", "CSS", "JavaScript", "React"];

for (let i = 0; i < courses.length; i++) {
  console.log("كورس رقم " + (i + 1) + ": " + courses[i]);
}
\`\`\`

---

## تاسعًا: يعني إيه Functions؟

بدل ما تكرر نفس الأكواد في أماكن مختلفة في برنامجك، بنجمع الكود جوه **دالة (Function)** باسم واضح، ونستدعيها وقت ما نحتاجها:

\`\`\`javascript
function calculateTotal(price, tax) {
  const finalPrice = price + (price * tax);
  return finalPrice; // إرجاع النتيجة
}

const invoice1 = calculateTotal(100, 0.14);
console.log("إجمالي الفاتورة الأولى:", invoice1); // 114
\`\`\`

* المدخلات اللي بتمررها للدالة اسمها **Parameters / Arguments**.
* الكلمة المفتاحية \`return\` بتخرج النتيجة المحسوبة علشان تخزنها في متغير وتستخدمها في مكان تاني.

---

## عاشرًا: إزاي JavaScript بتتعامل مع صفحة HTML؟ (الـ DOM)

كل الأمثلة اللي فاتت كانت بتطبع في الـ Console؛ طب إزاي نخلي JavaScript تلمس صفحة الـ HTML وتغير فيها؟

عن طريق الـ **DOM (Document Object Model)**!

المتصفح بيحول كود صفحتك لشجرة كائنات برمجية تسمح لـ JavaScript بالوصول لأي زرار أو عنوان أو صورة في ثانية:

\`\`\`html
<h1 id="welcome-msg">أهلًا بيك يا بطل!</h1>
<button id="action-btn" type="button">اضغط لتغيير الرسالة</button>
\`\`\`

وفي كود الجافاسكريبت:
\`\`\`javascript
// 1. مسك العناصر من الصفحة بواسطة الـ ID
const title = document.getElementById("welcome-msg");
const button = document.getElementById("action-btn");

// 2. الاستماع لحدث الضغط (Event Listener)
button.addEventListener("click", function () {
  title.textContent = "أهلًا بيك في عالم JavaScript التفاعلي! 💛";
  title.style.color = "#2563eb"; // نقدر نغير الـ CSS كمان!
});
\`\`\`

المستخدم لما يدوس على الزرار، النص ولونه هيتغيروا في نفس اللحظة بدون إعادة تحميل الصفحة!

---

## الحادي عشر: يعني إيه Arrays Methods؟

المصفوفات في JavaScript بتيجي محملة بدوال قوية جداً بتوفر عليك كتابة حلقات تكرارية معقدة:

1. **\`push()\` و \`pop()\`:** لإضافة عنصر لنهاية المصفوفة أو حذفه.
2. **\`includes()\`:** للتأكد من وجود عنصر معين (بترجع \`true\` أو \`false\`).
3. **\`map()\`:** بتلف على كل عنصر، وتعمل عليه عملية حسابية وترجع مصفوفة جديدة تماماً:

\`\`\`javascript
const numbers = [2, 4, 6];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [4, 8, 12]
\`\`\`

---

## الثاني عشر: إيه الفرق بين Synchronous و Asynchronous JavaScript؟

* **التنفيذ المتزامن (Synchronous):** الأوامر بتتنفذ بالترتيب، سطر ورا سطر، ولو فيه سطر بياخد وقت، بيعطل اللي بعده.
* **التنفيذ غير المتزامن (Asynchronous):** لو بتطلب بيانات من سيرفر أو بتعمل مؤقت، JavaScript بتخلي العملية تشتغل في الخلفية (Non-blocking) ومبتوقفش الصفحة:

\`\`\`javascript
console.log("1. البداية");

setTimeout(function () {
  console.log("2. أنا شغال في الخلفية بعد ثانية!");
}, 1000);

console.log("3. النهاية");
\`\`\`

الناتج في الـ Console:
\`\`\`text
1. البداية
3. النهاية
2. أنا شغال في الخلفية بعد ثانية!
\`\`\`

تقدر تتعمق أكتر في أسرار الـ Event Loop والـ Microtasks في دليلنا المعماري: [الدليل الهندسي الشامل لـ JavaScript الحديثة](/articles/modern-javascript-comprehensive-guide-es6-async).

---

## الثالث عشر: مشروع عملي — اصنع تطبيق عداد تفاعلي بـ JavaScript

زي ما اتعودنا في **خمسة برمجة بالبلدي**: الكود الحقيقي بيثبت في دماغك بالتطبيق العملي! 🔥

دلوقتي هنعمل مع بعض **تطبيق عداد تفاعلي (Interactive Counter App)** بيحتوي على:
* رقم عداد كبير في المنتصف.
* زر لزيادة الرقم (+1).
* زر لتقليل الرقم (-1).
* زر لتصفير العداد والرجوع للصفر.

انسخ الكود ده في ملف \`counter.html\` وافتحه في المتصفح:

\`\`\`html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>مشروع العداد التفاعلي - خمسة برمجة بالبلدي</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #0b0d13;
      margin: 0;
      color: #f8fafc;
    }
    .counter-card {
      background-color: #141824;
      padding: 40px 30px;
      border-radius: 24px;
      border: 1px solid #1e293b;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      text-align: center;
      width: 100%;
      max-width: 360px;
    }
    .counter-display {
      font-size: 64px;
      font-weight: 900;
      color: #fbbf24;
      margin: 24px 0;
      font-variant-numeric: tabular-nums;
    }
    .buttons-group {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    button {
      padding: 12px 20px;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.15s ease;
    }
    button:active {
      transform: scale(0.95);
    }
    .btn-inc { background-color: #10b981; color: white; }
    .btn-dec { background-color: #ef4444; color: white; }
    .btn-reset { background-color: #334155; color: white; }
  </style>
</head>
<body>

  <main class="counter-card">
    <h2>تطبيق العداد التفاعلي ⚡</h2>
    <p style="color: #94a3b8; font-size: 14px;">جرب التفاعل الحي مع كود JavaScript!</p>
    
    <div class="counter-display" id="count">0</div>

    <div class="buttons-group">
      <button class="btn-inc" id="increase">+ زيادة</button>
      <button class="btn-dec" id="decrease">- تقليل</button>
      <button class="btn-reset" id="reset">تصفير</button>
    </div>
  </main>

  <script>
    // 1. تعريف حالة المتغير الأساسي
    let count = 0;

    // 2. تحديد عناصر الـ DOM
    const countDisplay = document.getElementById("count");
    const increaseBtn = document.getElementById("increase");
    const decreaseBtn = document.getElementById("decrease");
    const resetBtn = document.getElementById("reset");

    // 3. دالة تحديث الشاشة
    function renderCount() {
      countDisplay.textContent = count;
      // تغيير لون العداد لو سالب أو موجب
      if (count > 0) countDisplay.style.color = "#10b981";
      else if (count < 0) countDisplay.style.color = "#ef4444";
      else countDisplay.style.color = "#fbbf24";
    }

    // 4. ربط الأحداث بالأزرار
    increaseBtn.addEventListener("click", () => {
      count++;
      renderCount();
    });

    decreaseBtn.addEventListener("click", () => {
      count--;
      renderCount();
    });

    resetBtn.addEventListener("click", () => {
      count = 0;
      renderCount();
    });
  </script>

</body>
</html>
\`\`\`

> **تحدي خاص بالمبرمجين الأذكياء:** جرب تعدل الكود بحيث تضيف زرار يزود 10 أرقام مرة واحدة، أو تمنع العداد من النزول تحت الصفر!

---

## الرابع عشر: إيه الأخطاء اللي لازم تتجنبها وأنت بتتعلم JavaScript؟

| الخطأ الشائع | ليه بيأخرك؟ | الحل الصحيح |
| :--- | :--- | :--- |
| **حفظ الأكواد بدون فهم** | أول ما تغير اسم أو شرط في الكود هتعطل تماماً | افهم كل سطر بيعمل إيه، واكتب الكود من الصفر بإيدك |
| **تجاهل قراءة رسائل الخطأ** | بتفضل تعدل عشوائياً بدون معرفة سبب المشكلة | اقرأ رسالة الـ Error في الـ Console وشوف رقم السطر المذكور |
| **القفز لـ React قبل إتقان الأساسيات** | هتحس إن React معقدة وصعبة وهي في الحقيقة بريئة! | اتقن المتغيرات، والمصفوفات، ودوال ES6، والـ DOM الأول |
| **الاعتماد الكامل على نسخ كود الذكاء الاصطناعي** | بتفقد عضلة التفكير المنطقي وحل المشكلات | اطلب من الـ AI يشرح لك المنطق ويديك تلميحات بدل الكود الجاهز |
| **كثرة مشاهدة الكورسات بدون تطبيق** | وهم الإنجاز؛ تشوف 30 ساعة بدون ما تكتب سطر كود واحد | طبق قاعدة 80/20: ساعتين تطبيق لكل نصف ساعة مشاهدة |

---

## الخامس عشر: بعد ما تتعلم JavaScript، تتعلم إيه؟

بعد ما تتقن الأساسيات اللي شرحناها في المقال ده، مسارك هيمشي كالآتي:

1. **التعمق في الـ DOM Events:** التعامل مع نماذج الإدخال، لوحة المفاتيح، والـ LocalStorage.
2. **خصائص JavaScript الحديثة (ES6+):** الـ Arrow Functions، Destructuring، والـ Modules.
3. **التعامل مع الشبكات والـ APIs:** استخدام \`fetch\` و \`async/await\` لجلب بيانات حية من الإنترنت.
4. **الانتقال لمكتبة [React.js](/articles/react-19-architecture-server-components-advanced-hooks):** لبناء تطبيقات واجهات متكاملة بمكونات قابلة لإعادة الاستخدام.
5. **استكشاف عالم الخوادم بـ [Node.js](/articles/advanced-nodejs-engineering-event-loop-streams-workers):** علشان تبني APIs وقواعد بيانات كاملة بنفس لغة JavaScript!

---

## الخلاصة: اتعلم JavaScript بالكود مش بالمشاهدة بس

JavaScript هي القلب النابض لشبكة الويب، وتعلمها بيفتح لك أوسع أبواب العمل في البرمجيات وتطوير الويب عالمياً ومحلياً.

اتعلمنا النهاردة:
* إيه هي JavaScript وليه هي مش Java.
* إزاي تطبع في الـ Console وتستخدم المتغيرات (\`let\` و \`const\`).
* أنواع البيانات الأساسية والعمليات الحسابية.
* الشروط (\`if/else\`) والحلقات التكرارية (\`loops\`).
* الدوال وتنظيم الأكواد.
* لمس عناصر الـ HTML والتفاعل معاها عبر الـ DOM.
* وبنينا مع بعض مشروع عداد حقيقي تفاعلي.

### 📚 مقالتنا القادمة في السلسلة:
> **«يعني إيه DOM في JavaScript؟ شرح التعامل مع عناصر HTML وتغيير محتوى الصفحة بالأمثلة العملية»**

افتح محرر الأكواد دلوقتي، اكتب كود العداد وطور فيه، وخليك فاكر شعارنا دايماً:

**خمسة برمجة بالبلدي — افهمها بالبلدي.. اكتبها بالكود! 💛**
`,
};
