import React from 'react';
import DashboardApp from '@/components/projects/javascript/dashboard/DashboardApp';
import Link from 'next/link';

export const metadata = {
  title: 'مشروع لوحة تحكم تفاعلية (Interactive Dashboard) | JavaScript Projects',
  description: 'مشروع عملي لبناء لوحة بيانات وإحصائيات تفاعلية بـ JavaScript الحديثة تعتمد على تحويل البيانات Data Transformation والفلترة والترتيب الفوري والتخزين المحلي.',
};

export default function DashboardProjectPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/frontend/javascript"
            className="text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-2 text-sm font-medium"
          >
            &larr; العودة إلى منهج توثيق JavaScript الكامل
          </Link>
        </div>

        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-semibold">
              المشروع العملي 09 من 10
            </span>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
              Data Transformation & Filtering
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            لوحة تحكم تفاعلية لتحليل البيانات (Interactive Dashboard)
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            تطبيق تحليلي متكامل لمعالجة مجموعات البيانات الكبيرة: ترتيب الجداول بالضغط على الأعمدة (Dynamic Sorting)، البحث الفوري، تصفية الفئات، وتجميع مؤشرات الأداء الرئيسية KPI Cards.
          </p>
        </div>

        <div className="mb-12">
          <DashboardApp />
        </div>
      </div>
    </div>
  );
}
