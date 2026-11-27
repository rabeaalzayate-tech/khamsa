import React from 'react';
import WeatherApp from '@/components/projects/javascript/weather/WeatherApp';
import Link from 'next/link';

export const metadata = {
  title: 'مشروع تطبيق حالة الطقس (Weather Application) | JavaScript Projects',
  description: 'مشروع عملي لبناء تطبيق طقس حي باستخدام JavaScript الحديثة، معالجة الوعود والاتصال عبر Fetch API و Async/Await مع تحديد الموقع الجغرافي ومعالجة الأخطاء.',
};

export default function WeatherProjectPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/frontend/javascript"
            className="text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-2 text-sm font-medium"
          >
            &larr; العودة إلى منهج توثيق JavaScript الكامل
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-semibold">
              المشروع العملي 05 من 10
            </span>
            <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full text-xs font-semibold">
              Async / Fetch API
            </span>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
              مستوى متوسط
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            تطبيق حالة الطقس المباشر (Weather Application)
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            تطبيق تفاعلي لجلب بيانات الأرصاد الجوية الحية عبر Fetch API و Async/Await، يدعم البحث عن المدن العالمية، الاستعلام الفوري، وتحديد الموقع التلقائي مع إدارة حالات التحميل والأخطاء.
          </p>
        </div>

        {/* Project Interactive Component */}
        <div className="mb-12">
          <WeatherApp />
        </div>

        {/* Technical Architecture Notes */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">المفاهيم البرمجية المطبقة في هذا المشروع</h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">&bull;</span>
              <span><strong>Fetch API & Async/Await:</strong> إجراء طلبات شبكة غير متزامنة وقراءة استجابات JSON الحية بسلاسة.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">&bull;</span>
              <span><strong>Robust Error Handling:</strong> فحص response.ok واعتراض استثناءات انقطاع الاتصال وتقديم رسائل خطأ واضحة باللغة العربية.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">&bull;</span>
              <span><strong>Geolocation API:</strong> تحديد إحداثيات خطوط الطول والعرض للعميل عبر متصفح الويب واستخراج الطقس المحلي تلقائياً.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">&bull;</span>
              <span><strong>Dynamic UI State Management:</strong> إدارة الحالات المختلفة للواجهة (Loading, Error, Success, Idle) مع مكونات وتأثيرات بصرية عالية الدقة.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
