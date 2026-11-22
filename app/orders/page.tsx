'use client';
import React from 'react';
import Link from 'next/link';
import { formatPrice } from '../../lib/products';
import { useStore } from '../../lib/store';

export default function OrdersPage() {
  const { orders, wishlist } = useStore();
  return (
    <div className="mx-auto max-w-4xl px-3 py-6 sm:px-6">
      <h1 className="text-3xl font-black dark:text-white">My Orders</h1>
      <p className="mt-1 text-sm text-gray-500">Orders are saved in this browser only (frontend-only test store, no backend).</p>
      {orders.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed p-10 text-center">
          <p className="text-lg font-bold dark:text-white">No orders yet</p>
          <p className="mt-1 text-gray-500">Place your first order and it will appear here.</p>
          <Link href="/shop" className="mt-4 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold text-white dark:bg-white dark:text-black">Start Shopping</Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <article key={o.id} className="rounded-3xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-ultra-800">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="font-extrabold dark:text-white">{o.id} <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">{o.status}</span></p>
                <p className="text-sm text-gray-500">{new Date(o.date).toLocaleString()}</p>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{o.name} · {o.mobile} · {o.address}</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Payment: {o.payment} · Delivery: {o.deliveryCharge === 0 ? 'FREE' : formatPrice(o.deliveryCharge)}</p>
              <ul className="mt-3 space-y-1 text-sm dark:text-white">
                {o.items.map((it) => (
                  <li key={it.id + it.size} className="flex justify-between gap-2"><span>{it.name} — {it.size} × {it.qty}</span><span className="font-bold">{formatPrice(it.price * it.qty)}</span></li>
                ))}
              </ul>
              <p className="mt-3 border-t pt-2 text-right text-lg font-extrabold dark:text-white">Total: {formatPrice(o.total)}</p>
            </article>
          ))}
        </div>
      )}
      <p className="mt-8 text-sm text-gray-500">Wishlist: {wishlist.length} item(s) saved in this browser.</p>
    </div>
  );
}
