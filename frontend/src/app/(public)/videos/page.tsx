import React from 'react';
import { Video as VideoIcon } from 'lucide-react';
import { videosApi } from '@/lib/api/videos.api';
import { Video } from '@/types/api';
import { VideosExplorer } from '@/components/videos/VideosExplorer';

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function VideosPage() {
  let videos: Video[] = [];

  try {
    const res = await videosApi.getVideos({ limit: 100, sort: 'latest' });
    if (res?.data?.items) {
      videos = res.data.items;
    }
  } catch {
    // Graceful fallback if API is unreachable during build/SSR
  }

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
          <VideoIcon className="h-3.5 w-3.5" />
          <span>مكتبة الفيديوهات التعليمية</span>
        </div>
        <h1 className="text-h1 text-foreground font-extrabold tracking-tight">
          فيديوهات السوشيال ميديا
        </h1>
        <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
          كبسولات وشروحات برمجية قصيرة ومباشرة على يوتيوب، تيك توك، وفيسبوك لتبسيط أهم المفاهيم
          البرمجية.
        </p>
      </div>

      {/* Server-rendered interactive videos explorer */}
      <VideosExplorer initialVideos={videos} />
    </div>
  );
}
