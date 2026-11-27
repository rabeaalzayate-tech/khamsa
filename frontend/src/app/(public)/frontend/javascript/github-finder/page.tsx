import React from 'react';
import GithubFinderApp from '@/components/projects/javascript/github-finder/GithubFinderApp';
import Link from 'next/link';

export const metadata = {
  title: 'مشروع باحث حسابات GitHub (GitHub Profile Finder) | JavaScript Projects',
  description: 'مشروع عملي للبحث عن مطوري ومستودعات GitHub باستخدام تقنيات Debouncing وإلغاء الطلبات المتداخلة عبر AbortController مع Fetch API.',
};

export default function GithubFinderProjectPage() {
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
              المشروع العملي 08 من 10
            </span>
            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-semibold">
              Debounce & AbortController
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            باحث حسابات ومستودعات GitHub (GitHub Profile Finder)
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            محرك بحث فوري يستعرض تفاصيل المطورين ومستودعاتهم البرمجية مع تأخير ذكي للطلبات Debouncing لمنع استنزاف موارد الشبكة، وإلغاء الطلبات السابقة تلقائياً عبر واجهة AbortController.
          </p>
        </div>

        <div className="mb-12">
          <GithubFinderApp />
        </div>
      </div>
    </div>
  );
}
