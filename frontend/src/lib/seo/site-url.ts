/**
 * Unified Site URL Helper for SEO, Sitemaps, and Metadata
 * Brand: خمسة برمجة بالبلدي
 */

export function getSiteUrl(): string {
  let url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url || url.trim() === '') {
    url =
      process.env.NODE_ENV === 'production' || process.env.VERCEL
        ? 'https://www.khamsaprogramming.com'
        : 'http://localhost:3000';
  }

  let cleaned = url.trim().replace(/\/+$/, '');
  // Ensure khamsaprogramming.com is normalized to the primary canonical www domain
  if (cleaned === 'https://khamsaprogramming.com' || cleaned === 'http://khamsaprogramming.com') {
    cleaned = 'https://www.khamsaprogramming.com';
  }
  return cleaned;
}
