export const DOCS_SLUG_PREFIXES = [
  'web-docs-',
  'tooling-docs-',
  'html-docs-',
  'react-docs-',
] as const;

/**
 * Returns true if the slug belongs to a structured Frontend Documentation series
 * (Web Fundamentals, Developer Tooling & Git, HTML5 Docs, React.js Docs),
 * so those lessons stay cleanly organized in `/frontend` and out of `/articles`.
 */
export function isDocsArticleSlug(slug?: string | null): boolean {
  if (!slug) return false;
  const lower = slug.toLowerCase();
  return DOCS_SLUG_PREFIXES.some(prefix => lower.startsWith(prefix));
}
