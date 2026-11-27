'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Calculator,
  Coins,
  History,
  RotateCcw,
  Delete,
  ArrowRightLeft,
  Info,
  Check,
  Sparkles,
} from 'lucide-react';
import { CalculatorEngine, type AngleMode } from '@/lib/calculator/CalculatorEngine';
import {
  CurrencyConverter,
  DOCUMENTED_CURRENCY_RATES,
  type ConversionResult,
} from '@/lib/calculator/CurrencyConverter';

export function ScientificCalculator() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'currency'>('calculator');

  // حالة الآلة الحاسبة
  const [expression, setExpression] = useState<string>('0');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [angleMode, setAngleMode] = useState<AngleMode>('deg');
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<Array<{ expr: string; res: number }>>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // حالة محول العملات
  const [currencyAmount, setCurrencyAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('SAR');
  const [feePercent, setFeePercent] = useState<number>(0);
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);

  const engineRef = useRef<CalculatorEngine>(new CalculatorEngine('deg'));

  // تحديث وضع الزوايا
  const toggleAngleMode = () => {
    const nextMode: AngleMode = angleMode === 'deg' ? 'rad' : 'deg';
    setAngleMode(nextMode);
    engineRef.current.setAngleMode(nextMode);
  };

  // إدخال الأزرار
  const handleButtonClick = (val: string) => {
    setError(null);

    if (val === 'C') {
      setExpression('0');
      setResult(null);
      setError(null);
      return;
    }

    if (val === 'backspace') {
      if (expression.length <= 1) {
        setExpression('0');
      } else {
        setExpression(prev => prev.slice(0, -1));
      }
      return;
    }

    if (val === '=') {
      executeCalculation();
      return;
    }

    // إدخال دوال علمية
    if (['sin(', 'cos(', 'tan(', 'sqrt(', 'log(', 'ln(', 'abs('].includes(val)) {
      setExpression(prev => (prev === '0' ? val : prev + val));
      return;
    }

    setExpression(prev => {
      if (prev === '0' && !['.', '+', '-', '*', '/', '%', '^'].includes(val)) {
        return val;
      }
      return prev + val;
    });
  };

  // تنفيذ الحساب
  const executeCalculation = () => {
    try {
      const evalRes = engineRef.current.evaluate(expression);
      if (evalRes.success && evalRes.result !== undefined) {
        setResult(String(evalRes.result));
        setError(null);
        setHistory(prev => [{ expr: expression, res: evalRes.result! }, ...prev.slice(0, 9)]);
      } else {
        setError(evalRes.error || 'صيغة غير صالحة');
        setResult(null);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'خطأ أثناء الحساب');
      setResult(null);
    }
  };

  // الذاكرة
  const handleMemory = (action: 'MC' | 'MR' | 'M+' | 'M-') => {
    const currentVal = result !== null ? Number(result) : Number(expression);
    if (!Number.isFinite(currentVal) && action !== 'MC' && action !== 'MR') return;

    switch (action) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setExpression(prev => (prev === '0' ? String(memory) : prev + String(memory)));
        break;
      case 'M+':
        setMemory(prev => prev + currentVal);
        break;
      case 'M-':
        setMemory(prev => prev - currentVal);
        break;
    }
  };

  // معالجة لوحة المفاتيح
  useEffect(() => {
    if (activeTab !== 'calculator') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '%', '^', '(', ')'].includes(e.key)) {
        e.preventDefault();
        handleButtonClick(e.key);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeCalculation();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleButtonClick('backspace');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleButtonClick('C');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, expression]);

  // تحديث تحويل العملات تلقائياً
  useEffect(() => {
    const amt = Number(currencyAmount);
    if (Number.isFinite(amt) && amt >= 0) {
      try {
        const res = CurrencyConverter.convert(amt, fromCurrency, toCurrency, feePercent);
        setConversionResult(res);
      } catch {
        setConversionResult(null);
      }
    } else {
      setConversionResult(null);
    }
  }, [currencyAmount, fromCurrency, toCurrency, feePercent]);

  // عكس عملتي التحويل
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
      {/* رأس الآلة واختيار الوضع */}
      <div className="border-b border-border bg-background/50 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-foreground">
              محرك الحسابات العلمية وتحويل العملات
            </h2>
            <p className="text-xs text-foreground-muted font-mono" dir="ltr">
              Interactive Scientific & Currency Calculator Engine
            </p>
          </div>
        </div>

        {/* أزرار التبديل بين الحاسبة والعملات */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl border border-border bg-background">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'calculator'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-foreground-secondary hover:text-foreground'
            }`}
          >
            <Calculator className="h-4 w-4" />
            حاسبة علمية
          </button>
          <button
            onClick={() => setActiveTab('currency')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'currency'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-foreground-secondary hover:text-foreground'
            }`}
          >
            <Coins className="h-4 w-4" />
            تحويل العملات
          </button>
        </div>
      </div>

      {/* المحتوى التفاعلي */}
      {activeTab === 'calculator' ? (
        <div className="p-4 sm:p-6 space-y-4">
          {/* شاشة العرض الرقمية */}
          <div className="rounded-2xl border border-border bg-background p-4 sm:p-6 space-y-2 relative">
            <div className="flex items-center justify-between text-xs text-foreground-muted font-mono">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAngleMode}
                  className="px-2 py-0.5 rounded-md border border-border bg-card text-foreground font-bold hover:border-amber-500 transition-colors"
                >
                  {angleMode.toUpperCase()}
                </button>
                {memory !== 0 && (
                  <span className="px-2 py-0.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold">
                    M = {memory}
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowHistory(prev => !prev)}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                title="سجل الحسابات"
              >
                <History className="h-4 w-4" />
                <span>السجل ({history.length})</span>
              </button>
            </div>

            {/* سطر التعبير الحسابي */}
            <div
              className="text-right text-sm sm:text-base font-mono text-foreground-secondary min-h-6 overflow-x-auto whitespace-nowrap"
              dir="ltr"
            >
              {expression}
            </div>

            {/* سطر الناتج الحسابي أو الخطأ */}
            <div className="text-right text-2xl sm:text-4xl font-mono font-black text-foreground min-h-10 flex items-center justify-end" dir="ltr">
              {error ? (
                <span className="text-rose-400 text-base sm:text-lg font-sans">{error}</span>
              ) : result !== null ? (
                <span className="text-amber-400">= {result}</span>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
          </div>

          {/* سجل الحسابات المنسدل */}
          {showHistory && (
            <div className="rounded-2xl border border-border bg-background/80 p-4 space-y-2 max-h-48 overflow-y-auto">
              <div className="flex items-center justify-between text-xs font-bold text-foreground-muted">
                <span>العمليات الأخيرة</span>
                <button
                  onClick={() => setHistory([])}
                  className="text-rose-400 hover:underline"
                >
                  مسح السجل
                </button>
              </div>
              {history.length === 0 ? (
                <p className="text-xs text-foreground-muted text-center py-2">لا توجد عمليات سابقة</p>
              ) : (
                history.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setExpression(item.expr);
                      setResult(String(item.res));
                    }}
                    className="flex items-center justify-between text-xs font-mono p-2 rounded-xl bg-card border border-border hover:border-amber-500/50 cursor-pointer transition-colors"
                    dir="ltr"
                  >
                    <span className="text-foreground-secondary">{item.expr}</span>
                    <span className="font-bold text-amber-400">= {item.res}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* لوحة المفاتيح العلمية والأرقام */}
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 text-xs sm:text-sm font-mono">
            {/* صف الذاكرة والدوال السريعة */}
            <button onClick={() => handleMemory('MC')} className="calc-btn-util">MC</button>
            <button onClick={() => handleMemory('MR')} className="calc-btn-util">MR</button>
            <button onClick={() => handleMemory('M+')} className="calc-btn-util">M+</button>
            <button onClick={() => handleMemory('M-')} className="calc-btn-util">M-</button>
            <button onClick={() => handleButtonClick('C')} className="calc-btn-danger">C</button>
            <button onClick={() => handleButtonClick('backspace')} className="calc-btn-danger flex items-center justify-center">
              <Delete className="h-4 w-4" />
            </button>

            {/* صف الدوال العلمية 1 */}
            <button onClick={() => handleButtonClick('sin(')} className="calc-btn-fn">sin</button>
            <button onClick={() => handleButtonClick('cos(')} className="calc-btn-fn">cos</button>
            <button onClick={() => handleButtonClick('tan(')} className="calc-btn-fn">tan</button>
            <button onClick={() => handleButtonClick('pi')} className="calc-btn-fn">π</button>
            <button onClick={() => handleButtonClick('e')} className="calc-btn-fn">e</button>
            <button onClick={() => handleButtonClick('^')} className="calc-btn-op">x^y</button>

            {/* صف الدوال العلمية 2 والأقواس */}
            <button onClick={() => handleButtonClick('sqrt(')} className="calc-btn-fn">√x</button>
            <button onClick={() => handleButtonClick('log(')} className="calc-btn-fn">log</button>
            <button onClick={() => handleButtonClick('ln(')} className="calc-btn-fn">ln</button>
            <button onClick={() => handleButtonClick('!')} className="calc-btn-fn">n!</button>
            <button onClick={() => handleButtonClick('(')} className="calc-btn-op">(</button>
            <button onClick={() => handleButtonClick(')')} className="calc-btn-op">)</button>

            {/* صف الأرقام والعمليات 1 */}
            <button onClick={() => handleButtonClick('7')} className="calc-btn-num">7</button>
            <button onClick={() => handleButtonClick('8')} className="calc-btn-num">8</button>
            <button onClick={() => handleButtonClick('9')} className="calc-btn-num">9</button>
            <button onClick={() => handleButtonClick('/')} className="calc-btn-op">÷</button>
            <button onClick={() => handleButtonClick('%')} className="calc-btn-op">%</button>
            <button onClick={() => handleButtonClick('abs(')} className="calc-btn-fn">|x|</button>

            {/* صف الأرقام والعمليات 2 */}
            <button onClick={() => handleButtonClick('4')} className="calc-btn-num">4</button>
            <button onClick={() => handleButtonClick('5')} className="calc-btn-num">5</button>
            <button onClick={() => handleButtonClick('6')} className="calc-btn-num">6</button>
            <button onClick={() => handleButtonClick('*')} className="calc-btn-op">×</button>
            <button onClick={() => handleButtonClick('-')} className="calc-btn-op">-</button>
            <button onClick={() => handleButtonClick('00')} className="calc-btn-num">00</button>

            {/* صف الأرقام والعمليات 3 والمساواة */}
            <button onClick={() => handleButtonClick('1')} className="calc-btn-num">1</button>
            <button onClick={() => handleButtonClick('2')} className="calc-btn-num">2</button>
            <button onClick={() => handleButtonClick('3')} className="calc-btn-num">3</button>
            <button onClick={() => handleButtonClick('+')} className="calc-btn-op">+</button>
            <button onClick={() => handleButtonClick('0')} className="calc-btn-num">0</button>
            <button onClick={() => handleButtonClick('.')} className="calc-btn-num">.</button>

            {/* زر المساواة يمتد بعرض مناسب */}
            <button
              onClick={() => handleButtonClick('=')}
              className="col-span-5 sm:col-span-6 calc-btn-primary"
            >
              = حساب النتيجة (Enter)
            </button>
          </div>
        </div>
      ) : (
        /* واجهة محول العملات */
        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
            {/* المبلغ وعملة المصدر */}
            <div className="md:col-span-3 space-y-2">
              <label className="text-xs font-bold text-foreground-muted">المبلغ المراد تحويله</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={currencyAmount}
                  onChange={e => setCurrencyAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground font-mono text-base font-bold focus:outline-none focus:border-cyan-500"
                  placeholder="0.00"
                  dir="ltr"
                />
                <select
                  value={fromCurrency}
                  onChange={e => setFromCurrency(e.target.value)}
                  className="px-3 py-3 rounded-2xl border border-border bg-card text-foreground font-bold text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
                >
                  {DOCUMENTED_CURRENCY_RATES.map(c => (
                    <option key={c.code} value={c.code}>
                      {c.code} - {c.nameAr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* زر العكس */}
            <div className="md:col-span-1 flex justify-center pt-4 md:pt-6">
              <button
                onClick={handleSwapCurrencies}
                className="h-12 w-12 rounded-2xl border border-border bg-card hover:bg-cyan-500/10 hover:border-cyan-500 text-cyan-400 flex items-center justify-center transition-all shadow-sm"
                title="تبديل العملتين"
              >
                <ArrowRightLeft className="h-5 w-5" />
              </button>
            </div>

            {/* عملة الهدف */}
            <div className="md:col-span-3 space-y-2">
              <label className="text-xs font-bold text-foreground-muted">عملة الهدف المستلمة</label>
              <select
                value={toCurrency}
                onChange={e => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-border bg-card text-foreground font-bold text-sm focus:outline-none focus:border-cyan-500"
              >
                {DOCUMENTED_CURRENCY_RATES.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.nameAr} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* خيار رسوم التحويل */}
          <div className="p-4 rounded-2xl border border-border bg-background/50 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-foreground">رسوم التحويل المصرفية التقديرية (Fee %)</span>
              <p className="text-[11px] text-foreground-muted">حساب الرسوم المقتطعة كنسبة مئوية</p>
            </div>
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3].map(fee => (
                <button
                  key={fee}
                  onClick={() => setFeePercent(fee)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    feePercent === fee
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                      : 'border-border bg-card text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {fee}%
                </button>
              ))}
            </div>
          </div>

          {/* بطاقة نتيجة التحويل التفصيلية */}
          {conversionResult && (
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6 space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-cyan-500/20 pb-4">
                <span className="text-xs text-foreground-muted">المبلغ المحول النهائي</span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  1 {fromCurrency} = {conversionResult.effectiveRate} {toCurrency}
                </span>
              </div>

              <div className="text-2xl sm:text-4xl font-mono font-black text-cyan-400 text-right" dir="ltr">
                {conversionResult.formattedNet}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl border border-border bg-card space-y-1">
                  <span className="text-foreground-muted block">المبلغ الأصلي</span>
                  <span className="font-bold text-foreground">{conversionResult.formattedFrom}</span>
                </div>
                <div className="p-2.5 rounded-xl border border-border bg-card space-y-1">
                  <span className="text-foreground-muted block">الإجمالي قبل الرسوم</span>
                  <span className="font-bold text-foreground">{conversionResult.formattedTo}</span>
                </div>
                <div className="p-2.5 rounded-xl border border-border bg-card space-y-1">
                  <span className="text-foreground-muted block">الرسوم ({feePercent}%)</span>
                  <span className="font-bold text-rose-400">{conversionResult.formattedFee}</span>
                </div>
                <div className="p-2.5 rounded-xl border border-border bg-card space-y-1">
                  <span className="text-foreground-muted block">السعر المعكوس</span>
                  <span className="font-bold text-foreground">1 {toCurrency} = {conversionResult.inverseRate} {fromCurrency}</span>
                </div>
              </div>
            </div>
          )}

          {/* التنبيه القانوني والشفافية المالية */}
          <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed">
            <Info className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-amber-400 mb-0.5">تنبيه الشفافية والبيانات المرجعية:</strong>
              أسعار الصرف المستخدمة في هذا المحرك هي بيانات استرشادية ومرجعية موثقة مخصصة للأغراض التعليمية وتطبيقات التدريب البرمجي في دورة JavaScript Complete Documentation، وليست أسعارًا بنكية فورية حية للتداولات المالية الفعلية.
            </div>
          </div>
        </div>
      )}

      {/* تذييل المشروع والمفاهيم المطبقة */}
      <div className="border-t border-border bg-background/50 p-4 text-xs text-foreground-muted flex flex-wrap items-center justify-between gap-3 font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>مبني بخوارزمية Shunting-Yard و Number.EPSILON و Intl.NumberFormat</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md bg-card border border-border">TypeScript</span>
          <span className="px-2 py-0.5 rounded-md bg-card border border-border">Phase 03 Capstone</span>
        </div>
      </div>
    </div>
  );
}
