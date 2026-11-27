'use client';

import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  stage: 'todo' | 'in_progress' | 'done';
  dueDate: string;
}

const INITIAL_TASKS: Task[] = [
  { id: 't-1', title: 'إعداد بيئة تشغيل TypeScript و Next.js', priority: 'high', stage: 'done', dueDate: '2026-11-20' },
  { id: 't-2', title: 'بناء محرك توثيق JavaScript الكامل 75 مقالة', priority: 'high', stage: 'in_progress', dueDate: '2026-11-27' },
  { id: 't-3', title: 'تصميم التطبيقات العشرة التطبيقية التفاعلية', priority: 'high', stage: 'in_progress', dueDate: '2026-11-27' },
  { id: 't-4', title: 'مراجعة معايير إمكانية الوصول والتوافقية الكاملة', priority: 'medium', stage: 'todo', dueDate: '2026-11-30' },
  { id: 't-5', title: 'نشر التحديثات النهائية على بيئة الإنتاج Vercel', priority: 'high', stage: 'todo', dueDate: '2026-11-30' },
];

export default function FinalProjectApp() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [selectedStage, setSelectedStage] = useState<'all' | Task['stage']>('all');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      priority,
      stage: 'todo',
      dueDate: new Date().toISOString().split('T')[0],
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
  };

  const moveTask = (id: string, newStage: Task['stage']) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, stage: newStage } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (selectedStage === 'all') return true;
    return t.stage === selectedStage;
  });

  const stagesCount = {
    todo: tasks.filter(t => t.stage === 'todo').length,
    in_progress: tasks.filter(t => t.stage === 'in_progress').length,
    done: tasks.filter(t => t.stage === 'done').length,
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      {/* Progress metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-semibold text-slate-400 mb-1">المهام قيد الانتظار (To Do)</div>
          <div className="text-2xl font-black text-amber-400">{stagesCount.todo}</div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-semibold text-slate-400 mb-1">قيد التنفيذ (In Progress)</div>
          <div className="text-2xl font-black text-sky-400">{stagesCount.in_progress}</div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-semibold text-slate-400 mb-1">المهام المكتملة (Completed)</div>
          <div className="text-2xl font-black text-emerald-400">{stagesCount.done}</div>
        </div>
      </div>

      {/* Add Task Input Form */}
      <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="عنوان المهمة الجديدة..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500"
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value as Task['priority'])}
          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
        >
          <option value="low">أولوية منخفضة</option>
          <option value="medium">أولوية متوسطة</option>
          <option value="high">أولوية عاجلة</option>
        </select>

        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer text-sm"
        >
          + إضافة مهمة
        </button>
      </form>

      {/* Filter Tabs */}
      <div className="flex gap-2 text-xs mb-6">
        {(['all', 'todo', 'in_progress', 'done'] as const).map(stage => (
          <button
            key={stage}
            onClick={() => setSelectedStage(stage)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
              selectedStage === stage ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {stage === 'all' ? 'جميع المهام' : stage === 'todo' ? 'قيد الانتظار' : stage === 'in_progress' ? 'قيد العمل' : 'مكتملة'}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">لا توجد مهام مطابقة.</div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-950/60 border border-slate-800 rounded-xl gap-4"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    task.priority === 'high' ? 'bg-rose-500' : task.priority === 'medium' ? 'bg-amber-400' : 'bg-sky-400'
                  }`}
                />
                <div>
                  <div className={`text-sm font-bold ${task.stage === 'done' ? 'text-slate-500 line-through' : 'text-white'}`}>
                    {task.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    تاريخ الاستحقاق: {task.dueDate} &bull; الأولوية: {task.priority}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {task.stage !== 'todo' && (
                  <button
                    onClick={() => moveTask(task.id, 'todo')}
                    className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-400 hover:text-white cursor-pointer"
                  >
                    إلى الانتظار
                  </button>
                )}
                {task.stage !== 'in_progress' && (
                  <button
                    onClick={() => moveTask(task.id, 'in_progress')}
                    className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-1 rounded text-sky-400 hover:text-sky-300 cursor-pointer"
                  >
                    قيد العمل
                  </button>
                )}
                {task.stage !== 'done' && (
                  <button
                    onClick={() => moveTask(task.id, 'done')}
                    className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-1 rounded text-emerald-400 hover:text-emerald-300 cursor-pointer"
                  >
                    إكمال
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-slate-600 hover:text-rose-400 text-sm font-bold px-2 cursor-pointer"
                  title="حذف المهمة"
                >
                  &times;
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
