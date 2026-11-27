/**
 * محرك تحويل العملات وحسابات الصرف (Currency Conversion Engine)
 * مبني بلغة TypeScript وفق أفضل الممارسات الهندسية لإدارة الأرقام المالية (Integer Scaling & Number.EPSILON)
 */

export interface CurrencyMetadata {
  code: string;
  nameAr: string;
  nameEn: string;
  symbol: string;
  rateAgainstUSD: number; // السعر المرجعي مقابل الدولار الأمريكي (Base: USD = 1.0)
  decimalDigits: number;
}

/**
 * قاعدة بيانات أسعار الصرف الاسترشادية المرجعية الموثقة
 * تنبيه قانوني وشفافية البيانات: هذه الأسعار استرشادية ومرجعية موثقة لأغراض التعلم والتطبيق البرمجي
 * وليست بيانات مصرفية فورية حية للتداولات المالية الحقيقية.
 */
export const DOCUMENTED_CURRENCY_RATES: readonly CurrencyMetadata[] = [
  {
    code: 'USD',
    nameAr: 'الدولار الأمريكي',
    nameEn: 'US Dollar',
    symbol: '$',
    rateAgainstUSD: 1.0,
    decimalDigits: 2,
  },
  {
    code: 'EUR',
    nameAr: 'اليورو الأوروبي',
    nameEn: 'Euro',
    symbol: '€',
    rateAgainstUSD: 0.95,
    decimalDigits: 2,
  },
  {
    code: 'SAR',
    nameAr: 'الريال السعودي',
    nameEn: 'Saudi Riyal',
    symbol: 'ر.س',
    rateAgainstUSD: 3.75,
    decimalDigits: 2,
  },
  {
    code: 'AED',
    nameAr: 'الدرهم الإماراتي',
    nameEn: 'UAE Dirham',
    symbol: 'د.إ',
    rateAgainstUSD: 3.6725,
    decimalDigits: 2,
  },
  {
    code: 'EGP',
    nameAr: 'الجنيه المصري',
    nameEn: 'Egyptian Pound',
    symbol: 'ج.م',
    rateAgainstUSD: 49.50,
    decimalDigits: 2,
  },
  {
    code: 'KWD',
    nameAr: 'الدينار الكويتي',
    nameEn: 'Kuwaiti Dinar',
    symbol: 'د.ك',
    rateAgainstUSD: 0.308,
    decimalDigits: 3,
  },
  {
    code: 'GBP',
    nameAr: 'الجنيه الإسترليني',
    nameEn: 'British Pound',
    symbol: '£',
    rateAgainstUSD: 0.79,
    decimalDigits: 2,
  },
  {
    code: 'JPY',
    nameAr: 'الين الياباني',
    nameEn: 'Japanese Yen',
    symbol: '¥',
    rateAgainstUSD: 154.50,
    decimalDigits: 0,
  },
] as const;

export interface ConversionResult {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  effectiveRate: number;
  inverseRate: number;
  feeAmount: number;
  feePercent: number;
  netAmount: number;
  formattedFrom: string;
  formattedTo: string;
  formattedFee: string;
  formattedNet: string;
  disclaimer: string;
}

export class CurrencyConverter {
  private static ratesMap = new Map<string, CurrencyMetadata>(
    DOCUMENTED_CURRENCY_RATES.map(c => [c.code, c])
  );

  public static getSupportedCurrencies(): readonly CurrencyMetadata[] {
    return DOCUMENTED_CURRENCY_RATES;
  }

  public static getCurrency(code: string): CurrencyMetadata | undefined {
    return this.ratesMap.get(code.toUpperCase());
  }

  /**
   * تنسيق العملة المالي الآمن وفق معيار Intl.NumberFormat
   */
  public static format(amount: number, currencyCode: string): string {
    const curr = this.getCurrency(currencyCode);
    const digits = curr ? curr.decimalDigits : 2;

    try {
      return new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }).format(amount);
    } catch {
      return `${amount.toFixed(digits)} ${currencyCode}`;
    }
  }

  /**
   * تحويل العملات بدقة عالية وتطبيق رسوم التحويل
   * @param amount المبلغ المراد تحويله
   * @param fromCode كود عملة المصدر
   * @param toCode كود عملة الهدف
   * @param feePercent نسبة رسوم التحويل (مثلاً 0 أو 1.5%)
   */
  public static convert(
    amount: number,
    fromCode: string,
    toCode: string,
    feePercent: number = 0
  ): ConversionResult {
    const fromCurr = this.getCurrency(fromCode);
    const toCurr = this.getCurrency(toCode);

    if (!fromCurr) throw new Error(`عملة المصدر غير مدعومة: ${fromCode}`);
    if (!toCurr) throw new Error(`عملة الهدف غير مدعومة: ${toCode}`);
    if (amount < 0 || !Number.isFinite(amount)) throw new Error("المبلغ يجب أن يكون رقماً موجباً صالحاً");

    // 1. تحويل المبلغ إلى الدولار الأمريكي كعملة ارتكاز (Base Currency: USD)
    const amountInUSD = amount / fromCurr.rateAgainstUSD;

    // 2. تحويل المبلغ من الدولار الأمريكي إلى عملة الهدف
    const rawToAmount = amountInUSD * toCurr.rateAgainstUSD;

    // 3. حساب سعر الصرف الفعلي والمعكوس
    const effectiveRate = toCurr.rateAgainstUSD / fromCurr.rateAgainstUSD;
    const inverseRate = 1 / effectiveRate;

    // 4. حساب الرسوم وصافي المبلغ
    const safeFeePercent = Math.min(Math.max(feePercent, 0), 100);
    const feeAmount = (rawToAmount * safeFeePercent) / 100;
    const netAmount = rawToAmount - feeAmount;

    // 5. تقريب النتائج الدقيق لمنع أخطاء الفاصلة العائمة
    const toDigits = toCurr.decimalDigits;
    const cleanToAmount = Math.round((rawToAmount + Number.EPSILON) * 10 ** toDigits) / 10 ** toDigits;
    const cleanFee = Math.round((feeAmount + Number.EPSILON) * 10 ** toDigits) / 10 ** toDigits;
    const cleanNet = Math.round((netAmount + Number.EPSILON) * 10 ** toDigits) / 10 ** toDigits;

    return {
      fromAmount: amount,
      fromCurrency: fromCurr.code,
      toAmount: cleanToAmount,
      toCurrency: toCurr.code,
      effectiveRate: Math.round((effectiveRate + Number.EPSILON) * 1e4) / 1e4,
      inverseRate: Math.round((inverseRate + Number.EPSILON) * 1e4) / 1e4,
      feeAmount: cleanFee,
      feePercent: safeFeePercent,
      netAmount: cleanNet,
      formattedFrom: this.format(amount, fromCurr.code),
      formattedTo: this.format(cleanToAmount, toCurr.code),
      formattedFee: this.format(cleanFee, toCurr.code),
      formattedNet: this.format(cleanNet, toCurr.code),
      disclaimer: "أسعار استرشادية ومرجعية موثقة للأغراض التعليمية وليست بيانات مصرفية حية للتداول المالي الفعلي."
    };
  }
}
