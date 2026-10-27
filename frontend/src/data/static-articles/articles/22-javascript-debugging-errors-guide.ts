import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article22: StaticArticle = {
  id: 'static-art-js-debugging-22',
  slug: 'javascript-debugging-errors-guide',
  title: 'أشهر أخطاء JavaScript وكيف تحلها: دليل الـ Debugging من الصفر بالبلدي',
  excerpt: 'بتشوف TypeError أو Unhandled Rejection ومش عارف الكود باظ فين؟ بنشرح لك أشهر 7 أخطاء بتواجه مبرمجي الجافاسكريبت مع خطوات عملية لاصطياد الـ Bugs باستخدام Chrome DevTools.',
  description: 'دليل شامل ومبسط لتصحيح أخطاء JavaScript (Debugging). تعلم كيفية التعامل مع TypeError، وحل أخطاء الـ Async/Await، واستخدام Console و Breakpoints باحترافية.',
  category: 'JavaScript',
  tags: ['JavaScript', 'Debugging', 'Web Development', 'Clean Code', 'أخطاء برمجية'],
  keywords: [
    'أخطاء جافاسكريبت',
    'تصحيح أخطاء JavaScript',
    'شرح TypeError',
    'debugging javascript',
    'Chrome DevTools بالعربي',
    'برمجة بالبلدي',
    'خمسة برمجة',
  ],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-10-25T11:00:00.000Z',
  updatedAt: '2026-10-25T11:00:00.000Z',
  readTimeMinutes: 13,
  coverImage: '/images/articles/modern-javascript.jpg',
  coverAlt: 'دليل تصحيح أخطاء JavaScript - خمسة برمجة بالبلدي',
  isFeatured: true,
  tableOfContents: [
    { id: 'intro-debugging', title: 'أولاً: عقلية المهندس في التعامل مع الـ Bugs', level: 2 },
    { id: 'typeerror-undefined', title: 'ثانياً: الخطأ الأشهر — Cannot read properties of undefined', level: 2 },
    { id: 'reference-error', title: 'ثالثاً: ReferenceError — المتغير الشبح اللي مش موجود', level: 2 },
    { id: 'async-await-traps', title: 'رابعاً: فخاخ الأكواد غير المتزامنة (Async/Await) والـ Promises', level: 2 },
    { id: 'scope-and-this', title: 'خامساً: أخطاء النطاق (Scope) وكلمة this السحرية', level: 2 },
    { id: 'devtools-mastery', title: 'سادساً: اصطياد الأخطاء باستخدام Chrome DevTools (وداعاً console.log)', level: 2 },
    { id: 'cors-and-network', title: 'سابعاً: كابوس الـ CORS وأخطاء الاتصال بالسيرفر', level: 2 },
    { id: 'debugging-checklist', title: 'ثامناً: قائمة الفحص السريعة (Debugging Checklist)', level: 2 },
  ],
  faq: [
    {
      question: 'كيف أحل خطأ Cannot read properties of undefined (reading something)؟',
      answer: 'يحدث هذا الخطأ عندما تحاول الوصول لخاصية داخل كائن (Object) قيمته null أو undefined، والحل السريع هو استخدام وسم التقييم الاختياري (Optional Chaining) مثل user?.profile?.name أو وضع قيمة افتراضية للبيانات قبل معالجتها.',
    },
    {
      question: 'لماذا يفضل استخدام Breakpoints بدلاً من console.log في فحص الأخطاء؟',
      answer: 'لأن Breakpoints في أدوات المطور (Chrome DevTools) تتيح لك إيقاف تنفيذ الكود لحظياً، وفحص قيم كافة المتغيرات في نطاق الذاكرة خطوة بخطوة (Step-by-step)، ومعرفة الـ Call Stack بدقة دون تلويث الكود بأوامر طباعة يدوية.',
    },
    {
      question: 'ما هو سبب ظهور خطأ CORS في المتصفح وكيف يتم علاجه؟',
      answer: 'خطأ CORS هو إجراء أمني يفرضه المتصفح لحماية المستخدم عندما يحاول كود Front-End طلب بيانات من دومين خارجي لا يسمح بذلك صراحة في الهيدرز (Access-Control-Allow-Origin). ويتم حله بتهيئة السيرفر للسماح بدومين الواجهة الأمامية.',
    },
  ],
  relatedSlugs: [
    'modern-javascript-comprehensive-guide-es6-async',
    'comprehensive-typescript-guide-types-generics-patterns',
    'web-security-developer-guide-owasp-top-10',
  ],
  seo: {
    title: 'أشهر أخطاء JavaScript وكيف تحلها | دليل الـ Debugging بالبلدي',
    description: 'تعرف على أشهر أخطاء لغة جافاسكريبت وطرق حلها الهندسية خطوة بخطوة مع شرح لأدوات Chrome DevTools واصطياد المشاكل.',
    keywords: [
      'أخطاء جافاسكريبت',
      'TypeError undefined',
      'Debugging JavaScript',
      'أدوات المطور',
      'برمجة بالبلدي',
    ],
    canonicalUrl: 'https://www.khamsaprogramming.com/articles/javascript-debugging-errors-guide',
    ogTitle: 'أشهر أخطاء JavaScript وكيف تحلها: دليل الـ Debugging من الصفر بالبلدي',
    ogDescription: 'دليل عملي لاكتشاف وتصحيح أخطاء جافاسكريبت البرمجية باحترافية وسرعة.',
  },
  content: `في مسار تعلم البرمجة، 80% من وقت المطور الحقيقي مش بيقضيه في كتابة كود جديد، لكن في محاولة فهم: **"هو الكود كان شغال، ليه فجأة ضرب في الوش باللون الأحمر؟"** 🐞

الـ Bug مش علامة على إنك مبرمج فاشل؛ الـ Bug ده جزء طبيعي من أي عملية بناء برمجي. لكن الفرق بين المبتدئ والمحترف هو **المنهجية الهندسية لاصطياد المشكلة وفهم سببها الجذري**.

في هذا الدليل العملي من منصة «خمسة برمجة بالبلدي»، هنستعرض أشهر أخطاء [JavaScript](/articles/modern-javascript-comprehensive-guide-es6-async) التي تقابل المطورين يومياً وكيفية حلها خطوة بخطوة!

---

## أولاً: عقلية المهندس في التعامل مع الـ Bugs

أول غلطة بيعملها المبتدئ لما يشوف Error في الكونسول إنه يتخض، ويقفل الرسالة أو يعمل ريفريش، أو يبدأ يعدل أكواد عشوائية على أمل إنها تظبط بالبركة!

### القاعدة الذهبية الأولى:
> **اقرأ رسالة الخطأ بتركيز!** المتصفح بيقولك المشكلة إيه، وفي أي ملف، وعلى أي سطر بالظبط!

---

## ثانياً: الخطأ الأشهر — Cannot read properties of undefined

ده "الملك غير المتوج" لأخطاء الجافاسكريبت في كل العصور.

\`\`\`javascript
// الكود المسبب للخطأ:
const user = null;
console.log(user.name); 
// ❌ TypeError: Cannot read properties of null (reading 'name')
\`\`\`

### ليه الخطأ ده بيحصل؟
بيحصل لما تطلب من الجافاسكريبت تفتح "علبة" وتقرا اللي جواها، في حين إن العلبة أصلاً مش موجودة في الذاكرة (undefined أو null)!

### الحلول الهندسية:

#### 1. استخدام التقييم الاختياري (Optional Chaining - \`?.\`):
\`\`\`javascript
// المتصفح هيشوف لو user موجود هيكمل، لو مش موجود هيرجع undefined من غير ما يضرب
console.log(user?.name);
\`\`\`

#### 2. وضع قيم افتراضية مع Nullish Coalescing (\`??\`):
\`\`\`javascript
const userName = user?.name ?? 'زائر مجهول';
console.log(userName);
\`\`\`

---

## ثالثاً: ReferenceError — المتغير الشبح اللي مش موجود

\`\`\`javascript
console.log(totalPrice);
// ❌ ReferenceError: totalPrice is not defined
\`\`\`

### السبب:
أنت بتنادي على متغير الجافاسكريبت مش لاقية له أي أثر في النطاق الحالي (Scope)، وغالباً سببه:
* خطأ إملائي في كتابة اسم المتغير (Typo).
* المتغير متعرف جوه \`function\` أو بلوك \`{}\` وأنت بتحاول توصله من بره.
* حاولت تستخدم متغير متعرف بـ \`let\` أو \`const\` قبل السطر اللي متعرف فيه (Temporal Dead Zone).

---

## رابعاً: فخاخ الأكواد غير المتزامنة (Async/Await)

أغلب أخطاء جلب البيانات من الـ APIs بتكون بسبب نسيان \`await\` أو عدم وضع حماية \`try/catch\`.

\`\`\`javascript
// ❌ كود خاطئ: نسيان await
async function getUserData() {
  const response = fetch('/api/user'); // ده هيرجع Promise مش البيانات نفسها!
  console.log(response.status); // هيطلع undefined
}

// ✅ الكود السليم:
async function getUserData() {
  try {
    const response = await fetch('/api/user');
    if (!response.ok) {
      throw new Error(\`فشل الطلب مع كود: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('حدث خطأ أثناء جلب البيانات:', error.message);
    // إرجاع قيمة احتياطية آمنة
    return null;
  }
}
\`\`\`

---

## خامساً: اصطياد الأخطاء باستخدام Chrome DevTools (وداعاً console.log)

كتير من المبتدئين معتمدين على ملء الملف بعشرات أسطر \`console.log('هنا 1')\` و \`console.log('وصلت هنا')\`. الطريقة دي بدائية ومضيعة للوقت!

### الطريقة الاحترافية — الـ Breakpoints:
1. افتح المتصفح ودوس **F12** لفتح أدوات المطور (DevTools).
2. ادخل على تبويب **Sources** وافتح ملف الكود بتاعك.
3. اضغط على رقم السطر اللي شاكك فيه؛ هيظهر شريط أزرق (Breakpoint).
4. أول ما الكود يوصل للسطر ده، المتصفح هيجمّد الصفحة تماماً!
5. تقدر تشوف قيم كل المتغيرات في الوقت الحالي، وتتحرك سطر بسطر بالزرار **Step over (F10)** لترى التغيرات أمام عينك مباشرة!

---

## سادساً: كابوس الـ CORS في المتصفح

\`\`\`text
Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000' 
has been blocked by CORS policy.
\`\`\`

### الحقيقة الهامة:
**خطأ الـ CORS مش خطأ في كود الفرونت إند خالص!** ده نظام حماية في المتصفح بيقولك: *«السيرفر مش مديني تصريح إنه يستقبل طلبات من الدومين بتاعك»*.

**الحل:** يتطلب إضافة هيدر من جانب السيرفر (Backend) مثل Express:
\`\`\`javascript
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));
\`\`\`

---

## قائمة الفحص السريعة (Debugging Checklist)

قبل ما تبعت تسأل في الجروبات أو تشتت نفسك:
1. **هل فتحت الـ Console وشفت أول سطر خطأ بالأحمر؟**
2. **هل تأكدت إن الـ API راجعة بـ 200 مش 404 أو 500 في تبويب Network؟**
3. **هل تأكدت من مسميات الخصائص اللي راجعة من السيرفر (هل هي \`user_id\` ولا \`id\`)؟**
4. **هل المتغيرات ممسوكة في الـ State صح؟**

اتبع الخطوات دي وهتوفر على نفسك ساعات طويلة من الإحباط!`,
};
