'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Analytics', icon: TrendingUp, disabled: true },
  { label: 'Settings', icon: Settings, disabled: true },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex h-full flex-col border-r border-white/8 bg-[#111111] px-4 py-5 text-white">
      <div className="mb-8 flex items-center justify-between px-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.34em]">LUXE WEAR</p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/45">
            Admin Console
          </p>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="icon-button border-white/10 bg-white/10 text-white lg:hidden"
          aria-label="Close admin menu"
        >
          <X size={16} />
        </button>
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Admin User</p>
            <p className="text-xs text-white/45">admin@luxewear.com</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {navItems.map(({ label, href, icon: Icon, disabled }) => {
          const isActive = href ? pathname === href : false;
          const content = (
            <>
              <Icon size={18} className={isActive ? 'text-[var(--accent)]' : 'text-white/70'} />
              <span>{label}</span>
              {disabled ? (
                <span className="ml-auto rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-white/35">
                  Soon
                </span>
              ) : null}
            </>
          );

          if (disabled || !href) {
            return (
              <div
                key={label}
                className="flex items-center gap-3 rounded-[1.25rem] px-4 py-3 text-sm font-medium text-white/45"
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-[1.25rem] px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-white/[0.08] text-white'
                  : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              {content}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[var(--accent)]">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Storefront</p>
            <p className="text-xs text-white/45">Return to the customer experience</p>
          </div>
        </div>
        <Link href="/" className="button-primary mt-4 !w-full !justify-center !bg-white !text-[var(--foreground)]">
          Back to Store
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="icon-button fixed left-4 top-4 z-50 bg-[var(--foreground)] text-white lg:hidden"
        aria-label="Open admin menu"
      >
        <Menu size={16} />
      </button>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">{sidebarContent}</aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm lg:hidden">
          <aside className="h-full w-[min(88vw,360px)]">{sidebarContent}</aside>
        </div>
      ) : null}
    </>
  );
}
