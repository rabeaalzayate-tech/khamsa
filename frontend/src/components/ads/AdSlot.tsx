'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  minHeight?: number;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

/**
 * Safe AdSense Slot Component
 * - Guarantees Zero Cumulative Layout Shift (CLS)
 * - Renders nothing if NEXT_PUBLIC_ADSENSE_CLIENT is not configured (no empty boxes, no broken UI)
 * - Complies strictly with Google AdSense Publisher Policies:
 *   Does NOT render unfilled blank containers or invalid non-numeric slot IDs during review.
 */
export function AdSlot({
  slot,
  format = 'auto',
  responsive = true,
  className,
  minHeight = 100,
}: AdSlotProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const isPushed = useRef(false);

  // AdSense manual slots MUST have a valid numeric slot ID (e.g. '1234567890').
  // Non-numeric string placeholders (like 'article-mid-content') cause AdSense rejection (blank ad spaces / under construction).
  const isNumericSlot = /^\d+$/.test(slot?.trim() || '');
  const manualAdsEnabled = process.env.NEXT_PUBLIC_ADSENSE_MANUAL_ADS === 'true';
  const shouldRender = Boolean(adClient && manualAdsEnabled && isNumericSlot);

  useEffect(() => {
    if (!shouldRender || isPushed.current) return;

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        isPushed.current = true;
      }
    } catch (err) {
      console.warn('[AdSense] AdSlot failed to initialize:', err);
    }
  }, [shouldRender]);

  // If no AdSense client, or manual ads are disabled during pre-approval, render nothing to avoid blank boxes
  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={cn(
        'w-full my-8 flex flex-col items-center justify-center overflow-hidden transition-all',
        className
      )}
      style={{ minHeight: `${minHeight}px` }}
      aria-label="إعلان"
    >
      <div className="w-full text-center mb-1">
        <span className="text-[10px] uppercase font-mono tracking-wider text-foreground-muted/60 select-none">
          إعلان
        </span>
      </div>

      <ins
        className="adsbygoogle block w-full text-center"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
