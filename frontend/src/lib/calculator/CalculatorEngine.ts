/**
 * محرك الآلة الحاسبة العلمية (Scientific Calculator Engine)
 * مبني بلغة TypeScript وفق معايير مواصفة ECMAScript
 * يطبق خوارزمية Shunting-Yard لإعراب وتقييم التعبيرات الحسابية مع احترام أسبقية المعاملات والترابط
 */

export type AngleMode = 'deg' | 'rad';

interface OperatorSpec {
  precedence: number;
  associativity: 'left' | 'right';
  argCount: number;
}

const OPERATORS: Record<string, OperatorSpec> = {
  '+': { precedence: 1, associativity: 'left', argCount: 2 },
  '-': { precedence: 1, associativity: 'left', argCount: 2 },
  '*': { precedence: 2, associativity: 'left', argCount: 2 },
  '/': { precedence: 2, associativity: 'left', argCount: 2 },
  '%': { precedence: 2, associativity: 'left', argCount: 2 },
  '^': { precedence: 3, associativity: 'right', argCount: 2 }, // Exponentiation
};

const SCIENTIFIC_FUNCTIONS = new Set([
  'sin', 'cos', 'tan',
  'asin', 'acos', 'atan',
  'sqrt', 'cbrt', 'abs',
  'log', 'ln', 'exp',
  'fact'
]);

export interface EvaluationResult {
  success: boolean;
  result?: number;
  error?: string;
  expression: string;
}

export class CalculatorEngine {
  private angleMode: AngleMode = 'deg';
  private memoryValue: number = 0;

  constructor(angleMode: AngleMode = 'deg') {
    this.angleMode = angleMode;
  }

  public setAngleMode(mode: AngleMode): void {
    this.angleMode = mode;
  }

  public getAngleMode(): AngleMode {
    return this.angleMode;
  }

  // دوال الذاكرة الحسابية
  public memoryClear(): void {
    this.memoryValue = 0;
  }

  public memoryRecall(): number {
    return this.memoryValue;
  }

  public memoryAdd(val: number): void {
    this.memoryValue += val;
  }

  public memorySubtract(val: number): void {
    this.memoryValue -= val;
  }

  /**
   * تقريب الناتج لمعالجة أخطاء الفاصلة العائمة IEEE 754
   */
  public static cleanPrecision(value: number): number {
    if (!Number.isFinite(value)) return value;
    // تنظيف الكسور العشرية الدقيقة
    return Math.round((value + Number.EPSILON) * 1e12) / 1e12;
  }

  /**
   * حساب المضروب (Factorial: n!)
   */
  public static factorial(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
      throw new Error("المضروب الرياضي متاح فقط للأعداد الصحيحة غير السالبة");
    }
    if (n > 170) {
      return Infinity; // تجاوز حدود 64-بت
    }
    let res = 1;
    for (let i = 2; i <= n; i++) {
      res *= i;
    }
    return res;
  }

  /**
   * تحليل التعبير الرياضي إلى وحدات لغوية (Tokenization)
   */
  private tokenize(expr: string): string[] {
    const sanitized = expr.replace(/\s+/g, '').replace(/π/g, 'pi').replace(/×/g, '*').replace(/÷/g, '/');
    const tokens: string[] = [];
    let i = 0;

    while (i < sanitized.length) {
      const char = sanitized[i];

      // أرقام مع كسور عشرية
      if (/[0-9.]/.test(char)) {
        let numStr = '';
        let hasDot = false;
        while (i < sanitized.length && /[0-9.]/.test(sanitized[i])) {
          if (sanitized[i] === '.') {
            if (hasDot) throw new Error("تعبير رقمي تالف: نقطتان عشريتان في نفس الرقم");
            hasDot = true;
          }
          numStr += sanitized[i];
          i++;
        }
        tokens.push(numStr);
        continue;
      }

      // أسماء الدوال والثوابت (sin, cos, pi, e, إلخ)
      if (/[a-zA-Z]/.test(char)) {
        let ident = '';
        while (i < sanitized.length && /[a-zA-Z]/.test(sanitized[i])) {
          ident += sanitized[i].toLowerCase();
          i++;
        }
        if (ident === 'pi') {
          tokens.push(String(Math.PI));
        } else if (ident === 'e') {
          tokens.push(String(Math.E));
        } else if (SCIENTIFIC_FUNCTIONS.has(ident)) {
          tokens.push(ident);
        } else {
          throw new Error(`دالة أو رمز رياضي غير معروف: ${ident}`);
        }
        continue;
      }

      // المعامل الأحادي السالب في البداية أو بعد قوس فتح أو بعد معامل
      if (char === '-') {
        const prev = tokens[tokens.length - 1];
        if (tokens.length === 0 || prev === '(' || OPERATORS[prev] !== undefined) {
          tokens.push('0'); // تحويل -x إلى 0 - x للإعراب المعياري
          tokens.push('-');
          i++;
          continue;
        }
      }

      // المعاملات الحسابية والأقواس
      if (OPERATORS[char] !== undefined || char === '(' || char === ')') {
        tokens.push(char);
        i++;
        continue;
      }

      // علامة التعجب للمضروب !
      if (char === '!') {
        tokens.push('fact');
        i++;
        continue;
      }

      throw new Error(`رمز غير صالح في التعبير: ${char}`);
    }

    return tokens;
  }

  /**
   * تحويل التدوين من Infix إلى Postfix (RPN) باستخدام خوارزمية Shunting-Yard
   */
  private shuntingYard(tokens: string[]): string[] {
    const outputQueue: string[] = [];
    const operatorStack: string[] = [];

    for (const token of tokens) {
      const num = Number(token);

      if (!Number.isNaN(num)) {
        outputQueue.push(token);
      } else if (SCIENTIFIC_FUNCTIONS.has(token)) {
        operatorStack.push(token);
      } else if (OPERATORS[token] !== undefined) {
        const o1 = token;
        const o1Spec = OPERATORS[o1];

        while (operatorStack.length > 0) {
          const top = operatorStack[operatorStack.length - 1];

          if (SCIENTIFIC_FUNCTIONS.has(top)) {
            outputQueue.push(operatorStack.pop()!);
            continue;
          }

          if (OPERATORS[top] !== undefined) {
            const topSpec = OPERATORS[top];
            const hasHigherPrecedence = topSpec.precedence > o1Spec.precedence;
            const hasEqualAndLeft = topSpec.precedence === o1Spec.precedence && o1Spec.associativity === 'left';

            if (hasHigherPrecedence || hasEqualAndLeft) {
              outputQueue.push(operatorStack.pop()!);
              continue;
            }
          }
          break;
        }
        operatorStack.push(o1);
      } else if (token === '(') {
        operatorStack.push(token);
      } else if (token === ')') {
        let matched = false;
        while (operatorStack.length > 0) {
          const top = operatorStack.pop()!;
          if (top === '(') {
            matched = true;
            break;
          }
          outputQueue.push(top);
        }
        if (!matched) {
          throw new Error("أقواس غير متطابقة في التعبير الحسابي");
        }
        // إذا كان هناك دالة قبل القوس، نسحبها للمخرجات
        if (operatorStack.length > 0 && SCIENTIFIC_FUNCTIONS.has(operatorStack[operatorStack.length - 1])) {
          outputQueue.push(operatorStack.pop()!);
        }
      }
    }

    while (operatorStack.length > 0) {
      const top = operatorStack.pop()!;
      if (top === '(' || top === ')') {
        throw new Error("أقواس غير متطابقة في التعبير الحسابي");
      }
      outputQueue.push(top);
    }

    return outputQueue;
  }

  /**
   * تقييم تدوين الـ RPN الناتج
   */
  private evaluateRPN(rpn: string[]): number {
    const stack: number[] = [];

    for (const token of rpn) {
      const num = Number(token);

      if (!Number.isNaN(num)) {
        stack.push(num);
        continue;
      }

      // دالة علمية أحادية
      if (SCIENTIFIC_FUNCTIONS.has(token)) {
        if (stack.length < 1) throw new Error(`وسائط غير كافية للدالة: ${token}`);
        const arg = stack.pop()!;
        stack.push(this.applyFunction(token, arg));
        continue;
      }

      // معامل ثنائي
      if (OPERATORS[token] !== undefined) {
        if (stack.length < 2) throw new Error(`معاملات غير كافية للمعامل: ${token}`);
        const b = stack.pop()!;
        const a = stack.pop()!;
        stack.push(this.applyOperator(token, a, b));
        continue;
      }

      throw new Error(`رمز غير قابل للتقييم: ${token}`);
    }

    if (stack.length !== 1) {
      throw new Error("تعبير غير مكتمل أو صياغة حسابية غير صالحة");
    }

    return CalculatorEngine.cleanPrecision(stack[0]);
  }

  private applyOperator(op: string, a: number, b: number): number {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/':
        if (b === 0) throw new Error("لا يمكن القسمة على الصفر");
        return a / b;
      case '%':
        if (b === 0) throw new Error("لا يمكن حساب باقي القسمة على الصفر");
        return a % b;
      case '^': return a ** b;
      default: throw new Error(`معامل غير معروف: ${op}`);
    }
  }

  private applyFunction(fn: string, arg: number): number {
    // تحويل الزوايا إذا كان الوضع درجات
    const toRad = (angle: number) => this.angleMode === 'deg' ? (angle * Math.PI) / 180 : angle;
    const fromRad = (rad: number) => this.angleMode === 'deg' ? (rad * 180) / Math.PI : rad;

    switch (fn) {
      case 'sin': return Math.sin(toRad(arg));
      case 'cos': return Math.cos(toRad(arg));
      case 'tan': {
        const rad = toRad(arg);
        if (Math.abs(Math.cos(rad)) < 1e-12) throw new Error("ظل الزاوية غير معرف عند هذه القيمة");
        return Math.tan(rad);
      }
      case 'asin': {
        if (arg < -1 || arg > 1) throw new Error("قيمة قوس الجيب يجب أن تكون بين -1 و 1");
        return fromRad(Math.asin(arg));
      }
      case 'acos': {
        if (arg < -1 || arg > 1) throw new Error("قيمة قوس جيب التمام يجب أن تكون بين -1 و 1");
        return fromRad(Math.acos(arg));
      }
      case 'atan': return fromRad(Math.atan(arg));
      case 'sqrt':
        if (arg < 0) throw new Error("لا يمكن حساب الجذر التربيعي لعدد سالب في الأعداد الحقيقية");
        return Math.sqrt(arg);
      case 'cbrt': return Math.cbrt(arg);
      case 'abs': return Math.abs(arg);
      case 'log':
        if (arg <= 0) throw new Error("اللوغاريتم العشري معرف فقط للأعداد الموجبة قطعا");
        return Math.log10(arg);
      case 'ln':
        if (arg <= 0) throw new Error("اللوغاريتم الطبيعي معرف فقط للأعداد الموجبة قطعا");
        return Math.log(arg);
      case 'exp': return Math.exp(arg);
      case 'fact': return CalculatorEngine.factorial(arg);
      default: throw new Error(`دالة غير معروفة: ${fn}`);
    }
  }

  /**
   * تقييم التعبير الحسابي بالكامل مع التقاط الأخطاء
   */
  public evaluate(expression: string): EvaluationResult {
    try {
      if (!expression || expression.trim() === '') {
        return { success: true, result: 0, expression: '' };
      }
      const tokens = this.tokenize(expression);
      const rpn = this.shuntingYard(tokens);
      const res = this.evaluateRPN(rpn);
      return { success: true, result: res, expression };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "خطأ غير متوقع أثناء الحساب";
      return { success: false, error: msg, expression };
    }
  }
}
