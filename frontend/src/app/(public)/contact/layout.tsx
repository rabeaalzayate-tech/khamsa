import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/seo/site-url';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: 'تواصل معنا | خمسة برمجة بالبلدي',
  description:
    'تواصل مع منصة خمسة برمجة بالبلدي وفريق العمل للاستفسارات، الاقتراحات، طلبات الاستشارات، أو الشراكات البرمجية والتقنية.',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'تواصل معنا | خمسة برمجة بالبلدي',
    description:
      'تواصل مع منصة خمسة برمجة بالبلدي وفريق العمل للاستفسارات، الاقتراحات، أو طلبات الاستشارات التقنية.',
    url: `${siteUrl}/contact`,
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
