'use client';

import React, { useState, useMemo } from 'react';
import { Search, Video as VideoIcon, Youtube, Facebook } from 'lucide-react';
import { Video, VideoPlatform } from '@/types/api';
import { VideoCard } from '@/components/videos/VideoCard';
import { VideoPreviewModal, TikTokIcon } from '@/features/videos';
import { Pagination } from '@/components/ui/Pagination';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';

interface VideosExplorerProps {
  initialVideos: Video[];
}

export function VideosExplorer({ initialVideos }: VideosExplorerProps) {
  const [page, setPage] = useState(1);
  const [platform, setPlatform] = useState<string>('ALL');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const pageSize = 9;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
    setPage(1);
  };

  const platforms = [
    { key: 'ALL', label: 'كل المنصات', icon: VideoIcon },
    { key: VideoPlatform.YOUTUBE, label: 'YouTube', icon: Youtube },
    { key: VideoPlatform.TIKTOK, label: 'TikTok', icon: TikTokIcon },
    { key: VideoPlatform.FACEBOOK, label: 'Facebook', icon: Facebook },
  ];

  const filteredVideos = useMemo(() => {
    let result = initialVideos;

    if (platform !== 'ALL') {
      result = result.filter(v => v.platform === platform);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        v =>
          v.title.toLowerCase().includes(q) ||
          v.description?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [initialVideos, platform, searchQuery]);

  const totalPages = Math.ceil(filteredVideos.length / pageSize) || 1;
  const paginatedVideos = filteredVideos.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-8">
      {/* Search & Platform Tabs */}
      <div className="space-y-4 p-5 rounded-2xl border border-border bg-card shadow-card">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="ابحث عن فيديو أو شرح محدد..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="h-11"
            />
          </div>
          <Button type="submit" className="h-11 px-6 font-bold text-xs gap-1.5 shadow-subtle">
            <Search className="h-3.5 w-3.5" />
            بحث
          </Button>
        </form>

        {/* Platform Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {platforms.map(p => {
            const Icon = p.icon;
            const isSelected = platform === p.key;

            return (
              <button
                key={p.key}
                type="button"
                onClick={() => {
                  setPlatform(p.key);
                  setPage(1);
                }}
                className="focus:outline-none select-none"
              >
                <Badge
                  variant={isSelected ? 'primary' : 'secondary'}
                  className="cursor-pointer gap-1.5 px-3.5 py-1.5 text-xs font-bold hover:border-primary/50 transition-colors whitespace-nowrap"
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{p.label}</span>
                </Badge>
              </button>
            );
          })}
        </div>
      </div>

      {/* Videos Grid / Empty State */}
      {paginatedVideos.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedVideos.map((video: Video) => (
              <VideoCard
                key={video.id || video._id || video.url}
                video={video}
                onPlay={v => setActiveVideo(v)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={newPage => {
                setPage(newPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </div>
      ) : (
        <EmptyState
          icon={VideoIcon}
          title="لم يتم العثور على فيديوهات"
          description={
            searchQuery || platform !== 'ALL'
              ? 'جرّب البحث بكلمات أخرى أو اختر منصة مختلفة.'
              : 'لا توجد فيديوهات منشورة حالياً.'
          }
          action={
            searchQuery || platform !== 'ALL'
              ? {
                  label: 'إعادة ضبط الفلاتر',
                  onClick: () => {
                    setPlatform('ALL');
                    setSearchInput('');
                    setSearchQuery('');
                    setPage(1);
                  },
                }
              : undefined
          }
        />
      )}

      {/* Video Watch & Embed Modal */}
      <VideoPreviewModal
        video={activeVideo}
        isOpen={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}
