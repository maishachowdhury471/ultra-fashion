'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { formatPrice, relatedProducts, type Product } from '../lib/products';
import { useStore } from '../lib/store';
import { ProductImage } from './ProductCard';

export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  if (!product) return null;
  const related = relatedProducts(product, 4);
  const wished = wishlist.includes(product.id);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white p-4 dark:bg-ultra-800 sm:rounded-3xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white sm:text-xl">{product.name}</h3>
          <button onClick={onClose} aria-label="Close quick view" className="rounded-full border px-3 py-1 text-lg dark:text-white">✕</button>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-gray-100">
            <ProductImage product={product} className="aspect-[4/5] w-full object-cover" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{product.category} · {product.ageLabel}</p>
            <p className="mt-1 text-amber-500">★ {product.rating} ({product.reviews} reviews) · Stock: {product.stock}</p>
            <p className="mt-2"><span className="text-2xl font-extrabold text-gray-900 dark:text-white">{formatPrice(product.price)}</span> <span className="text-gray-400 line-through">{formatPrice(product.oldPrice)}</span></p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
            <p className="mt-4 text-sm font-bold text-gray-900 dark:text-white">Select size</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${size === s ? 'border-red-600 bg-red-600 text-white' : 'border-gray-300 dark:border-gray-600 dark:text-white'}`}>{s}</button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="rounded-lg border px-3 py-2 dark:text-white">−</button>
              <span className="w-8 text-center font-bold dark:text-white">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="rounded-lg border px-3 py-2 dark:text-white">+</button>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                onClick={() => { if (!size) { alert('Please select a size first.'); return; } addToCart(product, size, qty); onClose(); }}
                className="flex-1 rounded-xl bg-black py-3 text-sm font-bold text-white dark:bg-white dark:text-black"
              >
                Add to Cart
              </button>
              <button onClick={() => toggleWishlist(product.id)} className="flex-1 rounded-xl border border-gray-300 py-3 text-sm font-bold dark:border-gray-600 dark:text-white">
                {wished ? '♥ Wishlisted' : '♡ Wishlist'}
              </button>
            </div>
            <Link href={`/product/${product.id}`} onClick={onClose} className="mt-3 block text-center text-sm font-semibold text-red-600">View full details →</Link>
          </div>
        </div>
        <p className="mt-6 font-bold text-gray-900 dark:text-white">Related products</p>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {related.map((r) => (
            <Link key={r.id} href={`/product/${r.id}`} onClick={onClose} className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <ProductImage product={r} className="aspect-square w-full object-cover" />
              <p className="line-clamp-1 p-2 text-xs font-semibold dark:text-white">{r.name}</p>
              <p className="px-2 pb-2 text-xs font-bold text-red-600">{formatPrice(r.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
