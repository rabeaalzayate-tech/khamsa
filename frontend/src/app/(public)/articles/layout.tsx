import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'المقالات والشروحات التقنية | خمسة برمجة بالبلدي',
  description:
    'شروحات ومقالات تقنية عميقة ومبسطة في تطوير الويب، هندسة البرمجيات، جافاسكريبت، وتايب سكريبت من الألف إلى الياء.',
  alternates: {
    canonical: `${siteUrl}/articles`,
  },
  openGraph: {
    title: 'المقالات والشروحات التقنية | خمسة برمجة بالبلدي',
    description:
      'شروحات ومقالات تقنية عميقة ومبسطة في تطوير الويب، هندسة البرمجيات، وجافاسكريبت بأسلوب عملي.',
    url: `${siteUrl}/articles`,
    type: 'website',
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
