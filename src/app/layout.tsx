import type { Metadata } from 'next';
import './globals.css';
import { SiteShell } from '@/components/layout/SiteShell';

export const metadata: Metadata = {
  title: {
    default: 'LUXE WEAR | Premium Modern Essentials',
    template: '%s | LUXE WEAR',
  },
  description:
    "Premium essentials for a considered wardrobe. Shop elevated men's and women's clothing, footwear, and outerwear from LUXE WEAR.",
  keywords: [
    'premium fashion',
    'modern wardrobe',
    'luxury clothing',
    "men's fashion",
    "women's fashion",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="text-[var(--foreground)] antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
