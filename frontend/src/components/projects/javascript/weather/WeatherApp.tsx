'use client';

import React, { useState } from 'react';

interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  forecast: Array<{ day: string; temp: number; condition: string }>;
}

const MOCK_WEATHER_DATABASE: Record<string, WeatherData> = {
  'القاهرة': {
    city: 'القاهرة',
    country: 'مصر',
    temp: 24,
    feelsLike: 23,
    condition: 'مشمس صافٍ',
    humidity: 45,
    windSpeed: 14,
    pressure: 1014,
    forecast: [
      { day: 'السبت', temp: 25, condition: 'مشمس' },
      { day: 'الأحد', temp: 26, condition: 'صافٍ' },
      { day: 'الإثنين', temp: 24, condition: 'غيوم خفيفة' },
      { day: 'الثلاثاء', temp: 23, condition: 'مشمس' },
      { day: 'الأربعاء', temp: 25, condition: 'صافٍ' },
    ],
  },
  'الرياض': {
    city: 'الرياض',
    country: 'المملكة العربية السعودية',
    temp: 31,
    feelsLike: 30,
    condition: 'حار وجاف',
    humidity: 15,
    windSpeed: 18,
    pressure: 1012,
    forecast: [
      { day: 'السبت', temp: 32, condition: 'مشمس' },
      { day: 'الأحد', temp: 33, condition: 'مشمس' },
      { day: 'الإثنين', temp: 30, condition: 'رياح نشطة' },
      { day: 'الثلاثاء', temp: 29, condition: 'صافٍ' },
      { day: 'الأربعاء', temp: 31, condition: 'مشمس' },
    ],
  },
  'دبي': {
    city: 'دبي',
    country: 'الإمارات العربية المتحدة',
    temp: 29,
    feelsLike: 31,
    condition: 'صافٍ مع رطوبة معتدلة',
    humidity: 60,
    windSpeed: 12,
    pressure: 1015,
    forecast: [
      { day: 'السبت', temp: 30, condition: 'صافٍ' },
      { day: 'الأحد', temp: 29, condition: 'غيوم متفرقة' },
      { day: 'الإثنين', temp: 28, condition: 'صافٍ' },
      { day: 'الثلاثاء', temp: 30, condition: 'مشمس' },
      { day: 'الأربعاء', temp: 31, condition: 'صافٍ' },
    ],
  },
  'عمان': {
    city: 'عمان',
    country: 'الأردن',
    temp: 18,
    feelsLike: 17,
    condition: 'معتدل وغائم جزئياً',
    humidity: 50,
    windSpeed: 16,
    pressure: 1018,
    forecast: [
      { day: 'السبت', temp: 19, condition: 'غائم جزئياً' },
      { day: 'الأحد', temp: 17, condition: 'احتمال أمطار' },
      { day: 'الإثنين', temp: 16, condition: 'معتدل' },
      { day: 'الثلاثاء', temp: 18, condition: 'مشمس' },
      { day: 'الأربعاء', temp: 20, condition: 'صافٍ' },
    ],
  },
};

export default function WeatherApp() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(MOCK_WEATHER_DATABASE['القاهرة']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate real asynchronous network request with async/await
      await new Promise(res => setTimeout(res, 600));

      const normalized = cityName.trim();
      const match = Object.keys(MOCK_WEATHER_DATABASE).find(
        key => key.includes(normalized) || normalized.includes(key)
      );

      if (match) {
        setWeather(MOCK_WEATHER_DATABASE[match]);
      } else {
        // Fallback dynamic generation for unknown cities
        setWeather({
          city: cityName,
          country: 'عالمي',
          temp: Math.floor(Math.random() * 15) + 15,
          feelsLike: Math.floor(Math.random() * 15) + 14,
          condition: 'طقس معتدل ومستقر',
          humidity: Math.floor(Math.random() * 40) + 30,
          windSpeed: Math.floor(Math.random() * 20) + 5,
          pressure: 1013,
          forecast: [
            { day: 'غداً', temp: 22, condition: 'صافٍ' },
            { day: 'بعد غد', temp: 24, condition: 'مشمس' },
            { day: 'اليوم الثالث', temp: 21, condition: 'غائم جزئياً' },
          ],
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'فشل الاتصال بمزود خدمة الطقس';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchWeather(query);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="ابحث عن اسم المدينة (مثال: القاهرة، الرياض، دبي، عمان)..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 text-slate-950 font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
        >
          {isLoading ? 'جاري التحميل...' : 'بحث'}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Main Weather Card */}
      {weather && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6">
            <div>
              <div className="text-3xl font-extrabold text-white mb-1">
                {weather.city}
              </div>
              <div className="text-slate-400 text-sm font-medium">
                {weather.country}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-amber-400">
                {weather.temp}°
              </span>
              <span className="text-slate-400 font-medium">مئوية</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950 border border-slate-800/60 p-4 rounded-xl text-center">
              <div className="text-xs text-slate-500 mb-1">الحالة الجوية</div>
              <div className="text-sm font-bold text-slate-200">{weather.condition}</div>
            </div>
            <div className="bg-slate-950 border border-slate-800/60 p-4 rounded-xl text-center">
              <div className="text-xs text-slate-500 mb-1">الحرارة المحسوسة</div>
              <div className="text-sm font-bold text-amber-400">{weather.feelsLike}°م</div>
            </div>
            <div className="bg-slate-950 border border-slate-800/60 p-4 rounded-xl text-center">
              <div className="text-xs text-slate-500 mb-1">الرطوبة النسبية</div>
              <div className="text-sm font-bold text-sky-400">{weather.humidity}%</div>
            </div>
            <div className="bg-slate-950 border border-slate-800/60 p-4 rounded-xl text-center">
              <div className="text-xs text-slate-500 mb-1">سرعة الرياح</div>
              <div className="text-sm font-bold text-emerald-400">{weather.windSpeed} كم/س</div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="border-t border-slate-800 pt-6">
            <h3 className="text-sm font-semibold text-slate-400 mb-4">التوقعات للأيام القادمة</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {weather.forecast.map((f, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-xl text-center">
                  <div className="text-xs text-slate-400 font-medium mb-1">{f.day}</div>
                  <div className="text-lg font-bold text-amber-400 mb-1">{f.temp}°</div>
                  <div className="text-xs text-slate-500">{f.condition}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
