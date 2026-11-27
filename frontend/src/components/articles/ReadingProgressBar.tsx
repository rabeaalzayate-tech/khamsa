'use client';

import React, { useState, useEffect } from 'react';

export function ReadingProgressBar() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (scrollY / totalHeight) * 100;
        setCompletion(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-border/20 z-50 pointer-events-none"
      dir="rtl"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-l from-primary via-cyan-400 to-primary transition-all duration-150 ease-out shadow-[0_0_8px_rgba(255,212,0,0.5)]"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}
