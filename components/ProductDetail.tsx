'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { formatPrice, relatedProducts, type Product } from '../lib/products';
import { useStore } from '../lib/store';
import { ProductImage, TiltCard } from './ProductCard';
import { SizeGuide } from './FlashSale';
import { QuickView } from './QuickView';

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [quick, setQuick] = useState<Product | null>(null);
  const related = relatedProducts(product, 4);
  const wished = wishlist.includes(product.id);
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-red-600">Home</Link> / <Link href="/shop" className="hover:text-red-600">Shop</Link> / {product.category}
      </p>
      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-gray-100">
          <ProductImage product={product} className="aspect-[4/5] w-full object-cover" />
        </div>
        <div>
          {product.badge && <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">{product.badge}</span>}
          <h1 className="mt-2 text-2xl font-black leading-tight dark:text-white sm:text-3xl">{product.name}</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.category} · {product.ageLabel} · Colours: {product.colors.join(', ')}</p>
          <p className="mt-2 text-amber-500">★ {product.rating} ({product.reviews} reviews) · In stock: {product.stock}</p>
          <p className="mt-3"><span className="text-3xl font-extrabold dark:text-white">{formatPrice(product.price)}</span> <span className="text-lg text-gray-400 line-through">{formatPrice(product.oldPrice)}</span> <span className="ml-1 rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">-{discount}% OFF</span></p>
          <p className="mt-3 text-gray-600 dark:text-gray-300">{product.description}</p>
          <p className="mt-5 text-sm font-bold dark:text-white">Select size</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`rounded-lg border px-4 py-2 text-sm font-semibold ${size === s ? 'border-red-600 bg-red-600 text-white' : 'border-gray-300 dark:border-gray-600 dark:text-white'}`}>{s}</button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="rounded-lg border px-3 py-2 dark:text-white">−</button>
            <span className="w-8 text-center font-bold dark:text-white">{qty}</span>
            <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="rounded-lg border px-3 py-2 dark:text-white">+</button>
          </div>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={() => { if (!size) { alert('Please select a size first.'); return; } addToCart(product, size, qty); }}
              className="flex-1 rounded-xl bg-black py-3 text-sm font-bold text-white dark:bg-white dark:text-black"
            >
              Add to Cart — {formatPrice(product.price * qty)}
            </button>
            <button onClick={() => toggleWishlist(product.id)} className="flex-1 rounded-xl border border-gray-300 py-3 text-sm font-bold dark:border-gray-600 dark:text-white">
              {wished ? '♥ Wishlisted' : '♡ Add to Wishlist'}
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">🚚 Delivery: Dhaka ৳60 · Outside Dhaka ৳120 · FREE over ৳2,000 · 💳 bKash / Nagad / COD / Card</p>
          <h2 className="mt-8 text-lg font-black dark:text-white">Size Guide — all ages</h2>
          <SizeGuide />
        </div>
      </div>
      <h2 className="mt-10 text-2xl font-black dark:text-white">Related Products</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {related.map((r) => (<TiltCard key={r.id} product={r} onQuickView={setQuick} />))}
      </div>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
