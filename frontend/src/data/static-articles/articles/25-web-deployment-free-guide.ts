import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article25: StaticArticle = {
  id: 'static-art-web-deployment-25',
  slug: 'web-deployment-free-guide',
  title: 'كيف تنشر موقعك أو تطبيقك مجاناً على الإنترنت؟ دليل الـ Deployment بالبلدي',
  excerpt: 'خلصت موقعك على localhost:3000 وعايز ترفعه أونلاين وتشاركه مع العالم مجاناً؟ بنشرح لك بالبلدي إزاي تنشر مواقع React و Next.js على Vercel، وتطبيقات Node.js على Render خطوة بخطوة.',
  description: 'دليل شامل لنشر مواقع الويب وتطبيقات Full-Stack مجاناً مع خمسة برمجة بالبلدي. تعلم كيفية ربط GitHub بـ Vercel و Render، وضبط متغيرات البيئة والدومين المخصص بدون أي تكلفة.',
  category: 'تطوير الويب',
  tags: ['Deployment', 'Vercel', 'Render', 'Frontend', 'Backend', 'DevOps'],
  keywords: [
    'نشر موقع مجانا',
    'شرح Vercel بالعربي',
    'رفع موقع على الإنترنت',
    'نشر تطبيق Node js',
    'free web hosting للمطورين',
    'خمسة برمجة بالبلدي',
  ],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-10-25T14:00:00.000Z',
  updatedAt: '2026-10-25T14:00:00.000Z',
  readTimeMinutes: 12,
  coverImage: '/images/articles/web-performance-cwv.jpg',
  coverAlt: 'دليل نشر مواقع الويب مجاناً - خمسة برمجة بالبلدي',
  isFeatured: true,
  tableOfContents: [
    { id: 'localhost-to-cloud', title: 'أولاً: الانتقال من localhost إلى خوادم السحابة', level: 2 },
    { id: 'best-free-platforms', title: 'ثانياً: مقارنة بين أفضل المنصات المجانية للمطورين (Vercel vs Render vs Netlify)', level: 2 },
    { id: 'deploy-frontend-vercel', title: 'ثالثاً: نشر مواقع الواجهات الأمامية (Next.js / React) على Vercel في دقيقتين', level: 2 },
    { id: 'deploy-backend-render', title: 'رابعاً: نشر خوادم الباك إند (Node.js & Express) على منصة Render', level: 2 },
    { id: 'environment-variables', title: 'خامساً: أسرار وضبط متغيرات البيئة (Environment Variables)', level: 2 },
    { id: 'custom-domain-ssl', title: 'سادساً: ربط دومين مخصص وتفعيل شهادة الأمان SSL مجاناً', level: 2 },
    { id: 'common-build-errors', title: 'سابعاً: حل أشهر أخطاء فشل البناء (Build Failed)', level: 2 },
    { id: 'summary', title: 'الخلاصة وبناء البورتفوليو الاحترافي', level: 2 },
  ],
  faq: [
    {
      question: 'لماذا يفشل بناء الموقع (Build Error) على Vercel رغم أنه كان يعمل محلياً؟',
      answer: 'السبب الأكثر شيوعاً هو وجود أخطاء في فحص الأنواع (TypeScript Errors) أو مشاكل في مكتبات ESLint يتجاهلها السيرفر المحلي في وضع التطوير (npm run dev)، لكن أمر البناء الصارم (npm run build) يرفض تجاوزها في الإنتاج.',
    },
    {
      question: 'كيف أحمي مفاتيح الـ API وكلمات المرور عند نشر المشروع على الإنترنت؟',
      answer: 'يجب عدم كتابة الأسرار مباشرة داخل الكود أو رفعها إلى مستودع GitHub؛ بل يتم إضافتها في قسم "Environment Variables" داخل لوحة تحكم منصة الاستضافة السحابية (مثل Vercel أو Render) وقراءتها عبر process.env.',
    },
    {
      question: 'هل يمكن الحصول على شهادة SSL مجانية عند ربط دومين خاص؟',
      answer: 'نعم، المنصات السحابية الحديثة مثل Vercel و Cloudflare و Render تقوم بتوليد وتجديد شهادات HTTPS (SSL/TLS) تلقائياً وبشكل مجاني تماماً لموقعك ودومينك المخصص بمجرد ضبط سجلات الـ DNS.',
    },
  ],
  relatedSlugs: [
    'nextjs-app-router-engineering-guide-production-performance',
    'git-github-practical-guide',
    'web-performance-core-web-vitals-speed-optimization',
  ],
  seo: {
    title: 'كيف تنشر موقعك أو تطبيقك مجاناً على الإنترنت؟ | دليل الـ Deployment',
    description: 'خطوة بخطوة: تعلم كيفية رفع ونشر تطبيقات الويب (React, Next.js, Node.js) على Vercel و Render مع ربط GitHub والدومين المخصص مجاناً.',
    keywords: [
      'نشر موقع مجانا',
      'Vercel',
      'Render',
      'رفع موقع على الإنترنت',
      'برمجة بالبلدي',
    ],
    canonicalUrl: 'https://www.khamsaprogramming.com/articles/web-deployment-free-guide',
    ogTitle: 'كيف تنشر موقعك أو تطبيقك مجاناً على الإنترنت؟ دليل الـ Deployment بالبلدي',
    ogDescription: 'دليل عملي شامل لنقل مشاريعك البرمجية من جهازك المحلي إلى الإنترنت مجاناً ومشاركتها في معرض أعمالك.',
  },
  content: `كتبت كود موقعك، وجربته على \`localhost:3000\` وشغال زي الفل، ودلوقتي جه الوقت الحاسم: **عايز أوريه للناس، أبعت الرابط لأصحابي، أو أقدم بيه في الإنترفيو!** 🚀

زمان عشان ترفع موقع، كنت محتاج تشتري استضافة مدفوعة وتستخدم برامج FTP معقدة، وكل ما تعدل سطر ترفع الملف يدوي.

دلوقتي، بفضل السحابة الحديثة ومفاهيم **الـ CI/CD**، تقدر ترفع موقعك مجاناً 100% بنقرة واحدة، ومع كل تعديل ترفعه على GitHub، الموقع يتحدث في ثوانٍ تلقائياً!

في هذا المقال العملي، هنشرح لك إزاي تنشر مواقع الفرونت إند وتطبيقات الباك إند بكل سهولة!

---

## أولاً: مقارنة بين أشهر المنصات المجانية للمطورين

| المنصة | الأفضل لـ | ميزة حصرية |
| :--- | :--- | :--- |
| **Vercel** | تطبيقات Next.js و React والفرونت إند | أسرع شبكة سحابية Edge Network ودعم رسمي لميزات Next.js |
| **Render** | خوادم الباك إند (Node.js و Express و Python) | تشغيل سيرفر كامل ودعم قواعد البيانات وقنوات الـ WebSockets |
| **GitHub Pages** | المواقع الثابتة البسيطة (HTML / CSS / Vanilla JS) | مدمج مباشرة داخل مستودع الجيت هب بتاعك بدون أي تسجيل خارجي |

---

## ثانياً: نشر الواجهات الأمامية على Vercel في دقيقتين

إذا كان مشروعك مبنياً بـ [React](/articles/react-hooks-beginners-guide) أو [Next.js](/articles/nextjs-app-router-engineering-guide-production-performance):

1. اتأكد إن الكود بتاعك مرفوع على مستودع في [GitHub](/articles/git-github-practical-guide).
2. افتح موقع [Vercel](https://vercel.com) وسجل دخول باستخدام حساب GitHub بتاعك.
3. اضغط على زر **Add New...** ثم اختر **Project**.
4. هتلاقي قائمة مستودعاتك ظهرت أمامك، اضغط **Import** بجانب مستودع مشروعك.
5. Vercel هيتعرف على إطار العمل تلقائياً؛ اضغط على زر **Deploy**.

في خلال دقيقة واحدة، هتلاقي ألعاب نارية ظهرت على الشاشة ورابط مجاني ينتهي بـ \`.vercel.app\` يفتح موقعك من أي موبايل أو كمبيوتر في العالم! 🎆

---

## ثالثاً: نشر خوادم الباك إند (Express) على Render

خوادم الـ Node.js بتحتاج تفضل شغالة في الخلفية وتسمع للطلبات (Listening on Port):

1. افتح [Render.com](https://render.com) وسجل دخول بحساب GitHub.
2. من لوحة التحكم، اضغط **New** واختر **Web Service**.
3. اختر مستودع الباك إند الخاص بك.
4. املأ البيانات البسيطة دي:
   * **Build Command:** \`npm install\`
   * **Start Command:** \`node server.js\` (أو \`npm start\`).
5. اختر الخطة المجانية (**Free Plan**) واضغط **Deploy Web Service**.

> **ملاحظة للمهندسين:** الخطة المجانية على Render بتدخل في وضع النوم (Sleep) لو مفيش زيارات لمدة 15 دقيقة، وأول زيارة بعدها بتاخد حوالي 30 إلى 50 ثانية لحد ما السيرفر يصحى، وده أمر طبيعي جداً للمشاريع التجريبية والبورتفوليو.

---

## رابعاً: ضبط متغيرات البيئة (Environment Variables)

لو عندك مفتاح سري لقاعدة بيانات MongoDB أو كود Google Analytics، إياك تكتبه جوه الكود مباشرة وترفعه على GitHub!

### الطريقة الصحيحة:
1. في لوحة تحكم Vercel أو Render، ادخل على **Settings** > **Environment Variables**.
2. أضف المفتاح وقيمته (مثال: \`DATABASE_URL\` والقيمة السرية).
3. المنصة السحابية هتحقن المفاتيح دي تلقائياً في السيرفر أثناء التشغيل بكل أمان!

---

## خامساً: حل أشهر أخطاء فشل البناء (Build Failed)

كتير من المطورين بيتفاجأوا إن الموقع شغال على اللابتوب لكنه يضرب فشل بناء (Failed) على السيرفر، وأشهر الأسباب:
* **اختلاف الحروف الكبيرة والصغيرة في أسماء الملفات (Case Sensitivity):**
  نظام Windows لا يفرق بين \`Header.tsx\` و \`header.tsx\`، لكن سيرفرات الاستضافة السحابية بتشتغل بنظام Linux وهو حساس جداً لحالة الأحرف!
* **مكتبات ناقصة في package.json:**
  اتأكد إنك مثبت المكتبات بـ \`npm install package-name\` مش بشكل يدوي.
* **أخطاء تايب سكريبت (TypeScript Errors):**
  شغّل أمر \`npm run build\` على جهازك الأول واتأكد إنه بينتهي بنجاح تام قبل ما ترفع الكود لـ GitHub.

---

## الخلاصة

نشر أعمالك وعرضها أونلاين هو الخطوة اللي بتنقلك من مجرد طالب بيذاكر أكواد لمطور حقيقي يمتلك مشاريع حية ومنتجات يقدر يعرضها في سيرته الذاتية بثقة وفخر!`,
};
