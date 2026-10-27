import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article24: StaticArticle = {
  id: 'static-art-rest-api-express-24',
  slug: 'build-rest-api-express-nodejs',
  title: 'كيف تبني أول REST API بـ Node.js و Express من الصفر بالأمثلة',
  excerpt: 'عايز تفهم الباك إند عملياً؟ بنبني سوا من الصفر واجهة RESTful API كاملة باستخدام Node.js و Express لإدارة المهام مع شرح الـ Endpoints، والـ Middlewares، وحالات الـ HTTP Status Codes.',
  description: 'تعلم بناء RESTful API من الصفر باستخدام Node.js و Express مع خمسة برمجة بالبلدي. شرح عملي لعمليات CRUD، والـ Middleware، والتحقق من البيانات وإرجاع استجابات JSON احترافية.',
  category: 'Node.js',
  tags: ['Node.js', 'Express', 'Backend', 'REST API', 'JavaScript'],
  keywords: [
    'بناء REST API',
    'شرح Express js',
    'تعلم Node js من الصفر',
    'RESTful API بالعربي',
    'backend للمبتدئين',
    'خمسة برمجة بالبلدي',
  ],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-10-25T13:00:00.000Z',
  updatedAt: '2026-10-25T13:00:00.000Z',
  readTimeMinutes: 14,
  coverImage: '/images/articles/express-clean-architecture.jpg',
  coverAlt: 'بناء أول REST API بـ Express و Node.js - خمسة برمجة بالبلدي',
  isFeatured: true,
  tableOfContents: [
    { id: 'what-is-rest-api', title: 'أولاً: يعني إيه REST API؟ (تشبيه جرسون المطعم)', level: 2 },
    { id: 'http-methods-status', title: 'ثانياً: أفعال HTTP وأكواد الاستجابة (Status Codes)', level: 2 },
    { id: 'project-setup', title: 'ثالثاً: تجهيز بيئة العمل وتثبيت Express', level: 2 },
    { id: 'building-crud', title: 'رابعاً: كتابة كود الـ CRUD كاملاً (إنشاء، قراءة، تعديل، حذف)', level: 2 },
    { id: 'middleware-concept', title: 'خامساً: يعني إيه Middleware؟ وليه مهمة في الباك إند؟', level: 2 },
    { id: 'validation-error-handling', title: 'سادساً: التحقق من صحة المدخلات ومعالجة الأخطاء', level: 2 },
    { id: 'testing-with-curl', title: 'سابعاً: اختبار الـ API بدون فرونت إند (باستخدام cURL أو Postman)', level: 2 },
    { id: 'summary', title: 'الخلاصة والخطوات التالية', level: 2 },
  ],
  faq: [
    {
      question: 'ما هو الفرق بين أفعال HTTP: GET و POST و PUT و DELETE؟',
      answer: 'GET تُستخدم لطلب وقراءة البيانات من السيرفر دون تعديل، و POST لإنشاء عنصر جديد، و PUT لتعديل وتحديث عنصر موجود بالكامل، بينما DELETE تُستخدم لحذف العنصر من النظام.',
    },
    {
      question: 'لماذا نحتاج app.use(express.json()) في تطبيق Express؟',
      answer: 'لأن بيانات الـ Body القادمة في طلبات POST و PUT تصل إلى السيرفر كتيار بيانات متدفق (Stream)؛ والـ Middleware الخاصة بـ express.json تقوم بتجميعها وتحويلها تلقائياً إلى كائن JavaScript جاهز للاستخدام داخل req.body.',
    },
    {
      question: 'ما هو الفرق بين كود الحالة 200 و 201 و 400 و 500؟',
      answer: '200 تعني نجاح الطلب (OK)، و 201 تعني نجاح إنشاء مورد جديد (Created)، و 400 تعني خطأ في بيانات العميل (Bad Request)، بينما 500 تعني خطأ داخلي غير متوقع في كود السيرفر (Internal Server Error).',
    },
  ],
  relatedSlugs: [
    'building-production-restful-apis-express-clean-architecture',
    'advanced-nodejs-engineering-event-loop-streams-workers',
    'authentication-authorization-jwt-sessions-oauth2-rbac',
  ],
  seo: {
    title: 'كيف تبني أول REST API بـ Node.js و Express | مشروع عملي بالبلدي',
    description: 'خطوة بخطوة من الصفر: تعلم كيفية بناء وتصميم واجهة REST API حقيقية باستخدام Node.js و Express مع معالجة الأخطاء والـ CRUD كاملة.',
    keywords: [
      'REST API',
      'Express js',
      'Node js للمبتدئين',
      'باك إند بالعربي',
      'برمجة بالبلدي',
    ],
    canonicalUrl: 'https://www.khamsaprogramming.com/articles/build-rest-api-express-nodejs',
    ogTitle: 'كيف تبني أول REST API بـ Node.js و Express من الصفر بالأمثلة',
    ogDescription: 'دليل هندسي تطبيقي لبناء واجهة برمجية متكاملة بأسلوب RESTful في بيئة Node.js.',
  },
  content: `لما المستخدم يفتح تطبيق أو موقع ويدوس على زرار "تسجيل الدخول" أو "إضافة منتج للسلة"، إيه اللي بيحصل في الخفاء بين شاشة الموبايل أو المتصفح وبين قاعدة البيانات؟ 🌐

الجسر السحري اللي بينقل البيانات ويطبق شروط العمل والأمان اسمه **واجهة برمجة التطبيقات (API)**.

في هذا المقال التطبيقي، هنبني سوا أول **RESTful API** متكاملة باستخدام [Node.js](/articles/advanced-nodejs-engineering-event-loop-streams-workers) ومكتبة [Express](/articles/building-production-restful-apis-express-clean-architecture) خطوة بخطوة وبأبسط أسلوب ممكن!

---

## أولاً: يعني إيه REST API؟ (تشبيه جرسون المطعم)

تخيل إنك دخلت مطعم وقعدت على الترابيزة (أنت هنا **الـ Client أو الـ Frontend**)، وفيه مطبخ جوه بيطبخ الأكل (ده **الـ Server وقاعدة البيانات**).

أنت مينفعش تدخل المطبخ بنفسك تفتح الثلاجة وتاخد الأكل! أنت محتاج **جرسون (Waiter)**:
1. ياخد طلبك المكتوب في المنيو (Request).
2. يروح للمطبخ يديهم الورقة.
3. يستنى المطبخ يجهز الطلب، ويرجع لك بالطبق اللذيذ (Response).

**الـ API هي الجرسون ده بالظبط!** بتنقل الطلبات بين واجهة المستخدم وخوادم البيانات بطريقة آمنة ومنظمة.

---

## ثانياً: أفعال HTTP وأكواد الاستجابة (Status Codes)

تطبيقات الـ REST بتعتمد على المعايير العالمية لبروتوكول الويب:

| الفعل (HTTP Method) | الوظيفة | مثال على المسار (Endpoint) |
| :--- | :--- | :--- |
| **GET** | قراءة وعرض البيانات | \`GET /api/tasks\` (جلب كل المهام) |
| **POST** | إنشاء وحفظ عنصر جديد | \`POST /api/tasks\` (إضافة مهمة جديدة) |
| **PUT** | تعديل عنصر موجود بالكامل | \`PUT /api/tasks/:id\` (تحديث مهمة) |
| **DELETE** | حذف عنصر نهائياً | \`DELETE /api/tasks/:id\` (حذف مهمة) |

### أشهر أكواد الاستجابة:
* **200 OK:** كل حاجة تمام والبيانات راجعة بنجاح.
* **201 Created:** تم إنشاء العنصر بنجاح في النظام.
* **400 Bad Request:** العميل باعت بيانات ناقصة أو غير صحيحة.
* **404 Not Found:** العنصر المطلوب غير موجود.
* **500 Internal Server Error:** حصل خطأ غير متوقع في السيرفر.

---

## ثالثاً: تجهيز المشروع خطوة بخطوة

افتح التيرمينال ونفذ الأوامر التالية:

\`\`\`bash
# 1. إنشاء مجلد المشروع والدخول إليه
mkdir task-api
cd task-api

# 2. تهيئة ملف package.json
npm init -y

# 3. تثبيت Express
npm install express
\`\`\`

---

## رابعاً: كتابة كود الـ API كاملاً (\`server.js\`)

أنشئ ملفاً باسم \`server.js\` وضع فيه الكود التالي:

\`\`\`javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. وسيط تحويل الـ JSON في الـ Request Body
app.use(express.json());

// قاعدة بيانات مؤقتة في الذاكرة (In-Memory Array)
let tasks = [
  { id: 1, title: 'تعلم أساسيات HTML', completed: true },
  { id: 2, title: 'بناء أول REST API', completed: false }
];

// 2. GET: جلب جميع المهام
app.get('/api/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// 3. POST: إضافة مهمة جديدة
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;

  // التحقق من صحة المدخلات
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'حقل عنوان المهمة (title) مطلوب ولا يمكن تركه فارغاً.'
    });
  }

  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: 'تم إضافة المهمة بنجاح',
    data: newTask
  });
});

// 4. DELETE: حذف مهمة بواسطة الـ ID
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'لم يتم العثور على المهمة المطلوبة.'
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(200).json({
    success: true,
    message: \`تم حذف المهمة رقم \${taskId} بنجاح\`
  });
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(\`السيرفر شغال بنجاح على: http://localhost:\${PORT}\`);
});
\`\`\`

---

## خامساً: تجربة الـ API

شغّل السيرفر في التيرمينال:
\`\`\`bash
node server.js
\`\`\`

تقدر تفتح نافذة تيرمينال تانية وتجرب تضيف مهمة جديدة بأمر \`curl\`:
\`\`\`bash
curl -X POST http://localhost:3000/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"title": "متابعة مقالات خمسة برمجة بالبلدي"}'
\`\`\`

هتلاقي السيرفر رد عليك بـ \`201 Created\` ورجع لك الـ JSON متنسق!

---

## الخلاصة

بناء الـ RESTful APIs مهارة أساسية لأي مهندس برمجيات حقيقي. ابدأ بتطبيق الخطوات دي بإيدك، وبعدها ادمج قاعدة بيانات حقيقية زي [MongoDB](/articles/comprehensive-mongodb-guide-indexing-aggregation-performance) وحماية التوكنز عبر [JWT](/articles/authentication-authorization-jwt-sessions-oauth2-rbac)!`,
};
