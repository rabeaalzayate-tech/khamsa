'use client';

import React, { useState, useEffect, useRef } from 'react';

interface GithubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string;
}

const MOCK_PROFILES: Record<string, { user: GithubUser; repos: GithubRepo[] }> = {
  'torvalds': {
    user: {
      login: 'torvalds',
      name: 'Linus Torvalds',
      bio: 'Creator of Linux and Git',
      avatar_url: 'https://avatars.githubusercontent.com/u/1024025?v=4',
      public_repos: 7,
      followers: 245000,
      following: 0,
      html_url: 'https://github.com/torvalds',
    },
    repos: [
      { id: 1, name: 'linux', description: 'Linux kernel source tree', stargazers_count: 185000, forks_count: 54000, html_url: 'https://github.com/torvalds/linux', language: 'C' },
      { id: 2, name: 'subsurface-for-dir', description: 'Subsurface divelog program', stargazers_count: 3200, forks_count: 540, html_url: 'https://github.com/torvalds/subsurface-for-dir', language: 'C++' },
    ],
  },
  'gaearon': {
    user: {
      login: 'gaearon',
      name: 'Dan Abramov',
      bio: 'Working on React at Bluesky',
      avatar_url: 'https://avatars.githubusercontent.com/u/810438?v=4',
      public_repos: 260,
      followers: 86000,
      following: 172,
      html_url: 'https://github.com/gaearon',
    },
    repos: [
      { id: 3, name: 'redux', description: 'Predictable state container for JavaScript apps', stargazers_count: 60500, forks_count: 15400, html_url: 'https://github.com/reduxjs/redux', language: 'TypeScript' },
      { id: 4, name: 'overreacted.io', description: 'Personal blog about React and JavaScript', stargazers_count: 6100, forks_count: 890, html_url: 'https://github.com/gaearon/overreacted.io', language: 'JavaScript' },
    ],
  },
};

export default function GithubFinderApp() {
  const [username, setUsername] = useState('gaearon');
  const [data, setData] = useState<{ user: GithubUser; repos: GithubRepo[] } | null>(MOCK_PROFILES['gaearon']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demonstrate AbortController for active request cancellation
  const abortControllerRef = useRef<AbortController | null>(null);

  const searchUser = async (query: string) => {
    if (!query.trim()) return;

    // Abort previous pending request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setError(null);

    try {
      await new Promise(res => setTimeout(res, 500)); // Network delay

      const key = query.trim().toLowerCase();
      if (MOCK_PROFILES[key]) {
        setData(MOCK_PROFILES[key]);
      } else {
        // Fallback realistic profile
        setData({
          user: {
            login: query,
            name: `${query.charAt(0).toUpperCase() + query.slice(1)} Developer`,
            bio: 'Full-stack software engineer & open source contributor',
            avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            public_repos: Math.floor(Math.random() * 40) + 5,
            followers: Math.floor(Math.random() * 500) + 20,
            following: Math.floor(Math.random() * 200) + 10,
            html_url: `https://github.com/${query}`,
          },
          repos: [
            { id: 10, name: 'modern-web-starter', description: 'Modern Next.js and TypeScript starter template', stargazers_count: 124, forks_count: 32, html_url: '#', language: 'TypeScript' },
            { id: 11, name: 'algorithms-js', description: 'Data structures and algorithms in clean JavaScript', stargazers_count: 85, forks_count: 14, html_url: '#', language: 'JavaScript' },
          ],
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Search request aborted.');
      } else {
        setError('تعذر العثور على حساب المستخدم');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      searchUser(username);
    }, 400);

    return () => clearTimeout(timer);
  }, [username]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      {/* Search Input with Debouncing indicator */}
      <div className="mb-8">
        <label className="block text-xs font-semibold text-slate-400 mb-2">اسم مستخدم GitHub (جرب: torvalds, gaearon):</label>
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="اكتب اسم المستخدم للبحث الفوري..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
          />
          {isLoading && (
            <div className="absolute left-4 top-3 text-xs text-amber-400 font-bold animate-pulse">
              جاري البحث...
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-6">
          {/* User Profile Overview */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.user.avatar_url}
              alt={data.user.name}
              className="w-24 h-24 rounded-full border-2 border-amber-500/40 object-cover"
            />
            <div className="flex-1 text-center sm:text-right">
              <h3 className="text-2xl font-bold text-white mb-1">{data.user.name}</h3>
              <p className="text-amber-400 text-sm font-mono mb-2">@{data.user.login}</p>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{data.user.bio}</p>

              {/* Stats badges */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300">
                  {data.user.public_repos} مستودع
                </span>
                <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300">
                  {data.user.followers} متابع
                </span>
                <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300">
                  يتابع {data.user.following}
                </span>
              </div>
            </div>
          </div>

          {/* Repositories */}
          <div className="border-t border-slate-800 pt-6">
            <h4 className="text-lg font-bold text-white mb-4">أبرز المستودعات البرمجية (Repositories)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.repos.map(repo => (
                <div key={repo.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-sky-400 font-mono">{repo.name}</span>
                      <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-amber-400 font-bold">
                        {repo.language}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed mb-4">{repo.description}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-800/80 pt-2">
                    <span>⭐ {repo.stargazers_count.toLocaleString()}</span>
                    <span>🍴 {repo.forks_count.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
