'use client';

import React, { useState, useEffect } from 'react';
import {
  ListOrdered,
  ArrowUp,
  Share2,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items?: TocItem[];
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
  className?: string;
}

export function TableOfContents({
  items,
  isMobileDrawer: _isMobileDrawer = false,
  onCloseMobileDrawer,
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0% -60% 0%' }
    );

    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyPageLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="فهرس المقال والمحاور"
      className={cn(
        'rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-card',
        className
      )}
      dir="rtl"
    >
      <div className="flex items-center justify-between pb-3 border-b border-border/70">
        <div className="flex items-center gap-2 text-xs font-black text-foreground">
          <ListOrdered className="h-4 w-4 text-primary" />
          <span>فهرس المحتويات والمحاور</span>
        </div>
        <span className="text-[10px] font-mono font-bold text-foreground-muted px-2 py-0.5 rounded-full bg-surface border border-border">
          {items.length} أقسام
        </span>
      </div>

      <div className="space-y-1 text-xs max-h-[500px] overflow-y-auto scrollbar-thin pr-1">
        {items.map(item => {
          const isActive = activeId === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => {
                if (onCloseMobileDrawer) onCloseMobileDrawer();
              }}
              className={cn(
                'block py-1.5 px-3 rounded-xl transition-all leading-relaxed',
                item.level === 3 && 'mr-4 text-[11px] text-foreground-muted',
                isActive
                  ? 'bg-primary/15 text-primary font-bold border-r-2 border-primary shadow-sm'
                  : 'text-foreground-secondary hover:text-foreground hover:bg-surface'
              )}
            >
              {item.title}
            </a>
          );
        })}
      </div>

      {/* Quick Action Buttons */}
      <div className="pt-3 border-t border-border/70 flex items-center justify-between text-xs text-foreground-muted">
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 hover:text-primary transition-colors font-bold text-[11px]"
        >
          <ArrowUp className="h-3.5 w-3.5" />
          <span>للأعلى</span>
        </button>

        <button
          type="button"
          onClick={copyPageLink}
          className="inline-flex items-center gap-1 hover:text-primary transition-colors text-[11px] font-bold"
          title="نسخ رابط المقال"
        >
          {copiedLink ? (
            <>
              <Check className="h-3 w-3 text-primary" />
              <span className="text-primary">تم النسخ</span>
            </>
          ) : (
            <>
              <Share2 className="h-3 w-3" />
              <span>مشاركة</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
}
