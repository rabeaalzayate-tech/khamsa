'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Target,
  Trophy,
  RotateCcw,
  Sparkles,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  Code2,
  Cpu,
  Flame,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export type GameDifficulty = 'easy' | 'medium' | 'hard' | 'custom';

interface DifficultyConfig {
  label: string;
  min: number;
  max: number;
  maxAttempts: number;
  description: string;
}

const DIFFICULTY_CONFIGS: Record<Exclude<GameDifficulty, 'custom'>, DifficultyConfig> = {
  easy: {
    label: 'سهل (1 - 50)',
    min: 1,
    max: 50,
    maxAttempts: 10,
    description: 'نطاق مصغر ومحاولات وفيرة للمبتدئين',
  },
  medium: {
    label: 'متوسط (1 - 100)',
    min: 1,
    max: 100,
    maxAttempts: 7,
    description: 'الحد النظري لخوارزمية البحث الثنائي (7 محاولات لـ 100 احتمال)',
  },
  hard: {
    label: 'خبير (1 - 500)',
    min: 1,
    max: 500,
    maxAttempts: 9,
    description: 'تحدي تحليلي يتطلب استراتيجية ثنائية صارمة',
  },
};

interface GuessRecord {
  guess: number;
  feedback: 'too_high' | 'too_low' | 'correct';
  remainingRange: [number, number];
  diff: number;
  timestamp: number;
}

export function NumberGuessingGame() {
  const [difficulty, setDifficulty] = useState<GameDifficulty>('medium');
  const [customMin, setCustomMin] = useState<number>(1);
  const [customMax, setCustomMax] = useState<number>(200);
  const [customAttempts, setCustomAttempts] = useState<number>(8);

  const activeRange = useMemo(() => {
    if (difficulty === 'custom') {
      const min = Math.max(1, Math.min(customMin, customMax - 1));
      const max = Math.max(min + 1, customMax);
      return { min, max, maxAttempts: Math.max(3, customAttempts) };
    }
    return DIFFICULTY_CONFIGS[difficulty];
  }, [difficulty, customMin, customMax, customAttempts]);

  // حالة اللعب
  const [secretNumber, setSecretNumber] = useState<number>(() => {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  });
  const [currentGuessInput, setCurrentGuessInput] = useState<string>('');
  const [guesses, setGuesses] = useState<GuessRecord[]>([]);
  const [currentLow, setCurrentLow] = useState<number>(1);
  const [currentHigh, setCurrentHigh] = useState<number>(100);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [highScore, setHighScore] = useState<number>(0);
  const [showInspector, setShowInspector] = useState<boolean>(false);
  const [showBinaryHint, setShowBinaryHint] = useState<boolean>(false);

  // استرجاع أعلى نتيجة
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('js_docs_guessing_highscore');
      if (saved) {
        setHighScore(parseInt(saved, 10) || 0);
      }
    }
  }, []);

  // بدء جولة جديدة
  const startNewGame = useCallback(
    (newDiff?: GameDifficulty) => {
      const targetDiff = newDiff || difficulty;
      let min = 1;
      let max = 100;

      if (targetDiff === 'custom') {
        min = Math.max(1, Math.min(customMin, customMax - 1));
        max = Math.max(min + 1, customMax);
      } else {
        const conf = DIFFICULTY_CONFIGS[targetDiff];
        min = conf.min;
        max = conf.max;
      }

      // خوارزمية التوليد العشوائي
      const generated = Math.floor(Math.random() * (max - min + 1)) + min;
      setSecretNumber(generated);
      setCurrentLow(min);
      setCurrentHigh(max);
      setGuesses([]);
      setGameStatus('playing');
      setCurrentGuessInput('');
      setShowBinaryHint(false);
    },
    [difficulty, customMin, customMax]
  );

  // تحديث النطاق عند تغيير الصعوبة
  const handleDifficultyChange = (newDiff: GameDifficulty) => {
    setDifficulty(newDiff);
    startNewGame(newDiff);
  };

  // الاقتراح الأمثل بالبحث الثنائي
  const optimalBinaryGuess = useMemo(() => {
    return Math.floor((currentLow + currentHigh) / 2);
  }, [currentLow, currentHigh]);

  // إرسال التخمين
  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameStatus !== 'playing') return;

    const num = parseInt(currentGuessInput, 10);
    if (isNaN(num) || num < activeRange.min || num > activeRange.max) {
      return;
    }

    let feedback: 'too_high' | 'too_low' | 'correct';
    let nextLow = currentLow;
    let nextHigh = currentHigh;

    if (num === secretNumber) {
      feedback = 'correct';
    } else if (num > secretNumber) {
      feedback = 'too_high';
      nextHigh = Math.min(nextHigh, num - 1);
    } else {
      feedback = 'too_low';
      nextLow = Math.max(nextLow, num + 1);
    }

    const newRecord: GuessRecord = {
      guess: num,
      feedback,
      remainingRange: [nextLow, nextHigh],
      diff: Math.abs(num - secretNumber),
      timestamp: Date.now(),
    };

    const nextGuesses = [...guesses, newRecord];
    setGuesses(nextGuesses);
    setCurrentLow(nextLow);
    setCurrentHigh(nextHigh);
    setCurrentGuessInput('');

    if (feedback === 'correct') {
      setGameStatus('won');
      // حساب النقاط
      const attemptsUsed = nextGuesses.length;
      const attemptsLeft = activeRange.maxAttempts - attemptsUsed;
      const rangeBreadth = activeRange.max - activeRange.min;
      const scoreEarned = Math.round((attemptsLeft + 1) * (rangeBreadth / 2) * 10);

      if (scoreEarned > highScore) {
        setHighScore(scoreEarned);
        if (typeof window !== 'undefined') {
          localStorage.setItem('js_docs_guessing_highscore', scoreEarned.toString());
        }
      }
    } else if (nextGuesses.length >= activeRange.maxAttempts) {
      setGameStatus('lost');
    }
  };

  const attemptsRemaining = activeRange.maxAttempts - guesses.length;

  return (
    <div className="space-y-8 select-none" dir="rtl">
      {/* رأس اللعبة والمؤشرات */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* مؤشر المحاولات */}
        <div className="p-4 rounded-2xl border border-border bg-card/60 backdrop-blur flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-foreground-muted font-medium">المحاولات المتبقية</span>
            <div className="text-2xl font-black text-foreground">
              {attemptsRemaining}{' '}
              <span className="text-xs font-normal text-foreground-secondary">
                / {activeRange.maxAttempts}
              </span>
            </div>
          </div>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
              attemptsRemaining <= 2
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30 animate-pulse'
                : attemptsRemaining <= 4
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {attemptsRemaining}
          </div>
        </div>

        {/* النطاق الفعلي المتبقي */}
        <div className="p-4 rounded-2xl border border-border bg-card/60 backdrop-blur flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-foreground-muted font-medium">النطاق المنطقي المتبقي</span>
            <div className="text-2xl font-black text-cyan-400 font-mono">
              [{currentLow} - {currentHigh}]
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
        </div>

        {/* أعلى نتيجة */}
        <div className="p-4 rounded-2xl border border-border bg-card/60 backdrop-blur flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-foreground-muted font-medium">أعلى رصيد نقاط</span>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {highScore.toLocaleString()}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* شريط اختيار مستوى الصعوبة */}
      <div className="p-4 rounded-2xl border border-border bg-card/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-foreground">مستوى التحدي:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(['easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => handleDifficultyChange(diff)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                difficulty === diff
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-muted/50 text-foreground-secondary hover:bg-muted hover:text-foreground'
              }`}
            >
              {DIFFICULTY_CONFIGS[diff].label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleDifficultyChange('custom')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              difficulty === 'custom'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-muted/50 text-foreground-secondary hover:bg-muted hover:text-foreground'
            }`}
          >
            مخصص (Custom)
          </button>
        </div>
      </div>

      {/* لوحة اللعبة التفاعلية */}
      <div className="p-6 sm:p-8 rounded-3xl border border-border bg-gradient-to-b from-card to-card/70 shadow-xl space-y-6">
        {/* الحالة عند الفوز أو الخسارة */}
        {gameStatus === 'won' && (
          <div className="p-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-center space-y-3">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-emerald-400">تخمين عبقري! أحسنت!</h3>
            <p className="text-sm text-foreground-secondary max-w-md mx-auto">
              الرقم السري هو <strong className="text-foreground font-mono">{secretNumber}</strong>.
              تمكنت من الوصول إليه خلال {guesses.length} محاولات بنجاح.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => startNewGame()}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>لعب جولة جديدة</span>
              </button>
            </div>
          </div>
        )}

        {gameStatus === 'lost' && (
          <div className="p-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 text-center space-y-3">
            <div className="inline-flex p-3 rounded-full bg-rose-500/20 text-rose-400">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-rose-400">انتهت المحاولات المتاحة!</h3>
            <p className="text-sm text-foreground-secondary max-w-md mx-auto">
              الرقم السري الحقيقي كان:{' '}
              <strong className="text-foreground font-mono text-lg">{secretNumber}</strong>. حاول
              تطبيق استراتيجية البحث الثنائي في الجولة القادمة.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => startNewGame()}
                className="px-6 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-sm hover:bg-rose-400 transition-all shadow-lg shadow-rose-500/25 inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة المحاولة</span>
              </button>
            </div>
          </div>
        )}

        {/* نموذج الإدخال أثناء اللعب */}
        {gameStatus === 'playing' && (
          <form onSubmit={handleGuessSubmit} className="space-y-4">
            <div className="text-center space-y-1">
              <label
                htmlFor="guess-input"
                className="text-sm font-semibold text-foreground-secondary"
              >
                أدخل تخمينك للرقم السري (بين {activeRange.min} و {activeRange.max}):
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                id="guess-input"
                type="number"
                min={activeRange.min}
                max={activeRange.max}
                value={currentGuessInput}
                onChange={(e) => setCurrentGuessInput(e.target.value)}
                placeholder={`${currentLow} - ${currentHigh}`}
                autoFocus
                className="w-full sm:w-48 text-center text-2xl font-mono font-bold px-4 py-3 rounded-2xl border border-border bg-muted/40 text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <button
                type="submit"
                disabled={!currentGuessInput.trim()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-500/20 inline-flex items-center justify-center gap-2"
              >
                <span>تأكيد التخمين</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

            {/* زر المساعد الذكي بالبحث الثنائي */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowBinaryHint((prev) => !prev)}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showBinaryHint ? 'إخفاء اقتراح البحث الثنائي' : 'استشر خوارزمية Binary Search'}</span>
              </button>

              <span className="text-border">|</span>

              <button
                type="button"
                onClick={() => startNewGame()}
                className="text-xs text-foreground-muted hover:text-foreground font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط الجولة</span>
              </button>
            </div>

            {showBinaryHint && (
              <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 text-xs leading-relaxed max-w-md mx-auto space-y-1 text-right">
                <div className="font-bold flex items-center gap-1.5 text-cyan-400">
                  <Cpu className="w-4 h-4" />
                  <span>التخمين الرياضي الأمثل: {optimalBinaryGuess}</span>
                </div>
                <p>
                  معادلة المنتصف الثنائي: <code>Math.floor(({currentLow} + {currentHigh}) / 2) = {optimalBinaryGuess}</code>.
                  هذا الرقم يضمن تقليص فضاء البحث إلى النصف بغض النظر عن النتيجة!
                </p>
                <button
                  type="button"
                  onClick={() => setCurrentGuessInput(optimalBinaryGuess.toString())}
                  className="mt-2 px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 font-bold text-[11px] border border-cyan-500/40"
                >
                  استخدام {optimalBinaryGuess} في حقل الإدخال
                </button>
              </div>
            )}
          </form>
        )}

        {/* سجل التخمينات السابقة */}
        {guesses.length > 0 && (
          <div className="pt-4 border-t border-border space-y-3">
            <h4 className="text-xs font-bold text-foreground-muted">سجل المحاولات السابقة في هذه الجولة:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {guesses.map((rec, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                    rec.feedback === 'correct'
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                      : rec.feedback === 'too_high'
                      ? 'border-amber-500/30 bg-amber-500/5 text-amber-300'
                      : 'border-cyan-500/30 bg-cyan-500/5 text-cyan-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-muted/60 flex items-center justify-center font-mono font-bold text-[10px] text-foreground-muted">
                      {idx + 1}
                    </span>
                    <span className="font-bold font-mono text-sm">{rec.guess}</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-medium text-[11px]">
                    {rec.feedback === 'correct' && (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>مطابق تماماً</span>
                      </>
                    )}
                    {rec.feedback === 'too_high' && (
                      <>
                        <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
                        <span>أعلى من السري (Too High)</span>
                      </>
                    )}
                    {rec.feedback === 'too_low' && (
                      <>
                        <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                        <span>أقل من السري (Too Low)</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* زر كاشف الكود البرمجي التعليمي */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setShowInspector((prev) => !prev)}
          className="px-4 py-2 rounded-xl border border-border bg-card/60 hover:bg-card text-foreground-secondary hover:text-foreground text-xs font-bold inline-flex items-center gap-2 transition-all"
        >
          <Code2 className="w-4 h-4 text-amber-400" />
          <span>{showInspector ? 'إخفاء فحص الكود البرمجي للعبة' : 'فحص كود خوارزميات اللعبة (Math & State Code)'}</span>
        </button>
      </div>

      {showInspector && (
        <div className="rounded-2xl border border-border bg-slate-950 p-5 space-y-4 text-xs font-mono text-slate-300 leading-relaxed text-left" dir="ltr">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-amber-400 font-bold">JavaScript Under the Hood</span>
            <span className="text-[11px] text-slate-500">Core Math & State Logic</span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-slate-400 text-[11px] mb-1 font-sans">// 1. توليد الرقم العشوائي في النطاق المحدد [min, max]</p>
              <pre className="text-emerald-400 bg-slate-900 p-2.5 rounded-lg overflow-x-auto">
{`function generateSecretNumber(min, max) {
  // Math.random() ينتج رقماً عشوائياً بين [0, 1)
  // ضربه في سعة النطاق + 1 يضمن تغطية الحد الأقصى
  return Math.floor(Math.random() * (max - min + 1)) + min;
}`}
              </pre>
            </div>

            <div>
              <p className="text-slate-400 text-[11px] mb-1 font-sans">// 2. خوارزمية التخمين الأمثل (Binary Search)</p>
              <pre className="text-cyan-400 bg-slate-900 p-2.5 rounded-lg overflow-x-auto">
{`function calculateOptimalGuess(low, high) {
  // يقلص فضاء الاحتمالات إلى النصف في كل خطوة
  return Math.floor((low + high) / 2);
}`}
              </pre>
            </div>

            <div>
              <p className="text-slate-400 text-[11px] mb-1 font-sans">// 3. حساب النقاط بناءً على المحاولات والسرعة وسعة النطاق</p>
              <pre className="text-amber-300 bg-slate-900 p-2.5 rounded-lg overflow-x-auto">
{`function calculateScore(attemptsLeft, rangeBreadth) {
  return Math.round((attemptsLeft + 1) * (rangeBreadth / 2) * 10);
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
