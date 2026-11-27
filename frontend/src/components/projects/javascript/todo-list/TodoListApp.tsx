'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Edit3,
  Filter,
  Sparkles,
  Code2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Search,
  Check,
  X,
  Layers,
  ArrowUpDown,
} from 'lucide-react';

export type Priority = 'low' | 'medium' | 'high';
export type FilterStatus = 'all' | 'active' | 'completed';

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: string;
  createdAt: number;
}

const DEFAULT_TODOS: TodoItem[] = [
  {
    id: '1',
    title: 'فهم الفارق بين Map و Set في JavaScript ES6',
    completed: true,
    priority: 'high',
    category: 'التعلم والتطوير',
    createdAt: Date.now() - 3600000 * 24,
  },
  {
    id: '2',
    title: 'تطبيق التحديث بنمط لا يقبل التعديل (Immutable State Updates)',
    completed: false,
    priority: 'high',
    category: 'المشاريع العملية',
    createdAt: Date.now() - 3600000 * 12,
  },
  {
    id: '3',
    title: 'مراجعة خوارزمية جمع المهملات لمنع تسرب الذاكرة WeakMap',
    completed: false,
    priority: 'medium',
    category: 'الهندسة المعمارية',
    createdAt: Date.now() - 3600000 * 4,
  },
];

export function TodoListApp() {
  const [todos, setTodos] = useState<TodoItem[]>(DEFAULT_TODOS);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newPriority, setNewPriority] = useState<Priority>('medium');
  const [newCategory, setNewCategory] = useState<string>('عام');
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>('');
  const [showInspector, setShowInspector] = useState<boolean>(false);

  // تحميل من LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('js_docs_todo_items');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTodos(parsed);
          }
        }
      } catch (e) {
        console.error('Failed to parse saved todos', e);
      }
    }
  }, []);

  // حفظ في LocalStorage
  const saveTodos = useCallback((items: TodoItem[]) => {
    setTodos(items);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('js_docs_todo_items', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save todos', e);
      }
    }
  }, []);

  // إضافة مهمة جديدة بنمط Immutable
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    const newItem: TodoItem = {
      id: Date.now().toString(),
      title: trimmed,
      completed: false,
      priority: newPriority,
      category: newCategory.trim() || 'عام',
      createdAt: Date.now(),
    };

    // التحديث باستخدام Spread Operator لإنشاء مصفوفة جديدة تماماً
    saveTodos([newItem, ...todos]);
    setNewTitle('');
  };

  // تبديل حالة الإنجاز عبر Array.prototype.map
  const toggleComplete = (id: string) => {
    const updated = todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    saveTodos(updated);
  };

  // حذف مهمة عبر Array.prototype.filter
  const deleteTodo = (id: string) => {
    const updated = todos.filter((item) => item.id !== id);
    saveTodos(updated);
  };

  // بدء التعديل
  const startEdit = (item: TodoItem) => {
    setEditingId(item.id);
    setEditingText(item.title);
  };

  // حفظ التعديل
  const saveEdit = (id: string) => {
    const trimmed = editingText.trim();
    if (trimmed) {
      const updated = todos.map((item) =>
        item.id === id ? { ...item, title: trimmed } : item
      );
      saveTodos(updated);
    }
    setEditingId(null);
  };

  // مسح المهام المكتملة
  const clearCompleted = () => {
    const updated = todos.filter((item) => !item.completed);
    saveTodos(updated);
  };

  // إعادة ضبط المهام الافتراضية
  const resetToDefaults = () => {
    saveTodos(DEFAULT_TODOS);
  };

  // التصفية والبحث
  const filteredTodos = useMemo(() => {
    return todos.filter((item) => {
      const matchesFilter =
        filter === 'all'
          ? true
          : filter === 'active'
          ? !item.completed
          : item.completed;
      const matchesSearch =
        searchQuery.trim() === ''
          ? true
          : item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [todos, filter, searchQuery]);

  // إحصائيات سريعة
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-8 select-none" dir="rtl">
      {/* بطاقات الإحصائيات الحية */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-border bg-card/60 backdrop-blur flex items-center justify-between">
          <div>
            <span className="text-xs text-foreground-muted font-medium">إجمالي المهام</span>
            <div className="text-2xl font-black text-foreground font-mono">{totalCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center font-bold text-foreground-secondary">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card/60 backdrop-blur flex items-center justify-between">
          <div>
            <span className="text-xs text-foreground-muted font-medium">قيد التنفيذ</span>
            <div className="text-2xl font-black text-amber-400 font-mono">{activeCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card/60 backdrop-blur flex items-center justify-between">
          <div>
            <span className="text-xs text-foreground-muted font-medium">المكتملة بنجاح</span>
            <div className="text-2xl font-black text-emerald-400 font-mono">{completedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card/60 backdrop-blur flex items-center justify-between">
          <div>
            <span className="text-xs text-foreground-muted font-medium">نسبة الإنجاز</span>
            <div className="text-2xl font-black text-cyan-400 font-mono">{completionPercent}%</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-xs font-mono">
            {completionPercent}%
          </div>
        </div>
      </div>

      {/* لوحة التحكم والإضافة */}
      <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-xl space-y-6">
        <form onSubmit={handleAddTodo} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="اكتب عنوان المهمة الجديدة هنا..."
              className="flex-1 px-4 py-3 rounded-2xl border border-border bg-muted/40 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />

            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as Priority)}
              className="px-3 py-3 rounded-2xl border border-border bg-muted/40 text-foreground text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="low">أولوية منخفضة</option>
              <option value="medium">أولوية متوسطة</option>
              <option value="high">أولوية عاجلة</option>
            </select>

            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-sm transition-all shadow-md shadow-amber-500/20 inline-flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة المهمة</span>
            </button>
          </div>
        </form>

        {/* شريط الفرز والبحث */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border">
          {/* البحث بالكلمات */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-foreground-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في المهام..."
              className="w-full pr-10 pl-3 py-2 rounded-xl border border-border bg-muted/30 text-xs text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* أزرار الفلترة */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
            {(['all', 'active', 'completed'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === st
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-muted/40 text-foreground-secondary hover:bg-muted hover:text-foreground'
                }`}
              >
                {st === 'all' ? 'الكل' : st === 'active' ? 'قيد التنفيذ' : 'المكتملة'}
              </button>
            ))}
          </div>
        </div>

        {/* قائمة المهام */}
        <div className="space-y-2.5">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-10 text-foreground-muted space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto opacity-40 text-cyan-400" />
              <p className="text-xs">لا توجد مهام مطابقة للشروط المحددة</p>
            </div>
          ) : (
            filteredTodos.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  item.completed
                    ? 'border-border/50 bg-muted/20 opacity-70'
                    : 'border-border bg-card/80 hover:border-amber-500/30'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => toggleComplete(item.id)}
                    className="text-foreground-muted hover:text-amber-400 transition-colors shrink-0"
                  >
                    {item.completed ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>

                  {editingId === item.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        autoFocus
                        className="flex-1 px-3 py-1 text-xs rounded-lg border border-amber-500 bg-muted/60 text-foreground focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => saveEdit(item.id)}
                        className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="p-1 rounded-md bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`text-sm font-medium truncate ${
                        item.completed
                          ? 'line-through text-foreground-muted'
                          : 'text-foreground'
                      }`}
                    >
                      {item.title}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      item.priority === 'high'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/25'
                        : item.priority === 'medium'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                        : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25'
                    }`}
                  >
                    {item.priority === 'high'
                      ? 'عاجل'
                      : item.priority === 'medium'
                      ? 'متوسط'
                      : 'منخفض'}
                  </span>

                  {editingId !== item.id && (
                    <>
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted/50 transition-colors"
                        title="تعديل العنوان"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTodo(item.id)}
                        className="p-1.5 rounded-lg text-foreground-muted hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="حذف المهمة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* إجراءات سفلية */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border text-xs">
          <span className="text-foreground-muted">
            يتم حفظ كافة التغييرات محلياً في المتصفح عبر <code>LocalStorage</code>.
          </span>

          <div className="flex items-center gap-3">
            {completedCount > 0 && (
              <button
                type="button"
                onClick={clearCompleted}
                className="text-rose-400 hover:text-rose-300 font-semibold transition-colors"
              >
                مسح المكتملة ({completedCount})
              </button>
            )}

            <button
              type="button"
              onClick={resetToDefaults}
              className="text-foreground-muted hover:text-foreground font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة النماذج الافتراضية</span>
            </button>
          </div>
        </div>
      </div>

      {/* زر كاشف الكود البرمجي */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setShowInspector((prev) => !prev)}
          className="px-4 py-2 rounded-xl border border-border bg-card/60 hover:bg-card text-foreground-secondary hover:text-foreground text-xs font-bold inline-flex items-center gap-2 transition-all"
        >
          <Code2 className="w-4 h-4 text-amber-400" />
          <span>
            {showInspector
              ? 'إخفاء فحص كود التحديث غير القابل للتعديل'
              : 'فحص شفرة التحديث الهندسي (Immutable CRUD Logic)'}
          </span>
        </button>
      </div>

      {showInspector && (
        <div
          className="rounded-2xl border border-border bg-slate-950 p-5 space-y-4 text-xs font-mono text-slate-300 leading-relaxed text-left"
          dir="ltr"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-amber-400 font-bold">JavaScript Array Transformation Engine</span>
            <span className="text-[11px] text-slate-500">Zero Mutation Principles</span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-slate-400 text-[11px] mb-1 font-sans">// 1. إضافة مهمة جديدة دون تعديل المصفوفة الأصلية (Push Trap)</p>
              <pre className="text-emerald-400 bg-slate-900 p-2.5 rounded-lg overflow-x-auto">
{`// لا نستخدم todos.push(newItem) لأنها تعدل المرجع الأصلي
const nextTodos = [newItem, ...todos];`}
              </pre>
            </div>

            <div>
              <p className="text-slate-400 text-[11px] mb-1 font-sans">// 2. تبديل حالة عنصر باستخدام map و Object Spread</p>
              <pre className="text-cyan-400 bg-slate-900 p-2.5 rounded-lg overflow-x-auto">
{`const updatedTodos = todos.map(item => 
  item.id === targetId ? { ...item, completed: !item.completed } : item
);`}
              </pre>
            </div>

            <div>
              <p className="text-slate-400 text-[11px] mb-1 font-sans">// 3. حذف عنصر عبر filter دون التلاعب بالمؤشرات (Splice Trap)</p>
              <pre className="text-amber-300 bg-slate-900 p-2.5 rounded-lg overflow-x-auto">
{`const remainingTodos = todos.filter(item => item.id !== targetId);`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
