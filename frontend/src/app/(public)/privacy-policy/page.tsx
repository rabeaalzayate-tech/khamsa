import React from 'react';
import { Metadata } from 'next';
import { Shield, Lock, Eye, Cookie, FileText, CheckCircle2, Globe2 } from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'سياسة الخصوصية',
  description:
    'سياسة الخصوصية لمنصة خمسة برمجة بالبلدي: كيف نقوم بجمع، واستخدام، وحماية بياناتك الشخصية، وإعلانات Google AdSense وملفات تعريف الارتباط.',
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
  openGraph: {
    title: 'سياسة الخصوصية | خمسة برمجة بالبلدي',
    description:
      'سياسة الخصوصية لمنصة خمسة برمجة بالبلدي: الالتزام بحماية بياناتك الشخصية، وسياسات ملفات تعريف الارتباط وإعلانات Google AdSense.',
    url: `${siteUrl}/privacy-policy`,
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 sm:py-10">
      <ArticleBreadcrumb items={[{ label: 'سياسة الخصوصية' }]} />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
          <Shield className="h-3.5 w-3.5" />
          <span>الأمان والخصوصية</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          سياسة الخصوصية
        </h1>
        <p className="text-xs text-foreground-muted font-mono">
          آخر تحديث: 2 نوفمبر 2026
        </p>
      </header>

      <div className="space-y-8 text-sm sm:text-base text-foreground-secondary leading-relaxed font-normal bg-card p-6 sm:p-10 rounded-3xl border border-border shadow-card">
        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <span>1. مقدمة والتزامنا بالخصوصية</span>
          </h2>
          <p>
            أهلاً بك في منصة <strong>«خمسة برمجة بالبلدي»</strong> (Khamsa Programming). نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية وفقاً لأعلى المعايير القانونية والتقنية. توضح هذه الوثيقة ماهية البيانات التي قد يتم جمعها أثناء تصفحك للموقع، وكيفية استخدامها، والخيارات المتاحة لك للتحكم بها، مع الالتزام التام بإرشادات الناشرين المعتمدة من Google.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <span>2. البيانات التي نقوم بجمعها</span>
          </h2>
          <ul className="space-y-2 list-disc list-inside pe-2">
            <li>
              <strong>بيانات التصفح التقنية غير المحددة للهوية:</strong> مثل عنوان الـ IP المجهول (Anonymized IP)، نوع المتصفح، نظام التشغيل، والصفحات التي تمت زيارتها عبر أدوات التحليل لتحسين سرعة وأداء واستقرار المنصة.
            </li>
            <li>
              <strong>بيانات التواصل الطوعية:</strong> الاسم والبريد الإلكتروني ومحتوى الرسالة عندما تقوم بمراسلتنا عبر نموذج التواصل أو الاشتراك في النشرة البريدية، ولا نشارك هذه البيانات مع أي جهة خارجية دون إذنك.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary" />
            <span>3. ملفات تعريف الارتباط وإعلانات Google AdSense</span>
          </h2>
          <p>
            قد يستخدم موقعنا وشركاؤنا من الأطراف الثالثة (مثل Google AdSense و Google Analytics) ملفات تعريف الارتباط (Cookies) لتقديم خدمات مخصصة وتحليل سلوك الزوار لتقديم محتوى تعليمي مفيد:
          </p>
          <div className="space-y-3 text-xs sm:text-sm bg-secondary/50 p-5 rounded-2xl border border-border">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>تستخدم Google كطرف ثالث موثوق ملفات تعريف الارتباط (مثل DoubleClick / DART) لعرض الإعلانات على موقعنا.</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                يتيح استخدام ملف تعريف الارتباط DART لشركة Google وشركائها عرض الإعلانات للمستخدمين بناءً على زياراتهم لمنصتنا ومواقع أخرى على شبكة الإنترنت.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                يمكن للمستخدمين إلغاء الاشتراك في الإعلانات المخصصة في أي وقت عبر الانتقال مباشرة إلى{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:underline"
                >
                  صفحة إعدادات إعلانات Google (Google Ads Settings)
                </a>
                ، أو زيارة موقع{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:underline"
                >
                  AboutAds.info Choices
                </a>
                .
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                للمزيد من التفاصيل حول كيفية تعامل Google مع البيانات، يمكنك قراءة{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:underline"
                >
                  كيفية استخدام Google للمعلومات من المواقع والتطبيقات التي تستخدم خدماتها
                </a>
                .
              </span>
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-primary" />
            <span>4. حقوق الخصوصية للمستخدمين (GDPR & CCPA)</span>
          </h2>
          <p>
            سواء كنت تتصفح موقعنا من مصر والمنطقة العربية، أو الاتحاد الأوروبي، أو أي دولة أخرى، نضمن لك الحق الكامل في:
          </p>
          <ul className="space-y-1.5 list-disc list-inside pe-2 text-xs sm:text-sm">
            <li>معرفة البيانات الشخصية التي يتم الاحتفاظ بها عنك وكيفية معالجتها.</li>
            <li>طلب تصحيح أو حذف أي بيانات شخصية تواصلت بها معنا عبر المنصة فوراً.</li>
            <li>إدارة موافقتك على ملفات تعريف الارتباط من خلال لافتة ملفات الارتباط (Cookie Consent).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>5. التواصل المباشر ومسؤول حماية البيانات</span>
          </h2>
          <p>
            لأي استفسار بخصوص سياسة الخصوصية أو لممارسة أي من حقوقك، يمكنك التواصل مباشرة مع إدارة المنصة ومسؤول البيانات ربيع شعبان عبر البريد الإلكتروني الرسمي:{' '}
            <a href="mailto:info@khamsaprogramming.com" className="text-primary font-bold font-mono hover:underline">
              info@khamsaprogramming.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
