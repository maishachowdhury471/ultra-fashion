'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '../../lib/products';
import { useStore, type Order } from '../../lib/store';

const PAYMENTS = ['bKash', 'Nagad', 'Cash on Delivery', 'Card'] as const;

export default function CheckoutPage() {
  const { cart, cartTotal, placeOrder, setCartOpen } = useStore();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [zone, setZone] = useState<'inside' | 'outside'>('inside');
  const [payment, setPayment] = useState<string>('Cash on Delivery');
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState<Order | null>(null);

  const deliveryCharge = useMemo(() => {
    if (cartTotal >= 2000) return 0;
    return zone === 'inside' ? 60 : 120;
  }, [cartTotal, zone]);
  const grandTotal = cartTotal + deliveryCharge;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: string[] = [];
    if (name.trim().length < 3) errs.push('Please enter your full name (at least 3 characters).');
    if (!/^01[3-9]\d{8}$/.test(mobile.trim())) errs.push('Please enter a valid Bangladeshi mobile number, e.g. 01712345678.');
    if (address.trim().length < 10) errs.push('Please enter a full delivery address (at least 10 characters).');
    if (cart.length === 0) errs.push('Your cart is empty.');
    setErrors(errs);
    if (errs.length > 0) return;
    const order = placeOrder({
      name: name.trim(), mobile: mobile.trim(), address: address.trim(), payment,
      deliveryCharge, total: grandTotal,
      items: cart.map((i) => ({ id: i.product.id, name: i.product.name, size: i.size, qty: i.qty, price: i.product.price, image: i.product.image })),
    });
    setDone(order);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-5xl">✅</p>
        <h1 className="mt-4 text-3xl font-black dark:text-white">Order Confirmed!</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">ধন্যবাদ, {done.name}! Your order <strong>{done.id}</strong> is confirmed.</p>
        <p className="mt-2 text-lg font-bold dark:text-white">Total paid: {formatPrice(done.total)} · {done.payment}</p>
        <p className="mt-1 text-sm text-gray-500">Delivery to: {done.address} · {done.mobile}</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/orders" className="rounded-full bg-black px-6 py-3 text-sm font-bold text-white dark:bg-white dark:text-black">View My Orders</Link>
          <Link href="/shop" className="rounded-full border border-gray-300 px-6 py-3 text-sm font-bold dark:border-gray-600 dark:text-white">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="text-2xl font-black dark:text-white">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Add some products first.</p>
        <Link href="/shop" className="mt-4 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold text-white dark:bg-white dark:text-black">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-3 py-6 sm:px-6">
      <h1 className="text-3xl font-black dark:text-white">Checkout</h1>
      {errors.length > 0 && (
        <div className="mt-4 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {errors.map((e) => (<p key={e}>• {e}</p>))}
        </div>
      )}
      <form onSubmit={submit} className="mt-6 space-y-4 rounded-3xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-ultra-800">
        <div>
          <label className="text-sm font-bold dark:text-white">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahim Uddin" className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-ultra-900 dark:text-white" />
        </div>
        <div>
          <label className="text-sm font-bold dark:text-white">Mobile number</label>
          <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="01712345678" inputMode="tel" className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-ultra-900 dark:text-white" />
        </div>
        <div>
          <label className="text-sm font-bold dark:text-white">Delivery address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House, Road, Area, City" rows={3} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-ultra-900 dark:text-white" />
        </div>
        <div>
          <label className="text-sm font-bold dark:text-white">Delivery zone</label>
          <div className="mt-1 flex gap-2">
            <button type="button" onClick={() => setZone('inside')} className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold ${zone === 'inside' ? 'border-red-600 bg-red-600 text-white' : 'dark:text-white'}`}>Inside Dhaka — ৳60</button>
            <button type="button" onClick={() => setZone('outside')} className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold ${zone === 'outside' ? 'border-red-600 bg-red-600 text-white' : 'dark:text-white'}`}>Outside Dhaka — ৳120</button>
          </div>
          <p className="mt-1 text-xs text-gray-500">FREE delivery on orders over ৳2,000.</p>
        </div>
        <div>
          <label className="text-sm font-bold dark:text-white">Payment method</label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {PAYMENTS.map((p) => (
              <button type="button" key={p} onClick={() => setPayment(p)} className={`rounded-xl border px-3 py-3 text-sm font-semibold ${payment === p ? 'border-red-600 bg-red-600 text-white' : 'dark:text-white'}`}>{p}</button>
            ))}
          </div>
          {payment === 'bKash' && <p className="mt-2 text-xs text-gray-500">You will receive bKash payment instructions after placing the order (test mode — no real payment is taken).</p>}
          {payment === 'Nagad' && <p className="mt-2 text-xs text-gray-500">You will receive Nagad payment instructions after placing the order (test mode — no real payment is taken).</p>}
        </div>
        <div className="rounded-2xl bg-gray-50 p-4 text-sm dark:bg-ultra-900 dark:text-white">
          <p className="flex justify-between"><span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span><span className="font-bold">{formatPrice(cartTotal)}</span></p>
          <p className="mt-1 flex justify-between"><span>Delivery</span><span className="font-bold">{deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}</span></p>
          <p className="mt-2 flex justify-between border-t pt-2 text-lg font-extrabold"><span>Total</span><span>{formatPrice(grandTotal)}</span></p>
        </div>
        <button type="submit" className="w-full rounded-xl bg-red-600 py-3 text-sm font-bold text-white">Place Order — {formatPrice(grandTotal)}</button>
        <button type="button" onClick={() => setCartOpen(true)} className="w-full text-center text-sm font-semibold text-red-600">Review cart</button>
      </form>
    </div>
  );
}
