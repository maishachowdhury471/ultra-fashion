'use client';
import { useEffect } from 'react';

export function SwRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/ultra-fashion/sw.js').catch(() => undefined);
    }
  }, []);
  return null;
}
