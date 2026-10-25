/**
 * Text Encoding and Auto-healing Utilities for Arabic and Multilingual Text
 * Brand: خمسة برمجة بالبلدي
 *
 * Automatically detects and heals CP437 / Windows-1252 / ISO-8859-1 Mojibake
 * caused by legacy Windows console / shell import scripts.
 */

const CP437_CHARS =
  '\u00c7\u00fc\u00e9\u00e2\u00e4\u00e0\u00e5\u00e7\u00ea\u00eb\u00e8\u00ef\u00ee\u00ec\u00c4\u00c5' +
  '\u00c9\u00e6\u00c6\u00f4\u00f6\u00f2\u00fb\u00f9\u00ff\u00d6\u00dc\u00a2\u00a3\u00a5\u20a7\u0192' +
  '\u00e1\u00ed\u00f3\u00fa\u00f1\u00d1\u00aa\u00ba\u00bf\u2310\u00ac\u00bd\u00bc\u00a1\u00ab\u00bb' +
  '\u2591\u2592\u2593\u2502\u2524\u2561\u2562\u2556\u2555\u2563\u2551\u2557\u255d\u255c\u255b\u2510' +
  '\u2514\u2534\u252c\u251c\u2500\u253c\u255e\u255f\u255a\u2554\u2569\u2566\u2560\u2550\u256c\u2567' +
  '\u2568\u2564\u2565\u2559\u2558\u2552\u2553\u256b\u256a\u2518\u250c\u2588\u2584\u258c\u2590\u2580' +
  '\u03b1\u00df\u0393\u03c0\u03a3\u03c3\u03bc\u03c4\u03a6\u0398\u03a9\u03b4\u221e\u03c6\u03b5\u2229' +
  '\u2261\u00b1\u2265\u2264\u2320\u2321\u00f7\u2248\u00b0\u2219\u00b7\u221a\u207f\u00b2\u25a0\u00a0';

const charToByte = new Map<string, number>();
for (let i = 0; i < CP437_CHARS.length; i++) {
  const ch = CP437_CHARS[i];
  if (ch) {
    charToByte.set(ch, 0x80 + i);
  }
}

/**
 * Automatically detects and fixes CP437 / Mojibake in Arabic strings
 */
export function fixMojibake(text?: string | null): string {
  if (!text || typeof text !== 'string') return text || '';

  // Check if string contains CP437 mojibake signatures for Arabic:
  // In UTF-8 Arabic, 2-byte sequences start with 0xD8 (\u256a: ╪) or 0xD9 (\u2518: ┘)
  if (!/[╪┘]/.test(text)) {
    return text;
  }

  try {
    const bytes: number[] = [];
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch && charToByte.has(ch)) {
        bytes.push(charToByte.get(ch)!);
      } else {
        const code = text.charCodeAt(i);
        if (code < 128) {
          bytes.push(code);
        } else {
          return text;
        }
      }
    }

    const decoded = Buffer.from(bytes).toString('utf8');
    return decoded || text;
  } catch {
    return text;
  }
}

/**
 * Resolves featured link thumbnail and replaces expired/broken YouTube studio links
 */
export function resolveFeaturedImage(image?: string | null, targetUrl?: string | null): string {
  if (!image || typeof image !== 'string' || !image.trim()) {
    return '';
  }

  const trimmed = image.trim();

  // Fix YouTube studio temporary square thumbnails (expired 404s)
  if (trimmed.includes('studio_square_thumbnail.jpg')) {
    if (trimmed.includes('PLYMsJ3Zl5HO4') || (targetUrl && targetUrl.includes('PLYMsJ3Zl5HO4'))) {
      return 'https://i.ytimg.com/vi/9quqWXxdifI/hqdefault.jpg';
    }
  }

  return trimmed;
}

/**
 * Sanitizes a featured link object to ensure clean Arabic text and valid image
 */
export function sanitizeFeaturedLink<T extends Record<string, any>>(link: T): T {
  if (!link) return link;
  return {
    ...link,
    title: fixMojibake(link.title),
    badge: link.badge ? fixMojibake(link.badge) : link.badge,
    description: link.description ? fixMojibake(link.description) : link.description,
    ctaText: link.ctaText ? fixMojibake(link.ctaText) : link.ctaText,
    image: resolveFeaturedImage(link.image, link.url),
  };
}
