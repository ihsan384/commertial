'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const navLinks = [
  { label: 'New Arrivals', href: '/products?category=new-arrivals' },
  { label: 'Men', href: '/products?category=men' },
  { label: 'Women', href: '/products?category=women' },
  { label: 'Collections', href: '/products' },
  { label: 'Sale', href: '/products?category=sale' },
];

const trendingSearches = [
  'Black essentials',
  'Tailored outerwear',
  'Minimal sneakers',
  'Lightweight layers',
];

export function Navbar() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass = scrolled
    ? 'bg-[rgba(245,244,239,0.95)] shadow-[0_16px_40px_-36px_rgba(17,17,17,0.5)]'
    : 'bg-[rgba(245,244,239,0.78)]';

  return (
    <>
      <header
        className={`sticky top-10 z-40 border-b border-[var(--border)] backdrop-blur-xl transition duration-300 ${headerClass}`}
      >
        <div className="brand-container">
          <div className="flex h-20 items-center justify-between gap-4">
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="icon-button"
                aria-label="Open menu"
              >
                <Menu size={18} />
              </button>
            </div>

            <Link
              href="/"
              className="shrink-0 text-sm font-semibold uppercase tracking-[0.38em] text-[var(--foreground)] sm:text-base"
            >
              LUXE WEAR
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
              {navLinks.map((link) => {
                const isActive = pathname === '/products' && link.href === '/products';

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                      isActive
                        ? 'text-[var(--foreground)]'
                        : 'text-[var(--muted)] hover:text-[var(--accent-strong)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="icon-button"
                aria-label="Search"
              >
                <Search size={16} />
              </button>

              <button
                type="button"
                className="icon-button hidden sm:inline-flex"
                aria-label="Wishlist"
              >
                <Heart size={16} />
              </button>

              <Link
                href="/cart"
                aria-label="Cart"
                className={`icon-button relative ${pathname === '/cart' ? 'bg-[var(--foreground)] text-white' : ''}`}
              >
                <ShoppingBag size={16} />
                {totalItems > 0 ? (
                  <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                ) : null}
              </Link>

              <Link
                href="/admin"
                aria-label="Admin"
                className="icon-button hidden sm:inline-flex"
              >
                <User size={16} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-sm lg:hidden">
          <div className="surface-card-strong h-full w-[min(92vw,360px)] rounded-none border-y-0 border-l-0 p-6">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[var(--foreground)]">
                  LUXE WEAR
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Menu
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="icon-button"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="surface-card flex items-center justify-between rounded-[1.5rem] px-4 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]"
                >
                  {link.label}
                  <span className="text-[var(--accent-strong)]">+</span>
                </Link>
              ))}
            </nav>

            <div className="mt-10 rounded-[1.75rem] border border-[var(--border)] bg-[var(--accent-soft)]/70 p-5">
              <p className="section-kicker mb-3">Admin</p>
              <p className="text-sm leading-7 text-[var(--muted-strong)]">
                Manage products, track orders, and review store performance.
              </p>
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="button-primary mt-5 !px-5 !py-3 text-[11px]"
              >
                Open Dashboard
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {searchOpen ? (
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/45 px-4 pt-24 backdrop-blur-sm">
          <div className="surface-card-strong w-full max-w-2xl rounded-[2rem] p-5 sm:p-6">
            <div className="flex items-center gap-3 rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-4">
              <Search size={18} className="text-[var(--muted)]" />
              <input
                autoFocus
                type="text"
                placeholder="Search products, categories, or looks"
                className="min-w-0 flex-1 border-none bg-transparent text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="icon-button h-10 w-10"
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-6">
              <p className="section-kicker mb-4">Trending Searches</p>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm text-[var(--muted-strong)] transition-colors hover:border-[rgba(183,136,84,0.35)] hover:text-[var(--accent-strong)]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
