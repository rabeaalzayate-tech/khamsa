import React from 'react';
import FinalProjectApp from '@/components/projects/javascript/final-project/FinalProjectApp';
import Link from 'next/link';

export const metadata = {
  title: 'مشروع التخرج: تطبيق JavaScript متكامل (Capstone Project) | JavaScript Projects',
  description: 'مشروع تخرج مسار توثيق JavaScript الكامل: تطبيق إدارة مشاريع ومهام متكامل بمعمارية النمط التركيبي، معالجة الحالة، والمزامنة غير المتزامنة.',
};

export default function FinalProjectPage() {
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
              مشروع التخرج 10 من 10 (Capstone)
            </span>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
              ES Modules & Enterprise Architecture
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            تطبيق إدارة المشاريع والمهام الشامل (Task Architecture Engine)
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            مشروع التخرج الختامي لمسار JavaScript الكامل: يجمع مفاهيم معمارية الوحدات البرمجية ES Modules، وإدارة الحالة المركبة، والتفاعل مع التخزين المحلي، ونظام الأحداث المخصص Custom Events لإنشاء تطبيق مهام عالي الاعتمادية.
          </p>
        </div>

        <div className="mb-12">
          <FinalProjectApp />
        </div>
      </div>
    </div>
  );
}
