'use client';

import React, { useState, useMemo } from 'react';

interface MetricItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'mobile';
  performanceScore: number;
  activeUsers: number;
  uptimePercent: number;
  status: 'optimal' | 'warning' | 'critical';
}

const INITIAL_METRICS: MetricItem[] = [
  { id: 'srv-1', name: 'Web Next.js Frontend', category: 'frontend', performanceScore: 98, activeUsers: 14200, uptimePercent: 99.98, status: 'optimal' },
  { id: 'srv-2', name: 'Auth & Session API', category: 'backend', performanceScore: 92, activeUsers: 8900, uptimePercent: 99.95, status: 'optimal' },
  { id: 'srv-3', name: 'Search & Indexing Engine', category: 'backend', performanceScore: 76, activeUsers: 3400, uptimePercent: 98.40, status: 'warning' },
  { id: 'srv-4', name: 'Edge CDN & Cache Service', category: 'devops', performanceScore: 99, activeUsers: 32000, uptimePercent: 100.0, status: 'optimal' },
  { id: 'srv-5', name: 'React Native Mobile API', category: 'mobile', performanceScore: 88, activeUsers: 6500, uptimePercent: 99.80, status: 'optimal' },
  { id: 'srv-6', name: 'Data Pipeline Worker', category: 'backend', performanceScore: 64, activeUsers: 1200, uptimePercent: 96.20, status: 'critical' },
];

export default function DashboardApp() {
  const [items] = useState<MetricItem[]>(INITIAL_METRICS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | MetricItem['category']>('all');
  const [sortField, setSortField] = useState<keyof MetricItem>('performanceScore');
  const [sortAsc, setSortAsc] = useState(false);

  // Data transformations using useMemo and pure Array methods
  const filteredAndSorted = useMemo(() => {
    return items
      .filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortAsc ? valA - valB : valB - valA;
        }
        return sortAsc ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
      });
  }, [items, searchTerm, selectedCategory, sortField, sortAsc]);

  const totalUsers = items.reduce((acc, curr) => acc + curr.activeUsers, 0);
  const avgUptime = (items.reduce((acc, curr) => acc + curr.uptimePercent, 0) / items.length).toFixed(2);
  const optimalCount = items.filter(i => i.status === 'optimal').length;

  const toggleSort = (field: keyof MetricItem) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-semibold text-slate-400 mb-2">إجمالي المستخدمين النشطين</div>
          <div className="text-3xl font-black text-amber-400">{totalUsers.toLocaleString()}</div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-semibold text-slate-400 mb-2">متوسط التوفر (Uptime)</div>
          <div className="text-3xl font-black text-emerald-400">{avgUptime}%</div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-semibold text-slate-400 mb-2">الخدمات في الحالة المثلى</div>
          <div className="text-3xl font-black text-sky-400">{optimalCount} من {items.length}</div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="ابحث في أسماء الخدمات..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500"
        />

        <div className="flex gap-2 text-xs">
          {(['all', 'frontend', 'backend', 'devops', 'mobile'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/60">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-900 border-b border-slate-800 text-xs text-slate-400 uppercase font-semibold">
            <tr>
              <th onClick={() => toggleSort('name')} className="p-4 cursor-pointer hover:text-white">
                الخدمة {sortField === 'name' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => toggleSort('category')} className="p-4 cursor-pointer hover:text-white">
                الفئة {sortField === 'category' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => toggleSort('performanceScore')} className="p-4 cursor-pointer hover:text-white">
                مؤشر الأداء {sortField === 'performanceScore' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => toggleSort('activeUsers')} className="p-4 cursor-pointer hover:text-white">
                المستخدمين {sortField === 'activeUsers' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => toggleSort('uptimePercent')} className="p-4 cursor-pointer hover:text-white">
                التوفر {sortField === 'uptimePercent' ? (sortAsc ? '▲' : '▼') : ''}
              </th>
              <th className="p-4">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredAndSorted.map(item => (
              <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                <td className="p-4 font-bold text-white font-mono">{item.name}</td>
                <td className="p-4 text-xs text-slate-400">{item.category}</td>
                <td className="p-4 font-bold text-amber-400">{item.performanceScore}/100</td>
                <td className="p-4 text-slate-300 font-mono">{item.activeUsers.toLocaleString()}</td>
                <td className="p-4 text-emerald-400 font-mono">{item.uptimePercent}%</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.status === 'optimal'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : item.status === 'warning'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
