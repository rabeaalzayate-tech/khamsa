import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, FolderTree, Layers, Target } from 'lucide-react';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { Button } from '@/components/ui/Button';
import { StructuredDocsHubClient } from '@/components/frontend/StructuredDocsHubClient';
import {
  JS_DOCS_CURRICULUM,
  JS_DOCS_PHASES,
  JS_DOCS_PROJECTS,
  getJsDocsOfficialProgress,
} from '@/data/javascript-docs-curriculum';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'توثيق JavaScript الكامل باللغة العربية (75 درسًا + 10 مشاريع)',
  description:
    'مرجع توثيق JavaScript الشامل ضمن مسار Front-End Developer: 11 مرحلة، 75 درسًا مرجعيًا عميقًا (أكثر من 5,000 كلمة لكل مقالة)، و10 مشاريع عملية متدرجة.',
  alternates: {
    canonical: `${siteUrl}/frontend/javascript`,
  },
};

function JsSquareSvg({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M10.5 10.5v5.2c0 1.2-.7 1.8-1.8 1.8-.8 0-1.4-.3-1.8-.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17.2 11.4c-.4-.6-1-.9-1.8-.9-1.1 0-1.8.6-1.8 1.4 0 .9.7 1.3 1.9 1.7 1.2.4 1.9.9 1.9 2 0 1.1-.9 1.9-2.2 1.9-1.1 0-1.9-.4-2.4-1.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function JavaScriptDocsHubPage() {
  const officialProgress = getJsDocsOfficialProgress();

  return (
    <div className="space-y-10" dir="rtl">
      <ArticleBreadcrumb
        items={[
          { label: 'قسم الفرونت إند', href: '/frontend' },
          { label: 'توثيق JavaScript' },
        ]}
      />

      {/* Docs Header */}
      <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-card via-card to-amber-950/20 p-6 sm:p-10 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 text-xs font-bold">
              <JsSquareSvg className="w-4 h-4" />
              <span>التوثيق العربي الشامل — JavaScript Complete Documentation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight">
              توثيق JavaScript الكامل باللغة العربية
            </h1>

            <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
              مرجع تعليمي وهندسي شامل يغطي لغة JavaScript من الصفر وحتى مستوى المهندس المحترف: 11
              مرحلة تعليمية متسلسلة، 75 مقالة مرجعية عميقة (بحد أدنى 5,001 كلمة لكل مقالة)، مع شرح
              داخلي للمحرك والذاكرة و10 مشاريع عملية متكاملة.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-muted pt-1">
              <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                <Layers className="h-4 w-4 text-amber-400" />
                <span>{JS_DOCS_PHASES.length} مرحلة تعليمية</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                <FolderTree className="h-4 w-4 text-amber-400" />
                <span>{JS_DOCS_CURRICULUM.length} درسًا مرجعيًا</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Target className="h-4 w-4 text-amber-400" />
                <span>
                  المستهدف: {officialProgress.targetWords.toLocaleString('en-US')}+ كلمة
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>MDN + ECMAScript Specs</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <div className="rounded-xl border border-amber-500/25 bg-background/70 px-4 py-3 text-center space-y-1">
              <div className="text-xs text-foreground-muted">حالة المسار الحالية</div>
              <div className="text-sm font-black text-amber-400">
                البنية جاهزة — {officialProgress.completed} / {officialProgress.total} منشور
              </div>
            </div>

            <Link href="/frontend">
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs font-bold">
                <ArrowRight className="h-3.5 w-3.5" />
                <span>العودة لقسم الفرونت إند</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Curriculum, Search & Progress Tracker */}
      <StructuredDocsHubClient
        phases={JS_DOCS_PHASES}
        chapters={JS_DOCS_CURRICULUM}
        projects={JS_DOCS_PROJECTS}
        storageKey="khamsa_js_docs_learner_progress"
        trackLabel="JavaScript"
      />
    </div>
  );
}
