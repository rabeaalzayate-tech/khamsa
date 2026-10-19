import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'كبسولات وفيديوهات البرمجة | خمسة برمجة بالبلدي',
  description:
    'أحدث فيديوهات وشروحات البرمجة على يوتيوب وتيك توك وفيسبوك بأسلوب عملي وسهل.',
  alternates: {
    canonical: `${siteUrl}/videos`,
  },
  openGraph: {
    title: 'كبسولات وفيديوهات البرمجة | خمسة برمجة بالبلدي',
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
