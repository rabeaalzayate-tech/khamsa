import { StaticArticle, DEFAULT_AUTHOR } from '../types';

export const article21: StaticArticle = {
  id: 'static-art-react-hooks-21',
  slug: 'react-hooks-beginners-guide',
  title: 'دليل React Hooks للمبتدئين: شرح useState و useEffect بالأمثلة العملية',
  excerpt: 'عايز تفهم React Hooks من غير تعقيد؟ بنشرح لك بالبلدي يعني إيه useState و useEffect و useRef وإزاي تستخدمهم لبناء تطبيقات تفاعلية مع تجنب الأخطاء الشائعة.',
  description: 'تعلم React Hooks من الصفر مع خمسة برمجة بالبلدي. شرح مبسط لـ useState و useEffect و useRef مع أمثلة كود عملية وتطبيقات واقعية للمبتدئين.',
  category: 'React',
  tags: ['React', 'JavaScript', 'Frontend', 'React Hooks', 'تطوير الويب'],
  keywords: [
    'React Hooks بالعربي',
    'شرح useState',
    'شرح useEffect',
    'تعلم React من الصفر',
    'React للمبتدئين',
    'React Hooks tutorial',
    'برمجة بالبلدي',
  ],
  author: DEFAULT_AUTHOR,
  publishedAt: '2026-10-25T10:00:00.000Z',
  updatedAt: '2026-10-25T10:00:00.000Z',
  readTimeMinutes: 12,
  coverImage: '/images/articles/react-19-architecture.jpg',
  coverAlt: 'دليل React Hooks للمبتدئين - خمسة برمجة بالبلدي',
  isFeatured: true,
  tableOfContents: [
    { id: 'why-hooks', title: 'أولاً: ليه React عملت الـ Hooks أصلاً؟', level: 2 },
    { id: 'usestate-deep-dive', title: 'ثانياً: خطاف الحالة (useState) — إدارة البيانات المتغيرة', level: 2 },
    { id: 'useeffect-lifecycle', title: 'ثالثاً: خطاف التأثيرات الجانبية (useEffect) — التعامل مع العالم الخارجي', level: 2 },
    { id: 'useref-dom', title: 'رابعاً: خطاف المراجع (useRef) — الوصول للعناصر دون إعادة الرسم', level: 2 },
    { id: 'rules-of-hooks', title: 'خامساً: القواعد الذهبية لاستخدام الـ Hooks', level: 2 },
    { id: 'practical-mini-project', title: 'سادساً: تطبيق عملي متكامل — مؤقت تفاعلي مع جلب بيانات', level: 2 },
    { id: 'common-mistakes', title: 'سابعاً: أخطاء كارثية يقع فيها المبتدئون وكيفية تجنبها', level: 2 },
    { id: 'summary', title: 'الخلاصة وخارطة الطريق', level: 2 },
  ],
  faq: [
    {
      question: 'هل يمكن استخدام React Hooks داخل دوال عادية أو شروط if؟',
      answer: 'لا، تفرض React قاعدة صارمة تنص على استدعاء الـ Hooks فقط في أعلى مستوى (Top Level) من مكون React الوظيفي (Functional Component) أو داخل Custom Hook مخصص، ولا يجوز وضعها داخل حلقات تكرارية أو شروط if لضمان ثبات ترتيب التنفيذ عبر كل إعادة رسم.',
    },
    {
      question: 'ما الفرق بين useState و useRef؟',
      answer: 'تغيير قيمة useState يؤدي إلى إعادة رسم المكون (Re-render) فوراً لتحديث واجهة المستخدم، بينما تغيير قيمة useRef.current يحتفظ بالقيمة في الذاكرة عبر عمليات الرسم دون أن يتسبب في إعادة رسم المكون إطلاقاً.',
    },
    {
      question: 'متى يجب ترك مصفوفة التبعيات (Dependency Array) فارغة في useEffect؟',
      answer: 'نضع مصفوفة فارغة [] عندما نريد تنفيذ التأثير الجانبي مرة واحدة فقط عند تحميل المكون لأول مرة (Mounting)، مثل جلب بيانات أولية من الـ API أو الاشتراك في حدث خارجي.',
    },
  ],
  relatedSlugs: [
    'react-19-architecture-server-components-advanced-hooks',
    'modern-javascript-comprehensive-guide-es6-async',
    'comprehensive-typescript-guide-types-generics-patterns',
  ],
  seo: {
    title: 'دليل React Hooks للمبتدئين | شرح useState و useEffect بالأمثلة',
    description: 'شرح شامل ومبسط لخطافات React الأساسية (useState, useEffect, useRef) مع أمثلة كود حقيقية وتطبيق عملي من الصفر.',
    keywords: [
      'React Hooks',
      'useState',
      'useEffect',
      'React للمبتدئين',
      'تعلم ريأكت',
      'خمسة برمجة بالبلدي',
    ],
    canonicalUrl: 'https://www.khamsaprogramming.com/articles/react-hooks-beginners-guide',
    ogTitle: 'دليل React Hooks للمبتدئين: شرح useState و useEffect بالأمثلة العملية',
    ogDescription: 'دليل هندسي مبسط يشرح آلية عمل الـ Hooks في React من الصفر مع تطبيقات عملية وأخطاء شائعة.',
  },
  content: `لو بدأت تتعلم React بعد ما أتقنت أساسيات [JavaScript الحديثة](/articles/modern-javascript-comprehensive-guide-es6-async)، أول مصطلح هتسمعه ويكرر قدامك ليل نهار هو: **الـ Hooks**.

زمان قبل إصدار React 16.8، عشان تعمل مكون فيه بيانات متغيرة (State) أو يتعامل مع دورة الحياة (Lifecycle)، كنت مضطر تكتب Class Components طويلة ومليانة كود متكرر وكلمة \`this\` اللي كانت بتدوخ المطورين.

في المقال ده، هنفكك الـ Hooks دي بالبلدي ومن الصفر، ونفهم أشهر 3 خطافات بتستخدمهم في 90% من شغلك اليومي: **useState** و **useEffect** و **useRef**! 🚀

---

## أولاً: ليه React عملت الـ Hooks أصلاً؟

الـ Hook ببساطة هو **دالة جاهزة بتوفرها لك مكتبة React، بتسمح للمكون الوظيفي (Function Component) إنه "يتشبث" بمميزات المحرك الداخلي لـ React** زي إدارة الحالة ودورة الحياة.

### المزايا الأساسية:
1. **كتابة كود أنظف وأقصر:** توديع الـ Classes والربط المعقد (\`this.bind\`).
2. **إعادة استخدام المنطق (Reusability):** تقدر تجمع منطق مخصص في Custom Hook وتشاركه بين مكونات مختلفة.
3. **وضوح دورة حياة المكون:** جمع الأكواد المرتبطة ببعض في مكان واحد بدلاً من تشتيتها بين \`componentDidMount\` و \`componentWillUnmount\`.

---

## ثانياً: خطاف الحالة (useState) — إدارة البيانات المتغيرة

لو عندك عداد، أو حقل إدخال بيكتب فيه المستخدم، أو زرار بيفتح قائمة ويقفلها؛ دي بنسميها **حالة (State)** لأنها بيانات بتتغير أثناء تفاعل المستخدم مع الصفحة.

### الصيغة العامة:
\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  // تعريف متغير الحالة ودالة التحديث والقيمة الأولية
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded-xl space-y-3">
      <p className="text-lg font-bold">العدد الحالي: {count}</p>
      <div className="flex gap-2">
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          زيادة (+1)
        </button>
        <button 
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-secondary text-foreground rounded-lg"
        >
          إعادة تعيين
        </button>
      </div>
    </div>
  );
}
\`\`\`

### القاعدة الذهبية لـ useState:
إياك تعدل متغير الحالة مباشرة زي \`count = count + 1\`! لازم تستخدم دالة التحديث \`setCount\` لأنها هي المسؤولة عن إعلام React إن القيمة اتغيرت وبالتالي تقوم بإعادة رسم الشاشة (Re-render).

---

## ثالثاً: خطاف التأثيرات الجانبية (useEffect) — التعامل مع العالم الخارجي

يعني إيه **Side Effect**؟ هو أي حاجة المكون بيعملها بتأثر على حاجة بره عملية الحسابات البحتة لعرض الواجهة، زي:
* جلب بيانات من سيرفر (Fetch API).
* التعامل المباشر مع المتصفح (تغيير عنوان الصفحة \`document.title\`).
* تشغيل مؤقتات (\`setInterval\` أو \`setTimeout\`).
* الاشتراك في أحداث الـ DOM (Window Event Listeners).

### الحالات الثلاث لمصفوفة التبعيات (Dependency Array):

\`\`\`jsx
import { useEffect, useState } from 'react';

function ArticleLoader({ articleId }) {
  const [article, setArticle] = useState(null);

  // 1. يشتغل مرة واحدة فقط عند بداية تحميل المكون
  useEffect(() => {
    console.log('المكون ظهر على الشاشة لأول مرة!');
  }, []);

  // 2. يشتغل كل ما تتغير قيمة articleId
  useEffect(() => {
    async function loadData() {
      const res = await fetch(\`/api/articles/\${articleId}\`);
      const data = await res.json();
      setArticle(data);
    }
    loadData();
  }, [articleId]);

  // 3. تنظيف الاشتراكات (Cleanup Function)
  useEffect(() => {
    const handleResize = () => console.log(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // دالة التنظيف بتتنفذ قبل إعادة التشغيل أو عند اختفاء المكون
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div>{article ? article.title : 'جاري التحميل...'}</div>;
}
\`\`\`

---

## رابعاً: خطاف المراجع (useRef) — الوصول للعناصر دون إعادة الرسم

الـ \`useRef\` زي جيب سري في المكون، بيخزن أي قيمة تعجبك عبر عمليات الرسم (Renders) بدون ما يخلي المكون يعيد رسم نفسه لما القيمة تتغير.

### الاستخدامان الأشهر:
1. **الوصول المباشر لعنصر HTML في الـ DOM:** زي توجيه التركيز (Focus) لحقل إدخال.
2. **حفظ قيمة متغيرة لا تؤثر على الواجهة:** زي معرف مؤقت \`timerId\`.

\`\`\`jsx
import { useRef } from 'react';

function SearchInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    // الوصول المباشر لعنصر الـ input في الصفحة
    inputRef.current?.focus();
  };

  return (
    <div className="flex gap-2">
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="ابحث هنا..." 
        className="border p-2 rounded"
      />
      <button onClick={focusInput} className="bg-primary text-white px-3 py-1 rounded">
        ركز على الحقل
      </button>
    </div>
  );
}
\`\`\`

---

## خامساً: القواعد الذهبية لاستخدام الـ Hooks

وضعت شركة Meta قاعدتين صارمتين لاستخدام الـ Hooks، لو خالفتهم الـ App هيضرب Error غريب:

1. **استدعِ الـ Hooks في المستوى الأعلى فقط (Top Level):**
   * ممنوع تحط الـ Hook جوه \`if\` أو \`for\` أو دالة عادية متفرعة.
   * السبب: React بتعتمد على ترتيب استدعاء الـ Hooks لمعرفة أي حالة تتبع أي متغير.
2. **استدعِ الـ Hooks من مكونات React الوظيفية فقط:**
   * ما ينفعش تنادي \`useState\` جوه كلاس أو ملف جافاسكريبت عادي بدون ما يكون Custom Hook يبدأ بكلمة \`use\`.

---

## سادساً: أخطاء كارثية يقع فيها المبتدئون

* **حلقة لا نهائية (Infinite Loop) مع useEffect:**
  استدعاء دالة تحديث الحالة \`setCount\` جوه \`useEffect\` بدون تحديد مصفوفة تبعيات، مما يسبب إعادة رسم مستمرة وانهيار المتصفح.
* **نسيان تنظيف المؤقتات (Timers Cleanup):**
  تشغيل \`setInterval\` دون إرجاع دالة تنظيف \`clearInterval\`، مما يسبب تسريب ذاكرة (Memory Leak).
* **الاعتماد على حالة سابقة بشكل غير دقيق:**
  لما تحتاج تزود قيمة تعتمد على القيمة الحالية، استخدم صيغة الـ Callback:
  \`setCount(prev => prev + 1)\` بدلاً من \`setCount(count + 1)\`.

---

## الخلاصة

الـ Hooks ليست سحراً غامضاً؛ هي مجرد أدوات تمنح دوال الجافاسكريبت القدرة على التحكم الكامل في واجهة المستخدم بأسلوب إعلاني منظم (Declarative). ابدأ بإتقان **useState** و **useEffect** أولاً، وستجد نفسك قادراً على بناء 90% من أفكارك البرمجية بسهولة واحترافية!`,
};
