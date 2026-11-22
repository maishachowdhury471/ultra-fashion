'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../lib/store';
import { AGE_GROUPS, CATEGORIES } from '../lib/products';

export function Header() {
  const { cartCount, wishlist, toggleTheme, theme, setCartOpen } = useStore();
  const [q, setQ] = useState('');
  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur dark:bg-ultra-900/95">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="flex items-center gap-2 py-3 sm:gap-4">
          <Link href="/" className="shrink-0 text-2xl font-black tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            ULTRA<span className="text-red-600">.</span>
          </Link>
          <form
            action="/shop"
            method="get"
            className="flex min-w-0 flex-1 items-center overflow-hidden rounded-full border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-ultra-800"
          >
            <input
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search panjabi, jeans, sneakers…"
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none dark:text-white sm:px-4"
            />
            <button type="submit" className="shrink-0 bg-amber-400 px-3 py-2 text-sm font-bold text-black hover:bg-amber-500 sm:px-5">Search</button>
          </form>
          <button onClick={toggleTheme} aria-label="Toggle theme" className="shrink-0 rounded-full border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:text-white">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <Link href="/orders" className="hidden shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-ultra-800 sm:block">Orders</Link>
          <Link href="/shop" className="hidden shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-ultra-800 md:block">Shop</Link>
          <button onClick={() => setCartOpen(true)} className="relative shrink-0 rounded-full bg-black px-4 py-2 text-sm font-bold text-white dark:bg-white dark:text-black">
            🛒 Cart {cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[11px] text-white">{cartCount}</span>}
          </button>
          <span className="hidden shrink-0 text-sm text-gray-500 dark:text-gray-400 lg:block">♥ {wishlist.length}</span>
        </div>
        <nav className="no-scrollbar flex gap-1 overflow-x-auto pb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Link href="/shop" className="whitespace-nowrap rounded-full px-3 py-1 hover:bg-gray-100 dark:hover:bg-ultra-800">All Products</Link>
          {AGE_GROUPS.map((a) => (
            <Link key={a.key} href={`/shop?age=${a.key}`} className="whitespace-nowrap rounded-full px-3 py-1 hover:bg-gray-100 dark:hover:bg-ultra-800">
              {a.label} {a.range}
            </Link>
          ))}
          {CATEGORIES.slice(0, 6).map((c) => (
            <Link key={c} href={`/shop?category=${encodeURIComponent(c)}`} className="whitespace-nowrap rounded-full px-3 py-1 hover:bg-gray-100 dark:hover:bg-ultra-800">{c}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 bg-ultra-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-2xl font-black text-white">ULTRA<span className="text-red-600">.</span></p>
          <p className="mt-2 text-sm">Premium men&apos;s collection for every age — Baby 0–2, Boys 3–12, Teens 13–19, Men 20+. Frontend-only test store.</p>
        </div>
        <div>
          <p className="font-bold text-white">Shop</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/shop?age=Baby">Baby 0–2</Link></li>
            <li><Link href="/shop?age=Boys">Boys 3–12</Link></li>
            <li><Link href="/shop?age=Teens">Teens 13–19</Link></li>
            <li><Link href="/shop?age=Men">Men 20+</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-white">Help</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/orders">My Orders</Link></li>
            <li><Link href="/shop">Size Guide — see any product page</Link></li>
            <li>Delivery: Dhaka ৳60, Outside Dhaka ৳120</li>
            <li>Payment: bKash, Nagad, COD, Card</li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-white">Contact</p>
          <p className="mt-2 text-sm">Dhaka, Bangladesh<br />Cash on Delivery available<br />7-day easy return</p>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs">© 2026 ULTRA Mens Collection — frontend-only test store. No backend.</div>
    </footer>
  );
}
