import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { FrontendRoadmapTree } from '@/components/frontend/FrontendRoadmapTree';
import { Button } from '@/components/ui/Button';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'خريطة طريق الفرونت إند الكاملة (Frontend Roadmap 2027)',
  description:
    'خارطة الطريق الشجرية الكاملة لتعلم تطوير الواجهات الأمامية من الصفر: ما قبل الفرونت إند، Frontend Developer، React Engineer، Next.js Engineer، و Frontend Engineer.',
  alternates: {
    canonical: `${siteUrl}/frontend/roadmap`,
  },
};

export default function FrontendRoadmapPage() {
  return (
    <div className="space-y-12" dir="rtl">
      <ArticleBreadcrumb
        items={[
          { label: 'قسم الفرونت إند', href: '/frontend' },
          { label: 'خريطة الطريق (Roadmap)' },
        ]}
      />

      <FrontendRoadmapTree />

      {/* Bottom CTA */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-right">
          <h3 className="text-lg font-black text-foreground">
            جاهز تبدأ التطبيق العملي؟
          </h3>
          <p className="text-xs sm:text-sm text-foreground-muted">
            ادخل مباشرة على توثيق React.js الكامل المكون من 10 فصول بالعامية المصرية.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/frontend/react">
            <Button className="gap-2 font-bold">
              <BookOpen className="h-4 w-4" />
              <span>توثيق React.js (10 فصول)</span>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/frontend">
            <Button variant="outline" className="gap-1.5 font-bold">
              <ArrowRight className="h-4 w-4" />
              <span>العودة لقسم الفرونت إند</span>
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
