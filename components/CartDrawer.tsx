'use client';
import React from 'react';
import Link from 'next/link';
import { formatPrice } from '../lib/products';
import { useStore } from '../lib/store';
import { ProductImage } from './ProductCard';

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal } = useStore();
  if (!cartOpen) return null;
  const freeShip = cartTotal >= 2000;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-ultra-800">
        <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
          <h2 className="text-lg font-extrabold dark:text-white">Your Cart ({cart.reduce((s, i) => s + i.qty, 0)})</h2>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart" className="rounded-full border px-3 py-1 text-lg dark:text-white">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty. <Link href="/shop" onClick={() => setCartOpen(false)} className="font-bold text-red-600">Start shopping →</Link></p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.product.id + item.size} className="flex gap-3 rounded-2xl border border-gray-200 p-3 dark:border-gray-700">
                  <ProductImage product={item.product} className="h-20 w-16 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold dark:text-white">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Size: {item.size}</p>
                    <p className="mt-1 font-bold text-red-600">{formatPrice(item.product.price)} × {item.qty}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => updateQty(item.product.id, item.size, item.qty - 1)} className="rounded border px-2 dark:text-white">−</button>
                      <span className="dark:text-white">{item.qty}</span>
                      <button onClick={() => updateQty(item.product.id, item.size, item.qty + 1)} className="rounded border px-2 dark:text-white">+</button>
                      <button onClick={() => removeFromCart(item.product.id, item.size)} className="ml-auto text-xs font-bold text-red-600">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="border-t p-4 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300">{freeShip ? '🎉 FREE delivery — order over ৳2,000' : `Add ${formatPrice(2000 - cartTotal)} more for FREE delivery`}</p>
            <p className="mt-2 flex justify-between text-lg font-extrabold dark:text-white"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></p>
            <Link href="/checkout" onClick={() => setCartOpen(false)} className="mt-3 block rounded-xl bg-red-600 py-3 text-center text-sm font-bold text-white">Proceed to Checkout</Link>
          </div>
        )}
      </aside>
    </div>
  );
}
