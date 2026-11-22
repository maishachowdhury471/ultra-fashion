'use client';
import React, { useRef } from 'react';
import { FALLBACK_IMG, formatPrice, type Product } from '../lib/products';

export function ProductImage({ product, className }: { product: Product; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      className={className}
      onError={(e) => {
        const t = e.currentTarget;
        if (t.src !== FALLBACK_IMG) t.src = FALLBACK_IMG;
      }}
    />
  );
}

export function TiltCard({ product, onQuickView }: { product: Product; onQuickView: (p: Product) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 14}deg) rotateX(${(0.5 - y) * 14}deg) translateY(-4px)`;
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  }

  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="tilt-card relative overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-ultra-800"
    >
      <div className="tilt-glare" />
      <a href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 dark:bg-ultra-700">
          <ProductImage product={product} className="h-full w-full object-cover" />
          {product.badge && (
            <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-1 text-[11px] font-bold text-white">{product.badge}</span>
          )}
          <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[11px] font-bold text-white">-{discount}%</span>
        </div>
      </a>
      <div className="tilt-inner p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{product.category} · {product.ageLabel}</p>
        <a href={`/product/${product.id}`} className="mt-1 line-clamp-2 block min-h-[2.5rem] text-sm font-semibold leading-snug text-gray-900 hover:text-red-600 dark:text-white">
          {product.name}
        </a>
        <p className="mt-1 text-xs text-amber-500">{'★'.repeat(Math.round(product.rating))} <span className="text-gray-500 dark:text-gray-400">{product.rating} ({product.reviews})</span></p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
          <span className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
        </div>
        <button
          onClick={() => onQuickView(product)}
          className="mt-3 w-full rounded-xl bg-black py-2.5 text-sm font-bold text-white transition hover:bg-red-600 dark:bg-white dark:text-black dark:hover:bg-red-600 dark:hover:text-white"
        >
          Quick View
        </button>
      </div>
    </div>
  );
}
