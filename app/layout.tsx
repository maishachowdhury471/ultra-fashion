import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StoreProvider } from '../lib/store';
import { Header, Footer } from '../components/Header';
import { CartDrawer } from '../components/CartDrawer';
import { SwRegister } from '../components/SwRegister';

export const metadata: Metadata = {
  title: 'ULTRA. — Men\'s Collection | Baby, Boys, Teens & Men',
  description: 'Premium men\'s collection for every age. 300 products, frontend-only test store. bKash, Nagad, Cash on Delivery.',
  manifest: '/ultra-fashion/manifest.webmanifest',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0a0a0f' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/ultra-fashion/icon-192.png" />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased dark:bg-ultra-900 dark:text-white">
        <StoreProvider>
          <SwRegister />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
