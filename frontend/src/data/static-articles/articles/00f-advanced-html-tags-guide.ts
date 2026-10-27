import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const articleHTMLAdvanced01: StaticArticle = {
  id: 'static-art-html-adv-01',
  slug: 'advanced-html-tags-guide',
  title: 'شرح وسوم HTML المتقدمة بالعامية المصرية من الصفر بالأمثلة العملية',
  excerpt: 'اتعلم وسوم HTML المتقدمة بالعامية المصرية: من العناصر التفاعلية details وsummary، ورسومات canvas وsvg، إلى picture المتجاوبة ومقاييس meter وprogress، مع مشروع FAQ تفاعلي كامل.',
  description: 'اتعلم وسوم HTML المتقدمة بالعامية المصرية، من details وcanvas إلى picture وmeter وprogress، مع أمثلة عملية ومشروع تطبيقي.',
  category: 'HTML وتطوير الويب',
  tags: ['HTML', 'HTML5', 'Front-End', 'تعلم البرمجة', 'وسوم HTML المتقدمة', 'أساسيات الويب'],
  keywords: [
    'وسوم HTML المتقدمة',
    'شرح HTML',
    'عناصر HTML',
    'HTML للمحترفين',
    'وسوم HTML التفاعلية',
    'تعلم canvas و svg',
    'برمجة بالبلدي',
  ],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-10-19T18:00:00.000Z',
  updatedAt: '2026-10-19T18:00:00.000Z',
  readTimeMinutes: 24,
  coverImage: '/images/articles/advanced-html-tags-guide.jpg',
  coverAlt: 'شرح وسوم HTML المتقدمة بالعامية المصرية من الصفر بالأمثلة العملية في خمسة برمجة بالبلدي',
  isFeatured: true,
  tableOfContents: [
    { id: 'intro-concept', title: 'مقدمة: يعني إيه «وسوم HTML المتقدمة»؟', level: 2 },
    { id: 'section-1-interactive', title: 'القسم الأول: وسوم التفاصيل والعناصر التفاعلية بدون JavaScript', level: 2 },
    { id: 'section-2-graphics', title: 'القسم الثاني: وسوم الرسومات والأشكال (Canvas vs SVG)', level: 2 },
    { id: 'section-3-embeds', title: 'القسم الثالث: وسوم عرض الملفات والمحتوى الخارجي (iframe, object, embed)', level: 2 },
    { id: 'section-4-data-display', title: 'القسم الرابع: وسوم تحسين عرض النصوص والبيانات (data, meter, progress)', level: 2 },
    { id: 'section-5-time-diff', title: 'القسم الخامس: وسوم الوقت والتعديلات النصية (time, del, ins)', level: 2 },
    { id: 'section-6-forms-adv', title: 'القسم السادس: وسوم النماذج المتخصصة (output, datalist, fieldset)', level: 2 },
    { id: 'section-7-responsive-img', title: 'القسم السابع: وسوم الصور المتجاوبة الحديثة (picture و source)', level: 2 },
    { id: 'section-8-bidi-terms', title: 'القسم الثامن: وسوم اتجاه النص والمصطلحات التوثيقية (bdi, bdo, abbr, dfn)', level: 2 },
    { id: 'section-9-code-tags', title: 'القسم التاسع: وسوم مفيدة عند التعامل مع الأكواد البرمجية (code و pre)', level: 2 },
    { id: 'section-10-deprecated', title: 'القسم العاشر: وسوم قديمة ومهجورة لازم تعرف إنها موجودة وتتجنبها', level: 2 },
    { id: 'section-11-practical-project', title: 'مشروع عملي: صفحة أسئلة شائعة تفاعلية (FAQ) بـ HTML و CSS', level: 2 },
    { id: 'conclusion', title: 'الخلاصة والخطوة التالية في السلسلة', level: 2 },
  ],
  faq: [
    {
      question: 'هل وسم <details> بيغني عن استخدام JavaScript لعمل الأكورديون (Accordion)؟',
      answer: 'نعم بنسبة 100%! المتصفح يدعم فتح وإغلاق عنصر <details> ذاتياً بدون كتابة أي سطر JavaScript، مع إمكانية تنسيقه بالكامل وتغيير أيقونة السهم عبر CSS.',
    },
    {
      question: 'ما هو الفرق الأساسي بين <canvas> و <svg> في المتصفح؟',
      answer: 'الـ <svg> يعتمد على عناصر متجهات (Vector DOM Elements) محددة بالأكواد، لا تفقد جودتها إطلاقاً عند التكبير وممتازة للشعارات والأيقونات والرسوم التوضيحية. بينما الـ <canvas> هي ورقة بكسلات نقطية بيضاء ترسم عليها وتتحكم فيها بالكامل بواسطة JavaScript، وهي مثالية للألعاب والرسومات المتحركة السريعة ومعالجة الصور.',
    },
    {
      question: 'إيه الفرق بين <meter> و <progress>؟',
      answer: 'الـ <meter> يُستخدم لعرض قيمة رقمية ضمن نطاق ثابت ومعروف (زي نسبة استخدام الذاكرة 70% أو مستوى شحن البطارية)، بينما <progress> يُستخدم حصرياً لعرض مدى تقدم إنجاز مهمة أو عملية مستمرة (زي تقدم رفع أو تحميل ملف).',
    },
    {
      question: 'ليه لازم نتجنب وسوم قديمة زي <font> و <center> و <marquee>؟',
      answer: 'لأن معايير الويب الحديثة (W3C و WHATWG) تفصل تماماً بين هيكل الصفحة ومعناها (HTML) وبين شكلها وحركتها (CSS). هذه الوسوم تم إلغاؤها رسمياً في HTML5، وتسبب كود غير منظم وضعيف في الأداء والـ SEO وإمكانية الوصول.',
    },
    {
      question: 'إيه الخطوة القادمة بعد إتقان وسوم HTML الأساسية والمتقدمة؟',
      answer: 'الخطوة التالية مباشرة هي سلسلتنا القادمة: «شرح CSS بالكامل بالعامية المصرية: من الأساسيات لحد الاحتراف»، لتعلم التنسيقات المعمارية والـ Flexbox والـ CSS Grid والتصميم المتجاوب والأنيميشن خطوة بخطوة.',
    },
  ],
  relatedSlugs: [
    'html-basic-tags-guide',
    'html-tutorial-for-beginners',
    'css-tutorial-for-beginners',
    'javascript-tutorial-for-beginners',
    'learn-programming-from-scratch',
  ],
  seo: {
    title: 'شرح وسوم HTML المتقدمة بالأمثلة العملية',
    description: 'اتعلم وسوم HTML المتقدمة بالعامية المصرية، من details وcanvas إلى picture وmeter وprogress، مع أمثلة عملية ومشروع تطبيقي.',
    keywords: [
      'وسوم HTML المتقدمة',
      'شرح HTML',
      'عناصر HTML',
      'HTML للمحترفين',
      'وسوم HTML التفاعلية',
      'برمجة بالبلدي',
    ],
    canonicalUrl: 'https://www.khamsaprogramming.com/articles/advanced-html-tags-guide',
    ogTitle: 'شرح وسوم HTML المتقدمة بالعامية المصرية من الصفر بالأمثلة العملية',
    ogDescription: 'دليل شامل لوسوم HTML المتقدمة: العناصر التفاعلية، الوسائط، الرسومات المتجهية، النماذج المتخصصة، والوسوم المهجورة التي يجب تجنبها.',
  },
  content: `في المقالة اللي فاتت على **خمسة برمجة بالبلدي** [شرح جميع وسوم HTML الأساسية بالعامية المصرية](/articles/html-basic-tags-guide)، اتعرفنا على أهم وسوم تأسيس الصفحات، زي العناوين والفقرات والصور والروابط والجداول والنماذج والوسوم الدلالية.

لكن عالم HTML5 مش بيقف عند الأساسيات دي بس! 🚀

فيه وسوم متقدمة ومبهرة بتساعدك تبني عناصر تفاعلية جاهزة بدون سطر [JavaScript](/articles/javascript-tutorial-for-beginners) واحد، وتعرض رسومات متجهة بجودة خرافية، وتضمن ملفات وسائط متجاوبة مع سرعة الإنترنت، وتوفر تجربة مستخدم وإمكانية وصول (Accessibility) تليق بمواقع الشركات الكبرى.

في المقالة دي — الجزء الثاني من سلسلتنا المرجعية — هنغوص مع بعض في **وسوم HTML المتقدمة**، مع شرح كل وسم بالعامية المصرية المبسطة وأمثلة كود عملية وتطبيق واقعي.

> **ملحوظة مهمة للمبتدئ:** كلمة «متقدمة» هنا مش معناها إنها معقدة أو صعبة؛ معناها فقط إنها بتتناول استخدامات متخصصة أو أقل شيوعاً في الشروحات السطحية، وهتخلي كودك احترافي ويسبق غيرك بسنين ضوئية!

يلا نبدأ على بركة الله! 🔥

---

## القسم الأول: وسوم التفاصيل والعناصر التفاعلية بدون JavaScript

### 1. الوسم \`<details>\` والوسم \`<summary>\`

عمرك دخلت موقع ولقيت صندوق سؤال، ولما ضغطت عليه اتفتح بسلاسة وظهرت الإجابة اللي تحته (Accordion)؟

زمان كنا بنحتاج نكتب كود [JavaScript](/articles/javascript-tutorial-for-beginners) طويل ونضيف Events و Classes علشان نعمل الحركة دي؛ لكن دلوقتي تقدر تعملها في سطرين HTML صافيين!

\`\`\`html
<details>
  <summary>يعني إيه HTML بالبلدي؟</summary>
  <p>
    HTML هي لغة الترميز اللي بنستخدمها لبناء الهيكل والأساسات الخرسانية لأي صفحة ويب على الإنترنت.
  </p>
</details>
\`\`\`

* **الوسم \`<details>\`:** هو الصندوق الخارجي اللي بيحتوي على المحتوى القابل للطي والفتح.
* **الوسم \`<summary>\`:** هو العنوان الرئيسي الظاهر دايماً، واللي المستخدم بيضغط عليه بالماوس علشان يفتح أو يقفل الصندوق.

> **إمتى تستخدمهم في شغلك؟**
> * صفحات الأسئلة الشائعة (FAQ).
> * عرض شروط الخدمة وتفاصيل المنتجات المعقدة.
> * تقليل ازدحام الصفحات الطويلة وجعل القراءة مريحة للمستخدم.

---

## القسم الثاني: وسوم الرسومات والأشكال (Canvas vs SVG)

### 2. الوسم \`<canvas>\` (لوحة الرسم البرمجية)
لو عايز ترسم أشكال هندسية متغيرة، أو تبني ألعاب متصفح بسيطة (2D Games)، أو تعمل رسوم بيانية وتأثيرات بصرية حية، فالـ \`<canvas>\` هو أداتك السحرية مع JavaScript:

\`\`\`html
<canvas id="myCanvas" width="400" height="200">
  متصفحك لا يدعم وسم Canvas.
</canvas>

<script>
  // مسك الكانفاس والبدء في الرسم ثنائي الأبعاد
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // رسم مستطيل أزرق ملكي
  ctx.fillStyle = "#2563eb";
  ctx.fillRect(50, 40, 200, 100);
</script>
\`\`\`

**بالمصري:** الـ \`<canvas>\` زي ورقة بيضاء فاضية بيمسكها المتصفح، وأنت بتستخدم كود الجافاسكريبت كقلم رصاص وفرشاة ألوان علشان ترسم عليها بكسل ببكسل.

---

### 3. الوسم \`<svg>\` (الرسومات المتجهة القابلة للتكبير)
SVG اختصار لـ **Scalable Vector Graphics**؛ ده تنسيق رسومات متجهة رياضي مش بيعتمد على البكسلات النقطية، وبالتالي **مستحيل الصورة تبكسل أو تفقد جودتها مهما كبرتها على شاشات الموبايل أو شاشات 4K العملاقة!**

\`\`\`html
<svg width="300" height="150" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
  <!-- مستطيل بحواف ناعمة -->
  <rect x="20" y="20" width="120" height="80" rx="12" fill="#2563eb" />
  
  <!-- دائرة برتقالية ذهبية -->
  <circle cx="210" cy="60" r="35" fill="#f59e0b" />
</svg>
\`\`\`

| وجه المقارنة | \`<svg>\` | \`<canvas>\` |
| :--- | :--- | :--- |
| **طريقة الرسم** | وسوم وعناصر في الدوم (DOM Elements) | رسم برمجي عبر JavaScript |
| **دقة التكبير** | لا تفقد جودتها إطلاقاً (Infinite Resolution) | مبنية على البكسل (Raster) وممكن تبكسل |
| **الاستخدام المثالي** | الشعارات، الأيقونات، والرسوم البيانية | ألعاب المتصفح، التأثيرات الكثيفة، وتعديل الصور |

---

## القسم الثالث: وسوم عرض الملفات والمحتوى الخارجي

### 4. الوسم \`<iframe>\` (تضمين الصفحات والخرائط)
لو عايز تعرض فيديو من يوتيوب، أو خريطة من خرائط Google، أو صفحة ويب خارجية داخل موقعك:
\`\`\`html
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  title="موقع مقر خمسة برمجة بالبلدي"
  width="600"
  height="400"
  loading="lazy"
  allowfullscreen>
</iframe>
\`\`\`
> **نصيحة أمان:** بعض المواقع بتمنع عرض صفحاتها داخل \`iframe\` بحماية الـ \`X-Frame-Options\` لمنع هجمات Clickjacking، فاحرص دايماً على استخدام روابط المشاركة المسموح بها رسميًا.

### 5. الوسم \`<object>\` والوسم \`<embed>\` (تضمين ملفات PDF والوسائط)
لتضمين مستند PDF كامل داخل صفحتك مع توفير رابط بديل لو المتصفح مبيعرفش يفتحه:
\`\`\`html
<object data="web-development-roadmap.pdf" type="application/pdf" width="600" height="450">
  <p>
    متصفحك لا يدعم قراءة ملفات PDF المدمجة؛ 
    <a href="web-development-roadmap.pdf" target="_blank">اضغط هنا لتحميل الملف مباشرة</a>.
  </p>
</object>
\`\`\`

---

## القسم الرابع: وسوم تحسين عرض النصوص والبيانات

### 6. الوسم \`<meter>\` vs الوسم \`<progress>\`
من أكتر الوسوم اللي بيحصل فيها لبس بين المطورين:

* **الوسم \`<meter>\`:** بيعرض قيمة رقمية واقعة ضمن نطاق قياسي محدد ومعروف (زي مؤشر نسبة شحن البطارية، أو مؤشر استخدام مساحة الهارد ديسك):
\`\`\`html
<label for="storage">مساحة التخزين المستهلكة:</label>
<meter id="storage" min="0" max="100" low="30" high="80" optimum="20" value="75">
  75%
</meter>
\`\`\`

* **الوسم \`<progress>\`:** بيعرض حصرياً مدى التقدم الزمني لمهمة أو عملية رفع جارية (زي تحميل ملف أو ملء استمارة):
\`\`\`html
<label for="upload-bar">جاري رفع الملف:</label>
<progress id="upload-bar" value="65" max="100">65%</progress>
\`\`\`

### 7. الوسم \`<data>\`
لربط قيمة مقروءة آلياً (Machine-Readable) مع نص مرئي موجه للزائر:
\`\`\`html
<ul>
  <li><data value="PROD-101">كتاب شرح HTML الشامل</data></li>
  <li><data value="PROD-102">كتاب شرح CSS المعماري</data></li>
</ul>
\`\`\`

---

## القسم الخامس: وسوم الوقت والتعديلات النصية

### 8. الوسم \`<time>\`
وسم مهم جداً لمحركات البحث والـ SEO علشان تفهم تواريخ المقالات ومواعيد الأحداث بدقة:
\`\`\`html
<p>
  تاريخ نشر المقال:
  <time datetime="2026-10-19T18:00:00Z">19 أكتوبر 2026</time>
</p>
\`\`\`

### 9. الوسمان \`<del>\` و \`<ins>\`
لعرض التحديثات في المستندات أو العروض الترويجية في المتاجر:
\`\`\`html
<p>سعر الكورس: <del>500 جنيه</del> أصبح الآن <ins>350 جنيه</ins></p>
\`\`\`

---

## القسم السادس: وسوم النماذج المتخصصة

### 10. الوسم \`<output>\`
وسم مخصص لعرض النتيجة الحسابية اللحظية لمدخلات النموذج:
\`\`\`html
<form oninput="total.value = Number(price.value) + Number(tax.value)">
  <input type="number" id="price" value="100"> +
  <input type="number" id="tax" value="14"> =
  <output name="total" for="price tax">114</output>
</form>
\`\`\`

### 11. الوسم \`<datalist>\` (حقل البحث بالاقتراحات الذكية)
حقل بحث عادي بيكتب فيه الزائر، لكن بيطلع له قايمة منسدلة باقتراحات تساعده:
\`\`\`html
<label for="track">اختار مسارك المفضل:</label>
<input list="tracks" id="track" name="track" placeholder="اكتب أو اختار...">

<datalist id="tracks">
  <option value="Front-End Development">
  <option value="Back-End Node.js">
  <option value="Full-Stack JavaScript">
  <option value="DevOps & Cloud">
</datalist>
\`\`\`

---

## القسم السابع: وسوم الصور المتجاوبة الحديثة

### 12. الوسم \`<picture>\` والوسم \`<source>\`
من أعظم ميزات HTML5 للأداء وسرعة تحميل المواقع! 

بدل ما ترسل صورة كمبيوتر ضخمة (حجمها 3 ميجا) لمستخدم فاتح من باقة موبايل، وسم \`<picture>\` بيسمح لك تخدم صورة صغيرة ومضغوطة للموبايل بصيغة حديثة زي **WebP** أو **AVIF**، وصورة كبيرة للكمبيوتر:

\`\`\`html
<picture>
  <!-- لو شاشة الموبايل أقل من 600 بكسل، اطلب الصورة دي -->
  <source media="(max-width: 600px)" srcset="images/cover-mobile.webp" type="image/webp">
  
  <!-- لو المتصفح بيدعم صيغة AVIF الحديثة جداً -->
  <source srcset="images/cover-desktop.avif" type="image/avif">
  
  <!-- الصورة الاحتياطية الأساسية لأي متصفح قديم -->
  <img src="images/cover-desktop.jpg" alt="دليل تعلم HTML المتقدم" loading="lazy">
</picture>
\`\`\`

---

## القسم الثامن: وسوم اتجاه النص والمصطلحات التوثيقية

* **الوسم \`<bdi>\` (Bi-directional Isolation):** بيعزل الكلمات أو أسماء المستخدمين المكتوبة بلغة مختلفة (إنجليزي وسط عربي) علشان متبوظش اتجاه الفقرة لو فيها أرقام أو رموز.
* **الوسم \`<bdo>\` (Bi-directional Override):** لفرض اتجاه صريح إجباري للنص (\`dir="rtl"\` أو \`dir="ltr"\`).
* **الوسم \`<abbr>\`:** لتوضيح المعنى الكامل للاختصارات عند تمرير الماوس:
\`\`\`html
<p>
  بنستخدم واجهات الـ <abbr title="Application Programming Interface">API</abbr> للربط مع السيرفر.
</p>
\`\`\`
* **الوسم \`<dfn>\`:** لتمييز المصطلح الذي يُعرّف لأول مرة في سياق المقال.

---

## القسم التاسع: وسوم الأكواد البرمجية

* **الوسم \`<code>\`:** لتمييز أسماء الدوال والمتغيرات داخل السطر: \`<code>console.log()</code>\`.
* **الوسم \`<pre>\`:** للمحافظة على الفراغات وتنسيق كتل الأكواد الكاملة:
\`\`\`html
<pre><code>const name = "ربيع شعبان";
console.log(name);</code></pre>
\`\`\`

---

## القسم العاشر: وسوم قديمة ومهجورة لازم تعرف إنها موجودة وتتجنبها

لو شفت كود قديم مكتوب من سنة 2005، ممكن تقابل وسوم كانت شائعة زمان، لكنها **اتلغت رسمياً وغير مدعومة في معايير HTML القياسية الحديثة**:

| الوسم المهجور | كان بيعمل إيه؟ | البديل الاحترافي بـ CSS حالياً |
| :--- | :--- | :--- |
| **\`<font>\`** | تلوين وتكبير الخط | استخدام خصائص \`color\` و \`font-size\` في CSS |
| **\`<center>\`** | توسيط الكلام في نص الشاشة | استخدام \`text-align: center\` أو Flexbox |
| **\`<marquee>\`** | تحريك شريط نصي يجري في الصفحة | استخدام CSS Animations و \`@keyframes\` |
| **\`<strike>\`** | شطب الكلام بخط في المنتصف | استخدام الوسم الدلالي الحديث \`<del>\` أو \`<s>\` |

> **قاعدة للمبرمج العصري:** HTML مخصصة **للمعنى والهيكل فقط**، أما الشكل، الألوان، والتوسيط، والأنيميشن فمسؤولية [CSS](/articles/css-tutorial-for-beginners) بالكامل!

---

# مشروع عملي: صفحة أسئلة شائعة تفاعلية (FAQ) بـ HTML و CSS

تعال نجمع اللي اتعلمناه في تطبيق عملي أنيق لصفحة أسئلة شائعة لموقع **خمسة برمجة بالبلدي** باستخدام وسوم \`<details>\` و \`<summary>\` مع لمسة CSS فخمة بدون جافاسكريبت:

\`\`\`html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>الأسئلة الشائعة - خمسة برمجة بالبلدي</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background-color: #0b0d13;
      color: #f8fafc;
      padding: 40px 20px;
      line-height: 1.8;
    }
    main {
      max-width: 680px;
      margin: auto;
    }
    h1 {
      color: #f59e0b;
      font-size: 32px;
      margin-bottom: 8px;
    }
    details {
      background-color: #141824;
      border: 1px solid #1e293b;
      margin-bottom: 16px;
      padding: 18px 24px;
      border-radius: 16px;
      transition: all 0.3s ease;
    }
    details[open] {
      border-color: #f59e0b;
      box-shadow: 0 8px 24px rgba(245, 158, 11, 0.15);
    }
    summary {
      font-weight: bold;
      font-size: 18px;
      cursor: pointer;
      color: #f8fafc;
      list-style: none; /* إخفاء السهم القديم */
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    summary::-webkit-details-marker {
      display: none;
    }
    summary::after {
      content: '+';
      font-size: 24px;
      color: #f59e0b;
      transition: transform 0.2s ease;
    }
    details[open] summary::after {
      content: '−';
      transform: rotate(180deg);
    }
    details p {
      margin-top: 14px;
      color: #94a3b8;
      font-size: 15px;
      border-top: 1px solid #1e293b;
      padding-top: 12px;
    }
  </style>
</head>
<body>

  <main>
    <h1>الأسئلة الشائعة 🔥</h1>
    <p style="color: #94a3b8; margin-bottom: 30px;">
      إجابات مبسطة وشاملة لأهم تساؤلات المبتدئين في مسار البرمجة وتطوير الويب:
    </p>

    <section>
      <details>
        <summary>هل أقدر أتعلم البرمجة من الصفر في 2026؟</summary>
        <p>
          بالتأكيد! ملايين المبرمجين حول العالم بدأوا بالتعلم الذاتي من الصفر. كل اللي محتاجه الالتزام اليومي بساعتين وتطبيق مشاريع عملية مستمرة.
        </p>
      </details>

      <details>
        <summary>هل لازم أبدأ بتعلم HTML قبل أي حاجة تانية؟</summary>
        <p>
          نعم، لو كان هدفك تطوير مواقع الويب (Front-End أو Full-Stack)، فـ HTML هي الأبجدية التي لا غنى عنها لبناء الصفحات وتحديد المحتوى.
        </p>
      </details>

      <details>
        <summary>إيه الفرق الجوهري بين HTML و CSS و JavaScript؟</summary>
        <p>
          HTML بتحدد هيكل ومحتوى الصفحة، وCSS بتتحكم في شكلها وألوانها وتنسيقها، أما JavaScript فهي اللي بتضيف الحركة والذكاء والتفاعل مع الزائر.
        </p>
      </details>
    </section>
  </main>

</body>
</html>
\`\`\`

---

# الخلاصة والخطوة التالية في السلسلة

كده بنكون غطينا في جزأين كاملين خريطة لغة HTML بالكامل: من أول وسم لآخر وسم متقدم!

عرفنا إزاي نعمل أكورديون تفاعلي بدون جافاسكريبت، وإزاي نستخدم رسومات الـ SVG والـ Canvas، ونخدم صور متجاوبة بأعلى سرعة بـ \`<picture>\`، ونتجنب الوسوم المهجورة.

### 🚀 سلسلتنا القادمة التي لا تُفوّت:
> **«شرح CSS بالكامل بالعامية المصرية: من الأساسيات لحد الاحتراف»**

هنغوص فيها خطوة بخطوة في أنظمة الـ Flexbox المعمارية، وتخطيط الـ CSS Grid المتقدم، والأنيميشن الاحترافي، والتصميم المتجاوب مع كل شاشات الموبايل الحديثة!

خمسة برمجة بالبلدي — **افهمها بالبلدي.. اكتبها بالكود! 💛**
`,
};
