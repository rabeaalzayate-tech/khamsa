'use client';

import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const STORE_PRODUCTS: Product[] = [
  { id: 'p1', name: 'لوحة مفاتيح ميكانيكية احترافية', price: 1450, category: 'عتاد' },
  { id: 'p2', name: 'فأرة ألعاب لاسلكية فائقة الدقة', price: 850, category: 'عتاد' },
  { id: 'p3', name: 'سماعة رأس عازلة للضوضاء', price: 2100, category: 'صوتيات' },
  { id: 'p4', name: 'شاشة ألعاب 27 بوصة 165Hz', price: 5400, category: 'شاشات' },
  { id: 'p5', name: 'قاعدة شحن لاسلكية سريعة', price: 420, category: 'ملحقات' },
];

export default function ShoppingCartApp() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 'p1', name: 'لوحة مفاتيح ميكانيكية احترافية', price: 1450, category: 'عتاد', quantity: 1 },
    { id: 'p2', name: 'فأرة ألعاب لاسلكية فائقة الدقة', price: 850, category: 'عتاد', quantity: 2 },
  ]);
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeItem = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = coupon.trim().toUpperCase();
    if (code === 'KHAMSA10') {
      setDiscountPercent(10);
    } else if (code === 'VIP20') {
      setDiscountPercent(20);
    } else {
      setCouponError('كوبون غير صالح. جرب KHAMSA10 أو VIP20');
      setDiscountPercent(0);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 0 ? 50 : 0;
  const vat = (subtotal - discountAmount) * 0.14; // 14% VAT
  const grandTotal = subtotal - discountAmount + shipping + vat;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products Catalog */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">المنتجات المتاحة</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STORE_PRODUCTS.map(product => (
                <div
                  key={product.id}
                  className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-2 mb-1">{product.name}</h4>
                    <div className="text-lg font-black text-amber-400 mb-4">{formatCurrency(product.price)}</div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    + إضافة إلى السلة
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Items List */}
          <div className="border-t border-slate-800 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">عناصر السلة ({cart.length})</h3>
            {cart.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">السلة فارغة حالياً.</div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl"
                  >
                    <div>
                      <div className="text-sm font-bold text-white">{item.name}</div>
                      <div className="text-xs text-amber-400 font-semibold">{formatCurrency(item.price)} للقطعة</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-slate-800 rounded-lg overflow-hidden bg-slate-900">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2.5 py-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-sm"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2.5 py-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-sm"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-sm font-black text-white min-w-[80px] text-left">
                        {formatCurrency(item.price * item.quantity)}
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 text-sm transition-colors cursor-pointer"
                        title="حذف"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary & Coupon Checkout */}
        <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-6 h-fit">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">ملخص الحساب</h3>

          {/* Coupon Input */}
          <form onSubmit={applyCoupon} className="space-y-2">
            <label className="block text-xs font-medium text-slate-400">كود الخصم (Coupon)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                placeholder="كود الخصم (مثال: KHAMSA10)"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-xs uppercase"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                تطبيق
              </button>
            </div>
            {couponError && <p className="text-rose-400 text-xs">{couponError}</p>}
            {discountPercent > 0 && (
              <p className="text-emerald-400 text-xs font-semibold">تم تطبيق خصم بقيمة {discountPercent}%</p>
            )}
          </form>

          {/* Price Breakdown */}
          <div className="space-y-3 text-sm text-slate-400 border-t border-slate-800 pt-4">
            <div className="flex justify-between">
              <span>المجموع الفرعي:</span>
              <span className="text-white font-medium">{formatCurrency(subtotal)}</span>
            </div>

            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>الخصم المطبق:</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>مصاريف الشحن:</span>
              <span className="text-white font-medium">{formatCurrency(shipping)}</span>
            </div>

            <div className="flex justify-between">
              <span>ضريبة القيمة المضافة (14%):</span>
              <span className="text-white font-medium">{formatCurrency(vat)}</span>
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline text-white">
              <span className="font-bold text-base">الإجمالي النهائي:</span>
              <span className="text-2xl font-black text-amber-400">{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <button
            disabled={cart.length === 0}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 text-slate-950 font-black py-3 rounded-xl transition-colors cursor-pointer text-sm"
          >
            إتمام الشراء الآمن
          </button>
        </div>
      </div>
    </div>
  );
}
