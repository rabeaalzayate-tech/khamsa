'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Timer,
  Trophy,
  RotateCcw,
  Sparkles,
  Code2,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  ChevronLeft,
} from 'lucide-react';

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concept: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'ما هي نتيجة المقارنة: typeof null في JavaScript، ولماذا؟',
    codeSnippet: 'console.log(typeof null);',
    options: ['"null"', '"undefined"', '"object"', '"boolean"'],
    correctAnswer: 2,
    explanation:
      'تُعيد "object" بسبب خطأ تاريخي قديم في الإصدار الأول من JavaScript؛ حيث كانت أول 3 بتات من مؤشر الكائن في الذاكرة تحمل القيمة 000، وكان المؤشر الفارغ null يُمثل بـ 0x00 أيضاً.',
    concept: 'Data Types & Memory Representation',
  },
  {
    id: 2,
    question: 'ما هو الناتج المطبوع من تنفيذ الكود التالي مع Temporal Dead Zone؟',
    codeSnippet: `var x = 10;
function test() {
  console.log(x);
  let x = 20;
}
test();`,
    options: ['10', '20', 'undefined', 'ReferenceError'],
    correctAnswer: 3,
    explanation:
      'يحدث ReferenceError لأن إعلان let x داخل الدالة يتم رفعه إلى بداية النطاق، مما يحجب المتغير الخارجي x=10 ويضع المتغير المحلي في المنطقة الميتة زمنياً (TDZ) حتى سطر تهيئته.',
    concept: 'Hoisting & Temporal Dead Zone (TDZ)',
  },
  {
    id: 3,
    question: 'ما هي قيمة this المطبوعة في الدالة السهمية التالية؟',
    codeSnippet: `const obj = {
  num: 42,
  getNum: () => this.num
};
console.log(obj.getNum());`,
    options: ['42', 'undefined', 'TypeError', 'Window'],
    correctAnswer: 1,
    explanation:
      'الدوال السهمية لا تمتلك ربطاً خاصاً بها لـ this، بل ترث this معجمياً من النطاق المحيط بها وقت التعريف (هنا النطاق العام Global/Window)، وحيث إن window.num غير معرف تكون النتيجة undefined.',
    concept: 'this Keyword & Arrow Functions',
  },
  {
    id: 4,
    question: 'ما هو الناتج المطبوع من استدعاء دالة التفكيك التالية؟',
    codeSnippet: `const { a = 1, b = 2 } = { a: null, b: undefined };
console.log(a, b);`,
    options: ['1 2', 'null 2', '1 undefined', 'null undefined'],
    correctAnswer: 1,
    explanation:
      'القيم الافتراضية في Destructuring تنشط فقط عندما تكون القيمة المستخرجة undefined تماماً. أما قيمة null فتعتبر قيمة معرفة صريحة، ولذلك يحتفظ a بـ null بينما يأخذ b القيمة الافتراضية 2.',
    concept: 'Destructuring Default Values',
  },
  {
    id: 5,
    question: 'ما هو سبب عدم دقة العملية الحسابية 0.1 + 0.2 في JavaScript؟',
    codeSnippet: 'console.log(0.1 + 0.2 === 0.3); // false',
    options: [
      'خطأ برمجي في محرك V8',
      'تمثيل الفاصلة العائمة بمعيار IEEE 754 الثنائي (64-bit float)',
      'التحويل التلقائي للأنواع (Type Coercion)',
      'تجاوز الحد الأقصى للأرقام الآمنة MAX_SAFE_INTEGER',
    ],
    correctAnswer: 1,
    explanation:
      'الأعداد العشرية 0.1 و 0.2 تُمثل كسوراً ثنائية دورية لا نهائية في النظام الثنائي (Base-2)، مما يؤدي إلى تقريبها في ذاكرة 53 بت إلى 0.30000000000000004.',
    concept: 'IEEE 754 Floating Point Math',
  },
  {
    id: 6,
    question: 'ما هو الفرق الجوهري الذي يميز WeakMap عن Map العادي؟',
    codeSnippet: 'const wm = new WeakMap();',
    options: [
      'WeakMap أبطأ في استرجاع البيانات',
      'مفاتيح WeakMap تقبل فقط نصوصاً (Strings)',
      'مفاتيح WeakMap مراجع ضعيفة تسمح لـ Garbage Collector بتحرير الكائنات',
      'WeakMap تسمح بمعرفة عدد عناصرها عبر خاصية size',
    ],
    correctAnswer: 2,
    explanation:
      'تحتفظ WeakMap بمراجع ضعيفة لمفاتيحها (التي يجب أن تكون كائنات فقط)، مما يسمح لجامع المهملات Garbage Collector بتحرير الكائن من الذاكرة إذا لم يتبق أي مرجع قوي آخر يشير إليه.',
    concept: 'WeakMap & Garbage Collection',
  },
  {
    id: 7,
    question: 'ما هو ناتج تنفيذ دالة reduce التالية على المصفوفة؟',
    codeSnippet: `const nums = [1, 2, 3];
const result = nums.reduce((acc, cur) => acc + cur, 10);
console.log(result);`,
    options: ['6', '16', 'undefined', '10123'],
    correctAnswer: 1,
    explanation:
      'تبدأ دالة reduce بالقيمة الابتدائية المحددة كمعامل ثانٍ (10)، ثم تجمع عناصر المصفوفة تباعاً: 10 + 1 + 2 + 3 = 16.',
    concept: 'Array.prototype.reduce',
  },
  {
    id: 8,
    question: 'ما هو الكائن الذي يرث منه مباشرة أي كائن يتم إنشاؤه عبر {}؟',
    codeSnippet: 'const x = {};',
    options: ['null', 'Object.prototype', 'Function.prototype', 'Array.prototype'],
    correctAnswer: 1,
    explanation:
      'الكائنات المنشأة بواسطة Object Literal ترث مباشرة من Object.prototype، والذي يعتبر قمة شجرة الوراثة ونموذجه الأولي [[Prototype]] يساوي null.',
    concept: 'Prototypes & Inheritance',
  },
  {
    id: 9,
    question: 'ماذا يحدث عند محاولة تعديل خاصية كائن تم تجميده باستخدام Object.freeze في النمط الصارم؟',
    codeSnippet: `'use strict';
const config = Object.freeze({ port: 3000 });
config.port = 8080;`,
    options: [
      'يتم تعديل القيمة بنجاح',
      'يتم تجاهل التعديل بصمت دون أي تنبيه',
      'يتم إطلاق استثناء TypeError صريح',
      'يتم حذف الخاصية من الكائن',
    ],
    correctAnswer: 2,
    explanation:
      'يجعل Object.freeze جميع واصفات الخصائص غير قابلة للكتابة (writable: false). في النمط الصارم Strict Mode، محاولة تعديل خاصية غير قابلة للكتابة تطلق استثناء TypeError فوراً.',
    concept: 'Object Integrity & Immutability',
  },
  {
    id: 10,
    question: 'ما هو الترتيب الصحيح لأولويات تنفيذ المهام في حلقة الأحداث (Event Loop)؟',
    codeSnippet: `Promise.resolve().then(() => console.log('Microtask'));
setTimeout(() => console.log('Macrotask'), 0);
console.log('Sync');`,
    options: [
      'Sync ثم Macrotask ثم Microtask',
      'Sync ثم Microtask ثم Macrotask',
      'Microtask ثم Sync ثم Macrotask',
      'Macrotask ثم Microtask ثم Sync',
    ],
    correctAnswer: 1,
    explanation:
      'ينفذ المحرك أولاً الكود المتزامن في Call Stack بالكامل، ثم يستنفد طابور Microtask Queue (مثل Promise Callbacks)، ثم ينتقل إلى طابور Macrotask Queue (مثل setTimeout).',
    concept: 'Event Loop & Concurrency Model',
  },
];

export function QuizApp() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);
  const [showInspector, setShowInspector] = useState<boolean>(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  // إدارة المؤقت الزمني التنازلي
  useEffect(() => {
    if (isQuizFinished || isAnswerSubmitted) return;

    if (timeLeft <= 0) {
      // نفاد الوقت: تأكيد تلقائي بدون إجابة
      setIsAnswerSubmitted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isQuizFinished, isAnswerSubmitted]);

  // اختيار إجابة
  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: index,
    }));
  };

  // تأكيد الإجابة
  const handleSubmitAnswer = () => {
    setIsAnswerSubmitted(true);
  };

  // الانتقال للسؤال التالي
  const handleNextQuestion = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswerSubmitted(false);
      setTimeLeft(30);
    } else {
      setIsQuizFinished(true);
    }
  };

  // إعادة ضبط الاختبار بالكامل
  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setTimeLeft(30);
    setIsQuizFinished(false);
  };

  // حساب النتيجة النهائية
  const finalScore = useMemo(() => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: QUIZ_QUESTIONS.length,
      percentage: Math.round((correct / QUIZ_QUESTIONS.length) * 100),
    };
  }, [selectedAnswers]);

  return (
    <div className="space-y-8 select-none" dir="rtl">
      {/* رأس الاختبار والمؤشرات */}
      {!isQuizFinished && (
        <div className="p-4 sm:p-6 rounded-3xl border border-border bg-card/60 backdrop-blur flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold font-mono">
              {currentIndex + 1}
            </div>
            <div>
              <span className="text-xs text-foreground-muted">السؤال الحالي</span>
              <div className="text-sm font-bold text-foreground">
                السؤال {currentIndex + 1} من {QUIZ_QUESTIONS.length}
              </div>
            </div>
          </div>

          {/* شريط التقدم */}
          <div className="w-full sm:w-48 bg-muted/50 rounded-full h-2 overflow-hidden border border-border">
            <div
              className="bg-amber-500 h-full transition-all duration-300 rounded-full"
              style={{
                width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>

          {/* المؤقت التنازلي */}
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-xl border font-mono font-bold text-xs flex items-center gap-1.5 ${
                timeLeft <= 5
                  ? 'border-rose-500/40 bg-rose-500/15 text-rose-400 animate-pulse'
                  : 'border-border bg-muted/40 text-foreground'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>00:{String(timeLeft).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      )}

      {/* واجهة النتيجة النهائية */}
      {isQuizFinished ? (
        <div className="p-8 sm:p-12 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-card to-card/70 shadow-2xl text-center space-y-6">
          <div className="inline-flex p-4 rounded-3xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Trophy className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-foreground">
              اكتمل الاختبار الهندسي بنجاح!
            </h3>
            <p className="text-sm text-foreground-secondary max-w-md mx-auto">
              لقد اجتزت الأسئلة المفاهيمية والمعمارية لمسار JavaScript المتقدم.
            </p>
          </div>

          {/* إحصائيات النتيجة */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto pt-2">
            <div className="p-4 rounded-2xl border border-border bg-muted/20">
              <span className="text-xs text-foreground-muted">الإجابات الصحيحة</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {finalScore.correct} / {finalScore.total}
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-border bg-muted/20">
              <span className="text-xs text-foreground-muted">النسبة المئوية</span>
              <div className="text-2xl font-black text-cyan-400 font-mono">
                {finalScore.percentage}%
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-border bg-muted/20">
              <span className="text-xs text-foreground-muted">التقييم الفني</span>
              <div className="text-sm font-bold text-amber-400 pt-1">
                {finalScore.percentage >= 80
                  ? 'خبير معماري (Senior)'
                  : finalScore.percentage >= 60
                  ? 'مطور متمرس (Mid-Level)'
                  : 'يحتاج لمراجعة الدروس'}
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة خوض الاختبار</span>
            </button>
          </div>
        </div>
      ) : (
        /* بطاقة السؤال النشط */
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-xl space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>المفهوم: {currentQuestion.concept}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-foreground leading-relaxed">
              {currentQuestion.question}
            </h3>

            {currentQuestion.codeSnippet && (
              <pre
                className="p-4 rounded-2xl bg-slate-950 text-cyan-300 font-mono text-xs overflow-x-auto border border-border/60 text-left"
                dir="ltr"
              >
                {currentQuestion.codeSnippet}
              </pre>
            )}
          </div>

          {/* الخيارات الأربعة */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentIndex] === idx;
              const isCorrect = currentQuestion.correctAnswer === idx;

              let optionClasses =
                'border-border bg-muted/30 text-foreground hover:bg-muted/60';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  optionClasses =
                    'border-emerald-500/60 bg-emerald-500/15 text-emerald-300';
                } else if (isSelected) {
                  optionClasses =
                    'border-rose-500/60 bg-rose-500/15 text-rose-300';
                } else {
                  optionClasses = 'border-border/40 bg-muted/10 opacity-50 text-foreground-muted';
                }
              } else if (isSelected) {
                optionClasses =
                  'border-amber-500 bg-amber-500/10 text-amber-300 shadow-sm';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-2xl border text-right transition-all flex items-center justify-between gap-3 text-sm font-medium ${optionClasses}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-muted/60 flex items-center justify-center font-mono font-bold text-xs text-foreground-secondary shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* التفسير المعماري بعد الإرسال */}
          {isAnswerSubmitted && (
            <div className="p-4 sm:p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 text-cyan-200 text-xs leading-relaxed space-y-1.5 animate-fadeIn">
              <div className="font-bold flex items-center gap-2 text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
                <span>التفسير الهندسي:</span>
              </div>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}

          {/* أزرار التحكم السفلية */}
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <span className="text-xs text-foreground-muted">
              {isAnswerSubmitted
                ? selectedAnswers[currentIndex] === currentQuestion.correctAnswer
                  ? 'إجابة دقيقة وصحيحة'
                  : 'إجابة غير موفقة'
                : 'حدد خياراً ثم اضغط تأكيد'}
            </span>

            <div>
              {!isAnswerSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswers[currentIndex] === undefined}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 inline-flex items-center gap-2"
                >
                  <span>تأكيد الإجابة</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 inline-flex items-center gap-2"
                >
                  <span>
                    {currentIndex < QUIZ_QUESTIONS.length - 1
                      ? 'السؤال التالي'
                      : 'عرض النتيجة النهائية'}
                  </span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* زر كاشف الكود البرمجي */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setShowInspector((prev) => !prev)}
          className="px-4 py-2 rounded-xl border border-border bg-card/60 hover:bg-card text-foreground-secondary hover:text-foreground text-xs font-bold inline-flex items-center gap-2 transition-all"
        >
          <Code2 className="w-4 h-4 text-amber-400" />
          <span>
            {showInspector
              ? 'إخفاء فحص كود المؤقت وإدارة حالة الأسئلة'
              : 'فحص كود محرك الاختبارات (Timer & State Machine)'}
          </span>
        </button>
      </div>

      {showInspector && (
        <div
          className="rounded-2xl border border-border bg-slate-950 p-5 space-y-4 text-xs font-mono text-slate-300 leading-relaxed text-left"
          dir="ltr"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-amber-400 font-bold">JavaScript Quiz Engine Under the Hood</span>
            <span className="text-[11px] text-slate-500">Timer & Array Scoring</span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-slate-400 text-[11px] mb-1 font-sans">
                // 1. إدارة دورة حياة المؤقت التنازلي وتنظيف الموارد
              </p>
              <pre className="text-emerald-400 bg-slate-900 p-2.5 rounded-lg overflow-x-auto">
{`useEffect(() => {
  if (isAnswerSubmitted || isQuizFinished) return;
  const timer = setInterval(() => {
    setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
  }, 1000);
  return () => clearInterval(timer); // تفادي تسرب الذاكرة Memory Leak
}, [timeLeft, isAnswerSubmitted, isQuizFinished]);`}
              </pre>
            </div>

            <div>
              <p className="text-slate-400 text-[11px] mb-1 font-sans">
                // 2. خوارزمية حساب النتيجة النهائية بدالة reduce
              </p>
              <pre className="text-cyan-400 bg-slate-900 p-2.5 rounded-lg overflow-x-auto">
{`const score = questions.reduce((acc, q, idx) => {
  return selectedAnswers[idx] === q.correctAnswer ? acc + 1 : acc;
}, 0);`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
