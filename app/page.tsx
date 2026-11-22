'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { AGE_GROUPS, CATEGORIES, PRODUCTS, type Product } from '../lib/products';
import { TiltCard, ProductImage } from '../components/ProductCard';
import { FlashSale } from '../components/FlashSale';
import { QuickView } from '../components/QuickView';

export default function HomePage() {
  const [quick, setQuick] = useState<Product | null>(null);
  const [shown, setShown] = useState(24);
  const hero = PRODUCTS.find((p) => p.id === 'p012') ?? PRODUCTS[0];
  const featured = useMemo(() => PRODUCTS.slice(0, shown), [shown]);

  return (
    <div>
      {/* Nike-style bold hero */}
      <section className="relative overflow-hidden bg-ultra-900 text-white">
        <div className="absolute inset-0 opacity-40">
          <ProductImage product={hero} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs font-bold tracking-[0.3em] text-amber-400 sm:text-sm">ULTRA MENS COLLECTION — 300 PRODUCTS</p>
          <h1 className="mt-3 max-w-full text-5xl font-black leading-[0.95] sm:text-7xl lg:text-8xl">
            JUST<br />SHOP IT<span className="text-red-600">.</span>
          </h1>
          <p className="mt-4 max-w-md text-base text-gray-200 sm:text-lg">
            Premium men&apos;s fashion for every age — Baby 0–2, Boys 3–12, Teens 13–19, Men 20+. Bold looks, honest prices in Taka.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-black hover:bg-amber-400">Shop All 300 →</Link>
            <Link href="/shop?age=Men" className="rounded-full border border-white/60 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">Men 20+</Link>
          </div>
        </div>
      </section>

      {/* Shop by Age */}
      <section className="mx-auto mt-10 max-w-7xl px-3 sm:px-6">
        <h2 className="text-2xl font-black dark:text-white sm:text-3xl">Shop by Age</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {AGE_GROUPS.map((a) => (
            <Link key={a.key} href={`/shop?age=${a.key}`} className="rounded-2xl bg-black p-5 text-white transition hover:bg-red-600 dark:bg-ultra-800">
              <p className="text-2xl font-black">{a.label}</p>
              <p className="text-sm text-gray-300">Age {a.range} years</p>
              <p className="mt-2 text-xs font-bold text-amber-400">{PRODUCTS.filter((p) => p.ageGroup === a.key).length} products →</p>
            </Link>
          ))}
        </div>
      </section>

      <FlashSale />

      {/* Categories */}
      <section className="mx-auto mt-10 max-w-7xl px-3 sm:px-6">
        <h2 className="text-2xl font-black dark:text-white sm:text-3xl">Shop by Category</h2>
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((c) => (
            <Link key={c} href={`/shop?category=${encodeURIComponent(c)}`} className="whitespace-nowrap rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold hover:border-red-600 hover:text-red-600 dark:border-gray-600 dark:bg-ultra-800 dark:text-white">
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto mt-10 max-w-7xl px-3 sm:px-6">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl font-black dark:text-white sm:text-3xl">Featured Products</h2>
          <Link href="/shop" className="shrink-0 text-sm font-bold text-red-600">View all 300 →</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {featured.map((p) => (
            <TiltCard key={p.id} product={p} onQuickView={setQuick} />
          ))}
        </div>
        {shown < PRODUCTS.length && (
          <div className="mt-8 text-center">
            <button onClick={() => setShown((s) => s + 24)} className="rounded-full bg-black px-8 py-3 text-sm font-bold text-white dark:bg-white dark:text-black">
              Load More ({PRODUCTS.length - shown} left)
            </button>
          </div>
        )}
      </section>

      {/* Trust strip */}
      <section className="mx-auto mt-12 max-w-7xl px-3 sm:px-6">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ['🚚', 'Fast Delivery', 'Dhaka ৳60 · Outside ৳120'],
            ['💳', 'Easy Payment', 'bKash · Nagad · COD · Card'],
            ['↩️', '7-Day Return', 'Easy exchange & return'],
            ['⭐', '300 Products', 'Baby to Men, all ages'],
          ].map(([icon, title, sub]) => (
            <div key={title} className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-ultra-800">
              <p className="text-2xl">{icon}</p>
              <p className="mt-2 font-bold dark:text-white">{title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
