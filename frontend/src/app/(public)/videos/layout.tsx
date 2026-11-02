import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'فيديوهات وشروحات البرمجة',
  description:
    'شاهد أحدث كبسولات وشروحات البرمجة السريعة والعملية للمطور العربي بأسلوب سهل ومفهوم.',
  alternates: {
    canonical: `${siteUrl}/videos`,
  },
  openGraph: {
    title: 'فيديوهات وشروحات البرمجة | خمسة برمجة بالبلدي',
    description:
      'شاهد أحدث كبسولات وشروحات البرمجة السريعة والعملية للمطور العربي.',
    url: `${siteUrl}/videos`,
    type: 'website',
  },
};

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
