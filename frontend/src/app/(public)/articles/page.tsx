import React from 'react';
import { BookOpen } from 'lucide-react';
import { articlesApi } from '@/lib/api/articles.api';
import { Article, ContentStatus } from '@/types/api';
import { STATIC_ARTICLES } from '@/data/static-articles';
import { ArticleBreadcrumb } from '@/components/articles/ArticleBreadcrumb';
import { ArticlesExplorer } from '@/components/articles/ArticlesExplorer';

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

const CATEGORIES = [
  'الكل',
  'تعلم البرمجة',
  'HTML وتطوير الويب',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Backend',
  'Databases',
  'Security',
  'Architecture',
  'DevOps',
  'Performance',
  'Testing',
  'Frontend',
];

export default async function ArticlesPage() {
  let dynamicItems: Article[] = [];

  try {
    const res = await articlesApi.getArticles({ limit: 100, sort: 'latest' });
    if (res?.data?.items) {
      dynamicItems = res.data.items;
    }
  } catch {
    // Graceful fallback to static articles if API is unreachable during build/SSR
  }

  // Convert static articles to standard Article interface
  const staticMapped: Article[] = STATIC_ARTICLES.map(s => ({
    _id: s.id,
    title: s.title,
    slug: s.slug,
    excerpt: s.excerpt,
    content: s.content,
    coverImage: s.coverImage,
    category: s.category,
    tags: s.tags,
    isFeatured: s.isFeatured,
    author: {
      _id: 'author-rabie',
      name: s.author.name,
      email: 'info@khamsaprogramming.com',
      avatar: s.author.avatar,
    },
    status: ContentStatus.PUBLISHED,
    publishedAt: s.publishedAt,
    createdAt: s.publishedAt,
    updatedAt: s.updatedAt,
    seo: s.seo,
  }));

  // Merge dynamic and static articles with deduplication by slug
  const seenSlugs = new Set<string>();
  const mergedArticles: Article[] = [];

  // Prioritize dynamic DB articles if any exist
  for (const art of dynamicItems) {
    if (art.slug && !seenSlugs.has(art.slug.toLowerCase())) {
      seenSlugs.add(art.slug.toLowerCase());
      mergedArticles.push(art);
    }
  }

  // Append static articles for all remaining slots
  for (const art of staticMapped) {
    if (!seenSlugs.has(art.slug.toLowerCase())) {
      seenSlugs.add(art.slug.toLowerCase());
      mergedArticles.push(art);
    }
  }

  return (
    <div className="space-y-12">
      <ArticleBreadcrumb items={[{ label: 'المقالات والشروحات' }]} />

      {/* Page Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
          <BookOpen className="h-3.5 w-3.5" />
          <span>مكتبة المقالات والشروحات المعمارية</span>
        </div>
        <h1 className="text-h1 text-foreground font-extrabold tracking-tight">
          المقالات الهندسية والتقنية
        </h1>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
          شروحات مفصلة، وأدلة تعليمية، ومقالات معمارية الأنظمة لشرح مفاهيم هندسة البرمجيات باللغة
          العربية بأسلوب عملي وعميق.
        </p>
      </div>

      {/* Interactive Explorer with pre-rendered articles */}
      <ArticlesExplorer initialArticles={mergedArticles} categories={CATEGORIES} />
    </div>
  );
}
