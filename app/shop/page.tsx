'use client';
import React, { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AGE_GROUPS, CATEGORIES, PRODUCTS, formatPrice, type Product } from '../../lib/products';
import { TiltCard } from '../../components/ProductCard';
import { QuickView } from '../../components/QuickView';

function ShopInner() {
  const params = useSearchParams();
  const initialQ = params.get('q') ?? '';
  const initialAge = params.get('age') ?? '';
  const initialCat = params.get('category') ?? '';
  const [q, setQ] = useState(initialQ);
  const [age, setAge] = useState(initialAge);
  const [category, setCategory] = useState(initialCat);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [sort, setSort] = useState('featured');
  const [shown, setShown] = useState(24);
  const [quick, setQuick] = useState<Product | null>(null);

  const allSizes = useMemo(() => Array.from(new Set(PRODUCTS.flatMap((p) => p.sizes))), []);
  const allColors = useMemo(() => Array.from(new Set(PRODUCTS.flatMap((p) => p.colors))).sort(), []);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q.toLowerCase()) && !p.category.toLowerCase().includes(q.toLowerCase())) return false;
      if (age && p.ageGroup !== age) return false;
      if (category && p.category !== category) return false;
      if (p.price > maxPrice) return false;
      if (size && !p.sizes.includes(size)) return false;
      if (color && !p.colors.includes(color)) return false;
      return true;
    });
    if (sort === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'newest') list = [...list].reverse();
    return list;
  }, [q, age, category, maxPrice, size, color, sort]);

  const visible = filtered.slice(0, shown);

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6">
      <h1 className="text-3xl font-black dark:text-white">Shop All Products <span className="text-red-600">({filtered.length} of 300)</span></h1>

      <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-ultra-800 lg:flex-row lg:flex-wrap lg:items-center">
        <input value={q} onChange={(e) => { setQ(e.target.value); setShown(24); }} placeholder="Search products…" className="min-w-0 flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none dark:border-gray-600 dark:bg-ultra-900 dark:text-white" />
        <select value={age} onChange={(e) => { setAge(e.target.value); setShown(24); }} className="rounded-xl border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-ultra-900 dark:text-white">
          <option value="">All ages</option>
          {AGE_GROUPS.map((a) => (<option key={a.key} value={a.key}>{a.label} {a.range}</option>))}
        </select>
        <select value={category} onChange={(e) => { setCategory(e.target.value); setShown(24); }} className="rounded-xl border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-ultra-900 dark:text-white">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
        <select value={size} onChange={(e) => setSize(e.target.value)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-ultra-900 dark:text-white">
          <option value="">Any size</option>
          {allSizes.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>
        <select value={color} onChange={(e) => setColor(e.target.value)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-ultra-900 dark:text-white">
          <option value="">Any colour</option>
          {allColors.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-ultra-900 dark:text-white">
          <option value="featured">Sort: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <label className="mt-4 block text-sm font-semibold dark:text-white">
        Max price: {formatPrice(maxPrice)}
        <input type="range" min={500} max={10000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="mt-1 w-full max-w-sm accent-red-600" />
      </label>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">No products match your filters. Try clearing a filter.</p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {visible.map((p) => (<TiltCard key={p.id} product={p} onQuickView={setQuick} />))}
          </div>
          {shown < filtered.length && (
            <div className="mt-8 text-center">
              <button onClick={() => setShown((s) => s + 24)} className="rounded-full bg-black px-8 py-3 text-sm font-bold text-white dark:bg-white dark:text-black">
                Load More ({filtered.length - shown} left)
              </button>
            </div>
          )}
        </>
      )}
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading shop…</div>}>
      <ShopInner />
    </Suspense>
  );
}
