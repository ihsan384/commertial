'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
} from 'lucide-react';
import ordersData from '@/data/orders.json';
import productsData from '@/data/products.json';
import { formatCurrency, formatDate } from '@/lib/format';

const stats = [
  {
    label: 'Revenue',
    value: 24890,
    change: '+12.5%',
    icon: DollarSign,
  },
  {
    label: 'Orders',
    value: 284,
    change: '+8.2%',
    icon: ShoppingBag,
  },
  {
    label: 'Products',
    value: productsData.length,
    change: '+3 this month',
    icon: Package,
  },
  {
    label: 'Customers',
    value: 1429,
    change: '+5.1%',
    icon: Users,
  },
];

const revenueSeries = [42, 56, 51, 68, 74, 63, 82, 76, 88, 81, 95, 109];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const maxValue = Math.max(...revenueSeries);

const statusStyles: Record<string, string> = {
  Delivered: 'bg-[#e8f2ed] text-[#25634c]',
  Pending: 'bg-[#f7ecdc] text-[#8a643d]',
  Processing: 'bg-[#ede9e1] text-[#4b5563]',
  Shipped: 'bg-[#ebe8f5] text-[#5a4ab2]',
};

export default function AdminDashboard() {
  return (
    <div className="px-4 pb-8 pt-20 sm:px-6 lg:px-8 lg:pt-8">
      <section className="surface-card rounded-[2.5rem] p-8 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Admin Overview</p>
            <h1 className="section-title mt-4">A cleaner view of store performance.</h1>
            <p className="section-copy mt-4 max-w-2xl text-base">
              Key revenue, product, and order metrics in a calmer layout that mirrors
              the premium storefront.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[var(--border)] bg-white/75 p-5 lg:max-w-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">Store growth</p>
                <p className="text-sm text-[var(--muted)]">Up 18.2% year over year</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <article key={label} className="surface-card rounded-[2rem] p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                <Icon size={20} />
              </div>
              <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                {change}
              </span>
            </div>
            <p className="mt-6 text-sm text-[var(--muted)]">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
              {label === 'Revenue' ? formatCurrency(value as number) : value.toLocaleString()}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="surface-card rounded-[2rem] p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                Revenue Overview
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                Monthly performance
              </h2>
            </div>
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
              2026
            </span>
          </div>

          <div className="mt-8 flex h-64 items-end gap-2">
            {revenueSeries.map((value, index) => (
              <div key={months[index]} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-[1rem] bg-[var(--background-strong)] transition hover:bg-[var(--accent)]"
                  style={{
                    height: `${Math.max((value / maxValue) * 100, 6)}%`,
                  }}
                  title={formatCurrency(value * 100)}
                />
                <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  {months[index]}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="surface-card rounded-[2rem] p-6 sm:p-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                Top Products
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                Best sellers
              </h2>
            </div>
            <Link href="/admin/products" className="button-tertiary">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {productsData.slice(0, 5).map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-[1.5rem] border border-[var(--border)] bg-white/75 p-3"
              >
                <span className="w-5 text-sm font-semibold text-[var(--muted)]">{index + 1}</span>
                <div className="relative h-14 w-14 overflow-hidden rounded-[1rem] bg-[var(--background-strong)]">
                  <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[var(--foreground)]">
                    {product.name}
                  </p>
                  <p className="text-sm text-[var(--muted)]">{product.reviews} reviews</p>
                </div>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {formatCurrency(product.price)}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="surface-card mt-6 overflow-hidden rounded-[2rem]">
        <div className="flex flex-col gap-4 border-b border-[var(--border)] px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Recent Orders
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
              Latest activity
            </h2>
          </div>
          <Link href="/admin/orders" className="button-tertiary">
            View all orders <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-white/45">
                {['Order', 'Customer', 'Date', 'Amount', 'Status'].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ordersData.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-[var(--border)] last:border-b-0">
                  <td className="px-6 py-4 font-semibold text-[var(--foreground)]">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{order.customer}</p>
                      <p className="text-[var(--muted)]">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--muted)]">{formatDate(order.date)}</td>
                  <td className="px-6 py-4 font-semibold text-[var(--foreground)]">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
