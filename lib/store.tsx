'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from './products';

export interface CartItem { product: Product; size: string; qty: number; }
export interface Order {
  id: string; date: string; name: string; mobile: string; address: string;
  payment: string; deliveryCharge: number; total: number; status: string;
  items: { id: string; name: string; size: string; qty: number; price: number; image: string }[];
}

interface Store {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  theme: 'light' | 'dark';
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  addToCart: (p: Product, size: string, qty?: number) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQty: (id: string, size: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  placeOrder: (o: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  toggleTheme: () => void;
  cartCount: number;
  cartTotal: number;
}

const Ctx = createContext<Store | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(load<CartItem[]>('ultra-cart', []));
    setWishlist(load<string[]>('ultra-wishlist', []));
    setOrders(load<Order[]>('ultra-orders', []));
    setTheme(load<'light' | 'dark'>('ultra-theme', 'light'));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem('ultra-cart', JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem('ultra-wishlist', JSON.stringify(wishlist)); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem('ultra-orders', JSON.stringify(orders)); }, [orders, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('ultra-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme, hydrated]);

  const value = useMemo<Store>(() => ({
    cart, wishlist, orders, theme, cartOpen, setCartOpen,
    cartCount: cart.reduce((s, i) => s + i.qty, 0),
    cartTotal: cart.reduce((s, i) => s + i.product.price * i.qty, 0),
    addToCart: (p, size, qty = 1) => {
      setCart((prev) => {
        const found = prev.find((i) => i.product.id === p.id && i.size === size);
        if (found) return prev.map((i) => (i.product.id === p.id && i.size === size ? { ...i, qty: i.qty + qty } : i));
        return [...prev, { product: p, size, qty }];
      });
      setCartOpen(true);
    },
    removeFromCart: (id, size) => setCart((prev) => prev.filter((i) => !(i.product.id === id && i.size === size))),
    updateQty: (id, size, qty) => setCart((prev) => qty <= 0 ? prev.filter((i) => !(i.product.id === id && i.size === size)) : prev.map((i) => (i.product.id === id && i.size === size ? { ...i, qty } : i))),
    clearCart: () => setCart([]),
    toggleWishlist: (id) => setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    placeOrder: (o) => {
      const order: Order = { ...o, id: 'ULT-' + Date.now().toString().slice(-8), date: new Date().toISOString(), status: 'Confirmed' };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      return order;
    },
    toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
  }), [cart, wishlist, orders, theme, cartOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside StoreProvider');
  return s;
}
