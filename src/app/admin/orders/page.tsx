'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import { Eye, Search, ShoppingBag, X } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import ordersData from '@/data/orders.json';
import { formatCurrency, formatDate } from '@/lib/format';

const statusStyles: Record<string, string> = {
  Delivered: 'bg-[#e8f2ed] text-[#25634c]',
  Pending: 'bg-[#f7ecdc] text-[#8a643d]',
  Processing: 'bg-[#ede9e1] text-[#4b5563]',
  Shipped: 'bg-[#ebe8f5] text-[#5a4ab2]',
};

const allStatuses = ['All', 'Delivered', 'Processing', 'Shipped', 'Pending'];

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<(typeof ordersData)[0] | null>(null);

  const deferredSearch = useDeferredValue(search);

  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(deferredSearch.trim().toLowerCase()) ||
        order.id.toLowerCase().includes(deferredSearch.trim().toLowerCase());
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [deferredSearch, statusFilter]);

  return (
    <div className="px-4 pb-8 pt-20 sm:px-6 lg:px-8 lg:pt-8">
      <section className="surface-card rounded-[2.5rem] p-8 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Orders</p>
            <h1 className="section-title mt-4">Track every order in one polished table.</h1>
            <p className="section-copy mt-4 max-w-2xl text-base">
              Search by customer or order ID, scan statuses faster, and open a more
              structured detail view without leaving the page.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[var(--border)] bg-white/75 p-5 lg:max-w-xs">
            <p className="text-sm text-[var(--muted)]">Orders this view</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
              {filteredOrders.length}
            </p>
          </div>
        </div>
      </section>

      <section className="surface-card mt-6 rounded-[2rem] p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search orders or customers"
              className="w-full rounded-full border border-[var(--border)] bg-white py-3 pl-11 pr-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {allStatuses.map((status) => {
              const active = statusFilter === status;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                    active
                      ? 'bg-[var(--foreground)] text-white'
                      : 'border border-[var(--border)] bg-white text-[var(--muted-strong)] hover:border-[rgba(183,136,84,0.35)] hover:text-[var(--accent-strong)]'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {filteredOrders.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={ShoppingBag}
            eyebrow="No Orders"
            title="No orders match the current filters."
            description="Try a different status or search term to surface more order activity."
          />
        </div>
      ) : (
        <section className="surface-card mt-6 overflow-hidden rounded-[2rem]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-white/45">
                  {['Order ID', 'Customer', 'Products', 'Date', 'Total', 'Status', 'Action'].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[var(--border)] last:border-b-0">
                    <td className="px-6 py-4 font-semibold text-[var(--foreground)]">{order.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[var(--foreground)]">{order.customer}</p>
                        <p className="text-[var(--muted)]">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--muted)]">
                      {order.items.map((item) => `${item.name} x ${item.quantity}`).join(', ')}
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
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="button-tertiary"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {selectedOrder ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div className="surface-card-strong w-full max-w-xl rounded-[2rem] p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-kicker">Order Detail</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {selectedOrder.id}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {formatDate(selectedOrder.date)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${statusStyles[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="icon-button"
                  aria-label="Close order details"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-[1.5rem] border border-[var(--border)] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Customer
                </p>
                <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">
                  {selectedOrder.customer}
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">{selectedOrder.email}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{selectedOrder.address}</p>
              </div>

              <div className="rounded-[1.5rem] border border-[var(--border)] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  Items
                </p>
                <div className="mt-4 space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={`${selectedOrder.id}-${item.productId}`}
                      className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-3 last:border-b-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium text-[var(--foreground)]">{item.name}</p>
                        <p className="text-sm text-[var(--muted)]">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-[var(--foreground)]">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--border)] pt-2">
                <p className="text-base font-semibold text-[var(--foreground)]">Total</p>
                <p className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {formatCurrency(selectedOrder.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
