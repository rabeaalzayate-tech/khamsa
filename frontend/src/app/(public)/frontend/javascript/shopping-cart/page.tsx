import React from 'react';
import ShoppingCartApp from '@/components/projects/javascript/shopping-cart/ShoppingCartApp';
import Link from 'next/link';

export const metadata = {
  title: 'مشروع سلة تسوق متكاملة (E-commerce Shopping Cart) | JavaScript Projects',
  description: 'مشروع عملي لبناء سلة تسوق متكاملة بـ JavaScript الحديثة تعتمد على مبدأ عدم تعديل الحالة Immutability وكائنات Map/Set وحساب الضرائب والكوبونات.',
};

export default function ShoppingCartProjectPage() {
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
              المشروع العملي 07 من 10
            </span>
            <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full text-xs font-semibold">
              Immutability & State Patterns
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            سلة تسوق متكاملة لمتجر إلكتروني (Shopping Cart)
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            محاكاة حقيقية لنظام إدارة سلة التسوق الإلكترونية: تحديث كميات المنتجات مع الحفاظ على عدم تعديل الحالة السابقة Immutable Updates، تطبيق كود الخصم، حساب ضريبة القيمة المضافة والشحن.
          </p>
        </div>

        <div className="mb-12">
          <ShoppingCartApp />
        </div>
      </div>
    </div>
  );
}
