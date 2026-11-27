'use client';

import React, { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'راتب شهري', amount: 8500, type: 'income', category: 'راتب', date: '2026-11-01' },
  { id: '2', title: 'إيجار السكن', amount: 2200, type: 'expense', category: 'سكن', date: '2026-11-05' },
  { id: '3', title: 'تسوق وبقالة', amount: 650, type: 'expense', category: 'طعام', date: '2026-11-12' },
  { id: '4', title: 'مشروع حر Freelance', amount: 1800, type: 'income', category: 'عمل إضافي', date: '2026-11-18' },
  { id: '5', title: 'فاتورة الإنترنت والكهرباء', amount: 320, type: 'expense', category: 'خدمات', date: '2026-11-20' },
];

export default function ExpenseTrackerApp() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('عام');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Calculations using Array methods
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const filteredTransactions = transactions.filter(t => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!title.trim() || isNaN(numAmount) || numAmount <= 0) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: numAmount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([newTx, ...transactions]);
    setTitle('');
    setAmount('');
  };

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-semibold text-slate-400 mb-2">الرصيد الصافي الإجمالي</div>
          <div className={`text-2xl sm:text-3xl font-black ${netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {formatCurrency(netBalance)}
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-semibold text-slate-400 mb-2">إجمالي الإيرادات (Income)</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            {formatCurrency(totalIncome)}
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs font-semibold text-slate-400 mb-2">إجمالي النفقات (Expenses)</div>
          <div className="text-2xl sm:text-3xl font-black text-rose-400">
            {formatCurrency(totalExpense)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form to add transaction */}
        <div className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">إضافة عملية مالية جديدة</h3>
          <form onSubmit={handleAddTransaction} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">وصف العملية</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="مثال: فاتورة كهرباء، مكافأة..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">المبلغ (جنيه)</label>
              <input
                type="number"
                step="any"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">نوع العملية</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as 'income' | 'expense')}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-sm"
                >
                  <option value="expense">مصروف (-)</option>
                  <option value="income">إيراد (+)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">التصنيف</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-sm"
                >
                  <option value="عام">عام</option>
                  <option value="سكن">سكن</option>
                  <option value="طعام">طعام</option>
                  <option value="راتب">راتب</option>
                  <option value="عمل إضافي">عمل إضافي</option>
                  <option value="خدمات">خدمات</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl transition-colors cursor-pointer text-sm"
            >
              تسجيل العملية
            </button>
          </form>
        </div>

        {/* Transaction History List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">سجل العمليات المالية</h3>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${filterType === 'all' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
              >
                الكل
              </button>
              <button
                onClick={() => setFilterType('income')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${filterType === 'income' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
              >
                إيرادات
              </button>
              <button
                onClick={() => setFilterType('expense')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${filterType === 'expense' ? 'bg-rose-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
              >
                نفقات
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                لا توجد عمليات مسجلة في هذا التصنيف.
              </div>
            ) : (
              filteredTransactions.map(t => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${t.type === 'income' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    <div>
                      <div className="text-sm font-bold text-white">{t.title}</div>
                      <div className="text-xs text-slate-500">{t.category} &bull; {t.date}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`text-base font-black ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </span>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-slate-600 hover:text-rose-400 text-sm font-bold transition-colors cursor-pointer"
                      title="حذف"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
