'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, formatPrice } from '../lib/products';
import { ProductImage } from './ProductCard';

function useCountdown() {
  const [left, setLeft] = useState(0);
  useEffect(() => {
    const target = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      return Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
    };
    setLeft(target());
    const t = setInterval(() => setLeft(target()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(left / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;
  return { h, m, s };
}

export function FlashSale() {
  const { h, m, s } = useCountdown();
  const deals = PRODUCTS.filter((p) => p.badge === 'Best Seller').slice(0, 6);
  return (
    <section className="mx-auto mt-10 max-w-7xl px-3 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">⚡ Flash Sale <span className="text-red-600">up to 45% OFF</span></h2>
        <div className="flex items-center gap-1 text-sm font-bold">
          <span className="rounded bg-black px-2 py-1 text-white dark:bg-white dark:text-black">{String(h).padStart(2, '0')}h</span>:
          <span className="rounded bg-black px-2 py-1 text-white dark:bg-white dark:text-black">{String(m).padStart(2, '0')}m</span>:
          <span className="rounded bg-red-600 px-2 py-1 text-white">{String(s).padStart(2, '0')}s</span>
          <span className="ml-2 font-normal text-gray-500">ends tonight</span>
        </div>
      </div>
      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-2">
        {deals.map((p) => {
          const sold = Math.min(92, 30 + (p.reviews % 60));
          return (
            <Link key={p.id} href={`/product/${p.id}`} className="w-44 shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-ultra-800 sm:w-56">
              <div className="aspect-square w-full overflow-hidden bg-gray-100">
                <ProductImage product={p} className="h-full w-full object-cover" />
              </div>
              <div className="p-3">
                <p className="line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white">{p.name}</p>
                <p className="mt-1"><span className="font-extrabold text-red-600">{formatPrice(p.price)}</span> <span className="text-xs text-gray-400 line-through">{formatPrice(p.oldPrice)}</span></p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div className="h-full rounded-full bg-red-600" style={{ width: `${sold}%` }} />
                </div>
                <p className="mt-1 text-[11px] text-gray-500">{sold}% sold</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function SizeGuide() {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-gray-100 dark:bg-ultra-700">
          <tr><th className="p-3">Age group</th><th className="p-3">Sizes</th><th className="p-3">Chest / Fit note</th></tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          <tr><td className="p-3 font-semibold">Baby 0–2</td><td className="p-3">0-3M, 3-6M, 6-12M, 12-18M, 18-24M</td><td className="p-3">Soft cotton, snap buttons</td></tr>
          <tr><td className="p-3 font-semibold">Boys 3–12</td><td className="p-3">3-4Y, 5-6Y, 7-8Y, 9-10Y, 11-12Y</td><td className="p-3">Room to grow, durable seams</td></tr>
          <tr><td className="p-3 font-semibold">Teens 13–19</td><td className="p-3">XS, S, M, L</td><td className="p-3">Slim / regular fit</td></tr>
          <tr><td className="p-3 font-semibold">Men 20+</td><td className="p-3">S, M, L, XL, XXL</td><td className="p-3">S 38&quot;, M 40&quot;, L 42&quot;, XL 44&quot;, XXL 46&quot;</td></tr>
          <tr><td className="p-3 font-semibold">Shoes / Sneakers</td><td className="p-3">UK 6 – UK 11</td><td className="p-3">True to size; size up for wide feet</td></tr>
        </tbody>
      </table>
    </div>
  );
}
